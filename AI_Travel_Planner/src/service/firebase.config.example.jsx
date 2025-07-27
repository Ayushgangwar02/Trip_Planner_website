// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import
import { getAuth } from "firebase/auth";            // ✅ Optional: if using auth
// import { getAnalytics } from "firebase/analytics"; // Optional: only use in browser

// Your web app's Firebase configuration
// 🔥 IMPORTANT: Replace these values with your own Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app); // Enable only if needed in browser

export { app, db, auth };
