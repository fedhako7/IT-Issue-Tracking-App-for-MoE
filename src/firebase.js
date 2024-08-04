// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const API_KEY = process.env.REACT_APP_API_KEY
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "employeeprofile-b736a.firebaseapp.com",
  projectId: "employeeprofile-b736a",
  storageBucket: "employeeprofile-b736a.appspot.com",
  messagingSenderId: "1013863354886",
  appId: "1:1013863354886:web:c73fb021c53f962d1c2987",
  measurementId: "G-SZEW772P1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app