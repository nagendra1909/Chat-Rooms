
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCc8wncN9a0vIfvnbyYclKZwuiqK_SbNgM",
  authDomain: "chat-88730.firebaseapp.com",
  projectId: "chat-88730",
  storageBucket: "chat-88730.firebasestorage.app",
  messagingSenderId: "285222100087",
  appId: "1:285222100087:web:2e2876edf9316a5be53a72",
  measurementId: "G-TDMNEH33S0"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);