import React, { useState } from 'react';
import { Settings, Trash2, GripVertical, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline } from 'lucide-react';

interface ParagraphFieldProps {
  field: {
    id: string;
    label: string;
    content?: string;
    alignment?: 'left' | 'center' | 'right' | 'justify';
    styles?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    };
    showCharCount?: boolean;
  };
  onUpdate: (updates: any) => void;
  onDelete?: () => void;
}

export default function ParagraphField({ field, onUpdate, onDelete }: ParagraphFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(field.label);
  const [content, setContent] = useState(field.content || '');
  const [alignment, setAlignment] = useState(field.alignment || 'left');
  const [styles, setStyles] = useState(field.styles || {
    bold: false,
    italic: false,
    underline: false
  });
  const [showCharCount, setShowCharCount] = useState(field.showCharCount || false);

  const handleSave = () => {
    onUpdate({
      label: editedLabel,
      content,
      alignment,
      styles,
      showCharCount
    });
    setIsEditing(false);
  };

  const toggleStyle = (style: keyof typeof styles) => {
    setStyles(prev => ({
      ...prev,
      [style]: !prev[style]
    }));
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
              <button
                type="button"
                onClick={() => setAlignment('justify')}
                className={`p-2 rounded ${alignment === 'justify' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <AlignJustify className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estilos
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => toggleStyle('bold')}
                className={`p-2 rounded ${styles.bold ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleStyle('italic')}
                className={`p-2 rounded ${styles.italic ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleStyle('underline')}
                className={`p-2 rounded ${styles.underline ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Underline className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenido
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Texto del párrafo"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showCharCount}
                onChange={(e) => setShowCharCount(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Mostrar contador de caracteres</span>
            </label>
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
          <p
            className={`text-gray-900 ${
              alignment === 'center' ? 'text-center' :
              alignment === 'right' ? 'text-right' :
              alignment === 'justify' ? 'text-justify' : 'text-left'
            } ${styles.bold ? 'font-bold' : ''} ${styles.italic ? 'italic' : ''} ${
              styles.underline ? 'underline' : ''
            }`}
          >
            {content || 'Texto del párrafo'}
          </p>
          {showCharCount && (
            <div className="text-sm text-gray-500 mt-1">
              {content.length} caracteres
            </div>
          )}
        </div>
      )}
    </div>
  );
}