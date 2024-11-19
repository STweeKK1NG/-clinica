import React, { useState, useEffect } from 'react';
import { Download, Plus, Search } from 'lucide-react';
import EditServiceModal from './EditServiceModal';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  isFree: boolean;
  cost: number;
  saleCommission: number;
  serviceCommission: number;
  instructions: string;
  loyaltyPoints: number;
  autoDiscountSupplies: boolean;
  society: string;
  dteType: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('service_categories');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState({
    category: '',
    name: ''
  });

  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleSearch = () => {
    // Implementar lógica de búsqueda
    console.log('Searching with filters:', filters);
  };

  const handleDownload = () => {
    // Implementar lógica de descarga
    console.log('Downloading services list');
  };

  const handleQuickCreate = () => {
    // Implementar lógica de creación rápida
    console.log('Opening quick create modal');
  };

  const handleCreate = () => {
    window.location.hash = '#settings/servicios/create';
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleSaveEdit = (updatedService: Service) => {
    const updatedServices = services.map(service => 
      service.id === updatedService.id ? updatedService : service
    );
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
    setEditingService(null);
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('¿Está seguro de eliminar este servicio?')) {
      const updatedServices = services.filter(service => service.id !== serviceId);
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
    }
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = !filters.category || service.category === filters.category;
    const matchesName = !filters.name || 
      service.name.toLowerCase().includes(filters.name.toLowerCase());
    return matchesCategory && matchesName;
  });

  const formatNumber = (value: number | undefined) => {
    if (typeof value !== 'number') return '0';
    return value.toLocaleString('es-CL');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="">Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nombre tratamiento"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar listado
          </button>

          <button
            onClick={handleQuickCreate}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Creación rápida
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Servicio
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duración
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {categories.find(c => c.id === service.category)?.name || service.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${formatNumber(service.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.duration || 0} min
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(service)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingService && (
        <EditServiceModal
          service={editingService}
          categories={categories}
          onSave={handleSaveEdit}
          onCancel={() => setEditingService(null)}
        />
      )}
    </div>
  );
}