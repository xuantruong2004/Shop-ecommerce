import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKczbl_9TJf8Hr9XBu5kLtvr9tOdjirUM",
  authDomain: "vincent-mart.firebaseapp.com",
  projectId: "vincent-mart",
  storageBucket: "vincent-mart.appspot.com",
  messagingSenderId: "376364391856",
  appId: "1:376364391856:web:018b771b5142eb52488a75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
