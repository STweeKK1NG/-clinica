import React from 'react';
import { Calendar, Phone, Mail, MapPin } from 'lucide-react';

interface WelcomeEmailPreviewProps {
  subject: string;
  headerColor: string;
  headerTitle: string;
  headerTextColor: string;
  logo: string;
  promoImage: string;
  mainText: string;
  showSocialMedia: boolean;
}

export default function WelcomeEmailPreview({
  subject,
  headerColor,
  headerTitle,
  headerTextColor,
  logo,
  promoImage,
  mainText,
  showSocialMedia
}: WelcomeEmailPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Vista previa</h3>
      
      <div className="max-w-[400px] mx-auto bg-[#F9F9F9] rounded-lg overflow-hidden shadow">
        {/* Header */}
        <div
          style={{ backgroundColor: headerColor }}
          className="p-4 flex items-center justify-center relative"
        >
          <Calendar className="h-5 w-5 absolute left-4" style={{ color: headerTextColor }} />
          <h2 
            className="text-lg font-bold"
            style={{ color: headerTextColor }}
          >
            {headerTitle}
          </h2>
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

          {/* Main Text */}
          <div className="text-gray-700 whitespace-pre-wrap">
            {mainText}
          </div>

          {/* Promo Image */}
          {promoImage && (
            <div className="flex justify-center">
              <img
                src={promoImage}
                alt="Imagen promocional"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>+56 9 1234 5678</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span>Dirección del centro</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>contacto@clinicaasalud.cl</span>
            </div>
          </div>

          {/* Social Media */}
          {showSocialMedia && (
            <div className="text-center text-sm text-gray-500">
              Síguenos en nuestras redes sociales
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-400">
            Enviado mediante software A+ Salud
          </div>
        </div>
      </div>
    </div>
  );
}