import React from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedFields?: number[];
  totalFields?: number[];
  weightedProgress?: number[];
  showProgression?: boolean;
}

export default function ProgressIndicator({
  steps,
  currentStep,
  completedFields = [],
  totalFields = [],
  weightedProgress = [],
  showProgression = true
}: ProgressIndicatorProps) {
  const totalCompletedFields = completedFields.reduce((sum, count) => sum + count, 0);
  const totalFieldsCount = totalFields.reduce((sum, count) => sum + count, 0);
  const totalWeightedProgress = weightedProgress.reduce((sum, count) => sum + count, 0);

  const completionPercentage = weightedProgress.length > 0
    ? Math.min(Math.round(totalWeightedProgress), 100)
    : (totalFieldsCount > 0
        ? Math.round((totalCompletedFields / totalFieldsCount) * 100)
        : 0);

  return (
    <div className="w-full mb-8 sm:mb-12 space-y-6">
      <div className="flex justify-center">
        <div className="relative w-full max-w-3xl">
          <div className="absolute top-3 sm:top-4 left-0 right-0 h-1 bg-gray-200 rounded-full" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute top-3 sm:top-4 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />

          <div className="relative flex items-start justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const hasFieldsInfo = completedFields.length > 0 && totalFields.length > 0;
              const fieldCompletion = hasFieldsInfo
                ? isCurrent
                  ? `${completedFields[index] || 0}/${totalFields[index] || 0}`
                  : null
                : null;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="relative flex items-center justify-center"
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm cursor-default relative z-10 ${
                        isCompleted
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                          : isCurrent
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      ) : (
                        <motion.span
                          animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                          transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                        >
                          {index + 1}
                        </motion.span>
                      )}
                    </div>

                    {isCurrent && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.5 }}
                        transition={{ duration: 0.4 }}
                        className="absolute w-10 h-10 sm:w-12 sm:h-12 border-2 border-cyan-500 rounded-full"
                      />
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    className="mt-2 sm:mt-4 text-center"
                  >
                    <p className={`text-xs sm:text-sm font-semibold transition-colors ${
                      isCurrent || isCompleted
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className={`text-[10px] sm:text-xs transition-colors ${
                      isCurrent || isCompleted
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    {fieldCompletion && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] sm:text-xs text-cyan-600 font-semibold mt-1"
                      >
                        {fieldCompletion} champs
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showProgression && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                Progression: <span className="text-cyan-600 font-semibold">{completionPercentage}%</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
