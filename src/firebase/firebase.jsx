// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
   

const firebaseConfig = {
  apiKey: "AIzaSyAyDGB0S8Q2Zc8yCqtsL9AHui36vAP5oBY",
  authDomain: "scalepaluniverse.firebaseapp.com",
  projectId: "scalepaluniverse",
  storageBucket: "scalepaluniverse.appspot.com",
  messagingSenderId: "461378060230",
  appId: "1:461378060230:web:e9b517486a260aa694fcc7",
  measurementId: "G-8QJV11JB94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore( app );



export { auth, db , app }