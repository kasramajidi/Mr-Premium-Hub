"use client";

import { useFilters } from "../../../context/FilterContext";

export default function SearchFilter() {
  const { searchQuery, setSearchQuery } = useFilters();
  const isSearching = false;
  
  const updateSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
        <h3 className="font-bold text-lg text-gray-700">جستجو</h3>
      </div>

      <div className="relative">
        
        <label htmlFor="product-search" className="sr-only">
          جستجو محصولات
        </label>
        <input
          id="product-search"
          type="search"
          value={searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="جستجو محصولات"
          aria-label="جستجو محصولات"
          className="w-full pl-14 pr-4 py-3 outline-none border-none bg-white rounded-lg transition-all duration-200 text-right"
        />
        <button
          type="button"
          aria-label={isSearching ? "در حال جستجو" : "جستجو"}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
        >
          {isSearching ? (
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
