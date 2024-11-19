import React, { useState, useEffect } from 'react';
import BasicDataSettings from '../components/settings/basicdata/BasicDataSettings';
import UsersSettings from '../components/settings/users/UsersSettings';
import ProfessionalsSettings from '../components/settings/professionals/ProfessionalsSettings';
import ServicesSettings from '../components/settings/services/ServicesSettings';
import ProductsSettings from '../components/settings/products/ProductsSettings';
import PlansSettings from '../components/settings/plans/PlansSettings';
import FileTypes from '../components/settings/files/FileTypes';
import PatientsSettings from '../components/settings/patients/PatientsSettings';
import AgendasSettings from '../components/settings/agendas/AgendasSettings';
import BudgetsSettings from '../components/settings/budgets/BudgetsSettings';
import MailSettings from '../components/settings/mail/MailSettings';
import CashSalesSettings from '../components/settings/cashsales/CashSalesSettings';

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
      if (hash.startsWith('#settings/')) {
        const section = hash.split('/')[2];
        if (section) {
          setActiveTab(section);
        } else {
          setActiveTab('basicdata');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
      case 'maquinas':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Configuración de Máquinas</h2>
            <p className="text-gray-600">Configuración de máquinas disponible próximamente.</p>
          </div>
        );
      case 'cajayventas':
        return <CashSalesSettings />;
      default:
        return <BasicDataSettings />;
    }
  };

  return (
    <div className="py-6">
      <div className="mb-6 overflow-x-auto">
        <div className="inline-flex space-x-1 bg-white rounded-lg shadow-sm p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.location.hash = `#settings/${tab.id}`;
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
}