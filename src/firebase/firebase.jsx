import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUEabEReP7sBNCJwwOys4Qihp_u2zcKeg",
  authDomain: "filmyverse-fc6e7.firebaseapp.com",
  projectId: "filmyverse-fc6e7",
  storageBucket: "filmyverse-fc6e7.appspot.com",
  messagingSenderId: "907939850027",
  appId: "1:907939850027:web:454462479aed810bd0076e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");


export default app;
