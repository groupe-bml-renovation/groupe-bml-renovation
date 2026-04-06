import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface CityLocation {
  name: string;
  x: number;
  y: number;
  isPrimary: boolean;
  radius: string;
}

const CITY_LOCATIONS: CityLocation[] = [
  { name: 'Grenoble', x: 50, y: 45, isPrimary: true, radius: '12' },
  { name: 'Échirolles', x: 48, y: 42, isPrimary: false, radius: '8' },
  { name: 'Meylan', x: 52, y: 50, isPrimary: false, radius: '8' },
  { name: 'Fontaine', x: 45, y: 44, isPrimary: false, radius: '8' },
  { name: 'Saint-Martin-d\'Hères', x: 52, y: 42, isPrimary: false, radius: '8' },
  { name: 'Voiron', x: 42, y: 58, isPrimary: false, radius: '8' },
];

const ServiceAreaVisualMap: React.FC = () => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-auto max-w-2xl mx-auto"
          style={{ aspectRatio: '1 / 1' }}
        >
          {/* Isère Department Background */}
          <defs>
            <radialGradient id="grenoblePrimaryGradient" cx="50%" cy="45%">
              <stop offset="0%" stopColor="rgba(220, 38, 38, 0.15)" />
              <stop offset="100%" stopColor="rgba(220, 38, 38, 0.05)" />
            </radialGradient>
            <radialGradient id="isereGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
            </radialGradient>
          </defs>

          {/* Region background */}
          <circle cx="50" cy="50" r="45" fill="url(#isereGradient)" stroke="#94a3b8" strokeWidth="0.5" />

          {/* Grenoble primary service area */}
          <circle
            cx="50"
            cy="45"
            r="18"
            fill="url(#grenoblePrimaryGradient)"
            stroke="rgba(220, 38, 38, 0.3)"
            strokeWidth="0.5"
            strokeDasharray="2,1"
          />

          {/* City markers */}
          {CITY_LOCATIONS.map(city => (
            <g key={city.name}>
              {/* Connection line to Grenoble for secondary cities */}
              {!city.isPrimary && (
                <line
                  x1="50"
                  y1="45"
                  x2={city.x}
                  y2={city.y}
                  stroke={hoveredCity === city.name ? '#3b82f6' : '#cbd5e1'}
                  strokeWidth={hoveredCity === city.name ? '0.8' : '0.4'}
                  opacity={hoveredCity === city.name ? 0.6 : 0.3}
                />
              )}

              {/* City circle */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={city.radius}
                fill={city.isPrimary ? '#dc2626' : '#3b82f6'}
                opacity={hoveredCity === null || hoveredCity === city.name ? 1 : 0.4}
                onMouseEnter={() => setHoveredCity(city.name)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: 'pointer' }}
              />

              {/* City label background */}
              <motion.rect
                x={city.x - 8}
                y={city.y - 22}
                width="16"
                height="6"
                rx="1"
                fill="white"
                stroke={city.isPrimary ? '#dc2626' : '#3b82f6'}
                strokeWidth="0.3"
                opacity={hoveredCity === city.name ? 1 : 0}
              />

              {/* City label */}
              <motion.text
                x={city.x}
                y={city.y - 18}
                textAnchor="middle"
                fontSize="2"
                fill={city.isPrimary ? '#dc2626' : '#3b82f6'}
                fontWeight="bold"
                opacity={hoveredCity === city.name ? 1 : 0}
              >
                {city.name.split(' ')[0]}
              </motion.text>
            </g>
          ))}

          {/* Legend text */}
          <text x="5" y="95" fontSize="1.5" fill="#64748b" fontWeight="bold">
            Isère - Zone d'intervention
          </text>
        </svg>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-gray-700">Zone principale (Grenoble)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">Zone étendue (Isère)</span>
          </div>
        </div>
      </div>

      {/* City Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CITY_LOCATIONS.map(city => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onMouseEnter={() => setHoveredCity(city.name)}
            onMouseLeave={() => setHoveredCity(null)}
            className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
              city.isPrimary
                ? 'bg-red-50 border-red-300 hover:shadow-md'
                : 'bg-blue-50 border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${city.isPrimary ? 'text-red-600' : 'text-blue-600'}`} />
              <div>
                <h5 className="font-semibold text-gray-900">{city.name}</h5>
                <p className="text-xs text-gray-600">
                  {city.isPrimary ? 'Zone principale' : 'Zone étendue'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceAreaVisualMap;
