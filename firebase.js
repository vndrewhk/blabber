// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATQJ1z-x0dLfdQViJAaRLY9Cen8E1Duh0",
  authDomain: "blabber-39fa2.firebaseapp.com",
  projectId: "blabber-39fa2",
  storageBucket: "blabber-39fa2.appspot.com",
  messagingSenderId: "307896111106",
  appId: "1:307896111106:web:92636c760afa003115971b",
  measurementId: "G-LLDJ83ZHYS",
};
// Initialize Firebase
// when using NextJS you have to use this line
// check if it's already initialized, otherwise use the initialized one
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
