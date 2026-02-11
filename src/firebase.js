// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDgCglHgC8U3_ry3XXZpjp49QgbzoyWCyI',
  authDomain: 'skymate-admin-panel.firebaseapp.com',
  projectId: 'skymate-admin-panel',
  storageBucket: 'skymate-admin-panel.appspot.com',
  messagingSenderId: '1033105376117',
  appId: '1:1033105376117:web:36d2e155600629082c093c',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
