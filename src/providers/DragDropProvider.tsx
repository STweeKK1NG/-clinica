import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface DragDropProviderProps {
  children: React.ReactNode;
}

export default function DragDropProvider({ children }: DragDropProviderProps) {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Drop outside the list or no movement
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Handle field reordering
    if (destination.droppableId === 'form-fields') {
      const fileTypes = JSON.parse(localStorage.getItem('file_types') || '[]');
      const currentFileType = fileTypes[fileTypes.length - 1];

      if (currentFileType?.fields) {
        const fields = Array.from(currentFileType.fields);
        const [removed] = fields.splice(source.index, 1);
        fields.splice(destination.index, 0, removed);

        currentFileType.fields = fields;
        fileTypes[fileTypes.length - 1] = currentFileType;
        localStorage.setItem('file_types', JSON.stringify(fileTypes));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {children}
    </DragDropContext>
  );
}