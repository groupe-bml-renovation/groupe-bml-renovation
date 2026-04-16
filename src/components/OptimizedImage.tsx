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
  loading = 'lazy',
  priority = false,
  width,
  height
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const generateSrcSet = (url: string) => {
    if (url.includes('cloudinary.com')) {
      const widths = [320, 640, 768, 1024, 1280, 1536];
      return widths
        .map(w => {
          const optimizedUrl = url.replace('/upload/', `/upload/w_${w},q_auto,f_auto/`);
          return `${optimizedUrl} ${w}w`;
        })
        .join(', ');
    }
    
    if (url.includes('images.unsplash.com')) {
      const widths = [320, 640, 768, 1024, 1280, 1600, 2000];
      return widths
        .map(w => {
          // Remove existing w/q/auto params and add new ones
          const baseUrl = url.split('?')[0];
          const optimizedUrl = `${baseUrl}?auto=format&fit=crop&q=80&w=${w}`;
          return `${optimizedUrl} ${w}w`;
        })
        .join(', ');
    }

    return undefined;
  };

  const getOptimizedSrc = (url: string) => {
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/q_auto,f_auto/');
    }
    if (url.includes('images.unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&q=80&w=${width || 800}`;
    }
    return url;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!priority && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={getOptimizedSrc(src)}
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding={priority ? "sync" : "async"}
        {...({ fetchPriority: priority ? "high" : "auto" } as any)}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover ${!priority ? 'transition-opacity duration-300' : ''} ${(isLoaded || priority) ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </div>
  );
};
