import * as admin from 'firebase-admin';

import { firebaseConfig } from './firebase.config';

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

export const firebaseAdmin = admin;
