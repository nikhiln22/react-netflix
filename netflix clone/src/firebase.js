
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhRt4Rsu3lYXfyBvqZNAeZ6zscCjw8vtE",
    authDomain: "netflix-clone-1ec6d.firebaseapp.com",
    projectId: "netflix-clone-1ec6d",
    storageBucket: "netflix-clone-1ec6d.firebasestorage.app",
    messagingSenderId: "926795327587",
    appId: "1:926795327587:web:2514ff216f6d117d94f056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication

const auth = getAuth(app)

// configuring the firestore
const db = getFirestore(app);

// user signup functions

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email
        })
    } catch (error) {
        console.log('error occured while creating the user');
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// user login function

const login = async (email, password) => {
    console.log('hyyy from login');
    try {
        let res = await signInWithEmailAndPassword(auth, email, password);
        console.log('res from login:', res);
    } catch (error) {
        console.log('error occured while signing the user', error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// user logout function

const logout = async () => {
    signOut(auth);
}

export { auth, db, login, signup, logout }
