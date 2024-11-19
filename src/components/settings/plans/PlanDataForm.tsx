import React, { useState, useEffect } from 'react';
import { PlanFormData, Category } from './types';

interface PlanDataFormProps {
  data: PlanFormData;
  onChange: (field: keyof PlanFormData, value: any) => void;
}

const SOCIETIES = [
  { value: 'society1', label: 'Sociedad 1' },
  { value: 'society2', label: 'Sociedad 2' },
  { value: 'society3', label: 'Sociedad 3' }
];

const DTE_TYPES = [
  { value: 'boleta', label: 'Boleta Electrónica' },
  { value: 'factura', label: 'Factura Electrónica' },
  { value: 'exenta', label: 'Factura Exenta' }
];

export default function PlanDataForm({ data, onChange }: PlanDataFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedCategories = localStorage.getItem('service_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const formatNumber = (value: string | number): string => {
    if (!value && value !== 0) return '';
    const number = typeof value === 'string' ? parseFloat(value.replace(/[,.]/g, '')) : value;
    if (isNaN(number)) return '';
    return number.toLocaleString('es-CL');
  };

  const handleNumberChange = (field: keyof PlanFormData, value: string) => {
    // Remove formatting and convert to number
    const cleanValue = value.replace(/[,.]/g, '');
    const numberValue = cleanValue === '' ? '' : parseFloat(cleanValue);
    onChange(field, numberValue);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Datos del plan</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={data.category || ''}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            rows={3}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formatNumber(data.value || 0)}
            onChange={(e) => handleNumberChange('value', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Costo
          </label>
          <input
            type="text"
            value={formatNumber(data.cost || 0)}
            onChange={(e) => handleNumberChange('cost', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha inicio <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={data.startDate || ''}
              onChange={(e) => onChange('startDate', e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha fin <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={data.endDate || ''}
              onChange={(e) => onChange('endDate', e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caducidad (días)
          </label>
          <input
            type="number"
            value={data.expirationDays || ''}
            onChange={(e) => onChange('expirationDays', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comisión (%)
          </label>
          <input
            type="number"
            value={data.commission || ''}
            onChange={(e) => onChange('commission', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            min="0"
            max="100"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Puntos fidelización
          </label>
          <input
            type="number"
            value={data.loyaltyPoints || ''}
            onChange={(e) => onChange('loyaltyPoints', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sociedad
          </label>
          <select
            value={data.society || ''}
            onChange={(e) => onChange('society', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Seleccionar sociedad</option>
            {SOCIETIES.map((society) => (
              <option key={society.value} value={society.value}>
                {society.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo DTE
          </label>
          <select
            value={data.dteType || ''}
            onChange={(e) => onChange('dteType', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Seleccionar tipo DTE</option>
            {DTE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.isAffected || false}
              onChange={(e) => onChange('isAffected', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Afecto</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.taxes || false}
              onChange={(e) => onChange('taxes', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              Impuesto al Valor Agregado (Chile)
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración previa a vencimiento (días)
          </label>
          <input
            type="number"
            value={data.preExpirationDays || ''}
            onChange={(e) => onChange('preExpirationDays', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}