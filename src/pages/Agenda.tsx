import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Patient, Appointment } from '../types';

const timeSlots = Array.from({ length: 37 }, (_, i) => {
  const hour = Math.floor(i / 4) + 9;
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    correo: '',
    agenda: '',
    servicios: '',
    inicio: '',
    fin: '',
    comentario: '',
    enviarMail: true
  });

  // Calendar functions
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
    setShowCalendar(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientId: formData.rut,
      date: selectedDate,
      status: 'scheduled',
      treatment: formData.servicios,
      startTime: formData.inicio,
      endTime: formData.fin
    };

    const newPatient: Patient = {
      id: formData.rut,
      name: `${formData.nombre} ${formData.primerApellido} ${formData.segundoApellido}`,
      email: formData.correo,
      phone: formData.telefono
    };

    // Save appointment
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Save patient
    const savedPatients = localStorage.getItem('patients');
    const patients = savedPatients ? JSON.parse(savedPatients) : [];
    if (!patients.find((p: Patient) => p.id === newPatient.id)) {
      patients.push(newPatient);
      localStorage.setItem('patients', JSON.stringify(patients));
    }

    setIsFormOpen(false);
    setFormData({
      rut: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
      correo: '',
      agenda: '',
      servicios: '',
      inicio: '',
      fin: '',
      comentario: '',
      enviarMail: true
    });
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    setFormData(prev => ({
      ...prev,
      inicio: time,
      fin: time
    }));
    setIsFormOpen(true);
  };

  // Filter appointments for selected date
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
            <span>{selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span>
          </button>

          {showCalendar && (
            <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-medium">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </span>
                <button onClick={handleNextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}
                {days.map(day => (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`p-2 text-sm rounded-full hover:bg-primary hover:text-white ${
                      day === selectedDate.getDate() ? 'bg-primary text-white' : ''
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-[auto,1fr] gap-4">
          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              <div className="p-2 text-sm text-gray-500 border-b border-r border-gray-200">
                {time}
              </div>
              <div
                onClick={() => handleTimeSlotClick(time)}
                className="p-2 border-b border-gray-200 min-h-[3rem] hover:bg-gray-50 cursor-pointer relative"
              >
                {todayAppointments
                  .filter(apt => apt.startTime === time)
                  .map(apt => (
                    <div
                      key={apt.id}
                      className="absolute inset-0 m-1 bg-primary/10 border border-primary/20 rounded-md p-2"
                    >
                      <p className="text-sm font-medium text-primary">
                        {apt.treatment}
                      </p>
                      <p className="text-xs text-gray-500">
                        {apt.startTime} - {apt.endTime}
                      </p>
                    </div>
                  ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                Crear cita para el {selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]} a las {selectedTime}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rut</label>
                  <input
                    type="text"
                    value={formData.rut}
                    onChange={(e) => setFormData(prev => ({ ...prev, rut: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido</label>
                  <input
                    type="text"
                    value={formData.primerApellido}
                    onChange={(e) => setFormData(prev => ({ ...prev, primerApellido: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
                  <input
                    type="text"
                    value={formData.segundoApellido}
                    onChange={(e) => setFormData(prev => ({ ...prev, segundoApellido: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <div className="flex">
                    <select className="p-2 border border-gray-300 rounded-l-md">
                      <option>Chile +56</option>
                    </select>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-r-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData(prev => ({ ...prev, correo: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servicios</label>
                  <select
                    value={formData.servicios}
                    onChange={(e) => setFormData(prev => ({ ...prev, servicios: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="limpieza">Limpieza Dental</option>
                    <option value="extraccion">Extracción</option>
                    <option value="revision">Revisión</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                  <textarea
                    value={formData.comentario}
                    onChange={(e) => setFormData(prev => ({ ...prev, comentario: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.enviarMail}
                      onChange={(e) => setFormData(prev => ({ ...prev, enviarMail: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Enviar confirmación por correo</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Reservar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}