import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  number: string;
  label: string;
}

const CountUpNumber: React.FC<{ value: string; inView: boolean; label?: string }> = ({ value, inView, label }) => {
  const [count, setCount] = useState(0);
  const isInterlocuteur = label === 'Interlocuteur unique';

  useEffect(() => {
    if (!inView) return;

    const numericValue = parseInt(value.replace(/\D/g, ''));
    if (isNaN(numericValue)) return;

    const duration = 2000;
    const steps = 60;
    let increment: number;
    let startValue: number;

    if (isInterlocuteur) {
      startValue = 100;
      increment = (100 - numericValue) / steps;
      setCount(100);
    } else {
      startValue = 0;
      increment = numericValue / steps;
      setCount(0);
    }

    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        if (isInterlocuteur) {
          setCount(Math.floor(startValue - increment * currentStep));
        } else {
          setCount(Math.floor(increment * currentStep));
        }
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, inView, isInterlocuteur]);

  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.includes('ans') ? ' ans' : value.includes('%') ? '%' : '';
  const displayCount = count.toString().padStart(2, '0');

  return <>{prefix}{displayCount}{suffix}</>;
};

const SocialProofBannerHome: React.FC = () => {
  const stats: StatItem[] = [
    { number: '10 ans', label: "D'EXPÉRIENCE" },
    { number: '+300', label: 'PROJETS RÉALISÉS' },
    { number: '+75', label: 'Artisans PARTENAIRES' },
    { number: '01', label: 'Interlocuteur unique' }
  ];

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-transparent py-6 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 text-center hover:border-[#38bdf8] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-[#38bdf8] mb-2">
              <CountUpNumber value={stat.number} inView={isInView} label={stat.label} />
            </div>
            <div className="text-[10px] md:text-xs text-black font-medium uppercase tracking-wide leading-tight">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialProofBannerHome;
