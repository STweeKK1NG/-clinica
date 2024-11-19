import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { Eye, EyeOff, Lock, Check, X } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'Al menos 8 caracteres',
    test: (password) => password.length >= 8,
  },
  {
    label: 'Al menos una letra mayúscula',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Al menos una letra minúscula',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Al menos un número',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'Al menos un carácter especial',
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const changePassword = useAuthStore(state => state.changePassword);

  const meetsAllRequirements = passwordRequirements.every(req => req.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword;
  const isValid = meetsAllRequirements && passwordsMatch && currentPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isValid) return;

    try {
      const success = await changePassword(currentPassword, newPassword);
      if (success) {
        setSuccess('Contraseña actualizada exitosamente');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('La contraseña actual es incorrecta');
      }
    } catch (err) {
      setError('Ocurrió un error al cambiar la contraseña');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">
        Cambiar contraseña
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña actual
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nueva contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar nueva contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Requisitos de la contraseña
          </h3>
          <ul className="space-y-2">
            {passwordRequirements.map((req, index) => (
              <li key={index} className="flex items-center text-sm">
                {req.test(newPassword) ? (
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <X className="h-4 w-4 text-red-500 mr-2" />
                )}
                <span className={req.test(newPassword) ? 'text-green-700' : 'text-red-700'}>
                  {req.label}
                </span>
              </li>
            ))}
            <li className="flex items-center text-sm">
              {passwordsMatch && newPassword ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <X className="h-4 w-4 text-red-500 mr-2" />
              )}
              <span className={passwordsMatch && newPassword ? 'text-green-700' : 'text-red-700'}>
                Las contraseñas coinciden
              </span>
            </li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
            {success}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isValid
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}