import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Info } from 'lucide-react';

interface Room {
  id: number;
  name: string;
}

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('rooms');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Box 1' },
      { id: 2, name: 'Box 2' },
      { id: 3, name: 'Box 3' }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) return;

    const newRoom = {
      id: Math.max(0, ...rooms.map(r => r.id)) + 1,
      name: newRoomName.trim()
    };

    setRooms([...rooms, newRoom]);
    setNewRoomName('');
    setShowModal(false);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setNewRoomName(room.name);
    setShowModal(true);
  };

  const handleUpdateRoom = () => {
    if (!editingRoom || !newRoomName.trim()) return;

    setRooms(rooms.map(room => 
      room.id === editingRoom.id ? { ...room, name: newRoomName.trim() } : room
    ));
    setNewRoomName('');
    setEditingRoom(null);
    setShowModal(false);
  };

  const handleDeleteRoom = (id: number) => {
    if (confirm('¿Está seguro de eliminar esta sala/box?')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Crea salas o box si tus pacientes agendarán sus horas en salas y no directamente en las agendas de los profesionales.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingRoom(null);
            setNewRoomName('');
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear Sala/Box
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre box/sala
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {room.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {room.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditRoom(room)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingRoom ? 'Editar Sala/Box' : 'Crear Sala/Box'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ingrese el nombre de la sala/box"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewRoomName('');
                    setEditingRoom(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={editingRoom ? handleUpdateRoom : handleCreateRoom}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  {editingRoom ? 'Guardar cambios' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}