import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface FilePermission {
  fileId: string;
  visibility: 'all' | 'own' | 'none';
}

interface FileType {
  id: string;
  name: string;
}

const visibilityOptions = [
  { value: 'all', label: 'Ver todas las fichas' },
  { value: 'own', label: 'Ver solo fichas propias' },
  { value: 'none', label: 'No ver ninguna ficha' }
];

export default function FilePermissions() {
  const [fileTypes] = useState<FileType[]>(() => {
    const saved = localStorage.getItem('file_types');
    return saved ? JSON.parse(saved) : [
      { id: 'clinical', name: 'Ficha Clínica' },
      { id: 'dental', name: 'Ficha Dental' }
    ];
  });

  const [permissions, setPermissions] = useState<FilePermission[]>(() => {
    const saved = localStorage.getItem('file_permissions');
    return saved ? JSON.parse(saved) : [];
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Inicializar permisos para cualquier tipo de ficha que no tenga configuración
    const missingPermissions = fileTypes.filter(
      fileType => !permissions.some(p => p.fileId === fileType.id)
    );

    if (missingPermissions.length > 0) {
      const newPermissions = missingPermissions.map(fileType => ({
        fileId: fileType.id,
        visibility: 'none' as const
      }));

      setPermissions(prev => [...prev, ...newPermissions]);
    }
  }, [fileTypes]);

  const handleVisibilityChange = (fileId: string, visibility: 'all' | 'own' | 'none') => {
    setPermissions(prev => prev.map(p => 
      p.fileId === fileId ? { ...p, visibility } : p
    ));
    setError('');
  };

  const getVisibility = (fileId: string): string => {
    return permissions.find(p => p.fileId === fileId)?.visibility || 'none';
  };

  const handleSave = () => {
    // Validar que todos los tipos de ficha tengan una configuración
    const hasAllConfigurations = fileTypes.every(fileType => 
      permissions.some(p => p.fileId === fileType.id)
    );

    if (!hasAllConfigurations) {
      setError('Por favor, selecciona una opción para todas las fichas antes de guardar');
      return;
    }

    localStorage.setItem('file_permissions', JSON.stringify(permissions));
    setSuccess('Configuraciones de permisos guardadas correctamente');
    setError('');

    // Limpiar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Permisos generales de fichas
        </h3>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de ficha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cambiar visibilidad
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fileTypes.map((fileType) => (
              <tr key={fileType.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {fileType.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={getVisibility(fileType.id)}
                    onChange={(e) => handleVisibilityChange(
                      fileType.id,
                      e.target.value as 'all' | 'own' | 'none'
                    )}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    {visibilityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}