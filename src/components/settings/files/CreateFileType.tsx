import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import FormField from './form-fields/FormField';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Field {
  id: string;
  type: string;
  label: string;
  content?: string;
  required?: boolean;
  options?: { id: string; label: string; checked?: boolean }[];
  defaultValue?: string | string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  styles?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    width?: string;
    gap?: string;
  };
  showCharCount?: boolean;
}

const defaultFieldsByType: Record<string, Partial<Field>> = {
  checkbox: {
    type: 'checkbox',
    label: 'Grupo de casillas',
    options: [
      { id: '1', label: 'Opción 1', checked: false }
    ]
  },
  radio: {
    type: 'radio',
    label: 'Grupo de radio',
    options: [
      { id: '1', label: 'Opción 1' }
    ]
  },
  select: {
    type: 'select',
    label: 'Lista desplegable',
    options: [
      { id: '1', label: 'Opción 1' }
    ]
  },
  text: {
    type: 'text',
    label: 'Campo de texto',
    validation: {
      minLength: 0,
      maxLength: 100
    }
  },
  textarea: {
    type: 'textarea',
    label: 'Área de texto',
    validation: {
      minLength: 0,
      maxLength: 500
    }
  },
  heading: {
    type: 'heading',
    label: 'Encabezamiento',
    headingLevel: 1,
    alignment: 'left'
  },
  paragraph: {
    type: 'paragraph',
    label: 'Párrafo',
    content: '',
    alignment: 'left',
    styles: {
      bold: false,
      italic: false,
      underline: false
    }
  },
  divider: {
    type: 'divider',
    label: 'Divisor'
  },
  // Campos de diseño
  row: {
    type: 'row',
    label: 'Fila',
    styles: {
      gap: '16px'
    }
  },
  column: {
    type: 'column',
    label: 'Columna',
    styles: {
      width: '50%'
    }
  },
  division: {
    type: 'division',
    label: 'División',
    styles: {
      width: '100%'
    }
  }
};

export default function CreateFileType() {
  const [fileName, setFileName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [currentSection, setCurrentSection] = useState<'form' | 'html' | 'design'>('form');

  const handleBack = () => {
    window.location.hash = '#settings/fichas';
  };

  const handleAddField = (type: string) => {
    const newField = {
      id: Date.now().toString(),
      ...defaultFieldsByType[type]
    } as Field;
    setFields([...fields, newField]);
  };

  const handleUpdateField = (fieldId: string, updates: Partial<Field>) => {
    setFields(fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const handleDeleteField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);
      
      const newFields = [...fields];
      const [removed] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, removed);
      
      setFields(newFields);
    }
  };

  const handleGenerateFile = () => {
    if (!fileName.trim()) {
      alert('Por favor ingrese un nombre para la ficha');
      return;
    }

    const newFileType = {
      id: Date.now().toString(),
      name: fileName,
      fields
    };

    const fileTypes = JSON.parse(localStorage.getItem('file_types') || '[]');
    fileTypes.push(newFileType);
    localStorage.setItem('file_types', JSON.stringify(fileTypes));

    handleBack();
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'form':
        return (
          <div className="space-y-2">
            <button onClick={() => handleAddField('checkbox')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Grupo de casilla de verificación
            </button>
            <button onClick={() => handleAddField('radio')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Grupo de radio
            </button>
            <button onClick={() => handleAddField('select')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Seleccionar
            </button>
            <button onClick={() => handleAddField('text')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Entrada de texto
            </button>
            <button onClick={() => handleAddField('textarea')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              TextArea
            </button>
          </div>
        );
      case 'html':
        return (
          <div className="space-y-2">
            <button onClick={() => handleAddField('heading')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Encabezamiento
            </button>
            <button onClick={() => handleAddField('paragraph')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Párrafo
            </button>
            <button onClick={() => handleAddField('divider')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Divisor
            </button>
          </div>
        );
      case 'design':
        return (
          <div className="space-y-2">
            <button onClick={() => handleAddField('row')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Fila
            </button>
            <button onClick={() => handleAddField('column')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              Columna
            </button>
            <button onClick={() => handleAddField('division')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">
              División
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la ficha
        </label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Ingrese el nombre de la ficha"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <DndContext 
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={fields.map(f => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4">
                {fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    onUpdate={(updates) => handleUpdateField(field.id, updates)}
                    onDelete={() => handleDeleteField(field.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="flex justify-center">
            <button
              onClick={handleGenerateFile}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Generar Ficha
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
                <button
                  onClick={() => setCurrentSection('form')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSection === 'form'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Campos de formulario
                </button>
                <button
                  onClick={() => setCurrentSection('html')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSection === 'html'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  ELEMENTOS HTML
                </button>
                <button
                  onClick={() => setCurrentSection('design')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSection === 'design'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  DISEÑO
                </button>
              </div>
            </div>
            <div className="p-2">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}