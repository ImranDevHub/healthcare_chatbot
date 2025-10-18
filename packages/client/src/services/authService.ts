import apiClient from './apiClient';
import type { UserCredential } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInAnonymously,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';

// Note: The 'login' and 'logout' functions in this service are placeholders.
// The actual sign-in/out logic is handled directly in the useAuth hook using Firebase client SDK.

export const signup = async (email: string, password: string) => {
    const response = await apiClient.post<{ uid: string }>('/auth/signup', {
        email,
        password,
    });

    return response.data;
};

export const guestLogin = async () => {
    const response = await apiClient.post<{ token: string }>('/auth/guest');
    await signInAnonymously(auth);
    return response.data;
};

export const getProtectedData = async () => {
    const response = await apiClient.get<{ message: string }>(
        '/auth/protected'
    );
    return response.data;
};
