import React from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { formatNumber } from '../utils/formatNumber.js';

function CountryDetails({ country, onClose }) {
    const { darkMode } = useTheme();

    // Extract languages as an array
    const languages = country.languages ? Object.values(country.languages) : [];

    // Extract currencies as an array
    const currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name) : [];

    // Format borders properly
    const borders = country.borders || [];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div
                className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
          w-full max-w-4xl rounded-lg shadow-xl overflow-hidden relative`}
            >
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

                <div className="flex flex-col md:flex-row">
                    {/* Flag Section */}
                    <div className="md:w-1/2 p-6 flex items-center justify-center">
                        <div className="shadow-lg rounded-lg overflow-hidden w-full h-48 md:h-64 relative">
                            <img
                                src={country.flags.svg}
                                alt={`Flag of ${country.name.common}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-6">
                        <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
                        <p className="text-sm italic mb-4">{country.name.official}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">Capital:</span>
                                <span>{country.capital?.join(', ') || 'N/A'}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">Region:</span>
                                <span>{country.region || 'N/A'}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">Subregion:</span>
                                <span>{country.subregion || 'N/A'}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">Population:</span>
                                <span>{formatNumber(country.population) || 'N/A'}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">Area:</span>
                                <span>{country.area ? `${formatNumber(country.area)} km²` : 'N/A'}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">Currency:</span>
                                <span>{currencies.length > 0 ? currencies.join(', ') : 'N/A'}</span>
                            </div>

                            <div className="flex flex-col col-span-2">
                                <span className="font-semibold text-sm">Languages:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {languages.length > 0 ? (
                                        languages.map((lang, index) => (
                                            <span
                                                key={index}
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                                }`}
                                            >
                        {lang}
                      </span>
                                        ))
                                    ) : (
                                        <span>N/A</span>
                                    )}
                                </div>
                            </div>

                            {borders.length > 0 && (
                                <div className="flex flex-col col-span-2 mt-2">
                                    <span className="font-semibold text-sm">Borders:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {borders.map((border, index) => (
                                            <span
                                                key={index}
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                                }`}
                                            >
                        {border}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryDetails;