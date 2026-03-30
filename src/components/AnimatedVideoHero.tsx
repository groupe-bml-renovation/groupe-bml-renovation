import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface AnimatedVideoHeroProps {
  videoUrl?: string;
  overlayOpacity?: number;
}

export const AnimatedVideoHero: React.FC<AnimatedVideoHeroProps> = ({
  videoUrl = 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Renovated_Home_Video_Generation.mp4',
  overlayOpacity = 0.4,
}) => {
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => ['CLÉS EN MAIN', 'TOUT COMPRIS', 'SUR MESURE', 'QUALITÉ PRO', 'SANS SOUCI'],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <div className="relative h-80 sm:h-96 lg:h-auto w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center antialiased py-8 sm:py-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <div className="flex flex-col gap-2 sm:gap-3 max-w-4xl">
          <div className="text-center">
            <p className="text-xs sm:text-sm uppercase font-medium tracking-widest text-cyan-400 mb-1 sm:mb-2">
              RÉNOVATION TOUT CORP D'ETAT & DÉPANNAGE
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
              <span className="block">RENOVATION MAISON</span>
              <span className="block">APPARTEMENT &</span>

              <div className="relative h-10 sm:h-12 flex items-center justify-center mt-1 overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold bg-gradient-to-r from-cyan-400 from-30% via-gray-200 via-70% to-gray-400 bg-clip-text text-transparent whitespace-nowrap text-3xl sm:text-4xl"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -80 : 80,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </h1>

            <div className="max-w-2xl px-4 space-y-2 sm:space-y-3">
              <div>
                <p className="text-sm sm:text-base md:text-base lg:text-lg text-slate-300 leading-relaxed text-center">
                  Groupe BML Rénovation tout corps d'état est spécialisé dans la rénovation haut de gamme de maisons et d'appartements depuis 10 ans dans tout la France.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
