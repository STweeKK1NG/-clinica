import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EditCategoryModal from './EditCategoryModal';

interface Category {
  id: string;
  name: string;
  description: string;
  sector: string;
}

const sectorNames: { [key: string]: string } = {
  'dental': 'Dental',
  'medical': 'Médico',
  'aesthetic': 'Estético',
  'psychology': 'Psicología/Psiquiatría',
  'other': 'Otro'
};

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('service_categories');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleCreate = () => {
    window.location.hash = '#settings/servicios/categories/create';
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      const updatedCategories = categories.filter(cat => cat.id !== id);
      setCategories(updatedCategories);
      localStorage.setItem('service_categories', JSON.stringify(updatedCategories));
    }
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    const updatedCategories = categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    setCategories(updatedCategories);
    localStorage.setItem('service_categories', JSON.stringify(updatedCategories));
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear Categoría
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rubro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sectorNames[category.sector] || category.sector}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(category)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onSave={handleUpdateCategory}
          onCancel={() => setEditingCategory(null)}
        />
      )}
    </div>
  );
}