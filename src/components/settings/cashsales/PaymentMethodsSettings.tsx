import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  description: string;
  code: string;
  limitDiscount: boolean;
  maxDiscount: number | null;
  commission: number;
}

export default function PaymentMethodsSettings() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const savedMethods = localStorage.getItem('payment_methods');
    if (savedMethods) {
      setPaymentMethods(JSON.parse(savedMethods));
    }
  }, []);

  const handleCreatePaymentMethod = () => {
    window.location.hash = '#settings/cajayventas/payment-methods/create';
  };

  const handleEdit = (id: string) => {
    window.location.hash = `#settings/cajayventas/payment-methods/edit/${id}`;
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este método de pago?')) {
      const updatedMethods = paymentMethods.filter(method => method.id !== id);
      setPaymentMethods(updatedMethods);
      localStorage.setItem('payment_methods', JSON.stringify(updatedMethods));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Métodos de pago
        </h2>
        <button
          onClick={handleCreatePaymentMethod}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo medio de pago
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descuento máximo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comisión
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentMethods.map((method) => (
              <tr key={method.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {method.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {method.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {method.limitDiscount ? `${method.maxDiscount}%` : 'Sin límite'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {method.commission}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(method.id)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paymentMethods.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay métodos de pago registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}