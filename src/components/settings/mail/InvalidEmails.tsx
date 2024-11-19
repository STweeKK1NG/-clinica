import React, { useState } from 'react';
import { Trash2, RefreshCw, Download } from 'lucide-react';

interface InvalidEmail {
  id: string;
  email: string;
  reason: string;
  lastAttempt: string;
  attempts: number;
}

export default function InvalidEmails() {
  const [invalidEmails, setInvalidEmails] = useState<InvalidEmail[]>([
    {
      id: '1',
      email: 'ejemplo@dominio.com',
      reason: 'Buzón lleno',
      lastAttempt: '2024-03-15',
      attempts: 3
    }
  ]);

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      setInvalidEmails(prev => prev.filter(email => email.id !== id));
    }
  };

  const handleRefresh = () => {
    // Implementar lógica de recarga
    console.log('Refreshing invalid emails list');
  };

  const handleDownload = () => {
    // Implementar lógica de descarga
    console.log('Downloading invalid emails list');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Descargar listado
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Correo electrónico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Motivo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Último intento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Intentos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invalidEmails.map((email) => (
              <tr key={email.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {email.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {email.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {email.lastAttempt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {email.attempts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(email.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {invalidEmails.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No hay correos inválidos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}