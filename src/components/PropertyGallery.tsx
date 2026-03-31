import React from 'react';
import { Phone } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface PropertyGalleryProps {
  onCtaClick?: () => void;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ onCtaClick }) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          <div className="md:row-span-2 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage
              src="https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Pool aerial view"
              className="w-full h-full"
              loading="lazy"
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage
              src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern building facade"
              className="w-full h-full"
              loading="lazy"
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage
              src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Wooden deck"
              className="w-full h-full"
              loading="lazy"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <OptimizedImage
              src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Pool and garden"
              className="w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <button
              onClick={handleCtaClick}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 z-10"
            >
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold">Demander un devis gratuit</span>
                <span className="text-xs font-normal opacity-90">Réponse sous 24h</span>
              </div>
              <Phone className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage
              src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Interior room"
              className="w-full h-full"
              loading="lazy"
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage
              src="https://images.pexels.com/photos/1439227/pexels-photo-1439227.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern kitchen"
              className="w-full h-full"
              loading="lazy"
            />
          </div>

          <div className="md:row-span-2 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage
              src="https://images.pexels.com/photos/1909657/pexels-photo-1909657.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Luxury bathroom"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;
