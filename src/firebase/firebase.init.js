// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvY0nrJuh0mPv-5W_Wy4uNT_iBqdnpE2M",
  authDomain: "study-mate-x11.firebaseapp.com",
  projectId: "study-mate-x11",
  storageBucket: "study-mate-x11.firebasestorage.app",
  messagingSenderId: "25648744127",
  appId: "1:25648744127:web:5d179e53812bb3059ae80a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);