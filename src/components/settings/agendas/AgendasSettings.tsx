import React, { useState, useEffect } from 'react';
import AgendaList from './AgendaList';
import ScheduleConfig from './ScheduleConfig';
import EditAgenda from './EditAgenda';

export default function AgendasSettings() {
  const [view, setView] = useState('list');
  const [selectedBoxId, setSelectedBoxId] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const parts = hash.split('/');
      
      if (parts.length >= 4 && parts[1] === 'agendas') {
        setSelectedBoxId(parts[2]);
        setView(parts[3]);
      } else {
        setView('list');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBack = () => {
    window.location.hash = '#settings/agendas';
    setView('list');
  };

  switch (view) {
    case 'schedule':
      return <ScheduleConfig boxId={selectedBoxId} onBack={handleBack} />;
    case 'edit':
      return <EditAgenda boxId={selectedBoxId} onBack={handleBack} />;
    default:
      return <AgendaList />;
  }
}