// src/services/weatherService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api';

// WeatherData interface
export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
}

// ForecastData interface
export interface ForecastData {
  city: {
    name: string;
    country: string;
  };
  forecast: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
  }>;
}

// Geocoding interface
export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const searchLocations = async (query: string): Promise<GeocodingResult[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/geocoding?q=${encodeURIComponent(query)}&limit=5`);
    
    if (!response.ok) {
      throw new Error('Location search failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
};

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/current?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Optionally accept coordinates
export const fetchCurrentWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/current/coords?lat=${lat}&lon=${lon}`);
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    throw error;
  }
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/forecast?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error('Forecast data not available');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/forecast/coords?lat=${lat}&lon=${lon}`);
    
    if (!response.ok) {
      throw new Error('Forecast data not available');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast data by coordinates:', error);
    throw error;
  }
};

export const convertToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};