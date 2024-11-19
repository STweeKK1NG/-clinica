import React, { useState } from 'react';
import { Download, Plus, RefreshCw, Search, Pencil, Trash2 } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  value: number;
  cost: number;
  startDate: string;
  endDate: string;
  isExpired: boolean;
}

export default function PlansList() {
  const [activeTab, setActiveTab] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [plans] = useState<Plan[]>(() => {
    const saved = localStorage.getItem('plans');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'Retiro de brackets',
        value: 100000,
        cost: 0,
        startDate: '2023-11-15',
        endDate: '2024-01-01',
        isExpired: false
      }
    ];
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(plans.length / itemsPerPage);

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'current' ? !plan.isExpired : plan.isExpired;
    return matchesSearch && matchesTab;
  });

  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    // Implementar lógica de recarga
    console.log('Refreshing plans list');
  };

  const handleDownload = () => {
    // Implementar lógica de descarga
    console.log('Downloading plans list');
  };

  const handleCreate = () => {
    window.location.hash = '#settings/planes/create';
  };

  const handleEdit = (planId: string) => {
    window.location.hash = `#settings/planes/edit/${planId}`;
  };

  const handleDelete = (planId: string) => {
    if (confirm('¿Está seguro de eliminar este plan?')) {
      const updatedPlans = plans.filter(plan => plan.id !== planId);
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      window.location.reload();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatNumber = (value: number) => {
    return value?.toLocaleString('es-CL') || '0';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'current'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Planes vigentes
        </button>
        <button
          onClick={() => setActiveTab('expired')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'expired'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Planes vencidos
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'categories'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Categorías
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </button>
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar listado
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Plan
          </button>
        </div>
      </div>

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
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Válido entre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPlans.map((plan, index) => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {plan.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${formatNumber(plan.value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${formatNumber(plan.cost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(plan.startDate)} / {formatDate(plan.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(plan.id)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
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

      <div className="flex justify-end items-center gap-4 text-sm">
        <span>
          Página {currentPage} de {totalPages}. Ir a página:
        </span>
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}