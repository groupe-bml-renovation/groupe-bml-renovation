import React from 'react';
import { MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Zone {
  id: string;
  name: string;
  order: number;
  isPrimary?: boolean;
}

const ZONES: Zone[] = [
  { id: '1', name: 'Isère', order: 1 },
  { id: '2', name: 'Var', order: 2 },
  { id: '3', name: 'Rhône', order: 3 },
  { id: '4', name: 'Bouches-du-Rhône', order: 4 },
  { id: '5', name: 'Drôme', order: 5 },
  { id: '6', name: 'Savoie', order: 6 },
  { id: '7', name: 'Haute-Savoie', order: 7 },
];

export const InterventionZones: React.FC = () => {
  const zones = ZONES.sort((a, b) => a.order - b.order);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const ZoneCard = ({ zone }: { zone: Zone }) => {
    const isPrimary = zone.isPrimary;
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02, translateY: -4 }}
        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
          isPrimary
            ? 'bg-gradient-to-br from-red-50 to-white border-red-600 hover:shadow-lg hover:shadow-red-300'
            : 'bg-white border-gray-200 hover:shadow-lg hover:shadow-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          {isPrimary ? (
            <Zap className="w-5 h-5 flex-shrink-0 text-red-600" />
          ) : (
            <MapPin className="w-5 h-5 flex-shrink-0 text-[#38bdf8]" />
          )}
          <h4 className={`font-semibold ${isPrimary ? 'text-red-900' : 'text-gray-900'}`}>
            {zone.name}
          </h4>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md h-full"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-6 h-6 text-[#38bdf8]" />
          <h3 className="text-2xl font-bold text-gray-900">Zone d'Intervention à Grenoble et Isère</h3>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Zone d'intervention principale à Grenoble en Isère. Nous intervenons également dans toute la région Auvergne-Rhône-Alpes et ses environs.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {zones.map(zone => (
          <ZoneCard key={zone.id} zone={zone} />
        ))}
      </motion.div>
    </motion.div>
  );
};
