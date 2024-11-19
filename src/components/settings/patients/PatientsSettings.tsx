import React, { useState } from 'react';
import References from './References';
import Categories from './Categories';
import ExtraFields from './ExtraFields';
import Agreements from './Agreements';

const tabs = [
  { id: 'references', label: 'Referencias' },
  { id: 'categories', label: 'Categorías' },
  { id: 'extra-fields', label: 'Campos extra perfil' },
  { id: 'agreements', label: 'Convenios' }
];

export default function PatientsSettings() {
  const [activeTab, setActiveTab] = useState('references');

  const renderContent = () => {
    switch (activeTab) {
      case 'references':
        return <References />;
      case 'categories':
        return <Categories />;
      case 'extra-fields':
        return <ExtraFields />;
      case 'agreements':
        return <Agreements />;
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