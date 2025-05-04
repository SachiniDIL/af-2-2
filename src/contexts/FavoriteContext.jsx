import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFavoritesFromCookies, toggleFavorite } from '../utils/favoritesHelper.js';

// Create context
const FavoritesContext = createContext();

// Provider component
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from cookies on initial render
    useEffect(() => {
        const storedFavorites = getFavoritesFromCookies();
        setFavorites(storedFavorites);
    }, []);

    // Function to toggle a country in favorites
    const toggleCountryFavorite = (countryCode) => {
        const updatedFavorites = toggleFavorite(countryCode);
        setFavorites(updatedFavorites);
        return updatedFavorites.includes(countryCode);
    };

    // Check if a country is favorite
    const isCountryFavorite = (countryCode) => {
        return favorites.includes(countryCode);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleCountryFavorite,
                isCountryFavorite
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

// Custom hook to use the favorites context
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};