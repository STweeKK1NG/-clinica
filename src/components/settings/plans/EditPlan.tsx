import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import PlanForm from './PlanForm';
import { Plan, PlanFormData } from './types';

interface EditPlanProps {
  planId: string;
}

export default function EditPlan({ planId }: EditPlanProps) {
  const [initialData, setInitialData] = useState<Plan | null>(null);

  useEffect(() => {
    const plans = JSON.parse(localStorage.getItem('plans') || '[]');
    const plan = plans.find((p: Plan) => p.id === planId);
    if (plan) {
      setInitialData(plan);
    }
  }, [planId]);

  const handleBack = () => {
    window.location.hash = '#settings/planes';
  };

  const handleSubmit = (formData: PlanFormData) => {
    const plans = JSON.parse(localStorage.getItem('plans') || '[]');
    const updatedPlans = plans.map((plan: Plan) =>
      plan.id === planId ? { ...plan, ...formData } : plan
    );
    
    localStorage.setItem('plans', JSON.stringify(updatedPlans));
    handleBack();
  };

  if (!initialData) {
    return null;
  }

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
        <PlanForm initialData={initialData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}