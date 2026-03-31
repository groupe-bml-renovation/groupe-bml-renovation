import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { trackPageView, trackNavigation } from './lib/analytics';
import { generateGrenobleSeoSchemas } from './lib/seo-grenoble-schema';
import { generateGlobalSeoSchemas } from './lib/seo-global-schema';
import HeroSection from './components/ui/hero-section';
import PartnerCarouselOnly from './components/PartnerCarouselOnly';
import { heroConfigs } from './data/hero-config';
import { BMLRenovationHero } from './components/hero-gallery-demo';
const Amenagement = lazy(() => import('./components/Amenagement'));
const BoutiquesBureaux = lazy(() => import('./components/BoutiquesBureaux'));
const Appartements = lazy(() => import('./components/Appartements'));
const Chambres = lazy(() => import('./components/Chambres'));
const Chauffage = lazy(() => import('./components/Chauffage'));
const TerrasseBois = lazy(() => import('./components/TerrasseBois'));
const Piscine = lazy(() => import('./pages/Piscine'));
const MaisonsVillas = lazy(() => import('./pages/MaisonsVillas'));
const Menuiserie = lazy(() => import('./pages/Menuiserie'));
const Peinture = lazy(() => import('./pages/Peinture'));
const Amiante = lazy(() => import('./pages/Amiante'));
const BorneElectrique = lazy(() => import('./pages/BorneElectrique'));
const SallesDeBainPMR = lazy(() => import('./pages/SallesDeBainPMR'));
const Salons = lazy(() => import('./pages/Salons'));
const CuisinesRenovation = lazy(() => import('./pages/CuisinesRenovation'));
const SallesDeBain = lazy(() => import('./pages/SallesDeBain'));
const Plomberie = lazy(() => import('./pages/Plomberie'));
const Electricite = lazy(() => import('./pages/Electricite'));
const Climatisation = lazy(() => import('./pages/Climatisation'));
const RevetementsSols = lazy(() => import('./pages/RevetementsSols'));
const WallCoverings = lazy(() => import('./pages/WallCoverings'));
const EspaceVerre = lazy(() => import('./pages/EspaceVerre'));
const EtapesProjet = lazy(() => import('./components/EtapesProjet'));
const Blog = lazy(() => import('./pages/Blog'));
const DevenirArtisanPartenaire = lazy(() => import('./pages/DevenirArtisanPartenaire'));
const ConfirmationDevis = lazy(() => import('./pages/ConfirmationDevis'));
const Contact = lazy(() => import('./pages/Contact'));
const AProposPage = lazy(() => import('./pages/APropos'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'));
const ConditionsUtilisation = lazy(() => import('./pages/ConditionsUtilisation'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const ForumConverter = lazy(() => import('./pages/ForumConverter'));
const DevenirFranchisePage = lazy(() => import('./pages/DevenirFranchise'));
const PageLoader = lazy(() => import('./components/PageLoader'));

import RenovationArchitectureSection from './components/RenovationArchitectureSection';
import ProjectStepsSection from './components/ProjectStepsSection';
import SocialProofBannerGrenoble from './components/SocialProofBannerGrenoble';
import PartnersSection from './components/PartnersSection';
import { useVoiceflow } from './hooks/useVoiceflow';
import { renovationSectionsConfig } from './data/renovation-sections-config';
import { renovationSectionsConfigGrenoble } from './data/renovation-sections-config-grenoble';
import { LazyLoadingBoundary } from './components/LazyLoadingBoundary';
import NotreSecteur from './components/NotreSecteur';


const Navigation = lazy(() => import('./components/Navigation'));
const StickyDemandeCTA = lazy(() => import('./components/StickyDemandeCTA'));

const ServicesTabbedCarousel = lazy(() => import('./components/ServicesTabbedCarousel'));
const ProjectsCarousel = lazy(() => import('./components/ProjectsCarousel'));
const GoogleReviews = lazy(() => import('./components/GoogleReviews'));
const UnifiedContactForm = lazy(() => import('./components/UnifiedContactForm'));
const RenovationFinancingCalculator = lazy(() => import('./components/RenovationFinancingCalculator'));
const EbookPresentationSection = lazy(() => import('./components/EbookPresentationSection'));
const HomePageFAQ = lazy(() => import('./components/HomePageFAQ'));
const FooterSection = lazy(() => import('./components/footer-section').then(module => ({ default: module.FooterSection })));
import GEOSummary from './components/GEOSummary';
import { CheckCircle2, Zap, Shield, MapPin, Clock, Award, Hammer } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  useVoiceflow();

  const handleNavigate = (page: string, target?: string) => {
    setCurrentPage(page);
    if (target) {
      setScrollTarget(target);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    trackNavigation(page);
    trackPageView(`/${page}`, page);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get('scrollTo');
    if (scrollTo && currentPage === 'home') {
      setScrollTarget(scrollTo);
    }
  }, [location.search, currentPage]);

  useEffect(() => {
    if (scrollTarget && currentPage === 'home') {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setScrollTarget(null);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }, 100);
    }
  }, [currentPage, scrollTarget]);

  useEffect(() => {
    trackPageView(window.location.pathname, document.title);
  }, []);

  const handleNavigateToServices = (pageId?: string) => {
    setCurrentPage('home');
    setTimeout(() => {
      const servicesElement = document.getElementById('services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderPage = () => {
    if (currentPage === 'appartements') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Appartements onBack={() => handleNavigate('home')} onNavigate={(p, t) => handleNavigate(p, t)} />
        </Suspense>
      );
    }

    if (currentPage === 'boutiques-bureaux') {
      return (
        <Suspense fallback={<PageLoader />}>
          <BoutiquesBureaux onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'piscine') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Piscine onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'maisons-villas') {
      return (
        <Suspense fallback={<PageLoader />}>
          <MaisonsVillas onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'menuiserie') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Menuiserie onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'peinture') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Peinture onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'amiante') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Amiante onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'borne-electrique') {
      return (
        <Suspense fallback={<PageLoader />}>
          <BorneElectrique onBack={() => handleNavigate('home')} onNavigate={() => handleNavigate('home')} />
        </Suspense>
      );
    }

    if (currentPage === 'salons') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Salons onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'cuisines') {
      return (
        <Suspense fallback={<PageLoader />}>
          <CuisinesRenovation onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'salles-de-bain') {
      return (
        <Suspense fallback={<PageLoader />}>
          <SallesDeBain onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'plomberie') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Plomberie onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'electricite') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Electricite onBack={() => handleNavigate('home')} />
        </Suspense>
      );
    }

    if (currentPage === 'climatisation') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Climatisation onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'revetements-sols') {
      return (
        <Suspense fallback={<PageLoader />}>
          <RevetementsSols onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'espace-verre') {
      return (
        <Suspense fallback={<PageLoader />}>
          <EspaceVerre onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }


    if (currentPage === 'etapes-de-projet') {
      return (
        <Suspense fallback={<PageLoader />}>
          <EtapesProjet onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'contact') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Contact onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'apropos') {
      return (
        <Suspense fallback={<PageLoader />}>
          <AProposPage onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'faq') {
      return (
        <Suspense fallback={<PageLoader />}>
          <FAQ onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'politique-confidentialite') {
      return (
        <Suspense fallback={<PageLoader />}>
          <PolitiqueConfidentialite onBack={() => handleNavigate('home')} />
        </Suspense>
      );
    }

    if (currentPage === 'conditions-utilisation') {
      return (
        <Suspense fallback={<PageLoader />}>
          <ConditionsUtilisation onBack={() => handleNavigate('home')} />
        </Suspense>
      );
    }

    if (currentPage === 'mentions-legales') {
      return (
        <Suspense fallback={<PageLoader />}>
          <MentionsLegales onBack={() => handleNavigate('home')} />
        </Suspense>
      );
    }

    if (currentPage === 'forum-converter') {
      return (
        <Suspense fallback={<PageLoader />}>
          <ForumConverter />
        </Suspense>
      );
    }

    if (currentPage === 'devenir-franchise') {
      return (
        <Suspense fallback={<PageLoader />}>
          <DevenirFranchisePage onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'chambres') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Chambres onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'chauffage') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Chauffage onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'amenagement') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Amenagement onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'terrasse-bois') {
      return (
        <Suspense fallback={<PageLoader />}>
          <TerrasseBois onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'revetements-muraux') {
      return (
        <Suspense fallback={<PageLoader />}>
          <WallCoverings onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'salles-de-bain-pmr') {
      return (
        <Suspense fallback={<PageLoader />}>
          <SallesDeBainPMR onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'blog') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Blog onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'devenir-artisan-partenaire') {
      return (
        <Suspense fallback={<PageLoader />}>
          <DevenirArtisanPartenaire onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'a-propos') {
      return (
        <Suspense fallback={<PageLoader />}>
          <AProposPage onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'maisons-et-villas') {
      return (
        <Suspense fallback={<PageLoader />}>
          <MaisonsVillas onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    if (currentPage === 'confirmation-devis') {
      return (
        <Suspense fallback={<PageLoader />}>
          <ConfirmationDevis onBack={() => handleNavigate('home')} onNavigate={(p: string) => handleNavigate(p)} />
        </Suspense>
      );
    }

    const selectedSectionsConfig = isGrenoble ? renovationSectionsConfigGrenoble : renovationSectionsConfig;
    const selectedHeroConfig = isGrenoble ? heroConfigs.grenoble : heroConfigs.bmlRenovation;
    const canonicalUrl = isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble' : 'https://groupe-bml-renovation.fr/';
    const geoRegion = isGrenoble ? 'FR-38' : 'FR';

    const globalSeoSchemas = !isGrenoble ? generateGlobalSeoSchemas() : null;
    const grenobleSeoSchemas = isGrenoble ? generateGrenobleSeoSchemas() : null;

    return (
      <Suspense fallback={<PageLoader />}>
        <div className="min-h-screen">
          <Helmet>
            <title>{isGrenoble ? 'Rénovation Maison & Appartement Grenoble | Devis Gratuit 24h | Groupe BML' : 'Entreprise de Rénovation Maison & Appartement | Rénovation Clé en Main France | Groupe BML'}</title>
            <meta name="description" content={isGrenoble ? 'Besoin d\'une rénovation à Grenoble ? Groupe BML : interlocuteur unique pour vos travaux de maison et appartement en Isère. Artisans RGE, garantie décennale, devis détaillé sous 24h. De la conception à la réalisation.' : 'Expert en rénovation haut de gamme pour maisons et appartements depuis 10 ans. Interlocuteur unique, tous corps d\'état, finitions d\'exception. Obtenez un devis précis pour votre projet de rénovation complète.'} />
            <meta name="keywords" content={isGrenoble ? 'rénovation maison grenoble, entreprise rénovation grenoble, travaux appartement grenoble, rénovation clé en main isère, artisan bâtiment grenoble, prix rénovation m2 grenoble' : 'rénovation maison complète, entreprise rénovation appartement, rénovation haut de gamme, interlocuteur unique travaux, rénovation clé en main, coût rénovation maison'} />
            <meta property="og:title" content={isGrenoble ? 'Experts Rénovation Grenoble & Isère | Groupe BML' : 'Rénovation Maison & Appartement de Prestige | Groupe BML'} />
            <meta property="og:description" content={isGrenoble ? 'Transformez votre habitat à Grenoble avec un expert local. 300+ réalisations, devis gratuit 24h.' : 'Solutions de rénovation globale pour particuliers et professionnels. Qualité artisanale certifiée.'} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={isGrenoble ? 'Rénovation Grenoble | Groupe BML' : 'Rénovation Prestige | Groupe BML'} />
            <meta name="twitter:description" content={isGrenoble ? 'Votre projet de rénovation à Grenoble clé en main. Contactez-nous pour une visite sous 24h.' : 'Entreprise de rénovation tous corps d\'état. Expertise et finitions haut de gamme.'} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="language" content="fr" />
            <meta name="geo.region" content={geoRegion} />
            <link rel="preload" href="/videos/hero-video.mp4" as="video" type="video/mp4" />
            {!isGrenoble && globalSeoSchemas && (
              <>
                <script type="application/ld+json">
                  {JSON.stringify(globalSeoSchemas.organizationSchema)}
                </script>
                <script type="application/ld+json">
                  {JSON.stringify(globalSeoSchemas.localBusinessSchema)}
                </script>
                <script type="application/ld+json">
                  {JSON.stringify(globalSeoSchemas.serviceCatalogSchema)}
                </script>
              </>
            )}
            {isGrenoble && grenobleSeoSchemas && (
              <>
                <script type="application/ld+json">
                  {JSON.stringify(grenobleSeoSchemas.localBusinessSchema)}
                </script>
                <script type="application/ld+json">
                  {JSON.stringify(grenobleSeoSchemas.maisionServiceSchema)}
                </script>
                <script type="application/ld+json">
                  {JSON.stringify(grenobleSeoSchemas.appartementServiceSchema)}
                </script>
                <script type="application/ld+json">
                  {JSON.stringify(grenobleSeoSchemas.faqSchema)}
                </script>
              </>
            )}
          </Helmet>
          <HeroSection
            videoUrl={selectedHeroConfig.videoUrl}
            badgeText={selectedHeroConfig.badgeText}
            mainHeadlinePrefix={selectedHeroConfig.mainHeadlinePrefix}
            mainHeadlineLineBreak={selectedHeroConfig.mainHeadlineLineBreak}
            rotatingTitles={selectedHeroConfig.rotatingTitles}
            subheadline={selectedHeroConfig.subheadline}
            reviewText={selectedHeroConfig.reviewText}
            reviewStars={selectedHeroConfig.reviewStars}
            reviewLink={selectedHeroConfig.reviewLink}
            primaryHeading={selectedHeroConfig.primaryHeading}
          />
          <PartnerCarouselOnly />

          <SocialProofBannerGrenoble />
          <RenovationArchitectureSection content={selectedSectionsConfig[0]} />

          <NotreSecteur />

          <LazyLoadingBoundary delay={isGrenoble ? 1200 : 500}>
            <ServicesTabbedCarousel
              onNavigate={!isGrenoble ? handleNavigate : () => { }}
              headerText="NOS SERVICES"
              title="Quels types de travaux recherchez-vous ?"
              description="Explorez nos services adaptés à vos besoins spécifiques"
              isGrenoble={isGrenoble}
            />
          </LazyLoadingBoundary>


          <ProjectStepsSection onNavigate={handleNavigate} />

          <LazyLoadingBoundary delay={isGrenoble ? 1800 : 1000}>
            <ProjectsCarousel onNavigate={handleNavigate} />
          </LazyLoadingBoundary>

          <RenovationArchitectureSection content={selectedSectionsConfig[4]} />

          <SocialProofBannerGrenoble />

          <LazyLoadingBoundary delay={isGrenoble ? 2300 : 1500}>
            <PartnersSection scrollDirection="right" slowAnimation={true} />
            <PartnersSection showHeader={false} reducedPadding={true} slowAnimation={true} />
            <PartnersSection
              scrollDirection="right"
              title="Nos certifications qui protègent votre projet"
              description="Nos équipes disposent de certifications reconnues en rénovation, chauffage, solaire, ventilation et électricité. Pour vous, cela veut dire des travaux plus sûrs, plus fiables, et réalisés par des professionnels qualifiés."
              topSpacing="mt-8"
              slowAnimation={false}
              partners={[
                { name: 'RGE', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', description: 'Entreprise certifiée et qualifiée RGE' },
                { name: 'Pompe à chaleur', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', description: 'Installateur qualifié pompe à chaleur certifié' },
                { name: 'Solaire', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png', description: 'Installateur qualifié solaire certifié' },
                { name: 'Chauffage bois', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png', description: 'Spécialiste qualifié chauffage bois' },
                { name: 'Chauffage HP', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png', description: 'Chauffage haute performance qualifié' },
                { name: 'Ventilation', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png', description: 'Ventilation qualifiée et certifiée' },
                { name: 'Fluides', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', description: 'Attestation qualifiée capacité fluides' },
                { name: 'Électricité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', description: 'Entreprise électricité qualifiée et certifiée' },
                { name: 'Manipulation fluide', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', description: 'Manipulation fluide qualifiée et certifiée' },
                { name: 'Gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png', description: 'Professionnel qualifié du gaz' },
                { name: 'Installation gaz', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png', description: 'Installation gaz conforme et qualifiée' },
                { name: 'Bâtiment', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', description: 'Entreprise bâtiment qualifiée et certifiée' },
                { name: 'Qualité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', description: 'Label qualité reconnu et agréé' },
                { name: 'Accessibilité', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', description: 'Accessibilité handicap qualifiée' },
                { name: 'PMR', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', description: 'Adaptation qualifiée logement PMR' },
                { name: 'Artisan', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', description: 'Artisan qualifié et enregistré' }
              ]}
            />
          </LazyLoadingBoundary>

          <LazyLoadingBoundary delay={isGrenoble ? 2800 : 2000}>
            <GoogleReviews />
          </LazyLoadingBoundary>

          <LazyLoadingBoundary delay={isGrenoble ? 3300 : 2500}>
            <UnifiedContactForm />
          </LazyLoadingBoundary>

          <LazyLoadingBoundary delay={isGrenoble ? 3800 : 3000}>
            <HomePageFAQ />
          </LazyLoadingBoundary>

          <LazyLoadingBoundary delay={isGrenoble ? 4300 : 3500}>
            <RenovationFinancingCalculator />
          </LazyLoadingBoundary>

          <LazyLoadingBoundary delay={isGrenoble ? 4800 : 4000}>
            <EbookPresentationSection />
          </LazyLoadingBoundary>

          <LazyLoadingBoundary delay={isGrenoble ? 5300 : 4500}>
            <FooterSection onNavigateToServices={handleNavigateToServices} onNavigate={handleNavigate} />
          </LazyLoadingBoundary>
        </div>
      </Suspense>
    );
  };


  return (
    <div className="w-full overflow-x-hidden">
      <PageLoader />
      <Suspense fallback={null}>
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </Suspense>
      <Suspense fallback={null}>
        <StickyDemandeCTA currentPage={currentPage} onNavigate={handleNavigate} isGrenoble={isGrenoble} />
      </Suspense>
      <div className="w-full overflow-x-hidden">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
