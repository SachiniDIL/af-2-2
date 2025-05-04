import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import './CountryDetails.css';
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import {useCountryContext} from "../hooks/UseCountryContext.jsx";

function CountryDetailsPage() {
    const { countryCode } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const { countries } = useCountryContext();

    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Check login status
        const savedLoginState = localStorage.getItem('isLoggedIn');
        if (savedLoginState === 'true') {
            setIsLoggedIn(true);
        }

        // Find the country in our existing data
        if (countries && countries.length > 0) {
            const foundCountry = countries.find(c => c.cca3 === countryCode);
            if (foundCountry) {
                setCountry(foundCountry);
                setLoading(false);
                // Trigger animation after data is loaded
                setTimeout(() => setShowContent(true), 100);
                return;
            }
        }

        // If not found or countries not loaded yet, fetch it
        fetchCountryDetails();
    }, [countryCode, countries]);

    const fetchCountryDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);

            if (!response.ok) {
                throw new Error('Country not found');
            }

            const data = await response.json();
            if (data && data.length > 0) {
                setCountry(data[0]);
                setLoading(false);
                // Trigger animation after data is loaded
                setTimeout(() => setShowContent(true), 100);
            } else {
                throw new Error('No data returned');
            }
        } catch (err) {
            setError(`Failed to load country details: ${err.message}`);
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        // Animate out before navigation
        setShowContent(false);
        setTimeout(() => navigate('/'), 300);
    };

    // Handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <div className="container mx-auto p-4 flex justify-center items-center h-64">
                    <div className="loader"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <div className="container mx-auto p-4">
                    <button
                        onClick={handleGoBack}
                        className="back-button flex items-center mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Countries
                    </button>
                    <div className="error-container text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded-lg shadow-lg">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!country) {
        return (
            <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <div className="container mx-auto p-4">
                    <button
                        onClick={handleGoBack}
                        className="back-button flex items-center mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Countries
                    </button>
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                        <p>Country not found</p>
                    </div>
                </div>
            </div>
        );
    }

    // Format population with commas
    const formattedPopulation = country.population.toLocaleString();

    // Get languages as array
    const languages = country.languages ? Object.values(country.languages) : [];

    // Get currencies
    const currencies = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ') : 'N/A';

    // Get capital
    const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';

    return (
        <div className={`min-h-screen page-background ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

            <div className={`container mx-auto p-4 md:p-8 ${showContent ? 'content-visible' : 'content-hidden'}`}>
                <button
                    onClick={handleGoBack}
                    className="back-button flex items-center mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="Back to countries list"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    <span>Back to Countries</span>
                </button>

                <div className={`country-card rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    {/* Country header with flag and name */}
                    <div className="relative h-56 md:h-72 w-full overflow-hidden">
                        <img
                            src={country.flags.svg || country.flags.png}
                            alt={`Flag of ${country.name.common}`}
                            className="country-flag w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                            <div className="p-6 text-white">
                                <h1 className="country-name text-3xl md:text-5xl font-bold">{country.name.common}</h1>
                                <p className="country-official-name text-lg opacity-90 italic mt-2">{country.name.official}</p>
                            </div>
                        </div>
                    </div>

                    {/* Country details */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left column */}
                            <div className="details-section">
                                <h2 className="section-title text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    General Information
                                </h2>
                                <ul className="space-y-4">
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Capital</span>
                                        <span className="detail-value text-lg">{capital}</span>
                                    </li>
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Population</span>
                                        <span className="detail-value text-lg">{formattedPopulation}</span>
                                    </li>
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Region</span>
                                        <span className="detail-value text-lg">{country.region}</span>
                                    </li>
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Subregion</span>
                                        <span className="detail-value text-lg">{country.subregion || 'N/A'}</span>
                                    </li>
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Area</span>
                                        <span className="detail-value text-lg">{country.area.toLocaleString()} km²</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Right column */}
                            <div className="details-section">
                                <h2 className="section-title text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    Additional Details
                                </h2>
                                <ul className="space-y-4">
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Currencies</span>
                                        <span className="detail-value text-lg">{currencies}</span>
                                    </li>
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Languages</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {languages.length > 0 ? (
                                                languages.map((lang, index) => (
                                                    <span
                                                        key={index}
                                                        className={`tag px-3 py-1 rounded-full text-sm ${
                                                            darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {lang}
                                                    </span>
                                                ))
                                            ) : (
                                                <span>N/A</span>
                                            )}
                                        </div>
                                    </li>
                                    <li className="detail-item flex flex-col">
                                        <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Time Zones</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {country.timezones && country.timezones.map((timezone, index) => (
                                                <span
                                                    key={index}
                                                    className={`tag px-3 py-1 rounded-full text-sm ${
                                                        darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {timezone}
                                                </span>
                                            ))}
                                        </div>
                                    </li>
                                    {country.borders && country.borders.length > 0 && (
                                        <li className="detail-item flex flex-col">
                                            <span className="detail-label font-medium text-gray-500 dark:text-gray-300">Borders</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {country.borders.map((border, index) => (
                                                    <span
                                                        key={index}
                                                        className={`border-tag px-3 py-1 rounded-full text-sm ${
                                                            darkMode ? 'bg-blue-700/40 text-blue-100' : 'bg-blue-100 text-blue-800'
                                                        }`}
                                                    >
                                                        {border}
                                                    </span>
                                                ))}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Map section */}
                        {country.latlng && country.latlng.length >= 2 && (
                            <div className="mt-8">
                                <h2 className="section-title text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    Location
                                </h2>
                                <div className="map-container rounded-lg overflow-hidden h-64 bg-gray-200 shadow-md">
                                    <img
                                        src={`/api/placeholder/800/400`}
                                        alt={`Map of ${country.name.common}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400">
                                        Map placeholder: {country.latlng[0]}°, {country.latlng[1]}°
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        <Footer/>
        </div>
    );
}

export default CountryDetailsPage;