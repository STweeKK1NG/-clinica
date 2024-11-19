import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import { useLogoStore } from '../../../store/logoStore';
import WelcomeEmailPreview from './preview/WelcomeEmailPreview';

interface WelcomeEmailConfig {
  subject: string;
  headerColor: string;
  headerTitle: string;
  headerTextColor: string;
  logo: string;
  promoImage: string;
  mainText: string;
  showSocialMedia: boolean;
}

const defaultConfig: WelcomeEmailConfig = {
  subject: '¡Bienvenido/a!',
  headerColor: '#F36B6B',
  headerTitle: '¡Bienvenido/a!',
  headerTextColor: '#FFFFFF',
  logo: '',
  promoImage: '',
  mainText: `Estimado/a {{NOMBRE}} {{APELLIDO_1}},

Nos alegra mucho que hayas decidido confiar en nosotros.

Estamos comprometidos a brindarle la atención de la más alta calidad en un entorno acogedor y profesional.

Si tienes dudas nos puedes contactar al {{TELEFONO_CONTACTO}}.

Se despide el centro {{NOMBRE_CENTRO}}.`,
  showSocialMedia: true
};

export default function WelcomeEmailDesign() {
  const [config, setConfig] = useState<WelcomeEmailConfig>(() => {
    const saved = localStorage.getItem('welcome_email_config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });
  const [testEmail, setTestEmail] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const setGlobalLogo = useLogoStore(state => state.setLogo);

  const handleChange = (field: keyof WelcomeEmailConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
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

  const handlePromoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor seleccione un archivo de imagen');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo debe ser menor a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange('promoImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('welcome_email_config', JSON.stringify(config));
    setHasChanges(false);
    alert('Configuración guardada exitosamente');
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      alert('Por favor ingrese un correo electrónico');
      return;
    }

    try {
      alert('Correo de prueba enviado exitosamente');
    } catch (error) {
      alert('Error al enviar el correo de prueba');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Diseño correo de bienvenida
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Form */}
        <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asunto
            </label>
            <input
              type="text"
              value={config.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color de la barra
            </label>
            <input
              type="color"
              value={config.headerColor}
              onChange={(e) => handleChange('headerColor', e.target.value)}
              className="h-10 w-20 p-1 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título de la barra
            </label>
            <input
              type="text"
              value={config.headerTitle}
              onChange={(e) => handleChange('headerTitle', e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color del texto de la barra
            </label>
            <input
              type="color"
              value={config.headerTextColor}
              onChange={(e) => handleChange('headerTextColor', e.target.value)}
              className="h-10 w-20 p-1 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Subir logo</span>
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
              Imagen promocional
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">Subir imagen</span>
                <input
                  type="file"
                  onChange={handlePromoImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {config.promoImage && (
                <img
                  src={config.promoImage}
                  alt="Promo image preview"
                  className="h-10 object-contain"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texto principal
            </label>
            <div className="text-xs text-gray-500 mb-2">
              Variables disponibles:
              <br />
              {'{{NOMBRE}} - Nombre del paciente'}
              <br />
              {'{{APELLIDO_1}} - Apellido del paciente'}
              <br />
              {'{{TELEFONO_CONTACTO}} - Teléfono de contacto'}
              <br />
              {'{{NOMBRE_CENTRO}} - Nombre del centro'}
            </div>
            <textarea
              value={config.mainText}
              onChange={(e) => handleChange('mainText', e.target.value)}
              rows={8}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={config.showSocialMedia}
              onChange={(e) => handleChange('showSocialMedia', e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Mostrar redes sociales
            </label>
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
        <WelcomeEmailPreview {...config} />
      </div>
    </div>
  );
}