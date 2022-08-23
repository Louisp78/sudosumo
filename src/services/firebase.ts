// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth
} from "firebase/auth";

import {
    getFirestore
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsMi06mIE2gY9NT7fKfuWiKnDEUXZFVZc",
    authDomain: "sudosumo-88b0c.firebaseapp.com",
    projectId: "sudosumo-88b0c",
    storageBucket: "sudosumo-88b0c.appspot.com",
    messagingSenderId: "75139761668",
    appId: "1:75139761668:web:1e6b0a397d95478b13d751"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);