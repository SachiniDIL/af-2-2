import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useCountryContext } from '../hooks/UseCountryContext.jsx';
import { filterCountries } from '../utils/filterCountries.js';
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import Login from "../components/login.jsx";
import SearchBar from "../components/SearchBar.jsx";
import RegionFilter from "../components/regionFilter.jsx";
import LanguageFilter from "../components/languageFilter.jsx";
import CountryCarousel from "../components/CountryCarousel.jsx";

function Home() {
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const {
        countries,
        loading,
        error,
        filteredCountries,
        fetchByRegion,
        fetchByLangCode
    } = useCountryContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Store filter selections in localStorage to persist between renders
    useEffect(() => {
        // Load saved filters on initial render
        const savedRegion = localStorage.getItem('selectedRegion');
        const savedLanguage = localStorage.getItem('selectedLanguage');

        if (savedRegion) {
            setSelectedRegion(savedRegion);
        }

        if (savedLanguage) {
            setSelectedLanguage(savedLanguage);
        }
    }, []);

    // Save region selection to localStorage when it changes
    useEffect(() => {
        if (selectedRegion !== undefined) {
            localStorage.setItem('selectedRegion', selectedRegion);
        }
    }, [selectedRegion]);

    // Save language selection to localStorage when it changes
    useEffect(() => {
        if (selectedLanguage !== undefined) {
            localStorage.setItem('selectedLanguage', selectedLanguage);
        }
    }, [selectedLanguage]);

    // Load login state from localStorage on initial render
    useEffect(() => {
        const savedLoginState = localStorage.getItem('isLoggedIn');
        if (savedLoginState === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    // Determine which countries to display based on filters
    const displayCountries = useMemo(() => {
        // For search, filter the countries locally
        if (searchTerm && countries && countries.length > 0) {
            return filterCountries(countries, searchTerm);
        }

        // If we have filtered results from region/language filters
        if (filteredCountries && Array.isArray(filteredCountries) && filteredCountries.length > 0) {
            return filteredCountries;
        }

        // Default to all countries
        return countries || [];
    }, [countries, filteredCountries, searchTerm]);

    // Handle search input change
    const handleSearchChange = useCallback((value) => {
        setSearchTerm(value);

        // Only clear other filters if search is being used
        if (value) {
            setSelectedLanguage('');
            localStorage.removeItem('selectedLanguage');
            setSelectedRegion('');
            localStorage.removeItem('selectedRegion');
        }
    }, []);

    // Handle region selection
    const handleRegionChange = useCallback((region) => {
        // Clear search and language filters
        if (searchTerm) {
            setSearchTerm('');
        }

        if (selectedLanguage) {
            setSelectedLanguage('');
            localStorage.removeItem('selectedLanguage');
        }

        // Set the selected region
        setSelectedRegion(region);

        // Call the API
        fetchByRegion(region);
    }, [fetchByRegion, searchTerm, selectedLanguage]);

    // Handle language selection
    const handleLanguageChange = useCallback((language) => {
        // Clear search and region filters
        if (searchTerm) {
            setSearchTerm('');
        }

        if (selectedRegion) {
            setSelectedRegion('');
            localStorage.removeItem('selectedRegion');
        }

        // Set the selected language
        setSelectedLanguage(language);

        // Call the API
        fetchByLangCode(language);
    }, [fetchByLangCode, searchTerm, selectedRegion]);

    // Handle country selection - navigate to details page
    const handleCountrySelect = useCallback((country) => {
        navigate(`/country/${country.cca3}`);
    }, [navigate]);

    // Handle login
    const handleLogin = useCallback((success) => {
        setIsLoggedIn(success);
        setShowLoginModal(false);
        if (success) {
            localStorage.setItem('isLoggedIn', 'true');
        }
    }, []);

    // Handle logout
    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }, []);

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
                <div className="container mx-auto">
                    {/* Filters Section */}
                    <div className="mb-8 flex flex-col md:flex-row gap-4">
                        <SearchBar onSearchChange={handleSearchChange} value={searchTerm} />
                        <div className="flex gap-4 flex-wrap">
                            <RegionFilter
                                onRegionChange={handleRegionChange}
                                selectedRegion={selectedRegion}
                            />
                            <LanguageFilter
                                onLanguageChange={handleLanguageChange}
                                selectedLanguage={selectedLanguage}
                            />
                        </div>
                    </div>

                    {/* Loading, Error, or Countries Display */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
                            <p>Error loading countries: {error}</p>
                        </div>
                    ) : (
                        <CountryCarousel
                            countries={displayCountries}
                            onSelectCountry={handleCountrySelect}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;