import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { FcGoogle } from 'react-icons/fc';
import logo from '../../../public/logo/SHEGAAsset-7@4x.png';

export default function Signup() {
    const { signup, googleLogin, guestLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Password validation
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    const allValid = Object.values(requirements).every(Boolean);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!allValid) {
            setError('Password does not meet the required criteria.');
            return;
        }

        setLoading(true);
        try {
            const result = await signup(email, password);
            setMessage(
                result?.message || 'Verification email sent! Check your inbox.'
            );
            setEmail('');
            setPassword('');
        } catch (err: any) {
            setError(err.message || 'Failed to sign up.');
        } finally {
            setLoading(false);
        }
    };

    const renderRequirement = (label: string, met: boolean) => (
        <div className="flex items-center gap-2 text-sm">
            {met ? (
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
            ) : (
                <XCircleIcon className="w-4 h-4 text-red-400" />
            )}
            <span className={met ? 'text-green-400' : 'text-gray-400'}>
                {label}
            </span>
        </div>
    );

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
                    Create your account
                </h2>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-600 shadow-gray-300 shadow-2xl/10  p-7 rounded-lg w-96 text-white shadow-md">
                {error && (
                    <div className="bg-red-600 p-2 rounded mb-4">{error}</div>
                )}
                {message && (
                    <div className="bg-green-600 p-2 rounded mb-4">
                        {message}
                    </div>
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

                    {/* Password tracker */}
                    {password && (
                        <div className="bg-gray-700 p-3 rounded text-sm space-y-1 border border-gray-600">
                            <h4 className="text-gray-300 font-semibold mb-1">
                                Password must include:
                            </h4>
                            {renderRequirement(
                                'At least 8 characters',
                                requirements.length
                            )}
                            {renderRequirement(
                                'An uppercase letter',
                                requirements.uppercase
                            )}
                            {renderRequirement(
                                'A lowercase letter',
                                requirements.lowercase
                            )}
                            {renderRequirement('A number', requirements.number)}
                            {renderRequirement(
                                'A special character',
                                requirements.special
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !allValid}
                        className={`p-2 rounded text-white transition ${
                            allValid
                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                : 'bg-red-800 cursor-not-allowed'
                        }`}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
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
                <div className="mt-4 flex flex-col gap-2 text-center">
                    <Link
                        to="/login"
                        className="text-indigo-400 hover:underline"
                    >
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
