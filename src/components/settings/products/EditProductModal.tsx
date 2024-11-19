import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  content: string;
  description: string;
  value: number;
  cost: number;
  commission: number;
  stock: number;
  criticalStock: number;
}

interface EditProductModalProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export default function EditProductModal({ product, onSave, onCancel }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    ...product,
    value: product.value.toString(),
    cost: product.cost.toString(),
    commission: product.commission.toString(),
    stock: product.stock.toString(),
    criticalStock: product.criticalStock.toString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      ...formData,
      value: parseFloat(formData.value.replace(/[,.]/g, '')),
      cost: parseFloat(formData.cost.replace(/[,.]/g, '')),
      commission: parseFloat(formData.commission.replace(/[,.]/g, '')),
      stock: parseInt(formData.stock),
      criticalStock: parseInt(formData.criticalStock)
    });
  };

  const handleChange = (field: string, value: string) => {
    if (['stock', 'criticalStock'].includes(field)) {
      // Solo permitir números enteros
      const cleanValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [field]: cleanValue }));
    } else if (['value', 'cost', 'commission'].includes(field)) {
      // Permitir números y separadores de miles
      const cleanValue = value.replace(/[^\d,.]/g, '');
      setFormData(prev => ({ ...prev, [field]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const formatNumber = (value: string) => {
    if (!value) return '';
    const number = parseFloat(value.replace(/[,.]/g, ''));
    if (isNaN(number)) return value;
    return number.toLocaleString('es-CL');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Editar Producto</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido
              </label>
              <input
                type="text"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Ej: 100ml, 500g, etc."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
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
                value={formatNumber(formData.value)}
                onChange={(e) => handleChange('value', e.target.value)}
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
                value={formatNumber(formData.cost)}
                onChange={(e) => handleChange('cost', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comisión
              </label>
              <input
                type="text"
                value={formatNumber(formData.commission)}
                onChange={(e) => handleChange('commission', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="text"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Crítico
              </label>
              <input
                type="text"
                value={formData.criticalStock}
                onChange={(e) => handleChange('criticalStock', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}