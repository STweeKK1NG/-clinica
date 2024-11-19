import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProductFormData {
  name: string;
  brand: string;
  content: string;
  description: string;
  value: string;
  cost: string;
  commission: string;
  stock: string;
  criticalStock: string;
}

export default function CreateProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    content: '',
    description: '',
    value: '',
    cost: '',
    commission: '',
    stock: '',
    criticalStock: ''
  });

  const handleBack = () => {
    window.location.hash = '#settings/productos';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
      id: Date.now().toString(),
      ...formData,
      value: parseFloat(formData.value.replace(/[,.]/g, '')),
      cost: formData.cost ? parseFloat(formData.cost.replace(/[,.]/g, '')) : 0,
      commission: formData.commission ? parseFloat(formData.commission.replace(/[,.]/g, '')) : 0,
      stock: formData.stock ? parseInt(formData.stock) : 0,
      criticalStock: formData.criticalStock ? parseInt(formData.criticalStock) : 0
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    handleBack();
  };

  const handleChange = (field: keyof ProductFormData, value: string) => {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Agregar Producto</h2>

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

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}