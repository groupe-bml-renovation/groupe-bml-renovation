import React from 'react';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** The base path to the image without extension (e.g. '/assets/hero-image') */
  srcBase: string;
  /** The original extension of the image (e.g. 'png' or 'jpg'). Do not include the dot. */
  originalExt?: string;
  /** Alt text is required for accessibility */
  alt: string;
  /** Optional class name for styling both the picture element and fallback img */
  className?: string;
  /** Optional class name specifically for the img tag */
  imgClassName?: string;
}

/**
 * ResponsiveImage seamlessly replaces an <img /> tag with a <picture> element 
 * to serve modern formats (AVIF, WebP) while keeping a PNG/JPG fallback.
 * 
 * Usage example instead of <img src="/images/hero.png" />:
 * <ResponsiveImage 
 *    srcBase="/images/hero" 
 *    originalExt="png" 
 *    alt="Hero Background" 
 *    className="w-full h-auto object-cover" 
 * />
 */
export function ResponsiveImage({ 
  srcBase, 
  originalExt = 'png', 
  alt, 
  className = '', 
  imgClassName = '',
  loading = 'lazy',
  ...props 
}: ResponsiveImageProps) {
  // Construct paths
  const avifSrc = `${srcBase}.avif`;
  const webpSrc = `${srcBase}.webp`;
  const fallbackSrc = `${srcBase}.${originalExt}`;

  return (
    <picture className={className}>
      {/* 1. Browser checks if AVIF is supported */}
      <source srcSet={avifSrc} type="image/avif" />
      
      {/* 2. If AVIF isn't supported, browser checks WebP */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* 3. Fallback to standard formats for older browsers */}
      <img
        src={fallbackSrc}
        alt={alt}
        className={`${className} ${imgClassName}`.trim()}
        loading={loading}
        {...props}
      />
    </picture>
  );
}

export default ResponsiveImage;
