import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';

function Login({ onLogin, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { darkMode } = useTheme();

    // Simple frontend validation
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Simple email validation
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        // For demo purposes, allow any valid email/password combination
        // In a real app, this would validate against a backend API
        if (password.length >= 6) {
            onLogin(true);
        } else {
            setError('Password must be at least 6 characters');
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div
                className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
          w-full max-w-md rounded-lg shadow-xl overflow-hidden`}
            >
                <div className="relative p-6">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg ${
                                    darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg ${
                                    darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="******"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
                                darkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm">
                        <p className="text-gray-500">
                            This is a demo login. Any email and password (min 6 chars) will work.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;