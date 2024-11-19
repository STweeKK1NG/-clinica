import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface ServiceFormData {
  category: string;
  name: string;
  description: string;
  duration: string;
  isFree: boolean;
  value: string;
  cost: string;
  saleCommission: string;
  serviceCommission: string;
  instructions: string;
  loyaltyPoints: string;
  autoDiscountSupplies: boolean;
  society: string;
  dteType: string;
}

const DTE_TYPES = [
  { value: 'boleta', label: 'Boleta Electrónica' },
  { value: 'factura', label: 'Factura Electrónica' },
  { value: 'exenta', label: 'Factura Exenta' }
];

const SOCIETIES = [
  { value: 'society1', label: 'Sociedad 1' },
  { value: 'society2', label: 'Sociedad 2' },
  { value: 'society3', label: 'Sociedad 3' }
];

export default function CreateService() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ServiceFormData>({
    category: '',
    name: '',
    description: '',
    duration: '01:00',
    isFree: false,
    value: '',
    cost: '',
    saleCommission: '',
    serviceCommission: '',
    instructions: '',
    loyaltyPoints: '',
    autoDiscountSupplies: false,
    society: '',
    dteType: ''
  });

  useEffect(() => {
    const savedCategories = localStorage.getItem('service_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const handleBack = () => {
    window.location.hash = '#settings/servicios';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const newService = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.value.replace(/[,.]/g, '')),
      cost: parseFloat(formData.cost.replace(/[,.]/g, '')),
      saleCommission: parseFloat(formData.saleCommission),
      serviceCommission: parseFloat(formData.serviceCommission.replace(/[,.]/g, '')),
      loyaltyPoints: parseInt(formData.loyaltyPoints)
    };

    services.push(newService);
    localStorage.setItem('services', JSON.stringify(services));
    handleBack();
  };

  const handleChange = (field: keyof ServiceFormData, value: any) => {
    if (field === 'saleCommission') {
      const numValue = parseFloat(value);
      if (!value || (!isNaN(numValue) && numValue >= 0 && numValue <= 100)) {
        setFormData(prev => ({ ...prev, [field]: value }));
      }
    } else if (['value', 'cost', 'serviceCommission'].includes(field)) {
      // Permitir solo números y separadores de miles
      const cleanValue = value.replace(/[^\d,.]/g, '');
      setFormData(prev => ({ ...prev, [field]: cleanValue }));
    } else if (field === 'loyaltyPoints') {
      // Permitir solo números enteros
      const cleanValue = value.replace(/\D/g, '');
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
        <h2 className="text-xl font-semibold mb-6">Agregar/Editar servicio</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
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
                  Nombre
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
                  Duración
                </label>
                <input
                  type="time"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={formData.isFree}
                  onChange={(e) => handleChange('isFree', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="isFree" className="ml-2 block text-sm text-gray-700">
                  Gratuito
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor
                </label>
                <input
                  type="text"
                  value={formatNumber(formData.value)}
                  onChange={(e) => handleChange('value', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese el valor"
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Costo
                </label>
                <input
                  type="text"
                  value={formatNumber(formData.cost)}
                  onChange={(e) => handleChange('cost', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese el costo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comisión venta (%)
                </label>
                <input
                  type="text"
                  value={formData.saleCommission}
                  onChange={(e) => handleChange('saleCommission', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese el porcentaje (0-100)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comisión atención ($)
                </label>
                <input
                  type="text"
                  value={formatNumber(formData.serviceCommission)}
                  onChange={(e) => handleChange('serviceCommission', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese la comisión"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicaciones
                </label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => handleChange('instructions', e.target.value)}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Puntos fidelización
                </label>
                <input
                  type="text"
                  value={formData.loyaltyPoints}
                  onChange={(e) => handleChange('loyaltyPoints', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese los puntos"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoDiscountSupplies"
                  checked={formData.autoDiscountSupplies}
                  onChange={(e) => handleChange('autoDiscountSupplies', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="autoDiscountSupplies" className="ml-2 block text-sm text-gray-700">
                  Descuento automático de insumos
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sociedad (para boleta electrónica)
                </label>
                <select
                  value={formData.society}
                  onChange={(e) => handleChange('society', e.target.value)}
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
                  value={formData.dteType}
                  onChange={(e) => handleChange('dteType', e.target.value)}
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