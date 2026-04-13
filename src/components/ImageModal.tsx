import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, imageAlt }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[9998] flex items-center justify-center p-4 backdrop-blur-sm shadow-2xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center pointer-events-auto">
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#38bdf8] transition-colors focus:outline-none"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="bg-white rounded-2xl p-4 sm:p-8 flex items-center justify-center w-full shadow-2xl ring-1 ring-white/10">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="max-w-full max-h-[70vh] object-contain select-none"
                  draggable={false}
                />
              </div>
              
              <div className="absolute -bottom-10 left-0 right-0 text-center">
                <p className="text-white text-sm font-medium tracking-wide uppercase">
                  {imageAlt}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
