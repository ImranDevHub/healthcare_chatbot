import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
    const { signup, googleLogin, guestLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup(email, password);
            alert('Signup successful!');
        } catch (err) {
            console.error(err);
            alert('Signup failed');
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
            <h2>Sign Up</h2>

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
                    placeholder="Password (6+ chars)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, marginTop: 8 }}
                />
                <button type="submit" style={{ marginTop: 8, padding: 8 }}>
                    Sign Up
                </button>
            </form>

            <button onClick={() => googleLogin()} style={{ padding: 8 }}>
                Continue with Google
            </button>
            <button onClick={() => guestLogin()} style={{ padding: 8 }}>
                Continue as Guest
            </button>
        </div>
    );
}
