import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetailsPage from './pages/CountryDetailsPage.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import {CountryProvider} from "./contexts/CountryProvider.jsx";
import {FavoritesProvider} from "./contexts/FavoriteContext.jsx";
import Favorites from "./pages/FavoriteCountries.jsx";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <CountryProvider>
                    <FavoritesProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/country/:countryCode" element={<CountryDetailsPage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                            <Route path="/favorites" element={<Favorites />} />
                        </Routes>
                    </FavoritesProvider>
                </CountryProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;