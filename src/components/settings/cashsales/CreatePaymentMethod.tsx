import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PaymentMethodFormData {
  description: string;
  code: string;
  limitDiscount: boolean;
  maxDiscount: string;
  commission: string;
}

interface PaymentMethod {
  id: string;
  description: string;
  code: string;
  limitDiscount: boolean;
  maxDiscount: number | null;
  commission: number;
}

export default function CreatePaymentMethod() {
  const [formData, setFormData] = useState<PaymentMethodFormData>({
    description: '',
    code: '',
    limitDiscount: false,
    maxDiscount: '',
    commission: ''
  });

  const handleBack = () => {
    window.location.hash = '#settings/cajayventas/payment-methods';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validar datos
      if (!formData.description.trim() || !formData.code.trim()) {
        alert('Por favor complete todos los campos requeridos');
        return;
      }

      // Preparar el nuevo método de pago
      const newPaymentMethod: PaymentMethod = {
        id: Date.now().toString(),
        description: formData.description.trim(),
        code: formData.code.trim(),
        limitDiscount: formData.limitDiscount,
        maxDiscount: formData.limitDiscount ? parseFloat(formData.maxDiscount) || 0 : null,
        commission: parseFloat(formData.commission) || 0
      };

      // Obtener métodos de pago existentes
      const existingMethods = JSON.parse(localStorage.getItem('payment_methods') || '[]');

      // Verificar si ya existe un método con el mismo código
      if (existingMethods.some((method: PaymentMethod) => method.code === newPaymentMethod.code)) {
        alert('Ya existe un método de pago con este código');
        return;
      }

      // Guardar el nuevo método
      const updatedMethods = [...existingMethods, newPaymentMethod];
      localStorage.setItem('payment_methods', JSON.stringify(updatedMethods));

      alert('Medio de pago guardado exitosamente');
      handleBack();
    } catch (error) {
      console.error('Error al guardar el método de pago:', error);
      alert('Ocurrió un error al guardar el método de pago');
    }
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

      <h2 className="text-2xl font-bold text-gray-900">Medio de pago</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 w-48">
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="py-4">
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="py-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Código <span className="text-red-500">*</span>
                  </label>
                </td>
                <td className="py-4">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="py-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Limitar descuento?
                  </label>
                </td>
                <td className="py-4">
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        checked={!formData.limitDiscount}
                        onChange={() => setFormData({ ...formData, limitDiscount: false, maxDiscount: '' })}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        checked={formData.limitDiscount}
                        onChange={() => setFormData({ ...formData, limitDiscount: true })}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="py-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Descuento máximo (%)
                  </label>
                </td>
                <td className="py-4">
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    disabled={!formData.limitDiscount}
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </td>
              </tr>

              <tr>
                <td className="py-4">
                  <label className="block text-sm font-medium text-gray-700">
                    % Comisión (ej: 1.95)
                  </label>
                </td>
                <td className="py-4">
                  <input
                    type="number"
                    value={formData.commission}
                    onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </td>
              </tr>
            </tbody>
          </table>

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