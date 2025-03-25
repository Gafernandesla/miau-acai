import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhxoqM2_YauYVnoZpml8RtKchgipNBbGg",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "miauacai-25d6b",
  storageBucket: "miauacai-25d6b.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "1:721933579698:android:63afb3af17fd49553020ab"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
