import React, { useState, useEffect } from 'react';
import ServicesList from './ServicesList';
import CategoriesList from './CategoriesList';
import CreateCategory from './CreateCategory';
import CreateService from './CreateService';

export default function ServicesSettings() {
  const [activeTab, setActiveTab] = useState('services');
  const [view, setView] = useState('list');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#settings/servicios/categories/create') {
        setActiveTab('categories');
        setView('create-category');
      } else if (hash === '#settings/servicios/create') {
        setActiveTab('services');
        setView('create-service');
      } else {
        setView('list');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (activeTab === 'categories') {
      return view === 'create-category' ? <CreateCategory /> : <CategoriesList />;
    }
    return view === 'create-service' ? <CreateService /> : <ServicesList />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
        <button
          onClick={() => {
            setActiveTab('services');
            setView('list');
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'services'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Servicios
        </button>
        <button
          onClick={() => {
            setActiveTab('categories');
            setView('list');
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'categories'
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Categorías
        </button>
      </div>

      {renderContent()}
    </div>
  );
}