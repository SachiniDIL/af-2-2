import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CountryCard(props) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if this country is in favorites when component mounts
    useEffect(() => {
        checkIfFavorite();
        console.log("Favorites from cookie:", getFavoritesFromCookies());
        console.log("This card country code:", props.countryCode);
    }, [props.countryCode]); // this makes it run every time the country changes or page loads

    // Function to check if this country is in favorites
    const checkIfFavorite = () => {
        const favorites = getFavoritesFromCookies();
        setIsFavorite(favorites.includes(props.countryCode));
    };

    // Get favorites array from cookies
    const getFavoritesFromCookies = () => {
        const favoriteCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('favorites='));

        if (favoriteCookie) {
            try {
                return JSON.parse(decodeURIComponent(favoriteCookie.split('=')[1]));
            } catch (e) {
                console.error('Error parsing favorites cookie', e);
                return [];
            }
        }
        return [];
    };

    // Save favorites to cookies
    const saveFavoritesToCookies = (favorites) => {
        // Set cookie to expire in 30 days
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        document.cookie = `favorites=${encodeURIComponent(JSON.stringify(favorites))};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
        console.log("Saved favorites cookie:", document.cookie);
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation(); // Prevent card click event

        const favorites = getFavoritesFromCookies();
        let newFavorites;

        if (isFavorite) {
            // Remove from favorites
            newFavorites = favorites.filter(code => code !== props.countryCode);
        } else {
            // Add to favorites
            newFavorites = [...favorites, props.countryCode];
        }

        // Update cookies
        saveFavoritesToCookies(newFavorites);

        // Update state
        setIsFavorite(!isFavorite);

        // Notify parent component if callback is provided
        if (props.onToggleFavorite) {
            props.onToggleFavorite(props.countryCode, !isFavorite);
        }
    };

    const handleCardClick = () => {
        navigate(`/country/${props.countryCode}`);
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 h-80 relative overflow-hidden shadow-md dark:shadow-gray-900 rounded-2xl p-5 w-full max-w-xs hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* Favorite Icon Button - Top Right */}
            <button
                className={`absolute top-3 right-3 p-1 rounded-full transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-70'
                } hover:bg-gray-100 dark:hover:bg-gray-700 z-10`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={handleToggleFavorite}
            >
                <Heart
                    size={20}
                    className={`${
                        isFavorite
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400 dark:text-gray-300'
                    } hover:text-red-500 dark:hover:text-red-400 transition-colors`}
                />
            </button>

            {/* Country Header - Fixed height */}
            <div className="flex flex-col items-center mb-4 h-36">
                {/* Flag with fixed dimensions */}
                <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm mb-3">
                    <img
                        src={props.countryFlag}
                        alt={`${props.countryNameCommon} flag`}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Country Name Section */}
                <div className="flex flex-col text-center">
                    <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-1">{props.countryNameCommon}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1 line-clamp-2">{props.countryNameOfficial}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-700 my-3"></div>

            {/* Country Details - centered rows with inline colon */}
            <div className="text-center space-y-2">
                {/* Population row */}
                <div className="flex justify-center items-center space-x-1">
                    <span className="font-medium text-sm text-gray-600 dark:text-gray-300 font-semibold">Population :</span>
                    <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{props.population}</span>
                </div>

                {/* Region row */}
                <div className="flex justify-center items-center space-x-1">
                    <span className="font-medium text-sm text-gray-600 dark:text-gray-300 font-semibold">Region :</span>
                    <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{props.countryRegion}</span>
                </div>

                {/* Capital row */}
                <div className="flex justify-center items-center space-x-1">
                    <span className="font-medium text-sm text-gray-600 dark:text-gray-300 font-semibold">Capital :</span>
                    <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{props.capital}</span>
                </div>
            </div>

            {/* Optional decorative element */}
            <div className="absolute top-0 right-0 bg-gray-50 dark:bg-gray-700 w-16 h-16 rounded-bl-full opacity-30"></div>
        </div>
    );
}

export default CountryCard;