import React, { useState } from 'react';
import { ArrowLeft, Info, Plus } from 'lucide-react';
import PlanForm from './PlanForm';
import { Plan, PlanFormData } from './types';

export default function CreatePlan() {
  const handleBack = () => {
    window.location.hash = '#settings/planes';
  };

  const handleSubmit = (formData: PlanFormData) => {
    const plans = JSON.parse(localStorage.getItem('plans') || '[]');
    const newPlan: Plan = {
      id: Date.now().toString(),
      ...formData,
      value: parseFloat(formData.value.toString()),
      cost: parseFloat(formData.cost.toString()),
      isExpired: false
    };
    
    plans.push(newPlan);
    localStorage.setItem('plans', JSON.stringify(plans));
    handleBack();
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

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Datos del plan</h2>
        <PlanForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}