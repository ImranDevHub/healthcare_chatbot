import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <nav className="bg-white shadow-md w-full p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
                ሸጋ-Health
            </Link>
            <div>
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">
                            Welcome, {user.email || 'User'}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
