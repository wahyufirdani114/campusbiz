// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { app } from './firebaseConfig';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdrQPXYnhJrUoa54BqISEr7IE94xOEhcM",
  authDomain: "ciptamuda-9a82b.firebaseapp.com",
  projectId: "ciptamuda-9a82b",
  storageBucket: "ciptamuda-9a82b.firebasestorage.app",
  messagingSenderId: "259178589220",
  appId: "1:259178589220:web:16218a8908410bafcf3cb1"
};
try {
  const app = initializeApp(firebaseConfig);
  console.log("Firebase App Initialized:", app);
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig); 