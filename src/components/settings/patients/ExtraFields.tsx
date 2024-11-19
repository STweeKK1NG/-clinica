import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface ExtraField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string[];
  required: boolean;
}

const fieldTypes = [
  { value: 'text', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Fecha' },
  { value: 'select', label: 'Selección' }
];

export default function ExtraFields() {
  const [fields, setFields] = useState<ExtraField[]>(() => {
    const saved = localStorage.getItem('patient_extra_fields');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState<ExtraField | null>(null);
  const [formData, setFormData] = useState<Omit<ExtraField, 'id'>>({
    name: '',
    type: 'text',
    required: false,
    options: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('patient_extra_fields', JSON.stringify(fields));
  }, [fields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (formData.type === 'select' && (!formData.options || formData.options.length === 0)) {
      setError('Debe agregar al menos una opción');
      return;
    }

    if (editingField) {
      setFields(prev => prev.map(field => 
        field.id === editingField.id ? { ...field, ...formData } : field
      ));
    } else {
      setFields(prev => [...prev, { id: Date.now().toString(), ...formData }]);
    }

    setShowModal(false);
    setFormData({ name: '', type: 'text', required: false, options: [] });
    setEditingField(null);
    setError('');
  };

  const handleEdit = (field: ExtraField) => {
    setEditingField(field);
    setFormData({
      name: field.name,
      type: field.type,
      required: field.required,
      options: field.options || []
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este campo?')) {
      setFields(prev => prev.filter(field => field.id !== id));
    }
  };

  const handleAddOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt) || []
    }));
  };

  const handleRemoveOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar campo
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
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requerido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fields.map((field) => (
              <tr key={field.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {field.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {fieldTypes.find(t => t.value === field.type)?.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {field.required ? 'Sí' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(field)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(field.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {fields.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay campos extra registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingField ? 'Editar campo' : 'Agregar campo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese el nombre del campo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ExtraField['type'] })}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  {fieldTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="required"
                  checked={formData.required}
                  onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
                  Campo requerido
                </label>
              </div>

              {formData.type === 'select' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Opciones
                  </label>
                  {formData.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        placeholder={`Opción ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    + Agregar opción
                  </button>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', type: 'text', required: false, options: [] });
                    setEditingField(null);
                    setError('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  {editingField ? 'Guardar cambios' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}