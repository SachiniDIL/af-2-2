import React, {useMemo, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import CountryCarousel from '../components/CountryCarousel.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useCountryContext } from '../hooks/UseCountryContext.jsx';
import {ArrowLeft} from "lucide-react";
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import Login from "../components/login.jsx";

function Favorites() {
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const {
        countries,
        loading,
        error,
    } = useCountryContext();

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [showLoginModal, setShowLoginModal] = React.useState(false);

    // Read favorites from cookie or localStorage
    const getFavoriteCountryCodes = () => {
        try {
            const raw = decodeURIComponent(document.cookie
                .split('; ')
                .find(row => row.startsWith('favorites='))?.split('=')[1] || '[]');
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
        } catch {
            return [];
        }
    };

    const favoriteCountryCodes = useMemo(() => getFavoriteCountryCodes(), []);

    const favoriteCountries = useMemo(() => {
        if (!countries || countries.length === 0) return [];
        return countries.filter(c => favoriteCountryCodes.includes(c.cca3));
    }, [countries, favoriteCountryCodes]);

    const handleCountrySelect = useCallback((country) => {
        navigate(`/country/${country.cca3}`);
    }, [navigate]);

    const handleLogin = useCallback((success) => {
        setIsLoggedIn(success);
        setShowLoginModal(false);
        if (success) {
            localStorage.setItem('isLoggedIn', 'true');
        }
    }, []);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }, []);

    useEffect(() => {
        const savedLoginState = localStorage.getItem('isLoggedIn');
        if (savedLoginState === 'true') {
            setIsLoggedIn(true);
        }
    }, []);


    const handleGoBack = () => {
        navigate('/');
    };
    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
            <Header
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setShowLoginModal(true)}
                onLogout={handleLogout}
            />

            {showLoginModal && (
                <Login onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
            )}

            <main className="flex-grow p-4 md:p-8">
                <button
                    onClick={handleGoBack}
                    className="flex items-center mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Countries
                </button>
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">Your Favorite Countries</h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
                            <p>Error loading countries: {error}</p>
                        </div>
                    ) : favoriteCountries.length === 0 ? (
                        <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg">
                            <p>You have no favorite countries yet.</p>
                        </div>
                    ) : (
                        <CountryCarousel
                            countries={favoriteCountries}
                            onSelectCountry={handleCountrySelect}
                        />
                    )}
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Favorites;
