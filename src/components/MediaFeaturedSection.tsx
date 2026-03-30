import React from 'react';
import { motion } from 'framer-motion';
import MediaLogoSlideshow from './MediaLogoSlideshow';

interface MediaFeaturedSectionProps {
  title?: string;
  subtitle?: string;
}

export default function MediaFeaturedSection(): MediaFeaturedSectionProps {
  return (
    <section className="relative bg-white overflow-hidden">
      <MediaLogoSlideshow />
    </section>
  );
}
