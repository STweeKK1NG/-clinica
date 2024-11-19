import React from 'react';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const countries = [
  { value: 'CL', label: 'Chile' },
  { value: 'AR', label: 'Argentina' },
  { value: 'PE', label: 'Perú' },
  { value: 'CO', label: 'Colombia' }
];

export default function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        País
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      >
        <option value="">Seleccionar país</option>
        {countries.map(country => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
}