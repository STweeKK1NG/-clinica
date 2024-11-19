import React, { useState, useEffect } from 'react';

interface Box {
  id: number;
  name: string;
  category: string;
}

export default function EditAgenda({ boxId, onBack }: { boxId: string; onBack: () => void }) {
  const [name, setName] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedBoxes = localStorage.getItem('agendaBoxes');
    if (savedBoxes) {
      const boxes: Box[] = JSON.parse(savedBoxes);
      const box = boxes.find(b => b.id === parseInt(boxId));
      if (box) {
        setName(box.name);
      }
    }
  }, [boxId]);

  const handleSave = () => {
    const savedBoxes = localStorage.getItem('agendaBoxes');
    if (savedBoxes) {
      const boxes: Box[] = JSON.parse(savedBoxes);
      const updatedBoxes = boxes.map(box => 
        box.id === parseInt(boxId) ? { ...box, name } : box
      );
      localStorage.setItem('agendaBoxes', JSON.stringify(updatedBoxes));
      setHasChanges(false);
      alert('Cambios guardados exitosamente');
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Modificar nombre - Box {boxId}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
        >
          Volver
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la agenda
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setHasChanges(true);
              }}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      {hasChanges && (
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 fixed bottom-4 right-4"
        >
          Guardar cambios
        </button>
      )}
    </div>
  );
}