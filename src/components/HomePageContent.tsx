import React from 'react';
import { heroConfigs } from '../data/hero-config';
import { renovationSectionsConfig } from '../data/renovation-sections-config';
import HeroSection from './ui/hero-section';
import SocialProofBannerHome from './SocialProofBannerHome';
import RenovationArchitectureSection from './RenovationArchitectureSection';
import InfiniteCarouselSection from './InfiniteCarouselSection';
import ExpertiseSection from './ExpertiseSection';
import StatsSection from './StatsSection';
import GoogleReviews from './GoogleReviews';
import UnifiedContactForm from './UnifiedContactForm';
import CTASection from './CTASection';
import { FooterSection } from './footer-section';
import ProjectStepsSection from './ProjectStepsSection';

interface HomePageContentProps {
  onNavigate?: (page: string) => void;
  showContactForm?: boolean;
  showFooter?: boolean;
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  onNavigate,
  showContactForm = true,
  showFooter = true
}) => {
  const handleNavigateToServices = (pageId?: string) => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        videoUrl={heroConfigs.bmlRenovation.videoUrl}
        badgeText={heroConfigs.bmlRenovation.badgeText}
        mainHeadlinePrefix={heroConfigs.bmlRenovation.mainHeadlinePrefix}
        mainHeadlineLineBreak={heroConfigs.bmlRenovation.mainHeadlineLineBreak}
        rotatingTitles={heroConfigs.bmlRenovation.rotatingTitles}
        subheadline={heroConfigs.bmlRenovation.subheadline}
      />
      <SocialProofBannerHome />
      <RenovationArchitectureSection content={renovationSectionsConfig[0]} />
      <InfiniteCarouselSection />
      <ExpertiseSection />
      <GoogleReviews />
      {showContactForm && <UnifiedContactForm />}
      <StatsSection onNavigate={onNavigate} />
      <ProjectStepsSection onNavigate={onNavigate} />
      <SocialProofBannerHome />
      <CTASection />
      {showFooter && <FooterSection onNavigateToServices={handleNavigateToServices} onNavigate={onNavigate} />}
    </div>
  );
};
