import React from 'react';
import { MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceArea {
  name: string;
  postalCode: string;
  isPrimary: boolean;
}

const SERVICE_AREAS: ServiceArea[] = [
  { name: 'Grenoble', postalCode: '38000', isPrimary: true },
  { name: 'Échirolles', postalCode: '38130', isPrimary: false },
  { name: 'Meylan', postalCode: '38240', isPrimary: false },
  { name: 'Fontaine', postalCode: '38600', isPrimary: false },
  { name: 'Saint-Martin-d\'Hères', postalCode: '38400', isPrimary: false },
  { name: 'Voiron', postalCode: '38500', isPrimary: false },
];

const ServiceAreaMap: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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

  const primaryAreas = SERVICE_AREAS.filter(area => area.isPrimary);
  const extendedAreas = SERVICE_AREAS.filter(area => !area.isPrimary);

  return (
    <div className="space-y-8">
      {/* Primary Service Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-red-600" />
          <h4 className="text-lg font-bold text-gray-900">Zone d'Intervention Principale</h4>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {primaryAreas.map(area => (
            <motion.div
              key={area.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative p-4 rounded-lg border-2 border-red-600 bg-gradient-to-br from-red-50 to-white hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900">{area.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">Code postal: {area.postalCode}</p>
                  </div>
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Extended Service Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-bold text-gray-900">Zone d'Intervention Étendue (Isère)</h4>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {extendedAreas.map(area => (
            <motion.div
              key={area.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative p-4 rounded-lg border border-blue-300 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900">{area.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">{area.postalCode}</p>
                  </div>
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Service Area Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg p-4 border border-slate-200"
      >
        <p className="text-sm text-gray-700">
          Nous intervenons également dans l'ensemble de la région Auvergne-Rhône-Alpes. Pour connaître la disponibilité dans votre commune, n'hésitez pas à nous contacter.
        </p>
      </motion.div>
    </div>
  );
};

export default ServiceAreaMap;
