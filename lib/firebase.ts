import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkUIh_6aY5I7UFzZzLMdU-j4HpvPerLbA",
  authDomain: "mutabaat-warsh.firebaseapp.com",
  projectId: "mutabaat-warsh",
  storageBucket: "mutabaat-warsh.firebasestorage.app",
  messagingSenderId: "819271946025",
  appId: "1:819271946025:web:f6c1cc428f0220bdabf138"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);