// src/components/SearchBar.tsx
"use client";
import React, { useState } from 'react';

type SearchBarProps = {
  onSearch: (city: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="w-full px-4 py-2 text-white bg-gray-800 border border-amber-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for a city"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 text-black font-medium rounded-r-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;