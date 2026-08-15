const FIREBASE_VERSION = '12.17.1';
const firebaseConfig = window.COS_FIREBASE_CONFIG || {};
const adminEmail = firebaseConfig.authDomain ? `trust@${firebaseConfig.authDomain}` : '';
let firebaseApi = null;
let adminUser = null;
let pendingObjectUrl = '';
let privateRecordVisible = false;

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
  certificate.removeAttribute('src');
  privateRecordVisible=false;
  document.getElementById('recordName').textContent=record.name || 'Registration record';
  document.getElementById('recordTag').textContent=(record.status || 'Registered').toUpperCase();
  document.getElementById('recordCos').textContent=record.cos;
  document.getElementById('recordStatus').textContent=record.status || 'Registered';
  document.getElementById('result').classList.add('show');
}
function showPrivateRecord(record) {
  const grid=document.getElementById('resultGrid');
  const certificate=document.getElementById('recordCertificate');
  grid.classList.remove('public');
  document.getElementById('recordName').textContent=record.name || 'Unnamed record';
  document.getElementById('recordTag').textContent=(record.status || 'Registered').toUpperCase();
  document.getElementById('recordCos').textContent=record.cos;
  document.getElementById('recordStatus').textContent=record.status || 'Registered';
  const certificateImage=record.certificateImageData || record.photoData;
  if (typeof certificateImage==='string' && certificateImage.startsWith('data:image/')) { certificate.src=certificateImage; certificate.hidden=false; } else { certificate.hidden=true; }
  privateRecordVisible=true;
  document.getElementById('result').classList.add('show');
}
function hidePrivateRecord() {
  if (!privateRecordVisible) return;
  document.getElementById('result').classList.remove('show');
  const certificate=document.getElementById('recordCertificate');
  certificate.hidden=true;
  certificate.removeAttribute('src');
  privateRecordVisible=false;
}
function setSignedIn(user, isAdmin=false) {
  const signedIn=Boolean(user);
  const needsVerification=Boolean(user && !isAdmin && !user.emailVerified);
  document.getElementById('guestNav').hidden=signedIn;
  document.getElementById('adminbar').classList.toggle('show', signedIn && isAdmin);
  document.getElementById('profile').classList.toggle('show', signedIn);
  document.getElementById('verifyAccount').hidden=!needsVerification;
  document.getElementById('refreshAccount').hidden=!needsVerification;
  if (user) {
    document.getElementById('profileName').textContent=(user.email || 'Account').split('@')[0];
    document.getElementById('profileRole').textContent=isAdmin ? 'Administrator' : 'Account holder';
    document.querySelector('.profile-icon').textContent=isAdmin ? 'A' : 'U';
  }
}
function normalizedEmail(value) {
  const username=value.trim().toLowerCase();
  return username.includes('@') ? username : `${username}@${firebaseConfig.authDomain}`;
}
async function handleAuthState(user) {
  adminUser=null;
  if (!user || !firebaseApi) {
    hidePrivateRecord();
    setSignedIn(null);
    return;
  }
  const isAdmin=user.email === adminEmail;
  if (isAdmin) adminUser=user;
  setSignedIn(user, isAdmin);
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('loginPass').value='';
  const loginDialog=document.getElementById('login');
  if (loginDialog.open) loginDialog.close();
  if (isAdmin) {
    setSyncStatus('Administrator mode enabled.', 'ready');
    return;
  }
  if (!user.emailVerified) {
    setSyncStatus('Verify this account email before viewing its private record.', 'error');
    return;
  }
  await showOwnedRecord(user);
}
async function showOwnedRecord(user) {
  if (!user.email) {
    setSyncStatus('This account does not have an email address.', 'error');
    return;
  }
  try {
    const ownerEmail=user.email.trim().toLowerCase();
    const ownRecordQuery=firebaseApi.query(
      firebaseApi.collection(firebaseApi.db, 'ownerRecords', ownerEmail, 'records'),
      firebaseApi.limit(1)
    );
    const ownRecordSnapshot=await firebaseApi.getDocs(ownRecordQuery);
    if (ownRecordSnapshot.empty) {
      setSyncStatus('No record is linked to this account.', 'error');
      return;
    }
    const recordIndexDocument=ownRecordSnapshot.docs[0];
    const cos=recordIndexDocument.data().cos || recordIndexDocument.id;
    const recordDocument=await firebaseApi.getDoc(firebaseApi.doc(firebaseApi.db, 'cosRecords', cos));
    if (!recordDocument.exists()) {
      setSyncStatus('The record linked to this account is unavailable.', 'error');
      return;
    }
    showPrivateRecord({ cos, ...recordDocument.data() });
    clearLookupError();
    setSyncStatus('Your private record is displayed.', 'ready');
  } catch (error) {
    console.error(error);
    setSyncStatus('Unable to retrieve the record for this account.', 'error');
  }
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
      doc:firestoreSdk.doc, getDoc:firestoreSdk.getDoc, getDocs:firestoreSdk.getDocs, collection:firestoreSdk.collection, query:firestoreSdk.query, limit:firestoreSdk.limit, writeBatch:firestoreSdk.writeBatch, serverTimestamp:firestoreSdk.serverTimestamp,
      signInWithEmailAndPassword:authSdk.signInWithEmailAndPassword, sendEmailVerification:authSdk.sendEmailVerification, reload:authSdk.reload, signOut:authSdk.signOut, onAuthStateChanged:authSdk.onAuthStateChanged
    };
    setSyncStatus('Secure record storage connected.', 'ready');
    firebaseApi.onAuthStateChanged(firebaseApi.auth, handleAuthState);
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
      if (fullSnapshot.exists()) { showPrivateRecord({ cos, ...fullSnapshot.data() }); } else { showPublicRecord(publicRecord); }
    } else {
      const currentUser=firebaseApi.auth.currentUser;
      if (currentUser && currentUser.emailVerified) {
        try {
          const privateSnapshot=await firebaseApi.getDoc(firebaseApi.doc(firebaseApi.db, 'cosRecords', cos));
          if (privateSnapshot.exists()) {
            showPrivateRecord({ cos, ...privateSnapshot.data() });
            clearLookupError();
            return;
          }
        } catch (privateError) {
          // A permission denial means the COS record belongs to another account.
        }
      }
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
    error.textContent='Invalid email or password.';
    error.classList.add('show');
  }
}
async function sendVerification() {
  const user=firebaseApi?.auth.currentUser;
  if (!user || user.emailVerified) return;
  try {
    await firebaseApi.sendEmailVerification(user, { url:`${window.location.origin}${window.location.pathname}?account=1` });
    setSyncStatus('Verification email sent. Follow its link, then choose “I\'ve verified”.', 'ready');
  } catch (error) {
    console.error(error);
    setSyncStatus('Unable to send the verification email. Check Firebase Authentication settings.', 'error');
  }
}
async function refreshAccount() {
  const user=firebaseApi?.auth.currentUser;
  if (!user) return;
  try {
    await firebaseApi.reload(user);
    await user.getIdToken(true);
    await handleAuthState(firebaseApi.auth.currentUser);
    if (!firebaseApi.auth.currentUser.emailVerified) setSyncStatus('Email verification is not complete yet.', 'error');
  } catch (error) {
    console.error(error);
    setSyncStatus('Unable to refresh this account.', 'error');
  }
}
async function logout() {
  if (firebaseApi) await firebaseApi.signOut(firebaseApi.auth);
  adminUser=null;
  hidePrivateRecord();
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
async function createClientAccount() {
  const login=document.getElementById('accountLogin').value.trim().toLowerCase();
  const password=document.getElementById('accountPassword').value;
  const error=document.getElementById('accountError');
  const button=document.getElementById('createClient');
  error.classList.remove('show');
  if (!adminUser) { error.textContent='Administrator sign-in is required.'; error.classList.add('show'); return; }
  if (!/^[a-z0-9._-]{3,32}$/.test(login)) { error.textContent='Use 3 to 32 letters, numbers, dots, underscores, or hyphens.'; error.classList.add('show'); return; }
  if (password.length<12 || !/[a-z]/i.test(password) || !/\d/.test(password)) { error.textContent='Use at least 12 characters containing letters and numbers.'; error.classList.add('show'); return; }
  if (/^\d{8}$/.test(password)) { error.textContent='Do not use a date of birth as the password.'; error.classList.add('show'); return; }
  button.disabled=true;
  button.textContent='Creating...';
  try {
    const idToken=await adminUser.getIdToken(true);
    const response=await fetch('/api/create-client', {
      method:'POST',
      headers:{ 'Authorization':`Bearer ${idToken}`, 'Content-Type':'application/json' },
      body:JSON.stringify({ username:login, password })
    });
    const payload=await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'Unable to create the account.');
    document.getElementById('accountPassword').value='';
    document.getElementById('accountLogin').value='';
    document.getElementById('account').close();
    document.getElementById('newOwnerEmail').value=login;
    setSyncStatus(`Client account “${login}” created. Add and assign its COS record.`, 'ready');
    openModal('add');
  } catch (reason) {
    console.error(reason);
    error.textContent=reason.message || 'Unable to create the client account.';
    error.classList.add('show');
  } finally {
    button.disabled=false;
    button.textContent='Create account';
  }
}
async function addRecord() {
  const file=document.getElementById('newCertificate').files[0];
  const cos=document.getElementById('newCos').value.trim().toUpperCase();
  const name=document.getElementById('newName').value.trim();
  const ownerLogin=document.getElementById('newOwnerEmail').value.trim();
  const ownerEmail=ownerLogin ? normalizedEmail(ownerLogin) : '';
  const button=document.getElementById('saveRecord');
  if (!/^[A-Z0-9-]{1,20}$/.test(cos)) { alert('Use 1 to 20 letters, numbers, or hyphens for the COS number.'); return; }
  if (ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail)) { alert('Enter a valid client account email.'); return; }
  if (!file || !firebaseApi || !adminUser) { alert('Sign in as an administrator and select a record image before saving.'); return; }
  button.disabled=true;
  button.textContent='Saving...';
  try {
    const certificateImageData=await prepareCertificateImage(file);
    const recordReference=firebaseApi.doc(firebaseApi.db, 'cosRecords', cos);
    const previousRecord=await firebaseApi.getDoc(recordReference);
    const previousOwnerEmail=previousRecord.exists() && typeof previousRecord.data().ownerEmail === 'string'
      ? previousRecord.data().ownerEmail : '';
    const batch=firebaseApi.writeBatch(firebaseApi.db);
    const privateRecord={ cos, name, status:'Registered', certificateImageData, updatedAt:firebaseApi.serverTimestamp() };
    if (ownerEmail) privateRecord.ownerEmail=ownerEmail;
    batch.set(recordReference, privateRecord);
    batch.set(firebaseApi.doc(firebaseApi.db, 'publicCosStatus', cos), { cos, status:'Registered', updatedAt:firebaseApi.serverTimestamp() });
    if (ownerEmail) batch.set(firebaseApi.doc(firebaseApi.db, 'ownerRecords', ownerEmail, 'records', cos), { cos, updatedAt:firebaseApi.serverTimestamp() });
    if (previousOwnerEmail && previousOwnerEmail !== ownerEmail) batch.delete(firebaseApi.doc(firebaseApi.db, 'ownerRecords', previousOwnerEmail, 'records', cos));
    await batch.commit();
    document.getElementById('add').close();
    document.getElementById('newCos').value='';
    document.getElementById('newName').value='';
    document.getElementById('newOwnerEmail').value='';
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
const pageParams=new URLSearchParams(window.location.search);
if (pageParams.get('admin') === '1' || pageParams.get('account') === '1') openModal('login');
initializeFirebase();
