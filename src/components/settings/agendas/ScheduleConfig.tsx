import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, X, Clock } from 'lucide-react';

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  slots: TimeSlot[];
}

interface WeekSchedule {
  [key: string]: DaySchedule;
}

interface ScheduleData {
  color: string;
  blockSize: number;
  startTime: string;
  endTime: string;
  category: string;
  weekSchedule: WeekSchedule;
}

export default function ScheduleConfig({ boxId, onBack }: { boxId: string; onBack: () => void }) {
  const [hasChanges, setHasChanges] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    color: '#e6f3ff',
    blockSize: 15,
    startTime: '09:30',
    endTime: '19:15',
    category: '',
    weekSchedule: {
      monday: { slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:15' }] },
      tuesday: { slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:15' }] },
      wednesday: { slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:15' }] },
      thursday: { slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:15' }] },
      friday: { slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:15' }] },
      saturday: { slots: [{ start: '09:30', end: '13:00' }, { start: '14:00', end: '17:00' }] },
      sunday: { slots: [] }
    }
  });

  useEffect(() => {
    const savedSchedule = localStorage.getItem(`schedule_${boxId}`);
    if (savedSchedule) {
      setScheduleData(JSON.parse(savedSchedule));
    }
  }, [boxId]);

  const handleSaveChanges = () => {
    localStorage.setItem(`schedule_${boxId}`, JSON.stringify(scheduleData));
    setHasChanges(false);
    alert('Cambios guardados exitosamente');
  };

  const updateScheduleData = (updates: Partial<ScheduleData>) => {
    setScheduleData(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const addTimeSlot = (day: string) => {
    const updatedSchedule = {
      ...scheduleData.weekSchedule,
      [day]: {
        slots: [...scheduleData.weekSchedule[day].slots, { start: '09:00', end: '17:00' }]
      }
    };
    updateScheduleData({ weekSchedule: updatedSchedule });
  };

  const removeTimeSlot = (day: string, index: number) => {
    const updatedSchedule = {
      ...scheduleData.weekSchedule,
      [day]: {
        slots: scheduleData.weekSchedule[day].slots.filter((_, i) => i !== index)
      }
    };
    updateScheduleData({ weekSchedule: updatedSchedule });
  };

  const updateTimeSlot = (day: string, index: number, field: 'start' | 'end', value: string) => {
    const updatedSchedule = {
      ...scheduleData.weekSchedule,
      [day]: {
        slots: scheduleData.weekSchedule[day].slots.map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    };
    updateScheduleData({ weekSchedule: updatedSchedule });
  };

  const dayNames = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Volver
      </button>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 text-gray-600">
          <h2 className="text-xl font-normal mb-4">Configuración de horario - Box {boxId}</h2>

          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-4 w-48 font-medium">Color</td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600">
                      Selecciona el color de fondo que tendrá la agenda
                    </p>
                    <div className="flex-shrink-0">
                      <input
                        type="color"
                        value={scheduleData.color}
                        onChange={(e) => updateScheduleData({ color: e.target.value })}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4 font-medium">Tamaño de bloque</td>
                <td className="py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Elige el tamaño que tendrán los bloques de la agenda
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={scheduleData.blockSize}
                        onChange={(e) => updateScheduleData({ blockSize: Number(e.target.value) })}
                        className="w-20 border rounded-md px-2 py-1"
                        min="15"
                        step="15"
                      />
                      <span className="text-sm">minutos</span>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4 font-medium">Hora inicio agenda</td>
                <td className="py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Hora mínima que mostrará la agenda
                    </p>
                    <div className="flex items-center">
                      <input
                        type="time"
                        value={scheduleData.startTime}
                        onChange={(e) => updateScheduleData({ startTime: e.target.value })}
                        className="border rounded-md px-2 py-1"
                      />
                      <button className="ml-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4 font-medium">Hora Fin agenda</td>
                <td className="py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Hora máxima que mostrará la agenda
                    </p>
                    <div className="flex items-center">
                      <input
                        type="time"
                        value={scheduleData.endTime}
                        onChange={(e) => updateScheduleData({ endTime: e.target.value })}
                        className="border rounded-md px-2 py-1"
                      />
                      <button className="ml-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4 font-medium">Categorías</td>
                <td className="py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Selecciona la categoría de la agenda
                    </p>
                    <input
                      type="text"
                      value={scheduleData.category}
                      onChange={(e) => updateScheduleData({ category: e.target.value })}
                      className="w-64 border rounded-md px-2 py-1"
                      placeholder="Selecciona la categoría"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Semana tipo 1</h3>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Configurar tratamientos asociados
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {Object.entries(scheduleData.weekSchedule).map(([day, schedule]) => (
              <div key={day} className="space-y-2">
                <h4 className="font-medium">{dayNames[day as keyof typeof dayNames]}</h4>
                {schedule.slots.map((slot, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateTimeSlot(day, index, 'start', e.target.value)}
                        className="w-full border rounded-l-md px-2 py-1 text-sm"
                      />
                      <button className="p-1 border-t border-b border-r">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">hasta</div>
                    <div className="flex items-center">
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateTimeSlot(day, index, 'end', e.target.value)}
                        className="w-full border rounded-l-md px-2 py-1 text-sm"
                      />
                      <button className="p-1 border-t border-b">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => removeTimeSlot(day, index)}
                        className="p-1 border text-red-600 hover:bg-red-50 rounded-r-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addTimeSlot(day)}
                  className="w-full flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-md border border-blue-200"
                >
                  <Plus className="h-4 w-4" />
                  <span className="ml-1">horas</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {hasChanges && (
        <button 
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 fixed bottom-4 right-4"
        >
          Guardar cambios
        </button>
      )}
    </div>
  );
}