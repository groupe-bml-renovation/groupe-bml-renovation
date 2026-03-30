import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';

export default function EbookPresentationSection() {
  const handleRequestBook = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full relative overflow-hidden px-4 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-24 bg-slate-50">
      {/* Mesh Gradient Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300 mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-200 mix-blend-multiply filter blur-[120px] opacity-60 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-[20%] w-[60%] h-[60%] rounded-full bg-sky-200 mix-blend-multiply filter blur-[150px] opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Book Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Book Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                <img
                  src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Gemini_Generated_Image_62ic8262ic8262ic%20(1).png"
                  alt="BML Rénovation - Book de Réalisations"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Category Label */}
            <div>
              <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                Notre Book
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Le book des styles de rénovation et de décoration</span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-base text-slate-700 leading-relaxed">
                Découvrez notre style de rénovation et de décoration intérieure à travers notre ebook BML Rénovation – Styles de rénovation et de décoration.
              </p>

              <p className="text-base text-slate-700 leading-relaxed">
                Parcourez différents univers de design : du style contemporain épuré au luxe classique intemporel. Inspirez-vous de nos transformations d'espaces pour identifier le style qui correspond à votre vision.
              </p>

              <p className="text-base text-slate-600">
                Reçu automatiquement lors de votre demande de devis gratuit.
              </p>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-flex mt-6"
            >
              <GradientCTAButton onClick={handleRequestBook} size="sm">
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-semibold whitespace-nowrap">Demander un devis gratuit</span>
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
    </section>
  );
}
