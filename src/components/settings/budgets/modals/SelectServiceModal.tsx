import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Service } from '../types';

interface SelectServiceModalProps {
  onSelect: (service: Service) => void;
  onClose: () => void;
}

export default function SelectServiceModal({ onSelect, onClose }: SelectServiceModalProps) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Seleccionar Servicio</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {services.map(service => (
              <li
                key={service.id}
                className="py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelect(service)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {service.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${service.price.toLocaleString('es-CL')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}