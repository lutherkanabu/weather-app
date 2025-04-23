// src/components/WeatherIcon.tsx
import React from 'react';

type WeatherIconProps = {
  icon: string;
  size?: 'small' | 'medium' | 'large';
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, size = 'medium' }) => {
  // Size classes based on the size prop
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-24 h-24',
  };

  // Map OpenWeatherMap icon codes to SVG icons
  const getIconSvg = (iconCode: string) => {
    // OpenWeatherMap icon codes: https://openweathermap.org/weather-conditions
    const iconMap: { [key: string]: React.ReactNode } = {
      '01d': (
        // Clear sky (day)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      ),
      '01n': (
        // Clear sky (night)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#FDE68A" stroke="#FDE68A" />
        </svg>
      ),
      '02d': (
        // Few clouds (day)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2a9 9 0 1 0 9 9" />
          <path d="M12 8a3 3 0 0 0-3 3c0 1.11.89 2 2 2h10c1.66 0 3-1.34 3-3 0-1.66-1.34-3-3-3h-.17a5 5 0 0 0-9.66 1.03" fill="#FFFFFF" stroke="#FFFFFF" />
          <circle cx="6" cy="6" r="2" fill="#F59E0B" stroke="#F59E0B" />
        </svg>
      ),
      '02n': (
        // Few clouds (night)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 16a5 5 0 0 0-5-5c0-1.66 1.34-3 3-3h.17a5 5 0 0 0 9.66-1.03" />
          <path d="M12 16a3 3 0 0 1-3-3c0-1.11.89-2 2-2h10c1.66 0 3 1.34 3 3 0 1.66-1.34 3-3 3H3" fill="#FFFFFF" stroke="#FFFFFF" />
          <path d="M7 8a7.5 7.5 0 1 0 10 0" fill="#FDE68A" stroke="#FDE68A" />
        </svg>
      ),
      '03d': (
        // Scattered clouds
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10c0-1.66-1.34-3-3-3h-.17a5 5 0 0 0-9.66 1.03C4.2 8.5 4 9.22 4 10a4 4 0 0 0 4 4h9a3 3 0 0 0 3-3" fill="#FFFFFF" stroke="#FFFFFF" />
        </svg>
      ),
      '03n': (
        // Scattered clouds
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10c0-1.66-1.34-3-3-3h-.17a5 5 0 0 0-9.66 1.03C4.2 8.5 4 9.22 4 10a4 4 0 0 0 4 4h9a3 3 0 0 0 3-3" fill="#FFFFFF" stroke="#FFFFFF" />
        </svg>
      ),
      '04d': (
        // Broken clouds
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4a5 5 0 0 0-5 5 3 3 0 0 0-3 3c0 1.11.89 2 2 2h1" fill="#E5E7EB" stroke="#E5E7EB" />
          <path d="M18 10c0-1.66-1.34-3-3-3h-.17a5 5 0 0 0-9.66 1.03C4.2 8.5 4 9.22 4 10a4 4 0 0 0 4 4h9a3 3 0 0 0 3-3" fill="#FFFFFF" stroke="#FFFFFF" />
        </svg>
      ),
      '04n': (
        // Broken clouds
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4a5 5 0 0 0-5 5 3 3 0 0 0-3 3c0 1.11.89 2 2 2h1" fill="#E5E7EB" stroke="#E5E7EB" />
          <path d="M18 10c0-1.66-1.34-3-3-3h-.17a5 5 0 0 0-9.66 1.03C4.2 8.5 4 9.22 4 10a4 4 0 0 0 4 4h9a3 3 0 0 0 3-3" fill="#FFFFFF" stroke="#FFFFFF" />
        </svg>
      ),
      '09d': (
        // Shower rain
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <line x1="8" y1="19" x2="8.01" y2="19" stroke="#A5F3FC" strokeWidth="3" />
          <line x1="12" y1="19" x2="12.01" y2="19" stroke="#A5F3FC" strokeWidth="3" />
          <line x1="16" y1="19" x2="16.01" y2="19" stroke="#A5F3FC" strokeWidth="3" />
        </svg>
      ),
      '09n': (
        // Shower rain
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <line x1="8" y1="19" x2="8.01" y2="19" stroke="#A5F3FC" strokeWidth="3" />
          <line x1="12" y1="19" x2="12.01" y2="19" stroke="#A5F3FC" strokeWidth="3" />
          <line x1="16" y1="19" x2="16.01" y2="19" stroke="#A5F3FC" strokeWidth="3" />
        </svg>
      ),
      '10d': (
        // Rain (day)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <line x1="8" y1="19" x2="8" y2="21" stroke="#A5F3FC" strokeWidth="2" />
          <line x1="12" y1="19" x2="12" y2="21" stroke="#A5F3FC" strokeWidth="2" />
          <line x1="16" y1="19" x2="16" y2="21" stroke="#A5F3FC" strokeWidth="2" />
        </svg>
      ),
      '10n': (
        // Rain (night)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <line x1="8" y1="19" x2="8" y2="21" stroke="#A5F3FC" strokeWidth="2" />
          <line x1="12" y1="19" x2="12" y2="21" stroke="#A5F3FC" strokeWidth="2" />
          <line x1="16" y1="19" x2="16" y2="21" stroke="#A5F3FC" strokeWidth="2" />
        </svg>
      ),
      '11d': (
        // Thunderstorm
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <polygon points="16 14 13 14 15 9 9 14 12 14 10 19 16 14" fill="#F59E0B" stroke="#F59E0B" />
        </svg>
      ),
      '11n': (
        // Thunderstorm (night)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <polygon points="16 14 13 14 15 9 9 14 12 14 10 19 16 14" fill="#F59E0B" stroke="#F59E0B" />
        </svg>
      ),
      '13d': (
        // Snow
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <line x1="8" y1="16" x2="8.01" y2="16" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="16" y1="16" x2="16.01" y2="16" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="8" y1="20" x2="8.01" y2="20" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="12" y1="20" x2="12.01" y2="20" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="16" y1="20" x2="16.01" y2="20" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      ),
      '13n': (
        // Snow (night)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#FFFFFF" stroke="#FFFFFF" />
          <line x1="8" y1="16" x2="8.01" y2="16" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="16" y1="16" x2="16.01" y2="16" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="8" y1="20" x2="8.01" y2="20" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="12" y1="20" x2="12.01" y2="20" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="16" y1="20" x2="16.01" y2="20" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      ),
      '50d': (
        // Mist
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="9" x2="19" y2="9" stroke="#D1D5DB" />
          <line x1="5" y1="15" x2="19" y2="15" stroke="#D1D5DB" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="#D1D5DB" />
        </svg>
      ),
      '50n': (
        // Mist (night)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="9" x2="19" y2="9" stroke="#D1D5DB" />
          <line x1="5" y1="15" x2="19" y2="15" stroke="#D1D5DB" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="#D1D5DB" />
        </svg>
      ),
    };

    // Use a default icon if the requested one is not found
    return iconMap[iconCode] || (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  };

  return (
    <div className={`text-amber-300 ${sizeClasses[size]}`}>
      {getIconSvg(icon)}
    </div>
  );
};

export default WeatherIcon;