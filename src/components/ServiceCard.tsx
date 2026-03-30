import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

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
  href,
  onClick
}) => {
  const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[iconName] || Icons.Zap;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={handleClick}
      className="flex-shrink-0 w-80 md:w-96 cursor-pointer group snap-start"
      data-service-card
    >
      <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-96 md:h-[440px] overflow-hidden bg-slate-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-4 left-4 w-14 h-14 bg-[#38bdf8] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-7 h-7 text-white" />
          </div>
        </div>

        <div className="p-6 md:p-7 flex flex-col flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#38bdf8] transition-colors duration-300">
            {title}
          </h3>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          <div className="inline-flex items-center justify-start gap-2 text-[#38bdf8] font-semibold group-hover:gap-4 transition-all duration-300">
            <span>Découvrir</span>
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return cardContent;
};

export default ServiceCard;
