// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGH1LaKCjYmeEYnfZdKqKr2cUSZpcYYjA",
  authDomain: "blvckbox-backend.firebaseapp.com",
  projectId: "blvckbox-backend",
  storageBucket: "blvckbox-backend.firebasestorage.app",
  messagingSenderId: "988077506538",
  appId: "1:988077506538:web:1bc0cf38723865bda9bc93",
  measurementId: "G-G2FRM75LSH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const recaptchaVerifier = () =>
  new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
  });

export { RecaptchaVerifier };
