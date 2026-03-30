import React from 'react';
import { motion } from 'framer-motion';

const cities = [
  'Grenoble',
  'Saint-Martin-d\'Hères',
  'Meylan',
  'Eybens',
  'Gières',
  'Saint-Ismier',
  'Domène',
  'Montbonnot-Saint-Martin',
  'Le Versoud',
  'Saint-Nazaire-les-Eymes',
  'Brié-et-Angonnes',
  'Biviers',
  'Poisat',
  'Herbeys',
  'Revel',
  'Murianette',
  'Venon',
  'Bresson',
  'Saint-Jean-le-Vieux',
];

export default function NotreSecteur() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col gap-8 items-start w-full"
        >
          <div className="w-full text-left">
            <span className="block text-[#38bdf8] text-xs font-semibold uppercase tracking-wide mb-2">
              ZONES D'INTERVENTION
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Notre secteur
              </span>
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Nous vous accompagnons dans vos projets de rénovation ou d'agrandissement sur les villes suivantes :
            </p>
          </div>

          <div className="w-full columns-2 sm:columns-3 lg:columns-4 gap-x-6 lg:gap-x-8">
            {cities.map((city, index) => (
              <div key={index} className="flex items-center space-x-2.5 break-inside-avoid mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] flex-shrink-0 mt-0.5"></div>
                <span className="text-slate-800 text-sm md:text-base font-medium leading-tight">{city}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
