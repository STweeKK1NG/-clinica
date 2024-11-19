import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { useLogoStore } from '../../../store/logoStore';
import CountrySelector from './selectors/CountrySelector';
import RegionSelector from './selectors/RegionSelector';
import CommuneSelector from './selectors/CommuneSelector';
import TimezoneSelector from './selectors/TimezoneSelector';

interface BasicData {
  name: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  address: string;
  category: string;
  country: string;
  region: string;
  commune: string;
  timezone: string;
  timezoneRegion: string;
  establishment: string;
  logo: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
  };
}

const defaultData: BasicData = {
  name: 'Clínica A+ Salud',
  phone1: '',
  phone2: '',
  email: '',
  website: '',
  address: '',
  category: '',
  country: 'CL',
  region: '',
  commune: '',
  timezone: 'America/Santiago',
  timezoneRegion: 'UTC-4',
  establishment: '',
  logo: '',
  socialMedia: {
    facebook: '',
    instagram: '',
    tiktok: '',
    linkedin: ''
  }
};

const categories = [
  { value: 'health', label: 'Salud' },
  { value: 'dental', label: 'Dental' },
  { value: 'aesthetic', label: 'Estética' },
  { value: 'medical', label: 'Médico' }
];

export default function BasicDataSettings() {
  const [formData, setFormData] = useState<BasicData>(() => {
    const saved = localStorage.getItem('clinic_basic_data');
    return saved ? JSON.parse(saved) : defaultData;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BasicData, string>>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const setGlobalLogo = useLogoStore(state => state.setLogo);

  const handleChange = (
    field: keyof BasicData | keyof BasicData['socialMedia'],
    value: string,
    isSocialMedia = false
  ) => {
    setHasChanges(true);
    setErrors(prev => ({ ...prev, [field]: '' }));

    if (isSocialMedia) {
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Por favor seleccione un archivo de imagen' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'El archivo debe ser menor a 5MB' }));
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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BasicData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'La URL debe comenzar con http:// o https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    localStorage.setItem('clinic_basic_data', JSON.stringify(formData));
    setGlobalLogo(formData.logo || null);
    setHasChanges(false);
    alert('Datos guardados exitosamente');
  };

  // Cargar logo inicial
  useEffect(() => {
    setGlobalLogo(formData.logo || null);
  }, []);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Datos del Centro */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Datos del Centro</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del centro <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo del centro
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    <span>Subir logo</span>
                    <input
                      type="file"
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  {formData.logo && (
                    <img
                      src={formData.logo}
                      alt="Logo"
                      className="h-10 w-10 object-contain"
                    />
                  )}
                </div>
                {errors.logo && (
                  <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono de contacto 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone1}
                  onChange={(e) => handleChange('phone1', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono de contacto 2
                </label>
                <input
                  type="tel"
                  value={formData.phone2}
                  onChange={(e) => handleChange('phone2', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo de contacto <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sitio web
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
                    errors.website ? 'border-red-500' : ''
                  }`}
                  placeholder="https://"
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CountrySelector
                  value={formData.country}
                  onChange={(value) => handleChange('country', value)}
                />
                <RegionSelector
                  country={formData.country}
                  value={formData.region}
                  onChange={(value) => handleChange('region', value)}
                />
                <CommuneSelector
                  region={formData.region}
                  value={formData.commune}
                  onChange={(value) => handleChange('commune', value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TimezoneSelector
                  value={formData.timezone}
                  onChange={(value) => handleChange('timezone', value)}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Región Horaria
                  </label>
                  <input
                    type="text"
                    value={formData.timezoneRegion}
                    className="w-full border-gray-300 rounded-md shadow-sm bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Establecimiento
                </label>
                <input
                  type="text"
                  value={formData.establishment}
                  onChange={(e) => handleChange('establishment', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Redes Sociales</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.facebook}
                  onChange={(e) => handleChange('facebook', e.target.value, true)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="https://facebook.com/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.instagram}
                  onChange={(e) => handleChange('instagram', e.target.value, true)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="https://instagram.com/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TikTok
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.tiktok}
                  onChange={(e) => handleChange('tiktok', e.target.value, true)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="https://tiktok.com/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value, true)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="https://linkedin.com/"
                />
              </div>
            </div>
          </div>
        </div>

        {hasChanges && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar cambios
            </button>
          </div>
        )}
      </form>
    </div>
  );
}