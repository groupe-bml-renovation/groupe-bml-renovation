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
    <section className="w-full relative overflow-hidden px-4 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 bg-slate-50">
      {/* Mesh Gradient Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-300 mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-200 mix-blend-multiply filter blur-[120px] opacity-60 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-[20%] w-[60%] h-[60%] rounded-full bg-sky-200 mix-blend-multiply filter blur-[150px] opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left - Book Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[240px]">
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
            className="flex flex-col justify-center space-y-3"
          >
            {/* Category Label */}
            <div>
              <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                Notre Book
              </span>
              <h2 className="text-xl md:text-2xl font-bold mt-1 mb-2 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Le book des styles de rénovation et de décoration</span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                Découvrez notre style de rénovation et de décoration intérieure à travers notre ebook BML Rénovation – Styles de rénovation et de décoration.
              </p>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                Inspirez-vous de nos transformations d'espaces pour identifier le style qui correspond à votre vision : contemporain ou classique intemporel.
              </p>

              <p className="text-[10px] md:text-xs text-slate-500 italic">
                Reçu automatiquement lors de votre demande de devis gratuit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
