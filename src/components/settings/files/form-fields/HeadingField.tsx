import React, { useState } from 'react';
import { Settings, Trash2, GripVertical, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface HeadingFieldProps {
  field: {
    id: string;
    label: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    alignment?: 'left' | 'center' | 'right';
    content?: string;
  };
  onUpdate: (updates: any) => void;
  onDelete?: () => void;
}

export default function HeadingField({ field, onUpdate, onDelete }: HeadingFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(field.label);
  const [headingLevel, setHeadingLevel] = useState(field.headingLevel || 1);
  const [alignment, setAlignment] = useState(field.alignment || 'left');
  const [content, setContent] = useState(field.content || '');

  const handleSave = () => {
    onUpdate({
      label: editedLabel,
      headingLevel,
      alignment,
      content
    });
    setIsEditing(false);
  };

  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nivel del encabezado
            </label>
            <select
              value={headingLevel}
              onChange={(e) => setHeadingLevel(parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value={1}>Encabezado 1</option>
              <option value={2}>Encabezado 2</option>
              <option value={3}>Encabezado 3</option>
              <option value={4}>Encabezado 4</option>
              <option value={5}>Encabezado 5</option>
              <option value={6}>Encabezado 6</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alineación
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setAlignment('left')}
                className={`p-2 rounded ${alignment === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <AlignLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setAlignment('center')}
                className={`p-2 rounded ${alignment === 'center' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <AlignCenter className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setAlignment('right')}
                className={`p-2 rounded ${alignment === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <AlignRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenido
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Texto del encabezado"
            />
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
          <HeadingTag
            className={`text-gray-900 ${
              alignment === 'center' ? 'text-center' :
              alignment === 'right' ? 'text-right' : 'text-left'
            }`}
          >
            {content || 'Texto del encabezado'}
          </HeadingTag>
        </div>
      )}
    </div>
  );
}