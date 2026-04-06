import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { submitArtisanPartnerApplication } from '@/services/artisanPartnerService';

export default function ArtisanPartnerApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tradeSpecialization: '',
    yearsExperience: '',
    certifications: '',
    serviceAreas: '',
    insuranceDetails: '',
    previousProjects: '',
    employeeCount: '',
    availability: '',
    additionalInfo: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await submitArtisanPartnerApplication({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      tradeSpecialization: formData.tradeSpecialization,
      yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : undefined,
      certifications: formData.certifications,
      serviceAreas: formData.serviceAreas,
      insuranceDetails: formData.insuranceDetails,
      previousProjects: formData.previousProjects,
      employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : undefined,
      availability: formData.availability,
      additionalInfo: formData.additionalInfo
    });

    if (result.success) {
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        tradeSpecialization: '',
        yearsExperience: '',
        certifications: '',
        serviceAreas: '',
        insuranceDetails: '',
        previousProjects: '',
        employeeCount: '',
        availability: '',
        additionalInfo: ''
      });
      setTimeout(() => setStatus('idle'), 5000);
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
    <div className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gray-900 uppercase">
            Soumettez Votre <span className="text-[#38bdf8]">Candidature</span>
          </h2>

          <p className="text-center text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Remplissez le formulaire ci-dessous pour nous soumettre votre candidature en tant qu'artisan partenaire. Partagez vos qualifications, votre expérience et vos projets précédents. Notre équipe examinera votre dossier et vous contactera dans les 48 heures pour discuter de cette collaboration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Informations Personnelles */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations Personnelles</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
          </div>

          {/* Section: Spécialisation */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Votre Spécialisation</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domaine de spécialisation <span className="text-red-500">*</span>
              </label>
              <select
                name="tradeSpecialization"
                value={formData.tradeSpecialization}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
                required
              >
                <option value="">Sélectionnez votre spécialisation</option>
                <option value="peinture">Peinture</option>
                <option value="plomberie">Plomberie</option>
                <option value="electricite">Électricité</option>
                <option value="menuiserie">Menuiserie</option>
                <option value="chauffage">Chauffage</option>
                <option value="climatisation">Climatisation</option>
                <option value="maçonnerie">Maçonnerie</option>
                <option value="carrelage">Carrelage</option>
                <option value="isolation">Isolation</option>
                <option value="couverture">Couverture</option>
                <option value="serrurerie">Serrurerie</option>
                <option value="vitrerie">Vitrerie</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Années d'expérience
                </label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  placeholder="Exemple: 10"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'employés
                </label>
                <input
                  type="number"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  placeholder="Exemple: 5"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section: Qualifications et Expérience */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Qualifications et Expérience</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications et qualifications
              </label>
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="Décrivez vos certifications, formations et qualifications professionnelles..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projets précédents et références
              </label>
              <textarea
                name="previousProjects"
                value={formData.previousProjects}
                onChange={handleChange}
                placeholder="Décrivez vos projets précédents, réalisations notables et références de clients..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors resize-none"
              ></textarea>
            </div>

          </div>

          {/* Section: Couverture et Assurance */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Couverture et Assurance</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zones de service <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="serviceAreas"
                value={formData.serviceAreas}
                onChange={handleChange}
                placeholder="Régions ou villes où vous intervenez (exemple: Grenoble, Isère, Rhône-Alpes)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Détails d'assurance et garanties
              </label>
              <textarea
                name="insuranceDetails"
                value={formData.insuranceDetails}
                onChange={handleChange}
                placeholder="Informations sur votre assurance responsabilité civile, garantie décennale et autres couvertures..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* Section: Disponibilité */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Disponibilité et Motivations</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre disponibilité <span className="text-red-500">*</span>
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors"
                required
              >
                <option value="">Sélectionnez votre disponibilité</option>
                <option value="immediately">Immédiatement</option>
                <option value="1-month">Dans 1 mois</option>
                <option value="2-3-months">Dans 2-3 mois</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informations supplémentaires et motivations
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Expliquez pourquoi vous souhaitez rejoindre notre réseau et toute autre information pertinente..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:border-gray-400 transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span>Envoi en cours...</span>
            ) : status === 'success' ? (
              <span>Candidature envoyée !</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Soumettre ma candidature
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
              Votre candidature a été envoyée avec succès. Nous vous contacterons sous 48 heures.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
