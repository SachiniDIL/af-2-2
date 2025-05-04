import React from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';

function RegionFilter({ onRegionChange, selectedRegion }) {
    const { darkMode } = useTheme();

    const regions = [
        { value: '', label: 'All Regions' },
        { value: 'Africa', label: 'Africa' },
        { value: 'Americas', label: 'Americas' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Oceania', label: 'Oceania' }
    ];

    return (
        <div className="relative">
            <select
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value)}
                className={`appearance-none w-full py-3 px-4 pr-8 rounded-lg border ${
                    darkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-white text-gray-900 border-gray-300'
                } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
                {regions.map((region) => (
                    <option key={region.value} value={region.value}>
                        {region.label}
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

export default RegionFilter;