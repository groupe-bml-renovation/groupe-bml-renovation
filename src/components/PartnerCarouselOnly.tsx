import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logoUrl: string;
  description?: string;
}

const defaultPartners: Partner[] = [
  { name: 'RGE', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', description: 'Entreprise certifiée RGE' },
  { name: 'Pompe à chaleur', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', description: 'Installateur pompe à chaleur certifié' },
  { name: 'Solaire', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png', description: 'Installateur solaire certifié' },
  { name: 'Chauffage bois', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png', description: 'Spécialiste chauffage bois' },
  { name: 'Chauffage HP', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png', description: 'Chauffage haute performance' },
  { name: 'Ventilation', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png', description: 'Ventilation certifiée' },
  { name: 'Fluides', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', description: 'Attestation capacité fluides' },
  { name: 'Électricité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', description: 'Entreprise électricité qualifiée' },
  { name: 'Manipulation fluide', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', description: 'Manipulation fluide certifiée' },
  { name: 'Gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png', description: 'Professionnel du gaz' },
  { name: 'Installation gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png', description: 'Installation gaz conforme' },
  { name: 'Bâtiment', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', description: 'Entreprise bâtiment qualifiée' },
  { name: 'Qualité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', description: 'Label qualité reconnu' },
  { name: 'Accessibilité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', description: 'Accessibilité handicap' },
  { name: 'PMR', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', description: 'Adaptation logement PMR' },
  { name: 'Artisan', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', description: 'Artisan enregistré' }
];

export default function PartnerCarouselOnly() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-3 bg-transparent overflow-hidden"
    >
      <div className="w-full relative overflow-hidden flex items-center justify-center group">
        <div className="relative z-10 w-full flex items-center justify-center overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="scroll-container w-full max-w-5xl overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'smooth', maxWidth: '100%' }}
          >
            <div
              className="infinite-scroll flex gap-4 w-max"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              <div className="flex gap-4 animate-scroll">
                {defaultPartners.map((partner, index) => (
                  <div key={`set1-${index}`} className="flex-shrink-0 w-36 flex flex-col items-center justify-center rounded-lg overflow-hidden bg-white p-2 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="h-16 flex items-center justify-center mb-2">
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {partner.description && (
                      <p className="text-center text-[10px] md:text-xs font-medium text-gray-700 leading-tight">
                        {partner.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 animate-scroll" aria-hidden="true">
                {defaultPartners.map((partner, index) => (
                  <div key={`set2-${index}`} className="flex-shrink-0 w-36 flex flex-col items-center justify-center rounded-lg overflow-hidden bg-white p-2 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="h-16 flex items-center justify-center mb-2">
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {partner.description && (
                      <p className="text-center text-[10px] md:text-xs font-medium text-gray-700 leading-tight">
                        {partner.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
