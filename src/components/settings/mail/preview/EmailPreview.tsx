import React from 'react';
import { Calendar, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface EmailPreviewProps {
  headerColor: string;
  logo: string | null;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  extraText?: string;
}

export default function EmailPreview({ 
  headerColor, 
  logo,
  phone1,
  phone2,
  email,
  address,
  extraText
}: EmailPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Vista previa</h3>
      
      <div className="max-w-[400px] mx-auto bg-[#F9F9F9] rounded-lg overflow-hidden shadow">
        {/* Header */}
        <div
          style={{ backgroundColor: headerColor }}
          className="p-4 flex items-center justify-center relative"
        >
          <Calendar className="h-5 w-5 text-white absolute left-4" />
          <h2 className="text-lg font-bold text-white">CITA AGENDADA</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Logo */}
          {logo && (
            <div className="flex justify-center">
              <img
                src={logo}
                alt="Logo de la clínica"
                className="max-w-[350px] h-auto object-contain"
              />
            </div>
          )}

          {/* Patient Info */}
          <div className="space-y-2">
            <p className="font-medium">Estimado/a Nombre paciente:</p>
            <p>Tiene una cita reservada con Nombre profesional en Clínica A+ Salud.</p>
          </div>

          {/* Appointment Details */}
          <div className="bg-[#F0F0F0] p-4 rounded-lg space-y-3">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>Viernes, 22 de agosto de 2021</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span>12:00 horas</span>
            </div>
            {address && (
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{address}</span>
              </div>
            )}
          </div>

          {/* Extra Text */}
          {extraText && (
            <div className="text-gray-700 whitespace-pre-wrap">
              {extraText}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              style={{ backgroundColor: headerColor }}
              className="w-full py-2 text-white font-bold rounded-md hover:opacity-90 transition-opacity"
            >
              Confirmar Asistencia
            </button>
            <button
              style={{ color: headerColor, borderColor: headerColor }}
              className="w-full py-2 bg-white font-bold rounded-md border-2 hover:bg-opacity-10 transition-colors"
            >
              Suspender Cita
            </button>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-gray-600">
            {phone1 && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{phone1}</span>
              </div>
            )}
            {phone2 && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{phone2}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{email}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400">
            Enviado mediante software A+ Salud
          </div>
        </div>
      </div>
    </div>
  );
}