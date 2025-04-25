// src/components/SearchBar.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { searchLocations, GeocodingResult } from '../services/weatherService';

type SearchBarProps = {
  onSearch: (city: string) => void;
  onLocationSelect: (lat: number, lon: number, name: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search for locations as the user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      const results = await searchLocations(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setLoading(false);
    };

    // Debounce the search to avoid too many API calls
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: GeocodingResult) => {
    setQuery(`${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ''}, ${suggestion.country}`);
    onLocationSelect(suggestion.lat, suggestion.lon, suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-md mx-auto relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="w-full px-4 py-2 text-white bg-gray-800 border border-amber-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
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

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <ul className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <li className="px-4 py-2 text-white">Loading...</li>
          ) : (
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
                {suggestion.state && `, ${suggestion.state}`}
                {`, ${suggestion.country}`}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;