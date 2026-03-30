import React from 'react';
import { motion } from 'framer-motion';

interface TeamCTABannerProps {
  onButtonClick?: () => void;
  onNavigate?: (page: string) => void;
}

const TeamCTABanner: React.FC<TeamCTABannerProps> = ({ onButtonClick, onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-[#38bdf8] to-blue-600 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Envie d'en savoir plus?
              </h2>
            </div>

            <p className="text-lg md:text-xl text-sky-50 leading-relaxed max-w-md">
              Notre équipe est disponible et prête à discuter de votre projet entrepreneurial. Nous répondrons à toutes vos questions et vous guiderons à chaque étape.
            </p>

            <p className="text-base md:text-lg text-sky-100">
              Contactez-nous dès aujourd'hui et laissez-nous vous montrer comment rejoindre notre réseau de franchisés prospères.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('franchise-application-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl mt-4"
            >
              Postuler
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative h-80 md:h-96 lg:h-full min-h-96 overflow-hidden"
        >
          <img
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Équipe professionnelle disponible pour discuter"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamCTABanner;
