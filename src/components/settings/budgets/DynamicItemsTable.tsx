import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Building } from 'lucide-react';
import { TemplateItem, Service, Plan, Product } from './types';
import SelectClinicModal from './modals/SelectClinicModal';

interface DynamicItemsTableProps {
  items: TemplateItem[];
  onChange: (items: TemplateItem[]) => void;
}

export default function DynamicItemsTable({ items, onChange }: DynamicItemsTableProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showClinicModal, setShowClinicModal] = useState(false);
  const [selectedItemForClinic, setSelectedItemForClinic] = useState<string | null>(null);

  useEffect(() => {
    // Load services, plans and products from localStorage
    const savedServices = localStorage.getItem('services');
    if (savedServices) setServices(JSON.parse(savedServices));

    const savedPlans = localStorage.getItem('plans');
    if (savedPlans) setPlans(JSON.parse(savedPlans));

    const savedProducts = localStorage.getItem('products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  const addItem = (type: 'service' | 'plan' | 'product') => {
    const newItem: TemplateItem = {
      id: Date.now().toString(),
      type,
      itemId: '',
      name: '',
      sessions: 1,
      basePrice: 0,
      discount: 0
    };
    onChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<TemplateItem>) => {
    onChange(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleItemSelect = (id: string, itemId: string, type: 'service' | 'plan' | 'product') => {
    let selectedItem;
    let name = '';
    let basePrice = 0;

    switch (type) {
      case 'service':
        selectedItem = services.find(s => s.id === itemId);
        if (selectedItem) {
          name = selectedItem.name;
          basePrice = selectedItem.price;
        }
        break;
      case 'plan':
        selectedItem = plans.find(p => p.id === itemId);
        if (selectedItem) {
          name = selectedItem.name;
          basePrice = selectedItem.value;
        }
        break;
      case 'product':
        selectedItem = products.find(p => p.id === itemId);
        if (selectedItem) {
          name = selectedItem.name;
          basePrice = selectedItem.value;
        }
        break;
    }

    updateItem(id, { itemId, name, basePrice });
  };

  const handleClinicSelect = (clinicId: string) => {
    if (selectedItemForClinic) {
      updateItem(selectedItemForClinic, { clinicId });
      setSelectedItemForClinic(null);
    }
    setShowClinicModal(false);
  };

  const getOptions = (type: 'service' | 'plan' | 'product') => {
    switch (type) {
      case 'service':
        return services;
      case 'plan':
        return plans;
      case 'product':
        return products;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => addItem('service')}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Servicio
        </button>
        <button
          type="button"
          onClick={() => addItem('plan')}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Plan
        </button>
        <button
          type="button"
          onClick={() => addItem('product')}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Producto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servicio/Plan/Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sesiones
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor/sesión lista
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Dcto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor/sesión
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => {
              const options = getOptions(item.type);
              const valuePerSession = item.basePrice * (1 - item.discount / 100);
              const totalValue = valuePerSession * item.sessions;

              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={item.itemId}
                      onChange={(e) => handleItemSelect(item.id, e.target.value, item.type)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="">Seleccionar...</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="1"
                      value={item.sessions}
                      onChange={(e) => updateItem(item.id, { sessions: parseInt(e.target.value) || 1 })}
                      className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${item.basePrice.toLocaleString('es-CL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.discount}
                      onChange={(e) => updateItem(item.id, { discount: parseFloat(e.target.value) || 0 })}
                      className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${valuePerSession.toLocaleString('es-CL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${totalValue.toLocaleString('es-CL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedItemForClinic(item.id);
                          setShowClinicModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Building className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay items agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showClinicModal && (
        <SelectClinicModal
          onSelect={handleClinicSelect}
          onClose={() => {
            setShowClinicModal(false);
            setSelectedItemForClinic(null);
          }}
        />
      )}
    </div>
  );
}