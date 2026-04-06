import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Euro, TrendingUp, Phone } from 'lucide-react';

interface CalculatorState {
  projectAmount: number;
  downPaymentAmount: number;
  loanPeriodYears: number;
  interestRate: number;
}

interface RenovationFinancingCalculatorProps {
  onModalClose?: () => void;
}

export default function RenovationFinancingCalculator({ onModalClose }: RenovationFinancingCalculatorProps = {}) {
  const [state, setState] = useState<CalculatorState>({
    projectAmount: 50000,
    downPaymentAmount: 10000,
    loanPeriodYears: 5,
    interestRate: 0,
  });

  const [inputValues, setInputValues] = useState({
    projectAmount: '50000',
    downPaymentAmount: '10000',
    downPaymentPercentage: '20',
    interestRate: '0',
  });

  const calculations = useMemo(() => {
    const projectAmount = state.projectAmount;
    const downPaymentAmount = state.downPaymentAmount;
    const loanAmount = projectAmount - downPaymentAmount;
    const months = state.loanPeriodYears * 12;
    const monthlyRate = state.interestRate / 100 / 12;

    let monthlyPayment = 0;
    let totalInterest = 0;

    if (months > 0) {
      if (state.interestRate === 0) {
        monthlyPayment = loanAmount / months;
      } else {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                        (Math.pow(1 + monthlyRate, months) - 1);
      }
      totalInterest = monthlyPayment * months - loanAmount;
    }

    const downPaymentPercentage = projectAmount > 0 ? (downPaymentAmount / projectAmount) * 100 : 0;

    return {
      projectAmount,
      downPaymentAmount,
      downPaymentPercentage,
      loanAmount,
      monthlyPayment,
      totalInterest,
      months,
    };
  }, [state]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleProjectAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value), 10000), 10000000);
    setState(prev => ({
      ...prev,
      projectAmount: value,
      downPaymentAmount: Math.min(prev.downPaymentAmount, value),
    }));
    setInputValues(prev => ({
      ...prev,
      projectAmount: value.toString(),
    }));
  };

  const handleProjectAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    setInputValues(prev => ({
      ...prev,
      projectAmount: rawValue,
    }));

    if (rawValue && !isNaN(Number(rawValue))) {
      const numValue = Math.min(Math.max(Number(rawValue), 10000), 10000000);
      setState(prev => ({
        ...prev,
        projectAmount: numValue,
        downPaymentAmount: Math.min(prev.downPaymentAmount, numValue),
      }));
    }
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value), 0), state.projectAmount);
    const percentage = state.projectAmount > 0 ? (value / state.projectAmount) * 100 : 0;
    setState(prev => ({
      ...prev,
      downPaymentAmount: value,
    }));
    setInputValues(prev => ({
      ...prev,
      downPaymentAmount: value.toString(),
      downPaymentPercentage: percentage.toFixed(0),
    }));
  };

  const handleDownPaymentAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    setInputValues(prev => ({
      ...prev,
      downPaymentAmount: rawValue,
    }));

    if (rawValue && !isNaN(Number(rawValue))) {
      const numValue = Math.min(Math.max(Number(rawValue), 0), state.projectAmount);
      const percentage = state.projectAmount > 0 ? (numValue / state.projectAmount) * 100 : 0;
      setState(prev => ({
        ...prev,
        downPaymentAmount: numValue,
      }));
      setInputValues(prev => ({
        ...prev,
        downPaymentPercentage: percentage.toFixed(0),
      }));
    }
  };

  const handleDownPaymentPercentageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    setInputValues(prev => ({
      ...prev,
      downPaymentPercentage: rawValue,
    }));

    if (rawValue && !isNaN(Number(rawValue))) {
      const percentage = Math.min(Math.max(Number(rawValue), 0), 100);
      const amount = (state.projectAmount * percentage) / 100;
      setState(prev => ({
        ...prev,
        downPaymentAmount: Math.round(amount),
      }));
      setInputValues(prev => ({
        ...prev,
        downPaymentPercentage: percentage.toFixed(0),
      }));
    }
  };

  const handleInterestRateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    setInputValues(prev => ({
      ...prev,
      interestRate: rawValue,
    }));

    if (rawValue && !isNaN(Number(rawValue))) {
      const numValue = Math.min(Math.max(Number(rawValue), 0), 20);
      setState(prev => ({
        ...prev,
        interestRate: numValue,
      }));
      setInputValues(prev => ({
        ...prev,
        interestRate: numValue.toFixed(2),
      }));
    }
  };

  const handleLoanPeriodChange = (years: number) => {
    setState(prev => ({
      ...prev,
      loanPeriodYears: years,
    }));
  };

  const loanPeriodOptions = [1, 2, 3, 4, 5, 7, 10];

  return (
    <div id="simulation-financement" className="bg-gradient-to-b from-white to-gray-50 pt-8 sm:pt-12 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Simulation de Financement
              </span>
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Découvrez vos mensualités pour votre projet de rénovation. Estimez le coût total avec nos plans de financement flexibles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
        >
          {/* Left Column - Input Controls */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 sm:p-6 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 h-fit">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-5 sm:mb-8 flex items-center gap-2">
              <Euro className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              Paramètres
            </h3>

            {/* Project Amount */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                Montant du Projet
              </label>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">EUR</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={inputValues.projectAmount}
                    onChange={handleProjectAmountInput}
                    className="flex-1 bg-transparent text-xl sm:text-2xl font-bold text-gray-900 outline-none border-none p-0"
                    placeholder="50000"
                  />
                </div>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={state.projectAmount}
                onChange={handleProjectAmountChange}
                className="w-full h-2 sm:h-2.5 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>10 000 €</span>
                <span>10 000 000 €</span>
              </div>
            </div>

            {/* Down Payment Amount */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                Apport Personnel
              </label>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs sm:text-sm font-semibold">EUR</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={inputValues.downPaymentAmount}
                      onChange={handleDownPaymentAmountInput}
                      className="flex-1 bg-transparent text-base sm:text-lg font-bold text-gray-900 outline-none border-none p-0"
                      placeholder="10000"
                    />
                  </div>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={inputValues.downPaymentPercentage}
                      onChange={handleDownPaymentPercentageInput}
                      className="w-12 sm:w-14 bg-transparent text-base sm:text-lg font-bold text-gray-900 outline-none border-none p-0 text-right"
                      placeholder="20"
                    />
                    <span className="text-gray-400 font-semibold text-sm">%</span>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={state.projectAmount}
                step="5000"
                value={state.downPaymentAmount}
                onChange={handleDownPaymentChange}
                className="w-full h-2 sm:h-2.5 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0 €</span>
                <span>{formatCurrency(state.projectAmount)}</span>
              </div>
            </div>

            {/* Loan Period */}
            <div className="mb-0">
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">
                Durée du Financement
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {loanPeriodOptions.map(years => (
                  <button
                    key={years}
                    onClick={() => handleLoanPeriodChange(years)}
                    className={`py-2.5 sm:py-3 px-2 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm ${
                      state.loanPeriodYears === years
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {years} {years === 1 ? 'an' : 'ans'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Summary Results */}
          <div className="space-y-4 sm:space-y-6">
            {/* Monthly Payment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 sm:p-8 lg:p-10 text-white shadow-xl"
            >
              <p className="text-xs sm:text-sm font-semibold opacity-90 uppercase tracking-wide">Mensualité Estimée</p>
              <p className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold mt-2 sm:mt-3 break-words">
                {formatCurrency(calculations.monthlyPayment)}
              </p>
              <p className="text-xs sm:text-sm opacity-80 mt-3 sm:mt-4">
                {state.loanPeriodYears} ans • {calculations.months} mensualités
              </p>
            </motion.div>

            {/* Summary Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border-2 border-gray-100 p-5 sm:p-6 lg:p-10 shadow-lg"
            >
              <h3 className="font-bold text-gray-900 mb-4 sm:mb-6 text-base sm:text-lg">Résumé de Votre Financement</h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start sm:items-center pb-3 sm:pb-4 border-b border-gray-200 gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">Montant du projet</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base text-right">{formatCurrency(calculations.projectAmount)}</span>
                </div>

                <div className="flex justify-between items-start sm:items-center pb-3 sm:pb-4 border-b border-gray-200 gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">Apport personnel</span>
                  <span className="font-bold text-cyan-600 text-sm sm:text-base text-right">{formatCurrency(calculations.downPaymentAmount)}</span>
                </div>

                <div className="flex justify-between items-start sm:items-center pb-3 sm:pb-4 border-b border-gray-200 gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">Montant à financer</span>
                  <span className="font-bold text-blue-600 text-sm sm:text-base text-right">{formatCurrency(calculations.loanAmount)}</span>
                </div>

                <div className="flex justify-between items-start sm:items-center pb-3 sm:pb-4 border-b border-gray-200 gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">Durée du financement</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base text-right">{state.loanPeriodYears} ans</span>
                </div>

                <div className="flex justify-between items-start sm:items-center pb-3 sm:pb-4 border-b border-gray-200 gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">Taux d'intérêt</span>
                  <span className="font-bold text-green-600 text-xs sm:text-sm text-right">En fonction du prêt demandé</span>
                </div>

                <div className="flex justify-between items-start sm:items-center pt-2 gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">Coût total du financement</span>
                  <span className="font-bold text-lg text-gray-900 text-right">
                    {formatCurrency(calculations.loanAmount + calculations.totalInterest)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button - Spanning Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-8 sm:p-12 text-white mt-12 sm:mt-16 lg:mt-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Prêt à Démarrer Votre Financement ?
          </h3>
          <p className="text-base sm:text-lg mb-8 opacity-90">
            Demandez votre devis gratuit. Notre conseiller financier vous aidera à explorer toutes les solutions de financement adaptées à votre projet.
          </p>
          <button
            onClick={() => {
              if (onModalClose) {
                onModalClose();
                setTimeout(() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              } else {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 bg-white text-[#38bdf8] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            Demander un devis gratuit
          </button>
        </motion.div>
      </div>
    </div>
  );
}
