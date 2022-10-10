import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWPG-cOl2uT1dCgdKIbe2AYzQrGlwXn_o",
  authDomain: "chakra-df025.firebaseapp.com",
  projectId: "chakra-df025",
  storageBucket: "chakra-df025.appspot.com",
  messagingSenderId: "1091804011468",
  appId: "1:1091804011468:web:3718c947a6bb56f4855b69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };