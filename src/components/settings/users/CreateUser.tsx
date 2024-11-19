import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  description: string;
}

interface ProfessionalData {
  gender: string;
  rut: string;
  specialty: string;
  createGenericSchedule: boolean;
  limitView: boolean;
}

const userProfiles: UserProfile[] = [
  {
    id: 'administrator',
    name: 'Administrador',
    description: 'Puede acceder a todos los módulos de la aplicación y puede modificar toda la información ingresada en la plataforma.'
  },
  {
    id: 'assistant',
    name: 'Asistente',
    description: 'Puede manejar la agenda, ingresar ventas, acceder a la base de pacientes, pero no puede ver estadísticas globales, ni tampoco modificar ventas pasadas. Tampoco tiene acceso a fichas de pacientes.'
  },
  {
    id: 'clinical',
    name: 'Profesional clínico',
    description: 'Puede crear citas y ver e ingresar fichas a los pacientes.'
  },
  {
    id: 'professional',
    name: 'Profesional',
    description: 'Puede visualizar la agenda y ver e ingresar fichas a los pacientes.'
  }
];

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    profile: 'administrator',
    createProfessional: false
  });

  const [professionalData, setProfessionalData] = useState<ProfessionalData>({
    gender: '',
    rut: '',
    specialty: '',
    createGenericSchedule: false,
    limitView: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      id: Date.now().toString(),
      ...formData,
      ...(formData.createProfessional && { professional: professionalData })
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Si se está creando un profesional, también guardarlo en la lista de profesionales
    if (formData.createProfessional) {
      const professionals = JSON.parse(localStorage.getItem('professionals') || '[]');
      const newProfessional = {
        id: professionalData.rut || Date.now().toString(),
        name: formData.name,
        specialty: professionalData.specialty,
        email: formData.email,
        phone: formData.phone,
        status: 'active'
      };
      professionals.push(newProfessional);
      localStorage.setItem('professionals', JSON.stringify(professionals));
    }

    window.location.hash = '#settings/usuarios';
  };

  const handleBack = () => {
    window.location.hash = '#settings/usuarios';
  };

  return (
    <div>
      <button
        onClick={handleBack}
        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 mb-6"
      >
        Volver
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Recuerda que si deseas que este usuario tenga una agenda asociada y pueda atender y agendar citas necesitas crear un perfil profesional. Puedes hacerlo al momento de crear el usuario transfiriendo la información al perfil, o desde el panel "Lista de Usuarios". Si necesitas mayor información puedes consultar el tutorial aquí.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6">Crear usuario</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perfil de usuario
              </label>
              <select
                value={formData.profile}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                {userProfiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="createProfessional"
                checked={formData.createProfessional}
                onChange={(e) => setFormData({ ...formData, createProfessional: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="createProfessional" className="ml-2 block text-sm text-gray-700">
                Crear profesional
              </label>
            </div>

            {formData.createProfessional && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sexo
                  </label>
                  <select
                    value={professionalData.gender}
                    onChange={(e) => setProfessionalData({ ...professionalData, gender: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="female">Femenino</option>
                    <option value="male">Masculino</option>
                    <option value="other">Otro</option>
                    <option value="not_specified">Prefiero no especificar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RUT (Opcional)
                  </label>
                  <input
                    type="text"
                    value={professionalData.rut}
                    onChange={(e) => setProfessionalData({ ...professionalData, rut: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="12.345.678-9"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidad (Opcional)
                  </label>
                  <input
                    type="text"
                    value={professionalData.specialty}
                    onChange={(e) => setProfessionalData({ ...professionalData, specialty: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Ej: Odontología general"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="createGenericSchedule"
                      checked={professionalData.createGenericSchedule}
                      onChange={(e) => setProfessionalData({ ...professionalData, createGenericSchedule: e.target.checked })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="createGenericSchedule" className="ml-2 block text-sm text-gray-700">
                      Crear horario genérico
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="limitView"
                      checked={professionalData.limitView}
                      onChange={(e) => setProfessionalData({ ...professionalData, limitView: e.target.checked })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="limitView" className="ml-2 block text-sm text-gray-700">
                      Limitar vista
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6">Detalle de perfiles</h2>
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perfil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userProfiles.map((profile) => (
                  <tr key={profile.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {profile.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {profile.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}