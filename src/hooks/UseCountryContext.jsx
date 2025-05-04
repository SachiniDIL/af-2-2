import { useContext } from 'react';
import { CountryContext } from '../contexts/CountryContext.jsx';

export const useCountryContext = () => {
    const context = useContext(CountryContext);

    if (!context) {
        throw new Error('useCountryContext must be used within a CountryProvider');
    }

    return context;
};