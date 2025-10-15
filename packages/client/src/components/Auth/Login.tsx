// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { login, googleLogin, guestLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const onGoogleSignIn = async () => {
        try {
            await googleLogin();
        } catch (error) {
            console.error(error);
        }
    };

    const onGuestSignIn = async () => {
        try {
            await guestLogin();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: 300,
                gap: 8,
            }}
        >
            <h2>Login</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8 }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, marginTop: 8 }}
                />
                <button type="submit" style={{ marginTop: 8, padding: 8 }}>
                    Login
                </button>
            </form>

            <button onClick={onGoogleSignIn} style={{ padding: 8 }}>
                Sign in with Google
            </button>
            <button onClick={onGuestSignIn} style={{ padding: 8 }}>
                Sign in as Guest
            </button>
        </div>
    );
}
