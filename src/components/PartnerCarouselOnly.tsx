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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-5 bg-white border-y border-gray-100/50 overflow-hidden"
    >
      <div className="w-full relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 w-full flex items-center justify-center overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="scroll-container w-full overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div
              className="infinite-scroll flex gap-12 md:gap-20 w-max px-10 items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              <div className="flex gap-12 md:gap-20 animate-scroll items-center">
                {defaultPartners.map((partner, index) => (
                  <div key={`set1-${index}`} className="flex-shrink-0 flex items-center justify-center">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-10 md:h-14 w-auto hover:scale-110 transition-all duration-500 cursor-pointer object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-12 md:gap-20 animate-scroll items-center" aria-hidden="true">
                {defaultPartners.map((partner, index) => (
                  <div key={`set2-${index}`} className="flex-shrink-0 flex items-center justify-center">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-10 md:h-14 w-auto hover:scale-110 transition-all duration-500 cursor-pointer object-contain"
                      loading="lazy"
                      decoding="async"
                    />
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
