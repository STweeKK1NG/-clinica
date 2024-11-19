import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import CenterNotifications from './CenterNotifications';
import ClientNotifications from './ClientNotifications';

interface EmailConfig {
  senderEmail: string;
  isVerified: boolean;
  allowRescheduling: boolean;
  showProfileLink: boolean;
  allowEmailConfirmation: boolean;
  confirmationDays: number;
  confirmationHours: number;
  allowEmailCancellation: boolean;
  cancellationHours: number;
  showProfessionalName: boolean;
}

const defaultConfig: EmailConfig = {
  senderEmail: '',
  isVerified: false,
  allowRescheduling: false,
  showProfileLink: true,
  allowEmailConfirmation: true,
  confirmationDays: 2,
  confirmationHours: 24,
  allowEmailCancellation: true,
  cancellationHours: 24,
  showProfessionalName: true
};

interface Props {
  onSave: () => void;
  hasChanges: boolean;
}

export default function GeneralConfig({ onSave, hasChanges }: Props) {
  const [config, setConfig] = useState<EmailConfig>(() => {
    const saved = localStorage.getItem('email_config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });
  const [isExpanded, setIsExpanded] = useState({
    basic: true,
    centerNotifications: true,
    clientNotifications: true
  });

  const handleChange = (field: keyof EmailConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Información básica */}
        <div className="border-b border-gray-200">
          <button
            className="w-full px-6 py-4 text-left font-medium flex items-center justify-between"
            onClick={() => setIsExpanded(prev => ({ ...prev, basic: !prev.basic }))}
          >
            <span>Información básica</span>
            <span className="transform transition-transform">
              {isExpanded.basic ? '▼' : '▶'}
            </span>
          </button>
          
          {isExpanded.basic && (
            <div className="px-6 pb-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo para envíos de mail
                </label>
                <div className="flex items-center">
                  <input
                    type="email"
                    value={config.senderEmail}
                    onChange={(e) => handleChange('senderEmail', e.target.value)}
                    className="flex-1 border-gray-300 rounded-l-md focus:ring-primary focus:border-primary"
                  />
                  <div className={`flex items-center px-3 py-2 border border-gray-300 rounded-r-md ${
                    config.isVerified 
                      ? 'bg-green-50 text-green-700 border-l-0' 
                      : 'bg-red-50 text-red-700 border-l-0'
                  }`}>
                    {config.isVerified ? (
                      <>
                        <Check className="h-5 w-5 mr-1" />
                        <span>Verificado</span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 mr-1" />
                        <span>No verificado</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Permitir reagendamiento de citas</span>
                  <div className="relative inline-flex">
                    <select
                      value={config.allowRescheduling ? 'online' : 'no'}
                      onChange={(e) => handleChange('allowRescheduling', e.target.value === 'online')}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="no">No</option>
                      <option value="online">Reagendamiento online</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Mostrar enlace para completar perfil del cliente</span>
                  <div className="relative inline-flex">
                    <select
                      value={config.showProfileLink ? 'yes' : 'no'}
                      onChange={(e) => handleChange('showProfileLink', e.target.value === 'yes')}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="no">No</option>
                      <option value="yes">Sí</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Permitir confirmar cita vía mail</span>
                  <div className="relative inline-flex">
                    <select
                      value={config.allowEmailConfirmation ? 'yes' : 'no'}
                      onChange={(e) => handleChange('allowEmailConfirmation', e.target.value === 'yes')}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="no">No</option>
                      <option value="yes">Sí</option>
                    </select>
                  </div>
                </div>

                {config.allowEmailConfirmation && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Días hábiles previos para confirmar</span>
                      <select
                        value={config.confirmationDays}
                        onChange={(e) => handleChange('confirmationDays', parseInt(e.target.value))}
                        className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} días</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Horas previas para confirmar</span>
                      <select
                        value={config.confirmationHours}
                        onChange={(e) => handleChange('confirmationHours', parseInt(e.target.value))}
                        className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      >
                        {[12, 24, 48, 72].map(num => (
                          <option key={num} value={num}>{num} horas</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Permitir suspender cita vía mail</span>
                  <div className="relative inline-flex">
                    <select
                      value={config.allowEmailCancellation ? 'yes' : 'no'}
                      onChange={(e) => handleChange('allowEmailCancellation', e.target.value === 'yes')}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="no">No</option>
                      <option value="yes">Sí</option>
                    </select>
                  </div>
                </div>

                {config.allowEmailCancellation && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Horas previas para suspender</span>
                    <select
                      value={config.cancellationHours}
                      onChange={(e) => handleChange('cancellationHours', parseInt(e.target.value))}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      {[12, 24, 48, 72].map(num => (
                        <option key={num} value={num}>{num} horas</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Indicar el nombre del profesional en el correo</span>
                  <div className="relative inline-flex">
                    <select
                      value={config.showProfessionalName ? 'yes' : 'no'}
                      onChange={(e) => handleChange('showProfessionalName', e.target.value === 'yes')}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="no">No</option>
                      <option value="yes">Sí</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notificaciones al centro */}
        <div className="border-b border-gray-200">
          <button
            className="w-full px-6 py-4 text-left font-medium flex items-center justify-between"
            onClick={() => setIsExpanded(prev => ({ ...prev, centerNotifications: !prev.centerNotifications }))}
          >
            <span>Notificaciones al centro</span>
            <span className="transform transition-transform">
              {isExpanded.centerNotifications ? '▼' : '▶'}
            </span>
          </button>
          {isExpanded.centerNotifications && (
            <CenterNotifications onSave={onSave} hasChanges={hasChanges} />
          )}
        </div>

        {/* Notificaciones al cliente */}
        <div className="border-b border-gray-200">
          <button
            className="w-full px-6 py-4 text-left font-medium flex items-center justify-between"
            onClick={() => setIsExpanded(prev => ({ ...prev, clientNotifications: !prev.clientNotifications }))}
          >
            <span>Notificaciones al cliente</span>
            <span className="transform transition-transform">
              {isExpanded.clientNotifications ? '▼' : '▶'}
            </span>
          </button>
          {isExpanded.clientNotifications && (
            <ClientNotifications onSave={onSave} hasChanges={hasChanges} />
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Configuraciones predeterminadas
        </button>

        {hasChanges && (
          <button
            onClick={onSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Guardar
          </button>
        )}
      </div>
    </div>
  );
}