import React from 'react';
import { useEmailDesignStore } from './emailDesignStore';

export default function EmailPreview() {
  const {
    subject,
    headerColor,
    headerTextColor,
    showHeader,
    showContent,
    showSocialMedia,
    logo,
    messageContent
  } = useEmailDesignStore();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Vista previa</h3>
        
        <div className="border rounded-lg overflow-hidden">
          {/* Header */}
          {showHeader && (
            <div
              style={{ backgroundColor: headerColor }}
              className="p-4 flex items-center justify-between"
            >
              <h2 style={{ color: headerTextColor }} className="text-xl font-bold">
                Presupuesto
              </h2>
            </div>
          )}

          {/* Content */}
          {showContent && (
            <div className="p-6 space-y-4">
              {logo && (
                <div className="flex justify-center mb-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-16 object-contain"
                  />
                </div>
              )}

              <div className="prose max-w-none">
                {messageContent.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          {showSocialMedia && (
            <div className="border-t p-4 bg-gray-50">
              <div className="text-center text-sm text-gray-600">
                Síguenos en nuestras redes sociales
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}