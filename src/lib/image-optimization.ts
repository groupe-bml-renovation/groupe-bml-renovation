export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export const getImageSrcSet = (
  baseUrl: string,
  sizes: number[] = [640, 1024, 1536]
): string => {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
};

export const generateLQIP = (color: string = '#e5e7eb'): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='${encodeURIComponent(color)}' width='400' height='300'/%3E%3C/svg%3E`;
};

export const getOptimizedImageSrc = (
  url: string,
  width?: number,
  height?: number
): string => {
  if (!url || !url.includes('r2.dev')) {
    return url;
  }

  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', '80');

  return `${url}?${params.toString()}`;
};

export const shouldPreloadImage = (priority: boolean, index: number): boolean => {
  return priority || index < 3;
};
