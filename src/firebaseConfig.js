// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAePU-H-7Byc-ZPELJCOCYlHOZdMMYP-ZU",
  authDomain: "task-trek-30f75.firebaseapp.com",
  projectId: "task-trek-30f75",
  storageBucket: "task-trek-30f75.firebasestorage.app",
  messagingSenderId: "92849140557",
  appId: "1:92849140557:web:4c1db0b30a6553d901bd04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };