import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4M50oSbFvzwo1jr5GD-pLJWLRlAeleLg",
  authDomain: "vincentmart-49965.firebaseapp.com",
  projectId: "vincentmart-49965",
  storageBucket: "vincentmart-49965.appspot.com",
  messagingSenderId: "639075415954",
  appId: "1:639075415954:web:97b90a122503cc3c69b34b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
