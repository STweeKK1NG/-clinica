import React, { useState } from 'react';
import PlanDataForm from './PlanDataForm';
import PlanServicesForm from './PlanServicesForm';
import { PlanFormData } from './types';

interface PlanFormProps {
  initialData?: PlanFormData;
  onSubmit: (data: PlanFormData) => void;
}

const defaultFormData: PlanFormData = {
  category: '',
  name: '',
  description: '',
  value: '',
  cost: '',
  startDate: '',
  endDate: '',
  expirationDays: '',
  commission: '',
  loyaltyPoints: '',
  society: '',
  dteType: '',
  isAffected: false,
  taxes: false,
  preExpirationDays: '',
  services: []
};

export default function PlanForm({ initialData, onSubmit }: PlanFormProps) {
  const [formData, setFormData] = useState<PlanFormData>(initialData || defaultFormData);

  const handleChange = (field: keyof PlanFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PlanDataForm
          data={formData}
          onChange={handleChange}
        />
        <PlanServicesForm
          services={formData.services}
          onServicesChange={(services) => handleChange('services', services)}
        />
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          {initialData ? 'Guardar cambios' : 'Crear Plan'}
        </button>
      </div>
    </form>
  );
}