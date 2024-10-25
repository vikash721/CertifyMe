// src/components/Login&Signup/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDryS1LW8OismbSb4ceUgk2Xf_WiAeOjV4",
  authDomain: "certifyme-01.firebaseapp.com",
  projectId: "certifyme-01",
  storageBucket: "certifyme-01.appspot.com",
  messagingSenderId: "547399521378",
  appId: "1:547399521378:web:6c26f90dca5d78e9dcad3b",
  measurementId: "G-Z2MKJG0WS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current session only.
  })
  .catch((error) => {
    // Handle errors here.
    console.error("Error setting persistence:", error);
  });

const db = getFirestore(app);

export { auth, db };








// PRINCE



// // src/components/Login&Signup/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD-4V5IWvx0thj1M3oMbpbo3b7s1gjErjU",
//   authDomain: "studentlogin-2f0c8.firebaseapp.com",
//   projectId: "studentlogin-2f0c8",
//   storageBucket: "studentlogin-2f0c8.appspot.com",
//   messagingSenderId: "333348473239",
//   appId: "1:333348473239:web:ecd41bd219dc8ef453dcd2",
//   measurementId: "G-SZ5PEY74YP"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };
