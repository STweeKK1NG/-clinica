import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import DynamicItemsTable from './DynamicItemsTable';
import { BudgetTemplateFormData, TemplateItem } from './types';

export default function CreateBudgetTemplate() {
  const [formData, setFormData] = useState<BudgetTemplateFormData>({
    name: '',
    includedValue: '',
    paymentMethods: '',
    observations: '',
    items: []
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [formData.items]);

  const calculateTotal = () => {
    const total = formData.items.reduce((sum, item) => {
      const priceAfterDiscount = item.basePrice * (1 - item.discount / 100);
      return sum + (priceAfterDiscount * item.sessions);
    }, 0);
    setTotal(total);
  };

  const handleItemsChange = (items: TemplateItem[]) => {
    setFormData(prev => ({ ...prev, items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        alert('Por favor ingrese un nombre para el presupuesto');
        return;
      }

      if (formData.items.length === 0) {
        alert('Por favor agregue al menos un ítem al presupuesto');
        return;
      }

      // Get existing templates
      const templates = JSON.parse(localStorage.getItem('budget_templates') || '[]');
      
      // Create new template
      const newTemplate = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        value: total
      };
      
      // Add new template to array
      templates.push(newTemplate);
      
      // Save to localStorage
      localStorage.setItem('budget_templates', JSON.stringify(templates));

      // Show success message
      alert('Presupuesto guardado exitosamente');
      
      // Navigate to templates list
      window.location.hash = '#settings/presupuestos';
    } catch (error) {
      console.error('Error al guardar el presupuesto:', error);
      alert('Ocurrió un error al guardar el presupuesto');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Creación de planillas base para presupuestos
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Aquí podrás crear diversas planillas de presupuesto las que podrás utilizar al momento de generar presupuestos a tus pacientes.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DynamicItemsTable
            items={formData.items}
            onChange={handleItemsChange}
          />

          <div className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Presupuesto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  El valor incluye
                </label>
                <textarea
                  value={formData.includedValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, includedValue: e.target.value }))}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Formas de Pago
                </label>
                <textarea
                  value={formData.paymentMethods}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentMethods: e.target.value }))}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones generales
                </label>
                <textarea
                  value={formData.observations}
                  onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total
                </label>
                <input
                  type="text"
                  value={`$${total.toLocaleString('es-CL')}`}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}