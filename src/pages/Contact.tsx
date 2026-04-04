import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import UnifiedContactForm from '../components/UnifiedContactForm';
import { trackPhoneClick, trackContactForm } from '../lib/analytics';

interface ContactPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactPageProps> = ({ onBack, onNavigate = () => {} }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');
  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: '07 56 91 59 97',
      description: 'Appelez-nous directement',
      href: 'tel:0756915997'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@groupe-bml-renovation.com',
      description: 'Réponse sous 24 heures',
      href: 'mailto:contact@groupe-bml-renovation.com'
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Groupe BML - Entreprise de Rénovation",
    "description": isGrenoble
      ? "Entreprise de rénovation maison à Grenoble spécialisée en travaux de rénovation complète, intérieure et extérieure en Isère. Artisan rénovation Grenoble."
      : "Entreprise de rénovation maison spécialisée en travaux de rénovation complète, intérieure et extérieure. Peintre en bâtiment, artisan rénovation maison, travaux bâtiment.",
    "url": isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/contact" : "https://groupe-bml-renovation.fr/contact",
    "telephone": "+33756915997",
    "email": "contact@groupe-bml-renovation.com",
    "areaServed": isGrenoble ? "Grenoble, Isère, France" : "FR",
    "serviceType": isGrenoble
      ? ["rénovation maison grenoble", "travaux de rénovation isère", "peinture bâtiment grenoble", "rénovation maison complète grenoble", "rénovation maison ancienne grenoble"]
      : ["rénovation maison", "travaux de rénovation", "peinture bâtiment", "rénovation maison complète", "rénovation maison ancienne"],
    "priceRange": "$$"
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <Helmet>
        <title>{isGrenoble ? "Contactez-Nous - Rénovation Maison Grenoble | Entreprise de Rénovation Grenoble | BML Isère" : "Contactez-Nous - Rénovation Maison Complète | Entreprise de Rénovation BML | Travaux Artisan"}</title>
        <meta name="description" content={isGrenoble ? "Contactez Groupe BML pour vos travaux de rénovation maison à Grenoble et en Isère. Entreprise de rénovation spécialisée en rénovation maison complète, peinture en bâtiment et travaux de rénovation. Devis gratuit. Appelez-nous au 07 56 91 59 97." : "Contactez Groupe BML pour vos travaux de rénovation maison. Entreprise de rénovation spécialisée en rénovation maison complète, peinture en bâtiment et travaux de rénovation. Devis gratuit. Appelez-nous au 07 56 91 59 97."} />
        <meta name="keywords" content={isGrenoble ? "rénovation maison grenoble, renovation maison grenoble, rénover une maison grenoble, rénovation grenoble, rénovations isère, rénovation intérieure grenoble, rénovation extérieure grenoble, travaux maison grenoble, entreprise rénovation grenoble, artisan rénovation grenoble, peinture bâtiment grenoble" : "rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation"} />
        <meta property="og:title" content={isGrenoble ? "Contactez Notre Entreprise de Rénovation Maison à Grenoble | Groupe BML" : "Contactez Notre Entreprise de Rénovation Maison | Groupe BML"} />
        <meta property="og:description" content={isGrenoble ? "Travaux de rénovation maison professionnels à Grenoble et en Isère. Rénovation maison complète, peinture bâtiment, artisan rénovation. Devis gratuit et consultation sans engagement." : "Travaux de rénovation maison professionnels. Rénovation maison complète, peinture bâtiment, artisan rénovation. Devis gratuit et consultation sans engagement."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/contact" : "https://groupe-bml-renovation.fr/contact"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? "Rénovation Maison Grenoble - Contactez Groupe BML" : "Rénovation Maison - Contactez Groupe BML"} />
        <meta name="twitter:description" content={isGrenoble ? "Entreprise de rénovation maison à Grenoble spécialisée en travaux de rénovation complète, peinture bâtiment, et artisan rénovation en Isère. Devis gratuit." : "Entreprise de rénovation maison spécialisée en travaux de rénovation complète, peinture bâtiment, et artisan rénovation. Devis gratuit."} />
        <link rel="canonical" href={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/contact" : "https://groupe-bml-renovation.fr/contact"} />
        <meta name="language" content="fr" />
        <meta name="geo.region" content={isGrenoble ? "FR-38" : "FR"} />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>
      <UnifiedContactForm />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">{isGrenoble ? "Contactez Notre Entreprise de Rénovation à Grenoble" : "Contactez Notre Entreprise de Rénovation"}</span>
          </h1>
          <h2 className="sr-only">
            {isGrenoble
              ? "Rénovation maison Grenoble, travaux de rénovation intérieure et extérieure Grenoble, peintre en bâtiment Grenoble, artisan rénovation maison Isère"
              : "Rénovation maison complète, travaux de rénovation intérieure et extérieure, peintre en bâtiment, artisan rénovation maison"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isGrenoble
              ? "Vous avez un projet de rénovation à Grenoble ou en Isère ? Notre équipe de professionnels qualifiés est prête à vous aider. Contactez-nous pour un devis gratuit et sans engagement !"
              : "Vous avez une question ou un projet ? Notre équipe de professionnels qualifiés est prête à vous aider. N'hésitez pas à nous contacter !"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const handleClick = () => {
              if (info.title === 'Téléphone') {
                trackPhoneClick(info.value);
              } else {
                trackContactForm({ contact_type: info.title.toLowerCase() });
              }
            };
            const headingText = info.title === 'Téléphone'
              ? 'Contactez Notre Artisan Rénovation par Téléphone'
              : 'Email pour Vos Travaux de Rénovation Maison';

            return (
              <motion.a
                key={index}
                href={info.href}
                onClick={handleClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 border border-gray-200 hover:border-cyan-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <span className="sr-only">{headingText}</span>
                  <span aria-hidden="true">{info.title}</span>
                </h3>
                <p className="text-gray-900 font-medium mb-2">{info.value}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
      <FooterSection onNavigateToServices={() => onBack()} onNavigate={onNavigate} />
    </div>
  );
};

export default Contact;
