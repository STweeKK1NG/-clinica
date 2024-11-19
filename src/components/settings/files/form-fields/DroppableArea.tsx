import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableAreaProps {
  children: React.ReactNode;
}

export default function DroppableArea({ children }: DroppableAreaProps) {
  const { setNodeRef } = useDroppable({
    id: 'droppable-area',
  });

  return (
    <div 
      ref={setNodeRef}
      className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4"
    >
      {children}
    </div>
  );
}