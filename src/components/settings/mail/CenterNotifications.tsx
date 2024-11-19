import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface CenterNotificationsConfig {
  notifyCancelledAppointment: boolean;
  centerEmail: string;
  notifyOnlineBooking: boolean;
  onlineBookingEmail: string;
  notifyProfessionalNewAppointment: boolean;
  notifyProfessionalCancelledAppointment: boolean;
  notificationMethod: {
    email: boolean;
    phone: boolean;
  };
  sendWelcomeEmail: boolean;
}

const defaultConfig: CenterNotificationsConfig = {
  notifyCancelledAppointment: false,
  centerEmail: '',
  notifyOnlineBooking: false,
  onlineBookingEmail: '',
  notifyProfessionalNewAppointment: false,
  notifyProfessionalCancelledAppointment: false,
  notificationMethod: {
    email: true,
    phone: false
  },
  sendWelcomeEmail: false
};

interface Props {
  onSave: () => void;
  hasChanges: boolean;
}

export default function CenterNotifications({ onSave, hasChanges }: Props) {
  const [config, setConfig] = useState<CenterNotificationsConfig>(() => {
    const saved = localStorage.getItem('center_notifications_config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const handleChange = (field: keyof CenterNotificationsConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleMethodChange = (method: keyof CenterNotificationsConfig['notificationMethod']) => {
    setConfig(prev => ({
      ...prev,
      notificationMethod: {
        ...prev.notificationMethod,
        [method]: !prev.notificationMethod[method]
      }
    }));
  };

  return (
    <div className="px-6 pb-4 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Configura las notificaciones que el centro recibirá en base a eventos relacionados con citas y correos enviados.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Notificación de suspensión de cita */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Notificar al correo del centro cuando se suspenda una cita por mail
            </span>
            <select
              value={config.notifyCancelledAppointment ? 'yes' : 'no'}
              onChange={(e) => handleChange('notifyCancelledAppointment', e.target.value === 'yes')}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
          </div>
          {config.notifyCancelledAppointment && (
            <input
              type="email"
              value={config.centerEmail}
              onChange={(e) => handleChange('centerEmail', e.target.value)}
              placeholder="Correo del centro"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          )}
        </div>

        {/* Notificación de cita online */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Notificar al centro cuando se recibe una cita vía agenda online
            </span>
            <select
              value={config.notifyOnlineBooking ? 'yes' : 'no'}
              onChange={(e) => handleChange('notifyOnlineBooking', e.target.value === 'yes')}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
          </div>
          {config.notifyOnlineBooking && (
            <input
              type="email"
              value={config.onlineBookingEmail}
              onChange={(e) => handleChange('onlineBookingEmail', e.target.value)}
              placeholder="Correo para notificaciones"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          )}
        </div>

        {/* Notificación al profesional de nueva cita */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Notificar al correo del profesional cuando se crea una cita
          </span>
          <select
            value={config.notifyProfessionalNewAppointment ? 'yes' : 'no'}
            onChange={(e) => handleChange('notifyProfessionalNewAppointment', e.target.value === 'yes')}
            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
        </div>

        {/* Notificación al profesional de cancelación */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Notificar al correo del profesional cuando se suspenda o elimine una cita
            </span>
            <select
              value={config.notifyProfessionalCancelledAppointment ? 'yes' : 'no'}
              onChange={(e) => handleChange('notifyProfessionalCancelledAppointment', e.target.value === 'yes')}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="no">No</option>
              <option value="yes">Sí</option>
            </select>
          </div>
          {config.notifyProfessionalCancelledAppointment && (
            <div className="flex items-center space-x-4 ml-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.notificationMethod.email}
                  onChange={() => handleMethodChange('email')}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Correo</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.notificationMethod.phone}
                  onChange={() => handleMethodChange('phone')}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Teléfono</span>
              </label>
            </div>
          )}
        </div>

        {/* Mail de bienvenida */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Enviar mail de bienvenida a nuevos usuarios del centro
          </span>
          <select
            value={config.sendWelcomeEmail ? 'yes' : 'no'}
            onChange={(e) => handleChange('sendWelcomeEmail', e.target.value === 'yes')}
            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
        </div>
      </div>
    </div>
  );
}