import React from 'react';
import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';
import { AnimatedGalleryGrid } from './AnimatedGalleryGrid';
import { OptimizedImage } from './OptimizedImage';

export interface SectionContent {
  categoryLabel: string;
  mainHeadline: {
    prefix: string;
    highlight: string;
  };
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  reverseLayout?: boolean;
  hideImage?: boolean;
  galleryImages?: string[];
  galleryImagesAlt?: string[];
  multiImageLayout?: boolean;
  landscapeImage?: boolean;
  videoUrl?: string;
  features?: Array<{ text: string }>;
  showCTA?: boolean;
  useAnimatedGallery?: boolean;
}

interface RenovationArchitectureSectionProps {
  content: SectionContent;
  isMergedFirst?: boolean;
  isMergedLast?: boolean;
  isMergedMiddle?: boolean;
  onCtaClick?: () => void;
}

export const RenovationArchitectureSection: React.FC<RenovationArchitectureSectionProps> = ({
  content,
  onCtaClick,
}) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  const imageOrder = content.reverseLayout ? 'lg:order-2' : 'lg:order-1';
  const contentOrder = content.reverseLayout ? 'lg:order-1' : 'lg:order-2';

  if (content.multiImageLayout && content.galleryImages && content.galleryImages.length > 0) {
    return (
      <section className="pb-6 bg-transparent">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:items-stretch">
            <div className="space-y-8 order-1 flex flex-col">
              <div className="space-y-6">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                    {content.categoryLabel}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">{content.mainHeadline.prefix} {content.mainHeadline.highlight}</span>
                  </h2>
                </div>

                {content.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-slate-700 leading-relaxed">
                    {renderParagraphWithHighlights(paragraph)}
                  </p>
                ))}
              </div>

              <div className="grid gap-6 grid-cols-1">
                {content.galleryImages.slice(0, 3).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-48"
                  >
                    <OptimizedImage
                      src={image}
                      alt={content.galleryImagesAlt?.[index] || `Gallery image ${index + 1}`}
                      priority={index === 0}
                    />
                  </motion.div>
                ))}
              </div>

              {content.showCTA && (
                <GradientCTAButton
                  onClick={handleCtaClick}
                  size="sm"
                >
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-semibold">Demander un devis gratuit</span>
                    <span className="text-xs font-normal opacity-90">Réponse sous 24h</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                    <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                  </div>
                </GradientCTAButton>
              )}
            </div>

            <div className="relative order-2 hidden lg:flex flex-col h-full">
              <div className="rounded-2xl overflow-hidden shadow-2xl h-full min-h-96">
                <OptimizedImage
                  src={content.imageUrl}
                  alt={content.imageAlt}
                  priority={true}
                />
              </div>
            </div>

            <div className="lg:hidden order-3 col-span-full rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src={content.imageUrl}
                alt={content.imageAlt}
                className="w-full h-screen object-cover"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (content.useAnimatedGallery && content.galleryImages && content.galleryImages.length > 0) {
    return (
      <section className="pb-12 bg-transparent">
        <div className="w-full px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 lg:items-stretch gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: contentOrder === 'lg:order-2' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`relative order-1 ${contentOrder} space-y-6`}
            >
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                  {content.categoryLabel}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">{content.mainHeadline.prefix} {content.mainHeadline.highlight}</span>
                </h2>
              </div>

              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed">
                  {renderParagraphWithHighlights(paragraph)}
                </p>
              ))}

              {content.showCTA && (
                <GradientCTAButton
                  onClick={handleCtaClick}
                  size="sm"
                >
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-semibold">Demander un devis gratuit</span>
                    <span className="text-xs font-normal opacity-90">Réponse sous 24h</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                    <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                  </div>
                </GradientCTAButton>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative order-2 ${imageOrder} flex flex-col justify-center`}
            >
              <AnimatedGalleryGrid images={content.galleryImages} imageAlts={content.galleryImagesAlt} />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-6 bg-transparent">
      <div className="w-full px-6 md:px-8 lg:px-12">
        <div className={`${content.hideImage ? '' : 'grid lg:grid-cols-2 lg:items-stretch'} gap-12 max-w-7xl mx-auto`}>
          {!content.hideImage && (
            <div
              className={`relative order-2 ${imageOrder} flex flex-col`}
            >
              <div className={`relative rounded-2xl overflow-hidden shadow-2xl flex-1 min-h-96 ${content.videoUrl ? 'lg:min-h-full' : content.landscapeImage ? 'h-96' : 'h-full'}`}>
                {content.videoUrl ? (
                  <video
                    src={content.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <OptimizedImage
                    src={content.imageUrl}
                    alt={content.imageAlt}
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                )}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, x: contentOrder === 'lg:order-2' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`relative order-1 ${contentOrder} space-y-6`}
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                {content.categoryLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">{content.mainHeadline.prefix} {content.mainHeadline.highlight}</span>
              </h2>
            </div>

            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed">
                {renderParagraphWithHighlights(paragraph)}
              </p>
            ))}

            {content.showCTA && (
              <GradientCTAButton
                onClick={handleCtaClick}
                size="sm"
              >
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-semibold">Demander un devis gratuit</span>
                  <span className="text-xs font-normal opacity-90">Réponse sous 24h</span>
                </div>
                <div className="flex flex-col items-center">
                  <Pen className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                  <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                </div>
              </GradientCTAButton>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function renderParagraphWithHighlights(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const cleanText = part.slice(2, -2);
      return (
        <span key={index} className="text-black font-medium">
          {cleanText}
        </span>
      );
    }
    return part;
  });
}

export default RenovationArchitectureSection;
