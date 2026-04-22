import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, Mail, Phone, Calendar, Copy, Check, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import { trackPageView } from '../lib/analytics';

interface ConfirmationDevisProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ConfirmationDevis: React.FC<ConfirmationDevisProps> = ({ onBack, onNavigate = () => {} }) => {
  const [copied, setCopied] = React.useState(false);
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  React.useEffect(() => {
    const pagePath = isGrenoble ? '/grenoble/confirmation-devis' : '/confirmation-devis';
    const pageTitle = isGrenoble ? 'Confirmation de Devis - Grenoble' : 'Confirmation de Devis';
    trackPageView(pagePath, pageTitle);
  }, [isGrenoble]);

  const copyDiscountCode = () => {
    navigator.clipboard.writeText('GBML5OFF');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextSteps = [
    {
      icon: Mail,
      number: '1',
      title: 'Email de confirmation',
      description: isGrenoble
        ? 'Vous recevrez immédiatement un email avec votre numéro de dossier et un cadeau gratuit (e-book). Notre équipe Grenoble vous contactera rapidement.'
        : 'Vous recevrez immédiatement un email avec votre numéro de dossier et un cadeau gratuit (e-book).',
      timeline: 'Immédiat'
    },
    {
      icon: Phone,
      number: '2',
      title: 'Appel de notre équipe',
      description: isGrenoble
        ? 'Un membre de notre équipe Grenoble vous contactera pour discuter de votre projet de rénovation et fixer un rendez-vous sur site.'
        : 'Un membre de notre service client vous contactera pour discuter de votre projet et fixer un rendez-vous.',
      timeline: 'Sous 24h'
    },
    {
      icon: Calendar,
      number: '3',
      title: 'Rendez-vous personnalisé',
      description: isGrenoble
        ? 'Nous fixerons un rendez-vous à votre domicile à Grenoble pour évaluer votre projet en détail et vous proposer une solution adaptée à vos besoins.'
        : 'Nous fixerons un rendez-vous à votre convenance pour explorer votre projet en détail et vous proposer la meilleure solution.',
      timeline: 'À convenir'
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": isGrenoble ? [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://groupe-bml-renovation.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Grenoble",
        "item": "https://groupe-bml-renovation.com/grenoble"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Confirmation de devis",
        "item": "https://groupe-bml-renovation.com/grenoble/confirmation-devis"
      }
    ] : [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://groupe-bml-renovation.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Confirmation de devis",
        "item": "https://groupe-bml-renovation.com/confirmation-devis"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>
          {isGrenoble
            ? 'Demande de Devis Confirmée Grenoble | Groupe BML Rénovation'
            : 'Demande de Devis Confirmée | Groupe BML Rénovation - Rénovation Maison'}
        </title>
        <meta
          name="description"
          content={isGrenoble
            ? 'Votre demande de devis gratuit pour Grenoble a été reçue avec succès. Notre équipe grenobloise vous contactera sous 24 heures pour discuter de votre projet de rénovation.'
            : 'Votre demande de devis gratuit a été reçue avec succès. Nous vous contacterons sous 24 heures pour discuter de votre projet de rénovation.'}
        />
        <meta
          property="og:title"
          content={isGrenoble
            ? 'Demande de Devis Confirmée Grenoble | Groupe BML Rénovation'
            : 'Demande de Devis Confirmée | Groupe BML Rénovation'}
        />
        <meta
          property="og:description"
          content={isGrenoble
            ? 'Votre demande de devis pour Grenoble a été confirmée. Notre équipe locale vous contactera rapidement pour discuter de votre projet.'
            : 'Merci d\'avoir soumis votre demande de devis. Notre équipe vous rappellera rapidement.'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={isGrenoble
            ? 'https://groupe-bml-renovation.com/grenoble/confirmation-devis'
            : 'https://groupe-bml-renovation.com/confirmation-devis'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={isGrenoble
            ? 'Demande de Devis Confirmée Grenoble | Groupe BML Rénovation'
            : 'Demande de Devis Confirmée | Groupe BML Rénovation'}
        />
        <meta
          name="twitter:description"
          content={isGrenoble
            ? 'Votre demande de devis pour Grenoble a été confirmée. Notre équipe locale vous contactera rapidement.'
            : 'Merci d\'avoir soumis votre demande de devis. Notre équipe vous rappellera rapidement.'}
        />
        <link
          rel="canonical"
          href={isGrenoble
            ? 'https://groupe-bml-renovation.com/grenoble/confirmation-devis'
            : 'https://groupe-bml-renovation.com/confirmation-devis'}
        />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8 flex justify-center"
          >
            <CheckCircle className="w-20 h-20 text-[#38bdf8]" />
          </motion.div>

          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              Confirmation de devis
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {isGrenoble
                ? 'Votre demande a été reçue à Grenoble !'
                : 'Votre demande a été reçue !'}
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-4">
            {isGrenoble
              ? 'Merci d\'avoir choisi Groupe BML Rénovation pour votre projet de rénovation à Grenoble.'
              : 'Merci d\'avoir choisi Groupe BML Rénovation pour votre projet de rénovation.'}
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isGrenoble
              ? 'Nous avons bien reçu votre demande de devis gratuit. Notre équipe de spécialistes en rénovation basée à Grenoble vous contactera très bientôt pour discuter de vos besoins et mettre en place votre projet.'
              : 'Nous avons bien reçu votre demande de devis gratuit. Un membre de notre équipe de spécialistes en rénovation vous contactera très bientôt pour discuter de vos besoins et mettre en place votre projet.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Ce qui se passe ensuite
          </h2>

          <div className="space-y-8">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex gap-6 md:gap-8 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-cyan-600" />
                      <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      <span className="ml-auto text-sm font-medium text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-gray-600 text-base">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 mb-20"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Vos cadeaux exclusifs</h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mb-8 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl p-6 md:p-8"
          >
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                OFFRE EXCLUSIVE
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                5% de réduction
              </h3>
              <p className="text-gray-700 mb-6">
                Sur votre projet de rénovation
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="flex-1 max-w-xs bg-white rounded-lg border-2 border-emerald-300 p-4 flex items-center justify-between">
                  <code className="text-2xl font-bold text-emerald-600 tracking-widest">GBML5OFF</code>
                  <button
                    onClick={copyDiscountCode}
                    className="ml-3 p-2 hover:bg-emerald-100 rounded-lg transition-all duration-200"
                    title="Copier le code"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-emerald-600 hover:text-emerald-700" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Utilisez ce code lors de la signature de votre contrat
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6 md:p-8"
          >
            <div className="flex gap-4 items-start mb-6">
              <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  ACCÈS IMMÉDIAT
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">E-book gratuit</h3>
                <p className="text-gray-700 mb-6">Un guide complet de décoration intérieure et rénovation pour vous inspirer et visualiser différents univers de design.</p>
                <a
                  href="https://www.calameo.com/read/008114113161bf4446d03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
                >
                  Lire l'e-book maintenant
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">E-book gratuit</h3>
                <p className="text-gray-600">Accédez à votre guide gratuit et commencez à explorer les différents univers de design disponibles.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Consultation gratuite</h3>
                <p className="text-gray-600">Une conversation personnalisée avec l'un de nos experts pour évaluer votre projet sans engagement.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Suivi dédié</h3>
                <p className="text-gray-600">Un interlocuteur unique qui suivra votre projet de A à Z pour assurer une expérience sans souci.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Vous avez des questions ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="tel:0756915997"
              className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-200 hover:border-blue-400"
            >
              <Phone className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-2">Appelez-nous</h3>
              <p className="text-gray-600 mb-3">
                <span>07 56 91 59 97</span>
              </p>
              <p className="text-sm text-gray-500">Disponible en semaine de 8h à 18h</p>
            </a>

            <a
              href="mailto:contact@groupe-bml-renovation.com"
              className="group p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 hover:from-cyan-100 hover:to-teal-100 transition-all duration-300 border border-cyan-200 hover:border-cyan-400"
            >
              <Mail className="w-8 h-8 text-cyan-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-2">Envoyez-nous un email</h3>
              <p className="text-gray-600 mb-3 text-sm break-all">contact@groupe-bml-renovation.com</p>
              <p className="text-sm text-gray-500">Réponse garantie en moins de 24h</p>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <button
            onClick={() => onBack()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            Retour à l'accueil
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-4xl mx-auto text-center text-gray-600 text-sm"
        >
          <p>
            À bientôt ! L'équipe de <span className="font-semibold text-gray-900">Groupe BML Rénovation</span>
          </p>
        </motion.div>
      </div>

      <FooterSection onNavigateToServices={() => onBack()} onNavigate={onNavigate} />
    </div>
  );
};

export default ConfirmationDevis;
