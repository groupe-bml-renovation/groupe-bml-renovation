import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logoUrl: string;
  description?: string;
}

const defaultPartners: Partner[] = [
  { name: 'RGE', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', description: 'Label Qualité RGE' },
  { name: 'Pompe à chaleur', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', description: 'Expert Pompe à Chaleur' },
  { name: 'Solaire', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png', description: 'Certifié Solaire' },
  { name: 'Chauffage bois', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png', description: 'Spécialiste Chauffage Bois' },
  { name: 'Chauffage HP', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png', description: 'Chauffage Haute Performance' },
  { name: 'Ventilation', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png', description: 'Expertise Ventilation' },
  { name: 'Fluides', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', description: 'Agréé Fluides Frigorigènes' },
  { name: 'Électricité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', description: 'Artisan Électricien Qualifié' },
  { name: 'Manipulation fluide', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', description: 'Certifié Manipulation Fluides' },
  { name: 'Gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png', description: 'Professionnel Agréé Gaz' },
  { name: 'Installation gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png', description: 'Conformité Gaz' },
  { name: 'Bâtiment', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', description: 'Artisan Bâtiment Qualifié' },
  { name: 'Qualité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', description: 'Engagement Qualité' },
  { name: 'Accessibilité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', description: 'Accessibilité & Handicap' },
  { name: 'PMR', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', description: 'Spécialiste Logement PMR' },
  { name: 'Artisan', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', description: 'Artisan Qualifié' }
];

export default function PartnerCarouselOnly() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const PartnerCard = ({ partner }: { partner: Partner }) => (
    <div className="flex-shrink-0 flex flex-col items-center justify-center p-3 bg-transparent transition-all duration-300 w-36 h-28 gap-2 cursor-pointer group">
      <img
        src={partner.logoUrl}
        alt={partner.name}
        className="h-10 md:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        loading="eager"
        decoding="sync"
        {...({ fetchPriority: "high" } as any)}
      />
      <span className="text-[11px] md:text-xs font-semibold text-slate-600 text-center leading-tight">
        {partner.description}
      </span>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-slate-50/50 border-y border-gray-100/50 overflow-hidden"
    >
      <div className="w-full relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 w-full flex items-center justify-center overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="scroll-container w-full overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div
              className="infinite-scroll flex gap-0 w-max items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              <div className="flex gap-0 animate-scroll items-center">
                {defaultPartners.map((partner, index) => (
                  <PartnerCard key={`set1-${index}`} partner={partner} />
                ))}
              </div>
              <div className="flex gap-0 animate-scroll items-center" aria-hidden="true">
                {defaultPartners.map((partner, index) => (
                  <PartnerCard key={`set2-${index}`} partner={partner} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
