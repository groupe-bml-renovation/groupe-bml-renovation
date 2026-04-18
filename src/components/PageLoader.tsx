import React from 'react';
import { motion } from 'framer-motion';

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950">
      <div className="relative">
        {/* Animated rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-sky-500/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-sky-500/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        
        {/* Logo container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-800"
        >
          <motion.img
            src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo.png"
            alt="Groupe BML"
            className="h-12 w-auto object-contain"
            animate={{ 
              filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Loading bar */}
          <div className="absolute -bottom-1 left-4 right-4 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageLoader;
