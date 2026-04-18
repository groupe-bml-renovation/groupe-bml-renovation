import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { submitConsultation } from '@/services/consultationsService';
import { trackQuoteRequest } from '@/lib/analytics';

export default function QuoteRequestForm() {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    workType: '',
    fullName: '',
    fullName_temp: '', // To avoid breaking existing logic if needed
    email: '',
    phone: '',
    address: '',
    postalCode: '',
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
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      postalCode: formData.postalCode,
      projectDescription: formData.projectDescription,
      appointmentDate: formData.appointmentDate
    });

    if (result.success) {
      trackQuoteRequest({
        work_type: formData.workType,
        fullName: formData.fullName
      });
      setStatus('success');
      setFormData({
        workType: '',
        appointmentDate: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
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
    <div id="contact-form" className="bg-slate-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Column */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Échangeons sur votre projet !</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <option value="renovation-partielle">Rénovation partielle (Cuisine, Salle de bain...)</option>
                    <option value="extension">Extension</option>
                    <option value="renovation-energetique">Rénovation énergétique</option>
                    <option value="amenagement-interieur-pmr">Aménagement intérieur / PMR</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
                />
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Décrivez votre projet (Optionnel)
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Surface, travaux souhaités, délais..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 bg-white hover:border-gray-400 transition-colors resize-none text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h.
                </div>
              )}
            </form>
          </div>

          {/* 3. Badges Column (Bottom on Mobile, Bottom Right on Desktop) */}
          <div className="flex flex-col space-y-8 order-3 lg:order-2 lg:col-start-2">
            {/* Social Proof Badge - Hero Style Google & RGE */}
            <div className="pt-8 flex flex-row items-center justify-start w-full gap-8">
              <div className="flex flex-col items-start gap-4">
                <svg className="h-10 w-auto" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
                  <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4" />
                </svg>

                <div className="flex flex-col items-start gap-2">
                  <span className="text-slate-900 font-bold text-xl">
                    Excellent
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-24 w-px bg-slate-100 hidden sm:block"></div>

              <div className="flex flex-row items-center gap-6">
                <img 
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/RGE.png" 
                  alt="Certification RGE" 
                  className="h-20 w-auto object-contain"
                />
                <img 
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/RGE%20QUALIBAT.png" 
                  alt="Certification RGE Qualibat" 
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-500 italic">
                * Une étude complète personnalisée pour transformer votre intérieur avec expertise et sérénité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
