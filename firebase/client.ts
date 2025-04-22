// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZXj7WBJkb7qWZP7aLTczu88URqU1D1W8",
  authDomain: "prepify-c8bb8.firebaseapp.com",
  projectId: "prepify-c8bb8",
  storageBucket: "prepify-c8bb8.firebasestorage.app",
  messagingSenderId: "108086491413",
  appId: "1:108086491413:web:69b73229553f7b9002511c",
  measurementId: "G-KJSFMXDX2N",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
