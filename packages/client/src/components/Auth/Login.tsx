import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import logo from '/logo/SHEGAAsset-7@4x.png';

export default function Login() {
    const { login, googleLogin, guestLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Failed to log in.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError('');
        try {
            await googleLogin();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGuest = async () => {
        setError('');
        try {
            await guestLogin();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col items-center">
                <Link to="/">
                    <img
                        src={logo}
                        alt="ሸጋ-Health"
                        className="size-6 self-center"
                    />
                </Link>
                <h2 className="text-2xl font-bold mb-6 text-white">
                    Sign in to your account
                </h2>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-600 p-7 rounded-lg w-96 text-white shadow-gray-300 shadow-2xl/10">
                {error && (
                    <div className="bg-red-600 p-2 rounded mb-4">{error}</div>
                )}

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="p-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="p-1 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded text-white"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-gray-400 text-sm mt-2 text-center">
                    Passwords must meet your account’s security policy.
                </p>

                <div className="my-4 flex items-center justify-center gap-2">
                    <hr className="flex-1 border-gray-600" />
                    <span>Or continue with</span>
                    <hr className="flex-1 border-gray-600" />
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleGoogle}
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-white flex justify-center items-center gap-2"
                    >
                        <FcGoogle />
                        Google
                    </button>
                    <button
                        onClick={handleGuest}
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-white"
                    >
                        User Guest
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <Link
                        to="/signup"
                        className="text-indigo-400 hover:underline"
                    >
                        Not a member? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
