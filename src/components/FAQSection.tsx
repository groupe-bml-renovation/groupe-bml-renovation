import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-light text-slate-900 mb-12 text-center uppercase tracking-widest italic border-b border-sky-200 pb-4 inline-block mx-auto flex justify-center w-fit">
          {title}
        </h2>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white"
              >
                <span className="font-medium text-slate-800 pr-8">{item.question}</span>
                <ChevronDown 
                  className={`text-sky-500 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed bg-slate-50/50">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
