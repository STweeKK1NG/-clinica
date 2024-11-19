import React, { useState, useEffect } from 'react';
import { AlertTriangle, Trash2, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Professional {
  id: string;
  name: string;
  specialty: string;
}

interface Association {
  id: string;
  userId: string;
  professionalId: string;
  userName: string;
  professionalName: string;
}

export default function ProfessionalAssociation() {
  const [users, setUsers] = useState<User[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [associations, setAssociations] = useState<Association[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar usuarios
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    // Cargar profesionales
    const savedProfessionals = localStorage.getItem('professionals');
    if (savedProfessionals) {
      setProfessionals(JSON.parse(savedProfessionals));
    }

    // Cargar asociaciones
    const savedAssociations = localStorage.getItem('professional_associations');
    if (savedAssociations) {
      setAssociations(JSON.parse(savedAssociations));
    }
  }, []);

  const handleAssociate = () => {
    setError('');

    // Validar que no exista la asociación
    const existingAssociation = associations.find(
      a => a.userId === selectedUser && a.professionalId === selectedProfessional
    );

    if (existingAssociation) {
      setError('Esta asociación ya existe');
      return;
    }

    const user = users.find(u => u.id === selectedUser);
    const professional = professionals.find(p => p.id === selectedProfessional);

    if (!user || !professional) return;

    const newAssociation: Association = {
      id: Date.now().toString(),
      userId: selectedUser,
      professionalId: selectedProfessional,
      userName: user.name,
      professionalName: professional.name
    };

    const updatedAssociations = [...associations, newAssociation];
    setAssociations(updatedAssociations);
    localStorage.setItem('professional_associations', JSON.stringify(updatedAssociations));

    // Limpiar selección
    setSelectedUser('');
    setSelectedProfessional('');
  };

  const handleDelete = (associationId: string) => {
    if (confirm('¿Está seguro de eliminar esta asociación?')) {
      const updatedAssociations = associations.filter(a => a.id !== associationId);
      setAssociations(updatedAssociations);
      localStorage.setItem('professional_associations', JSON.stringify(updatedAssociations));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-2 border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">
            ¡ATENCIÓN! Utiliza esta función SOLAMENTE si deseas que los profesionales puedan ver únicamente sus citas y no las de otros profesionales.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Asociar usuario con profesional
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="">Seleccionar usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profesional
            </label>
            <select
              value={selectedProfessional}
              onChange={(e) => setSelectedProfessional(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="">Seleccionar profesional</option>
              {professionals.map((professional) => (
                <option key={professional.id} value={professional.id}>
                  {professional.name} - {professional.specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          onClick={handleAssociate}
          disabled={!selectedUser || !selectedProfessional}
          className={`flex items-center px-4 py-2 rounded-md text-white ${
            selectedUser && selectedProfessional
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Asociar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profesional
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {associations.map((association) => (
              <tr key={association.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {association.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {association.professionalName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDelete(association.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar asociación
                  </button>
                </td>
              </tr>
            ))}
            {associations.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay asociaciones registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}