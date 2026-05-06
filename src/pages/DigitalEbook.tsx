import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects_sorted } from '../data/projects-carousel-config';
import { Helmet } from 'react-helmet-async';
import { Phone, MapPin, BadgeCheck, Star, ArrowLeft } from 'lucide-react';
import { FooterSection } from '../components/footer-section';

const DigitalEbook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalPages = featuredProjects_sorted.length + 3; // Cover + Projects + Contact + Footer

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const pageHeight = window.innerHeight;
      const index = Math.round(scrollPos / pageHeight);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPage = (index: number) => {
    containerRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden font-sans text-white z-0">
      <Helmet>
        <title>Plaquette de Réalisation | Groupe BML Rénovation</title>
        <meta name="description" content="Découvrez nos réalisations à travers notre plaquette numérique immersive." />
      </Helmet>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-[110]">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              activeIndex === i ? 'bg-white scale-[2]' : 'bg-white/30'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <div 
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Cover Page */}
        <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-105"
            style={{ 
              backgroundImage: "url('/assets/remote/be19994d3f2be82d4404c909bd97f058.png')",
            }}
          />
          <div className="absolute inset-0 bg-black/40 z-0" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl"
          >
            <div className="font-['Outfit'] font-normal text-xl tracking-[0.4em] mb-6 uppercase">
              Groupe BML Rénovation
            </div>
            <h1 className="font-['Outfit'] text-[5rem] md:text-[8rem] font-normal tracking-[0.1em] leading-[0.9] mb-4 uppercase">
              RÉALISATIONS
            </h1>
            <p className="font-['Outfit'] text-xl md:text-2xl tracking-[0.3em] uppercase opacity-90">
              Architecture d'Intérieur & Rénovation
            </p>
            <div className="mt-16 w-24 h-[1px] bg-white mx-auto" />
            <p className="mt-8 font-['Outfit'] tracking-[0.5em] text-sm opacity-70 uppercase">
              2026 EDITION
            </p>
          </motion.div>
        </section>

        {/* Project Pages */}
        {featuredProjects_sorted.map((project, index) => (
          <section key={project.id} className="h-screen w-full snap-start relative flex flex-col md:flex-row overflow-hidden bg-white text-[#18181b]">
            {/* Vertical Title (Desktop Only) */}
            <div className="hidden lg:block absolute left-12 bottom-16 z-10 pointer-events-none">
              <span 
                className="block origin-left -rotate-90 translate-y-full text-[5rem] font-['Outfit'] font-light tracking-[0.1em] uppercase opacity-10 whitespace-nowrap"
                style={{ transformOrigin: '0 100%' }}
              >
                RÉALISATIONS
              </span>
            </div>

            {/* Left/Top: Image Side */}
            <div className="flex-1 h-[40vh] md:h-full relative overflow-hidden">
              <motion.div 
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.image}')` }}
              />
            </div>

            {/* Right/Bottom: Content Side */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative bg-white">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-block text-xs tracking-[0.2em] uppercase text-zinc-500 border-b border-zinc-200 pb-2 mb-8">
                  {project.category}
                </div>
                <h2 className="font-['Outfit'] text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-8 uppercase text-zinc-900">
                  {project.title}
                </h2>
                <p className="text-lg text-zinc-600 leading-relaxed mb-12 max-w-xl">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-8">
                  <div className="border-l-2 border-zinc-200 pl-6">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-zinc-400 mb-2">Budget</p>
                    <p className="font-['Outfit'] text-2xl font-medium text-zinc-800">{project.budget}</p>
                  </div>
                  <div className="border-l-2 border-zinc-200 pl-6">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-zinc-400 mb-2">Durée</p>
                    <p className="font-['Outfit'] text-2xl font-medium text-zinc-800">{project.duration}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))}


        {/* Final Page */}
        <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/assets/remote/10db985a7efa1e15cf326e74d5a171ed.png')",
            }}
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl w-full"
          >
            <div className="font-['Outfit'] font-normal text-xl tracking-[0.4em] mb-8 uppercase">
              Groupe BML Rénovation
            </div>
            <h2 className="font-['Outfit'] text-[4rem] md:text-[6rem] font-normal tracking-[0.1em] leading-[0.95] mb-12 uppercase">
              VOTRE PROJET <br /> COMMENCE ICI
            </h2>
            
            <div className="flex flex-col items-center gap-8 mb-12">
              <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl text-zinc-200">
                Découvrez nos réalisations en détail : photos avant/après, délais et budgets transparents sur notre site internet.
              </p>
              
              <a 
                href="/realisations" 
                className="px-10 py-5 bg-white text-black font-['Outfit'] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-transparent hover:text-white border-2 border-white hover:translate-y-[-5px]"
                onClick={(e) => {
                    e.preventDefault();
                    // Custom navigation if needed
                    window.location.href = '/realisations';
                }}
              >
                Voir nos réalisations
              </a>
            </div>

            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm">
              <span className="font-medium tracking-[0.2em] text-sm md:text-base">07 56 91 59 97 // GROUPE-BML-RENOVATION.COM</span>
            </div>
          </motion.div>
          
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="absolute top-8 left-8 z-[120] flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          >
            <span className="text-2xl transition-transform group-hover:-translate-x-1">←</span>
            <span className="uppercase tracking-widest text-xs">Retour</span>
          </button>
        </section>

        {/* Footer Section */}
        <section className="snap-start bg-white text-[#18181b]">
          <FooterSection 
            onNavigateToServices={() => window.location.href = '/'} 
            onNavigate={(p) => window.location.href = `/${p}`} 
          />
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;700&display=swap');
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      ` }} />
    </div>
  );
};

export default DigitalEbook;
