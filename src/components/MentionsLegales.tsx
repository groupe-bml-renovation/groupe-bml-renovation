import React from 'react';
import { X } from 'lucide-react';

interface MentionsLegalesProps {
  isOpen: boolean;
  onClose: () => void;
}

const MentionsLegales: React.FC<MentionsLegalesProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Mentions Légales</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, 
              il est précisé aux utilisateurs du site bml-renovation.fr l'identité des différents intervenants dans le cadre 
              de sa réalisation et de son suivi.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Édition du site</h3>
            <p className="text-gray-700 leading-relaxed">
              Le présent site, accessible à l'URL www.bml-renovation.fr (le « Site »), est édité par :<br />
              <strong>BML Rénovation</strong>, résidant 143 chemin de l'étigny 73000 CHAMBÉRY, de nationalité Française (France).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hébergement</h3>
            <p className="text-gray-700 leading-relaxed">
              Le Site est hébergé par la société Bolt Hosting, une plateforme de développement et d'hébergement web moderne.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Directeur de publication</h3>
            <p className="text-gray-700 leading-relaxed">
              Le Directeur de la publication du Site est <strong>BML Rénovation</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Nous contacter</h3>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p><strong>Par téléphone :</strong> <a href="tel:0699453704" className="hover:text-[#38bdf8] transition-colors">06 99 45 37 04</a></p>
              <p><strong>Par email :</strong> contact@groupe-bml-renovation.com</p>
              <p><strong>Par courrier :</strong> 143 chemin de l'étigny 73000 CHAMBÉRY</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Données personnelles</h3>
            <p className="text-gray-700 leading-relaxed">
              Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, 
              disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement Général 
              sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;