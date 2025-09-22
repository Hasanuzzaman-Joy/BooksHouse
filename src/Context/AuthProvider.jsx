import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config'
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updatedProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
            .then(() => {
                setUser({ ...auth.currentUser });
            })
    }

    const googleSign = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCredentials) => {
            setUser(userCredentials);
            setLoading(false);
        })

        return () => unsubscribe();
    }, [])

    const userInfo = {
        register,
        updatedProfile,
        googleSign,
        login,
        resetPassword,
        logOut,
        user,
        loading,
        setLoading,
        err,
        setErr
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;