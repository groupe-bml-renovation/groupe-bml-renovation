import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, MapPin } from 'lucide-react';

interface GeobjectiveProps {
  title: string;
  summary: string;
  points: { icon: any; text: string }[];
  isLocal?: boolean;
}

const GEOSummary: React.FC<GeobjectiveProps> = ({ title, summary, points, isLocal }) => {
  return (
    <section className="py-12 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-12 mb-4">
               <span className="inline-block text-sky-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                L'essentiel en 30 secondes
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-6">
                {title}
              </h2>
            </div>
            
            <div className="lg:col-span-7">
              <p className="text-lg text-slate-600 leading-relaxed mb-8 border-l-4 border-sky-400 pl-6 italic">
                {summary}
              </p>
            </div>
            
            <div className="lg:col-span-5">
              <div className="grid sm:grid-cols-1 gap-4">
                {points.map((point, index) => (
                  <div key={index} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-sky-200 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm">
                      <point.icon size={20} />
                    </div>
                    <span className="text-slate-700 font-medium">{point.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GEOSummary;
