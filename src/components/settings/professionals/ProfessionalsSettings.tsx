import React, { useState } from 'react';
import ProfessionalsList from './ProfessionalsList';
import ProfessionalsCommissions from './ProfessionalsCommissions';

export default function ProfessionalsSettings() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'list'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Listado de profesionales
        </button>
        <button
          onClick={() => setActiveTab('commissions')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'commissions'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Comisiones profesionales
        </button>
      </div>

      {activeTab === 'list' ? <ProfessionalsList /> : <ProfessionalsCommissions />}
    </div>
  );
}