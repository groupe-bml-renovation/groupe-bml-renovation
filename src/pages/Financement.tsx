import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Euro, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import RenovationFinancingCalculator from '../components/RenovationFinancingCalculator';
import SimplifiedFinancingProcess from '../components/SimplifiedFinancingProcess';
import FinancingHighlights from '../components/FinancingHighlights';

interface FinancingItem {
  id: string;
  title: string;
  content: string;
  category: string;
  order: number;
}

interface FAQPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const FINANCING_DATA: FinancingItem[] = [
  {
    id: '1',
    title: 'Quels types de financement proposez-vous ?',
    content: 'Nous travaillons avec un réseau de partenaires bancaires pour vous proposer plusieurs solutions de financement adaptées à votre situation : prêt personnel, crédit à la consommation, prêt immobilier, prêt travaux, éco-PTZ (Prêt à Taux Zéro) pour les rénovations énergétiques, et autres aides régionales. Chaque solution est étudiée en fonction de votre projet, votre capacité d\'emprunt et vos préférences.',
    category: 'Solutions de Financement',
    order: 1,
  },
  {
    id: '2',
    title: 'Quels sont les critères d\'éligibilité pour un financement ?',
    content: 'Pour être éligible à nos solutions de financement, vous devez être majeur, résident français ou avec une adresse stable en France, et disposer de revenus réguliers. Les critères précis dépendent du type de financement choisi. Lors de notre consultation gratuite, nous étudions votre dossier en détail et identifions les solutions pour lesquelles vous pouvez être approuvé. Aucun emprunt n\'est impossible, seule la structure change selon votre profil.',
    category: 'Éligibilité et Critères',
    order: 1,
  },
  {
    id: '3',
    title: 'Quel est le taux d\'intérêt appliqué ?',
    content: 'Les taux d\'intérêt varient selon le type de crédit, la durée du prêt, votre profil emprunteur et les conditions bancaires actuelles. Un taux sans intérêt (0%) peut être proposé pour certains projets éligibles à l\'éco-PTZ. Lors de la recherche de financement, nous négocions les meilleures conditions auprès de nos partenaires bancaires pour obtenir des taux compétitifs. Vous recevrez un comparatif détaillé avec tous les taux avant de faire votre choix.',
    category: 'Taux et Conditions',
    order: 1,
  },
  {
    id: '4',
    title: 'Quels documents dois-je préparer pour ma demande de financement ?',
    content: 'Vous devrez généralement fournir : pièce d\'identité, justificatif de domicile récent, derniers bulletins de salaire ou avis d\'imposition, détails de votre projet de rénovation, et devis de travaux. Pour les propriétaires immobiliers, un justificatif de propriété peut être demandé. Ne vous inquiétez pas, nous vous guidons dans la constitution de votre dossier. Nous vous communiquons la liste exacte des documents nécessaires lors de notre première rencontre.',
    category: 'Documents Requis',
    order: 1,
  },
  {
    id: '5',
    title: 'Combien de temps faut-il pour obtenir une approbation de financement ?',
    content: 'Le délai d\'approbation varie selon le type de financement et la complexité de votre dossier. Généralement, comptez entre 5 à 15 jours ouvrables après la transmission complète de votre dossier. Une fois approuvé, le déblocage des fonds peut intervenir sous 2 à 5 jours. Dans certains cas urgents, nous pouvons accélérer le processus. Nous vous tenons informé à chaque étape et vous communiquons un délai réaliste dès le démarrage.',
    category: 'Délais',
    order: 1,
  },
  {
    id: '6',
    title: 'Y a-t-il des frais cachés ou des frais de dossier ?',
    content: 'Non, il n\'y a aucun frais caché. Notre accompagnement financier est transparent et ne vous coûte rien jusqu\'à l\'obtention de votre prêt. Les seuls frais applicables sont ceux imposés par la banque (frais de dossier, assurance emprunteur, si applicable) et ces frais vous sont communiqués en détail avant la signature. Nous facturons notre accompagnement uniquement après le déblocage du prêt, jamais avant.',
    category: 'Tarification',
    order: 1,
  },
  {
    id: '7',
    title: 'Quel est le montant minimum et maximum que je peux emprunter ?',
    content: 'Le montant minimum généralement proposé est de 5 000€ et le maximum peut atteindre plusieurs centaines de milliers d\'euros selon le type de crédit et votre capacité d\'endettement. Pour un prêt immobilier, les montants peuvent être encore plus importants. Lors de notre consultation, nous analysons votre capacité d\'emprunt exacte et vous proposons des solutions adaptées à vos besoins réels, du plus petit au plus grand projet.',
    category: 'Montants',
    order: 1,
  },
  {
    id: '8',
    title: 'Que couvre exactement votre accompagnement financier ?',
    content: 'Notre accompagnement financier inclut : une consultation approfondie pour évaluer vos besoins, une analyse complète de votre situation financière, l\'élaboration d\'un dossier complet, la recherche des meilleures offres auprès de nos partenaires bancaires, la négociation des conditions, la comparaison des offres, et le suivi jusqu\'au déblocage du prêt. Nous gérons l\'ensemble de la démarche pour que vous n\'ayez qu\'à valider votre choix final.',
    category: 'Services d\'Accompagnement',
    order: 1,
  },
  {
    id: '9',
    title: 'Puis-je rembourser mon prêt par anticipation sans pénalité ?',
    content: 'La possibilité de remboursement anticipé et les conditions associées dépendent du contrat de prêt spécifique. Généralement, les prêts à la consommation permettent un remboursement anticipé total ou partiel avec peu ou pas de pénalités. Les prêts immobiliers peuvent prévoir des indemnités de remboursement anticipé. Nous vous expliquons clairement ces conditions lors de la signature du contrat, et ce point sera détaillé dans toutes les offres reçues.',
    category: 'Remboursement',
    order: 1,
  },
  {
    id: '10',
    title: 'Quels sont les aides et subventions possibles pour ma rénovation ?',
    content: 'Selon la nature de vos travaux (rénovation énergétique, amélioration de performance thermique, accessibilité, etc.), vous pourriez être éligible à : l\'éco-PTZ, MaPrimeRénov\', les subventions de l\'Anah, les CEE (Certificats d\'Économie d\'Énergie), les déductions fiscales, ou d\'autres aides régionales. Nous étudions votre projet pour identifier les aides applicables et les intégrons dans notre stratégie de financement pour minimiser votre coût total.',
    category: 'Aides et Subventions',
    order: 1,
  },
  {
    id: '11',
    title: 'Comment se déroule votre accompagnement du début à la fin ?',
    content: 'Notre accompagnement suit 9 étapes clés : (1) Vous complétez notre formulaire de présentation. (2) Consultation avec notre conseiller financier pour analyser votre situation. (3) Remise d\'un devis transparent pour l\'accompagnement. (4) Signature d\'un mandat pour rechercher votre financement. (5) Recherche active auprès de nos partenaires bancaires. (6) Analyse et présentation d\'un comparatif des offres. (7) Vous choisissez l\'offre qui vous convient. (8) Déblocage du prêt. (9) Facturation de notre service après déblocage.',
    category: 'Processus',
    order: 1,
  },
  {
    id: '12',
    title: 'Y a-t-il un engagement de ma part après l\'obtention du financement ?',
    content: 'Non, il n\'y a pas d\'engagement après l\'obtention du prêt. Une fois que vous avez signé votre contrat de prêt auprès de la banque, vous êtes libre d\'utiliser le financement selon les conditions convenues. Nous recommandons de respecter le calendrier des travaux pour éviter que les fonds n\'expirent, mais cela dépend uniquement de vos arrangements avec votre prêteur.',
    category: 'Engagements',
    order: 1,
  },
];

const Financement: React.FC<FAQPageProps> = ({ onBack, onNavigate = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate(isGrenoble ? '/grenoble/?scrollTo=contact-form' : '/?scrollTo=contact-form');
  };

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
      ? 'Financement Rénovation Isère : Aides, Prêts & MaPrimeRénov\''
      : 'Aides & Financement Rénovation : Maximisez vos Prêts',
    description: isGrenoble
      ? 'Solutions de financement pour rénovation maison à Grenoble et Isère. Prêts travaux, éco-PTZ, aides gouvernementales. Accompagnement gratuit et sans engagement. Expert en financement de rénovation en Isère.'
      : 'Financement flexible pour vos rénovations maison. Découvrez prêts travaux, éco-PTZ, aides gouvernementales, et solutions de crédit adaptées. Accompagnement gratuit jusqu\'à déblocage du prêt.',
    keywords: isGrenoble
      ? 'financement rénovation Grenoble, prêt travaux Isère, éco-PTZ Grenoble, financement maison Grenoble, aide rénovation Isère, crédit rénovation'
      : 'financement rénovation, prêt travaux, éco-PTZ, aide rénovation maison, crédit rénovation, financement maison, prêt immobilier rénovation, MaPrimeRénov',
    ogTitle: isGrenoble
      ? 'Financement Rénovation Grenoble - Solutions de Crédit & Aides | BML'
      : 'Financement Rénovation Maison - Solutions Complètes | Groupe BML',
    ogDescription: isGrenoble
      ? 'Trouvez le meilleur financement pour votre rénovation à Grenoble. Prêts travaux, éco-PTZ, aides régionales. Accompagnement gratuit par nos experts.'
      : 'Accédez à des solutions de financement complètes pour vos rénovations. Prêts travaux, éco-PTZ, aides gouvernementales, accompagnement expert.',
    twitterTitle: isGrenoble
      ? 'Financement Rénovation Grenoble - BML'
      : 'Financement Rénovation Maison - Groupe BML',
    twitterDescription: isGrenoble
      ? 'Solutions de financement pour rénovation maison à Grenoble. Accompagnement gratuit et conseil d\'expert.'
      : 'Solutions de financement pour vos rénovations maison. Découvrez nos offres flexibles et accompagnement personnalisé.',
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
            <link rel="canonical" href={`${window.location.origin}/grenoble/financement`} />
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
            Votre Accompagnement Financier
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {isGrenoble
                ? 'Solutions de financement pour vos projets de rénovation à Grenoble'
                : 'Solutions de financement pour vos projets de rénovation'}
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {isGrenoble
              ? 'Découvrez toutes les solutions de financement pour concrétiser votre projet de rénovation à Grenoble et en Isère.\n\nUn expert financier dédié prend en charge l\'intégralité du dossier, de l\'analyse jusqu\'à l\'accord.\n\nLes démarches sont lancées sans facture ni avance de votre part. Nous ne sommes rémunérés qu\'une fois le financement accepté.'
              : 'Découvrez toutes les solutions de financement pour concrétiser votre projet de rénovation en France.\n\nUn expert financier dédié prend en charge l\'intégralité du dossier, de l\'analyse jusqu\'à l\'accord.\n\nLes démarches sont lancées sans facture ni avance de votre part. Nous ne sommes rémunérés qu\'une fois le financement accepté.'
            }
          </p>
        </div>
      </motion.div>

      <RenovationFinancingCalculator />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto px-6 mt-20"
      >
        <SimplifiedFinancingProcess />

        <FinancingHighlights />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-white rounded-2xl border-2 border-gray-100 p-6 sm:p-8 lg:p-12 shadow-lg"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Documents & Aides Disponibles
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-900">Pièces à Préparer</h3>
                <ul className="space-y-2">
                  {['Pièce d\'identité', 'Justificatif de domicile', 'Derniers bulletins de salaire', 'Avis d\'imposition', 'Devis de vos travaux'].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-900">Aides & Subventions</h3>
                <ul className="space-y-2">
                  {['Éco-PTZ (0% sans intérêt)', 'MaPrimeRénov\'', 'Subventions de l\'Anah', 'CEE (Certificats d\'Économie d\'Énergie)', 'Aides régionales'].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                      <span className="text-cyan-500 font-bold">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {isGrenoble
              ? "Besoin de Plus d'Informations ?"
              : "Besoin de Plus d'Informations ?"}
          </h2>
          <p className="text-sky-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Consultez notre guide complet du financement pour découvrir toutes les solutions disponibles et les réponses à vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#faqs"
              className="inline-flex items-center gap-2 bg-white text-[#38bdf8] font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Voir les Questions Fréquentes
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@groupe-bml-renovation.com"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
            >
              Demander une Consultation
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          id="faqs"
          className="mt-16 sm:mt-24 bg-white rounded-2xl border-2 border-gray-100 p-6 sm:p-8 lg:p-12 shadow-lg"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Questions Fréquentes
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Les réponses à vos questions sur nos solutions de financement
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {FINANCING_DATA.slice(0, 6).map((item) => (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  className="bg-white border-2 border-gray-200 rounded-lg hover:border-[#38bdf8] transition-all"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="w-full text-left p-6 flex items-start justify-between hover:bg-gray-50 transition-colors"
                    aria-expanded={expandedId === item.id}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-400 flex-shrink-0 ml-4 transition-transform ${
                        expandedId === item.id ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {expandedId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 px-6 py-4 bg-gray-50"
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <FooterSection onNavigateToServices={() => onBack()} onNavigate={onNavigate} />
    </div>
  );
};

export default Financement;
