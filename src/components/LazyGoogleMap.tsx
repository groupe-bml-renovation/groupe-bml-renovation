import React, { useEffect, useRef, useState } from 'react';

interface LazyGoogleMapProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string;
  rootMargin?: string;
}

/**
 * LazyGoogleMap - Prevents the massive Google Maps iframe from downloading 
 * hundreds of KB of Javascript until the user actually scrolls near the footer.
 */
export function LazyGoogleMap({ 
  src, 
  rootMargin = '300px', 
  className = '', 
  ...props 
}: LazyGoogleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Graceful degradation for very old browsers
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { rootMargin } // Starts loading 300px before user reaches the map
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full relative bg-slate-100 overflow-hidden ${!inView ? 'animate-pulse' : ''} ${className}`}
    >
      {inView ? (
        <iframe
          src={src}
          className="w-full h-full absolute inset-0"
          loading="lazy"
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          Chargement de la carte...
        </div>
      )}
    </div>
  );
}

export default LazyGoogleMap;
