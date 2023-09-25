// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPgIyZu8EuRHkAc-wLoXs1TY_8xF9KoiQ",
  authDomain: "fir-learnconnect.firebaseapp.com",
  projectId: "fir-learnconnect",
  storageBucket: "fir-learnconnect.appspot.com",
  messagingSenderId: "332731337191",
  appId: "1:332731337191:web:f04ed5fc1182e6cfdbd542",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
