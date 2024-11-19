import React from 'react';

interface RegionSelectorProps {
  country: string;
  value: string;
  onChange: (value: string) => void;
}

const regions = {
  CL: [
    { value: 'XV', label: 'Arica y Parinacota' },
    { value: 'I', label: 'Tarapacá' },
    { value: 'II', label: 'Antofagasta' },
    { value: 'III', label: 'Atacama' },
    { value: 'IV', label: 'Coquimbo' },
    { value: 'V', label: 'Valparaíso' },
    { value: 'RM', label: 'Región Metropolitana' },
    { value: 'VI', label: "O'Higgins" },
    { value: 'VII', label: 'Maule' },
    { value: 'XVI', label: 'Ñuble' },
    { value: 'VIII', label: 'Biobío' },
    { value: 'IX', label: 'Araucanía' },
    { value: 'XIV', label: 'Los Ríos' },
    { value: 'X', label: 'Los Lagos' },
    { value: 'XI', label: 'Aysén' },
    { value: 'XII', label: 'Magallanes' }
  ]
};

export default function RegionSelector({ country, value, onChange }: RegionSelectorProps) {
  const availableRegions = regions[country as keyof typeof regions] || [];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Región
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        disabled={!country}
      >
        <option value="">Seleccionar región</option>
        {availableRegions.map(region => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </select>
    </div>
  );
}