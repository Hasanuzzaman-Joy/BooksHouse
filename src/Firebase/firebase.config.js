import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APIKEY,
  authDomain:import.meta.env.VITE_AUTHDOMAIN, 
  projectId:import.meta.env.VITE_PROJECTID, 
  storageBucket:import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGINGSENDERID, 
  appId:import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export default auth;