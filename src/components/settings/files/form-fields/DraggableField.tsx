import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface DraggableFieldProps {
  id: string;
  children: React.ReactNode;
  isDragging: boolean;
}

export default function DraggableField({ id, children, isDragging }: DraggableFieldProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-4 cursor-move text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      {children}
    </div>
  );
}