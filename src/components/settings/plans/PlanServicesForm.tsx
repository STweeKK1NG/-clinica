import React, { useState, useEffect } from 'react';
import { Info, Plus } from 'lucide-react';
import { Service, PlanService } from './types';

interface PlanServicesFormProps {
  services: PlanService[];
  onServicesChange: (services: PlanService[]) => void;
}

export default function PlanServicesForm({ services, onServicesChange }: PlanServicesFormProps) {
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedSessions, setSelectedSessions] = useState(1);

  useEffect(() => {
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      setAvailableServices(JSON.parse(savedServices));
    }
  }, []);

  const handleAddService = () => {
    if (!selectedService) return;

    const service = availableServices.find(s => s.id === selectedService);
    if (!service) return;

    const newPlanService: PlanService = {
      serviceId: service.id,
      serviceName: service.name,
      sessions: selectedSessions,
      unitaryCommission: 0
    };

    onServicesChange([...services, newPlanService]);
    setSelectedService('');
    setSelectedSessions(1);
  };

  const handleRemoveService = (serviceId: string) => {
    onServicesChange(services.filter(s => s.serviceId !== serviceId));
  };

  const handleCommissionChange = (serviceId: string, value: number) => {
    onServicesChange(
      services.map(s =>
        s.serviceId === serviceId ? { ...s, unitaryCommission: value } : s
      )
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Servicios asociados al plan</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Aquí debes agregar los servicios del plan y la cantidad de sesiones que incluirá cada uno
          </p>
        </div>
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servicio
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Seleccionar servicio</option>
            {availableServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sesiones
          </label>
          <input
            type="number"
            value={selectedSessions}
            onChange={(e) => setSelectedSessions(parseInt(e.target.value))}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            min="1"
          />
        </div>

        <button
          type="button"
          onClick={handleAddService}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Agregar
        </button>

        <a
          href="#settings/servicios/create"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear servicios
        </a>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sesiones
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comisión atención unitaria (monto)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remover
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.serviceId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {service.serviceName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {service.sessions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input
                    type="number"
                    value={service.unitaryCommission}
                    onChange={(e) => handleCommissionChange(
                      service.serviceId,
                      parseInt(e.target.value)
                    )}
                    className="w-32 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    min="0"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    type="button"
                    onClick={() => handleRemoveService(service.serviceId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay servicios asociados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}