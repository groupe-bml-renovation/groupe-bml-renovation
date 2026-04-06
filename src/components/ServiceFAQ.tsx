import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';

interface FAQItemType {
  id: string;
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  items: FAQItemType[];
  title?: string;
  description?: string;
}

const ServiceFAQ = ({ items, title = "Questions Fréquentes", description = "Retrouvez les réponses aux questions les plus courantes sur nos services de rénovation." }: ServiceFAQProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-3 flex items-center justify-center gap-2">
            <MessageSquare size={16} />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">{title}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className={`w-full text-left bg-white border border-gray-200 rounded-xl px-6 py-5 hover:border-[#38bdf8] transition-all duration-300 ${expandedId === item.id ? 'shadow-md border-[#38bdf8]' : 'hover:shadow-sm'}`}
                aria-expanded={expandedId === item.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`font-semibold text-sm md:text-base leading-snug transition-colors duration-300 ${expandedId === item.id ? 'text-[#38bdf8]' : 'text-gray-900'}`}>
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      expandedId === item.id ? 'rotate-180 text-[#38bdf8]' : ''
                    }`}
                  />
                </div>
                
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pt-4 border-t border-gray-100 mt-4 text-justify">
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {item.answer.replace(/<span>(.*?)<\/span>/g, '$1')}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
