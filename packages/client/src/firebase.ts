// src/firebase.ts
import { initializeApp } from 'firebase/app';
import type { User } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    getAuth,
    getIdToken,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
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

/**
 * ✅ Signup with Email + Password + Send Verification
 */
export const signUpWithEmail = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        return {
            user: userCredential.user,
            message: 'Verification email sent! Please check your inbox.',
        };
    }
    throw new Error('Signup failed');
};

/**
 * ✅ Restrict login unless email is verified
 */
export const signInWithEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    if (!userCredential.user.emailVerified) {
        auth.signOut(); // ✅ force logout unverified user
        throw new Error('Please verify your email before logging in.');
    }

    return userCredential;
};

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInAsGuest = () => signInAnonymously(auth);
export const logout = () => signOut(auth);

/**
 * ✅ Token Fetch
 */
export const getCurrentUserIdToken = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken(true);
};

export type FirebaseUser = User | null;
export { getIdToken, onAuthStateChanged };
