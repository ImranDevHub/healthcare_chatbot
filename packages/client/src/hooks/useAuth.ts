import { useState, useEffect } from 'react';
import {
    auth,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInAsGuest,
    logout as firebaseLogout,
} from '../firebase';
import type { User } from '../types/user';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    // Track Firebase Auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
            if (firebaseUser && firebaseUser.emailVerified) {
                setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string) => {
        // ✅ signUpWithEmail sends verification & logs out automatically
        const result = await signUpWithEmail(email, password);
        alert(result.message);
    };

    const login = async (email: string, password: string) => {
        const userCredential = await signInWithEmail(email, password);
        setUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
        });
    };

    const googleLogin = async () => {
        const userCredential = await signInWithGoogle();
        if (!userCredential.user.emailVerified) {
            await firebaseLogout();
            throw new Error('Please verify your email before logging in.');
        }
        setUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
        });
    };

    const guestLogin = async () => {
        const userCredential = await signInAsGuest();
        setUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
        });
    };

    const logout = async () => {
        localStorage.removeItem('activeConversation');
        await firebaseLogout();
        setUser(null);
    };

    return { user, signup, login, googleLogin, guestLogin, logout };
};
