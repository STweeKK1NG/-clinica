import React, { useState } from 'react';
import { Upload, Send, RotateCcw } from 'lucide-react';
import { useLogoStore } from '../../../store/logoStore';
import EmailPreview from './preview/EmailPreview';

interface EmailDesignConfig {
  headerColor: string;
  phone1: string;
  phone2: string;
  email: string;
  extraText: string;
  logo: string;
  address: string;
  isEmailVerified: boolean;
}

const defaultConfig: EmailDesignConfig = {
  headerColor: '#F36B6B',
  phone1: '',
  phone2: '',
  email: '',
  extraText: '',
  logo: '',
  address: '',
  isEmailVerified: false
};

export default function EmailDesign() {
  const [config, setConfig] = useState<EmailDesignConfig>(() => {
    const saved = localStorage.getItem('email_design_config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });
  const [testEmail, setTestEmail] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const setGlobalLogo = useLogoStore(state => state.setLogo);

  const handleChange = (field: keyof EmailDesignConfig, value: string) => {
    if (field === 'email') {
      setConfig(prev => ({ ...prev, [field]: value, isEmailVerified: false }));
    } else {
      setConfig(prev => ({ ...prev, [field]: value }));
    }
    setHasChanges(true);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor seleccione un archivo de imagen');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('El archivo debe ser menor a 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange('logo', base64String);
        setGlobalLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!config.isEmailVerified) {
      alert('Por favor verifique el correo electrónico antes de guardar');
      return;
    }
    localStorage.setItem('email_design_config', JSON.stringify(config));
    setHasChanges(false);
    alert('Configuración guardada exitosamente');
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      alert('Por favor ingrese un correo electrónico');
      return;
    }

    if (!config.isEmailVerified) {
      alert('Por favor verifique el correo electrónico antes de enviar pruebas');
      return;
    }

    try {
      alert('Correo de prueba enviado exitosamente');
    } catch (error) {
      alert('Error al enviar el correo de prueba');
    }
  };

  const handleResetColor = () => {
    handleChange('headerColor', defaultConfig.headerColor);
  };

  const handleVerifyEmail = async () => {
    if (!config.email) {
      alert('Por favor ingrese un correo electrónico');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(config.email)) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }

    setVerificationInProgress(true);
    try {
      // Simulamos una verificación exitosa después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConfig(prev => ({ ...prev, isEmailVerified: true }));
      alert('Correo electrónico verificado exitosamente');
    } catch (error) {
      alert('Error al verificar el correo electrónico');
    } finally {
      setVerificationInProgress(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Configuración de correos - Diseño correo
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Configura el diseño y contenido de los correos que recibirán tus clientes con los detalles de su cita.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Form */}
        <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Correo
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={config.headerColor}
                onChange={(e) => handleChange('headerColor', e.target.value)}
                className="h-10 w-20 p-1 rounded border border-gray-300"
              />
              <button
                onClick={handleResetColor}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <RotateCcw className="h-4 w-4 mr-2 inline-block" />
                Color Por Defecto
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico del centro
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={config.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Aquí puedes escribir el email de tu centro"
                className={`flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                  config.isEmailVerified ? 'border-green-500' : ''
                }`}
              />
              <button
                onClick={handleVerifyEmail}
                disabled={verificationInProgress || !config.email}
                className={`px-4 py-2 rounded-md ${
                  config.isEmailVerified
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                {config.isEmailVerified ? 'Verificado' : 'Verificar'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono principal
            </label>
            <input
              type="tel"
              value={config.phone1}
              onChange={(e) => handleChange('phone1', e.target.value)}
              placeholder="Aquí puedes escribir el teléfono principal de tu centro"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono secundario (opcional)
            </label>
            <input
              type="tel"
              value={config.phone2}
              onChange={(e) => handleChange('phone2', e.target.value)}
              placeholder="Aquí puedes escribir el teléfono secundario de tu centro"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texto extra
            </label>
            <textarea
              value={config.extraText}
              onChange={(e) => handleChange('extraText', e.target.value)}
              placeholder="Aquí puedes escribir un texto extra que se agregará al final del correo"
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Aquí puedes subir el logo de tu empresa (Ancho máximo = 350 px)
            </p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Modificar logo</span>
                <input
                  type="file"
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {config.logo && (
                <img
                  src={config.logo}
                  alt="Logo preview"
                  className="h-10 object-contain"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección del centro
            </label>
            <input
              type="text"
              value={config.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Aquí puedes escribir la dirección de tu centro"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="pt-4 space-y-4">
            {hasChanges && (
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Guardar
              </button>
            )}

            <div>
              <p className="text-sm text-gray-700 mb-2">
                Envía un correo de prueba para visualizar los cambios
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Ingrese correo de prueba"
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
                <button
                  onClick={handleSendTestEmail}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mail de Prueba
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <EmailPreview
          headerColor={config.headerColor}
          logo={config.logo || null}
          phone1={config.phone1}
          phone2={config.phone2}
          email={config.email}
          address={config.address}
          extraText={config.extraText}
        />
      </div>
    </div>
  );
}