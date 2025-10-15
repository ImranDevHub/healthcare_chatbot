// src/firebase.ts
import { initializeApp } from 'firebase/app';
import type { User } from 'firebase/auth'; // ✅ FIXED
import {
    createUserWithEmailAndPassword,
    getAuth,
    getIdToken,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
    appId: import.meta.env.VITE_FIREBASE_APP_ID!,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID!,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signUpWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signInAsGuest = () => signInAnonymously(auth);

export const logout = () => signOut(auth);

export const getCurrentUserIdToken = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken(true);
};

export type FirebaseUser = User | null; // ✅ Works now

export { getIdToken, onAuthStateChanged };
