import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGFe1V1vCjaedzmkYj-W9aB3YiveGbWc4",
  authDomain: "casamento-385b1.firebaseapp.com",
  projectId: "casamento-385b1",
  storageBucket: "casamento-385b1.firebasestorage.app",
  messagingSenderId: "1047477632223",
  appId: "1:1047477632223:web:738e6d3debe012925b3d6a",
  measurementId: "G-VMXV1XH80T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };