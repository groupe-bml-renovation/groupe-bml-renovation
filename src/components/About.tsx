import { Award, Users, Clock, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: Award, value: '15+', label: 'Années d\'expérience' },
  { icon: Users, value: '500+', label: 'Clients satisfaits' },
  { icon: Clock, value: '1000+', label: 'Projets réalisés' },
  { icon: ThumbsUp, value: '100%', label: 'Engagement qualité' }
];

export function About() {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pourquoi Choisir <span className="text-amber-400">BML Rénovation</span> ?
            </h2>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              Depuis plus de 15 ans, BML Rénovation s'impose comme un acteur majeur de la rénovation
              et de la construction. Notre expertise reconnue et notre engagement envers la qualité
              font de nous le partenaire idéal pour tous vos projets.
            </p>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Nous combinons savoir-faire traditionnel et techniques modernes pour garantir
              des réalisations durables qui dépassent vos attentes. Chaque projet est unique
              et mérite une attention particulière.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-slate-300">Équipe de professionnels qualifiés et certifiés</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-slate-300">Matériaux de qualité supérieure et garanties</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-slate-300">Respect des délais et budgets convenus</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800 p-8 rounded-2xl text-center hover:bg-slate-700 transition-colors"
              >
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
