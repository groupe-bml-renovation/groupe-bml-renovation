import React from 'react';

const RealiszationsHeroSection: React.FC = () => {
  return (
    <div className="relative mb-8">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
            À PROPOS DE BML RÉNOVATION
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
            Tous corps d'état,<br />
            <span className="text-[#38bdf8]">Spécialiste en rénovation complète</span>
          </h1>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              Depuis plus de 10 ans, BML Rénovation met son expertise au service de vos projets de rénovation. Notre équipe regroupe des professionnels qualifiés dans chaque corps de métier : peinture, plomberie, électricité, maçonnerie, menuiserie et aménagement intérieur.
            </p>
            <p>
              Qu'il s'agisse de rénovation complète, de modernisation de salle de bain, de pose de parquet flottant ou de ravalement de façade, nous assurons des travaux soignés, durables et esthétiques, pensés pour redonner vie à votre habitat.
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod.jpg"
              alt="Rénovation intérieure moderne BML"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealiszationsHeroSection;
