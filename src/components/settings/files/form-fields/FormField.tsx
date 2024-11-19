import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import SelectField from './SelectField';
import TextField from './TextField';
import TextArea from './TextArea';
import HeadingField from './HeadingField';
import ParagraphField from './ParagraphField';
import DividerField from './DividerField';

interface FormFieldProps {
  field: {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    options?: { id: string; label: string; checked?: boolean }[];
    defaultValue?: string | string[];
    content?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    alignment?: 'left' | 'center' | 'right' | 'justify';
    styles?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    };
    showCharCount?: boolean;
  };
  onUpdate: (updates: any) => void;
  onDelete?: (fieldId: string) => void;
}

export default function FormField({ field, onUpdate, onDelete }: FormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleDelete = () => {
    if (onDelete) {
      const confirmed = window.confirm('¿Está seguro de que desea eliminar este campo?');
      if (confirmed) {
        onDelete(field.id);
      }
    }
  };

  const renderField = () => {
    const commonProps = {
      field,
      onUpdate,
      onDelete: handleDelete
    };

    switch (field.type) {
      case 'checkbox':
        return <CheckboxGroup {...commonProps} />;
      case 'radio':
        return <RadioGroup {...commonProps} />;
      case 'select':
        return <SelectField {...commonProps} />;
      case 'text':
        return <TextField {...commonProps} />;
      case 'textarea':
        return <TextArea {...commonProps} />;
      case 'heading':
        return <HeadingField {...commonProps} />;
      case 'paragraph':
        return <ParagraphField {...commonProps} />;
      case 'divider':
        return <DividerField {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative mb-4 cursor-move"
    >
      {renderField()}
    </div>
  );
}