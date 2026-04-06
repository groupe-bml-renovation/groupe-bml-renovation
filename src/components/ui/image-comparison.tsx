import React, { useRef, useEffect, useState } from 'react';

interface ImageComparisonProps {
  children: React.ReactNode;
  className?: string;
}

interface ImageComparisonImageProps {
  src: string;
  alt: string;
  position: 'left' | 'right';
}

interface ImageComparisonSliderProps {
  children?: React.ReactNode;
  className?: string;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    if (percentage >= 0 && percentage <= 100) {
      setSliderPosition(percentage);
    }
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    if (percentage >= 0 && percentage <= 100) {
      setSliderPosition(percentage);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        if (child.type === ImageComparisonImage) {
          if (child.props.position === 'left') {
            return (
              <div key="left" className="absolute inset-0">
                {child}
              </div>
            );
          } else {
            return (
              <div
                key="right"
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
              >
                {child}
              </div>
            );
          }
        }

        if (child.type === ImageComparisonSlider) {
          return (
            <div
              key="slider"
              className="absolute top-0 bottom-0 z-10 cursor-ew-resize"
              style={{
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
                width: '4px'
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {child}
            </div>
          );
        }

        return child;
      })}
    </div>
  );
};

export const ImageComparisonImage: React.FC<ImageComparisonImageProps> = ({ src, alt, position }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover select-none pointer-events-none"
      draggable="false"
    />
  );
};

export const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
