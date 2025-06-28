 import * as admin from 'firebase-admin';
import { firebaseConfig } from './firebase.config';
console.log('[FIREBASE CONFIG]', firebaseConfig);

admin.initializeApp({
  
  credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

export const firebaseAdmin = admin;
