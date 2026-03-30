import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function AdditionalInfoSection() {
  const services = [
    'Une consultation personnalisée gratuite sous 48 à 72h.',
    'Un modèle 3D offert pour visualiser votre futur espace.',
    'Un suivi de projet complet du début à la fin.',
    'Une garantie de qualité sur tous nos travaux'
  ];

  return (
    <div className="mt-16 sm:mt-20 lg:mt-24 pt-16 sm:pt-20 lg:pt-24 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Informations supplémentaires
        </h3>

        <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Après avoir completer votre demande de devis, nos équipes vous contacteront sous 48 à 72h pour vous confirmer le render-vous.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Nous répondons à toutes vos questions et vous proposons une consultation gratuite pour évaluer vos besoins.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 sm:p-10 lg:p-12">
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-8">
            Nos services offert incluent :
          </h4>

          <ul className="space-y-4">
            {services.map((service, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#38bdf8] flex-shrink-0 mt-0.5 sm:mt-1" />
                <span className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
