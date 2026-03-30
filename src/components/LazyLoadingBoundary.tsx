import React, { Suspense } from 'react';

interface LazyLoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

const DefaultFallback = () => (
  <div className="w-full h-96 bg-gray-50 animate-pulse" />
);

export const LazyLoadingBoundary: React.FC<LazyLoadingBoundaryProps> = ({
  children,
  fallback = <DefaultFallback />,
  delay = 0,
}) => {
  const [shouldRender, setShouldRender] = React.useState(delay === 0);

  React.useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShouldRender(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!shouldRender) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};
