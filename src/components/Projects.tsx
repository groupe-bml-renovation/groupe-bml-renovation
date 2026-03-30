import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Rénovation Appartement Haussmannien',
    category: 'Rénovation Complète',
    description: 'Rénovation intégrale d\'un appartement de 120m² avec conservation des éléments d\'origine.'
  },
  {
    title: 'Extension Maison Contemporaine',
    category: 'Construction',
    description: 'Ajout d\'une extension moderne de 40m² avec grande baie vitrée et terrasse.'
  },
  {
    title: 'Réaménagement Salle de Bain',
    category: 'Plomberie & Carrelage',
    description: 'Création d\'une salle de bain sur mesure avec douche italienne et meubles encastrés.'
  },
  {
    title: 'Rénovation Façade Immeuble',
    category: 'Maçonnerie & Peinture',
    description: 'Ravalement complet de façade et isolation thermique par l\'extérieur.'
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Nos Réalisations
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez quelques-uns de nos projets récents qui témoignent de notre expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ExternalLink className="w-10 h-10" />
                  </div>
                  <p className="text-sm text-slate-300">Projet Photo</p>
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold text-amber-600 mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
