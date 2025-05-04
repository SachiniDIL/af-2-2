import React from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Heart } from 'lucide-react';
import {useNavigate} from "react-router-dom";


function Header({ isLoggedIn, onLoginClick, onLogout }) {
    const { darkMode } = useTheme();

    const navigate = useNavigate();

    const goToFavorites = () => {
        navigate('/favorites');
    };
    return (
        <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 text-blue-500"
                    >
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-xl font-bold">World Explorer</h1>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Favorite Heart Icon */}
                    <button
                        onClick={goToFavorites}
                        aria-label="View Favorites"
                        className="text-red-500 hover:text-red-600 transition-colors"
                    >
                        <Heart className="w-8 h-8 fill-red-500" />
                    </button>

                    <ThemeToggle />

                    {isLoggedIn ? (
                        <button
                            onClick={onLogout}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${darkMode
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-red-500 hover:bg-red-600 text-white'}`}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${darkMode
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;