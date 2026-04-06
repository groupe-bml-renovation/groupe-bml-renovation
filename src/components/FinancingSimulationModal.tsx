import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import RenovationFinancingCalculator from './RenovationFinancingCalculator';

interface FinancingSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinancingSimulationModal({ isOpen, onClose }: FinancingSimulationModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="sticky top-0 right-0 z-10 m-4 p-2 rounded-full hover:bg-gray-100 transition-colors float-right"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="pt-8 px-4 sm:px-8">
              <RenovationFinancingCalculator onModalClose={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
