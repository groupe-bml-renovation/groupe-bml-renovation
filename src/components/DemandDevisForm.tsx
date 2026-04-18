import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendConsultationWebhook } from '@/services/webhookService';
import { trackQuoteRequest } from '@/lib/analytics';

export default function DemandDevisForm() {
  const [formData, setFormData] = useState({
    workType: '',
    fullName: '',
    address: '',
    postalCode: '',
    phone: '',
    email: '',
    projectDescription: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await sendConsultationWebhook({
        workType: formData.workType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        postalCode: formData.postalCode,
        projectDescription: formData.projectDescription,
        submittedAt: new Date().toISOString()
      });

      trackQuoteRequest({
        workType: formData.workType,
        email: formData.email,
        fullName: formData.fullName
      });

      setStatus('success');
      setFormData({
        workType: '',
        fullName: '',
        address: '',
        postalCode: '',
        phone: '',
        email: '',
        projectDescription: ''
      });

      setTimeout(() => {
        window.location.href = '/confirmation-devis';
      }, 1500);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi du formulaire');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderFormContent = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 md:space-y-5"
      >
        <div className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Type de travaux souhaitez ? <span className="text-red-500">*</span>
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
              required
            >
              <option value="">Sélectionnez le type</option>
              <option value="renovation-complete">Rénovation complète</option>
              <option value="renovation-partielle">Rénovation partielle</option>
              <option value="extension">Extension</option>
              <option value="renovation-energetique">Rénovation énergétique</option>
              <option value="amenagement-interieur-pmr">Aménagement / PMR</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nom & Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Votre nom et prénom"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
              required
            />
          </div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06 XX XX XX XX"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Adresse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Adresse complète du projet"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Code postal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="74000"
                pattern="[0-9]{5}"
                title="5 chiffres requis"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description de votre projet (Optionnel)
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Détails : surface, travaux, délais..."
              rows={2}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors resize-none text-sm"
            ></textarea>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg text-center"
      >
        <p className="text-base md:text-lg font-bold text-gray-900">
          Formulaire demande de devis
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {renderFormContent()}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            {errorMessage}
          </motion.div>
        )}

        <div className="flex pt-6 border-t border-gray-200">
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex justify-center items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 text-sm sm:text-base bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span>Envoi...</span>
            ) : status === 'success' ? (
              <span>Envoyée !</span>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Envoyer demande de devis</span>
                <span className="sm:hidden">Envoyer</span>
              </>
            )}
          </motion.button>
        </div>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
          >
            Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h.
          </motion.div>
        )}
      </form>
    </div>
  );
}
