import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import ColorPicker from './ColorPicker';
import SocialMediaEditor from './SocialMediaEditor';
import { useEmailDesignStore } from './emailDesignStore';

export default function EmailForm() {
  const {
    senderEmail,
    subject,
    headerColor,
    headerTextColor,
    showHeader,
    showContent,
    showSocialMedia,
    logo,
    messageContent,
    setSenderEmail,
    setSubject,
    setHeaderColor,
    setHeaderTextColor,
    setShowHeader,
    setShowContent,
    setShowSocialMedia,
    setLogo,
    setMessageContent
  } = useEmailDesignStore();

  const [testEmail, setTestEmail] = useState('');
  const [showSocialEditor, setShowSocialEditor] = useState(false);

  const handleValidateEmail = async () => {
    try {
      // Here you would implement the email validation logic
      alert('Se ha enviado un correo de verificación');
    } catch (error) {
      alert('Error al validar el correo');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendTestEmail = async () => {
    try {
      // Here you would implement the test email sending logic
      alert('Correo de prueba enviado exitosamente');
    } catch (error) {
      alert('Error al enviar el correo de prueba');
    }
  };

  const handleSaveChanges = () => {
    // Save configuration to localStorage
    localStorage.setItem('email_design_config', JSON.stringify({
      senderEmail,
      subject,
      headerColor,
      headerTextColor,
      showHeader,
      showContent,
      showSocialMedia,
      logo,
      messageContent
    }));
    alert('Cambios guardados exitosamente');
  };

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
      {/* Sender Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Correo remitente
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="mail"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
          <button
            onClick={handleValidateEmail}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Validar
          </button>
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Asunto
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Asunto"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Header Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Barra superior</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showHeader}
              onChange={(e) => setShowHeader(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {showHeader && (
          <div className="space-y-4">
            <ColorPicker
              label="Color de la barra"
              value={headerColor}
              onChange={setHeaderColor}
            />
            <ColorPicker
              label="Color del texto"
              value={headerTextColor}
              onChange={setHeaderTextColor}
            />
          </div>
        )}
      </div>

      {/* Content Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Contenido</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showContent}
              onChange={(e) => setShowContent(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {showContent && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700">Seleccionar archivo</span>
                  <input
                    type="file"
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                {logo && <span className="text-sm text-gray-500">Logo seleccionado</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido del mensaje
              </label>
              <div className="text-xs text-gray-500 mb-2">
                Variables disponibles:
                <br />
                {'{{NOMBRE}} - Nombre del paciente'}
                <br />
                {'{{APELLIDO}} - Apellido del paciente'}
                <br />
                {'{{TELEFONO_CONTACTO}} - Teléfono de contacto'}
                <br />
                {'{{NUMERO_CENTRO}} - Número del centro'}
              </div>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={6}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Escriba el contenido del mensaje aquí..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Redes sociales</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showSocialMedia}
              onChange={(e) => setShowSocialMedia(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {showSocialMedia && (
          <button
            onClick={() => setShowSocialEditor(true)}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Editar redes sociales
          </button>
        )}
      </div>

      {/* Test Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Enviar correo de prueba
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Correo de prueba"
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
          <button
            onClick={handleSendTestEmail}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </button>
        </div>
      </div>

      {/* Save Changes */}
      <div className="pt-4">
        <button
          onClick={handleSaveChanges}
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Guardar cambios
        </button>
      </div>

      {showSocialEditor && (
        <SocialMediaEditor onClose={() => setShowSocialEditor(false)} />
      )}
    </div>
  );
}