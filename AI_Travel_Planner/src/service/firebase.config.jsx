// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import
import { getAuth } from "firebase/auth";            // ✅ Optional: if using auth
// import { getAnalytics } from "firebase/analytics"; // Optional: only use in browser

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAUuYb8NiNGk0h1AJhOnh2lGYI_atEDzI",
  authDomain: "ai-travel-planner-a85b3.firebaseapp.com",
  projectId: "ai-travel-planner-a85b3",
  storageBucket: "ai-travel-planner-a85b3.appspot.com", // ❗ FIXED: correct domain is `.appspot.com`
  messagingSenderId: "722667913538",
  appId: "1:722667913538:web:dab31224ae6ca898c348db",
  measurementId: "G-L3JNE7MH9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app); // Enable only if needed in browser

export { app, db, auth };
