import React, { useState } from 'react';
import BudgetTemplates from './BudgetTemplates';
import CreateBudgetTemplate from './CreateBudgetTemplate';
import BudgetConfiguration from './BudgetConfiguration';
import TrackingStates from './TrackingStates';
import BudgetEmailDesign from './BudgetEmailDesign';

const tabs = [
  { id: 'templates', label: 'Presupuestos' },
  { id: 'create', label: 'Crear presupuesto base' },
  { id: 'config', label: 'Configuración presupuestos' },
  { id: 'tracking', label: 'Estados de seguimiento' },
  { id: 'email', label: 'Diseño Mail presupuesto' }
];

export default function BudgetsSettings() {
  const [activeTab, setActiveTab] = useState('templates');

  const renderContent = () => {
    switch (activeTab) {
      case 'templates':
        return <BudgetTemplates />;
      case 'create':
        return <CreateBudgetTemplate />;
      case 'config':
        return <BudgetConfiguration />;
      case 'tracking':
        return <TrackingStates />;
      case 'email':
        return <BudgetEmailDesign />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}