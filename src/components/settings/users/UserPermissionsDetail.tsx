import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

interface UserPermissions {
  id: string;
  email: string;
  phone: string;
  profile: string;
  extraPermissions: boolean;
  filePermissions: boolean;
  limitAppointmentStates: boolean;
  defaultAgendaType: 'box' | 'professional';
  defaultAgendaId: string;
  limitDefaultAgenda: boolean;
  defaultFile: string;
  defaultAgendaView: 'individual' | 'multiple' | 'reception';
  showDeletedAppointments: boolean;
  allowOutOfSchedule: boolean;
  isActive: boolean;
  hasRecipePermission: boolean;
  hasExamPermission: boolean;
}

interface Box {
  id: number;
  name: string;
}

interface Professional {
  id: string;
  name: string;
  specialty: string;
}

export default function UserPermissionsDetail({ userId, onBack }: { userId: string; onBack: () => void }) {
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    // Cargar usuario
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.id === userId);
    if (user) {
      setPermissions({
        id: user.id,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
        extraPermissions: user.extraPermissions || false,
        filePermissions: user.filePermissions || false,
        limitAppointmentStates: user.limitAppointmentStates || false,
        defaultAgendaType: user.defaultAgendaType || 'box',
        defaultAgendaId: user.defaultAgendaId || '',
        limitDefaultAgenda: user.limitDefaultAgenda || false,
        defaultFile: user.defaultFile || '',
        defaultAgendaView: user.defaultAgendaView || 'individual',
        showDeletedAppointments: user.showDeletedAppointments || false,
        allowOutOfSchedule: user.allowOutOfSchedule || false,
        isActive: user.isActive || true,
        hasRecipePermission: user.hasRecipePermission || false,
        hasExamPermission: user.hasExamPermission || false,
      });
    }

    // Cargar boxes desde rooms
    const savedRooms = localStorage.getItem('rooms');
    if (savedRooms) {
      setBoxes(JSON.parse(savedRooms));
    }

    // Cargar profesionales
    const savedProfessionals = localStorage.getItem('professionals');
    if (savedProfessionals) {
      setProfessionals(JSON.parse(savedProfessionals));
    }
  }, [userId]);

  const handleChange = (field: keyof UserPermissions, value: any) => {
    if (!permissions) return;
    
    // Si cambiamos el tipo de agenda, resetear el ID seleccionado
    if (field === 'defaultAgendaType') {
      setPermissions({ 
        ...permissions, 
        [field]: value,
        defaultAgendaId: '' 
      });
    } else {
      setPermissions({ ...permissions, [field]: value });
    }
    
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!permissions) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user: any) =>
      user.id === userId ? { ...user, ...permissions } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setHasChanges(false);
    alert('Cambios guardados exitosamente');
  };

  const handlePasswordChange = () => {
    window.location.hash = '#settings/usuarios';
    // Esperar a que se actualice la URL antes de cambiar la pestaña
    setTimeout(() => {
      const passwordTab = document.querySelector('[data-tab="password"]') as HTMLButtonElement;
      if (passwordTab) {
        passwordTab.click();
      }
    }, 100);
  };

  const renderAgendaOptions = () => {
    if (permissions?.defaultAgendaType === 'box') {
      return boxes.map(box => (
        <option key={box.id} value={box.id.toString()}>
          {box.name}
        </option>
      ));
    } else {
      return professionals.map(professional => (
        <option key={professional.id} value={professional.id}>
          {professional.name} - {professional.specialty}
        </option>
      ));
    }
  };

  if (!permissions) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Volver
        </button>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Guardar cambios
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Atributo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Correo</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Correo del usuario
              </td>
              <td className="px-6 py-4">
                <input
                  type="email"
                  value={permissions.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Teléfono</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Teléfono del usuario
              </td>
              <td className="px-6 py-4">
                <input
                  type="tel"
                  value={permissions.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Permiso</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Aquí se define el perfil de usuario
              </td>
              <td className="px-6 py-4">
                <select
                  value={permissions.profile}
                  onChange={(e) => handleChange('profile', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  <option value="administrator">Administrador</option>
                  <option value="assistant">Asistente</option>
                  <option value="clinical">Profesional clínico</option>
                  <option value="professional">Profesional</option>
                </select>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Permisos extra</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Aquí se definen los permisos con mayor detalle
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleChange('extraPermissions', !permissions.extraPermissions)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Editar permisos
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Permisos fichas</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Aquí se definen los permisos de las fichas para este usuario
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleChange('filePermissions', !permissions.filePermissions)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Editar permisos
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Limitar estados citas</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Aquí se definen los estados excluidos para este usuario
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleChange('limitAppointmentStates', !permissions.limitAppointmentStates)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Editar estados
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Cambio Agenda</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Aquí se define la agenda que verá siempre el usuario al ingresar a la aplicación
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={permissions.defaultAgendaType === 'box'}
                        onChange={() => handleChange('defaultAgendaType', 'box')}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">Box</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={permissions.defaultAgendaType === 'professional'}
                        onChange={() => handleChange('defaultAgendaType', 'professional')}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">Profesional</span>
                    </label>
                  </div>
                  <select
                    value={permissions.defaultAgendaId}
                    onChange={(e) => handleChange('defaultAgendaId', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="">Seleccionar {permissions.defaultAgendaType === 'box' ? 'box' : 'profesional'}...</option>
                    {renderAgendaOptions()}
                  </select>
                </div>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Limitar a agenda por defecto</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                En caso de asignar una agenda por defecto para el usuario, de activar esta opción el usuario sólo podrá ver dicha agenda
              </td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={permissions.limitDefaultAgenda}
                  onChange={(e) => handleChange('limitDefaultAgenda', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Cambio Clave</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Aquí puedes modificar la clave de acceso a la plataforma para el usuario
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={handlePasswordChange}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Cambiar clave
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Ficha por defecto</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Cuando el usuario ingrese a la ficha de un paciente se le cargará esta ficha por defecto
              </td>
              <td className="px-6 py-4">
                <select
                  value={permissions.defaultFile}
                  onChange={(e) => handleChange('defaultFile', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  <option value="">Seleccionar ficha...</option>
                  <option value="clinical">Ficha clínica</option>
                  <option value="dental">Ficha dental</option>
                </select>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Tipo agenda por defecto</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Aquí se define si el usuario verá la Agenda individual, la agenda múltiple o la agenda recepción al momento de ingresar
              </td>
              <td className="px-6 py-4">
                <select
                  value={permissions.defaultAgendaView}
                  onChange={(e) => handleChange('defaultAgendaView', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  <option value="individual">Individual</option>
                  <option value="multiple">Múltiple</option>
                  <option value="reception">Recepción</option>
                </select>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Ver citas eliminadas</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                En caso de activar esta opción las citas eliminadas se verán en el calendario del usuario pero en color rojo, en caso de desactivarlo dichas citas no serán visibles
              </td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={permissions.showDeletedAppointments}
                  onChange={(e) => handleChange('showDeletedAppointments', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Reserva fuera de horario</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                En caso de activar esta opción el usuario podrá crear citas fuera del horario definido para cada agenda
              </td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={permissions.allowOutOfSchedule}
                  onChange={(e) => handleChange('allowOutOfSchedule', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Usuario activo</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Define si el usuario podrá ingresar a la aplicación o no
              </td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={permissions.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Datos receta</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                En caso que el usuario pueda emitir recetas aquí debes ingresar los datos básicos que aparecerán en las recetas que emita el profesional
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleChange('hasRecipePermission', !permissions.hasRecipePermission)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Datos receta
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">Datos examen</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                En caso que el usuario pueda emitir exámenes aquí debes ingresar los datos básicos que aparecerán en los exámenes que emita el profesional
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleChange('hasExamPermission', !permissions.hasExamPermission)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Datos examen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
        >
          Ver opciones avanzadas
        </button>
      </div>
    </div>
  );
}