import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzxROzhFdnj-6bzYFqsAWi3ZezKOHIQl0",
  authDomain: "new-my-4d023.firebaseapp.com",
  projectId: "new-my-4d023",
  storageBucket: "new-my-4d023.appspot.com",
  messagingSenderId: "782356181741",
  appId: "1:782356181741:web:412fbde1ee11cd66f692e4",
  measurementId: "G-S74PN7SXGB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };