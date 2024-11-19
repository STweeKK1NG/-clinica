import React, { useState } from 'react';
import UsersList from './UsersList';
import PasswordChange from './PasswordChange';
import ProfessionalAssociation from './ProfessionalAssociation';

const tabs = [
  { id: 'users', label: 'Usuarios' },
  { id: 'password', label: 'Cambio de clave' },
  { id: 'verification', label: 'Verificación en dos pasos' },
  { id: 'sessions', label: 'Configuración de sesiones' },
  { id: 'professional', label: 'Profesional por usuario' },
  { id: 'permissions', label: 'Solicitudes de permisos' },
];

export default function UsersSettings() {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersList />;
      case 'password':
        return <PasswordChange />;
      case 'professional':
        return <ProfessionalAssociation />;
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500">
              {tabs.find(t => t.id === activeTab)?.label}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'users') {
                  window.location.hash = '#settings/usuarios';
                }
              }}
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

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}