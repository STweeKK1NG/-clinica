import React, { useState } from 'react';
import GeneralConfig from './GeneralConfig';
import EmailDesign from './EmailDesign';
import WelcomeEmailDesign from './WelcomeEmailDesign';
import InvalidEmails from './InvalidEmails';

const tabs = [
  { id: 'config', label: 'Configuración' },
  { id: 'design', label: 'Diseño correo' },
  { id: 'welcome', label: 'Diseño correo de bienvenida' },
  { id: 'invalid', label: 'Correos inválidos' }
];

export default function MailSettings() {
  const [activeTab, setActiveTab] = useState('config');

  const renderContent = () => {
    switch (activeTab) {
      case 'config':
        return <GeneralConfig />;
      case 'design':
        return <EmailDesign />;
      case 'welcome':
        return <WelcomeEmailDesign />;
      case 'invalid':
        return <InvalidEmails />;
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

      <h2 className="text-2xl font-bold text-gray-900">
        Configuración de correos
      </h2>

      {renderContent()}
    </div>
  );
}