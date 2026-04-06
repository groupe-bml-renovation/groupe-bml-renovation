import React from 'react';
import { motion } from 'framer-motion';
import DemandDevisForm from './DemandDevisForm';

const certifications = [
  { name: 'RGE', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png' },
  { name: 'Pompe à chaleur', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png' },
  { name: 'Solaire', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png' },
  { name: 'Chauffage bois', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png' },
  { name: 'Chauffage HP', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png' },
  { name: 'Ventilation', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png' },
  { name: 'Fluides', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png' },
  { name: 'Électricité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png' },
  { name: 'Manipulation fluide', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png' },
  { name: 'Gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png' },
  { name: 'Installation gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png' },
  { name: 'Bâtiment', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png' },
  { name: 'Qualité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png' },
  { name: 'Accessibilité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png' },
  { name: 'PMR', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png' },
  { name: 'Artisan', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png' }
];

const partenaires = [
  { name: 'Tollens', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/tollens%402x%20(1).jpg' },
  { name: 'Gauthier', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gauthier%402x.jpg' },
  { name: 'Zolpan', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/logo-partenaire-zolpan.png' },
  { name: 'Seigneurerie', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/seigneurerie%402x.jpg' },
  { name: 'Grohe', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/grohe%402x.jpg' },
  { name: 'Jacob', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/jacob%402x.jpg' },
  { name: 'Roca', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/roca%402x.jpg' },
  { name: 'Thermor', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/thermor%402x.jpg' },
  { name: 'Atlantic', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/atlantic%402x.jpg' },
  { name: 'Geberit', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/geberit%402x.jpg' },
  { name: 'Schneider', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/schneider%402x.jpg' },
  { name: 'Legrand', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/legrand%402x.jpg' },
  { name: 'Siemens', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/siemens%402x.jpg' },
  { name: 'Scrigno', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/scrigno%402x.jpg' },
  { name: 'Vachette', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/vachette%402x.jpg' },
  { name: 'Cuisinella', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/cuisinella%402x.jpg' },
  { name: 'Bricard', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/bricard%402x.jpg' },
  { name: 'Euro Wall', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/euro-wall%402x.jpg' },
  { name: 'Homs', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/homs%402x.jpg' },
  { name: 'Udirev', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/udirev%402x.jpg' },
  { name: 'Gerflor', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gerflor%402x.jpg' },
  { name: 'Quick-Step', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/quick-step%402x.jpg' },
  { name: 'Saloni', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/saloni%402x.jpg' },
  { name: 'Artens', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/artens%402x.jpg' },
  { name: 'Marazzi', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/marazzi%402x.jpg' },
  { name: 'Porcelanosa', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/porcellanosa%402x.jpg' },
  { name: 'Rexel', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/rexel-logo_mpyv5e.avif' },
  { name: 'Decoceram', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/decoceram-logo_dgsdlz.avif' },
  { name: 'Leroy Merlin', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/leroy-merlin-logo_tx0qpv.avif' },
  { name: 'Saint Maclou', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/saint-maclou-logo_nqvk1a.avif' },
  { name: 'Samse', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/samse-logo_mqsetl.avif' },
  { name: 'La Platforme', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/la-platforme-logo_zbjmrm.avif' },
  { name: 'Point P', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/point-p-logo_mq6r8c.avif' },
  { name: 'Cedeo', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/cedeo-logo_gulsqe.avif' },
  { name: 'Le Comptoir', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/le-comptoir-logo_dvd4rc.avif' },
  { name: 'Solmur', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/solmur-logo_ke5lve.avif' },
  { name: 'Forbo', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/forbo2_g4baag%20(1).jpg' },
  { name: 'LMS', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo_LMS_insta_Plan_de_travail_1_Plan_de_travail_1_c8ybfl%20(1).jpg' },
  { name: 'Brun', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/233f5492189448a4f76cf952714f_gmen2x%20(1).png' }
];

export default function UnifiedContactForm() {
  return (
    <div id="contact-form" className="bg-slate-50 text-gray-900 py-12 lg:py-20 px-6 sm:px-10 lg:px-12 flex flex-col items-center">
      <div className="max-w-[1440px] mx-auto w-full">
        
        {/* FORM SECTION (Full width/Centered) */}
        <div className="flex flex-col w-full max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6 lg:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Demande devis gratuit en quelques clics
              </span>
            </h1>
 
            <div className="space-y-4 max-w-xl mx-auto">
              <p className="text-center text-slate-700 leading-relaxed">
                Demandez votre devis et obtenez une <strong>estimation sur mesure</strong> de vos travaux de rénovation, <strong>(Réponse sous 24h)</strong>.
              </p>
 
              <p className="text-center text-slate-700 leading-relaxed">
                Dès votre demande, recevez un <strong>cadeau exclusif</strong> ainsi que notre <strong>e-book de réalisations</strong>.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border-2 border-gray-100 hover:border-[#38bdf8] p-6 sm:p-8 lg:p-10 transition-all duration-300 flex flex-col w-full shadow-lg"
          >
            <DemandDevisForm />
          </motion.div>
        </div>

        {/* LOGOS SECTION (Full Width below) */}
        <div className="w-full space-y-24">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <span className="block text-[#38bdf8] text-[10px] font-semibold uppercase tracking-wider mb-2">
                NOS CERTIFICATIONS ET QUALIFICATIONS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  Nos certifications
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-4 sm:gap-5">
              {certifications.map((cert, index) => (
                <div key={index} title={cert.name} className="flex items-center justify-center p-3 sm:p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default group overflow-hidden">
                  <img 
                    src={cert.logoUrl} 
                    alt={cert.name} 
                    className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Partenaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <span className="block text-[#38bdf8] text-[10px] font-semibold uppercase tracking-wider mb-2">
                DES PRODUITS DE QUALITÉ POUR VOTRE PROJET
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  Nos partenaires de confiance
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4">
              {partenaires.map((partner, index) => (
                <div key={index} title={partner.name} className="flex items-center justify-center p-2 sm:p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default group overflow-hidden">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="h-7 sm:h-8 lg:h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
