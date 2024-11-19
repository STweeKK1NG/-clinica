import React, { useState } from 'react';
import { Settings, Trash2, GripVertical } from 'lucide-react';

interface TextFieldProps {
  field: {
    id: string;
    label: string;
    validation?: {
      minLength?: number;
      maxLength?: number;
    };
  };
  onUpdate: (updates: any) => void;
  onDelete?: () => void;
}

export default function TextField({ field, onUpdate, onDelete }: TextFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(field.label);
  const [minLength, setMinLength] = useState(field.validation?.minLength || 0);
  const [maxLength, setMaxLength] = useState(field.validation?.maxLength || 100);

  const handleSave = () => {
    onUpdate({
      label: editedLabel,
      validation: {
        minLength,
        maxLength
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 relative group">
      <div className="absolute left-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex justify-between items-start mb-4 pl-8">
        {isEditing ? (
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        ) : (
          <h3 className="text-lg font-medium">{field.label}</h3>
        )}
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Settings className="h-5 w-5" />
          </button>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4 pl-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitud mínima
              </label>
              <input
                type="number"
                value={minLength}
                onChange={(e) => setMinLength(parseInt(e.target.value))}
                min="0"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitud máxima
              </label>
              <input
                type="number"
                value={maxLength}
                onChange={(e) => setMaxLength(parseInt(e.target.value))}
                min="1"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div className="pl-8">
          <input
            type="text"
            placeholder="Campo de texto"
            disabled
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-gray-50"
          />
        </div>
      )}
    </div>
  );
}