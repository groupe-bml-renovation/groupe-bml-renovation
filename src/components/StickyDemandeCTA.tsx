import { Pen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';
import { useState, useEffect } from 'react';

interface StickyDemandeCTAProps {
  currentPage?: string;
  onNavigate?: (page: string, target?: string) => void;
  isGrenoble?: boolean;
}

const SCROLL_THRESHOLD = 400;

export default function StickyDemandeCTA({ currentPage = 'home', onNavigate, isGrenoble = false }: StickyDemandeCTAProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Force visibility to true at all times as requested
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    if (currentPage === 'home') {
      setTimeout(() => {
        const form = document.getElementById('contact-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, 50);
    } else {
      if (onNavigate) {
        onNavigate('home', 'contact-form');
      } else {
        if (isGrenoble) {
          navigate('/grenoble?scrollTo=contact-form');
        } else {
          navigate('/?scrollTo=contact-form');
        }
      }
    }
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-fit px-4 transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
    >
      <GradientCTAButton onClick={handleClick} size="sm">
        <div className="flex flex-col items-start leading-tight">
          <span className="font-semibold whitespace-nowrap">Demander un devis gratuit</span>
          <span className="text-xs font-normal opacity-90 whitespace-nowrap">Réponse sous 24h</span>
        </div>
        <div className="flex flex-col items-center">
          <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
          <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
        </div>
      </GradientCTAButton>
    </div>
  );
}
