import React, { useState } from 'react';
import { Search, Plus, Eye, XCircle, UserX } from 'lucide-react';
import UserPermissionsDetail from './UserPermissionsDetail';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  profile: string;
  active: boolean;
}

export default function UsersList() {
  const [users] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (showInactive ? !user.active : user.active)
  );

  const handleCreateUser = () => {
    window.location.hash = '#settings/usuarios/create';
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleToggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, active: !user.active } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.location.reload();
  };

  if (selectedUserId) {
    return (
      <UserPermissionsDetail
        userId={selectedUserId}
        onBack={() => setSelectedUserId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={handleCreateUser}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 ml-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear usuario
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Perfil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.profile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewUser(user.id)}
                      className="flex items-center px-3 py-1 text-secondary bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </button>
                    <button
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                        user.active
                          ? 'text-red-600 bg-red-50 hover:bg-red-100'
                          : 'text-green-600 bg-green-50 hover:bg-green-100'
                      }`}
                    >
                      {user.active ? (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-1" />
                          Activar
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowInactive(!showInactive)}
          className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <UserX className="h-4 w-4 mr-2" />
          {showInactive ? 'Ver usuarios activos' : 'Ver usuarios no activos'}
        </button>
      </div>
    </div>
  );
}