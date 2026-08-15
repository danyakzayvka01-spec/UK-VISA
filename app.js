const FIREBASE_VERSION = '12.17.1';
const firebaseConfig = window.COS_FIREBASE_CONFIG || {};
const adminEmail = firebaseConfig.authDomain ? `trust@${firebaseConfig.authDomain}` : '';
let firebaseApi = null;
let adminUser = null;
let pendingObjectUrl = '';

function openModal(id) { document.getElementById(id).showModal(); }
function setSyncStatus(message, type='') {
  const status=document.getElementById('syncStatus');
  status.textContent=message;
  status.className=`sync-status ${type}`;
}
function setLookupError(message) {
  const error=document.getElementById('error');
  error.textContent=message;
  error.classList.add('show');
}
function clearLookupError() { document.getElementById('error').classList.remove('show'); }
function showPublicRecord(record) {
  const grid=document.getElementById('resultGrid');
  const certificate=document.getElementById('recordCertificate');
  grid.classList.add('public');
  certificate.hidden=true;
  document.getElementById('recordName').textContent='Registration record';
  document.getElementById('recordTag').textContent=(record.status || 'Registered').toUpperCase();
  document.getElementById('recordCos').textContent=record.cos;
  document.getElementById('recordStatus').textContent=record.status || 'Registered';
  document.getElementById('result').classList.add('show');
}
function showAdminRecord(record) {
  const grid=document.getElementById('resultGrid');
  const certificate=document.getElementById('recordCertificate');
  grid.classList.remove('public');
  document.getElementById('recordName').textContent=record.name || 'Unnamed record';
  document.getElementById('recordTag').textContent=(record.status || 'Registered').toUpperCase();
  document.getElementById('recordCos').textContent=record.cos;
  document.getElementById('recordStatus').textContent=record.status || 'Registered';
  const certificateImage=record.certificateImageData || record.photoData;
  if (typeof certificateImage==='string' && certificateImage.startsWith('data:image/')) { certificate.src=certificateImage; certificate.hidden=false; } else { certificate.hidden=true; }
  document.getElementById('result').classList.add('show');
}
function setSignedIn(user) {
  const signedIn=Boolean(user);
  document.getElementById('adminbar').classList.toggle('show', signedIn);
  document.getElementById('guestNav').style.display=signedIn ? 'none' : 'flex';
  document.getElementById('profile').classList.toggle('show', signedIn);
  if (user) document.getElementById('profileName').textContent=(user.email || 'Administrator').split('@')[0];
}
function normalizedEmail(value) {
  const username=value.trim().toLowerCase();
  return username.includes('@') ? username : `${username}@${firebaseConfig.authDomain}`;
}
async function handleAuthState(user) {
  adminUser=null;
  if (!user || !firebaseApi) { setSignedIn(null); return; }
  if (user.email !== adminEmail) {
    const loginError=document.getElementById('loginError');
    loginError.textContent='This Firebase account is not the configured administrator.';
    loginError.classList.add('show');
    setSyncStatus('This Firebase account is not the configured administrator.', 'error');
    await firebaseApi.signOut(firebaseApi.auth);
    return;
  }
  adminUser=user;
  setSignedIn(user);
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('login').close();
}
async function initializeFirebase() {
  if (!firebaseConfig || !firebaseConfig.apiKey || !firebaseConfig.projectId) { setSyncStatus('Firebase configuration is missing.', 'error'); return; }
  try {
    const [appSdk, firestoreSdk, authSdk] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`)
    ]);
    const app=appSdk.initializeApp(firebaseConfig);
    firebaseApi={
      db:firestoreSdk.getFirestore(app), auth:authSdk.getAuth(app),
      doc:firestoreSdk.doc, getDoc:firestoreSdk.getDoc, writeBatch:firestoreSdk.writeBatch, serverTimestamp:firestoreSdk.serverTimestamp,
      signInWithEmailAndPassword:authSdk.signInWithEmailAndPassword, signOut:authSdk.signOut, onAuthStateChanged:authSdk.onAuthStateChanged
    };
    firebaseApi.onAuthStateChanged(firebaseApi.auth, handleAuthState);
    setSyncStatus('Secure record storage connected.', 'ready');
  } catch (error) {
    console.error(error);
    setSyncStatus('Unable to connect to record storage. Check Firebase setup.', 'error');
  }
}
async function lookup() {
  const cos=document.getElementById('cos').value.trim().toUpperCase();
  document.getElementById('result').classList.remove('show');
  if (!cos) { setLookupError('Enter a COS number.'); return; }
  if (!firebaseApi) { setLookupError('Record storage is not ready.'); return; }
  try {
    const publicSnapshot=await firebaseApi.getDoc(firebaseApi.doc(firebaseApi.db, 'publicCosStatus', cos));
    if (!publicSnapshot.exists()) {
      setLookupError('No record found.');
      return;
    }
    const publicRecord={ cos, ...publicSnapshot.data() };
    if (adminUser) {
      const fullSnapshot=await firebaseApi.getDoc(firebaseApi.doc(firebaseApi.db, 'cosRecords', cos));
      if (fullSnapshot.exists()) { showAdminRecord({ cos, ...fullSnapshot.data() }); } else { showPublicRecord(publicRecord); }
    } else {
      showPublicRecord(publicRecord);
    }
    clearLookupError();
  } catch (error) {
    console.error(error);
    setLookupError('Unable to retrieve this record.');
  }
}
async function signIn() {
  const name=document.getElementById('loginName').value;
  const password=document.getElementById('loginPass').value;
  const error=document.getElementById('loginError');
  if (!firebaseApi) { error.textContent='Firebase is not connected.'; error.classList.add('show'); return; }
  try {
    await firebaseApi.signInWithEmailAndPassword(firebaseApi.auth, normalizedEmail(name), password);
  } catch (reason) {
    console.error(reason);
    error.textContent='Invalid administrator credentials.';
    error.classList.add('show');
  }
}
async function logout() {
  if (firebaseApi) await firebaseApi.signOut(firebaseApi.auth);
  adminUser=null;
  setSignedIn(null);
}
function preview(input) {
  const file=input.files[0];
  if (!file) return;
  const image=document.getElementById('preview');
  if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
  pendingObjectUrl=URL.createObjectURL(file);
  image.src=pendingObjectUrl;
  image.classList.add('show');
}
function dataUrlByteLength(dataUrl) {
  const comma=dataUrl.indexOf(',');
  return comma === -1 ? 0 : Math.ceil((dataUrl.length-comma-1)*3/4);
}
function prepareCertificateImage(file) {
  return new Promise((resolve, reject) => {
    const sourceUrl=URL.createObjectURL(file), source=new Image();
    source.onload=() => {
      try {
        const sourceWidth=source.naturalWidth || source.width;
        const sourceHeight=source.naturalHeight || source.height;
        const attempts=[
          { maxSide:1280, quality:.82 },
          { maxSide:1120, quality:.78 },
          { maxSide:960, quality:.75 },
          { maxSide:820, quality:.72 },
          { maxSide:700, quality:.70 }
        ];
        for (const attempt of attempts) {
          const scale=Math.min(1, attempt.maxSide/Math.max(sourceWidth, sourceHeight));
          const canvas=document.createElement('canvas');
          canvas.width=Math.max(1, Math.round(sourceWidth*scale));
          canvas.height=Math.max(1, Math.round(sourceHeight*scale));
          const context=canvas.getContext('2d');
          context.fillStyle='#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(source, 0, 0, canvas.width, canvas.height);
          const dataUrl=canvas.toDataURL('image/jpeg', attempt.quality);
          if (dataUrlByteLength(dataUrl)<=620*1024) { resolve(dataUrl); return; }
        }
        reject(new Error('Record image is too large after compression.'));
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(sourceUrl);
      }
    };
    source.onerror=() => { URL.revokeObjectURL(sourceUrl); reject(new Error('Record image processing failed.')); };
    source.src=sourceUrl;
  });
}
async function addRecord() {
  const file=document.getElementById('newCertificate').files[0];
  const cos=document.getElementById('newCos').value.trim().toUpperCase();
  const name=document.getElementById('newName').value.trim();
  const button=document.getElementById('saveRecord');
  if (!/^[A-Z0-9-]{1,20}$/.test(cos)) { alert('Use 1 to 20 letters, numbers, or hyphens for the COS number.'); return; }
  if (!file || !firebaseApi || !adminUser) { alert('Sign in as an administrator and select a record image before saving.'); return; }
  button.disabled=true;
  button.textContent='Saving...';
  try {
    const certificateImageData=await prepareCertificateImage(file);
    const batch=firebaseApi.writeBatch(firebaseApi.db);
    batch.set(firebaseApi.doc(firebaseApi.db, 'cosRecords', cos), { cos, name, status:'Registered', certificateImageData, updatedAt:firebaseApi.serverTimestamp() });
    batch.set(firebaseApi.doc(firebaseApi.db, 'publicCosStatus', cos), { cos, status:'Registered', updatedAt:firebaseApi.serverTimestamp() });
    await batch.commit();
    document.getElementById('add').close();
    document.getElementById('newCos').value='';
    document.getElementById('newName').value='';
    document.getElementById('newCertificate').value='';
    document.getElementById('preview').removeAttribute('src');
    document.getElementById('preview').classList.remove('show');
    if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
    pendingObjectUrl='';
    document.getElementById('cos').value=cos;
    await lookup();
  } catch (error) {
    console.error(error);
    alert('Unable to save the record. Check Firebase Authentication and Firestore rules, or select a smaller image.');
  } finally {
    button.disabled=false;
    button.textContent='Save record';
  }
}
document.getElementById('cos').addEventListener('keydown', event => { if (event.key==='Enter') lookup(); });
initializeFirebase();
