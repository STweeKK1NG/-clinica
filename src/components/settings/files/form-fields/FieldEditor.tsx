// ... código existente ...

export default function FieldEditor({ field, onClose, onUpdate }: FieldEditorProps) {
  const { refs, floatingStyles } = useFloating({
    placement: 'right',
    middleware: [offset(10), shift(), flip()],
  });

  const [editedField, setEditedField] = React.useState<FormField>(field);

  const handleHeadingLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedField(prev => ({
      ...prev,
      headingLevel: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6
    }));
  };

  const handleShowCharCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedField(prev => ({
      ...prev,
      showCharCount: e.target.checked
    }));
  };

  const handleSave = () => {
    onUpdate(editedField);
    onClose();
  };

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Configurar campo</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {field.type === 'heading' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nivel del encabezado
            </label>
            <select
              value={editedField.headingLevel || 1}
              onChange={handleHeadingLevelChange}
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
        )}

        {field.type === 'paragraph' && (
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editedField.showCharCount || false}
                onChange={handleShowCharCountChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Mostrar contador de caracteres</span>
            </label>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}