import React, { useState, useEffect } from 'react';
import ProductsList from './ProductsList';
import CreateProduct from './CreateProduct';

export default function ProductsSettings() {
  const [view, setView] = useState('list');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#settings/productos/create') {
        setView('create');
      } else {
        setView('list');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
        <button
          className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-white"
        >
          Productos
        </button>
      </div>

      {view === 'create' ? <CreateProduct /> : <ProductsList />}
    </div>
  );
}