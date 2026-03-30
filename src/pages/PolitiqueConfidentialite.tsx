import React from 'react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';

interface PolicyPageProps {
  onBack: () => void;
}

const PolitiqueConfidentialite: React.FC<PolicyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Groupe BML Rénovation tout corps d'état ("la Société") est engagée à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et traitons vos données personnelles en relation avec nos services de rénovation et nos plateformes numériques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Données Personnelles Collectées</h2>
            <p className="mb-4">Nous collectons les données personnelles suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Informations d'identification :</strong> Nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong>Informations de contact :</strong> Adresse postale, numéro de téléphone, adresse email</li>
              <li><strong>Informations sur les projets :</strong> Description des travaux de rénovation, photos, devis</li>
              <li><strong>Données de paiement :</strong> Informations bancaires (traitées de manière sécurisée)</li>
              <li><strong>Données de navigation :</strong> Adresse IP, cookies, données de visite du site</li>
              <li><strong>Communications :</strong> Courriels, messages, demandes de devis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Finalités du Traitement</h2>
            <p className="mb-4">Vos données personnelles sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir et gérer nos services de rénovation</li>
              <li>Traiter vos demandes de devis et commandes</li>
              <li>Communiquer avec vous concernant votre projet</li>
              <li>Envoyer des mises à jour de projet et des rappels</li>
              <li>Facturation et gestion des paiements</li>
              <li>Améliorer notre site web et nos services</li>
              <li>Respecter nos obligations légales</li>
              <li>Prévenir la fraude et assurer la sécurité</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Base Légale du Traitement</h2>
            <p className="mb-4">Le traitement de vos données personnelles est basé sur :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>L'exécution de notre contrat de service avec vous</li>
              <li>Votre consentement explicite</li>
              <li>Nos intérêts légitimes</li>
              <li>Le respect des obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Partage des Données</h2>
            <p>
              Vos données personnelles peuvent être partagées avec nos partenaires commerciaux, sous-traitants, et prestataires de services nécessaires pour exécuter nos contrats. Nous n'autorisons pas le partage de vos données avec des tiers à des fins de marketing sans votre consentement explicite. Nous pouvons divulguer vos données si requis par la loi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Durée de Conservation</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services, respecter nos obligations légales et régler les litiges. En général, les données sont conservées pendant la durée de votre relation commerciale avec nous, plus trois (3) ans après sa résiliation, sauf si la loi exige une conservation plus longue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Sécurité des Données</h2>
            <p>
              Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'abus, l'accès non autorisé et la modification. Ces mesures incluent le chiffrement, les pare-feu et l'accès restreint. Cependant, aucune transmission de données sur Internet n'est 100% sécurisée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Vos Droits</h2>
            <p className="mb-4">Conformément à la réglementation RGPD et locale, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Droit d'accès :</strong> Demander l'accès à vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger les données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> Demander la limitation du traitement</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, veuillez nous contacter à contact@groupe-bml-renovation.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies</h2>
            <p>
              Notre site web utilise des cookies pour améliorer votre expérience utilisateur et analyser l'usage du site. Vous pouvez contrôler les cookies via les paramètres de votre navigateur. Certains cookies sont essentiels au fonctionnement du site, tandis que d'autres sont optionnels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modifications de cette Politique</h2>
            <p>
              Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous notifierons de tout changement significatif en publiant la politique mise à jour sur notre site web avec une date de dernière modification mise à jour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Nous Contacter</h2>
            <p>
              Si vous avez des questions concernant cette Politique de Confidentialité ou nos pratiques en matière de données, veuillez nous contacter à :
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold mb-2">Groupe BML Rénovation tout corps d'état</p>
              <p>Email : contact@groupe-bml-renovation.com</p>
              <p>Téléphone : 07 56 91 59 97</p>
              <p>Localisation : 5 Av. Paul Verlaine, 38100 Grenoble</p>
            </div>
          </section>

          <section className="pt-8 border-t">
            <p className="text-sm text-gray-600">
              Dernière mise à jour : Novembre 2025
            </p>
          </section>
        </div>
      </motion.div>
      <FooterSection />
    </div>
  );
};

export default PolitiqueConfidentialite;
