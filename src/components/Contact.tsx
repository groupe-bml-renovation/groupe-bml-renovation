import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';
import { Button as MovingBorderButton } from '@/components/ui/moving-border';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/textarea';
import { submitLead } from '@/services/leadsService';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await submitLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      source: 'contact'
    });

    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Une erreur est survenue');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact-form" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contactez-Nous
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une question ? Un projet ? N'hésitez pas à nous contacter pour un devis gratuit
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Adresse</h3>
                <p className="text-slate-600">
                  123 Avenue de la République<br />
                  75011 Paris, France
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Téléphone</h3>
                <a href="tel:0756915997" className="text-slate-600 hover:text-amber-600 transition-colors">
                  <strong><span>07 56 91 59 97</span></strong>
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                <a href="mailto:contact@bml-renovation.fr" className="text-slate-600 hover:text-amber-600 transition-colors">
                  contact@bml-renovation.fr
                </a>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="font-semibold text-slate-900 mb-3">Horaires d'ouverture</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium">7h - 19h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium">9h - 13h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium">Fermé</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="name" className="block mb-2 text-slate-700">
                    Nom complet *
                  </Label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block mb-2 text-slate-700">
                    Email *
                  </Label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="phone" className="block mb-2 text-slate-700">
                    Téléphone *
                  </Label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="block mb-2 text-slate-700">
                    Type de projet *
                  </Label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="renovation">Rénovation</option>
                    <option value="construction">Construction</option>
                    <option value="plomberie">Plomberie</option>
                    <option value="electricite">Électricité</option>
                    <option value="peinture">Peinture</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>



              <div className="mb-6">
                <Label htmlFor="message" className="block mb-2 text-slate-700">
                  Message (Optionnel)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet..."
                  className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 focus-visible:ring-amber-500"
                />
              </div>

              <MovingBorderButton
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold flex items-center justify-center gap-2"
                duration={2.5}
              >
                {status === 'loading' ? (
                  <span>Envoi en cours...</span>
                ) : status === 'success' ? (
                  <span>Message envoyé !</span>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </MovingBorderButton>

              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
