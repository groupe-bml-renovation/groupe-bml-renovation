import React from 'react';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { OptimizedImage } from './OptimizedImage';

interface GalleryGridCellProps extends HTMLMotionProps<'div'> {
  index: number;
}

const filterVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.08,
      ease: 'easeOut',
    },
  }),
};

const areaClasses = [
  'col-start-2 col-end-3 row-start-1 row-end-3',
  'col-start-1 col-end-2 row-start-2 row-end-4',
  'col-start-1 col-end-2 row-start-4 row-end-6',
  'col-start-2 col-end-3 row-start-3 row-end-5',
];

const GalleryGridCell = React.forwardRef<
  HTMLDivElement,
  GalleryGridCellProps
>(({ className, index, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={filterVariants}
      custom={index}
      className={cn(
        'relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300',
        areaClasses[index],
        className
      )}
      {...props}
    />
  );
});
GalleryGridCell.displayName = 'GalleryGridCell';

interface AnimatedGalleryGridProps {
  images: string[];
  imageAlts?: string[];
}

export const AnimatedGalleryGrid: React.FC<AnimatedGalleryGridProps> = ({ images, imageAlts }) => {
  const displayImages = images.slice(0, 4);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4">
        {displayImages.map((imageUrl, index) => (
          <GalleryGridCell
            key={index}
            index={index}
          >
            <OptimizedImage
              src={imageUrl}
              alt={imageAlts?.[index] || `Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
              priority={index < 2}
            />
          </GalleryGridCell>
        ))}
      </div>
    </div>
  );
};

export default AnimatedGalleryGrid;
