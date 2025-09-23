import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Register a new user
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile
  const updatedProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      setUser({ ...auth.currentUser });
    });
  };

  // Sign in using Google
  const googleSign = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Login with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Send password reset email
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Log out the current user
  const logOut = () => {
    return signOut(auth);
  };

  // Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredentials) => {
      setUser(userCredentials);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

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
    setErr,
  };

  // Provide auth context to child components
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
