import React from 'react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';

interface TermsPageProps {
  onBack: () => void;
}

const ConditionsUtilisation: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Conditions d'Utilisation
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptation des Conditions</h2>
            <p>
              En accédant et en utilisant le site web et les services de Groupe BML Rénovation tout corps d'état, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services. Groupe BML Rénovation tout corps d'état se réserve le droit de modifier ces conditions à tout moment. Votre utilisation continue constitue votre acceptation des modifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Définitions</h2>
            <p className="mb-4">Pour les besoins de ces Conditions d'Utilisation :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Site" :</strong> Le site web de Groupe BML Rénovation tout corps d'état et ses pages affiliées</li>
              <li><strong>"Services" :</strong> Les services de rénovation fournis par Groupe BML Rénovation tout corps d'état</li>
              <li><strong>"Utilisateur" :</strong> Toute personne accédant au Site ou utilisant les Services</li>
              <li><strong>"Contenu" :</strong> Tous les textes, images, vidéos et matériaux présents sur le Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Utilisation Licite</h2>
            <p className="mb-4">Vous acceptez d'utiliser le Site et les Services exclusivement à des fins légales et conformément à toutes les lois applicables. Vous ne devez pas :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utiliser le Site pour des activités illégales ou frauduleuses</li>
              <li>Transmettre du contenu offensant, abusif ou diffamatoire</li>
              <li>Télécharger des virus ou logiciels malveillants</li>
              <li>Accéder à des données sans autorisation</li>
              <li>Interférer avec le fonctionnement du Site</li>
              <li>Reproduire ou distribuer le contenu sans permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Services de Rénovation</h2>
            <p className="mb-4">
              Groupe BML Rénovation tout corps d'état propose des services de rénovation professionnels couvrant divers domaines d'intervention. Les services spécifiques, délais et tarifs seront convenus dans un devis détaillé avant le début des travaux. Les devis sont valables trente (30) jours à compter de leur date d'émission.
            </p>
            <p>
              La Société ne peut être tenue responsable des variations de prix dues à des circonstances imprévues, des modifications demandées par le client ou des conditions de site imprévisibles découvertes lors de l'exécution des travaux.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Demandes de Devis</h2>
            <p>
              Lorsque vous soumettez une demande de devis, vous acceptez de fournir des informations exactes et complètes. Groupe BML Rénovation tout corps d'état peut contacter vous par téléphone, email ou courrier pour clarifier votre demande. Les devis fournis sont sans engagement sauf acceptation écrite de votre part. Les frais de visite sur site pour les grands projets peuvent être facturés selon les conditions convenues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Paiement et Facturation</h2>
            <p className="mb-4">
              Un acompte de 30% est généralement requis à la signature du devis pour confirmer les travaux. Le solde est dû à la fin des travaux ou selon les modalités spécifiées dans le contrat. Les paiements doivent être effectués via les méthodes indiquées sur la facture.
            </p>
            <p>
              En cas de non-paiement après 30 jours de la date d'échéance, des intérêts de retard et des frais administratifs peuvent être appliqués conformément à la loi française.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Propriété Intellectuelle</h2>
            <p>
              Tout le contenu du Site, y compris les textes, images, logos, vidéos et designs, est la propriété exclusive de Groupe BML Rénovation tout corps d'état ou de ses partenaires. Vous ne pouvez pas reproduire, modifier, distribuer ou utiliser ce contenu sans permission écrite. Vous ne pouvez télécharger du contenu que pour votre usage personnel et non commercial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation de Responsabilité</h2>
            <p className="mb-4">
              DANS TOUTE LA MESURE PERMISE PAR LA LOI, GROUPE BML RÉNOVATION TOUT CORPS D'ÉTAT NE SERA PAS RESPONSABLE DE :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les dommages indirects, accidentels ou consécutifs</li>
              <li>Les pertes de profits ou de revenus</li>
              <li>L'interruption ou la perte d'accès au Site</li>
              <li>Les erreurs ou inexactitudes du contenu</li>
              <li>Les défaillances du système ou les erreurs de transmission</li>
            </ul>
            <p className="mt-4">
              Notre responsabilité totale n'excédera pas le montant payé pour les services au cours des 12 derniers mois.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Garantie de Travaux</h2>
            <p>
              Groupe BML Rénovation tout corps d'état garantit que les travaux réalisés seront exécutés de manière professionnelle et conforme aux normes industrielles. Les défauts de construction détectés dans les 12 mois suivant la fin des travaux seront réparés gratuitement, sauf s'ils résultent d'une mauvaise utilisation ou d'une modification non autorisée par le client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Responsabilité du Client</h2>
            <p className="mb-4">Le client accepte de :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir un accès sûr aux locaux pour les travaux</li>
              <li>Remettre la zone de travail propre et dégagée</li>
              <li>Informer de tout problème structurel ou de sécurité existant</li>
              <li>Respecter les horaires convenus</li>
              <li>Sécuriser les objets de valeur personnels</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Annulation et Délais</h2>
            <p>
              Les clients peuvent annuler un devis accepté jusqu'à 48 heures avant la date programmée. Les annulations en retard peuvent être soumises à des frais. BML Rénovation fera preuve de diligence pour respecter les délais convenus, mais ne peut garantir une livraison précise à la date en cas de circonstances imprévues. Un délai de 14 jours supplémentaires est généralement autorisé en cas d'imprévu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Conformité Légale</h2>
            <p>
              Groupe BML Rénovation tout corps d'état est conforme à toutes les lois et réglementations applicables, y compris les normes de construction, les exigences de sécurité et les lois de protection des consommateurs en France.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Lien vers Tiers</h2>
            <p>
              Le Site peut contenir des liens vers des sites web tiers. Groupe BML Rénovation tout corps d'état n'est pas responsable du contenu ou des pratiques de ces sites externes. Votre utilisation des sites tiers est à vos risques et périls et soumise à leurs propres conditions d'utilisation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Résiliation</h2>
            <p>
              Groupe BML Rénovation tout corps d'état se réserve le droit de résilier ou de suspendre votre accès au Site ou à ses services sans préavis si vous violez ces Conditions d'Utilisation ou engagez un comportement non autorisé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Loi Applicable et Juridiction</h2>
            <p>
              Ces Conditions d'Utilisation sont régies par la loi française. Tout litige découlant de ces conditions sera soumis à la juridiction exclusive des tribunaux compétents en France, spécifiquement dans le département de l'Isère.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact pour les Réclamations</h2>
            <p>
              Si vous avez des réclamations ou des préoccupations, veuillez nous contacter d'abord directement à contact@groupe-bml-renovation.com. Nous ferons preuve de bonne foi pour résoudre tout différend.
            </p>
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

export default ConditionsUtilisation;
