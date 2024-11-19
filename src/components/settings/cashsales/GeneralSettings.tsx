import React, { useState, useEffect } from 'react';

interface GeneralSettingsData {
  useManualCash: boolean;
  printPurchaseVoucher: boolean;
  usePettyCashAmount: boolean;
  closingAmount: string;
  showUnpaidAppointments: boolean;
  uniqueAutoCashPerUser: boolean;
  uniqueAutoCashPerDay: boolean;
  includeProfessionalInfo: boolean;
}

const defaultSettings: GeneralSettingsData = {
  useManualCash: false,
  printPurchaseVoucher: false,
  usePettyCashAmount: false,
  closingAmount: '0',
  showUnpaidAppointments: false,
  uniqueAutoCashPerUser: false,
  uniqueAutoCashPerDay: true,
  includeProfessionalInfo: false
};

export default function GeneralSettings() {
  const [settings, setSettings] = useState<GeneralSettingsData>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('cash_sales_general_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (field: keyof GeneralSettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleConfirm = () => {
    localStorage.setItem('cash_sales_general_settings', JSON.stringify(settings));
    setHasChanges(false);
    alert('Configuraciones guardadas exitosamente');
  };

  const formatNumber = (value: string) => {
    if (!value) return '';
    const number = parseFloat(value.replace(/[,.]/g, ''));
    if (isNaN(number)) return value;
    return number.toLocaleString('es-CL');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Usar caja manual
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="checkbox"
                  checked={settings.useManualCash}
                  onChange={(e) => handleChange('useManualCash', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Imprimir un voucher de compra
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="checkbox"
                  checked={settings.printPurchaseVoucher}
                  onChange={(e) => handleChange('printPurchaseVoucher', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Usar monto de caja chica como monto de cierre de caja
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="checkbox"
                  checked={settings.usePettyCashAmount}
                  onChange={(e) => handleChange('usePettyCashAmount', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Monto cierre (monto con que cierra la caja)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="text"
                  value={formatNumber(settings.closingAmount)}
                  onChange={(e) => handleChange('closingAmount', e.target.value)}
                  className="w-32 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-right"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Desea que se muestren las citas no pagadas en el resumen financiero y en las citas
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="checkbox"
                  checked={settings.showUnpaidAppointments}
                  onChange={(e) => handleChange('showUnpaidAppointments', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Caja automática única para cada usuario
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="checkbox"
                  checked={settings.uniqueAutoCashPerUser}
                  onChange={(e) => handleChange('uniqueAutoCashPerUser', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Caja automática única por cada día (si se cierra la caja durante el día y se ingresa otra venta se volverá a abrir)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="checkbox"
                  checked={settings.uniqueAutoCashPerDay}
                  onChange={(e) => handleChange('uniqueAutoCashPerDay', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 text-sm text-gray-900">
                Al emitir documentos electrónicos, la información del profesional que atiende la cita va en la descripción
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <input
                  type="checkbox"
                  checked={settings.includeProfessionalInfo}
                  onChange={(e) => handleChange('includeProfessionalInfo', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {hasChanges && (
        <div className="flex justify-start">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
}