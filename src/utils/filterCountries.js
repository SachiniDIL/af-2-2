/**
 * Filters countries based on search term, region, and population range
 * @param {Array} data - Array of country objects
 * @param {string} searchTerm - Text to search for in country names
 * @return {Array} Filtered countries
 */
export const filterCountries = (data, searchTerm) => {
    if (!data || !Array.isArray(data)) {
        return [];
    }

    return data.filter(country => {
        // Check if country has the required properties
        if (!country) return false;

        // Name matching - handle different name formats
        return !searchTerm || (
            (country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (country.name?.official?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof country.name === 'string' && country.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });
};