import React, { useState, useRef, useEffect } from 'react';
import { Settings, Trash2, GripVertical, Plus, X } from 'lucide-react';

interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  field: {
    id: string;
    label: string;
    options: CheckboxOption[];
  };
  onUpdate: (updates: any) => void;
  onDelete?: () => void;
}

export default function CheckboxGroup({ field, onUpdate, onDelete }: CheckboxGroupProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [editedField, setEditedField] = useState({
    ...field,
    options: field.options.length > 0 ? field.options : [
      {
        id: Date.now().toString(),
        label: 'Opción 1',
        checked: false
      }
    ]
  });
  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingLabel && labelInputRef.current) {
      labelInputRef.current.focus();
      labelInputRef.current.select();
    }
  }, [isEditingLabel]);

  const handleLabelClick = () => {
    if (!isEditing && !isEditingLabel) {
      setIsEditingLabel(true);
    }
  };

  const handleLabelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLabelBlur();
    }
  };

  const handleLabelBlur = () => {
    setIsEditingLabel(false);
    if (editedField.label.trim()) {
      onUpdate(editedField);
    } else {
      setEditedField(prev => ({ ...prev, label: field.label }));
    }
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedField(prev => ({
      ...prev,
      label: e.target.value
    }));
  };

  const handleAddOption = () => {
    setEditedField(prev => ({
      ...prev,
      options: [
        ...prev.options,
        {
          id: Date.now().toString(),
          label: `Opción ${prev.options.length + 1}`,
          checked: false
        }
      ]
    }));
  };

  const handleRemoveOption = (optionId: string) => {
    if (editedField.options.length <= 1) {
      alert('El grupo debe tener al menos una opción');
      return;
    }
    setEditedField(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== optionId)
    }));
  };

  const handleOptionLabelChange = (optionId: string, newLabel: string) => {
    setEditedField(prev => ({
      ...prev,
      options: prev.options.map(opt =>
        opt.id === optionId ? { ...opt, label: newLabel } : opt
      )
    }));
  };

  const handleOptionCheckedChange = (optionId: string) => {
    setEditedField(prev => ({
      ...prev,
      options: prev.options.map(opt =>
        opt.id === optionId ? { ...opt, checked: !opt.checked } : opt
      )
    }));
  };

  const handleSave = () => {
    if (!editedField.label.trim()) {
      alert('El grupo debe tener un nombre');
      return;
    }
    if (editedField.options.length === 0) {
      alert('El grupo debe tener al menos una opción');
      return;
    }
    onUpdate(editedField);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedField({ ...field });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      const confirmed = window.confirm('¿Está seguro de que desea eliminar este grupo?');
      if (confirmed) {
        onDelete();
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 relative group">
      <div className="absolute left-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex justify-between items-start mb-4 pl-8">
        <div className="flex-1">
          {isEditingLabel ? (
            <input
              ref={labelInputRef}
              type="text"
              value={editedField.label}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              onKeyDown={handleLabelKeyDown}
              className="w-full text-lg font-medium border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Nombre del grupo"
            />
          ) : (
            <h3 
              className="text-lg font-medium cursor-pointer hover:text-primary"
              onClick={handleLabelClick}
              title="Haz clic para editar el nombre"
            >
              {editedField.label}
            </h3>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-gray-400 hover:text-gray-600"
            title={isEditing ? "Cancelar edición" : "Editar grupo"}
          >
            <Settings className="h-5 w-5" />
          </button>
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1 text-red-400 hover:text-red-600"
              title="Eliminar grupo"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 pl-8">
        {editedField.options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={option.checked}
              onChange={() => handleOptionCheckedChange(option.id)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
            />
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={option.label}
                  onChange={(e) => handleOptionLabelChange(option.id, e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Nombre de la opción"
                />
              ) : (
                <span className="text-sm text-gray-700 cursor-pointer" onClick={() => handleOptionCheckedChange(option.id)}>
                  {option.label}
                </span>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => handleRemoveOption(option.id)}
                className="p-1 text-red-400 hover:text-red-600"
                title="Eliminar opción"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}

        {isEditing && (
          <>
            <button
              onClick={handleAddOption}
              className="flex items-center text-primary hover:text-primary/80"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar opción
            </button>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary/90"
              >
                Guardar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}