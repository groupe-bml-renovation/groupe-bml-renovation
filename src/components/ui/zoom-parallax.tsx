'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Image {
  src: string;
  alt: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export const ZoomParallax: React.FC<ZoomParallaxProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-white overflow-hidden ${isMobile ? 'py-8' : 'py-12'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="space-y-24">
          {images.map((image, index) => {
            const startOffset = index * 0.15;
            const endOffset = startOffset + 0.3;

            const scale = useTransform(
              scrollYProgress,
              [Math.max(0, startOffset - 0.1), startOffset, endOffset, Math.min(1, endOffset + 0.1)],
              [0.8, 1, 1.1, 0.9]
            );

            const opacity = useTransform(
              scrollYProgress,
              [Math.max(0, startOffset - 0.15), startOffset, endOffset, Math.min(1, endOffset + 0.15)],
              [0, 1, 1, 0]
            );

            const y = useTransform(
              scrollYProgress,
              [Math.max(0, startOffset - 0.1), startOffset, endOffset, Math.min(1, endOffset + 0.1)],
              [60, 0, 0, -60]
            );

            return (
              <motion.div
                key={index}
                className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  scale: isMobile ? 1 : scale,
                  opacity: isMobile ? 1 : opacity,
                  y: isMobile ? 0 : y,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
