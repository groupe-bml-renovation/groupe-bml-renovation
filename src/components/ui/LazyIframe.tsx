import React, { useState, useEffect, useRef } from 'react';

interface LazyIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  threshold?: number;
}

export const LazyIframe: React.FC<LazyIframeProps> = ({ threshold = 0.5, ...props }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading when within 200px of viewport
        threshold,
      }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={iframeRef} className={props.className} style={{ minHeight: '100px', ...props.style }}>
      {isIntersecting ? (
        <iframe {...props} />
      ) : (
        <div className="flex items-center justify-center bg-slate-50 w-full h-full text-slate-400 text-sm animate-pulse">
          Chargement de la carte...
        </div>
      )}
    </div>
  );
};
