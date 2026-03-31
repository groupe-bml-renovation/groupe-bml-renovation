import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Euro } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  budget: string;
  duration: string;
  description: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  image,
  budget,
  duration,
  description,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-80 md:w-96 group snap-start bg-transparent"
      data-project-card
      onClick={onClick}
    >
      <div className={`flex flex-col gap-5 ${onClick ? 'cursor-pointer' : ''}`}>
        {/* Image with overlaid badges */}
        <div className="relative h-64 md:h-72 rounded-[1.75rem] overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-500">
          <OptimizedImage
            src={image}
            alt={title}
            className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Budget & Duration pill badges – bottom of image, matching reference */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#1e293b]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
              <Euro className="w-3 h-3 opacity-80" />
              <span>{budget}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1e293b]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
              <Calendar className="w-3 h-3 opacity-80" />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        {/* Text content below image */}
        <div className="px-1 space-y-2">
          <p className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider">
            {category}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] leading-snug group-hover:text-[#38bdf8] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
