import { useState, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'eager',
  priority = false,
  width,
  height
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const generateSrcSet = (url: string) => {
    if (!url.includes('cloudinary.com')) return undefined;

    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map(w => {
        const optimizedUrl = url.replace('/upload/', `/upload/w_${w},q_auto,f_auto/`);
        return `${optimizedUrl} ${w}w`;
      })
      .join(', ');
  };

  const getOptimizedSrc = (url: string) => {
    if (!url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/q_auto,f_auto/');
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={getOptimizedSrc(src)}
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
