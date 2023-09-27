// Import the functions you need from the SDKs you need
"use client"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEfLC8QnGWe2r0qAVTNatJqDK7ezZcICk",
  authDomain: "learnconnect-6f324.firebaseapp.com",
  projectId: "learnconnect-6f324",
  storageBucket: "learnconnect-6f324.appspot.com",
  messagingSenderId: "915054679433",
  appId: "1:915054679433:web:0a7daa005ff6b176eabd58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
