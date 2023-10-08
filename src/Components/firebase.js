// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREFOX_APIKEY}`,
  authDomain: "book-easy-8711f.firebaseapp.com",
  projectId: "book-easy-8711f",
  storageBucket: "book-easy-8711f.appspot.com",
  messagingSenderId: "813563959871",
  appId: "1:813563959871:web:78bb2c5f58936147cd768a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
