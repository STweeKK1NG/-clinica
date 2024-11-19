import React from 'react';

interface CommuneSelectorProps {
  region: string;
  value: string;
  onChange: (value: string) => void;
}

const communes = {
  'RM': [
    { value: 'santiago', label: 'Santiago' },
    { value: 'providencia', label: 'Providencia' },
    { value: 'lascondes', label: 'Las Condes' },
    { value: 'nunoa', label: 'Ñuñoa' },
    { value: 'maipu', label: 'Maipú' },
    { value: 'lasrejas', label: 'Las Rejas' },
    { value: 'vitacura', label: 'Vitacura' },
    { value: 'recoleta', label: 'Recoleta' },
    { value: 'quilicura', label: 'Quilicura' },
    { value: 'penalolen', label: 'Peñalolén' }
  ],
  'V': [
    { value: 'valparaiso', label: 'Valparaíso' },
    { value: 'vina', label: 'Viña del Mar' },
    { value: 'quilpue', label: 'Quilpué' },
    { value: 'villaalemana', label: 'Villa Alemana' },
    { value: 'sanantonio', label: 'San Antonio' },
    { value: 'quillota', label: 'Quillota' }
  ],
  'VIII': [
    { value: 'concepcion', label: 'Concepción' },
    { value: 'talcahuano', label: 'Talcahuano' },
    { value: 'chiguayante', label: 'Chiguayante' },
    { value: 'sanpedro', label: 'San Pedro de la Paz' },
    { value: 'coronel', label: 'Coronel' },
    { value: 'lota', label: 'Lota' }
  ],
  'II': [
    { value: 'antofagasta', label: 'Antofagasta' },
    { value: 'calama', label: 'Calama' },
    { value: 'tocopilla', label: 'Tocopilla' },
    { value: 'mejillones', label: 'Mejillones' }
  ],
  'III': [
    { value: 'copiapo', label: 'Copiapó' },
    { value: 'vallenar', label: 'Vallenar' },
    { value: 'caldera', label: 'Caldera' },
    { value: 'chanaral', label: 'Chañaral' }
  ],
  'IV': [
    { value: 'serena', label: 'La Serena' },
    { value: 'coquimbo', label: 'Coquimbo' },
    { value: 'ovalle', label: 'Ovalle' },
    { value: 'illapel', label: 'Illapel' }
  ],
  'VI': [
    { value: 'rancagua', label: 'Rancagua' },
    { value: 'sanfernando', label: 'San Fernando' },
    { value: 'rengo', label: 'Rengo' },
    { value: 'machali', label: 'Machalí' }
  ],
  'VII': [
    { value: 'talca', label: 'Talca' },
    { value: 'curico', label: 'Curicó' },
    { value: 'linares', label: 'Linares' },
    { value: 'cauquenes', label: 'Cauquenes' }
  ],
  'IX': [
    { value: 'temuco', label: 'Temuco' },
    { value: 'angol', label: 'Angol' },
    { value: 'victoria', label: 'Victoria' },
    { value: 'villarrica', label: 'Villarrica' }
  ],
  'X': [
    { value: 'puertomontt', label: 'Puerto Montt' },
    { value: 'osorno', label: 'Osorno' },
    { value: 'castro', label: 'Castro' },
    { value: 'ancud', label: 'Ancud' }
  ],
  'XI': [
    { value: 'coyhaique', label: 'Coyhaique' },
    { value: 'aysen', label: 'Aysén' },
    { value: 'chilechico', label: 'Chile Chico' },
    { value: 'cochrane', label: 'Cochrane' }
  ],
  'XII': [
    { value: 'puntaarenas', label: 'Punta Arenas' },
    { value: 'puertowilliams', label: 'Puerto Williams' },
    { value: 'porvenir', label: 'Porvenir' },
    { value: 'natalestorres', label: 'Puerto Natales' }
  ],
  'XV': [
    { value: 'arica', label: 'Arica' },
    { value: 'putre', label: 'Putre' },
    { value: 'camarones', label: 'Camarones' }
  ],
  'I': [
    { value: 'iquique', label: 'Iquique' },
    { value: 'altohospicio', label: 'Alto Hospicio' },
    { value: 'pica', label: 'Pica' },
    { value: 'pozoalmonte', label: 'Pozo Almonte' }
  ],
  'XIV': [
    { value: 'valdivia', label: 'Valdivia' },
    { value: 'launion', label: 'La Unión' },
    { value: 'riobueno', label: 'Río Bueno' },
    { value: 'panguipulli', label: 'Panguipulli' }
  ],
  'XVI': [
    { value: 'chillan', label: 'Chillán' },
    { value: 'chillanviejo', label: 'Chillán Viejo' },
    { value: 'bulnes', label: 'Bulnes' },
    { value: 'sancarlos', label: 'San Carlos' }
  ]
};

export default function CommuneSelector({ region, value, onChange }: CommuneSelectorProps) {
  const availableCommunes = communes[region as keyof typeof communes] || [];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Comuna
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        disabled={!region}
      >
        <option value="">Seleccionar comuna</option>
        {availableCommunes.map(commune => (
          <option key={commune.value} value={commune.value}>
            {commune.label}
          </option>
        ))}
      </select>
    </div>
  );
}