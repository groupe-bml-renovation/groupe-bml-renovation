import React from 'react';
import { motion } from 'framer-motion';
import DemandDevisForm from './DemandDevisForm';
import ImageModal from './ImageModal';

const certifications = [
  { name: 'RGE', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', desc: 'Qualité RGE' },
  { name: 'Pompe à chaleur', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', desc: 'Expert PAC' },
  { name: 'Solaire', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png', desc: 'Certifié Solaire' },
  { name: 'Chauffage bois', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png', desc: 'Spécialiste Bois' },
  { name: 'Chauffage HP', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png', desc: 'Chauffage HP' },
  { name: 'Ventilation', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png', desc: 'Expertise Vent' },
  { name: 'Fluides', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', desc: 'Agréé Fluides' },
  { name: 'Électricité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', desc: 'Artisan Élec' },
  { name: 'Manipulation fluide', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', desc: 'Certifié Fluides' },
  { name: 'Gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png', desc: 'Agréé Gaz' },
  { name: 'Installation gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png', desc: 'Conformité Gaz' },
  { name: 'Bâtiment', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', desc: 'Artisan Bâtiment' },
  { name: 'Qualité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', desc: 'Engagement Qualité' },
  { name: 'Accessibilité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', desc: 'Accessibilité' },
  { name: 'PMR', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', desc: 'Spécialiste PMR' },
  { name: 'Artisan', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', desc: 'Artisan Qualifié' }
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
  { name: 'Brun', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/233f5492189448a4f76cf952714f_gmen2x%20(1).png' },
  { name: 'Espaces Alpins', logoUrl: 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20logo%20image.png' }
];

export default function UnifiedContactForm() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState({ url: '', alt: '' });

  const openModal = (url: string, alt: string) => {
    setModalImage({ url, alt });
    setModalOpen(true);
  };

  return (
    <div id="contact-form" className="bg-white text-gray-900 py-12 lg:py-20 px-6 sm:px-10 lg:px-12 flex flex-col items-center">
      <ImageModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        imageUrl={modalImage.url} 
        imageAlt={modalImage.alt} 
      />
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
 
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-center text-slate-700 leading-relaxed text-lg">
                Après réception du devis, vous aurez une <strong>estimation détaillée</strong> de vos travaux de rénovation.
              </p>

              <p className="text-center text-slate-700 leading-relaxed text-lg">
                Avec toutes les mesures, des photos avant/après, ainsi que le <strong>plan d’exécution</strong> des travaux avec toutes les étapes du projet.
              </p>

              <p className="text-center text-[#38bdf8] font-bold text-xl leading-relaxed">
                5% de remise pour toute demande de devis en ligne.
              </p>

              <p className="text-center text-[#38bdf8] font-bold text-xl leading-relaxed">
                Accompagnement d’architecte en décoration et choix des matériaux offert pour tout devis signé.
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
              <span className="block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-2">
                Nos certifications
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  Nos certifications et qualifications
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => openModal(cert.logoUrl, cert.name)}
                  className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <img 
                    src={cert.logoUrl} 
                    alt={cert.name} 
                    className="h-10 md:h-12 w-auto mb-3 object-contain transition-transform duration-300 group-hover:scale-110" 
                  />
                  <p className="text-[10px] md:text-xs font-semibold text-slate-600 leading-tight">{cert.desc}</p>
                </motion.div>
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
              <span className="block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-2">
                DES PRODUITS DE QUALITÉ POUR VOTRE PROJET
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  Nos partenaires de confiance
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4">
              {partenaires.map((partner, index) => (
                <div 
                  key={index} 
                  title={partner.name} 
                  onClick={() => openModal(partner.logoUrl, partner.name)}
                  className="flex items-center justify-center p-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-20"
                >
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="h-8 sm:h-10 lg:h-12 max-w-[85%] w-auto object-contain transition-all duration-500 group-hover:scale-105" 
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
