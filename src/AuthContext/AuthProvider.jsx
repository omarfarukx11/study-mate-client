import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.init';
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)


    //Google Sing in 
    const singInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth , GoogleProvider)
    }
    
    // sing with email 
    const singWithEmail = (email , password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth , email ,password)
    }
    



    // sing out 
    const logOutUser = () => {
    setLoading(true)
    return signOut(auth)
    
  }

  //state change 
   useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)
        setLoading(false)
    })
    return () => {
        unsubscribe()
    }
  }, []);


    const authInfo = {
        user, 
        setUser,
        loading,
        setLoading,
        singInWithGoogle,
        logOutUser,
        singWithEmail
        
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;