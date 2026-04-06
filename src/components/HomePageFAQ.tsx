import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Pen } from 'lucide-react';

interface FAQItemType {
  id: string;
  question: string;
  answer: string;
}

const HomePageFAQ = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqItems: FAQItemType[] = [
    {
      id: '1',
      question: 'Peut-on rénover sans déménager, appartement occupé ?',
      answer: 'Oui, c\'est possible dans la majorité des projets. On organise la rénovation en zones et par étapes pour garder des pièces fonctionnelles et limiter les nuisances.'
    },
    {
      id: '2',
      question: 'Comment garantissez-vous un chantier propre, avec poussière et bruit maîtrisés ?',
      answer: 'Zone chantier isolée, protections (sols, portes, circulations), gestion des déchets, et règles de propreté. On réduit la poussière et on planifie les interventions bruyantes quand c\'est possible.'
    },
    {
      id: '3',
      question: 'À quoi ressemble un devis détaillé et précis chez vous ?',
      answer: 'Un devis clair, poste par poste, avec inclusions, exclusions, quantités, et options. Vous savez exactement ce qui est prévu pour votre rénovation intérieure avant de démarrer.'
    },
    {
      id: '4',
      question: 'Comment évitez-vous les dépassements de budget et les "surprises" ?',
      answer: 'On verrouille le périmètre au devis. Tout changement passe par un avenant écrit, chiffré, validé par vous, avec impact sur délai et budget. Pas d\'exécution sans accord.'
    },
    {
      id: '5',
      question: 'Quels délais pour démarrer et comment le planning est-il suivi ?',
      answer: 'Après validation du devis, on fixe une date de démarrage selon disponibilités, délais matériaux et contraintes de copropriété. Un planning jalonné guide le chantier jusqu\'à la livraison.'
    },
    {
      id: '6',
      question: 'Qui pilote le chantier au quotidien et comment se fait le suivi de chantier ?',
      answer: 'Un chef de projet, interlocuteur unique, coordonne les corps de métier et pilote le chantier. Vous n\'avez pas à courir après 5 artisans.'
    },
    {
      id: '7',
      question: 'Que se passe-t-il si on découvre un imprévu, électricité, humidité, murs, etc. ?',
      answer: 'On documente, on explique, puis on propose des options simples et chiffrées avec impacts. Vous choisissez, on exécute, sans flou.'
    },
    {
      id: '8',
      question: 'Et si on ne sait pas quel style ou quels matériaux choisir, est-ce que vous conseillez ?',
      answer: 'Oui. On vous aide à définir un style, sélectionner matériaux et finitions, et valider des choix cohérents pour une rénovation sans regrets.'
    }
  ];

  const handleContactClick = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="pt-6 pb-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-3">
            FAQ COURTE - Réponses Rapides
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Vos questions, nos réponses</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conversion rapide à scanner. Découvrez comment nous organisons vos travaux de rénovation sans stress.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3 mb-12"
        >
          {faqItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full text-left bg-white border border-gray-200 rounded-lg px-6 py-4 hover:border-[#38bdf8] hover:shadow-md transition-all duration-300"
                aria-expanded={expandedId === item.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-snug">
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      expandedId === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expandedId === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-sky-50 border border-t-0 border-gray-200 rounded-b-lg px-6 py-4 -mt-[1px]"
                >
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-400 to-blue-600 rounded-3xl p-8 md:p-12 text-center shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Demandez votre devis
          </h3>
          <p className="text-blue-100 mb-8 text-lg">
            Réponse sous 24h pour fixer une visite
          </p>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center gap-3 bg-white hover:bg-blue-50 text-sky-500 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <Pen size={20} className="text-sky-500" strokeWidth={2.5} />
              <div className="w-5 h-0.5 bg-sky-500 rounded-full mt-0.5"></div>
            </div>
            <span>Demander un devis</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageFAQ;
