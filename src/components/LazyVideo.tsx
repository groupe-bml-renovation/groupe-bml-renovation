import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** The source URL of the video */
  src: string;
  /** A required fallback image shown while loading or off-screen */
  poster: string;
  /** Distance from viewport to start loading (e.g. '200px') */
  rootMargin?: string;
}

/**
 * LazyVideo - A background video component that only requests the MP4/WebM
 * when it scrolls into view, preventing multiple initial network requests.
 */
export function LazyVideo({ 
  src, 
  poster, 
  rootMargin = '100px',
  className = '', 
  ...props 
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          // Once loaded, we can disconnect to stop observing
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* 
        1. Always show the poster as a background/img placeholder 
        This is necessary because the video tag literally has no 'src' 
        before intersecting, so the native 'poster' attribute sometimes flickers.
      */}
      {!inView && (
        <img 
          src={poster} 
          alt="Video Thumbnail" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      )}

      {/* 
        2. Render the actual video tag once in view.
        - muted: Required for autoplay on modern browsers
        - playsInline: Required for autoplay on iOS Safari
        - preload="none" helps prevent browsers from eagerly holding multiple connections
      */}
      {inView && (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          className="w-full h-full object-cover"
          {...props}
        />
      )}
    </div>
  );
}

export default LazyVideo;
