import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { trackPageView, trackNavigation } from './lib/analytics';
import { generateGrenobleSeoSchemas } from './lib/seo-grenoble-schema';
import HeroSection from './components/ui/hero-section';
import PartnerCarouselOnly from './components/PartnerCarouselOnly';
import { heroConfigs } from './data/hero-config';
import { BMLRenovationHero } from './components/hero-gallery-demo';
import Amenagement from './components/Amenagement';
import BoutiquesBureaux from './components/BoutiquesBureaux';
import Appartements from './components/Appartements';
import Chambres from './components/Chambres';
import Chauffage from './components/Chauffage';
import TerrasseBois from './components/TerrasseBois';
import Piscine from './pages/Piscine';
import MaisonsVillas from './pages/MaisonsVillas';
import Menuiserie from './pages/Menuiserie';
import Peinture from './pages/Peinture';
import Amiante from './pages/Amiante';
import BorneElectrique from './pages/BorneElectrique';
import SallesDeBainPMR from './pages/SallesDeBainPMR';
import Salons from './pages/Salons';
import CuisinesRenovation from './pages/CuisinesRenovation';
import SallesDeBain from './pages/SallesDeBain';
import Plomberie from './pages/Plomberie';
import Electricite from './pages/Electricite';
import Climatisation from './pages/Climatisation';
import RevetementsSols from './pages/RevetementsSols';
import WallCoverings from './pages/WallCoverings';
import EspaceVerre from './pages/EspaceVerre';
import EtapesProjet from './components/EtapesProjet';
import Blog from './pages/Blog';
import DevenirArtisanPartenaire from './pages/DevenirArtisanPartenaire';
import ConfirmationDevis from './pages/ConfirmationDevis';
import RenovationArchitectureSection from './components/RenovationArchitectureSection';
import ProjectStepsSection from './components/ProjectStepsSection';
import SocialProofBannerGrenoble from './components/SocialProofBannerGrenoble';
import PartnersSection from './components/PartnersSection';
import { useVoiceflow } from './hooks/useVoiceflow';
import { renovationSectionsConfig } from './data/renovation-sections-config';
import { renovationSectionsConfigGrenoble } from './data/renovation-sections-config-grenoble';
import Contact from './pages/Contact';
import AProposPage from './pages/APropos';
import FAQ from './pages/FAQ';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import ConditionsUtilisation from './pages/ConditionsUtilisation';
import MentionsLegales from './pages/MentionsLegales';
import ForumConverter from './pages/ForumConverter';
import DevenirFranchisePage from './pages/DevenirFranchise';
import { LazyLoadingBoundary } from './components/LazyLoadingBoundary';
import PageLoader from './components/PageLoader';
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
      return <Appartements onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'boutiques-bureaux') {
      return <BoutiquesBureaux onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'piscine') {
      return <Piscine onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'maisons-villas') {
      return <MaisonsVillas onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'menuiserie') {
      return <Menuiserie onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'peinture') {
      return <Peinture onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'amiante') {
      return <Amiante onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'borne-electrique') {
      return <BorneElectrique onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'salons') {
      return <Salons onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'cuisines') {
      return <CuisinesRenovation onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'salles-de-bain') {
      return <SallesDeBain onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'plomberie') {
      return <Plomberie onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'electricite') {
      return <Electricite onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'climatisation') {
      return <Climatisation onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'revetements-sols') {
      return <RevetementsSols onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'espace-verre') {
      return <EspaceVerre onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }


    if (currentPage === 'etapes-de-projet') {
      return <EtapesProjet onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'contact') {
      return <Contact onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'apropos') {
      return <AProposPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'faq') {
      return <FAQ onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'politique-confidentialite') {
      return <PolitiqueConfidentialite onBack={() => handleNavigate('home')} />;
    }

    if (currentPage === 'conditions-utilisation') {
      return <ConditionsUtilisation onBack={() => handleNavigate('home')} />;
    }

    if (currentPage === 'mentions-legales') {
      return <MentionsLegales onBack={() => handleNavigate('home')} />;
    }

    if (currentPage === 'forum-converter') {
      return <ForumConverter />;
    }

    if (currentPage === 'devenir-franchise') {
      return <DevenirFranchisePage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'chambres') {
      return <Chambres onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'chauffage') {
      return <Chauffage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'amenagement') {
      return <Amenagement onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'terrasse-bois') {
      return <TerrasseBois onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'revetements-muraux') {
      return <WallCoverings onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'salles-de-bain-pmr') {
      return <SallesDeBainPMR onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'blog') {
      return <Blog onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'devenir-artisan-partenaire') {
      return <DevenirArtisanPartenaire onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'a-propos') {
      return <AProposPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'maisons-et-villas') {
      return <MaisonsVillas onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'confirmation-devis') {
      return <ConfirmationDevis onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    const selectedSectionsConfig = isGrenoble ? renovationSectionsConfigGrenoble : renovationSectionsConfig;
    const selectedHeroConfig = isGrenoble ? heroConfigs.grenoble : heroConfigs.bmlRenovation;
    const canonicalUrl = isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble' : 'https://groupe-bml-renovation.fr/';
    const geoRegion = isGrenoble ? 'FR-38' : 'FR';

    const grenobleSeoSchemas = isGrenoble ? generateGrenobleSeoSchemas() : null;

    return (
      <div className="min-h-screen">
        <Helmet>
          <title>{isGrenoble ? 'Rénovation de maison à Grenoble | Groupe BML Rénovation' : 'Rénovation Maison Complète | Entreprise de Rénovation Bâtiment | BML - Travaux Artisan'}</title>
          <meta name="description" content={isGrenoble ? 'Projet de rénovation de maison à Grenoble ? Artisan certifié RGE & Décennale. RDV pour devis sous 24h avec un interlocuteur unique. Demandez un devis gratuit.' : 'Spécialisé dans la rénovation haut de gamme de maisons et d\'appartements depuis 10 ans dans tout la France.'} />
          <meta name="keywords" content={isGrenoble ? 'rénovation maison grenoble, entreprise rénovation maison grenoble, rénovation appartement grenoble, entreprise rénovation appartement grenoble, rénovation clé en main grenoble, société rénovation maison, travaux maison grenoble, entreprise travaux appartement, rénovation intérieure grenoble, rénovation extérieure grenoble' : 'rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation'} />
          <meta property="og:title" content={isGrenoble ? 'Rénovation Maison & Appartement Grenoble | 300+ Projets' : 'Rénovation Maison Complète | Entreprise de Rénovation'} />
          <meta property="og:description" content={isGrenoble ? 'Rénovation clé en main à Grenoble. 300+ projets, 10 ans d\'expérience. Devis gratuit, RDV 24h. Maison & appartement.' : 'Travaux de rénovation professionnels pour votre maison. Entreprise spécialisée en rénovation complète, intérieure et extérieure.'} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={isGrenoble ? 'Rénovation Maison Grenoble | BML' : 'Rénovation Maison Complète | BML'} />
          <meta name="twitter:description" content={isGrenoble ? 'Entreprise rénovation maison & appartement Grenoble. 300+ projets, 10 ans. Devis gratuit 24h.' : 'Entreprise de rénovation maison - Travaux de peinture, rénovation intérieure, extérieure et maison ancienne.'} />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="language" content="fr" />
          <meta name="geo.region" content={geoRegion} />
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
