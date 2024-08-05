import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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