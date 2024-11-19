import React, { useState, useEffect } from 'react';
import BasicDataSettings from './basicdata/BasicDataSettings';
import UsersSettings from './users/UsersSettings';
import ProfessionalsSettings from './professionals/ProfessionalsSettings';
import ServicesSettings from './services/ServicesSettings';
import ProductsSettings from './products/ProductsSettings';
import PlansSettings from './plans/PlansSettings';
import FileTypes from './files/FileTypes';
import PatientsSettings from './patients/PatientsSettings';
import AgendasSettings from './agendas/AgendasSettings';
import BudgetsSettings from './budgets/BudgetsSettings';
import MailSettings from './mail/MailSettings';
import CashSalesSettings from './cashsales/CashSalesSettings';

const tabs = [
  { id: 'basicdata', label: 'Datos básicos' },
  { id: 'usuarios', label: 'Usuarios' },
  { id: 'profesionales', label: 'Profesionales' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'productos', label: 'Productos' },
  { id: 'planes', label: 'Planes' },
  { id: 'fichas', label: 'Fichas' },
  { id: 'pacientes', label: 'Pacientes' },
  { id: 'agendas', label: 'Agendas' },
  { id: 'presupuestos', label: 'Presupuestos' },
  { id: 'mail', label: 'Mail' },
  { id: 'maquinas', label: 'Máquinas' },
  { id: 'cajayventas', label: 'Caja y ventas' }
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('basicdata');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const section = hash.split('/')[1];
      if (section === 'settings') {
        const tab = hash.split('/')[2];
        if (tab) {
          setActiveTab(tab);
        } else {
          setActiveTab('basicdata');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = `#settings/${tabId}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'basicdata':
        return <BasicDataSettings />;
      case 'usuarios':
        return <UsersSettings />;
      case 'profesionales':
        return <ProfessionalsSettings />;
      case 'servicios':
        return <ServicesSettings />;
      case 'productos':
        return <ProductsSettings />;
      case 'planes':
        return <PlansSettings />;
      case 'fichas':
        return <FileTypes />;
      case 'pacientes':
        return <PatientsSettings />;
      case 'agendas':
        return <AgendasSettings />;
      case 'presupuestos':
        return <BudgetsSettings />;
      case 'mail':
        return <MailSettings />;
      case 'cajayventas':
        return <CashSalesSettings />;
      case 'maquinas':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Configuración de Máquinas</h2>
            <p className="text-gray-600">Configuración de máquinas disponible próximamente.</p>
          </div>
        );
      default:
        return <BasicDataSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
}