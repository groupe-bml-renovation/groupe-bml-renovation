import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import ProjectStepsSection from '../components/ProjectStepsSection';
import { ImageComparisonSlider } from '../components/ui/image-comparison-slider';
import GoogleReviews from '../components/GoogleReviews';
import ServicesTabbedCarousel from '../components/ServicesTabbedCarousel';
import { ProjectProcessGallery } from '../components/ProjectProcessGallery';
import { ProjectHighlightSection } from '../components/ProjectHighlightSection';
import { galleryImagesConfig } from '../data/gallery-images-config';
import { OptimizedImage } from '../components/OptimizedImage';

const ProjetRenovationBureau: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Projet Rénovation Bureau | Bureau Professionnel Complet | BML Rénovation</title>
        <meta name="description" content="Découvrez notre projet de rénovation complète d'un bureau professionnel avec aménagement de WC et salle de bain, revêtements haut de gamme, éclairage LED intégré et aménagements ergonomiques." />
        <meta name="keywords" content="rénovation bureau, rénovation professionnelle, aménagement bureau, WC salle de bain, espace de travail moderne" />
      </Helmet>

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%20Hero%20-%20After.png"
            alt="Projet Rénovation Bureau"
            className="w-full h-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-900/70" />
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight tracking-wide">
              Rénovation Bureau Complet
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-light">
              Une rénovation complète d'un espace professionnel avec aménagement de WC et salle de bain
            </p>
            <div className="w-24 h-1 bg-[#38bdf8] mx-auto rounded-full" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 pb-8 px-6 w-full"
        >
          <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 text-center border border-white/20">
              <div className="text-xl md:text-2xl font-bold text-white mb-0.5">62 000€</div>
              <p className="text-white/90 font-medium text-sm">Budget du projet</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 text-center border border-white/20">
              <div className="text-xl md:text-2xl font-bold text-white mb-0.5">4 mois</div>
              <p className="text-white/90 font-medium text-sm">Durée de réalisation</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="pt-16 md:pt-20 pb-0 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  Les étapes de cette rénovation de bureau professionnel
                </span>
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Cette rénovation bureau haut de gamme a suivi un processus méthodique en plusieurs étapes clés. Nous avons d'abord procédé à l'analyse complète de l'espace existant, puis restructuré le layout pour créer des zones fonctionnelles optimales. Les aménagements ont été pensés pour créer un espace professionnel ergonomique et accueillant.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Ensuite, nous avons installé les équipements sanitaires (WC et salle de bain) en conformité avec les normes, mis en place des revêtements haut de gamme et intégré un système d'éclairage LED professionnel pour optimiser la productivité. Le projet s'est achevé avec les aménagements ergonomiques, les finitions de qualité premium et tous les équipements modernes pour un espace de travail d'exception. Délai total : 4 mois pour un résultat impeccable.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 h-full md:h-auto md:min-h-[600px]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Les travaux réalisés</h3>
                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                  {[
                    'Restructuration complète de l\'espace bureautique',
                    'Reconfiguration des zones de travail et circulation',
                    'Aménagement d\'un WC moderne et fonctionnel',
                    'Installation complète d\'une salle de bain',
                    'Revêtements muraux haut de gamme et modernes',
                    'Revêtement de sol en matériaux premium',
                    'Système d\'éclairage LED professionnel intégré',
                    'Installation électrique complète et aux normes',
                    'Chauffage et climatisation adaptés au confort professionnel',
                    'Aménagements ergonomiques pour espaces de travail',
                    'Portes et cloisons vitrées pour luminosité',
                    'Finitions et détails de qualité',
                    'Système de plomberie moderne et sécurisé',
                    'Peinture intérieure premium et finitions décoratives'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-3 h-3 rounded-full bg-[#38bdf8] flex-shrink-0 mt-2" />
                      <span className="text-base text-slate-700 leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Avant / Après</h3>
                <div className="flex-1 flex items-stretch">
                  <ImageComparisonSlider
                    beforeImage="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%20Hero%20-%20After.png"
                    afterImage="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2003%20-%20Before.png"
                    altBefore="Bureau avant rénovation"
                    altAfter="Bureau après rénovation"
                    className="w-full"
                    maxHeight="100%"
                    minHeight="100%"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      <ProjectProcessGallery
        projectSlug="renovation-bureau"
        title="Processus de Rénovation"
        subtitle="Découvrez les différentes étapes de ce projet de rénovation de bureau professionnel"
        staticImages={galleryImagesConfig['renovation-bureau']}
      />

      <GoogleReviews />

      <ServicesTabbedCarousel
        onNavigate={() => {}}
        headerText="NOS SERVICES"
        title="Quels types de travaux recherchez-vous ?"
        description="Explorez nos services adaptés à vos besoins spécifiques"
        showTabs={true}
        isGrenoble={false}
      />

      <ProjectStepsSection onNavigate={() => {}} />

      <FooterSection onNavigateToServices={() => window.location.href = '/'} onNavigate={() => {}} />
    </div>
  );
};

export default ProjetRenovationBureau;
