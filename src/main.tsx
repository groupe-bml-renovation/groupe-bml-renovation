import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import NotFound from './components/NotFound.tsx';
import { measureComponentRenderTime } from './lib/web-vitals';
import Appartements from './components/Appartements.tsx';
import MaisonsVillas from './pages/MaisonsVillas.tsx';
import BoutiquesBureaux from './components/BoutiquesBureaux.tsx';
import Salons from './pages/Salons.tsx';
import CuisinesRenovation from './pages/CuisinesRenovation.tsx';
import Contact from './pages/Contact.tsx';
import AProposPage from './pages/APropos.tsx';
import FAQ from './pages/FAQ.tsx';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite.tsx';
import ConditionsUtilisation from './pages/ConditionsUtilisation.tsx';
import MentionsLegales from './pages/MentionsLegales.tsx';
import ForumConverter from './pages/ForumConverter.tsx';
import Chambres from './components/Chambres.tsx';
import SallesDeBain from './pages/SallesDeBain.tsx';
import SallesDeBainPMR from './pages/SallesDeBainPMR.tsx';
import TerrasseBois from './components/TerrasseBois.tsx';
import EspaceVerre from './pages/EspaceVerre.tsx';
import Piscine from './pages/Piscine.tsx';
import DevenirFranchisePage from './pages/DevenirFranchise.tsx';
import DevenirArtisanPartenairePage from './pages/DevenirArtisanPartenaire.tsx';
import Peinture from './pages/Peinture.tsx';
import EtapesProjet from './components/EtapesProjet.tsx';
import Navigation from './components/Navigation.tsx';
import StickyDemandeCTA from './components/StickyDemandeCTA.tsx';
import Plomberie from './pages/Plomberie.tsx';
import Electricite from './pages/Electricite.tsx';
import Climatisation from './pages/Climatisation.tsx';
import Chauffage from './components/Chauffage.tsx';
import Menuiserie from './pages/Menuiserie.tsx';
import Amiante from './pages/Amiante.tsx';
import RevetementsSols from './pages/RevetementsSols.tsx';
import WallCoverings from './pages/WallCoverings.tsx';
import BorneElectrique from './pages/BorneElectrique.tsx';
import Blog from './pages/Blog.tsx';
import BlogPost from './pages/BlogPost.tsx';
import ConfirmationDevis from './pages/ConfirmationDevis.tsx';
import Financement from './pages/Financement.tsx';
import ProjetSalleBainPMR from './pages/ProjetSalleBainPMR.tsx';
import ProjetFacadeMaison from './pages/ProjetFacadeMaison.tsx';
import ProjetRenovationSejour from './pages/ProjetRenovationSejour.tsx';
import ProjetRenovationBureau from './pages/ProjetRenovationBureau.tsx';
import ProjetRenovationSalleDeBain from './pages/ProjetRenovationSalleDeBain.tsx';
import RenovationSejour from './pages/RenovationSejour.tsx';
import Realisations from './pages/Realisations.tsx';
import Amenagement from './components/Amenagement.tsx';
import { initPhoneTracking } from './lib/phone-tracking.ts';
import './index.css';

initPhoneTracking();

const PageLayout = ({ children, currentPageName = '' }: { children: React.ReactNode; currentPageName?: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const handleNavigate = (page: string, target?: string) => {
    if (page === 'home' && target) {
      const baseUrl = isGrenoble ? '/grenoble' : '/';
      window.location.href = `${baseUrl}?scrollTo=${target}`;
    } else {
      if (isGrenoble) {
        window.location.href = page === 'home' ? '/grenoble' : `/grenoble/${page}`;
      } else {
        window.location.href = page === 'home' ? '/' : `/${page}`;
      }
    }
  };

  return (
    <>
      <Navigation
        currentPage={currentPageName}
        onNavigate={handleNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <StickyDemandeCTA currentPage={currentPageName} onNavigate={handleNavigate} isGrenoble={isGrenoble} />
      {children}
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/appartements" element={<PageLayout currentPageName="appartements"><Appartements onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/maisons-et-villas" element={<PageLayout currentPageName="maisons-et-villas"><MaisonsVillas onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/boutiques-bureaux" element={<PageLayout><BoutiquesBureaux onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/salons" element={<PageLayout><Salons onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/cuisines" element={<PageLayout><CuisinesRenovation onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/chambres" element={<PageLayout><Chambres onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/salles-de-bain" element={<PageLayout><SallesDeBain onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/salles-de-bain-pmr" element={<PageLayout><SallesDeBainPMR onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/terrasse-bois" element={<PageLayout><TerrasseBois onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/espace-verre" element={<PageLayout><EspaceVerre onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/piscine" element={<PageLayout><Piscine onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/a-propos" element={<PageLayout><AProposPage onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/devenir-franchise" element={<PageLayout><DevenirFranchisePage onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/apropos" element={<PageLayout><AProposPage onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/faq" element={<PageLayout><FAQ onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite onBack={() => window.location.href = '/'} />} />
        <Route path="/conditions-utilisation" element={<ConditionsUtilisation onBack={() => window.location.href = '/'} />} />
        <Route path="/mentions-legales" element={<MentionsLegales onBack={() => window.location.href = '/'} />} />
        <Route path="/forum-converter" element={<ForumConverter />} />
        <Route path="/devenir-artisan-partenaire" element={<PageLayout><DevenirArtisanPartenairePage onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/peinture" element={<PageLayout><Peinture onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/plomberie" element={<PageLayout><Plomberie onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/electricite" element={<PageLayout><Electricite onBack={() => window.location.href = '/'} /></PageLayout>} />
        <Route path="/chauffage" element={<PageLayout><Chauffage onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/climatisation" element={<PageLayout><Climatisation onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/menuiserie" element={<PageLayout><Menuiserie onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/amiante" element={<PageLayout><Amiante onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/borne-electrique" element={<PageLayout currentPageName="borne-electrique"><BorneElectrique onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/etapes-de-projet" element={<PageLayout><EtapesProjet onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/revetements-sols" element={<PageLayout><RevetementsSols onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/revetements-muraux" element={<PageLayout><WallCoverings onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/amenagement" element={<PageLayout currentPageName="amenagement"><Amenagement onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/blog" element={<PageLayout><Blog onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/blog/:slug" element={<PageLayout><BlogPost /></PageLayout>} />
        <Route path="/confirmation-devis" element={<PageLayout currentPageName="confirmation-devis"><ConfirmationDevis onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/financement" element={<PageLayout><Financement onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/realisations" element={<PageLayout><Realisations onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/projet-salle-bain-pmr" element={<PageLayout currentPageName="projet-salle-bain-pmr"><ProjetSalleBainPMR /></PageLayout>} />
        <Route path="/projet-facade-maison" element={<PageLayout currentPageName="projet-facade-maison"><ProjetFacadeMaison /></PageLayout>} />
        <Route path="/projet-renovation-sejour" element={<PageLayout currentPageName="projet-renovation-sejour"><ProjetRenovationSejour /></PageLayout>} />
        <Route path="/projet-renovation-bureau" element={<PageLayout currentPageName="projet-renovation-bureau"><ProjetRenovationBureau /></PageLayout>} />
        <Route path="/projet-renovation-salle-de-bain" element={<PageLayout currentPageName="projet-renovation-salle-de-bain"><ProjetRenovationSalleDeBain /></PageLayout>} />
        <Route path="/renovation-sejour" element={<PageLayout currentPageName="renovation-sejour"><RenovationSejour onBack={() => window.location.href = '/'} onNavigate={() => {}} /></PageLayout>} />

        <Route path="/grenoble" element={<App />} />
        <Route path="/grenoble/appartements" element={<PageLayout currentPageName="appartements"><Appartements onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/maisons-et-villas" element={<PageLayout currentPageName="maisons-et-villas"><MaisonsVillas onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/boutiques-bureaux" element={<PageLayout><BoutiquesBureaux onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/salons" element={<PageLayout><Salons onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/cuisines" element={<PageLayout><CuisinesRenovation onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/chambres" element={<PageLayout><Chambres onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/salles-de-bain" element={<PageLayout><SallesDeBain onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/salles-de-bain-pmr" element={<PageLayout><SallesDeBainPMR onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/terrasse-bois" element={<PageLayout><TerrasseBois onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/espace-verre" element={<PageLayout><EspaceVerre onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/piscine" element={<PageLayout><Piscine onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/a-propos" element={<PageLayout><AProposPage onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/contact" element={<PageLayout><Contact onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/devenir-franchise" element={<PageLayout><DevenirFranchisePage onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/apropos" element={<PageLayout><AProposPage onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/faq" element={<PageLayout><FAQ onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/politique-confidentialite" element={<PolitiqueConfidentialite onBack={() => window.location.href = '/grenoble'} />} />
        <Route path="/grenoble/conditions-utilisation" element={<ConditionsUtilisation onBack={() => window.location.href = '/grenoble'} />} />
        <Route path="/grenoble/mentions-legales" element={<MentionsLegales onBack={() => window.location.href = '/grenoble'} />} />
        <Route path="/grenoble/devenir-artisan-partenaire" element={<PageLayout><DevenirArtisanPartenairePage onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/peinture" element={<PageLayout><Peinture onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/plomberie" element={<PageLayout><Plomberie onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/electricite" element={<PageLayout><Electricite onBack={() => window.location.href = '/grenoble'} /></PageLayout>} />
        <Route path="/grenoble/chauffage" element={<PageLayout><Chauffage onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/climatisation" element={<PageLayout><Climatisation onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/menuiserie" element={<PageLayout><Menuiserie onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/amiante" element={<PageLayout><Amiante onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/borne-electrique" element={<PageLayout currentPageName="borne-electrique"><BorneElectrique onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/etapes-de-projet" element={<PageLayout><EtapesProjet onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/revetements-sols" element={<PageLayout><RevetementsSols onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/revetements-muraux" element={<PageLayout><WallCoverings onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/amenagement" element={<PageLayout currentPageName="amenagement"><Amenagement onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/blog" element={<PageLayout><Blog onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/blog/:slug" element={<PageLayout><BlogPost /></PageLayout>} />
        <Route path="/grenoble/confirmation-devis" element={<PageLayout currentPageName="confirmation-devis"><ConfirmationDevis onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/financement" element={<PageLayout><Financement onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/realisations" element={<PageLayout><Realisations onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />
        <Route path="/grenoble/projet-salle-bain-pmr" element={<PageLayout currentPageName="projet-salle-bain-pmr"><ProjetSalleBainPMR /></PageLayout>} />
        <Route path="/grenoble/projet-facade-maison" element={<PageLayout currentPageName="projet-facade-maison"><ProjetFacadeMaison /></PageLayout>} />
        <Route path="/grenoble/projet-renovation-sejour" element={<PageLayout currentPageName="projet-renovation-sejour"><ProjetRenovationSejour /></PageLayout>} />
        <Route path="/grenoble/projet-renovation-bureau" element={<PageLayout currentPageName="projet-renovation-bureau"><ProjetRenovationBureau /></PageLayout>} />
        <Route path="/grenoble/projet-renovation-salle-de-bain" element={<PageLayout currentPageName="projet-renovation-salle-de-bain"><ProjetRenovationSalleDeBain /></PageLayout>} />
        <Route path="/grenoble/renovation-sejour" element={<PageLayout currentPageName="renovation-sejour"><RenovationSejour onBack={() => window.location.href = '/grenoble'} onNavigate={() => {}} /></PageLayout>} />

        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
