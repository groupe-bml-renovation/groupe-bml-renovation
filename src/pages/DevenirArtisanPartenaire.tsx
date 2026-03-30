import React from 'react';
import { CheckCircle, Briefcase, Award, Zap, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FooterSection } from '../components/footer-section';

interface DevenirArtisanPartenairePageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const DevenirArtisanPartenairePage: React.FC<DevenirArtisanPartenairePageProps> = ({ onBack, onNavigate = onBack }) => {
  const benefits = [
    {
      icon: Briefcase,
      title: "Flux de Commandes Réguliers",
      description: "Accédez à un flux continu de projets de rénovation sélectionnés"
    },
    {
      icon: Award,
      title: "Reconnaissance Professionnelle",
      description: "Soyez identifié comme partenaire qualifié de BML Rénovation"
    },
    {
      icon: Zap,
      title: "Avantages Financiers",
      description: "Tarifs préférentiels, bonus de performance et opportunités de revenus supplémentaires basées sur votre volume de chantiers"
    },
    {
      icon: DollarSign,
      title: "Rémunération Compétitive",
      description: "Tarifs justes et paiements réguliers selon les modalités convenues"
    },
    {
      icon: Users,
      title: "Réseau de Partenaires",
      description: "Collaborez avec d'autres professionnels qualifiés dans votre région"
    },
    {
      icon: CheckCircle,
      title: "Outils Professionnels Avancés",
      description: "Accès à notre application de devis avec visualisation 3D de maisons et intégration de design intérieur pour signer vos devis professionnellement"
    }
  ];

  const requirements = [
    "Qualification professionnelle dans votre domaine (diplôme, certification ou expérience validée)",
    "Assurance responsabilité civile professionnelle à jour",
    "Garantie décennale ou couverture équivalente",
    "Expérience minimale de 3 ans dans votre spécialité",
    "Disponibilité pour interventions régulières",
    "Respect des normes de qualité et de sécurité",
    "Capacité à utiliser les outils numériques",
    "Engagement à respecter les délais convenus et assurer la satisfaction client",
    "Communication régulière et transparence sur l'état d'avancement des chantiers",
    "Acceptation de nos processus de contrôle qualité et d'évaluation de satisfaction"
  ];

  const specializations = [
    "Peinture",
    "Plomberie",
    "Électricité",
    "Menuiserie",
    "Maçonnerie",
    "Chauffage",
    "Climatisation",
    "Carrelage",
    "Isolation",
    "Couverture",
    "Serrurerie",
    "Vitrerie"
  ];

  const steps = [
    {
      number: "1",
      title: "Candidature",
      description: "Soumettez votre profil et vos qualifications"
    },
    {
      number: "2",
      title: "Vérification",
      description: "Nous vérifions vos certifications et références"
    },
    {
      number: "3",
      title: "Entretien",
      description: "Échange avec notre responsable des partenaires"
    },
    {
      number: "4",
      title: "Accord",
      description: "Signature de l'accord de partenariat"
    },
    {
      number: "5",
      title: "Intégration",
      description: "Présentation des processus et des premiers projets"
    },
    {
      number: "6",
      title: "Collaboration",
      description: "Démarrage des interventions et suivi continu"
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
        <title>Artisan Rénovation Maison | Devenir Partenaire Entreprise Bâtiment BML</title>
        <meta name="description" content="Devenir artisan partenaire en rénovation maison, peintre en bâtiment et travaux de rénovation. Rejoignez notre réseau de rénovation maison complète, rénovation intérieure et extérieure. Entreprise de rénovation cherche peintre dans le bâtiment et artisan rénovation pour travaux maison." />
        <meta name="keywords" content="artisan rénovation maison, rénovation maison, rénover une maison, entreprise de rénovation, peintre en bâtiment, travaux de rénovation maison, rénovation maison complète, rénovation intérieure, rénovation extérieure, travaux maison, prix rénovation maison, coût rénovation maison, peintre dans le bâtiment, rénovation maison ancienne, bâtiment travaux publics, entreprise bâtiment rénovation, travaux de peinture bâtiment" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-20">
          <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
            Opportunité Partenariat en Rénovation
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Devenir Artisan Partenaire en Travaux de Rénovation Maison</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Rejoignez notre réseau de professionnels qualifiés et développez votre activité en collaboration avec BML Rénovation. Accédez à des flux de projets réguliers et travaillez aux côtés d'une équipe engagée dans l'excellence.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-stretch mb-20 bg-gradient-to-br from-slate-50 to-blue-50 p-8 lg:p-12 rounded-3xl border border-gray-200 overflow-hidden relative"
        >
          <div className="space-y-6 z-10">
            <div className="space-y-4">
              <p className="text-[#38bdf8] font-semibold text-sm uppercase tracking-wide">
                Une Collaboration Gagnant-Gagnant en Rénovation Maison
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Développez votre activité d'artisan rénovation avec un partenaire en travaux de rénovation maison
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Chez BML Rénovation, nous croyons au partenariat authentique. Nous cherchons des artisans qualifiés et passionnés qui partagent notre engagement envers l'excellence et la satisfaction client. Notre modèle de collaboration est pensé pour créer une relation durable et mutuellement bénéfique où chacun peut prospérer.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              En rejoignant notre réseau, vous bénéficiez d'une plateforme d'accès à des projets qualifiés pré-sélectionnés, sans avoir à gérer vous-même la prospection commerciale. Nous gérons le marketing, la relation client et l'administratif, vous permettant de vous concentrer sur ce que vous maîtrisez le mieux : votre métier.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Croissance régulière du chiffre d'affaires grâce à un flux continu de projets sélectionnés</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Support administratif et logistique complet incluant facturation et suivi de projet</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Formation continue et accès aux dernières technologies et méthodes de travail</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Reconnaissance et visibilité professionnelle à travers notre plateforme et marketing</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Accès à une communauté de professionnels pour partager expériences et meilleures pratiques</p>
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
            <video
              src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/1128.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-start mb-20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251128_1127_Laptop%20Screen%20Display_remix_01kb4zxxaheg0tqme6tkqwt94y.png"
              alt="Interface de gestion des projets de rénovation maison pour artisan rénovation et travaux de rénovation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Conditions de Partenariat pour Peintre et Artisan en Bâtiment</h2>
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Métiers Recherchés en Rénovation Maison - Peintre, Artisan Bâtiment</h2>
            <div className="grid grid-cols-2 gap-4">
              {specializations.map((spec, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 text-center font-medium text-gray-700 hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors"
                >
                  {spec}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Processus de Candidature pour Artisan Rénovation Maison</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#38bdf8] transition-colors">
                  <div className="w-12 h-12 bg-[#38bdf8] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#38bdf8]"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border border-gray-200 text-center"
          >
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Plus de</p>
            <div className="text-5xl font-bold text-[#38bdf8] mb-2">300</div>
            <p className="text-gray-600 font-semibold">chantiers menés à bien</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border border-gray-200 text-center"
          >
            <div className="text-xl text-gray-600 font-semibold mb-1">Plus de</div>
            <div className="text-5xl font-bold text-[#38bdf8] mb-2">3,000,000€</div>
            <p className="text-gray-600 font-semibold">de chantiers</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border border-gray-200 text-center"
          >
            <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Plus de</p>
            <div className="text-5xl font-bold text-[#38bdf8] mb-2">10</div>
            <p className="text-gray-600 font-semibold">artisans</p>
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
            Intéressé par le Partenariat en Travaux de Rénovation Maison ?
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            Soumettez votre candidature ci-dessous. Nous examinerons votre profil et vous contacterons pour discuter des modalités de collaboration.
          </p>
        </motion.div>
      </motion.div>

      <div className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gray-900 uppercase">
              Soumettez Votre <span className="text-[#38bdf8]">Candidature d'Artisan Rénovation</span>
            </h2>
            <p className="text-center text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Remplissez le formulaire ci-dessous pour nous soumettre votre candidature en tant qu'artisan partenaire.
            </p>
          </div>

          <div className="flex justify-center">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeMSzgtr2Q4E_nO4AA9lZiyUj11KucyLmLEVfI4x3FqreJCIg/viewform?embedded=true"
              width="640"
              height="2703"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
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

export default DevenirArtisanPartenairePage;
