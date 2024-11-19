import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Plan } from '../types';

interface SelectPlanModalProps {
  onSelect: (plan: Plan) => void;
  onClose: () => void;
}

export default function SelectPlanModal({ onSelect, onClose }: SelectPlanModalProps) {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const savedPlans = localStorage.getItem('plans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Seleccionar Plan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {plans.map(plan => (
              <li
                key={plan.id}
                className="py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelect(plan)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {plan.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${plan.value.toLocaleString('es-CL')}
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