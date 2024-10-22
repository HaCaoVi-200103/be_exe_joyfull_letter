// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuCQUKHJva0OLuwHVr4hlZnrOrmmv1iWs",
    authDomain: "project-exe-joyfull-fb.firebaseapp.com",
    projectId: "project-exe-joyfull-fb",
    storageBucket: "project-exe-joyfull-fb.appspot.com",
    messagingSenderId: "381322330949",
    appId: "1:381322330949:web:58ab32fa05625828c8b42c",
    measurementId: "G-92C45T7371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);