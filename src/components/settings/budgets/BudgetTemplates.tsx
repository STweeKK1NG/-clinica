import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface BudgetTemplate {
  id: string;
  name: string;
  createdAt: string;
  value: number;
}

export default function BudgetTemplates() {
  const [templates, setTemplates] = useState<BudgetTemplate[]>(() => {
    const saved = localStorage.getItem('budget_templates');
    return saved ? JSON.parse(saved) : [];
  });

  const handleEdit = (templateId: string) => {
    window.location.hash = `#settings/presupuestos/edit/${templateId}`;
  };

  const handleDelete = (templateId: string) => {
    if (confirm('¿Está seguro de eliminar este presupuesto?')) {
      const updatedTemplates = templates.filter(template => template.id !== templateId);
      setTemplates(updatedTemplates);
      localStorage.setItem('budget_templates', JSON.stringify(updatedTemplates));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Planillas base de presupuestos
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          En esta sección se encuentran todas las planillas predefinidas que podrás usar al momento de crear presupuestos.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templates.map((template) => (
              <tr key={template.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {template.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(template.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${template.value.toLocaleString('es-CL')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(template.id)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {templates.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay planillas base registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}