import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FooterSection } from '../components/footer-section';
import ProjectStepsSection from '../components/ProjectStepsSection';
import { ImageComparisonSlider } from '../components/ui/image-comparison-slider';
import GoogleReviews from '../components/GoogleReviews';
import ServicesTabbedCarousel from '../components/ServicesTabbedCarousel';
import { ProjectProcessGallery } from '../components/ProjectProcessGallery';
import { ProjectHighlightSection } from '../components/ProjectHighlightSection';
import ProjectCTASection from '../components/ProjectCTASection';
import { galleryImagesConfig } from '../data/gallery-images-config';
import { OptimizedImage } from '../components/OptimizedImage';

const ProjetSalleBainPMR: React.FC = () => {
// ... rest of component ...
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
        <title>Projet Salle de Bain PMR | Rénovation Accessible | BML Rénovation</title>
        <meta name="description" content="Découvrez notre projet de rénovation complet d'une salle de bain PMR avec aménagements accessibles, douche sécurisée et sanitaires adaptés." />
        <meta name="keywords" content="salle de bain PMR, projet rénovation, rénovation accessible, douche sécurisée, mobilité réduite" />
      </Helmet>

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/SDB%20PMR%2001.png"
            alt="Projet Salle de Bain PMR"
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
              Salle de Bain PMR
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-light">
              Une rénovation complète d'une salle de bain accessible et sécurisée
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
              <div className="text-xl md:text-2xl font-bold text-white mb-0.5">13 000€</div>
              <p className="text-white/90 font-medium text-sm">Budget du projet</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 text-center border border-white/20">
              <div className="text-xl md:text-2xl font-bold text-white mb-0.5">1 mois</div>
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
                  Les étapes de cette rénovation de salle de bain PMR
                </span>
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Cette rénovation PMR a suivi un processus méthodique en plusieurs étapes clés. Nous avons d'abord procédé à la démolition complète de l'ancienne salle de bain, puis restructuré l'espace pour créer une douche de plain-pied accessible et installer les équipements adaptés.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Ensuite, nous avons mis en place les barres d'appui renforcées, les revêtements antidérapants, et les WC surélevés. Le projet s'est achevé avec l'installation de la robinetterie thermostatique, des finitions de qualité et tous les détails de sécurité conformes aux normes PMR. Délai : 1 mois pour un résultat impeccable.
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
                    'Douche de plain-pied entièrement accessible',
                    'Installation de barres d\'appui renforcées',
                    'Pose de revêtements antidérapants',
                    'WC surélevés et adaptés à la mobilité réduite',
                    'Éclairage adapté et sécurisé',
                    'Robinetterie thermostatique pour sécurité',
                    'Sièges de douche muraux et escabeaux',
                    'Portes élargies pour accessibilité maximale',
                    'Miroir et rangements adaptés',
                    'Conformité aux normes PMR',
                    'Siphon de sol drainant avec pente adaptée',
                    'Prises électriques et commandes accessibles',
                    'Contraste des couleurs pour meilleure visibilité',
                    'Espace de manœuvre suffisant pour fauteuil roulant'
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
                    beforeImage="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2004.png"
                    afterImage="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2005.png"
                    altBefore="Salle de bain PMR avant rénovation"
                    altAfter="Salle de bain PMR après rénovation"
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
        projectSlug="salle-bain-pmr"
        title="Processus de Rénovation"
        subtitle="Découvrez les différentes étapes de ce projet de rénovation PMR"
        staticImages={galleryImagesConfig['salle-bain-pmr']}
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

      <ProjectCTASection
        title="Prêt à transformer votre salle de bain ?"
        description="Comme ce projet PMR, nous pouvons créer une salle de bain fonctionnelle, sécurisée et esthétique adaptée à vos besoins."
        subtext="Contactez-nous pour un devis gratuit et personnalisé, RDV planifié sous 24h."
        buttonText="Demander un Devis"
        onContactClick={() => {
          window.location.href = '/#contact-form';
        }}
      />

      <FooterSection onNavigateToServices={() => window.location.href = '/'} onNavigate={() => {}} />
    </div>
  );
};

export default ProjetSalleBainPMR;
