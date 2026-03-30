'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from './scroll-expansion-hero';
import { LiquidButton } from './ui/liquid-glass-button';
import { Phone } from 'lucide-react';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const bmlMediaContent: MediaContentCollection = {
  video: {
    src: 'https://res.cloudinary.com/dqgw0hcqy/video/upload/v1755825675/Untitled_design-6_dysrwp.mp4',
    poster: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    background: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    title: 'RÉNOVATION MAISON   &   APPARTEMENT',
    date: '',
    scrollToExpand: 'RÉNOVATION INTÉRIEURE',
    about: {
      overview:
        'Spécialistes en rénovation d\'appartement et maison avec 27 ans d\'excellence, nous transformons votre espace de vie avec notre savoir-faire et notre équipe d\'expert en rénovation intérieure.',
      conclusion:
        'Notre entreprise de rénovation vous accompagne dans tous vos projets de travaux de rénovation et d\'aménagement intérieur. De la rénovation complète à la rénovation partielle, nous mettons notre savoir-faire au service de votre vision.',
    },
  },
  image: {
    src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1280&h=750&dpr=2',
    background: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    title: 'RÉNOVATION MAISON   &   APPARTEMENT',
    date: '',
    scrollToExpand: 'RÉNOVATION INTÉRIEURE',
    about: {
      overview:
        'Notre entreprise de rénovation propose peinture intérieure, revêtements de sols, plomberie, électricité, menuiserie, et service d\'architecte d\'intérieur pour transformer vos espaces.',
      conclusion:
        'De l\'aménagement cuisine avec cuisine équipée à l\'aménagement des combles, nous gérons tout. Nos experts vous guident dans toutes les étapes de votre projet de rénovation clé en main.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = bmlMediaContent[mediaType];

  const scrollToContactForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='max-w-4xl mx-auto text-white'>
      <h2 className='text-3xl font-bold mb-6'>
        <span className="text-black">Transformez Votre Habitat Selon Vos Envies</span>
      </h2>
      <p className='text-lg mb-8 leading-relaxed text-black'>
        {currentMedia.about.overview}
      </p>

      <p className='text-lg mb-8 leading-relaxed text-black'>
        {currentMedia.about.conclusion}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <LiquidButton
          onClick={scrollToContactForm}
          className="text-black text-lg font-medium"
          size="xxl"
        >
          <div className="flex flex-col items-start leading-tight">
            <span className="font-semibold">Demander un devis gratuit</span>
            <span className="text-sm font-normal opacity-90">Réponse sous 24h</span>
          </div>
          <Phone className="w-6 h-6 flex-shrink-0" />
        </LiquidButton>
      </div>
    </div>
  );
};

export const BMLVideoExpansion = () => {
  const mediaType = 'video';
  const currentMedia = bmlMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const BMLImageExpansion = () => {
  const mediaType = 'image';
  const currentMedia = bmlMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const BMLDemo = () => {
  const [mediaType, setMediaType] = useState('video');
  const currentMedia = bmlMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType as 'video' | 'image'}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType as 'video' | 'image'} />
      </ScrollExpandMedia>
    </div>
  );
};

export default BMLDemo;