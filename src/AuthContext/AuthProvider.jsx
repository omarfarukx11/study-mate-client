import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
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
    

    const logOutUser = () => {
    setLoading(true)
    return signOut(auth)
    
  }


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
        
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;