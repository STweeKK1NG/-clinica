import React, { useState } from 'react';

interface CategoryFormData {
  name: string;
  sector: string;
}

const sectorOptions = [
  { value: 'dental', label: 'Dental' },
  { value: 'medical', label: 'Médico' },
  { value: 'aesthetic', label: 'Estético' },
  { value: 'psychology', label: 'Psicología/Psiquiatría' },
  { value: 'other', label: 'Otro' }
];

export default function CreateCategory() {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    sector: ''
  });

  const handleBack = () => {
    window.location.hash = '#settings/servicios';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categories = JSON.parse(localStorage.getItem('service_categories') || '[]');
    const newCategory = {
      id: Date.now().toString(),
      name: formData.name,
      sector: formData.sector,
      description: '' // Campo adicional para mantener compatibilidad
    };
    
    categories.push(newCategory);
    localStorage.setItem('service_categories', JSON.stringify(categories));
    handleBack();
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={handleBack}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mt-4">Agregar Categoría</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-4 w-48">
                  <label className="block text-sm font-medium text-gray-700">
                    Categoría:
                  </label>
                </td>
                <td className="py-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Rubro:
                  </label>
                </td>
                <td className="py-4">
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Seleccionar rubro</option>
                    {sectorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}