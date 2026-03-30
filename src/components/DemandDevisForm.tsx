import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendConsultationWebhook } from '@/services/webhookService';
import { trackQuoteRequest } from '@/lib/analytics';

export default function DemandDevisForm() {
  const [formData, setFormData] = useState({
    civilite: '',
    workType: '',
    budget: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    projectDescription: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    return formData.workType !== '' && formData.budget !== '' && formData.address !== '' && formData.city !== '' && formData.postalCode !== '' && formData.projectDescription !== '' && formData.civilite !== '' && formData.firstName !== '' && formData.lastName !== '' && formData.phone !== '' && formData.email !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await sendConsultationWebhook({
        civilite: formData.civilite,
        workType: formData.workType,
        budget: formData.budget,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        postalCode: formData.postalCode,
        city: formData.city,
        projectDescription: formData.projectDescription,
        submittedAt: new Date().toISOString()
      });

      trackQuoteRequest({
        workType: formData.workType,
        budget: formData.budget,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      setStatus('success');
      setFormData({
        civilite: '',
        workType: '',
        budget: '',
        firstName: '',
        lastName: '',
        address: '',
        postalCode: '',
        city: '',
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
        className="space-y-8"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de travaux souhaitez ? <span className="text-red-500">*</span>
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
              required
            >
              <option value="">Sélectionnez le type de travaux</option>
              <option value="renovation-complete">Rénovation complète</option>
              <option value="renovation-partielle">Rénovation partielle (Cuisine, Salle de bain...)</option>
              <option value="extension">Extension</option>
              <option value="renovation-energetique">Rénovation énergétique</option>
              <option value="amenagement-interieur-pmr">Aménagement intérieur / PMR</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de bien ? <span className="text-red-500">*</span>
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
              required
            >
              <option value="">Sélectionnez le type de bien</option>
              <option value="maison">Maison</option>
              <option value="appartement">Appartement</option>
              <option value="local-professionnel">Local professionnel / Bureaux</option>
              <option value="autre">Autre</option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Civilité <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="civilite"
                  value="M"
                  checked={formData.civilite === 'M'}
                  onChange={handleChange}
                  className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                  required
                />
                <span className="text-gray-700">Monsieur</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="civilite"
                  value="Mme"
                  checked={formData.civilite === 'Mme'}
                  onChange={handleChange}
                  className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                  required
                />
                <span className="text-gray-700">Madame</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Votre nom"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Votre prénom"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06 XX XX XX XX"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse complète du projet"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Annecy"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code postal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="74000"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description de votre projet <span className="text-red-500">*</span>
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Décrivez votre projet en quelques mots : type de travaux, surface, délais souhaités, etc."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors resize-none"
              required
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
        className="mb-8 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg text-center"
      >
        <p className="text-base md:text-lg font-bold text-gray-900">
          Formulaire de demande de devis gratuit
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
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
            className="w-full flex justify-center items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
