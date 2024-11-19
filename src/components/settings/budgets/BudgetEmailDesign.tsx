import React from 'react';
import EmailForm from './email-design/EmailForm';
import EmailPreview from './email-design/EmailPreview';

export default function BudgetEmailDesign() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Diseño Mail Presupuesto
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmailForm />
        <EmailPreview />
      </div>
    </div>
  );
}