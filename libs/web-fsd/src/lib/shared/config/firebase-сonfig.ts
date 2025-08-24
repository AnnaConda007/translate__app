import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDIWLehcG2gqUzxM8q8iNUxBTk8dWBDnkU',
  authDomain: 'translateapp-57273.firebaseapp.com',
  projectId: 'translateapp-57273',
  storageBucket: 'translateapp-57273.appspot.com',
  messagingSenderId: '597302891455',
  appId: '1:597302891455:web:102a6a9a22e72a1b21470a',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
