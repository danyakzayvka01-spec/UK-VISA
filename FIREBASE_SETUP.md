# Firebase setup for COS Number Check

The supplied Firebase Web configuration is in `firebase-config.js`. It is a browser configuration, not a service-account key.

## 1. Enable Firebase services

1. In Firebase Console, enable **Authentication > Sign-in method > Email/Password**.
2. Create a Firebase Authentication user for the administrator. The site accepts a full email address. For a short username such as `trust`, it appends `@uk-visa-c64c8.firebaseapp.com`.
3. Use a password with at least six characters. Do not use the previous four-character front-end password.
4. Create **Cloud Firestore** in Production mode.

## 2. Publish the rules

1. In Firestore > Rules, replace the rules with the contents of `firestore.rules` and publish.
2. Cloud Storage is not required for this Firestore-only version of the site.

The configured administrator email is `trust@uk-visa-c64c8.firebaseapp.com`. Create this Firebase Authentication user and sign in with `trust` on the site.

## 3. Create a client account

1. In **Authentication > Users**, select **Add user** and create an Email/Password account for the client.
2. Use an email address the client controls and a new password; do not use identity-document data as a password.
3. Add the deployed Vercel domain in **Authentication > Settings > Authorized domains** if it is not already present.
4. Sign in from the private address `https://your-site.example/?account=1`, use **Send verification email**, then select **I've verified** after following the email link.
5. As the administrator, add or update the COS record and enter the exact same email in **Client account email**.

After verified sign-in, the client can retrieve only the COS record assigned to their account. The administrator still has access to all records. Existing records without a client account email must be saved again to give a client account access.

## COS records and privacy

- Any visitor who knows a COS number can retrieve only its registration status from `publicCosStatus`.
- Client names and compressed record images stay in `cosRecords` and are visible only to the Firebase administrator or the account assigned to that record.
- Upload only a non-identity image that you are authorised to store. Do not use this application for identity documents or passport images.
- Record images are compressed in the browser before saving. If an image cannot be saved, use a smaller JPG, PNG, or WebP image.

Existing records in browser local storage are not migrated automatically. Sign in as the Firebase administrator and add each permitted test record again.
