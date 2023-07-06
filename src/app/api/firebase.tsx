// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0N0WMrm6uUTJYlibyXdbGs7EXFnc6Yno",
  authDomain: "zimso-d10e9.firebaseapp.com",
  projectId: "zimso-d10e9",
  storageBucket: "zimso-d10e9.appspot.com",
  messagingSenderId: "477134893155",
  appId: "1:477134893155:web:21f28b89e6a8edc9968856",
  measurementId: "G-TL4ND4VV4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);