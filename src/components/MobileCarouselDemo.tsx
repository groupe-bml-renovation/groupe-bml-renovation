import React from 'react';
import { MobileCarousel } from './MobileCarousel';

export const MobileCarouselDemo: React.FC = () => {
  const sampleImages = [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <header className="bg-neutral-900 border-b border-neutral-800 p-4">
        <h1 className="text-2xl font-bold text-white text-center">
          Mobile-Optimized Carousel
        </h1>
        <p className="text-neutral-400 text-center text-sm mt-1">
          Swipe left/right or use navigation arrows
        </p>
      </header>

      <div className="flex-1 flex flex-col p-4 gap-4">
        <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
          <h2 className="text-lg font-semibold text-white mb-2">Features</h2>
          <ul className="text-neutral-300 text-sm space-y-1">
            <li>• Perfect single-image navigation</li>
            <li>• Touch/swipe gestures enabled</li>
            <li>• Centered image alignment</li>
            <li>• Smooth transitions (500ms)</li>
            <li>• Responsive across all devices</li>
            <li>• Lazy loading for performance</li>
          </ul>
        </div>

        <div className="flex-1 bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 min-h-[400px]">
          <MobileCarousel images={sampleImages} />
        </div>

        <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
          <h2 className="text-lg font-semibold text-white mb-2">
            Testing Instructions
          </h2>
          <div className="text-neutral-300 text-sm space-y-2">
            <p className="font-medium text-white">Mobile Testing:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Swipe left/right to navigate</li>
              <li>Tap navigation arrows</li>
              <li>Tap dot indicators to jump</li>
              <li>Verify one image moves at a time</li>
              <li>Check centering on portrait/landscape</li>
            </ol>
            <p className="font-medium text-white mt-3">Browser DevTools:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Open DevTools (F12)</li>
              <li>Toggle device toolbar (Ctrl+Shift+M)</li>
              <li>Select mobile devices (iPhone, Galaxy, etc.)</li>
              <li>Test various screen sizes (320px-768px)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
