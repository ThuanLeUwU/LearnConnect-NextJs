// Import the functions you need from the SDKs you need
"use client";
"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import '@firebase/messaging'
// import { useEffect } from "react";
import { getMessaging } from "@firebase/messaging";
import { getToken, onMessage, isSupported } from "firebase/messaging";
import { useEffect } from "react";
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
  appId: "1:915054679433:web:0a7daa005ff6b176eabd58",
  // measurementId: "G-69KWPWKQV6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const messaging = getMessaging(app);

// const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null

// const messaging = getMessaging(app);
// // const messaging = (async () => {
// //   try {
// //       const isSupportedBrowser = await isSupported();
// //       if (isSupportedBrowser) {
// //           return getMessaging(app);
// //       }
// //       console.log('Firebase not supported this browser');
// //       return null;
// //   } catch (err) {
// //       console.log(err);
// //       return null;
// //   }
// //   })();

// export const getMessageToken = async () => {
//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey:
//         "BEccK_g1DRAEjBnwADL8rjnayNbn_v4M7FwUw2qVtYeLHlCMhYKOqVnWdJ5cfWGWvA_0TNRDNGrMBVk0TJlMwd8",
//     });
//     if (currentToken) {
//       console.log("MessageToken", currentToken);
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("payload", payload);
//       resolve(payload);
//     });
//   });

// useEffect(() => {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       .register("/firebase-messaging-sw.js")
//       .then((registration) => {
//         console.log("Service Worker registered:", registration);
//       })
//       .catch((error) => {
//         console.error("Service Worker registration failed:", error);
//       });
//   }
// }, []);
