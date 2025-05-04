import React from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';

function LanguageFilter({ onLanguageChange, selectedLanguage }) {
    const { darkMode } = useTheme();

    const languages = [
        { value: '', label: 'All Languages' },
        { value: 'eng', label: 'English' },
        { value: 'spa', label: 'Spanish' },
        { value: 'fra', label: 'French' },
        { value: 'ara', label: 'Arabic' },
        { value: 'por', label: 'Portuguese' },
        { value: 'rus', label: 'Russian' },
        { value: 'hin', label: 'Hindi' },
        { value: 'deu', label: 'German' },
        { value: 'jpn', label: 'Japanese' },
        { value: 'zho', label: 'Chinese' }
    ];

    return (
        <div className="relative">
            <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className={`appearance-none w-full py-3 px-4 pr-8 rounded-lg border ${
                    darkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-white text-gray-900 border-gray-300'
                } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
                {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                        {language.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
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
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </div>
        </div>
    );
}

export default LanguageFilter;