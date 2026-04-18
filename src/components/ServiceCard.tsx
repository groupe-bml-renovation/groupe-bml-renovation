import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  iconName: string;
  href?: string;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  iconName,
  onClick
}) => {
  const IconComponent = (Icons as any)[iconName] || Icons.Zap;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={handleClick}
      className="flex-shrink-0 w-80 md:w-96 cursor-pointer group snap-start bg-transparent"
      data-service-card
    >
      <div className="flex flex-col gap-5">
        <div className="relative h-80 md:h-[380px] rounded-[2rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-500">
          <OptimizedImage
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={true}
          />

          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Icon Badge - Bottom Left Overlap */}
          <div className="absolute bottom-6 left-6 p-3 bg-white rounded-xl shadow-lg border border-slate-100 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm bg-white/95">
            <IconComponent className="w-6 h-6 text-[#38bdf8]" strokeWidth={2.5} />
          </div>
        </div>

        <div className="px-1 space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] leading-tight group-hover:text-[#38bdf8] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {renderDescription(description)}
          </p>

          <div className="flex items-center gap-2 text-[#38bdf8] font-bold text-sm uppercase tracking-wider pt-2 transition-all duration-300">
            <span>En savoir plus</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function renderDescription(text: string): React.ReactNode {
  if (!text.includes('**')) return text;

  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="font-bold text-[#0f172a]">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

export default ServiceCard;
