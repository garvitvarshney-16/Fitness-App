import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcHk-1Ktg0fFJFkpS2gSh8xGi_7Itq_AU",
    authDomain: "fitphy-beta-45d1a.firebaseapp.com",
    projectId: "fitphy-beta-45d1a",
    storageBucket: "fitphy-beta-45d1a.appspot.com",
    messagingSenderId: "695485437157",
    appId: "1:695485437157:web:d4c6cb1ae496597373700c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default { app };