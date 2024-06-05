// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnwq7P-zdoWx48jgd-1GfAad1dOiT3srU",
  authDomain: "simple-fire-e17c8.firebaseapp.com",
  projectId: "simple-fire-e17c8",
  storageBucket: "simple-fire-e17c8.appspot.com",
  messagingSenderId: "917600043955",
  appId: "1:917600043955:web:e9740aefb372f942f201c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth; 