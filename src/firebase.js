// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRgLfD7Yz9ZzThwK7lcISEbRxTeSrw_lw",
  authDomain: "react-chat-d4d47.firebaseapp.com",
  projectId: "react-chat-d4d47",
  storageBucket: "react-chat-d4d47.appspot.com",
  messagingSenderId: "673244517749",
  appId: "1:673244517749:web:c242d7738fd337a5b0ef3c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);



// https://firebase.google.com/docs/storage/web/upload-files