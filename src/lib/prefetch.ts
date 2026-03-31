import { matchPath } from 'react-router-dom';

/**
 * Prefetch a page's assets based on its path.
 * In a Vite app with dynamic imports, this can be done by triggering the import.
 * For simpler implementation, we can also inject <link rel="prefetch"> tags.
 */
export const prefetchPage = (path: string) => {
  // Only prefetch if we're on a decent connection and not in data saving mode
  if (
    navigator && 
    (navigator as any).connection && 
    ((navigator as any).connection.saveData || /(2g|3g)/.test((navigator as any).connection.effectiveType))
  ) {
    return;
  }

  // Find the component for the path and trigger its lazy load
  // Since we're using Vite, we can't easily access the dynamic imports from here 
  // without a more complex setup. 
  // Instead, we'll use the browser's native prefetch mechanism for the likely next HTML/JS.
  
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  
  // Prevent duplicate prefetching
  const existingLink = document.querySelector(`link[href="${fullPath}"]`);
  if (existingLink) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = fullPath;
  document.head.appendChild(link);
};

/**
 * Prefetch all critical assets for the application
 */
export const prefetchCriticalAssets = () => {
  const assets: string[] = [
    // Add critical images or other assets here
  ];

  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = asset.endsWith('.js') ? 'script' : 'image';
    link.href = asset;
    document.head.appendChild(link);
  });
};
