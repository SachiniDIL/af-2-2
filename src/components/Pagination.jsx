import React from 'react';

function Pagination({ currentPage, totalPages, goToPage }) {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-center items-center space-x-2 mt-6">
            {/* Previous button */}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                «
            </button>

            {/* Page numbers */}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`px-3 py-1 rounded-md border ${
                        currentPage === number
                            ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                    }`}
                >
                    {number}
                </button>
            ))}

            {/* Next button */}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                »
            </button>
        </div>
    );
}

export default Pagination;
