import React from 'react';
import { mediaLogos } from '../data/media-logos';

interface MediaLogoSlideshowProps {
  logos?: typeof mediaLogos;
}

export default function MediaLogoSlideshow({ logos = mediaLogos }: MediaLogoSlideshowProps) {
  return (
    <div className="w-full relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="relative flex items-center justify-center">
          <div className="relative z-10 w-full flex items-center justify-center">
            <div className="w-full overflow-hidden">
              <div
                className="flex gap-8 animate-scroll-logos"
                style={{ animation: `scroll-logos ${logos.length * 0.15}s linear infinite` }}
              >
                {logos.map((logo, index) => (
                  <div
                    key={`logo-${index}`}
                    className="flex-shrink-0 w-40 h-20 flex items-center justify-center rounded-lg overflow-hidden bg-white p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                  >
                    <img
                      src={logo.logoUrl}
                      alt={logo.name}
                      className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-500"
                      decoding="async"
                    />
                  </div>
                ))}
                {logos.map((logo, index) => (
                  <div
                    key={`logo-duplicate-${index}`}
                    className="flex-shrink-0 w-40 h-20 flex items-center justify-center rounded-lg overflow-hidden bg-white p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                  >
                    <img
                      src={logo.logoUrl}
                      alt={logo.name}
                      className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-500"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-logos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 16px));
          }
        }

        .animate-scroll-logos {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
