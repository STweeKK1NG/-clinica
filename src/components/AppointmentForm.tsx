import React, { useState } from 'react';
import { Clock } from 'lucide-react';

interface AppointmentFormProps {
  selectedDate: Date;
  onClose: () => void;
}

export default function AppointmentForm({ selectedDate, onClose }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    rut: '',
    telefono: '',
    correo: '',
    servicio: '',
    box: '',
    horaInicio: '',
    horaTermino: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la cita
    console.log('Datos de la cita:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombres
          </label>
          <input
            type="text"
            name="nombres"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.nombres}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primer Apellido
          </label>
          <input
            type="text"
            name="primerApellido"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.primerApellido}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Segundo Apellido
          </label>
          <input
            type="text"
            name="segundoApellido"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.segundoApellido}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RUT
          </label>
          <input
            type="text"
            name="rut"
            required
            placeholder="12.345.678-9"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.rut}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            required
            placeholder="+56 9 1234 5678"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="correo"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servicio
          </label>
          <select
            name="servicio"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.servicio}
            onChange={handleChange}
          >
            <option value="">Seleccione un servicio</option>
            <option value="limpieza">Limpieza Dental</option>
            <option value="extraccion">Extracción</option>
            <option value="revision">Revisión General</option>
            <option value="ortodoncia">Ortodoncia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Box
          </label>
          <select
            name="box"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.box}
            onChange={handleChange}
          >
            <option value="">Seleccione un box</option>
            <option value="1">Box 1</option>
            <option value="2">Box 2</option>
            <option value="3">Box 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hora de Inicio
          </label>
          <input
            type="time"
            name="horaInicio"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.horaInicio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hora de Término
          </label>
          <input
            type="time"
            name="horaTermino"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.horaTermino}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Reservar Hora
        </button>
      </div>
    </form>
  );
}