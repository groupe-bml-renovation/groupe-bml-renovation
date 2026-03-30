import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Euro } from 'lucide-react';

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
      className="flex-shrink-0 w-80 md:w-96 group snap-start"
      data-project-card
      onClick={onClick}
    >
      <div className={`h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}>
        <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
            {category}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow gap-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-cyan-500 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold min-w-0">
              <Calendar className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span className="truncate">{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold min-w-0">
              <Euro className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span className="truncate">{budget}</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
