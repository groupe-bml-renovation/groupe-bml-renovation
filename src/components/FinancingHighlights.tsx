import React from 'react';
import { motion } from 'framer-motion';
import { Check, DollarSign, Shield, Clock, FileText, AlertCircle } from 'lucide-react';

interface Highlight {
  title: string;
  items: string[];
  icon: React.ReactNode;
  bgClass: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    title: 'Éligibilité',
    icon: <Check className="w-6 h-6" />,
    bgClass: 'bg-green-50 border-green-100',
    items: [
      'Être majeur avec revenus réguliers',
      'Disposer d\'une adresse stable',
      'Tous les profils étudiés individuellement',
    ],
  },
  {
    title: 'Montants & Durées',
    icon: <DollarSign className="w-6 h-6" />,
    bgClass: 'bg-blue-50 border-blue-100',
    items: [
      'De 5 000€ à plusieurs centaines de milliers',
      'Durées flexibles de 1 à 10+ ans',
      'Adapté à chaque budget',
    ],
  },
  {
    title: 'Transparence',
    icon: <Shield className="w-6 h-6" />,
    bgClass: 'bg-purple-50 border-purple-100',
    items: [
      'Aucun frais caché ou d\'avance',
      'Rémunération seulement après déblocage',
      'Comparatif détaillé avant décision',
    ],
  },
  {
    title: 'Délais',
    icon: <Clock className="w-6 h-6" />,
    bgClass: 'bg-orange-50 border-orange-100',
    items: [
      'Approbation en 5-15 jours ouvrables',
      'Déblocage en 2-5 jours après accord',
      'Traitement prioritaire des dossiers',
    ],
  },
];

export default function FinancingHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 sm:mt-16"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {HIGHLIGHTS.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`border-2 rounded-xl p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300 ${highlight.bgClass}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <div className="text-blue-600">
                  {highlight.icon}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                {highlight.title}
              </h3>
            </div>

            <ul className="space-y-2">
              {highlight.items.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
