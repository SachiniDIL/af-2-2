import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useCountryContext } from '../hooks/UseCountryContext.jsx';

function SearchBar({ onSearchChange }) {
    const [search, setSearch] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const { darkMode } = useTheme();
    const { countries } = useCountryContext();
    const suggestionRef = useRef(null);

    // Handle clicks outside the suggestions dropdown to close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Generate suggestions based on current input
    useEffect(() => {
        if (search && countries && countries.length > 0) {
            const matchedCountries = countries
                .filter(country =>
                    country.name.common.toLowerCase().includes(search.toLowerCase()) ||
                    (country.name.official && country.name.official.toLowerCase().includes(search.toLowerCase()))
                )
                .slice(0, 5); // Limit to 5 suggestions for better UX

            setSuggestions(matchedCountries);
            setShowSuggestions(matchedCountries.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [search, countries]);

    // Debounce search input to avoid excessive API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearchChange(search);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search, onSearchChange]);

    // Handle suggestion selection
    const handleSelectSuggestion = (countryName) => {
        setSearch(countryName);
        onSearchChange(countryName);
        setShowSuggestions(false);
    };

    return (
        <div className="w-full md:w-96" ref={suggestionRef}>
            <div className={`relative ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a country..."
                    className={`w-full py-3 pl-10 pr-4 rounded-lg ${
                        darkMode
                            ? 'bg-gray-700 placeholder-gray-400 text-white border-gray-600'
                            : 'bg-white placeholder-gray-500 text-gray-900 border-gray-300'
                    } border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    onFocus={() => {
                        if (suggestions.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                />
                {search && (
                    <button
                        onClick={() => {
                            setSearch('');
                            onSearchChange('');
                            setShowSuggestions(false);
                        }}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && (
                <div className={`absolute z-10 w-full md:w-96 mt-1 rounded-md shadow-lg ${
                    darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <ul className="py-1">
                        {suggestions.map((country, index) => (
                            <li
                                key={country.cca3 || index}
                                onClick={() => handleSelectSuggestion(country.name.common)}
                                className={`px-4 py-2 flex items-center cursor-pointer ${
                                    darkMode
                                        ? 'hover:bg-gray-700'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                {country.flags && country.flags.svg && (
                                    <img
                                        src={country.flags.svg}
                                        alt={`${country.name.common} flag`}
                                        className="w-6 h-4 mr-3 object-cover"
                                    />
                                )}
                                <span>{country.name.common}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;