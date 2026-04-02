import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  videoUrl: string;
  badgeText: string;
  mainHeadlinePrefix: string;
  mainHeadlineLineBreak: string;
  rotatingTitles: string[];
  subheadline: string;
  reviewText?: string;
  reviewStars?: number;
  reviewLink?: string;
  primaryHeading?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoUrl,
  badgeText,
  mainHeadlinePrefix,
  mainHeadlineLineBreak,
  rotatingTitles,
  subheadline,
  reviewText = "Excellent",
  reviewStars = 5,
  reviewLink = "#",
  primaryHeading
}) => {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === rotatingTitles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, rotatingTitles]);

  return (
    <section className="relative h-[100dvh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <video
        key={videoUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-700"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        {...({ fetchPriority: "high" } as any)}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {primaryHeading && (
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
            {primaryHeading}
          </h2>
        )}
        <div className="mb-0">
          <span className="inline-block text-[#38bdf8] text-[11px] min-[375px]:text-[13px] sm:text-base font-medium tracking-wider sm:tracking-widest whitespace-nowrap mb-6">
            {badgeText}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <span className="text-white">
              {mainHeadlinePrefix}
              <br />
              {mainHeadlineLineBreak}
              <br />
            </span>
            <span className="bg-gradient-to-r from-[#38bdf8] via-green-400 to-yellow-400 bg-clip-text text-transparent">
              <span className="relative flex w-full justify-center overflow-hidden text-center h-12 md:h-16">
                {rotatingTitles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold bg-gradient-to-r from-[#38bdf8] from-30% via-gray-200 via-70% to-gray-400 bg-clip-text text-transparent whitespace-nowrap"
                    initial={{ opacity: 0, y: window.innerWidth < 768 ? 0 : "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: window.innerWidth < 768 ? 0 : (titleNumber > index ? -80 : 80),
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </span>
          </h1>

          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-8 lg:space-y-4">
            <div>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed px-4">
                {subheadline.split('\n\n')[0]}
              </p>
            </div>
            <div>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed px-4">
                {subheadline.split('\n\n')[1]}
              </p>
            </div>

            <motion.a
              href={reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: window.innerWidth < 768 ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex flex-col items-center justify-center gap-3 sm:gap-4 pt-4"
            >
              <svg className="h-10 w-auto sm:h-12" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
                <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
                <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
                <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
                <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
                <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4" />
              </svg>

              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <span className="text-white font-semibold text-lg sm:text-xl">
                  {reviewText}
                </span>
                <div className="flex gap-1">
                  {[...Array(reviewStars)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
