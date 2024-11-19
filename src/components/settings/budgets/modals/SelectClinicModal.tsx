import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Clinic {
  id: string;
  name: string;
}

interface SelectClinicModalProps {
  onSelect: (clinicId: string) => void;
  onClose: () => void;
}

export default function SelectClinicModal({ onSelect, onClose }: SelectClinicModalProps) {
  const [clinics, setClinics] = useState<Clinic[]>([
    { id: '1', name: 'Clínica Central' },
    { id: '2', name: 'Clínica Norte' },
    { id: '3', name: 'Clínica Sur' }
  ]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Seleccionar Clínica</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {clinics.map(clinic => (
              <li
                key={clinic.id}
                className="py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelect(clinic.id)}
              >
                <span className="text-sm font-medium text-gray-900">
                  {clinic.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}