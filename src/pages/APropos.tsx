import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Award, Users, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import { OptimizedImage } from '../components/OptimizedImage';

interface AProposPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const AProposPage: React.FC<AProposPageProps> = ({ onBack, onNavigate }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');
  const milestones = [
    {
      title: "Création de l'entreprise",
      description: "Début de l'aventure BML Rénovation avec une vision claire et ambitieuse : transformer les espaces de vie en créant des intérieurs qui allient esthétique, fonctionnalité et confort. Nos fondateurs ont posé les bases d'une entreprise qui place la satisfaction client et la qualité au cœur de chaque intervention.",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/1%20Cre%CC%81ation%20de%20l'entreprise.png"
    },
    {
      title: "Expansion des services",
      description: "Développement et perfectionnement de notre expertise en rénovation complète et architecture d'intérieur. Cette année marque un tournant décisif avec l'élargissement de notre gamme de services pour inclure la conception sur mesure, l'aménagement d'espaces complexes et l'intégration de solutions innovantes.",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/2%20Expansion%20des%20services.png"
    },
    {
      title: "Croissance de l'équipe",
      description: "Renforcement stratégique de notre équipe d'experts qualifiés avec le recrutement d'artisans spécialisés. Cette expansion nous permet de prendre en charge simultanément plusieurs chantiers d'envergure tout en maintenant notre standard de qualité élevé.",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/3%20Croissance%20de%20l'e%CC%81quipe.png"
    },
    {
      title: "Innovation continue",
      description: "Intégration proactive des dernières technologies du bâtiment, des matériaux écologiques et des techniques éco-responsables. Notre engagement pour la transition énergétique et le développement durable nous pousse à proposer des solutions innovantes.",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/4%20Innovation%20continue.png"
    }
  ];

  const commitments = [
    {
      icon: CheckCircle,
      title: "Qualité Garantie",
      description: "Tous nos travaux sont garantis avec des matériaux certifiés et un contrôle qualité rigoureux.",
      highlights: ["Garantie décennale", "Matériaux certifiés", "Contrôle qualité rigoureux"]
    },
    {
      icon: Clock,
      title: "Respect des Délais",
      description: "Planification rigoureuse et respect des échéances pour que votre projet avance selon vos attentes.",
      highlights: ["Planning détaillé", "Suivi en temps réel", "Communication régulière"]
    },
    {
      icon: Shield,
      title: "Transparence Totale",
      description: "Devis détaillés, prix transparents et aucune surprise. Vous savez exactement ce que vous payez.",
      highlights: ["Devis gratuit détaillé", "Prix fixes", "Aucun coût caché"]
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Professionnalisme",
      description: "Excellence et rigueur dans chaque intervention, du diagnostic initial à la livraison finale."
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Une écoute attentive et un accompagnement personnalisé tout au long de votre projet."
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Client",
      description: "Votre satisfaction est notre priorité absolue. 99% de nos clients nous recommandent."
    },
    {
      icon: Shield,
      title: "Expertise",
      description: "Plus de 10 ans d'expérience et 300+ projets réalisés avec succès."
    }
  ];

  const stats = [
    { icon: Clock, number: "10 ans", label: "D'expérience" },
    { icon: Award, number: "300+", label: "Projets réalisés" },
    { icon: Users, number: "75+", label: "Artisans PARTENAIRES" },
    { icon: Star, number: "01", label: "Interlocuteur unique" }
  ];

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

  return (
    <div className="min-h-screen bg-white pt-24">
      <Helmet>
        <title>{isGrenoble ? "Rénovation Maison Grenoble - Entreprise de Rénovation Complète à Grenoble - BML" : "Rénovation Maison Complète - Entreprise de Rénovation Maison - BML"}</title>
        <meta name="description" content={isGrenoble ? "Entreprise de rénovation à Grenoble spécialisée en rénovation maison complète, travaux intérieur/extérieur et rénovation Isère. Artisans qualifiés. Devis gratuit rénovation Grenoble." : "Entreprise de rénovation maison spécialisée en rénovation intérieure et extérieure. Travaux de rénovation complète avec artisans qualifiés. Peintre en bâtiment. Devis rénovation maison gratuit."} />
        <meta name="keywords" content={isGrenoble ? "rénovation grenoble, rénovation maison grenoble, rénovation isère, entreprise rénovation grenoble, travaux rénovation grenoble, rénovation grenoble intérieur, rénovation grenoble extérieur, artisan rénovation grenoble, devis rénovation grenoble, peinture grenoble, plomberie grenoble, électricité grenoble, menuiserie grenoble, rénovation maison isère, travaux grenoble" : "rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation"} />
        <meta name="og:title" content={isGrenoble ? "Rénovation Maison Grenoble - Entreprise de Rénovation Complète - BML Rénovation" : "Rénovation Maison Complète - Entreprise de Rénovation - BML Rénovation"} />
        <meta name="og:description" content={isGrenoble ? "Services de rénovation maison à Grenoble. Travaux de rénovation complète, intérieur/extérieur. Peinture, plomberie, électricité. Devis gratuit pour vos travaux Isère." : "Services de rénovation maison complète. Travaux de rénovation intérieure et extérieure. Peintre en bâtiment expérimenté. Devis gratuit pour vos travaux maison."} />
        <meta name="og:type" content="website" />
        <meta name="twitter:title" content={isGrenoble ? "Rénovation Grenoble - Travaux de Rénovation Complète BML" : "Rénovation Maison - Travaux de Rénovation Complète BML"} />
        <meta name="twitter:description" content={isGrenoble ? "Entreprise de rénovation à Grenoble. Travaux intérieur/extérieur, peinture, plomberie, électricité. Devis gratuit rénovation Grenoble." : "Entreprise de rénovation maison spécialisée. Peintre, travaux intérieur/extérieur. Devis gratuit rénovation maison."} />
        <meta name="twitter:card" content="summary_large_image" />
        {isGrenoble && <meta name="geo.region" content="FR-38" />}
        {isGrenoble && <meta name="geo.placename" content="Grenoble" />}
        <link rel="canonical" href={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/a-propos" : "https://groupe-bml-renovation.fr/a-propos"} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "BML Rénovation",
            "description": "Entreprise spécialisée en rénovation maison complète, travaux de rénovation intérieure et extérieure",
            "image": "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Playfair%20Display-3%20copie%202.png",
            "url": "https://bml-renovation.fr",
            "telephone": "+33123456789",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "BML Rénovation",
              "addressCountry": "FR"
            },
            "areaServed": ["FR"],
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "300"
            },
            "servesCuisine": ["rénovation intérieure", "rénovation extérieure", "rénovation maison complète"],
            "knowsAbout": ["rénovation maison", "travaux de rénovation", "peinture bâtiment", "rénovation maison ancienne", "coût rénovation maison", "travaux maison"]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BML Rénovation",
            "url": "https://bml-renovation.fr",
            "logo": "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Playfair%20Display-3%20copie%202.png",
            "description": "Entreprise de rénovation maison offrant des services complets de rénovation intérieure, rénovation extérieure et travaux de peinture en bâtiment",
            "foundingDate": "2014",
            "areaServed": "FR",
            "serviceType": ["rénovation maison", "rénovation maison complète", "rénovation maison ancienne", "travaux de rénovation maison", "rénovation intérieure", "rénovation extérieure", "travaux de peinture bâtiment"]
          })}
        </script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Hero Section */}
        <div className="py-16 text-center mb-12">
          <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
            {isGrenoble ? "À Propos de BML Rénovation à Grenoble" : "À Propos de BML Rénovation"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {isGrenoble ? "Spécialiste en rénovation complète à Grenoble" : "Tous corps d'état, Spécialiste en rénovation complète"}
            </span>
          </h1>
          <p className="sr-only">
            {isGrenoble ? "BML Rénovation est une entreprise de rénovation à Grenoble spécialisée en rénovation maison complète, travaux intérieur/extérieur et rénovation Isère. Nous offrons des services de rénovation maison Grenoble avec artisans qualifiés. Devis gratuit rénovation Grenoble." : "BML Rénovation est une entreprise de rénovation maison spécialisée en rénovation intérieure, rénovation extérieure et rénovation maison complète. Nous offrons des services de travaux de rénovation maison, travaux maison, rénovation maison ancienne avec des artisans qualifiés. Consultez nos tarifs et coût rénovation maison."}
          </p>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              {isGrenoble
                ? "Depuis plus de 10 ans, BML Rénovation intervient à Grenoble et en Isère, mettant son expertise au service de vos projets de rénovation. Notre équipe grenobloise regroupe des professionnels qualifiés dans chaque corps de métier : peinture, plomberie, électricité, maçonnerie, menuiserie et aménagement intérieur."
                : "Depuis plus de 10 ans, BML Rénovation met son expertise au service de vos projets de rénovation. Notre équipe regroupe des professionnels qualifiés dans chaque corps de métier : peinture, plomberie, électricité, maçonnerie, menuiserie et aménagement intérieur."
              }
            </p>
            <p>
              {isGrenoble
                ? "Qu'il s'agisse de rénovation complète, de modernisation de salle de bain, de pose de parquet flottant ou de ravalement de façade à Grenoble et dans l'Isère, nous assurons des travaux soignés, durables et esthétiques, pensés pour redonner vie à votre habitat grenoblois."
                : "Qu'il s'agisse de rénovation complète, de modernisation de salle de bain, de pose de parquet flottant ou de ravalement de façade, nous assurons des travaux soignés, durables et esthétiques, pensés pour redonner vie à votre habitat."
              }
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 text-center border border-sky-100"
              >
                <Icon className="w-8 h-8 text-[#38bdf8] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Commitments Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
              Nos Engagements
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre Promesse Client
            </h2>
            <p className="sr-only">
              Entreprise de rénovation maison offrant travaux de rénovation de qualité. Nos artisans en bâtiment fournissent des services de peintre en bâtiment, rénovation intérieure et extérieure. Découvrez le prix rénovation maison et coût rénovation maison.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à fournir un service de qualité supérieure dans chaque aspect de votre projet
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ translateY: -4 }}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#38bdf8]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {commitment.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {commitment.description}
                  </p>
                  <ul className="space-y-2">
                    {commitment.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* History Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
              Notre Parcours
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Une Histoire de Passion et d'Excellence
            </h2>
            <p className="sr-only">
              Notre entreprise de rénovation maison a grandi en offrant rénover une maison de manière professionnelle. Nous avons développé notre expertise en bâtiment travaux publics, peinture bâtiment, et rénovation maison ancienne. Artisan rénovation maison depuis plus de 10 ans.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#38bdf8] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {milestone.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
                {milestone.image && (
                  <OptimizedImage
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full rounded-xl mt-6 shadow-md"
                    loading="lazy"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
              Nos Valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ce qui nous anime chaque jour
            </h2>
            <p className="sr-only">
              Travaux maison de qualité avec travaux de peinture bâtiment, rénovation intérieure, rénovation extérieure. Nous sommes peintre dans le bâtiment avec expertise en rénovations complètes. Prix rénovation maison compétitifs pour entreprise bâtiment rénovation.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nos valeurs fondamentales guident chaque décision et chaque action que nous prenons
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-center"
                >
                  <Icon className="w-10 h-10 text-[#38bdf8] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isGrenoble ? "Prêt à transformer votre habitat à Grenoble ?" : "Prêt à transformer votre habitat ?"}
          </h2>
          <div className="space-y-4 text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            <p>
              {isGrenoble
                ? "Avec plus de 10 ans d'expérience dans la rénovation à Grenoble et en Isère, nous sommes ravis de transformer votre habitat."
                : "Avec plus de 10 ans d'expérience, nous sommes ravis de transformer votre habitat."
              }
            </p>
            <p>
              {isGrenoble
                ? "Contactez-nous pour un devis gratuit et personnalisé pour votre projet de rénovation à Grenoble, RDV planifier sous 24h."
                : "Contactez-nous pour un devis offert et personnalisé, RDV planifier sous 24h."
              }
            </p>
          </div>
          <button
            onClick={() => {
              onBack();
              setTimeout(() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 bg-white text-[#38bdf8] font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors"
          >
            Demander un Devis
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>

      <FooterSection onNavigateToServices={() => onBack()} onNavigate={onNavigate || onBack} />
    </div>
  );
};

export default AProposPage;
