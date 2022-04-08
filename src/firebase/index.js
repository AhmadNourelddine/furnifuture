import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useDispatch } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyD3TLQ5ow38JMlcwcLjKTknAxEFvUoiFmU",
  authDomain: "furnifuture-47b90.firebaseapp.com",
  projectId: "furnifuture-47b90",
  storageBucket: "furnifuture-47b90.appspot.com",
  messagingSenderId: "898438347344",
  appId: "1:898438347344:web:8eeb51ac577a641e16af55",
  measurementId: "G-NNFHE0MEQ7",
};

initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getUserToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BJsLwJJRVnMVYBhIM5gHF9TFCg4TrC8Q6RhRmWxtVTL5TYnQ5uSAegqZ7Ld8CHF18TuiWzYEQXXXeT1JWrpKvVk",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        window.localStorage.setItem("firebaseToken", currentToken);
        setTokenFound(true);
        let token = window.localStorage.getItem("authToken");
        axios
          .post(
            "http://127.0.0.1:8000/api/user/save-firebase-token",
            {
              firebaseToken: currentToken,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const sendNotification = async (token, name) => {
  await axios
    .post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: token,
        data: {
          body: name + " made a shipping purchase",
          title: "New Order To Deliver",
        },
      },
      {
        headers: {
          Authorization:
            "key=AAAA0S8ZOlA:APA91bFPj-ZHbHstunokGmuk5MicywDswvlrW5h4BF0aRxwizUN7jytQnXL8S1GHeZNcdTsEoeslbIu_m6Ej8e2Agy745Q10tEYEjDa0TcVhA-ijOD1OO6v7jmA6VnDV-jfel-2DLewk",
          "Content-Type": "application/json",
        },
      }
    )
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
