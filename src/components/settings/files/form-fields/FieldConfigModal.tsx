import React from 'react';
import { X } from 'lucide-react';

interface FieldConfigModalProps {
  field: any;
  onClose: () => void;
  onSave: (updates: any) => void;
}

export default function FieldConfigModal({ field, onClose, onSave }: FieldConfigModalProps) {
  const [config, setConfig] = React.useState({ ...field });

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const renderFieldSpecificConfig = () => {
    switch (field.type) {
      case 'checkbox':
      case 'radio':
      case 'select':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opciones
              </label>
              {config.options?.map((option: any, index: number) => (
                <div key={option.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => {
                      const newOptions = [...(config.options || [])];
                      newOptions[index] = { ...option, label: e.target.value };
                      setConfig({ ...config, options: newOptions });
                    }}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  {field.type === 'checkbox' && (
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={(e) => {
                        const newOptions = [...(config.options || [])];
                        newOptions[index] = { ...option, checked: e.target.checked };
                        setConfig({ ...config, options: newOptions });
                      }}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newOptions = [...(config.options || [])];
                  newOptions.push({
                    id: Date.now().toString(),
                    label: `Opción ${newOptions.length + 1}`,
                    checked: false
                  });
                  setConfig({ ...config, options: newOptions });
                }}
                className="mt-2 px-3 py-1 text-sm text-primary hover:text-primary/80"
              >
                + Agregar opción
              </button>
            </div>
          </div>
        );

      case 'text':
      case 'textarea':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Validación
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">Mínimo caracteres</label>
                  <input
                    type="number"
                    value={config.validation?.minLength || 0}
                    onChange={(e) => setConfig({
                      ...config,
                      validation: {
                        ...config.validation,
                        minLength: parseInt(e.target.value)
                      }
                    })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Máximo caracteres</label>
                  <input
                    type="number"
                    value={config.validation?.maxLength || 100}
                    onChange={(e) => setConfig({
                      ...config,
                      validation: {
                        ...config.validation,
                        maxLength: parseInt(e.target.value)
                      }
                    })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Configurar campo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del campo
            </label>
            <input
              type="text"
              value={config.label}
              onChange={(e) => setConfig({ ...config, label: e.target.value })}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.required || false}
                onChange={(e) => setConfig({ ...config, required: e.target.checked })}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Campo requerido</span>
            </label>
          </div>

          {renderFieldSpecificConfig()}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}