import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Calendar, Facebook, Instagram, Linkedin, ArrowRight, Pen, ShieldCheck } from 'lucide-react';
import { OptimizedImage } from '../OptimizedImage';

interface HeroSectionProps {
  videoUrl: string;
  videoUrlH265?: string;
  posterUrl?: string;
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
  videoUrlH265,
  posterUrl,
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
      setTitleNumber((prev) => (prev === rotatingTitles.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, rotatingTitles]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { });
      }
    }
  }, [videoUrl]);

  return (
    <section className="relative flex flex-col w-full bg-white font-sans">
      {/* 1. Top Area: Image/Video Banner (Matches illiCO proportion perfectly) */}
      <div className="relative w-full h-[45vh] lg:h-[520px] bg-slate-900 border-b-[6px] border-[#38bdf8] overflow-hidden">
        {posterUrl && (
          <OptimizedImage
            src={posterUrl}
            alt="Hero background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}
            priority={true}
            width={1920}
            height={1080}
          />
        )}

        <video
          key={videoUrl}
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${isVideoReady ? 'opacity-70' : 'opacity-0'
            }`}
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
          preload="auto"
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          {...({ fetchPriority: "high" } as any)}
        >
          {videoUrlH265 && <source src={videoUrlH265} type='video/mp4; codecs="hvc1"' />}
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Gradient Overlay for Text Readability in the center */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Banner Content (Centered Text over Video) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 z-10 pointer-events-none">
          {primaryHeading && (
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight pointer-events-auto text-center">
              {primaryHeading}
            </h2>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight flex flex-col items-center pointer-events-auto text-center">
            <span className="text-white">
              {mainHeadlinePrefix}
              <span className="hidden sm:inline"><br /></span>
              <span className="sm:hidden"> </span>
              {mainHeadlineLineBreak}
            </span>
            <div className="relative overflow-hidden w-[350px] sm:w-[500px] lg:w-[650px] h-10 sm:h-14 lg:h-16">
              {rotatingTitles.map((title, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-x-0 w-full flex justify-center top-0 pointer-events-none"
                  initial={{ opacity: 0, y: window.innerWidth < 1024 ? 0 : -100 }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                        y: 0,
                        opacity: 1,
                      }
                      : {
                        y: window.innerWidth < 1024 ? 0 : (titleNumber > index ? -80 : 80),
                        opacity: 0,
                      }
                  }
                >
                  <span className="font-bold bg-gradient-to-r from-[#38bdf8] from-30% via-gray-200 via-70% to-gray-400 bg-clip-text text-transparent whitespace-nowrap px-2 pt-1 pb-2">
                    {title}
                  </span>
                </motion.div>
              ))}
            </div>
          </h1>

        </div>

        {/* Action Buttons (Bottom Center on Mobile, Bottom Right on Desktop) over Banner */}
        <div className="absolute bottom-4 lg:bottom-6 inset-x-0 lg:inset-x-auto lg:right-6 flex justify-center lg:justify-end items-center gap-3 z-20 px-4 lg:px-0 pointer-events-none">
          <div className="flex gap-4 pointer-events-auto">
            <a href="tel:0756915997" className="p-3 lg:py-2.5 lg:px-5 rounded-full bg-white shadow-lg hover:scale-105 transition-transform text-[#38bdf8] font-bold border border-slate-200 flex items-center gap-2">
              <Phone className="w-5 h-5 lg:w-5 lg:h-5 text-[#38bdf8] shrink-0" />
              <span className="hidden lg:inline text-[15px] whitespace-nowrap">07 56 91 59 97</span>
            </a>
            <a href="#contact-form" className="p-3 lg:py-2.5 lg:px-5 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-white shadow-lg hover:scale-105 transition-transform font-bold uppercase flex items-center gap-2">
              <Pen className="w-5 h-5 lg:w-5 lg:h-5 shrink-0" />
              <span className="hidden lg:inline text-[15px] whitespace-nowrap">Demander un devis gratuit</span>
            </a>
          </div>
        </div>
      </div>



      {/* 2. White Section Below Banner (Matches the layout structure exactly) */}
      <div className="relative bg-white w-full border-b border-gray-200 z-30 pb-4 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-4 lg:pt-6 lg:pb-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

            <div className="flex flex-row lg:flex-col items-center lg:w-[160px] shrink-0 -mt-[20px] sm:-mt-[35px] lg:-mt-[110px] relative z-40 gap-4 lg:gap-0">
              <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] lg:w-[140px] lg:h-[140px] rounded-full shadow-xl overflow-hidden bg-white lg:mb-4 border border-slate-200 p-1 lg:p-1.5 relative shrink-0">
                <OptimizedImage 
                  src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/1%20La%20prise%20de%20rendez%20vous.png" 
                  alt="BML Rénovation" 
                  className="w-full h-full object-cover rounded-full bg-slate-50 border border-slate-100" 
                  priority={true}
                />
              </div>
              <div className="flex flex-col items-start lg:items-center mt-[20px] sm:mt-[35px] lg:mt-0">
                <h2 className="text-[16px] sm:text-[17px] font-black text-[#38bdf8] text-left lg:text-center mb-2 lg:mb-3 leading-tight tracking-wide">
                  Groupe BML <span className="lg:hidden">Rénovation</span><br className="hidden lg:block" />
                  <span className="hidden lg:inline">Rénovation</span>
                </h2>

                {/* Exact Stats List - Left Aligned, 2x2 on Mobile */}
                <div className="grid grid-cols-2 lg:flex lg:flex-col gap-x-4 gap-y-2 mt-1 w-full">
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-base font-black text-[#38bdf8]">10 ans</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">D'EXPÉRIENCE</span>
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-base font-black text-[#38bdf8]">+300</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">PROJETS RÉALISÉS</span>
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-base font-black text-[#38bdf8]">+75</span>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">Artisans <span className="uppercase">PARTENAIRES</span></span>
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-base font-black text-[#38bdf8]">01</span>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">Interlocuteur unique</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle content: Text (Using the requested old big font styles wrapped in illiCO structure) */}
            <div className="flex-1 space-y-6 pt-2">
              <div className="max-w-2xl space-y-4 sm:space-y-8 lg:space-y-4">
                {subheadline.split('\n\n').map((paragraph, index) => paragraph && (
                  <div key={index}>
                    <p 
                      className="text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <a href="/realisations" className="inline-flex items-center gap-2 text-[#38bdf8] font-black hover:text-[#0284c7] transition-colors text-base sm:text-lg">
                  Réalisations de l'agence <ArrowRight className="w-5 h-5 bg-transparent" />
                </a>
              </div>
            </div>

            {/* Right content: Contact + Reviews + Stats */}
            <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-8 pt-2">

              {/* Address and Contact Block */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#38bdf8] shrink-0" strokeWidth={1.5} />
                  <div className="text-slate-800 text-sm lg:text-[15px] leading-snug">
                    <p>5 Av. Paul Verlaine,<br />38100 Grenoble</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#38bdf8] shrink-0" strokeWidth={1.5} />
                  <div className="text-slate-800 text-sm lg:text-[15px] leading-snug">
                    <p className="font-black text-slate-900 mb-0.5">Nous sommes joignables</p>
                    <p>Du lundi au vendredi : 08h00 - 18h00</p>
                  </div>
                </div>
              </div>

              {/* Reviews Header Layout */}
              <div className="flex items-center gap-8 pt-3 pb-1 border-t border-slate-100">
                {/* Google Reviews */}
                <a href={reviewLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center p-1.5 shrink-0">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                  </div>
                  <div>
                    <div className="font-black text-[17px] text-slate-900 leading-none">4.9/5</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </a>

                {/* RGE Logos */}
                <div className="flex items-center gap-8 shrink-0 select-none">
                  <img 
                    src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/RGE.png" 
                    alt="Certification RGE" 
                    className="h-[44px] w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform" 
                  />
                  <img 
                    src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/RGE%20QUALIBAT.png" 
                    alt="Certification RGE Qualibat" 
                    className="h-[44px] w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform" 
                  />
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

