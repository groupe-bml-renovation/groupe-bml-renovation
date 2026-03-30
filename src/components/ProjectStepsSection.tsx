import React from 'react';
import { motion } from 'framer-motion';
import { ScrollingFeatureShowcase } from './ScrollingFeatureShowcase';

interface ProjectStepsSectionProps {
  onNavigate?: (page: string) => void;
}

const ProjectStepsSection: React.FC<ProjectStepsSectionProps> = ({ onNavigate }) => {
  return (
    <>
      <section className="pt-0 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
              NOTRE DÉMARCHE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Votre projet en 6 étapes</span>
            </h2>
            <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Qu'il s'agisse d'un projet personnel ou professionnel, chaque chantier mérite une attention minutieuse.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <ScrollingFeatureShowcase />
      </section>
    </>
  );
};

export default ProjectStepsSection;
