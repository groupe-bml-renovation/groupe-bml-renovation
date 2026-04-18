import { Hammer, PaintBucket, Wrench, Zap, Home, Ruler } from 'lucide-react';
import { Button as MovingBorderButton } from '@/components/ui/moving-border';

const services = [
  {
    icon: Hammer,
    title: 'Maçonnerie',
    description: 'Construction et rénovation de murs, fondations, et structures en béton avec expertise et précision.'
  },
  {
    icon: PaintBucket,
    title: 'Travaux de peinture',
    description: 'Travaux de peinture intérieure et extérieure, revêtements muraux et finitions décoratives d\'excellence.'
  },
  {
    icon: Wrench,
    title: 'Plomberie',
    description: 'Installation et réparation de systèmes de plomberie, sanitaires, et équipements de salle de bain.'
  },
  {
    icon: Zap,
    title: 'Électricité',
    description: 'Mise aux normes électriques, installations complètes et dépannages pour votre sécurité.'
  },
  {
    icon: Home,
    title: 'Rénovation Complète',
    description: 'Gestion de projets de rénovation de A à Z, coordination des corps de métier.'
  },
  {
    icon: Ruler,
    title: 'Aménagement',
    description: 'Optimisation d\'espaces, création de cloisons, agencement sur mesure pour vos besoins.'
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une gamme complète de services pour tous vos projets de rénovation et construction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-slate-50 rounded-2xl hover:bg-amber-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <MovingBorderButton
                borderRadius="1rem"
                className="text-amber-600 bg-white hover:bg-amber-50 text-sm font-semibold"
                duration={2.5}
                delay={index * 0.1}
              >
                En savoir plus
              </MovingBorderButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
