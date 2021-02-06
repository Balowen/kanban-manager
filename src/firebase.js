import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBeP-pSu--LClHgDALLBtrTlkXON4kJANk",
  authDomain: "kanban-manager-963df.firebaseapp.com",
  databaseURL: "https://kanban-manager-963df-default-rtdb.firebaseio.com",
  projectId: "kanban-manager-963df",
  storageBucket: "kanban-manager-963df.appspot.com",
  messagingSenderId: "1055885745435",
  appId: "1:1055885745435:web:dbc32983a80045d1d647be",
});

const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();

export { auth, google, firebaseConfig as firebase };
