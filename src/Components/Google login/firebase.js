/** firebase file which allows google authencation and userImage storage */

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREFOX_APIKEY,
  authDomain: "book-easy-8711f.firebaseapp.com",
  projectId: "book-easy-8711f",
  storageBucket: "book-easy-8711f.appspot.com",
  messagingSenderId: "813563959871",
  appId: "1:813563959871:web:78bb2c5f58936147cd768a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

