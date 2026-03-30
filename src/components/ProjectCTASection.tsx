import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';

interface ProjectCTASectionProps {
  title: string;
  description: string;
  subtext?: string;
  buttonText?: string;
  onContactClick?: () => void;
}

export default function ProjectCTASection({
  title,
  description,
  subtext = 'Contactez-nous pour un devis offert et personnalisé, RDV planifier sous 24h.',
  buttonText = 'Demander un devis gratuit',
  onContactClick
}: ProjectCTASectionProps) {
  const handleClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-400 to-blue-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-8"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-blue-100 mb-10 max-w-3xl mx-auto"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex"
          >
            <GradientCTAButton onClick={handleClick} size="sm">
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold whitespace-nowrap">{buttonText}</span>
                <span className="text-xs font-normal opacity-90 whitespace-nowrap">Réponse sous 24h</span>
              </div>
              <div className="flex flex-col items-center">
                <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
              </div>
            </GradientCTAButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
