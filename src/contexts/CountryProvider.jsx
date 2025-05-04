import React, { useCallback, useEffect, useState } from 'react';
import { CountryContext } from './CountryContext.jsx';
import {
    filterFields,
    getAllCountries,
    getByCallingCode,
    getByCapitalCity,
    getByCurrencyCode,
    getByLangCode,
    getByRegion,
    getByRegionalBloc,
    getBySubRegion,
    getByTranslation,
    getIndependentCountries,
    searchByCountryCode,
    searchByCountryName,
    searchByFullName,
    searchByListOfCodes
} from "../api/countriesAPI.js";

export const CountryProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null);

    // Initial fetch of all countries
    useEffect(() => {
        const fetchAllCountries = async () => {
            try {
                const data = await getAllCountries();
                setCountries(data);
                setError(null);
            } catch (e) {
                console.error("Error in getAllCountries", e.message);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCountries();
    }, []);

    const fetchIndependentCountries = useCallback(async (status) => {
        try {
            setLoading(true);
            const data = await getIndependentCountries(status);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByCountryName = useCallback(async (countryName) => {
        try {
            setLoading(true);
            const data = await searchByCountryName(countryName);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByFullName = useCallback(async (fullName) => {
        try {
            setLoading(true);
            const data = await searchByFullName(fullName);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByCountryCode = useCallback(async (countryCode) => {
        try {
            setLoading(true);
            const data = await searchByCountryCode(countryCode);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByListOfCodes = useCallback(async (countryCodes) => {
        try {
            setLoading(true);
            const data = await searchByListOfCodes(countryCodes);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByCurrencyCode = useCallback(async (currencyCode) => {
        try {
            setLoading(true);
            const data = await getByCurrencyCode(currencyCode);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByLangCode = useCallback(async (langCode) => {
        try {
            setLoading(true);
            const data = await getByLangCode(langCode);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByCapitalCity = useCallback(async (capital) => {
        try {
            setLoading(true);
            const data = await getByCapitalCity(capital);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByCallingCode = useCallback(async (callingCode) => {
        try {
            setLoading(true);
            const data = await getByCallingCode(callingCode);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByRegion = useCallback(async (region) => {
        try {
            setLoading(true);
            const data = await getByRegion(region);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByRegionalBloc = useCallback(async (bloc) => {
        try {
            setLoading(true);
            const data = await getByRegionalBloc(bloc);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchBySubRegion = useCallback(async (subRegion) => {
        try {
            setLoading(true);
            const data = await getBySubRegion(subRegion);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByTranslation = useCallback(async (translation) => {
        try {
            setLoading(true);
            const data = await getByTranslation(translation);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchByFilterFields = useCallback(async (fields) => {
        try {
            setLoading(true);
            const data = await filterFields(fields);
            setFilteredCountries(data);
            return data;
        }
        catch (e) {
            setError(e.message);
            return [];
        }
        finally {
            setLoading(false);
        }
    }, []);

    const values = {
        countries,
        loading,
        error,
        filteredCountries,
        fetchIndependentCountries,
        fetchByCountryCode,
        fetchByCurrencyCode,
        fetchByLangCode,
        fetchByCapitalCity,
        fetchByCallingCode,
        fetchByRegionalBloc,
        fetchBySubRegion,
        fetchByCountryName,
        fetchByRegion,
        fetchByFullName,
        fetchByListOfCodes,
        fetchByTranslation,
        fetchByFilterFields,
    };

    return (
        <CountryContext.Provider value={values}>
            {children}
        </CountryContext.Provider>
    );
};