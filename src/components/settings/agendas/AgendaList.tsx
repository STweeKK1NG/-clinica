import React, { useState, useEffect } from 'react';
import { Clock, Edit, Calendar, Trash2, Plus } from 'lucide-react';

interface Box {
  id: number;
  name: string;
  category: string;
}

export default function AgendaList() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAgenda, setNewAgenda] = useState({ name: '', category: '' });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedBoxes = localStorage.getItem('agendaBoxes');
    if (savedBoxes) {
      setBoxes(JSON.parse(savedBoxes));
    } else {
      const defaultBoxes = [
        { id: 1, name: 'Box 1', category: '' },
        { id: 2, name: 'Box 2', category: '' },
        { id: 3, name: 'Box 3', category: '' },
      ];
      setBoxes(defaultBoxes);
      localStorage.setItem('agendaBoxes', JSON.stringify(defaultBoxes));
    }
  }, []);

  const handleScheduleClick = (boxId: number) => {
    window.location.hash = `#settings/agendas/${boxId}/schedule`;
  };

  const handleEditClick = (boxId: number) => {
    window.location.hash = `#settings/agendas/${boxId}/edit`;
  };

  const handleDeleteAgenda = (boxId: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta agenda?')) {
      const updatedBoxes = boxes.filter(box => box.id !== boxId);
      setBoxes(updatedBoxes);
      setHasChanges(true);
    }
  };

  const handleCreateAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...boxes.map(box => box.id), 0) + 1;
    const updatedBoxes = [...boxes, { id: newId, name: newAgenda.name, category: newAgenda.category }];
    setBoxes(updatedBoxes);
    setNewAgenda({ name: '', category: '' });
    setShowCreateModal(false);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('agendaBoxes', JSON.stringify(boxes));
    setHasChanges(false);
    alert('Cambios guardados exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          Asignar servicios
        </button>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear agenda
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          Crear categoría servicios
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nombre agenda
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {boxes.map((box) => (
              <tr key={box.id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-900">{box.id}</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={box.name}
                    className="w-full border rounded-md px-2 py-1"
                    readOnly
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={box.category}
                    className="w-full border rounded-md px-2 py-1"
                    readOnly
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleScheduleClick(box.id)}
                      className="flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-md hover:bg-secondary/20"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Modificar horario
                    </button>
                    <button 
                      onClick={() => handleEditClick(box.id)}
                      className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modificar nombre
                    </button>
                    <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                      <Calendar className="h-4 w-4 mr-1" />
                      Bloqueos de horario
                    </button>
                    <button 
                      onClick={() => handleDeleteAgenda(box.id)}
                      className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasChanges && (
        <button 
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 fixed bottom-4 right-4"
        >
          Guardar cambios
        </button>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Crear Nueva Agenda</h2>
            <form onSubmit={handleCreateAgenda}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la agenda
                  </label>
                  <input
                    type="text"
                    value={newAgenda.name}
                    onChange={(e) => setNewAgenda({ ...newAgenda, name: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={newAgenda.category}
                    onChange={(e) => setNewAgenda({ ...newAgenda, category: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}