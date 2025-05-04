/**
 * Utility functions for managing country favorites in cookies
 */

// Get favorites array from cookies
export const getFavoritesFromCookies = () => {
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
export const saveFavoritesToCookies = (favorites) => {
    // Set cookie to expire in 30 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    document.cookie = `favorites=${encodeURIComponent(JSON.stringify(favorites))};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`;
};

// Add a country to favorites
export const addToFavorites = (countryCode) => {
    const favorites = getFavoritesFromCookies();
    if (!favorites.includes(countryCode)) {
        const newFavorites = [...favorites, countryCode];
        saveFavoritesToCookies(newFavorites);
        return newFavorites;
    }
    return favorites;
};

// Remove a country from favorites
export const removeFromFavorites = (countryCode) => {
    const favorites = getFavoritesFromCookies();
    const newFavorites = favorites.filter(code => code !== countryCode);
    saveFavoritesToCookies(newFavorites);
    return newFavorites;
};

// Toggle a country in favorites (add if not present, remove if present)
export const toggleFavorite = (countryCode) => {
    const favorites = getFavoritesFromCookies();
    let newFavorites;

    if (favorites.includes(countryCode)) {
        newFavorites = favorites.filter(code => code !== countryCode);
    } else {
        newFavorites = [...favorites, countryCode];
    }

    saveFavoritesToCookies(newFavorites);
    return newFavorites;
};

// Check if a country is in favorites
export const isCountryFavorite = (countryCode) => {
    const favorites = getFavoritesFromCookies();
    return favorites.includes(countryCode);
};