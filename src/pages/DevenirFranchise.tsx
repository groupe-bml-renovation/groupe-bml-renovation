import React from 'react';
import { CheckCircle, TrendingUp, Users, Award, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FooterSection } from '../components/footer-section';
import TeamCTABanner from '../components/TeamCTABanner';
import { OptimizedImage } from '../components/OptimizedImage';

interface DevenirFranchisePageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const DevenirFranchisePage: React.FC<DevenirFranchisePageProps> = ({ onBack, onNavigate }) => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Concept Éprouvé",
      description: "Un modèle de business rentable et viable avec plus de 10 ans de succès"
    },
    {
      icon: Award,
      title: "Support Complet",
      description: "Formation initiale, accompagnement continu et assistance opérationnelle"
    },
    {
      icon: Users,
      title: "Réseau de Professionnels",
      description: "Accès à notre réseau d'artisans qualifiés et partenaires"
    },
    {
      icon: Target,
      title: "Outils Marketing",
      description: "Site web, supports marketing et stratégie de communication fournis"
    },
    {
      icon: Zap,
      title: "Système Éprouvé",
      description: "Processus standardisé pour garantir la qualité et la satisfaction client"
    },
    {
      icon: CheckCircle,
      title: "ROI Attractif",
      description: "Retour sur investissement compétitif dans un secteur porteur"
    }
  ];

  const requirements = [
    "Capacité d'investissement minimum de 50 000 €",
    "Expérience en gestion d'entreprise ou vente",
    "Passion pour le secteur de la rénovation",
    "Engagement envers la qualité et le service client",
    "Présence active sur le territoire d'implantation",
    "Adhésion aux valeurs de BML Rénovation",
    "Aptitudes en gestion financière et comptabilité de base",
    "Capacité à recruter et encadrer une équipe de professionnels",
    "Compétences en communication et relation client",
    "Volonté d'investir dans le développement commercial et marketing local"
  ];

  const steps = [
    {
      number: "1",
      title: "Rendez-vous téléphonique",
      description: "Vous échangez avec une personne du service développement, qui pourra vous fournir toutes les informations nécessaires sur le modèle économique."
    },
    {
      number: "2",
      title: "Entretien physique",
      description: "Vous êtes invité à un entretien en présentiel pour une présentation complète du modèle et pour rencontrer l'ensemble de l'équipe dirigeante."
    },
    {
      number: "3",
      title: "Validation de votre profil",
      description: "Une fois votre profil validé, nous vous transmettons les documents nécessaires à la réalisation de votre projet."
    },
    {
      number: "4",
      title: "Accompagnement",
      description: "Nous vous aidons à l'élaboration de votre business plan et l'obtention de votre financement pour concrétiser votre projet entrepreneurial."
    }
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
        <title>Devenir Franchisé Rénovation Maison | Entreprise Bâtiment Travaux | BML</title>
        <meta name="description" content="Devenir franchisé en rénovation maison complète. Entreprise de rénovation spécialisée en travaux de rénovation maison ancienne, peinture bâtiment, rénovation intérieure et extérieure. Artisan rénovation qualifié avec support complet et réseau de 75+ partenaires." />
        <meta name="keywords" content="rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation" />
        <meta property="og:title" content="Devenir Franchisé Rénovation Maison | BML Rénovation" />
        <meta property="og:description" content="Franchise en rénovation maison complète avec concept éprouvé, formation continue, outils technologiques et réseau de 75+ artisans qualifiés." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Franchise Rénovation Maison | BML Rénovation" />
        <meta name="twitter:description" content="Devenir franchisé en rénovation maison - Travaux de rénovation intérieure, extérieure, peinture bâtiment et maison ancienne." />
        <link rel="canonical" href="https://groupe-bml-renovation.fr/devenir-franchise" />
        <meta name="language" content="fr" />
        <meta name="geo.region" content="FR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BML Rénovation Franchise",
            "description": "Franchise spécialisée en rénovation maison complète, travaux de rénovation intérieure et extérieure, peinture bâtiment",
            "image": "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251206_1902_E%CC%81quipe%20Pre%CC%82te%20a%CC%80%20Aider_simple_compose_01kbtd5xrvfwns9taht56aya0q.png",
            "url": "https://groupe-bml-renovation.fr/devenir-franchise",
            "sameAs": [
              "https://groupe-bml-renovation.fr"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Sales",
              "areaServed": "FR"
            },
            "areaServed": {
              "@type": "Country",
              "name": "France"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "BML Rénovation Franchise",
            "image": "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251206_1902_E%CC%81quipe%20Pre%CC%82te%20a%CC%80%20Aider_simple_compose_01kbtd5xrvfwns9taht56aya0q.png",
            "description": "Franchise en rénovation maison - Entreprise de rénovation spécialisée en travaux de rénovation complète, peinture bâtiment, rénovation intérieure et extérieure",
            "url": "https://groupe-bml-renovation.fr/devenir-franchise",
            "telephone": "+33",
            "priceRange": "€€",
            "areaServed": {
              "@type": "Country",
              "name": "France"
            },
            "serviceType": ["Rénovation maison", "Travaux de rénovation", "Peinture bâtiment", "Rénovation intérieure", "Rénovation extérieure"],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "300",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-20">
          <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
            Opportunité Franchisé
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Devenir Franchisé Groupe BML Rénovation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Rejoignez une entreprise dynamique et innovante dans le secteur florissant de la rénovation. Bénéficiez d'un concept éprouvé avec support complet et accès à notre réseau de professionnels qualifiés.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6 z-10">
            <div className="space-y-4">
              <p className="text-[#38bdf8] font-semibold text-sm uppercase tracking-wide">
                Une Opportunité Unique
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Construisez votre empire dans la rénovation
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              La franchise BML Rénovation vous offre l'opportunité d'avoir votre propre entreprise avec le soutien d'une marque reconnue et éprouvée. Nous mettons à votre disposition un modèle complet, des outils performants et une équipe dédiée pour assurer votre succès.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Depuis plus de 10 ans, nous avons perfectionné notre système pour garantir une rentabilité durable et une croissance régulière. Nos franchisés bénéficient d'un accompagnement continu, d'un accès prioritaire à notre réseau d'artisans qualifiés et d'une stratégie marketing commune pour maximiser leur visibilité locale.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Modèle économique rentable et testé depuis plus d'une décennie</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Marque établie avec crédibilité et reconnaissance sur le marché</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Support opérationnel complet du démarrage à la croissance</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Accès à des outils technologiques avancés et exclusifs</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-96"
          >
            <OptimizedImage
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Équipe professionnelle entreprise de rénovation maison - Travaux de rénovation spécialisés"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl border border-sky-100 hover:shadow-lg transition-shadow"
              >
                <Icon className="w-8 h-8 text-[#38bdf8] mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nos Piliers de Succès</h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl mb-16 h-96"
          >
            <OptimizedImage
              src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251206_1902_E%CC%81quipe%20Pre%CC%82te%20a%CC%80%20Aider_simple_compose_01kbtd5xrvfwns9taht56aya0q.png"
              alt="Piliers de succès franchise rénovation - Équipe bâtiment travaux publics préte à aider"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/20 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 md:p-12 w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">La Fondation de Votre Réussite</h3>
                <p className="text-sky-100 text-base md:text-lg max-w-2xl">Découvrez les quatre piliers qui font la force de notre franchise et qui garantissent votre succès</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4 lg:order-1">
                <div className="inline-block px-4 py-2 bg-sky-100 rounded-full">
                  <p className="text-[#38bdf8] font-semibold text-sm">Formation Continue</p>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Formation et Accompagnement Experts</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nous croyons que la formation continue est essentielle à votre succès. Notre programme incluant des formations initiales intensives, des ateliers réguliers, et un suivi personnalisé tout au long de votre parcours.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nos experts vous transmettent tous les secrets du métier, les meilleures pratiques commerciales et les dernières innovations technologiques du secteur.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] font-bold">•</span>
                    <span className="text-gray-700">Formation initiale de 2 semaines intensives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] font-bold">•</span>
                    <span className="text-gray-700">Ateliers thématiques mensuels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] font-bold">•</span>
                    <span className="text-gray-700">Mentorat individuel avec nos consultants</span>
                  </li>
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-lg h-80 lg:order-2"
              >
                <OptimizedImage
                  src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251206_1736_Formation%20et%20Support%20Experts_simple_compose_01kbt87gwqfwrbqtwrq7284hwm.png"
                  alt="Formation et support experts artisan rénovation maison - Travaux de rénovation intérieure et extérieure"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4 lg:order-2">
                <div className="inline-block px-4 py-2 bg-green-100 rounded-full">
                  <p className="text-green-700 font-semibold text-sm">Technologie Avancée</p>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Outils Technologiques Performants</h3>
                <p className="text-gray-700 leading-relaxed">
                  Accédez à notre suite d'outils technologiques exclusifs conçus pour optimiser votre gestion opérationnelle et maximiser votre rentabilité. Gestion de projets, CRM, suivi budgétaire et bien plus.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nos solutions technologiques vous permettent d'automatiser les tâches administratives et de vous concentrer sur la croissance de votre franchise.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Plateforme CRM intégrée et facile à utiliser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Système de gestion des devis et factures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Tableau de bord analytique en temps réel</span>
                  </li>
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-lg h-80 lg:order-1"
              >
                <OptimizedImage
                  src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251206_1741_Outils%20Technologiques%20Performants_simple_compose_01kbt8hrc7fk29ay5qsww4d4bq.png"
                  alt="Outils technologiques performants rénovation maison - Gestion entreprise de rénovation"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4 lg:order-1">
                <div className="inline-block px-4 py-2 bg-orange-100 rounded-full">
                  <p className="text-orange-700 font-semibold text-sm">Réseau Collaboratif</p>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Réseau Professionnel Solide</h3>
                <p className="text-gray-700 leading-relaxed">
                  Rejoignez un réseau dynamique de franchisés et de partenaires professionnels. Échangez les meilleures pratiques, collaborez sur des projets complexes et bénéficiez de l'expérience collective.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Notre réseau de 75+ artisans qualifiés et partenaires vous donne accès à des ressources uniques pour servir vos clients et accélérer votre croissance.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Accès préférentiel à nos 75+ artisans qualifiés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Communauté franchisés avec réunions trimestrielles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Partage des opportunités et projets importants</span>
                  </li>
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-lg h-80 lg:order-2"
              >
                <OptimizedImage
                  src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251206_1857_Re%CC%81seau%20Dynamique%20Professionnel_simple_compose_01kbtcvf9rff5tg88rnavnx2zm.png"
                  alt="Réseau professionnel dynamique artisan - Peintre en bâtiment et travaux de rénovation maison"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <TeamCTABanner onNavigate={onNavigate} />

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Chiffres Clés</h2>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-[#38bdf8] mb-2">10+</div>
                <p className="text-gray-600">Années d'expérience éprouvée</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#38bdf8] mb-2">300+</div>
                <p className="text-gray-600">Projets de rénovation réalisés</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#38bdf8] mb-2">75+</div>
                <p className="text-gray-600">Professionnels dans notre réseau</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#38bdf8] mb-2">99%</div>
                <p className="text-gray-600">Satisfaction client</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Prérequis et Qualifications</h2>
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Les étapes clés pour ouvrir votre franchise
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Vous souhaitez entreprendre dans le secteur du bâtiment avec un concept éprouvé et un accompagnement sur mesure ? Découvrez ci-dessous les étapes essentielles qui jalonnent votre parcours pour intégrer notre réseau et concrétiser votre projet entrepreneurial dans la rénovation tous corps d'état.
                </p>
                <p className="text-[#38bdf8] font-semibold pt-2">Envie d'en savoir plus?</p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#38bdf8] text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-96"
            >
              <OptimizedImage
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Rendez-vous franchise rénovation - Équipe entreprise bâtiment travaux rénovation maison complète"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à Rejoindre Notre Réseau ?
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous pour nous soumettre votre candidature. Nous examinerons votre dossier et vous contacterons rapidement pour en discuter.
          </p>
        </motion.div>
      </motion.div>

      <div id="franchise-application-form" className="bg-white text-gray-900 py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full">
          <div className="text-center mb-14 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 uppercase">
              Candidature <span className="text-[#38bdf8]">Franchise</span>
            </h2>

            <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              Remplissez le formulaire ci-dessous pour nous soumettre votre candidature de franchise. Notre équipe examinera votre dossier et vous contactera dans les 48 heures pour discuter de cette opportunité.
            </p>
          </div>

          <div className="flex justify-center w-full">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScn-wVlGoFAoclt9NsnuinDHcGEWYsXmR7ZKI7DSbeDMT4nFg/viewform?embedded=true"
              width="640"
              height="2352"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
              title="Formulaire de candidature franchise"
            >
              Chargement…
            </iframe>
          </div>
        </div>
      </div>

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => {}} />
    </div>
  );
};

export default DevenirFranchisePage;
