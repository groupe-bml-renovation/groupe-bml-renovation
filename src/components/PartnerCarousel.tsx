import React, { useState } from 'react';

interface Partner {
  name: string;
  logoUrl: string;
  description?: string;
}

interface PartnerCarouselProps {
  partners: Partner[];
  scrollDirection?: 'left' | 'right';
  slowAnimation?: boolean;
}

export default function PartnerCarousel({ partners, scrollDirection = 'left', slowAnimation = false }: PartnerCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center group">
      <div className="relative z-10 w-full flex items-center justify-center pt-8">
        <div className="scroll-container w-full max-w-6xl overflow-x-auto scrollbar-hide">
          <div
            className="infinite-scroll flex gap-4 w-max"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            <div className={`flex gap-4 ${scrollDirection === 'right' ? (slowAnimation ? 'animate-scroll-reverse-slow' : 'animate-scroll-reverse') : (slowAnimation ? 'animate-scroll-slow' : 'animate-scroll')}`}>
              {partners.map((partner, index) => (
                <div key={`set1-${index}`} className="flex-shrink-0 w-36 flex flex-col items-center justify-center rounded-lg overflow-hidden bg-white p-2 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="h-16 flex items-center justify-center mb-2">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-500"
                      decoding="async"
                    />
                  </div>
                  {partner.description && (
                    <p className="text-center text-[10px] md:text-xs font-medium text-gray-700 leading-tight line-clamp-2">
                      {partner.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className={`flex gap-4 ${scrollDirection === 'right' ? (slowAnimation ? 'animate-scroll-reverse-slow' : 'animate-scroll-reverse') : (slowAnimation ? 'animate-scroll-slow' : 'animate-scroll')}`} aria-hidden="true">
              {partners.map((partner, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-36 flex flex-col items-center justify-center rounded-lg overflow-hidden bg-white p-2 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="h-16 flex items-center justify-center mb-2">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-500"
                      decoding="async"
                    />
                  </div>
                  {partner.description && (
                    <p className="text-center text-[10px] md:text-xs font-medium text-gray-700 leading-tight line-clamp-2">
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
  );
}
