import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGw6AwLSYTVZx43LVdZWExq_GYTWzOV5o",
  authDomain: "react-todo-277ab.firebaseapp.com",
  projectId: "react-todo-277ab",
  storageBucket: "react-todo-277ab.appspot.com",
  messagingSenderId: "36440457519",
  appId: "1:36440457519:web:56de1b02e86174469ae1da"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();