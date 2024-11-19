import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  sector: string;
}

interface EditCategoryModalProps {
  category: Category;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

const sectorOptions = [
  { value: 'dental', label: 'Dental' },
  { value: 'medical', label: 'Médico' },
  { value: 'aesthetic', label: 'Estético' },
  { value: 'psychology', label: 'Psicología/Psiquiatría' },
  { value: 'other', label: 'Otro' }
];

export default function EditCategoryModal({ category, onSave, onCancel }: EditCategoryModalProps) {
  const [formData, setFormData] = useState<Category>({ ...category });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Editar Categoría</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rubro:
              </label>
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
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}