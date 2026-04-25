import React from 'react';
import { motion } from 'framer-motion';
import { Pen, Landmark, ShieldCheck, TrendingUp } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';
import { OptimizedImage } from './OptimizedImage';

interface FinancePartnershipSectionProps {
  onCtaClick?: () => void;
}

export const FinancePartnershipSection: React.FC<FinancePartnershipSectionProps> = ({ onCtaClick }) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const features = [
    { icon: <Landmark className="w-5 h-5 text-[#38bdf8]" />, text: "Recherche de financement sur mesure" },
    { icon: <ShieldCheck className="w-5 h-5 text-[#38bdf8]" />, text: "Dossiers simplifiés et accompagnement expert" },
    { icon: <TrendingUp className="w-5 h-5 text-[#38bdf8]" />, text: "Taux négociés pour vos projets de rénovation" },
  ];

  return (
    <section className="pt-6 pb-8 md:pb-12 lg:pb-16 bg-slate-50/50 overflow-hidden">
      <div className="w-full px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Content Side only, matching Architect style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                SERVICE DE FINANCEMENT
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  Accompagnement d’experts financiers pour toute demande de prêt.
                </span>
              </h2>
            </div>

            {/* Profile Image + Label - Centered Vertically */}
            <div className="flex flex-row items-center gap-6 mb-4">
              <div className="relative shrink-0">
                <div className="w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                  <OptimizedImage 
                    src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Experts%20financiers.png" 
                    alt="Experts Financiers" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Partner Badge Overlay */}
                <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 bg-white rounded-full p-1.5 shadow-lg z-20 border border-slate-100 flex items-center justify-center animate-bounce-subtle">
                  <ShieldCheck className="w-5 h-5 text-[#38bdf8]" />
                </div>
              </div>
              
              <div className="flex flex-col items-start text-left">
                <h3 className="font-black text-lg text-gray-900 leading-tight">Kenzy</h3>
                <span className="text-[11px] text-[#38bdf8] font-bold uppercase tracking-wider mt-0.5">Partenaires Financiers</span>
                <div className="mt-2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 lg:items-center gap-12 max-w-7xl mx-auto">
              <div className="space-y-6">
                <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
                  <p>
                    Parce qu'un projet de rénovation est un investissement important, nous mettons à votre disposition notre réseau de <strong>partenaires financiers spécialisés</strong>.
                  </p>
                  <p>
                    Bénéficiez d’une étude personnalisée de votre projet pour obtenir les <strong>meilleurs taux</strong> et des solutions de financement adaptées à votre budget.
                  </p>
                </div>

                <div className="pt-6">
                  <GradientCTAButton
                    onClick={handleCtaClick}
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <div className="flex flex-col items-start leading-tight text-left">
                      <span className="font-semibold">Simuler mon financement</span>
                      <span className="text-xs font-normal opacity-90">Étude gratuite et sans engagement.</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Pen className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                      <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                    </div>
                  </GradientCTAButton>
                </div>
              </div>

              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="shrink-0">{feature.icon}</div>
                    <span className="text-slate-800 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinancePartnershipSection;
