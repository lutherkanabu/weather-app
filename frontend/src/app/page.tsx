// src/app/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import UnitToggle from '../components/UnitToggle';
import CurrentWeather from '../components/CurrentWeather';

export default function Home() {
  // State variables
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [city, setCity] = useState<string>('London'); // Default city
  const [loading, setLoading] = useState<boolean>(false);
  
  // Mock data for demonstration
  const mockWeatherData = {
    city: 'London',
    country: 'UK',
    date: '20 May 2023',
    temperature: 13,
    weatherDescription: 'Sunny',
    weatherIcon: '01d'
  };

  const handleSearch = (searchCity: string) => {
    // For now, I am updating the city state. Later I'll fetch data from API
    setCity(searchCity);
    console.log(`Searching for weather in ${searchCity}`);
  };

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <SearchBar onSearch={handleSearch} />
          <UnitToggle unit={unit} onToggle={toggleUnit} />
        </div>
        
        {/* Main Weather Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather */}
          <div className="lg:col-span-1">
            <CurrentWeather 
              city={mockWeatherData.city}
              country={mockWeatherData.country}
              date={mockWeatherData.date}
              temperature={mockWeatherData.temperature}
              weatherDescription={mockWeatherData.weatherDescription}
              weatherIcon={mockWeatherData.weatherIcon}
              unit={unit}
            />
          </div>
          
          {/* Forecast Section (placeholder) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 text-center">
              <h3 className="text-amber-200 font-medium">21 May</h3>
              <div className="flex justify-center my-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="5" fill="#F59E0B" stroke="#F59E0B" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <p className="text-white text-lg">19-27°C</p>
            </div>
            <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 text-center">
              <h3 className="text-amber-200 font-medium">22 May</h3>
              <div className="flex justify-center my-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M18 10c0-1.66-1.34-3-3-3h-.17a5 5 0 0 0-9.66 1.03C4.2 8.5 4 9.22 4 10a4 4 0 0 0 4 4h9a3 3 0 0 0 3-3" fill="#FFFFFF" stroke="#FFFFFF" />
                </svg>
              </div>
              <p className="text-white text-lg">20-24°C</p>
            </div>
            <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 text-center">
              <h3 className="text-amber-200 font-medium">23 May</h3>
              <div className="flex justify-center my-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="5" fill="#F59E0B" stroke="#F59E0B" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <p className="text-white text-lg">16-20°C</p>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Wind Status */}
          <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6">
            <h3 className="text-gray-300 text-center mb-4">Wind Status</h3>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-semibold text-white mb-2">3 km/h</p>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-amber-500 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </div>
                <span className="text-gray-300">WSW</span>
              </div>
            </div>
          </div>
          
          {/* Humidity */}
          <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6">
            <h3 className="text-gray-300 text-center mb-4">Humidity</h3>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-semibold text-white mb-2">80%</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}