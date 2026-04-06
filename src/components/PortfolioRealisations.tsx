import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

interface Project {
  id: number;
  image: string;
  category: string;
}

const PortfolioRealisations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Rénovation Complète');

  const categories = [
    'Rénovation Complète',
    'Rénovation Cuisine',
    'Salle de Bain',
    'Peinture',
    'Revêtement Sol',
    'Électricité et installation de born électrique',
    'Plomberie',
    'Travaux isolation intérieure',
    'Rénovation piscine',
    'Espace verre',
    'Salle de bain PMR',
    'Menuiserie',
    'Plâtrerie',
    'Ventilation et chauffage',
    'Aménagement extérieur et terrasse bois'
  ];

  const allProjects: Project[] = [
    {
      id: 1,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-09-30_at_22.00.36_g9akl6%20(1).jpg?updatedAt=1761308524109',
      category: 'Électricité et installation de born électrique'
    },
    {
      id: 2,
      image: 'https://ik.imagekit.io/qhz1qzxur/ChatGPT_Image_12_oct._2025_a%CC%80_10_21_18_tmn3sv.png?updatedAt=1761235605590',
      category: 'Électricité et installation de born électrique'
    },
    {
      id: 3,
      image: 'https://ik.imagekit.io/qhz1qzxur/ChatGPT_Image_12_oct._2025_a%CC%80_10_27_55_qk5xf8%20(1).png?updatedAt=1761308122925',
      category: 'Électricité et installation de born électrique'
    },
    {
      id: 4,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp%20Image%202025-10-13%20at%2013.59.58%20(1).jpeg?updatedAt=1761308566160',
      category: 'Électricité et installation de born électrique'
    },
    {
      id: 5,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp%20Image%202025-10-14%20at%2015.44.21%20(2).jpeg?updatedAt=1761309529658',
      category: 'Électricité et installation de born électrique'
    },
    {
      id: 6,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-02_at_16.56.52_5_hxjyyi.jpg?updatedAt=1761309551624',
      category: 'Plomberie'
    },
    {
      id: 7,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250909-WA0064_zi3liu.jpg?updatedAt=1761326030918',
      category: 'Plomberie'
    },
    {
      id: 8,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG_4194%20(1).jpg?updatedAt=1761326217523',
      category: 'Travaux isolation intérieure'
    },
    {
      id: 9,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG_4195%20(1).jpg?updatedAt=1761326816260',
      category: 'Travaux isolation intérieure'
    },
    {
      id: 10,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-0661%20(1).jpg?updatedAt=1761326834399',
      category: 'Travaux isolation intérieure'
    },
    {
      id: 11,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp%20Image%202025-10-13%20at%2014.07.05%20(1).jpeg?updatedAt=1761326871356',
      category: 'Travaux isolation intérieure'
    },
    {
      id: 12,
      image: 'https://ik.imagekit.io/xpwtzoa42/Capture_d_e%CC%81cran_2025-10-12_a%CC%80_08.39.38_lcr05k.png?updatedAt=1761583710521',
      category: 'Rénovation piscine'
    },
    {
      id: 13,
      image: 'https://ik.imagekit.io/qhz1qzxur/52360a46-d39e-40b6-b54e-d63125ec822d%20(1).JPG?updatedAt=1761327394270',
      category: 'Rénovation piscine'
    },
    {
      id: 14,
      image: 'https://ik.imagekit.io/qhz1qzxur/1090caa8-6c2e-4e6a-a6ad-f0353b69b48a_zdeunt.jpg?updatedAt=1761235409201',
      category: 'Rénovation piscine'
    },
    {
      id: 15,
      image: 'https://ik.imagekit.io/qhz1qzxur/0d9fc48b-608f-4f03-8727-652717fd849c%20(1).JPG?updatedAt=1761327570297',
      category: 'Rénovation piscine'
    },
    {
      id: 16,
      image: 'https://ik.imagekit.io/qhz1qzxur/a4a23d2a-e60e-48a4-aceb-a8996afb580c_htgckp.jpg?updatedAt=1761235541579',
      category: 'Rénovation piscine'
    },
    {
      id: 17,
      image: 'https://ik.imagekit.io/qhz1qzxur/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod%20(1).jpg?updatedAt=1761235472739',
      category: 'Rénovation piscine'
    },
    {
      id: 18,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250909-WA0094.jpg?updatedAt=1761327669830',
      category: 'Rénovation piscine'
    },
    {
      id: 19,
      image: 'https://ik.imagekit.io/qhz1qzxur/f82dc53a-e265-4ef9-abed-2815d48566ce_n1uien%20(1).jpg?updatedAt=1761331936287',
      category: 'Espace verre'
    },
    {
      id: 20,
      image: 'https://ik.imagekit.io/qhz1qzxur/042e28c4-ab31-4285-ac0b-f923e217da66_ewelee%20(1).jpg?updatedAt=1761331893095',
      category: 'Espace verre'
    },
    {
      id: 21,
      image: 'https://ik.imagekit.io/qhz1qzxur/a4a23d2a-e60e-48a4-aceb-a8996afb580c_htgckp.jpg?updatedAt=1761235541579',
      category: 'Espace verre'
    },
    {
      id: 22,
      image: 'https://ik.imagekit.io/qhz1qzxur/51f19edd-0cdf-4b46-9f6e-191ce2e22eda_vgciym.jpg?updatedAt=1761332096042',
      category: 'Espace verre'
    },
    {
      id: 23,
      image: 'https://ik.imagekit.io/qhz1qzxur/e733fa4e-a39d-4629-9e1d-b66ee0cbafb2%20(1).JPG?updatedAt=1761331829490',
      category: 'Espace verre'
    },
    {
      id: 24,
      image: 'https://ik.imagekit.io/qhz1qzxur/2c95bff5-3166-435e-86bf-63b99e8ffec8%20(1).JPG?updatedAt=1761331853253',
      category: 'Espace verre'
    },
    {
      id: 25,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-02_at_16.26.45_zstr3j.jpg?updatedAt=1761238046078',
      category: 'Salle de bain PMR'
    },
    {
      id: 26,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp%20Image%202025-10-13%20at%2013.07.22%20(1).jpeg?updatedAt=1761568129948',
      category: 'Menuiserie'
    },
    {
      id: 27,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250909-WA0014_jg0xyb%20(2).jpg?updatedAt=1761332199963',
      category: 'Plâtrerie'
    },
    {
      id: 28,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250909-WA0054_kbc2wk%20(1).jpg?updatedAt=1761332215137',
      category: 'Plâtrerie'
    },
    {
      id: 29,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250910-WA0040_wnqrpi.jpg?updatedAt=1761332231663',
      category: 'Plâtrerie'
    },
    {
      id: 30,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250910-WA0038_luqpxk%20(2).jpg?updatedAt=1761332301893',
      category: 'Plâtrerie'
    },
    {
      id: 31,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250910-WA0039_dbbe4v%20(1).jpg?updatedAt=1761332320393',
      category: 'Plâtrerie'
    },
    {
      id: 32,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-02_at_16.52.32_zqjemo.jpg?updatedAt=1761332396884',
      category: 'Ventilation et chauffage'
    },
    {
      id: 33,
      image: 'https://ik.imagekit.io/qhz1qzxur/39ce06e4-359c-4237-b855-411d10f88cc8_noisks%20(2).jpg?updatedAt=1761332445948',
      category: 'Ventilation et chauffage'
    },
    {
      id: 34,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-02_at_16.56.52_2_dubodk.jpg?updatedAt=1761332465388',
      category: 'Ventilation et chauffage'
    },
    {
      id: 35,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-02_at_16.56.52_3_v2jaqs.jpg?updatedAt=1761332485693',
      category: 'Ventilation et chauffage'
    },
    {
      id: 36,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250909-WA0052_gr3kxj.jpg?updatedAt=1761332526390',
      category: 'Ventilation et chauffage'
    },
    {
      id: 37,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250909-WA0053_lcww4s.jpg?updatedAt=1761332586181',
      category: 'Ventilation et chauffage'
    },
    {
      id: 38,
      image: 'https://ik.imagekit.io/qhz1qzxur/a4a23d2a-e60e-48a4-aceb-a8996afb580c_htgckp.jpg?updatedAt=1761235541579',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 39,
      image: 'https://ik.imagekit.io/qhz1qzxur/51f19edd-0cdf-4b46-9f6e-191ce2e22eda_vgciym.jpg?updatedAt=1761332096042',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 40,
      image: 'https://ik.imagekit.io/qhz1qzxur/6926647f-2fa7-4e03-8143-cdc548d4eaf7_neftu9%20(1).jpg?updatedAt=1761332807910',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 41,
      image: 'https://ik.imagekit.io/qhz1qzxur/IMG-20250909-WA0024%20(1).jpg?updatedAt=1761339810652',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 42,
      image: 'https://ik.imagekit.io/qhz1qzxur/08c9784d-a6ba-4494-8ba9-b6935de010d6_kaax7w.jpg?updatedAt=1761339837407',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 43,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-13_at_12.53.51_1_mpbczz.jpg?updatedAt=1761235573797',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 44,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-13_at_12.53.51_2_dnmyjw%20(1).jpg?updatedAt=1761340020065',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 45,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-13_at_12.53.51_3_oagoit%20(1).jpg?updatedAt=1761339933087',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 46,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-13_at_12.53.39_rddphe%20(1).jpg?updatedAt=1761340001810',
      category: 'Aménagement extérieur et terrasse bois'
    },
    {
      id: 47,
      image: 'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-13_at_12.53.51_eskjdi.jpg?updatedAt=1761244594858',
      category: 'Aménagement extérieur et terrasse bois'
    }
  ];

  const filteredProjects = allProjects.filter(
    (project) => project.category === activeCategory
  );

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wider mb-4">
            PORTFOLIO DE RÉALISATIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Nos Projets d'Exception
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre savoir-faire à travers une sélection de nos plus belles réalisations.<br />
            Chaque projet reflète notre engagement envers l'excellence et la satisfaction client.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="text-4xl font-bold text-[#38bdf8] mb-2">300+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Projets Réalisés</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="text-4xl font-bold text-[#38bdf8] mb-2">10 ans</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">d'Expérience</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="text-4xl font-bold text-[#38bdf8] mb-2">98%</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Clients Satisfaits</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="text-4xl font-bold text-[#38bdf8] mb-2">10+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Artisans Experts</div>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-[#38bdf8] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.category} project`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{project.category}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Aucun projet disponible dans cette catégorie pour le moment.</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-[#38bdf8] to-blue-500 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Votre Projet Nous Intéresse !
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Vous avez un projet de rénovation en tête ? Contactez-nous pour un devis gratuit et personnalisé. Notre équipe d'experts est à votre écoute.
          </p>
          <button
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#38bdf8] font-semibold px-8 py-3 rounded-full hover:bg-slate-100 transition-all flex items-center gap-2 mx-auto"
          >
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold">Demander un devis gratuit</span>
              <span className="text-xs font-normal opacity-90">Réponse sous 24h</span>
            </div>
            <Phone className="w-5 h-5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioRealisations;
