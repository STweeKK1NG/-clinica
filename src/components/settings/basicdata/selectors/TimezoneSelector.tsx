import React from 'react';

interface TimezoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const timezones = [
  { value: 'America/Santiago', label: 'Santiago (GMT-4)' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
  { value: 'America/Lima', label: 'Lima (GMT-5)' }
];

export default function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Zona Horaria
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      >
        {timezones.map(timezone => (
          <option key={timezone.value} value={timezone.value}>
            {timezone.label}
          </option>
        ))}
      </select>
    </div>
  );
}