import React from 'react';
import { motion } from 'framer-motion';
import DemandDevisForm from './DemandDevisForm';

export default function UnifiedContactForm() {
  return (
    <div id="contact-form" className="bg-white text-gray-900 py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              Demande de devis gratuit
            </span>
          </h1>

          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              Remplissez le formulaire ci-dessous pour que{' '}
              <span className="font-semibold text-gray-900">membre de notre service client</span>
              {' '}vous appellera sous{' '}
              <span className="font-semibold text-gray-900">24h</span>
              {' '}afin de prendre rendez-vous avec un{' '}
              <span className="font-semibold text-gray-900">conseils personnalisés pour votre projet</span>
              .
            </p>

            <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              De plus recevez un{' '}
              <span className="font-semibold text-gray-900">cadeau</span>
              {' '}par e-mail avec la confirmation de réception.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border-2 border-gray-200 hover:border-cyan-400 p-6 sm:p-10 lg:p-16 transition-all duration-300 flex flex-col max-w-4xl mx-auto w-full shadow-sm"
        >
          <DemandDevisForm />
        </motion.div>

      </div>
    </div>
  );
}
