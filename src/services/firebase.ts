import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDGfUk21VmPyNbBlBEDBAbObwwkiE_mPbc',
  authDomain: 'crm-application-64f82.firebaseapp.com',
  projectId: 'crm-application-64f82',
  storageBucket: 'crm-application-64f82.firebasestorage.app',
  messagingSenderId: '1001478107726',
  appId: '1:1001478107726:web:02d59dff6c13c59926891f',
  measurementId: 'G-MX1EGEYFVY',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
