import React, { useState, useEffect } from 'react';
import PlansList from './PlansList';
import CreatePlan from './CreatePlan';
import EditPlan from './EditPlan';

export default function PlansSettings() {
  const [view, setView] = useState('list');
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#settings/planes/create') {
        setView('create');
      } else if (hash.startsWith('#settings/planes/edit/')) {
        const id = hash.split('/').pop();
        setEditingPlanId(id || null);
        setView('edit');
      } else {
        setView('list');
        setEditingPlanId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (view === 'create') {
    return <CreatePlan />;
  }

  if (view === 'edit' && editingPlanId) {
    return <EditPlan planId={editingPlanId} />;
  }

  return <PlansList />;
}