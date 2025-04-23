// src/components/UnitToggle.tsx
"use client";
import React from 'react';

type UnitToggleProps = {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
};

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onToggle}
        className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-amber-200 rounded-lg transition-colors"
        aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
      >
        <span className={`font-semibold ${unit === 'celsius' ? 'text-amber-500' : 'text-gray-400'}`}>°C</span>
        <span className="mx-1 text-gray-400">/</span>
        <span className={`font-semibold ${unit === 'fahrenheit' ? 'text-amber-500' : 'text-gray-400'}`}>°F</span>
      </button>
    </div>
  );
};

export default UnitToggle;