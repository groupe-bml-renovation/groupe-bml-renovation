import { useState, useRef, useEffect } from 'react';
import { getImageSrcSet, getOptimizedImageSrc } from '../lib/image-optimization';

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

  const srcSet = src.includes('r2.dev') || src.includes('cloudinary.com') 
    ? getImageSrcSet(src) 
    : undefined;

  const optimizedSrc = getOptimizedImageSrc(src, width, height);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100/50 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
        }`}
      />
    </div>
  );
};

export default OptimizedImage;
