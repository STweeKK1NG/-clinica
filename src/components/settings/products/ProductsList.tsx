import React, { useState, useEffect } from 'react';
import { Download, Mail, Plus, Search } from 'lucide-react';
import EditProductModal from './EditProductModal';

interface Product {
  id: string;
  name: string;
  brand: string;
  content: string;
  description: string;
  value: number;
  cost: number;
  commission: number;
  stock: number;
  criticalStock: number;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSearch = () => {
    // Implementar lógica de búsqueda
    console.log('Searching:', searchTerm);
  };

  const handleDownload = () => {
    // Implementar lógica de descarga
    console.log('Downloading products list');
  };

  const handleCriticalStock = () => {
    // Implementar lógica de correo de stock crítico
    console.log('Sending critical stock email');
  };

  const handleCreate = () => {
    window.location.hash = '#settings/productos/create';
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    const updatedProducts = products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const handleDelete = (productId: string) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Búsqueda por nombre o marca"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center whitespace-nowrap"
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
            onClick={handleCriticalStock}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
          >
            <Mail className="h-4 w-4 mr-2" />
            Correo stock crítico
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
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
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contenido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.value.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleSaveEdit}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}