// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCEfLC8QnGWe2r0qAVTNatJqDK7ezZcICk",
  authDomain: "learnconnect-6f324.firebaseapp.com",
  projectId: "learnconnect-6f324",
  storageBucket: "learnconnect-6f324.appspot.com",
  messagingSenderId: "915054679433",
  appId: "1:915054679433:web:0a7daa005ff6b176eabd58",
  measurementId: "G-69KWPWKQV6",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
