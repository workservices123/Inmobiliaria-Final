
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import {getFirestore, collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBar28uWpEXko8w6St8rFRXHsoc6RyvOXM",
    authDomain: "ventadecasas-c238e.firebaseapp.com",
    projectId: "ventadecasas-c238e",
    storageBucket: "ventadecasas-c238e.appspot.com",
    messagingSenderId: "828426909981",
    appId: "1:828426909981:web:4d54c459a33bc7bc8b09f4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)

    export const getProducts = (callback) => onSnapshot(collection(db,"products"), callback)