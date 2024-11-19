import React, { useState } from 'react';
import { X, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface SocialMedia {
  platform: string;
  url: string;
}

interface SocialMediaEditorProps {
  onClose: () => void;
}

export default function SocialMediaEditor({ onClose }: SocialMediaEditorProps) {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(() => {
    const saved = localStorage.getItem('social_media');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSave = () => {
    localStorage.setItem('social_media', JSON.stringify(socialMedia));
    onClose();
  };

  const handleAdd = (platform: string) => {
    setSocialMedia([...socialMedia, { platform, url: '' }]);
  };

  const handleRemove = (index: number) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
  };

  const handleUrlChange = (index: number, url: string) => {
    const updated = [...socialMedia];
    updated[index].url = url;
    setSocialMedia(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Editar redes sociales</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {socialMedia.map((social, index) => (
            <div key={index} className="flex items-center space-x-2">
              {social.platform === 'facebook' && <Facebook className="h-5 w-5 text-blue-600" />}
              {social.platform === 'instagram' && <Instagram className="h-5 w-5 text-pink-600" />}
              {social.platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-400" />}
              {social.platform === 'linkedin' && <Linkedin className="h-5 w-5 text-blue-700" />}
              
              <input
                type="url"
                value={social.url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder={`URL de ${social.platform}`}
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
              
              <button
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAdd('facebook')}
              className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
            >
              <Facebook className="h-4 w-4 mr-1" />
              Facebook
            </button>
            <button
              onClick={() => handleAdd('instagram')}
              className="flex items-center px-3 py-1 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200"
            >
              <Instagram className="h-4 w-4 mr-1" />
              Instagram
            </button>
            <button
              onClick={() => handleAdd('twitter')}
              className="flex items-center px-3 py-1 bg-blue-100 text-blue-400 rounded-md hover:bg-blue-200"
            >
              <Twitter className="h-4 w-4 mr-1" />
              Twitter
            </button>
            <button
              onClick={() => handleAdd('linkedin')}
              className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}