import React, { useState } from 'react';
import { Info, Edit } from 'lucide-react';

interface ClientNotificationsConfig {
  notifyAppointmentCreation: boolean;
  notifyAppointmentModification: boolean;
  sendAppointmentReminders: boolean;
  reminderDays: number;
  notifyPlanExpiration: boolean;
  expirationDays: number;
  sendBirthdayGreeting: boolean;
  sendWelcomeEmail: boolean;
}

const defaultConfig: ClientNotificationsConfig = {
  notifyAppointmentCreation: true,
  notifyAppointmentModification: true,
  sendAppointmentReminders: true,
  reminderDays: 2,
  notifyPlanExpiration: true,
  expirationDays: 7,
  sendBirthdayGreeting: true,
  sendWelcomeEmail: true
};

interface Props {
  onSave: () => void;
  hasChanges: boolean;
}

export default function ClientNotifications({ onSave, hasChanges }: Props) {
  const [config, setConfig] = useState<ClientNotificationsConfig>(() => {
    const saved = localStorage.getItem('client_notifications_config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const handleChange = (field: keyof ClientNotificationsConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleEditEmail = (type: 'birthday' | 'welcome') => {
    window.location.hash = `#settings/mail/${type}`;
  };

  return (
    <div className="px-6 pb-4 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Configura las notificaciones que recibirán los clientes según las actividades relacionadas con sus citas y servicios.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Notificación de creación de cita */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Notificar al cliente cuando se crea una cita
          </span>
          <select
            value={config.notifyAppointmentCreation ? 'yes' : 'no'}
            onChange={(e) => handleChange('notifyAppointmentCreation', e.target.value === 'yes')}
            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
        </div>

        {/* Notificación de modificación de cita */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Notificar al cliente cuando se modifican citas
          </span>
          <select
            value={config.notifyAppointmentModification ? 'yes' : 'no'}
            onChange={(e) => handleChange('notifyAppointmentModification', e.target.value === 'yes')}
            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
        </div>

        {/* Recordatorios de citas */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Enviar correos recordatorios de citas
            </span>
            <select
              value={config.sendAppointmentReminders ? 'yes' : 'no'}
              onChange={(e) => handleChange('sendAppointmentReminders', e.target.value === 'yes')}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
          </div>
          {config.sendAppointmentReminders && (
            <div className="flex items-center justify-between ml-4">
              <span className="text-sm text-gray-700">
                Días de anticipación para el recordatorio
              </span>
              <select
                value={config.reminderDays}
                onChange={(e) => handleChange('reminderDays', parseInt(e.target.value))}
                className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num} días</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Vencimiento de plan */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Enviar correo a los clientes avisando el vencimiento del plan
            </span>
            <select
              value={config.notifyPlanExpiration ? 'yes' : 'no'}
              onChange={(e) => handleChange('notifyPlanExpiration', e.target.value === 'yes')}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
          </div>
          {config.notifyPlanExpiration && (
            <div className="flex items-center justify-between ml-4">
              <span className="text-sm text-gray-700">
                Días de anticipación para la notificación
              </span>
              <select
                value={config.expirationDays}
                onChange={(e) => handleChange('expirationDays', parseInt(e.target.value))}
                className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num} días</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Saludo de cumpleaños */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Enviar correo de saludo de cumpleaños
          </span>
          <div className="flex items-center space-x-4">
            <select
              value={config.sendBirthdayGreeting ? 'yes' : 'no'}
              onChange={(e) => handleChange('sendBirthdayGreeting', e.target.value === 'yes')}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
            {config.sendBirthdayGreeting && (
              <button
                onClick={() => handleEditEmail('birthday')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar correo
              </button>
            )}
          </div>
        </div>

        {/* Correo de bienvenida */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Enviar correo de bienvenida al crear clientes
          </span>
          <div className="flex items-center space-x-4">
            <select
              value={config.sendWelcomeEmail ? 'yes' : 'no'}
              onChange={(e) => handleChange('sendWelcomeEmail', e.target.value === 'yes')}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
            {config.sendWelcomeEmail && (
              <button
                onClick={() => handleEditEmail('welcome')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar correo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}