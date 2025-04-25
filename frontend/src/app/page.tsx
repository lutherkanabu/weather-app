// src/app/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import UnitToggle from '../components/UnitToggle';
import CurrentWeather from '../components/CurrentWeather';
import ForecastCard from '../components/ForecastCard';
import { 
  fetchCurrentWeather, 
  fetchForecast, 
  fetchCurrentWeatherByCoords,
  fetchForecastByCoords,
  WeatherData, 
  ForecastData,
  convertToFahrenheit, 
  formatDate, 
  formatDay,
  getWindDirection 
} from '../services/weatherService';

export default function Home() {
  // State variables
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [city, setCity] = useState<string>('London'); // Default city
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [currentCoords, setCurrentCoords] = useState<{lat: number, lon: number} | null>(null);

  // Unified fetch weather and forecast data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let weather, forecast;
        
        // Optionally use coordinates otherwise, use city name
        if (currentCoords) {
          [weather, forecast] = await Promise.all([
            fetchCurrentWeatherByCoords(currentCoords.lat, currentCoords.lon),
            fetchForecastByCoords(currentCoords.lat, currentCoords.lon)
          ]);
        } else {
          [weather, forecast] = await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
          ]);
        }
        
        setWeatherData(weather);
        setForecastData(forecast);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data. Please try another location.');
        setLoading(false);
        console.error(err);
      }
    };
  
    fetchData();
  }, [city, currentCoords]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    setCurrentCoords(null); // Reset coordinates when searching by city name
  };

  // coordinate-based searches
  const handleLocationSelect = (lat: number, lon: number, locationName: string) => {
    setCurrentCoords({ lat, lon });
    setCity(locationName); // Update city name for display purposes
  };

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <SearchBar onSearch={handleSearch} onLocationSelect={handleLocationSelect} />
          <UnitToggle unit={unit} onToggle={toggleUnit} />
        </div>
        
        {/* Main Weather Display */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-xl">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-400 text-xl">{error}</p>
          </div>
        ) : weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather */}
            <div className="lg:col-span-1">
              <CurrentWeather 
                city={weatherData.name}
                country={weatherData.sys.country}
                date={formatDate(weatherData.dt)}
                temperature={unit === 'celsius' ? weatherData.main.temp : convertToFahrenheit(weatherData.main.temp)}
                weatherDescription={weatherData.weather[0].description}
                weatherIcon={weatherData.weather[0].icon}
                unit={unit}
              />
            </div>
          
          {/* Forecast Section */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading ? (
              // Loading placeholders
              Array(3).fill(null).map((_, index) => (
                <div key={index} className="bg-gray-900 bg-opacity-60 rounded-lg p-4 text-center animate-pulse">
                  <div className="h-6 bg-gray-700 rounded w-24 mx-auto"></div>
                  <div className="h-12 w-12 bg-gray-700 rounded-full my-2 mx-auto"></div>
                  <div className="h-6 bg-gray-700 rounded w-20 mx-auto"></div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-3 text-center">
                <p className="text-red-400">Unable to load forecast data.</p>
              </div>
            ) : forecastData && forecastData.forecast ? (
              forecastData.forecast.slice(1, 4).map((forecast, index) => (
                <ForecastCard
                  key={index}
                  day={formatDay(forecast.dt)}
                  tempMin={unit === 'celsius' ? forecast.main.temp_min : convertToFahrenheit(forecast.main.temp_min)}
                  tempMax={unit === 'celsius' ? forecast.main.temp_max : convertToFahrenheit(forecast.main.temp_max)}
                  weatherIcon={forecast.weather[0].icon}
                  unit={unit}
                />
              ))
            ) : (
              // Fallback to static placeholders if no real data is available
              <>
                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 text-center">
                  <h3 className="text-amber-200 font-medium">Tomorrow</h3>
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
                  <p className="text-white text-lg">19-27°{unit === 'celsius' ? 'C' : 'F'}</p>
                </div>
                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 text-center">
                  <h3 className="text-amber-200 font-medium">22 May</h3>
                  <div className="flex justify-center my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M18 10c0-1.66-1.34-3-3-3h-.17a5 5 0 0 0-9.66 1.03C4.2 8.5 4 9.22 4 10a4 4 0 0 0 4 4h9a3 3 0 0 0 3-3" fill="#FFFFFF" stroke="#FFFFFF" />
                    </svg>
                  </div>
                  <p className="text-white text-lg">20-24°{unit === 'celsius' ? 'C' : 'F'}</p>
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
                  <p className="text-white text-lg">16-20°{unit === 'celsius' ? 'C' : 'F'}</p>
                </div>
              </>
            )}
          </div>
        </div>
        )}
        
        {/* Details Section */}
        {weatherData && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Wind Status */}
            <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6">
              <h3 className="text-gray-300 text-center mb-4">Wind Status</h3>
              <div className="flex flex-col items-center">
                <p className="text-3xl font-semibold text-white mb-2">{weatherData.wind.speed} km/h</p>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-amber-500 text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{getWindDirection(weatherData.wind.deg)}</span>
                </div>
              </div>
            </div>
            
            {/* Humidity */}
            <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6">
              <h3 className="text-gray-300 text-center mb-4">Humidity</h3>
              <div className="flex flex-col items-center">
                <p className="text-3xl font-semibold text-white mb-2">{weatherData.main.humidity}%</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${weatherData.main.humidity}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}