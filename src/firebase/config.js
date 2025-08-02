// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGrkbrvSaervbzHLTEddHSc-GL9pIb5YM",
  authDomain: "mcga-87b96.firebaseapp.com",
  databaseURL: "https://mcga-87b96-default-rtdb.firebaseio.com",
  projectId: "mcga-87b96",
  storageBucket: "mcga-87b96.firebasestorage.app",
  messagingSenderId: "21850404682",
  appId: "1:21850404682:web:1678e33108bc51bc35f3b3",
  measurementId: "G-BP5PEJGD1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 