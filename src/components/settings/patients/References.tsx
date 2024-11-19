import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Reference {
  id: string;
  name: string;
  code: string;
}

export default function References() {
  const [references, setReferences] = useState<Reference[]>(() => {
    const saved = localStorage.getItem('patient_references');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [editingReference, setEditingReference] = useState<Reference | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Save references to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('patient_references', JSON.stringify(references));
  }, [references]);

  const showSuccessMessage = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return false;
    }

    if (!formData.code.trim()) {
      setError('El código es requerido');
      return false;
    }

    if (formData.code.length > 3) {
      setError('El código no puede tener más de 3 caracteres');
      return false;
    }

    const codeExists = references.some(ref => 
      ref.code.toLowerCase() === formData.code.toLowerCase() &&
      (!editingReference || ref.id !== editingReference.id)
    );

    if (codeExists) {
      setError('Este código ya está en uso');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (editingReference) {
      setReferences(prev => prev.map(ref => 
        ref.id === editingReference.id 
          ? { ...ref, name: formData.name.trim(), code: formData.code.trim().toUpperCase() } 
          : ref
      ));
      showSuccessMessage('Referencia editada correctamente');
    } else {
      setReferences(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          name: formData.name.trim(), 
          code: formData.code.trim().toUpperCase() 
        }
      ]);
      showSuccessMessage('Referencia agregada correctamente');
    }

    setShowModal(false);
    setFormData({ name: '', code: '' });
    setEditingReference(null);
    setError('');
  };

  const handleEdit = (reference: Reference) => {
    setEditingReference(reference);
    setFormData({
      name: reference.name,
      code: reference.code
    });
    setShowModal(true);
    setError('');
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta referencia?')) {
      setReferences(prev => prev.filter(ref => ref.id !== id));
      showSuccessMessage('Referencia eliminada correctamente');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowModal(true);
            setEditingReference(null);
            setFormData({ name: '', code: '' });
            setError('');
          }}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar referencia
        </button>
      </div>

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
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {references.map((reference, index) => (
              <tr key={reference.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reference.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reference.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(reference)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(reference.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {references.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay referencias registradas
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
              {editingReference ? 'Editar referencia' : 'Agregar referencia'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setError('');
                  }}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese el nombre de la referencia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código (máx. 3 caracteres)
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => {
                    setFormData({ ...formData, code: e.target.value.toUpperCase() });
                    setError('');
                  }}
                  maxLength={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Ingrese el código"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', code: '' });
                    setEditingReference(null);
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
                  {editingReference ? 'Guardar cambios' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}