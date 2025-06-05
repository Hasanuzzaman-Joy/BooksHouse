import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config'
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updatedProfile = (name,photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const googleSign = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (userCredentials) =>{
            setUser(userCredentials);
            setLoading(false);
        })

        return () => unsubscribe();
    }, [])

    const logOut = () =>{
        return signOut(auth);
    }

    const userInfo = {
        register,
        updatedProfile,
        googleSign,
        login,
        logOut,
        user,
        loading
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;