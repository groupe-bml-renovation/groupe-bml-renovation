import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Pen } from 'lucide-react';
import { GradientCTAButton } from './ui/gradient-cta-button';
import { prefetchPage } from '../lib/prefetch';


interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isGrenoble = location.pathname.includes('/grenoble');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (mobileMenuRef.current) {
        mobileMenuRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [openDropdown]);

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  const handleDropdownClick = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (page: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);

    const spaRoutes = [
      'appartements', 'maisons-et-villas', 'boutiques-bureaux', 'salons', 'cuisines', 
      'chambres', 'salles-de-bain', 'salles-de-bain-pmr', 'amenagement', 'terrasse-bois', 
      'espace-verre', 'piscine', 'a-propos', 'blog', 'faq', 'realisations', 'contact', 
      'devenir-franchise', 'devenir-artisan-partenaire', 'peinture', 'plomberie', 
      'electricite', 'climatisation', 'chauffage', 'menuiserie', 'amiante', 
      'etapes-de-projet', 'revetements-sols', 'revetements-muraux', 'borne-electrique', 'financement'
    ];

    if (spaRoutes.includes(page)) {
      const prefix = isGrenoble ? '/grenoble' : '';
      navigate(`${prefix}/${page}`);
      window.scrollTo(0, 0);
    } else if (page === 'home') {
      const prefix = isGrenoble ? '/grenoble' : '/';
      navigate(prefix);
      window.scrollTo(0, 0);
    } else {
      onNavigate(page);
    }
  };

  const handlePrefetch = (page: string) => {
    const prefix = isGrenoble ? '/grenoble' : '';
    const path = page === 'home' ? (prefix || '/') : `${prefix}/${page}`;
    prefetchPage(path);
  };

  const handleCtaClick = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renovationItems = [
    'Appartements',
    'Maisons et villas',
    'Boutiques et Bureaux'
  ];

  const espacesItems = [
    'Salons',
    'Cuisines',
    'Chambres',
    'Salles de bain',
    'Salles de bain PMR',
    'Aménagement',
    'Terrasse bois',
    'Espace Verre',
    'Installation piscine'
  ];

  const metiersItems = [
    'Peinture',
    'Plomberie',
    'Électricité',
    'Climatisation',
    'Chauffage',
    'Menuiserie',
    'Amiante',
    'Revêtements de sols',
    'Revêtements muraux',
    'Installation de borne électrique'
  ];

  const etapesItems = [
    'Consultation initiale',
    'Devis et planification',
    'Préparation du chantier',
    'Travaux de rénovation',
    'Finitions',
    'Livraison et suivi'
  ];

  return (
    <nav ref={navRef} className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-full mx-auto px-4 md:px-12 flex items-center md:justify-center">
        <button
          onClick={() => handleNavigation('home')}
          className="hover:opacity-80 transition-opacity flex items-center flex-shrink-0 md:-ml-4 -ml-2"
        >
          <img
            src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo.png"
            alt="Groupe BML Rénovation - Expert Travaux & Rénovation"
            className="h-[5rem] w-auto object-contain"
          />
        </button>

        <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
          <button
            onClick={() => handleNavigation('home')}
            onMouseEnter={() => handlePrefetch('home')}
            className={`text-sm font-medium transition-colors ${currentPage === 'home'
                ? 'text-[#38bdf8]'
                : 'text-gray-700 hover:text-[#38bdf8]'
              }`}
          >
            Accueil
          </button>

          <button
            onClick={() => handleNavigation('a-propos')}
            onMouseEnter={() => handlePrefetch('a-propos')}
            className={`text-sm font-medium transition-colors ${currentPage === 'a-propos'
                ? 'text-[#38bdf8]'
                : 'text-gray-700 hover:text-[#38bdf8]'
              }`}
          >
            À Propos
          </button>

          <div
            className="relative flex items-center"
            onMouseEnter={() => handleMouseEnter('renovation')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleDropdownClick('renovation')}
              className="text-sm font-medium transition-colors text-gray-700 hover:text-[#38bdf8] flex items-center gap-1"
            >
              Rénovation
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'renovation' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'renovation' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                {renovationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Appartements') {
                        handleNavigation('appartements');
                      } else if (item === 'Maisons et villas') {
                        handleNavigation('maisons-et-villas');
                      } else if (item === 'Boutiques et Bureaux') {
                        handleNavigation('boutiques-bureaux');
                      } else {
                        handleNavigation('services');
                      }
                    }}
                    onMouseEnter={() => {
                      if (item === 'Appartements') {
                        handlePrefetch('appartements');
                      } else if (item === 'Maisons et villas') {
                        handlePrefetch('maisons-et-villas');
                      } else if (item === 'Boutiques et Bureaux') {
                        handlePrefetch('boutiques-bureaux');
                      }
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-slate-50 hover:text-[#38bdf8] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative flex items-center"
            onMouseEnter={() => handleMouseEnter('espaces')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleDropdownClick('espaces')}
              className="text-sm font-medium transition-colors text-gray-700 hover:text-[#38bdf8] flex items-center gap-1"
            >
              Espaces
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'espaces' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'espaces' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                {espacesItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Salons') {
                        handleNavigation('salons');
                      } else if (item === 'Cuisines') {
                        handleNavigation('cuisines');
                      } else if (item === 'Chambres') {
                        handleNavigation('chambres');
                      } else if (item === 'Salles de bain') {
                        handleNavigation('salles-de-bain');
                      } else if (item === 'Salles de bain PMR') {
                        handleNavigation('salles-de-bain-pmr');
                      } else if (item === 'Aménagement') {
                        handleNavigation('amenagement');
                      } else if (item === 'Terrasse bois') {
                        handleNavigation('terrasse-bois');
                      } else if (item === 'Espace Verre') {
                        handleNavigation('espace-verre');
                      } else if (item === 'Installation piscine') {
                        handleNavigation('piscine');
                      } else {
                        handleNavigation('services');
                      }
                    }}
                    onMouseEnter={() => {
                      const mapping: Record<string, string> = {
                        'Salons': 'salons',
                        'Cuisines': 'cuisines',
                        'Chambres': 'chambres',
                        'Salles de bain': 'salles-de-bain',
                        'Salles de bain PMR': 'salles-de-bain-pmr',
                        'Aménagement': 'amenagement',
                        'Terrasse bois': 'terrasse-bois',
                        'Espace Verre': 'espace-verre',
                        'Installation piscine': 'piscine'
                      };
                      if (mapping[item]) handlePrefetch(mapping[item]);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-slate-50 hover:text-[#38bdf8] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative flex items-center"
            onMouseEnter={() => handleMouseEnter('metiers')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleDropdownClick('metiers')}
              className="text-sm font-medium transition-colors text-gray-700 hover:text-[#38bdf8] flex items-center gap-1"
            >
              Métiers
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'metiers' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'metiers' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                {metiersItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Peinture') {
                        handleNavigation('peinture');
                      } else if (item === 'Électricité') {
                        handleNavigation('electricite');
                      } else if (item === 'Installation de borne électrique') {
                        handleNavigation('borne-electrique');
                      } else if (item === 'Plomberie') {
                        handleNavigation('plomberie');
                      } else if (item === 'Climatisation') {
                        handleNavigation('climatisation');
                      } else if (item === 'Chauffage') {
                        handleNavigation('chauffage');
                      } else if (item === 'Menuiserie') {
                        handleNavigation('menuiserie');
                      } else if (item === 'Amiante') {
                        handleNavigation('amiante');
                      } else if (item === 'Revêtements de sols') {
                        handleNavigation('revetements-sols');
                      } else if (item === 'Revêtements muraux') {
                        handleNavigation('revetements-muraux');
                      } else {
                        handleNavigation('services');
                      }
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-slate-50 hover:text-[#38bdf8] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavigation('financement')}
            onMouseEnter={() => handlePrefetch('financement')}
            className={`text-sm font-medium transition-colors ${currentPage === 'financement'
                ? 'text-[#38bdf8]'
                : 'text-gray-700 hover:text-[#38bdf8]'
              }`}
          >
            Financement
          </button>

          <button
            onClick={() => handleNavigation('realisations')}
            onMouseEnter={() => handlePrefetch('realisations')}
            className={`text-sm font-medium transition-colors ${currentPage === 'realisations'
                ? 'text-[#38bdf8]'
                : 'text-gray-700 hover:text-[#38bdf8]'
              }`}
          >
            Réalisations
          </button>

          <button
            onClick={() => handleNavigation('blog')}
            onMouseEnter={() => handlePrefetch('blog')}
            className={`text-sm font-medium transition-colors ${currentPage === 'blog'
                ? 'text-[#38bdf8]'
                : 'text-gray-700 hover:text-[#38bdf8]'
              }`}
          >
            Blog
          </button>

          <button
            onClick={() => handleNavigation('faq')}
            onMouseEnter={() => handlePrefetch('faq')}
            className={`text-sm font-medium transition-colors ${currentPage === 'faq'
                ? 'text-[#38bdf8]'
                : 'text-gray-700 hover:text-[#38bdf8]'
              }`}
          >
            FAQ
          </button>

          <button
            onClick={() => handleNavigation('contact')}
            onMouseEnter={() => handlePrefetch('contact')}
            className={`text-sm font-medium transition-colors ${currentPage === 'contact'
                ? 'text-[#38bdf8]'
                : 'text-gray-700 hover:text-[#38bdf8]'
              }`}
          >
            Contact
          </button>

        </div>

        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          <a
            href="tel:0756915997"
            className="px-3 py-1.5 rounded-full border-2 border-sky-400 text-sky-400 font-semibold text-xs hover:bg-sky-50 transition-colors flex items-center gap-2 leading-tight"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <div className="flex flex-col items-start">
              <span>07 56 91 59 97</span>
              <span className="text-[10px] font-semibold opacity-90">Appel gratuit</span>
            </div>
          </a>

          <GradientCTAButton onClick={handleCtaClick} size="sm" className="px-3 py-1.5 gap-1.5">
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold text-xs whitespace-nowrap">Demander un devis gratuit</span>
              <span className="text-[10px] font-normal opacity-90 whitespace-nowrap">Réponse sous 24h</span>
            </div>
            <div className="flex flex-col items-center">
              <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
              <div className="w-6 h-0.5 bg-current rounded-full mt-0.5"></div>
            </div>
          </GradientCTAButton>
        </div>

        <div className="md:hidden ml-auto flex items-center gap-2 -mr-1">
          <a
            href="tel:0756915997"
            className="px-2.5 py-1.5 rounded-full border-2 border-sky-400 text-sky-400 font-bold text-[10px] hover:bg-sky-50 transition-colors flex items-center gap-2 leading-tight flex-shrink-0"
          >
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <div className="flex flex-col items-start">
              <span>07 56 91 59 97</span>
              <span className="text-[8px] font-semibold opacity-90 uppercase tracking-tighter">Appel gratuit</span>
            </div>
          </a>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden transition-all duration-300 ease-in-out overflow-x-hidden ${isMobileMenuOpen
            ? 'max-h-[calc(100vh-5rem)] opacity-100 border-t border-slate-200 overflow-y-auto'
            : 'max-h-0 opacity-0 overflow-hidden'
          } scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-50`}
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        {/* Mobile CTA Buttons at Top */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 space-y-2">
          <a
            href="tel:0756915997"
            className="w-full px-4 py-2 rounded-full border-2 border-sky-400 text-sky-400 font-semibold text-sm hover:bg-sky-50 transition-colors flex items-center justify-center gap-3 leading-tight"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col items-start leading-tight">
              <span>07 56 91 59 97</span>
              <span className="text-[10px] font-semibold opacity-90">Appel gratuit</span>
            </div>
          </a>

          <GradientCTAButton onClick={handleCtaClick} size="sm" className="w-full justify-center px-3 py-1.5 gap-1.5">
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold text-xs whitespace-nowrap">Demander un devis gratuit</span>
              <span className="text-[10px] font-normal opacity-90 whitespace-nowrap">Réponse sous 24h</span>
            </div>
            <div className="flex flex-col items-center">
              <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
              <div className="w-6 h-0.5 bg-current rounded-full mt-0.5"></div>
            </div>
          </GradientCTAButton>
        </div>

        <div className="px-6 py-4 bg-white space-y-4 pb-8 w-full overflow-x-hidden">
          <button
            onClick={() => handleNavigation('home')}
            className={`block w-full text-left transition-colors py-3 border-b border-slate-100 ${currentPage === 'home'
                ? 'text-[#38bdf8] font-medium'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            Accueil
          </button>

          <div>
            <button
              onClick={() => setMobileOpenDropdown(mobileOpenDropdown === 'renovation' ? null : 'renovation')}
              className="flex items-center justify-between w-full text-left transition-colors py-3 border-b border-slate-100 text-slate-600 hover:text-slate-800"
            >
              Rénovation
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenDropdown !== 'renovation' && mobileOpenDropdown !== null ? '' : 'rotate-180'}`} />
            </button>
            {mobileOpenDropdown !== 'renovation' && mobileOpenDropdown !== null ? null : (
              <div className="pl-4 mt-2 space-y-2">
                {renovationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Appartements') {
                        handleNavigation('appartements');
                      } else if (item === 'Maisons et villas') {
                        handleNavigation('maisons-et-villas');
                      } else if (item === 'Boutiques et Bureaux') {
                        handleNavigation('boutiques-bureaux');
                      } else {
                        handleNavigation('services');
                      }
                    }}
                    className="block w-full text-left py-2 md:py-1 text-base md:text-sm text-slate-500 hover:text-[#38bdf8]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileOpenDropdown(mobileOpenDropdown === 'espaces' ? null : 'espaces')}
              className="flex items-center justify-between w-full text-left transition-colors py-3 border-b border-slate-100 text-slate-600 hover:text-slate-800"
            >
              Espaces
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenDropdown !== 'espaces' && mobileOpenDropdown !== null ? '' : 'rotate-180'}`} />
            </button>
            {mobileOpenDropdown !== 'espaces' && mobileOpenDropdown !== null ? null : (
              <div className="pl-4 mt-2 space-y-2">
                {espacesItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Salons') {
                        handleNavigation('salons');
                      } else if (item === 'Cuisines') {
                        handleNavigation('cuisines');
                      } else if (item === 'Chambres') {
                        handleNavigation('chambres');
                      } else if (item === 'Salles de bain') {
                        handleNavigation('salles-de-bain');
                      } else if (item === 'Salles de bain PMR') {
                        handleNavigation('salles-de-bain-pmr');
                      } else if (item === 'Terrasse bois') {
                        handleNavigation('terrasse-bois');
                      } else if (item === 'Aménagement') {
                        handleNavigation('amenagement');
                      } else if (item === 'Espace Verre') {
                        handleNavigation('espace-verre');
                      } else if (item === 'Installation piscine') {
                        handleNavigation('piscine');
                      } else {
                        handleNavigation('services');
                      }
                    }}
                    className="block w-full text-left py-1 text-sm text-slate-500 hover:text-[#38bdf8]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileOpenDropdown(mobileOpenDropdown === 'metiers' ? null : 'metiers')}
              className="flex items-center justify-between w-full text-left transition-colors py-3 border-b border-slate-100 text-slate-600 hover:text-slate-800"
            >
              Métiers
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenDropdown !== 'metiers' && mobileOpenDropdown !== null ? '' : 'rotate-180'}`} />
            </button>
            {mobileOpenDropdown !== 'metiers' && mobileOpenDropdown !== null ? null : (
              <div className="pl-4 mt-2 space-y-2">
                {metiersItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Peinture') {
                        handleNavigation('peinture');
                      } else if (item === 'Électricité') {
                        handleNavigation('electricite');
                      } else if (item === 'Installation de borne électrique') {
                        handleNavigation('borne-electrique');
                      } else if (item === 'Plomberie') {
                        handleNavigation('plomberie');
                      } else if (item === 'Climatisation') {
                        handleNavigation('climatisation');
                      } else if (item === 'Chauffage') {
                        handleNavigation('chauffage');
                      } else if (item === 'Menuiserie') {
                        handleNavigation('menuiserie');
                      } else if (item === 'Amiante') {
                        handleNavigation('amiante');
                      } else if (item === 'Revêtements de sols') {
                        handleNavigation('revetements-sols');
                      } else if (item === 'Revêtements muraux') {
                        handleNavigation('revetements-muraux');
                      } else {
                        handleNavigation('services');
                      }
                    }}
                    className="block w-full text-left py-2 md:py-1 text-base md:text-sm text-slate-500 hover:text-[#38bdf8]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavigation('financement')}
            className={`block w-full text-left transition-colors py-3 border-b border-slate-100 ${currentPage === 'financement'
                ? 'text-[#38bdf8] font-medium'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            Financement
          </button>

          <button
            onClick={() => handleNavigation('realisations')}
            className={`block w-full text-left transition-colors py-3 border-b border-slate-100 ${currentPage === 'realisations'
                ? 'text-[#38bdf8] font-medium'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            Réalisations
          </button>

          <button
            onClick={() => handleNavigation('a-propos')}
            className={`block w-full text-left transition-colors py-3 border-b border-slate-100 ${currentPage === 'a-propos'
                ? 'text-[#38bdf8] font-medium'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            À Propos
          </button>

          <button
            onClick={() => handleNavigation('blog')}
            className={`block w-full text-left transition-colors py-3 border-b border-slate-100 ${currentPage === 'blog'
                ? 'text-[#38bdf8] font-medium'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            Blog
          </button>

          <button
            onClick={() => handleNavigation('faq')}
            className={`block w-full text-left transition-colors py-3 border-b border-slate-100 ${currentPage === 'faq'
                ? 'text-[#38bdf8] font-medium'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            FAQ
          </button>

          <button
            onClick={() => handleNavigation('contact')}
            className={`block w-full text-left transition-colors py-3 border-b border-slate-100 ${currentPage === 'contact'
                ? 'text-[#38bdf8] font-medium'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;