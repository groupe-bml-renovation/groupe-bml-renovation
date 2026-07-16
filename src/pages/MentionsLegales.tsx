import React from 'react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';

import { Helmet } from 'react-helmet-async';

interface LegalNoticePageProps {
  onBack: () => void;
}

const MentionsLegales: React.FC<LegalNoticePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Mentions Légales
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Identification du Site et de l'Entreprise</h2>
            <p className="mb-4">
              Le site web www.groupe-bml-renovation.com (le "Site") est exploité par :
            </p>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
              <p><strong>Raison Sociale :</strong> Groupe BML Rénovation tout corps d'état</p>
              <p><strong>Forme Juridique :</strong> Entreprise Individuelle / SARL</p>
              <p><strong>SIRET :</strong> [À compléter avec votre SIRET]</p>
              <p><strong>Adresse du Siège Social :</strong> 5 Av. Paul Verlaine, 38100 Grenoble</p>
              <p><strong>Email :</strong> contact@groupe-bml-renovation.com</p>
              <p><strong>Téléphone :</strong> <a href="tel:0756915997"><span>07 56 91 59 97</span></a></p>
              <p><strong>Responsable de Publication :</strong> [Nom du Responsable]</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hébergement du Site</h2>
            <p className="mb-4">
              Le Site est hébergé par :
            </p>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
              <p><strong>Hébergeur :</strong> [Nom de l'hébergeur]</p>
              <p><strong>Adresse :</strong> [Adresse de l'hébergeur]</p>
              <p><strong>Pays :</strong> France</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Régulation et Conformité</h2>
            <p className="mb-4">
              Groupe BML Rénovation tout corps d'état exerce ses activités conformément aux réglementations françaises, notamment :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Code du Travail</li>
              <li>Code du Consommateur</li>
              <li>Loi Informatique et Libertés (RGPD)</li>
              <li>Normes de Construction et de Sécurité</li>
              <li>Normes NF et Certifications Professionnelles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Assurances et Garanties</h2>
            <p className="mb-4">
              Groupe BML Rénovation tout corps d'état est couvert par les assurances suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Responsabilité Civile Professionnelle :</strong> Protection contre les dommages causés par nos travaux</li>
              <li><strong>Assurance Décennale :</strong> Couverture des défauts structurels pendant 10 ans</li>
              <li><strong>Assurance Tous Risques Chantier :</strong> Protection des travaux en cours</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Directeur de Publication</h2>
            <p>
              Le directeur de publication du Site est [Nom du Directeur], responsable de Groupe BML Rénovation tout corps d'état. Pour toute question ou demande concernant les publications, veuillez nous contacter via les coordonnées mentionnées ci-dessus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Propriété Intellectuelle</h2>
            <p className="mb-4">
              Tous les contenus du Site (textes, images, graphismes, logos, vidéos, sons) sont la propriété exclusive de Groupe BML Rénovation tout corps d'état ou de tiers, et sont protégés par les droits d'auteur et les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, modifier, adapter, traduire, publier ou distribuer le contenu sans autorisation préalable écrite.
            </p>
            <p>
              Les marques et logos de Groupe BML Rénovation tout corps d'état sont des marques déposées et ne peuvent être utilisés sans permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation de Responsabilité</h2>
            <p className="mb-4">
              Groupe BML Rénovation tout corps d'état s'efforce de fournir des informations exactes et à jour sur le Site. Cependant :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Le Site est fourni "tel quel" sans garantie explicite ou implicite</li>
              <li>Les erreurs, omissions ou inexactitudes peuvent survenir</li>
              <li>L'accessibilité du Site peut être temporairement interrompue</li>
              <li>Groupe BML Rénovation tout corps d'état n'est pas responsable des dommages résultant de l'utilisation du Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies et Données de Navigation</h2>
            <p>
              Le Site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En utilisant le Site, vous consentez à l'utilisation de cookies conformément à notre Politique de Confidentialité. Vous pouvez modifier les paramètres des cookies dans les préférences de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Liens Externes</h2>
            <p>
              Le Site peut contenir des liens vers des sites web tiers. Groupe BML Rénovation tout corps d'état n'est pas responsable du contenu, de la disponibilité ou de la conformité de ces sites externes. Les liens vers des tiers ne constituent pas une approbation ou une recommandation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Conditions d'Utilisation</h2>
            <p>
              L'utilisation du Site est soumise aux Conditions d'Utilisation complètes disponibles sur le Site. En accédant au Site, vous acceptez ces conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Politique de Confidentialité</h2>
            <p>
              La collecte, le traitement et l'utilisation de vos données personnelles sont régis par notre Politique de Confidentialité, disponible sur le Site. Veuillez la consulter pour comprendre comment vos données sont gérées.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Dispositions Légales</h2>
            <p className="mb-4">
              Conformément à la loi française :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les prix affichés sont en euros TTC (Toutes Taxes Comprises)</li>
              <li>Les devis sont établis selon le Code de la Consommation</li>
              <li>Les consommateurs bénéficient de la protection de la loi sur le droit de rétractation</li>
              <li>Les garanties légales s'appliquent conformément au Code Civil</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Droit de Rétractation</h2>
            <p>
              Conformément à la loi française, vous bénéficiez d'un droit de rétractation de 14 jours à compter de la signature du devis pour les contrats conclus à distance. Pour l'exercer, veuillez nous contacter par écrit à contact@groupe-bml-renovation.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Gestion des Réclamations</h2>
            <p className="mb-4">
              En cas de litige ou de réclamation :
            </p>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p>1. Contactez-nous directement à contact@groupe-bml-renovation.com</p>
              <p>2. Décrivez précisément votre réclamation</p>
              <p>3. Nous traiterons votre demande dans un délai de 30 jours</p>
              <p>4. Si vous restez insatisfait, vous pouvez saisir le médiateur de la consommation</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Accessibilité du Site</h2>
            <p>
              Groupe BML Rénovation tout corps d'état s'engage à rendre le Site accessible à tous les utilisateurs, conformément à la loi Handicap et Accessibilité (WCAG 2.1). Si vous rencontrez des difficultés d'accès, veuillez nous le signaler.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Modifications des Mentions Légales</h2>
            <p>
              Groupe BML Rénovation tout corps d'état se réserve le droit de modifier ces Mentions Légales à tout moment. Les modifications seront publiées sur le Site et entreront en vigueur à la date indiquée. Votre utilisation continue du Site après les modifications constitue votre acceptation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Droit Applicable</h2>
            <p>
              Ces Mentions Légales sont régies par la loi française. Tout litige découlant de ces mentions sera soumis aux tribunaux compétents en France, spécifiquement dans le département de l'Isère (Grenoble).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Coordonnées de Contact</h2>
            <p className="mb-4">
              Pour toute question, réclamation ou demande concernant ces Mentions Légales :
            </p>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p><strong>Email :</strong> contact@groupe-bml-renovation.com</p>
              <p><strong>Téléphone :</strong> <a href="tel:0756915997"><span>07 56 91 59 97</span></a></p>
              <p><strong>Localisation :</strong> 5 Av. Paul Verlaine, 38100 Grenoble</p>
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

export default MentionsLegales;
