import React, { useState } from 'react';
import { Plus, Eye, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import FileTags from './FileTags';
import ImageTags from './ImageTags';
import FilePermissions from './FilePermissions';

interface FileType {
  id: string;
  name: string;
  isDefault?: boolean;
}

export default function FileTypes() {
  const [activeTab, setActiveTab] = useState('types');
  const [fileTypes, setFileTypes] = useState<FileType[]>(() => {
    const saved = localStorage.getItem('file_types');
    return saved ? JSON.parse(saved) : [
      { id: 'clinical', name: 'Ficha Clínica', isDefault: true },
      { id: 'dental', name: 'Ficha Dental', isDefault: true }
    ];
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleCreateFile = () => {
    window.location.hash = '#settings/fichas/create';
  };

  const handleViewFile = (id: string) => {
    // Implementar lógica de visualización
    console.log('Viewing file type:', id);
  };

  const handleEditFile = (id: string) => {
    // Implementar lógica de edición
    console.log('Editing file type:', id);
  };

  const handleDelete = (id: string) => {
    const updatedTypes = fileTypes.filter(type => type.id !== id);
    setFileTypes(updatedTypes);
    localStorage.setItem('file_types', JSON.stringify(updatedTypes));
    setShowDeleteConfirm(null);
  };

  const tabs = [
    { id: 'types', label: 'Tipos de ficha' },
    { id: 'file-tags', label: 'Tags archivos' },
    { id: 'image-tags', label: 'Tags imágenes' },
    { id: 'fields', label: 'Campos fichas' },
    { id: 'general', label: 'Configuraciones generales' },
    { id: 'permissions', label: 'Permisos fichas' },
    { id: 'recipes', label: 'Recetas Predefinidas' },
    { id: 'consents', label: 'Consentimientos' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'file-tags':
        return <FileTags />;
      case 'image-tags':
        return <ImageTags />;
      case 'permissions':
        return <FilePermissions />;
      case 'types':
        return (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Aquí se listan las fichas personalizadas agregadas a su centro
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCreateFile}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Ficha Personalizada
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
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fileTypes.map((type) => (
                    <tr key={type.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {type.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewFile(type.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditFile(type.id)}
                            className="text-secondary hover:text-secondary/80"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          {!type.isDefault && (
                            <button
                              onClick={() => setShowDeleteConfirm(type.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-600">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              ¿Está seguro que desea eliminar esta ficha? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}