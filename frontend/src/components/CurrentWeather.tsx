// src/components/CurrentWeather.tsx
"use client";
import React from 'react';
import WeatherIcon from './WeatherIcon';

type CurrentWeatherProps = {
  city: string;
  country: string;
  date: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  unit: 'celsius' | 'fahrenheit';
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  country,
  date,
  temperature,
  weatherDescription,
  weatherIcon,
  unit
}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 bg-opacity-60 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm border border-gray-800">
      <div className="mb-4">
        <WeatherIcon icon={weatherIcon} size="large" />
      </div>
      <div className="text-5xl font-bold text-amber-200 mb-2">
        {Math.round(temperature)}°{unit === 'celsius' ? 'C' : 'F'}
      </div>
      <div className="text-xl font-medium text-white mb-4">
        {weatherDescription}
      </div>
      <div className="text-gray-300 text-center">
        <div className="text-lg font-medium">{date}</div>
        <div className="flex items-center justify-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{city}, {country}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;