import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface TrackingState {
  id: string;
  name: string;
  code: string;
  description: string;
}

export default function TrackingStates() {
  const [states, setStates] = useState<TrackingState[]>(() => {
    const saved = localStorage.getItem('tracking_states');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [editingState, setEditingState] = useState<TrackingState | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: ''
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: ''
    });
    setEditingState(null);
    setError('');
  };

  const handleOpenModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (state: TrackingState) => {
    setEditingState(state);
    setFormData({
      name: state.name,
      code: state.code,
      description: state.description
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este estado de seguimiento?')) {
      const updatedStates = states.filter(state => state.id !== id);
      setStates(updatedStates);
      localStorage.setItem('tracking_states', JSON.stringify(updatedStates));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }

    if (!formData.code.trim()) {
      setError('El código es obligatorio');
      return false;
    }

    // Check for duplicate code
    const existingState = states.find(
      state => state.code === formData.code && state.id !== editingState?.id
    );
    if (existingState) {
      setError('Ya existe un estado con este código');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newState: TrackingState = {
      id: editingState?.id || Date.now().toString(),
      name: formData.name.trim(),
      code: formData.code.trim(),
      description: formData.description.trim()
    };

    if (editingState) {
      // Update existing state
      const updatedStates = states.map(state =>
        state.id === editingState.id ? newState : state
      );
      setStates(updatedStates);
      localStorage.setItem('tracking_states', JSON.stringify(updatedStates));
    } else {
      // Create new state
      const updatedStates = [...states, newState];
      setStates(updatedStates);
      localStorage.setItem('tracking_states', JSON.stringify(updatedStates));
    }

    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleOpenModal}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear estado de seguimiento
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
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {states.map((state) => (
              <tr key={state.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {state.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {state.code}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {state.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(state)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(state.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {states.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay estados de seguimiento registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {editingState ? 'Editar Estado' : 'Crear Estado de Seguimiento'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
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
                  Código <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  {editingState ? 'Guardar cambios' : 'Crear estado'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}