import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, CheckCircle, TrendingUp, Clock, Zap } from 'lucide-react';

interface ProcessStep {
  num: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: 1,
    title: 'Consultation',
    desc: 'Analysez votre projet avec notre expert financier',
    icon: <Users className="w-6 h-6" />,
  },
  {
    num: 2,
    title: 'Recherche',
    desc: 'Nous trouvons les meilleures offres bancaires',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    num: 3,
    title: 'Comparaison',
    desc: 'Recevez un comparatif clair des solutions',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    num: 4,
    title: 'Validation',
    desc: 'Choisissez l\'offre qui vous convient',
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    num: 5,
    title: 'Déblocage',
    desc: 'Financement approuvé et débloqué rapidement',
    icon: <Clock className="w-6 h-6" />,
  },
];

export default function SimplifiedFinancingProcess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-16 sm:mt-24 bg-white rounded-2xl border-2 border-gray-100 p-6 sm:p-8 lg:p-12 shadow-lg"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              5 Étapes Simples
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Du projet au financement, votre accompagnement est transparent et sans engagement
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4 relative">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mx-auto mb-4">
                  <span className="text-sm font-bold">{step.num}</span>
                </div>

                <div className="text-blue-600 flex justify-center mb-3">
                  {step.icon}
                </div>

                <h3 className="font-bold text-gray-900 mb-2 text-sm">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  {step.desc}
                </p>
              </div>

              {index < PROCESS_STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-0.5 bg-gradient-to-r from-blue-300 to-transparent"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
