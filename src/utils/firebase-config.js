
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"




const firebaseConfig = {
  apiKey: "AIzaSyATOnl0PkZ31iDQ8hgFcVWsg3DM-fisBCQ",
  authDomain: "react-netfelix-clone.firebaseapp.com",
  projectId: "react-netfelix-clone",
  storageBucket: "react-netfelix-clone.appspot.com",
  messagingSenderId: "950420142653",
  appId: "1:950420142653:web:f34192ef9721ccda960854",
  measurementId: "G-8YLCTZQ38N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
