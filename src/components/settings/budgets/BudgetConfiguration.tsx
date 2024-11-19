import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

interface BudgetConfig {
  companyName: string;
  initialPhrase: string;
  phone1: string;
  phone2: string;
  mobile1: string;
  mobile2: string;
  email: string;
  address: string;
  barColor: string;
  showExpirationDate: boolean;
  showNumber: boolean;
  showFileNumber: boolean;
  showComments: boolean;
  showItemDiscount: boolean;
  showTreatmentCategory: boolean;
  showTreatmentCodes: boolean;
  showPatientAgreements: boolean;
  showPatientInsurance: boolean;
  defaultObservations: string;
  defaultPaymentMethods: string;
  defaultIncludes: string;
  logo?: string;
}

const defaultConfig: BudgetConfig = {
  companyName: '',
  initialPhrase: '',
  phone1: '',
  phone2: '',
  mobile1: '',
  mobile2: '',
  email: '',
  address: '',
  barColor: '#e08081',
  showExpirationDate: true,
  showNumber: false,
  showFileNumber: false,
  showComments: false,
  showItemDiscount: true,
  showTreatmentCategory: true,
  showTreatmentCodes: false,
  showPatientAgreements: true,
  showPatientInsurance: true,
  defaultObservations: '',
  defaultPaymentMethods: '',
  defaultIncludes: '',
};

export default function BudgetConfiguration() {
  const [config, setConfig] = useState<BudgetConfig>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('budget_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleChange = (field: keyof BudgetConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor seleccione una imagen PNG o JPG');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo debe ser menor a 5MB');
      return;
    }

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange('logo', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!config.companyName.trim()) {
      alert('Por favor ingrese el nombre de la empresa');
      return;
    }

    if (!config.email.trim()) {
      alert('Por favor ingrese el correo electrónico');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(config.email)) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }

    // Save configuration
    localStorage.setItem('budget_config', JSON.stringify(config));
    setHasChanges(false);
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Información General
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={config.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frase Inicial
              </label>
              <input
                type="text"
                value={config.initialPhrase}
                onChange={(e) => handleChange('initialPhrase', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono 1
              </label>
              <input
                type="tel"
                value={config.phone1}
                onChange={(e) => handleChange('phone1', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono 2
              </label>
              <input
                type="tel"
                value={config.phone2}
                onChange={(e) => handleChange('phone2', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Celular 1
              </label>
              <input
                type="tel"
                value={config.mobile1}
                onChange={(e) => handleChange('mobile1', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Celular 2
              </label>
              <input
                type="tel"
                value={config.mobile2}
                onChange={(e) => handleChange('mobile2', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color barra hexadecimal
              </label>
              <input
                type="color"
                value={config.barColor}
                onChange={(e) => handleChange('barColor', e.target.value)}
                className="w-full h-10 p-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Opciones de visualización</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showExpirationDate}
                  onChange={(e) => handleChange('showExpirationDate', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar fecha de vencimiento</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showNumber}
                  onChange={(e) => handleChange('showNumber', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar número</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showFileNumber}
                  onChange={(e) => handleChange('showFileNumber', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar número de ficha</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showComments}
                  onChange={(e) => handleChange('showComments', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar comentarios</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showItemDiscount}
                  onChange={(e) => handleChange('showItemDiscount', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar descuento por ítem</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showTreatmentCategory}
                  onChange={(e) => handleChange('showTreatmentCategory', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar categoría de los tratamientos</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showTreatmentCodes}
                  onChange={(e) => handleChange('showTreatmentCodes', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar códigos de los tratamientos</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showPatientAgreements}
                  onChange={(e) => handleChange('showPatientAgreements', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar convenios del paciente</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showPatientInsurance}
                  onChange={(e) => handleChange('showPatientInsurance', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mostrar previsión del paciente</span>
              </label>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observaciones (por defecto)
              </label>
              <textarea
                value={config.defaultObservations}
                onChange={(e) => handleChange('defaultObservations', e.target.value)}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Formas de pago (por defecto)
              </label>
              <textarea
                value={config.defaultPaymentMethods}
                onChange={(e) => handleChange('defaultPaymentMethods', e.target.value)}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Incluye (por defecto)
              </label>
              <textarea
                value={config.defaultIncludes}
                onChange={(e) => handleChange('defaultIncludes', e.target.value)}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Logo de la Empresa
          </h3>

          <div className="space-y-4">
            {config.logo && (
              <div className="flex justify-center">
                <img
                  src={config.logo}
                  alt="Logo de la empresa"
                  className="max-h-40 object-contain"
                />
              </div>
            )}

            <div className="flex justify-center">
              <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                <span>{config.logo ? 'Modificar logo' : 'Subir logo'}</span>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {hasChanges && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Guardar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}