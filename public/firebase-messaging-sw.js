importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyD3TLQ5ow38JMlcwcLjKTknAxEFvUoiFmU",
  authDomain: "furnifuture-47b90.firebaseapp.com",
  projectId: "furnifuture-47b90",
  storageBucket: "furnifuture-47b90.appspot.com",
  messagingSenderId: "898438347344",
  appId: "1:898438347344:web:8eeb51ac577a641e16af55",
  measurementId: "G-NNFHE0MEQ7",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
