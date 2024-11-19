import React from 'react';
import { Calendar, Users, DollarSign, Star, Clock, Activity, User } from 'lucide-react';

const stats = [
  {
    icon: Calendar,
    label: 'Citas Hoy',
    value: '8',
    change: '+2',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    icon: Users,
    label: 'Pacientes Totales',
    value: '1,234',
    change: '+15',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    icon: DollarSign,
    label: 'Ingresos del Mes',
    value: '$12,345',
    change: '+8%',
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  },
  {
    icon: Star,
    label: 'Satisfacción',
    value: '4.8',
    change: '+0.2',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
];

const appointments = [
  {
    patient: 'María González',
    time: '09:00',
    treatment: 'Limpieza Dental',
    status: 'confirmed',
  },
  {
    patient: 'Juan Pérez',
    time: '10:30',
    treatment: 'Extracción',
    status: 'pending',
  },
  {
    patient: 'Ana Silva',
    time: '11:45',
    treatment: 'Revisión',
    status: 'confirmed',
  },
];

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">
            Última actualización: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Próximas Citas</h2>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.time}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{apt.patient}</h4>
                    <p className="text-sm text-gray-500">{apt.treatment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{apt.time}</p>
                  <span
                    className={`text-sm ${
                      apt.status === 'confirmed'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {apt.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Actividad Reciente</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Nuevo pago recibido</span> de
                  María González
                </p>
                <p className="text-sm text-gray-500">Hace 5 minutos</p>
              </div>
              <span className="font-medium text-green-600">+$150</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Nueva cita agendada</span> para
                  Juan Pérez
                </p>
                <p className="text-sm text-gray-500">Hace 15 minutos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Nueva reseña</span> de Ana Silva
                </p>
                <p className="text-sm text-gray-500">Hace 1 hora</p>
              </div>
              <div className="flex text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}