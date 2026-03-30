'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title: string;
  date: string;
  scrollToExpand: string;
  textBlend?: boolean;
  children: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType,
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.8, 0.4]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const mediaScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ scale, opacity }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${bgImageSrc}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <motion.div className="absolute inset-0" style={{ scale: mediaScale, opacity: mediaOpacity }}>
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img src={mediaSrc} alt={title} className="w-full h-full object-cover" />
          )}
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ y }}
          >
            {title}
          </motion.h1>

          <motion.div
            className="text-lg md:text-xl text-white/75 font-medium"
            style={{ y }}
          >
            {scrollToExpand}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className={`relative z-20 bg-white px-6 py-16 md:py-24 ${textBlend ? 'bg-gradient-to-b from-white/95 to-white' : ''}`}
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-6xl mx-auto">{children}</div>
      </motion.div>

      <div className="h-96" />
    </div>
  );
};

export default ScrollExpandMedia;
