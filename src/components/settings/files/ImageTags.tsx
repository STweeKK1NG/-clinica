import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface ImageTag {
  id: string;
  name: string;
}

export default function ImageTags() {
  const [tags, setTags] = useState<ImageTag[]>(() => {
    const savedTags = localStorage.getItem('image_tags');
    return savedTags ? JSON.parse(savedTags) : [];
  });
  const [newTag, setNewTag] = useState('');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editingTagName, setEditingTagName] = useState('');
  const [error, setError] = useState('');

  // Guardar tags en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('image_tags', JSON.stringify(tags));
  }, [tags]);

  const handleAddTag = () => {
    if (!newTag.trim()) {
      setError('El tag no puede estar vacío');
      return;
    }

    const tagExists = tags.some(tag => tag.name.toLowerCase() === newTag.trim().toLowerCase());
    if (tagExists) {
      setError('Este tag ya existe');
      return;
    }

    setTags(prevTags => {
      const updatedTags = [...prevTags, { id: Date.now().toString(), name: newTag.trim() }];
      return updatedTags;
    });
    setNewTag('');
    setError('');
  };

  const handleEditClick = (tag: ImageTag) => {
    setEditingTagId(tag.id);
    setEditingTagName(tag.name);
  };

  const handleEditSave = () => {
    if (!editingTagName.trim()) {
      setError('El tag no puede estar vacío');
      return;
    }

    const tagExists = tags.some(
      tag => tag.id !== editingTagId && 
      tag.name.toLowerCase() === editingTagName.trim().toLowerCase()
    );
    if (tagExists) {
      setError('Este tag ya existe');
      return;
    }

    setTags(prevTags => prevTags.map(tag => 
      tag.id === editingTagId 
        ? { ...tag, name: editingTagName.trim() }
        : tag
    ));
    setEditingTagId(null);
    setEditingTagName('');
    setError('');
  };

  const handleEditCancel = () => {
    setEditingTagId(null);
    setEditingTagName('');
    setError('');
  };

  const handleDelete = (tagId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este tag?')) {
      setTags(prevTags => prevTags.filter(tag => tag.id !== tagId));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, isEditing: boolean = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isEditing) {
        handleEditSave();
      } else {
        handleAddTag();
      }
    } else if (e.key === 'Escape' && isEditing) {
      handleEditCancel();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Tag List */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Listado de tags de imágenes
        </h3>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingTagId === tag.id ? (
                      <input
                        type="text"
                        value={editingTagName}
                        onChange={(e) => setEditingTagName(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, true)}
                        onBlur={handleEditSave}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{tag.name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {editingTagId === tag.id ? (
                        <>
                          <button
                            onClick={handleEditSave}
                            className="text-green-600 hover:text-green-800"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(tag)}
                            className="text-secondary hover:text-secondary/80"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(tag.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {tags.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-sm text-gray-500 text-center">
                    No hay tags registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column - Add Tag Form */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Agregar nuevo tag
        </h3>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <input
                type="text"
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyPress}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Ingrese el nombre del tag"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleAddTag}
              className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}