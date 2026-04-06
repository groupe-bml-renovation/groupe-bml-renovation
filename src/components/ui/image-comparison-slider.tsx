import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
  className?: string;
  maxHeight?: string;
  minHeight?: string;
}

export const ImageComparisonSlider: React.FC<ImageComparisonProps> = ({
  beforeImage,
  afterImage,
  altBefore = 'Before',
  altAfter = 'After',
  className = '',
  maxHeight = '70vh',
  minHeight = '300px'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));

    setSliderPosition(newPosition);
  }, [isDragging]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full mx-auto select-none rounded-xl overflow-hidden shadow-2xl ${className}`}
      style={{
        height: maxHeight === '100%' && minHeight === '100%' ? '100%' : 'auto',
        maxHeight: maxHeight === '100%' ? 'none' : maxHeight,
        minHeight: minHeight === '100%' ? 'none' : minHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden bg-gray-100"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={altAfter}
          className="h-full w-full object-cover object-center"
          draggable="false"
          onLoad={handleImageLoad}
        />
      </div>

      <img
        src={beforeImage}
        alt={altBefore}
        className="block h-full w-full object-cover object-center bg-gray-100"
        draggable="false"
        onLoad={handleImageLoad}
      />

      <div
        className="absolute top-0 bottom-0 w-1.5 bg-white/80 cursor-ew-resize flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 0.375rem)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className={`bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-md transition-all duration-200 ease-in-out ${isDragging ? 'scale-110 shadow-xl' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            <line x1="15" y1="18" x2="9" y2="12"></line>
            <line x1="9" y1="6" x2="15" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};
