import React from 'react';
import { Calendar, Users, MessageSquare, DollarSign, BarChart2, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLogoStore } from '../store/logoStore';

const menuItems = [
  { icon: Calendar, label: 'AGENDA', path: '#agenda' },
  { icon: Users, label: 'PACIENTES', path: '#patients' },
  { icon: MessageSquare, label: 'CRM', path: '#crm' },
  { icon: DollarSign, label: 'FINANZAS', path: '#finances' },
  { icon: BarChart2, label: 'ESTADÍSTICAS', path: '#statistics' },
  { icon: Settings, label: 'CONFIGURACIÓN', path: '#settings' },
];

export default function Header() {
  const currentPath = window.location.hash || '#dashboard';
  const user = useAuthStore(state => state.user);
  const logo = useLogoStore(state => state.logo);

  return (
    <header className="h-16 bg-white fixed top-0 right-0 left-0 z-10 shadow-sm">
      <div className="h-full px-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {logo ? (
            <img
              src={logo}
              alt="Logo de la clínica"
              className="h-12 object-contain"
            />
          ) : (
            <span className="text-lg font-medium text-gray-900">
              Clínica A+ Salud
            </span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  currentPath === item.path
                    ? 'bg-[#e08081] text-white'
                    : 'text-[#1d1d1b] hover:bg-[#09a1ad] hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
            <span className="text-sm text-gray-600">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}