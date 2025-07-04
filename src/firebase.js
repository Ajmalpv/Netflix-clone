
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";





const firebaseConfig = {
  apiKey: "AIzaSyAnRDFroU_Xaqf7KN80RcsZ6NW_wtTM8mI",
  authDomain: "netflix-clone-a0360.firebaseapp.com",
  projectId: "netflix-clone-a0360",
  storageBucket: "netflix-clone-a0360.firebasestorage.app",
  messagingSenderId: "742197862968",
  appId: "1:742197862968:web:ca4410ddb592c1d876fccd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);


const signup = async(name,email,password)=>{
    try {
       const res= await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       }
    );
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}

const logout = ()=>{
    signOut(auth);
}


export {auth, db, login, signup, logout};