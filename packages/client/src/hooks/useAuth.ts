import { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    signInAnonymously,
} from 'firebase/auth';
import { auth } from '../firebase';
import * as authService from '../services/authService';
import type { User } from '../types/user';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
            if (firebaseUser) {
                setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string) => {
        await authService.signup(email, password);
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const guestLogin = async () => {
        await authService.guestLogin();
    };

    const logout = () => {
        return signOut(auth);
    };

    return { user, signup, login, googleLogin, guestLogin, logout };
};
