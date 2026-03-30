import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import { ProjectCard } from '../components/ProjectCard';
import { featuredProjects } from '../data/projects-carousel-config';

const getRealisationsProjects = () => {
  const projects = [...featuredProjects];
  const bainIndex = projects.findIndex(p => p.id === 15);
  if (bainIndex > -1) {
    const [bainProject] = projects.splice(bainIndex, 1);
    projects.splice(4, 0, bainProject);
  }
  return projects;
};

interface RealisationsProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const Realisations: React.FC<RealisationsProps> = ({ onBack, onNavigate = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isGrenoble = location.pathname.includes('/grenoble/');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const SEO = {
    title: isGrenoble
      ? 'Galerie Projets Rénovation Grenoble & Isère | Réalisations BML'
      : 'Galerie Projets Rénovation | Nos Réalisations | Groupe BML',
    description: isGrenoble
      ? 'Découvrez nos réalisations de rénovation à Grenoble et en Isère. Projets avant-après, maisons, appartements, cuisines, salles de bain. Expertise en rénovation complète.'
      : 'Galerie complète de nos réalisations en rénovation. Projets avant-après, maisons, appartements, bureaux, cuisines, salles de bain et bien plus. Décourez l\'expertise de BML Rénovation.',
    keywords: isGrenoble
      ? 'réalisations rénovation Grenoble, projets avant-après Isère, galerie rénovation Grenoble, projets maison Grenoble, rénovation appartement Isère'
      : 'réalisations rénovation, galerie projets, avant-après rénovation, projets maison, rénovation appartement, projets professionnels',
    ogTitle: isGrenoble
      ? 'Nos Réalisations - Rénovation Grenoble & Isère | BML'
      : 'Nos Réalisations - Galerie Projets | Groupe BML',
    ogDescription: isGrenoble
      ? 'Explorez nos projets de rénovation réussis à Grenoble. Maisons, appartements, cuisines et plus avec photos avant-après.'
      : 'Découvrez nos projets de rénovation réussis avec photos avant-après. Expertise reconnue en rénovation complète.',
    twitterTitle: isGrenoble
      ? 'Réalisations Rénovation Grenoble - BML'
      : 'Réalisations Rénovation - Groupe BML',
    twitterDescription: isGrenoble
      ? 'Galerie de nos projets de rénovation à Grenoble et Isère.'
      : 'Galerie de nos projets de rénovation réussis.',
  };

  const handleProjectClick = (project: typeof featuredProjects[0]) => {
    if (project.route) {
      if (isGrenoble && !project.route.includes('/grenoble')) {
        window.location.href = `/grenoble${project.route}`;
      } else {
        window.location.href = project.route;
      }
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
        <meta property="og:title" content={SEO.ogTitle} />
        <meta property="og:description" content={SEO.ogDescription} />
        <meta name="twitter:title" content={SEO.twitterTitle} />
        <meta name="twitter:description" content={SEO.twitterDescription} />
        {isGrenoble && (
          <>
            <meta name="geo.region" content="FR-38" />
            <meta name="geo.placename" content="Grenoble" />
            <link rel="canonical" href={`${window.location.origin}/grenoble/realisations`} />
          </>
        )}
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="text-center mb-16 py-12">
          <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
            Gallery de Réalisations
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {isGrenoble
                ? 'Nos projets réalisés à Grenoble et en Isère'
                : 'Nos projets réalisés'}
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {isGrenoble
              ? 'Découvrez la galerie complète de nos réalisations en rénovation à Grenoble et en Isère.\n\nDe la rénovation complète de maison aux aménagements intérieurs haut de gamme, explorez nos projets réussis avec photos avant-après.\n\nChaque projet raconte une histoire d\'expertise, de qualité et de satisfaction client.'
              : 'Découvrez la galerie complète de nos réalisations en rénovation.\n\nDe la rénovation complète de maison aux aménagements intérieurs haut de gamme, explorez nos projets réussis avec photos avant-après.\n\nChaque projet raconte une histoire d\'expertise, de qualité et de satisfaction client.'
            }
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getRealisationsProjects().map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div onClick={() => handleProjectClick(project)}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  budget={project.budget}
                  duration={project.duration}
                  description={project.description}
                  onClick={project.route ? () => handleProjectClick(project) : undefined}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 mb-24"
      >
        <div className="bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Votre projet de rénovation
          </h2>
          <p className="text-sky-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Vous avez un projet en tête ? Contactez-nous pour une consultation et devis gratuite. Notre équipe saura donner vie à vos envies de rénovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const form = document.getElementById('contact-form');
                if (form) {
                  form.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#38bdf8] font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Demander une Consultation
            </button>
            <a
              href="tel:0756915997"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
            >
              <span>07 56 91 59 97</span>
            </a>
          </div>
        </div>
      </motion.div>

      <FooterSection onNavigateToServices={() => onBack()} onNavigate={onNavigate} />
    </div>
  );
};

export default Realisations;
