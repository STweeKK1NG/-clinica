import React, { useState, useEffect } from 'react';
import GeneralSettings from './GeneralSettings';
import PaymentMethodsSettings from './PaymentMethodsSettings';
import CreatePaymentMethod from './CreatePaymentMethod';

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'payment-methods', label: 'Métodos de pago' },
  { id: 'reports', label: 'Reportes' }
];

export default function CashSalesSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [view, setView] = useState('list');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#settings/cajayventas/payment-methods/create') {
        setActiveTab('payment-methods');
        setView('create');
      } else {
        setView('list');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (activeTab === 'payment-methods' && view === 'create') {
      return <CreatePaymentMethod />;
    }

    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;

      case 'payment-methods':
        return <PaymentMethodsSettings />;

      case 'reports':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de Reportes</h3>
            {/* Add reports settings here */}
          </div>
        );

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
            onClick={() => {
              setActiveTab(tab.id);
              setView('list');
            }}
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