import React, { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import NotFound from './components/NotFound';
import PageLoader from './components/PageLoader';

// Lazy load all page components
const Appartements = lazy(() => import('./pages/Appartements'));
const MaisonsVillas = lazy(() => import('./pages/MaisonsVillas'));
const BoutiquesBureaux = lazy(() => import('./pages/BoutiquesBureaux'));
const Salons = lazy(() => import('./pages/Salons'));
const CuisinesRenovation = lazy(() => import('./pages/CuisinesRenovation'));
const Contact = lazy(() => import('./pages/Contact'));
const AProposPage = lazy(() => import('./pages/APropos'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'));
const ConditionsUtilisation = lazy(() => import('./pages/ConditionsUtilisation'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const ForumConverter = lazy(() => import('./pages/ForumConverter'));
const Chambres = lazy(() => import('./pages/Chambres'));
const SallesDeBain = lazy(() => import('./pages/SallesDeBain'));
const SallesDeBainPMR = lazy(() => import('./pages/SallesDeBainPMR'));
const TerrasseBois = lazy(() => import('./pages/TerrasseBois'));
const EspaceVerre = lazy(() => import('./pages/EspaceVerre'));
const Piscine = lazy(() => import('./pages/Piscine'));
const DevenirFranchisePage = lazy(() => import('./pages/DevenirFranchise'));
const DevenirArtisanPartenairePage = lazy(() => import('./pages/DevenirArtisanPartenaire'));
const Peinture = lazy(() => import('./pages/Peinture'));
const EtapesProjet = lazy(() => import('./components/EtapesProjet'));
const Navigation = lazy(() => import('./components/Navigation'));
const StickyDemandeCTA = lazy(() => import('./components/StickyDemandeCTA'));
const Plomberie = lazy(() => import('./pages/Plomberie'));
const Electricite = lazy(() => import('./pages/Electricite'));
const Climatisation = lazy(() => import('./pages/Climatisation'));
const Chauffage = lazy(() => import('./pages/Chauffage'));
const Menuiserie = lazy(() => import('./pages/Menuiserie'));
const Amiante = lazy(() => import('./pages/Amiante'));
const RevetementsSols = lazy(() => import('./pages/RevetementsSols'));
const RevetementsMuraux = lazy(() => import('./pages/RevetementsMuraux'));
const BorneElectrique = lazy(() => import('./pages/BorneElectrique'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ConfirmationDevis = lazy(() => import('./pages/ConfirmationDevis'));
const Financement = lazy(() => import('./pages/Financement'));
const ProjetSalleBainPMR = lazy(() => import('./pages/ProjetSalleBainPMR'));
const ProjetFacadeMaison = lazy(() => import('./pages/ProjetFacadeMaison'));
const ProjetRenovationSejour = lazy(() => import('./pages/ProjetRenovationSejour'));
const ProjetRenovationBureau = lazy(() => import('./pages/ProjetRenovationBureau'));
const ProjetRenovationSalleDeBain = lazy(() => import('./pages/ProjetRenovationSalleDeBain'));
const RenovationSejour = lazy(() => import('./pages/RenovationSejour'));
const Realisations = lazy(() => import('./pages/Realisations'));
const Amenagement = lazy(() => import('./pages/Amenagement'));

import { initPhoneTracking } from './lib/phone-tracking';
import { useVoiceflow } from './hooks/useVoiceflow';
import './index.css';

initPhoneTracking();

const PageLayout = ({ children, currentPageName = '' }: { children: React.ReactNode; currentPageName?: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');
  const navigate = useNavigate();

  const handleNavigate = (page: string, target?: string) => {
    if (page === 'home' && target) {
      const baseUrl = isGrenoble ? '/grenoble' : '/';
      navigate(`${baseUrl}?scrollTo=${target}`);
    } else {
      if (isGrenoble) {
        navigate(page === 'home' ? '/grenoble' : `/grenoble/${page}`);
      } else {
        navigate(page === 'home' ? '/' : `/${page}`);
      }
    }
  };

  return (
    <>
      <Suspense fallback={<div className="h-16" />}>
        <Navigation
          currentPage={currentPageName}
          onNavigate={handleNavigate}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </Suspense>
      <Suspense fallback={null}>
        <StickyDemandeCTA currentPage={currentPageName} onNavigate={handleNavigate} isGrenoble={isGrenoble} />
      </Suspense>
      {children}
    </>
  );
};

const AppRouter = () => {
  const navigate = useNavigate();
  useVoiceflow();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/appartements" element={<PageLayout currentPageName="appartements"><Appartements onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/maisons-et-villas" element={<PageLayout currentPageName="maisons-et-villas"><MaisonsVillas onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/boutiques-bureaux" element={<PageLayout><BoutiquesBureaux onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/salons" element={<PageLayout><Salons onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/cuisines" element={<PageLayout><CuisinesRenovation onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/chambres" element={<PageLayout><Chambres onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/salles-de-bain" element={<PageLayout><SallesDeBain onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/salles-de-bain-pmr" element={<PageLayout><SallesDeBainPMR onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/terrasse-bois" element={<PageLayout><TerrasseBois onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/espace-verre" element={<PageLayout><EspaceVerre onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/piscine" element={<PageLayout><Piscine onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/a-propos" element={<PageLayout><AProposPage onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/devenir-franchise" element={<PageLayout><DevenirFranchisePage onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/apropos" element={<PageLayout><AProposPage onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/faq" element={<PageLayout><FAQ onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite onBack={() => navigate('/')} />} />
        <Route path="/conditions-utilisation" element={<ConditionsUtilisation onBack={() => navigate('/')} />} />
        <Route path="/mentions-legales" element={<MentionsLegales onBack={() => navigate('/')} />} />
        <Route path="/forum-converter" element={<ForumConverter />} />
        <Route path="/devenir-artisan-partenaire" element={<PageLayout><DevenirArtisanPartenairePage onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/peinture" element={<PageLayout><Peinture onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/plomberie" element={<PageLayout><Plomberie onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/electricite" element={<PageLayout><Electricite onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/chauffage" element={<PageLayout><Chauffage onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/climatisation" element={<PageLayout><Climatisation onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/menuiserie" element={<PageLayout><Menuiserie onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/amiante" element={<PageLayout><Amiante onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/borne-electrique" element={<PageLayout currentPageName="borne-electrique"><BorneElectrique onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/etapes-de-projet" element={<PageLayout><EtapesProjet onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/revetements-sols" element={<PageLayout><RevetementsSols onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/revetements-muraux" element={<PageLayout><RevetementsMuraux onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/amenagement" element={<PageLayout currentPageName="amenagement"><Amenagement onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/blog" element={<PageLayout><Blog onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/blog/:slug" element={<PageLayout><BlogPost /></PageLayout>} />
        <Route path="/confirmation-devis" element={<PageLayout currentPageName="confirmation-devis"><ConfirmationDevis onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/financement" element={<PageLayout><Financement onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/realisations" element={<PageLayout><Realisations onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/projet-salle-bain-pmr" element={<PageLayout currentPageName="projet-salle-bain-pmr"><ProjetSalleBainPMR /></PageLayout>} />
        <Route path="/projet-facade-maison" element={<PageLayout currentPageName="projet-facade-maison"><ProjetFacadeMaison /></PageLayout>} />
        <Route path="/projet-renovation-sejour" element={<PageLayout currentPageName="projet-renovation-sejour"><ProjetRenovationSejour /></PageLayout>} />
        <Route path="/projet-renovation-bureau" element={<PageLayout currentPageName="projet-renovation-bureau"><ProjetRenovationBureau /></PageLayout>} />
        <Route path="/projet-renovation-salle-de-bain" element={<PageLayout currentPageName="projet-renovation-salle-de-bain"><ProjetRenovationSalleDeBain /></PageLayout>} />
        <Route path="/renovation-sejour" element={<PageLayout currentPageName="renovation-sejour"><RenovationSejour onBack={() => navigate('/')} onNavigate={() => {}} /></PageLayout>} />

        <Route path="/grenoble" element={<App />} />
        <Route path="/grenoble/appartements" element={<PageLayout currentPageName="appartements"><Appartements onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/maisons-et-villas" element={<PageLayout currentPageName="maisons-et-villas"><MaisonsVillas onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/boutiques-bureaux" element={<PageLayout><BoutiquesBureaux onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/salons" element={<PageLayout><Salons onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/cuisines" element={<PageLayout><CuisinesRenovation onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/chambres" element={<PageLayout><Chambres onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/salles-de-bain" element={<PageLayout><SallesDeBain onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/salles-de-bain-pmr" element={<PageLayout><SallesDeBainPMR onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/terrasse-bois" element={<PageLayout><TerrasseBois onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/espace-verre" element={<PageLayout><EspaceVerre onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/piscine" element={<PageLayout><Piscine onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/a-propos" element={<PageLayout><AProposPage onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/contact" element={<PageLayout><Contact onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/devenir-franchise" element={<PageLayout><DevenirFranchisePage onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/apropos" element={<PageLayout><AProposPage onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/faq" element={<PageLayout><FAQ onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/politique-confidentialite" element={<PolitiqueConfidentialite onBack={() => navigate('/grenoble')} />} />
        <Route path="/grenoble/conditions-utilisation" element={<ConditionsUtilisation onBack={() => navigate('/grenoble')} />} />
        <Route path="/grenoble/mentions-legales" element={<MentionsLegales onBack={() => navigate('/grenoble')} />} />
        <Route path="/grenoble/devenir-artisan-partenaire" element={<PageLayout><DevenirArtisanPartenairePage onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/peinture" element={<PageLayout><Peinture onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/plomberie" element={<PageLayout><Plomberie onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/electricite" element={<PageLayout><Electricite onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/chauffage" element={<PageLayout><Chauffage onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/climatisation" element={<PageLayout><Climatisation onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/menuiserie" element={<PageLayout><Menuiserie onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/amiante" element={<PageLayout><Amiante onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/borne-electrique" element={<PageLayout currentPageName="borne-electrique"><BorneElectrique onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/etapes-de-projet" element={<PageLayout><EtapesProjet onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/revetements-sols" element={<PageLayout><RevetementsSols onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/revetements-muraux" element={<PageLayout><RevetementsMuraux onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/amenagement" element={<PageLayout currentPageName="amenagement"><Amenagement onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/blog" element={<PageLayout><Blog onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/blog/:slug" element={<PageLayout><BlogPost /></PageLayout>} />
        <Route path="/grenoble/confirmation-devis" element={<PageLayout currentPageName="confirmation-devis"><ConfirmationDevis onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/financement" element={<PageLayout><Financement onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/realisations" element={<PageLayout><Realisations onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/projet-salle-bain-pmr" element={<PageLayout currentPageName="projet-salle-bain-pmr"><ProjetSalleBainPMR /></PageLayout>} />
        <Route path="/grenoble/projet-facade-maison" element={<PageLayout currentPageName="projet-facade-maison"><ProjetFacadeMaison /></PageLayout>} />
        <Route path="/grenoble/projet-renovation-sejour" element={<PageLayout currentPageName="projet-renovation-sejour"><ProjetRenovationSejour /></PageLayout>} />
        <Route path="/grenoble/projet-renovation-bureau" element={<PageLayout currentPageName="projet-renovation-bureau"><ProjetRenovationBureau /></PageLayout>} />
        <Route path="/grenoble/projet-renovation-salle-de-bain" element={<PageLayout currentPageName="projet-renovation-salle-de-bain"><ProjetRenovationSalleDeBain /></PageLayout>} />
        <Route path="/grenoble/renovation-sejour" element={<PageLayout currentPageName="renovation-sejour"><RenovationSejour onBack={() => navigate('/grenoble')} onNavigate={() => {}} /></PageLayout>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
