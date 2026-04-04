import React from 'react';

export interface SrcSetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Base path to the image without extension or width suffix (e.g., '/images/hero') */
  srcBase: string;
  /** The original format extension (e.g., 'jpg', 'png') */
  originalExt?: string;
  /** Array of resolutions provided for this image */
  widths?: number[];
  /** 
   * The sizes attribute tells the browser how much screen width the image will occupy 
   * at different breakpoints, so it can pick the correct resolution from srcSet.
   */
  sizes?: string;
  /** Required alt text */
  alt: string;
  /** Enable modern formats (WebP, AVIF) if your build/server provides them */
  useModernFormats?: boolean;
}

/**
 * SrcSetImage - A wrapper that implements responsive images using `srcSet` and `sizes`.
 * 
 * Example usage for a Hero Image (taking up 100vw on mobile, 50vw on desktop):
 * <SrcSetImage 
 *   srcBase="/assets/hero"
 *   originalExt="jpg"
 *   widths={[640, 1024, 2048]}
 *   sizes="(max-width: 1024px) 100vw, 50vw"
 *   alt="Beautiful Hero Home"
 *   useModernFormats={true}
 * />
 * 
 * This assumes files exist like:
 * - /assets/hero-640.webp
 * - /assets/hero-1024.webp
 * - /assets/hero-2048.webp
 * - /assets/hero-640.jpg
 * ...
 */
export function SrcSetImage({
  srcBase,
  originalExt = 'jpg',
  widths = [640, 1024, 2048],
  sizes = '100vw',
  alt,
  useModernFormats = true,
  className = '',
  loading = 'lazy',
  ...props
}: SrcSetImageProps) {
  // Helper to generate the srcSet strings for a given extension
  const generateSrcSet = (ext: string) => {
    return widths
      .map((width) => `${srcBase}-${width}.${ext} ${width}w`)
      .join(', ');
  };

  // The fallback image that doesn't include the width suffix (or defaults to the largest)
  const fallbackSrc = `${srcBase}.${originalExt}`;

  if (useModernFormats) {
    return (
      <picture className={className}>
        <source type="image/avif" srcSet={generateSrcSet('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={generateSrcSet('webp')} sizes={sizes} />
        <img
          src={fallbackSrc}
          srcSet={generateSrcSet(originalExt)}
          sizes={sizes}
          alt={alt}
          className={className}
          loading={loading}
          {...props}
        />
      </picture>
    );
  }

  // If you only want to use the original format (no AVIF/WebP)
  return (
    <img
      src={fallbackSrc}
      srcSet={generateSrcSet(originalExt)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      {...props}
    />
  );
}

export default SrcSetImage;
