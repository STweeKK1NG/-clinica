import React, { useState, useEffect } from 'react';
import { Save, Plus } from 'lucide-react';

interface Commission {
  professionalId: string;
  serviceId: string;
  percentage: number;
}

interface Professional {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function ProfessionalsCommissions() {
  const [professionals] = useState<Professional[]>(() => {
    const saved = localStorage.getItem('professionals');
    return saved ? JSON.parse(saved) : [];
  });

  const [services] = useState<Service[]>([
    { id: '1', name: 'Limpieza dental', price: 30000 },
    { id: '2', name: 'Extracción', price: 50000 },
    { id: '3', name: 'Ortodoncia', price: 100000 },
  ]);

  const [commissions, setCommissions] = useState<Commission[]>(() => {
    const saved = localStorage.getItem('commissions');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSave = () => {
    localStorage.setItem('commissions', JSON.stringify(commissions));
    alert('Comisiones guardadas exitosamente');
  };

  const handleCommissionChange = (professionalId: string, serviceId: string, percentage: number) => {
    setCommissions(prev => {
      const existing = prev.find(
        c => c.professionalId === professionalId && c.serviceId === serviceId
      );

      if (existing) {
        return prev.map(c =>
          c.professionalId === professionalId && c.serviceId === serviceId
            ? { ...c, percentage }
            : c
        );
      }

      return [...prev, { professionalId, serviceId, percentage }];
    });
  };

  const getCommissionValue = (professionalId: string, serviceId: string): number => {
    return commissions.find(
      c => c.professionalId === professionalId && c.serviceId === serviceId
    )?.percentage || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Comisiones por servicio</h3>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar cambios
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profesional
              </th>
              {services.map(service => (
                <th
                  key={service.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {service.name}
                  <div className="text-gray-400 font-normal">
                    ${service.price.toLocaleString()}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {professionals.map(professional => (
              <tr key={professional.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {professional.name}
                </td>
                {services.map(service => (
                  <td key={service.id} className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={getCommissionValue(professional.id, service.id)}
                        onChange={(e) => handleCommissionChange(
                          professional.id,
                          service.id,
                          Number(e.target.value)
                        )}
                        className="w-20 border rounded-md px-2 py-1 text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-500">%</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}