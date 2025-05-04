import React, { useState, useEffect } from 'react';
import CountryCard from "./CountryCard.jsx";
import Pagination from "./Pagination.jsx";

function CountryCarousel({ countries, onSelectCountry }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(4);

    // Reset to page 1 when countries change
    useEffect(() => {
        setCurrentPage(1);
    }, [countries]);

    // Adjust cards per page based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardsPerPage(1);
            } else if (window.innerWidth < 768) {
                setCardsPerPage(2);
            } else if (window.innerWidth < 1280) {
                setCardsPerPage(3);
            } else {
                setCardsPerPage(4);
            }
        };

        handleResize(); // Initial setup
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate pagination values
    const totalPages = Math.ceil(countries.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = countries.slice(indexOfFirstCard, indexOfLastCard);

    // Navigate to specific page
    const goToPage = (pageNumber) => {
        setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
    };

    return (
        <div className="flex flex-col space-y-6 p-4 w-full overflow-hidden">
            {countries.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No countries found matching your criteria.</p>
                </div>
            ) : (
                <>
                    {/* Container with adaptive layout */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentCards.map((country, index) => (
                                <div key={country.cca3 || index} className="flex justify-center">
                                    <div onClick={() => onSelectCountry && onSelectCountry(country)} className="cursor-pointer w-full">
                                        <CountryCard
                                            countryFlag={country.flags.svg}
                                            countryNameCommon={country.name.common}
                                            countryNameOfficial={country.name.official}
                                            countryRegion={country.region}
                                            population={country.population.toLocaleString()}
                                            capital={country.capital?.[0] || 'N/A'}
                                            countryCode={country.cca3}

                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            goToPage={goToPage}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default CountryCarousel;