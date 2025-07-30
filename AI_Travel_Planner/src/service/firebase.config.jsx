// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import
import { getAuth } from "firebase/auth";            // ✅ Optional: if using auth
// import { getAnalytics } from "firebase/analytics"; // Optional: only use in browser

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCAUuYb8NiNGk0h1AJhOnh2lGYI_atEDzI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ai-travel-planner-a85b3.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ai-travel-planner-a85b3",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ai-travel-planner-a85b3.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "722667913538",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:722667913538:web:dab31224ae6ca898c348db",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-L3JNE7MH9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app); // Enable only if needed in browser

export { app, db, auth };
