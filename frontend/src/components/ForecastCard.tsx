// src/components/ForecastCard.tsx
import React from 'react';
import WeatherIcon from './WeatherIcon';

type ForecastCardProps = {
  day: string;
  tempMin: number;
  tempMax: number;
  weatherIcon: string;
  unit: 'celsius' | 'fahrenheit';
};

const ForecastCard: React.FC<ForecastCardProps> = ({
  day,
  tempMin,
  tempMax,
  weatherIcon,
  unit
}) => {
  return (
    <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 text-center">
      <h3 className="text-amber-200 font-medium">{day}</h3>
      <div className="flex justify-center my-2">
        <WeatherIcon icon={weatherIcon} size="medium" />
      </div>
      <p className="text-white text-lg">
        {Math.round(tempMin)}-{Math.round(tempMax)}°{unit === 'celsius' ? 'C' : 'F'}
      </p>
    </div>
  );
};

export default ForecastCard;