import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { submitConsultation } from '@/services/consultationsService';
import { trackQuoteRequest } from '@/lib/analytics';

export default function QuoteRequestForm() {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    workType: '',
    budget: '',
    appointmentDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    projectDescription: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await submitConsultation({
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
      appointmentDate: formData.appointmentDate
    });

    if (result.success) {
      trackQuoteRequest({
        work_type: formData.workType,
        budget: formData.budget,
        city: formData.city,
      });
      setStatus('success');
      setFormData({
        workType: '',
        budget: '',
        appointmentDate: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        projectDescription: ''
      });
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Une erreur est survenue');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="contact-form" className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
            Demande de devis gratuit
          </span>
        </h1>

        <div className="text-center text-gray-600 text-base sm:text-lg leading-relaxed mb-12 max-w-3xl mx-auto space-y-4">
          <p>
            Remplissez le formulaire ci-dessous pour que membre de notre service client vous appellera sous 24h afin de prendre rendez-vous avec un conseils personnalisés pour votre projet.
          </p>

          <p>
            De plus recevez un cadeau par e-mail avec la confirmation de réception.
          </p>

          <p className="font-semibold text-gray-900">
            Après la visite, vous recevez gratuitement :
          </p>

          <ul className="space-y-2 text-left inline-block">
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold mt-1">•</span>
              <span>Un devis clair et détaillé</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold mt-1">•</span>
              <span>Un modèle 3D pour visualiser votre futur espace</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold mt-1">•</span>
              <span>Une livraison sous 48 à 72 h après le rendez-vous</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de travaux souhaitez ? <span className="text-red-500">*</span>
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de rendez-vous préférée
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={today}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
            />
            <p className="text-xs text-gray-600 mt-1">
              Sélectionnez votre date de préférence pour le rendez-vous initial
            </p>
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse du projet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse complète"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Décrivez votre projet <span className="text-red-500">*</span>
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Décrivez votre projet en quelques mots : surface, travaux souhaités, délais..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span>Envoi en cours...</span>
            ) : status === 'success' ? (
              <span>Demande envoyée !</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer ma demande
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errorMessage}
            </div>
          )}

          {status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
