import React, { Suspense, useEffect, useState, useRef } from 'react';

interface LazyLoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  threshold?: number; // Distance from viewport to start loading (in pixels)
}

const DefaultFallback = () => (
  <div className="w-full h-96 bg-gray-50/50 animate-pulse rounded-2xl" />
);

export const LazyLoadingBoundary: React.FC<LazyLoadingBoundaryProps> = ({
  children,
  fallback = <DefaultFallback />,
  delay = 0,
  threshold = 200,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If delay is 0 and no threshold is needed, render immediately
    if (delay === 0 && threshold === 0) {
      setShouldRender(true);
      return;
    }

    // Set up timer if delay is provided
    let timer: number | null = null;
    if (delay > 0) {
      timer = window.setTimeout(() => setShouldRender(true), delay);
    }

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
          if (timer) clearTimeout(timer);
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay, threshold]);

  return (
    <div ref={containerRef} className="w-full min-h-[10px]">
      {!shouldRender ? (
        fallback
      ) : (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      )}
    </div>
  );
};
