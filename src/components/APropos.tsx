import React from 'react';
import { CheckCircle, Award, Users, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { Phone } from 'lucide-react';

interface AProposProps {
  onBack: () => void;
}

const APropos: React.FC<AProposProps> = ({ onBack }) => {
  const scrollToContactForm = () => {
    onBack(); // Go back to home page first
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const values = [
    {
      icon: <Award className="w-8 h-8 text-[#38bdf8]" />,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet, avec des finitions impeccables et des matériaux de qualité supérieure."
    },
    {
      icon: <Users className="w-8 h-8 text-[#38bdf8]" />,
      title: "Proximité",
      description: "Une relation de confiance avec nos clients, basée sur l'écoute, la transparence et l'accompagnement personnalisé."
    },
    {
      icon: <Clock className="w-8 h-8 text-[#38bdf8]" />,
      title: "Ponctualité",
      description: "Respect des délais convenus et planification rigoureuse pour que votre projet avance selon vos attentes."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#38bdf8]" />,
      title: "Garantie",
      description: "Tous nos travaux sont garantis et nous intervenons rapidement en cas de besoin après livraison."
    }
  ];

  const milestones = [
    {
      year: "",
      title: "Création de l'entreprise",
      description: "Début de l'aventure BML Rénovation avec une vision claire et ambitieuse : transformer les espaces de vie en créant des intérieurs qui allient esthétique, fonctionnalité et confort. Nos fondateurs ont posé les bases d'une entreprise qui place la satisfaction client et la qualité au cœur de chaque intervention, établissant ainsi les valeurs qui guident encore aujourd'hui notre travail quotidien."
    },
    {
      year: "",
      title: "Expansion des services",
      description: "Développement et perfectionnement de notre expertise en rénovation complète et architecture d'intérieur. Cette année marque un tournant décisif avec l'élargissement de notre gamme de services pour inclure la conception sur mesure, l'aménagement d'espaces complexes et l'intégration de solutions innovantes. Notre réputation s'étend dans la région grâce à des projets d'envergure qui démontrent notre savoir-faire et notre capacité à gérer tous types de rénovations."
    },
    {
      year: "",
      title: "Croissance de l'équipe",
      description: "Renforcement stratégique de notre équipe d'experts qualifiés avec le recrutement d'artisans spécialisés et l'augmentation significative de notre capacité de production. Cette expansion nous permet de prendre en charge simultanément plusieurs chantiers d'envergure tout en maintenant notre standard de qualité élevé. Nous investissons également dans la formation continue de nos collaborateurs pour garantir une expertise technique toujours à la pointe des dernières innovations du secteur."
    },
    {
      year: "",
      title: "Innovation continue",
      description: "Intégration proactive des dernières technologies du bâtiment, des matériaux écologiques de nouvelle génération et des techniques éco-responsables dans l'ensemble de nos projets de rénovation. Notre engagement pour la transition énergétique et le développement durable nous pousse à proposer des solutions innovantes qui réduisent l'empreinte carbone tout en améliorant le confort et les performances énergétiques des habitations. Nous continuons d'investir dans la recherche et le développement pour rester à l'avant-garde de notre secteur."
    }
  ];

  const stats = [
    { number: "10", label: "Années d'expérience", color: "text-blue-600" },
    { number: "300+", label: "Projets réalisés", color: "text-green-600" },
    { number: "75+", label: "Artisans PARTENAIRES", color: "text-purple-600" },
    { number: "01", label: "Interlocuteur unique", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 pt-24">
        <div className="w-full max-w-none">
          
          {/* Hero Section */}
          <div className="relative mb-8">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div>
                <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                  À PROPOS DE BML RÉNOVATION
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                  Tous corps d'état,<br />
                  <span className="text-[#38bdf8]">Spécialiste en rénovation complète</span>
                </h1>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Depuis plus de 10 ans, BML Rénovation met son expertise au service de vos projets de rénovation. Notre équipe regroupe des professionnels qualifiés dans chaque corps de métier : peinture, plomberie, électricité, maçonnerie, menuiserie et aménagement intérieur.
                  </p>
                  <p>
                    Qu'il s'agisse de rénovation complète, de modernisation de salle de bain, de pose de parquet flottant ou de ravalement de façade, nous assurons des travaux soignés, durables et esthétiques, pensés pour redonner vie à votre habitat.
                  </p>
                  <p>
                    Avec BML Rénovation, vous bénéficiez d'un accompagnement sur mesure, d'un suivi rigoureux et d'un résultat à la hauteur de vos attentes.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 max-w-6xl mx-auto">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod.jpg"
                  alt="Rénovation intérieure moderne BML"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Notre Engagement Section - Light Background */}
          <div className="py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="text-center mb-12">
              <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                POURQUOI NOUS CHOISIR
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Notre Engagement
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760420069/pexels-photo-3184465_cswhuk.jpg"
                  alt="Années d'Expérience"
                  className="w-full h-64 object-cover"
                />
                <div className="p-8 text-center bg-white">
                  <div className="text-[#38bdf8] text-5xl md:text-6xl font-bold mb-2">
                    10
                  </div>
                  <div className="text-gray-900 text-sm font-semibold uppercase tracking-wide mb-4">
                    ANNÉES D'EXPÉRIENCE
                  </div>
                  <p className="text-gray-600 text-sm">
                    Améliorer les habitations avec un savoir-faire expert depuis 2015
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760420066/pexels-photo-834892_xpajc7.jpg"
                  alt="Projets Réalisés"
                  className="w-full h-64 object-cover"
                />
                <div className="p-8 text-center bg-white">
                  <div className="text-[#38bdf8] text-5xl md:text-6xl font-bold mb-2">
                    300+
                  </div>
                  <div className="text-gray-900 text-sm font-semibold uppercase tracking-wide mb-4">
                    PROJETS RÉALISÉS
                  </div>
                  <p className="text-gray-600 text-sm">
                    Plus de 300+ projets réussis livrés avec qualité et soin
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250256/8beb5492-0d59-4517-a2a4-ff500de068a7_q9eo3g.jpg"
                  alt="Professionnels"
                  className="w-full h-64 object-cover"
                />
                <div className="p-8 text-center bg-white">
                  <div className="text-[#38bdf8] text-5xl md:text-6xl font-bold mb-2">
                    75+
                  </div>
                  <div className="text-gray-900 text-sm font-semibold uppercase tracking-wide mb-4">
                    PROFESSIONNEL
                  </div>
                  <p className="text-gray-600 text-sm">
                    Notre équipe de 75+ professionnels garantit des résultats de première qualité
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760420068/pexels-photo-3184292_gxqj4k.jpg"
                  alt="Satisfaction Client"
                  className="w-full h-64 object-cover"
                />
                <div className="p-8 text-center bg-white">
                  <div className="text-[#38bdf8] text-5xl md:text-6xl font-bold mb-2">
                    99%
                  </div>
                  <div className="text-gray-900 text-sm font-semibold uppercase tracking-wide mb-4">
                    SATISFACTION CLIENT
                  </div>
                  <p className="text-gray-600 text-sm">
                    Tous nos clients sont satisfaits de notre travail et de notre service
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notre Histoire Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                NOTRE PARCOURS
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
                Une Histoire de Passion et d'Excellence
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez les moments clés qui ont façonné BML Rénovation et notre engagement
                constant vers l'innovation et la qualité.
              </p>
            </div>

            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow h-full">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {milestone.description}
                      </p>
                      {index === 0 && (
                        <img
                          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/1%20Cre%CC%81ation%20de%20l'entreprise.png"
                          alt="Création de l'entreprise"
                          className="w-full rounded-xl mt-3"
                        />
                      )}
                      {index === 1 && (
                        <img
                          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/2%20Expansion%20des%20services.png"
                          alt="Expansion des services"
                          className="w-full rounded-xl mt-3"
                        />
                      )}
                      {index === 2 && (
                        <img
                          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/3%20Croissance%20de%20l'e%CC%81quipe.png"
                          alt="Croissance de l'équipe"
                          className="w-full rounded-xl mt-3"
                        />
                      )}
                      {index === 3 && (
                        <img
                          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/4%20Innovation%20continue.png"
                          alt="Innovation continue"
                          className="w-full rounded-xl mt-3"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Notre Équipe Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4 lg:order-2 h-full">
                  <div className="space-y-4 flex flex-col h-full">
                    <img
                      src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254730/IMG-20250909-WA0036_tjkv9r.jpg"
                      alt="Équipe au travail"
                      className="w-full flex-[3] object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                    <img
                      src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254052/IMG-20250909-WA0040_izcj1t.jpg"
                      alt="Expertise technique"
                      className="w-full flex-[2] object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </div>
                  <div className="space-y-4 pt-8 flex flex-col h-full">
                    <img
                      src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254062/IMG-20250909-WA0037_lm9udg.jpg"
                      alt="Professionnels qualifiés"
                      className="w-full flex-[2] object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                    <img
                      src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254075/IMG-20250909-WA0014_jg0xyb.jpg"
                      alt="Finitions de qualité"
                      className="w-full flex-[3] object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </div>
                </div>

                <div className="space-y-6 lg:order-1">
                  <div>
                    <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                      NOTRE ÉQUIPE
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
                      Des Professionnels Passionnés à Votre Service
                    </h2>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Notre force réside dans notre équipe de professionnels qualifiés et passionnés.
                    Chaque membre apporte son expertise unique pour garantir la réussite de votre projet.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Artisans Certifiés</h4>
                        <p className="text-gray-600">Tous nos artisans possèdent les certifications nécessaires</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Formation Continue</h4>
                        <p className="text-gray-600">Mise à jour régulière des compétences et techniques</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Esprit d'Équipe</h4>
                        <p className="text-gray-600">Collaboration étroite pour des résultats optimaux</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nos Engagements Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                NOS ENGAGEMENTS
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
                Notre Promesse Client
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Qualité Garantie
                </h3>
                <p className="text-gray-600 mb-4">
                  Tous nos travaux sont garantis et nous nous engageons sur la qualité
                  des matériaux et des finitions.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Garantie décennale</li>
                  <li>• Matériaux certifiés</li>
                  <li>• Contrôle qualité rigoureux</li>
                </ul>
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760423271/20251014_0820_Qualit%C3%A9_et_Garantie_simple_compose_01k7gnydfjf6j8dtfgbh8044dq_wopqrn.png"
                  alt="Qualité garantie"
                  className="w-full rounded-xl mt-4"
                />
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Respect des Délais
                </h3>
                <p className="text-gray-600 mb-4">
                  Planification rigoureuse et respect des échéances pour que votre
                  projet avance selon vos attentes.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Planning détaillé</li>
                  <li>• Suivi en temps réel</li>
                  <li>• Communication régulière</li>
                </ul>
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760423270/20251014_0826_Respect_des_D%C3%A9lais_simple_compose_01k7gp9sp6fb3vt7q0gz96r0nb_qlofd5.png"
                  alt="Respect des délais"
                  className="w-full rounded-xl mt-4"
                />
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Transparence Totale
                </h3>
                <p className="text-gray-600 mb-4">
                  Devis détaillés, prix transparents et aucune surprise.
                  Vous savez exactement ce que vous payez.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Devis gratuit détaillé</li>
                  <li>• Prix fixes</li>
                  <li>• Aucun coût caché</li>
                </ul>
                <img
                  src="https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760423665/20251014_0833_Estimation_en_Fran%C3%A7ais_remix_01k7gppt2te3ntg7gbd24xhnsw_vdgjlo.png"
                  alt="Transparence totale"
                  className="w-full rounded-xl mt-4"
                />
              </div>
            </div>
          </div>

          {/* Notre Équipe - Les Artisans Section */}
          <div className="mb-20 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 bg-white text-gray-900 overflow-hidden">
            <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-16">
              <div className="text-center mb-12">
                <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                  NOTRE ÉQUIPE
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                  Les Artisans de Votre<br />
                  <span className="text-[#38bdf8]">Projet de Rénovation</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Une équipe passionnée et qualifiée qui transforme vos rêves en réalité avec expertise,
                  créativité et un engagement sans faille envers votre satisfaction.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900 rounded-2xl p-6 text-center">
                  <Clock className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">10 ans</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">D'expérience</div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900 rounded-2xl p-6 text-center">
                  <Award className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">300+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">Projets réalisés</div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900 rounded-2xl p-6 text-center">
                  <Users className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">75+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">PARTENAIRES</div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900 rounded-2xl p-6 text-center">
                  <Star className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">99%</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">CLIENTS SATISFAITS</div>
                </div>
              </div>

              <div className="mb-16">
                <div className="text-center mb-10">
                  <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                    NOS VALEURS
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-4">
                    Ce qui nous anime chaque jour
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
                    <Award className="w-10 h-10 text-[#38bdf8] mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Professionnalisme</h4>
                    <p className="text-gray-600 text-sm">
                      Excellence et rigueur dans chaque intervention, du diagnostic initial à la livraison finale.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
                    <Users className="w-10 h-10 text-[#38bdf8] mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Proximité</h4>
                    <p className="text-gray-600 text-sm">
                      Une écoute attentive et un accompagnement personnalisé tout au long de votre projet.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
                    <CheckCircle className="w-10 h-10 text-[#38bdf8] mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Satisfaction Client</h4>
                    <p className="text-gray-600 text-sm">
                      Votre satisfaction est notre priorité absolue. 99% de nos clients nous recommandent.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
                    <Shield className="w-10 h-10 text-[#38bdf8] mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Expertise</h4>
                    <p className="text-gray-600 text-sm">
                      20 ans d'expérience et plus de 1000 projets réalisés avec succès.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <div className="text-center mb-10">
                  <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                    NOS ÉQUIPES SPÉCIALISÉES
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-4">
                    Des Experts pour Chaque Domaine
                  </h3>
                  <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                    Chaque équipe apporte son expertise unique pour garantir l'excellence dans tous les aspects
                    de votre projet.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
                    <div className="mb-6">
                      <span className="text-[#38bdf8] text-xs font-semibold uppercase tracking-wide">
                        DOMAINES D'EXPERTISE
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Peinture intérieure</h5>
                          <p className="text-sm text-gray-600">Revêtements muraux</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Finitions décoratives</h5>
                          <p className="text-sm text-gray-600">Papiers peints</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Interventions soignées</h5>
                          <p className="text-sm text-gray-600">Conseils personnalisés</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Résultats durables</h5>
                          <p className="text-sm text-gray-600">Qualité garantie</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
                    <div className="mb-6">
                      <span className="text-[#38bdf8] text-xs font-semibold uppercase tracking-wide">
                        DOMAINES D'EXPERTISE
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Rénovation complète</h5>
                          <p className="text-sm text-gray-600">Aménagement intérieur</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Travaux tous corps d'état</h5>
                          <p className="text-sm text-gray-600">Coordination</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
                    <div className="mb-6">
                      <span className="text-[#38bdf8] text-xs font-semibold uppercase tracking-wide">
                        DOMAINES D'EXPERTISE
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Menuiserie sur mesure</h5>
                          <p className="text-sm text-gray-600">Parquet & sols</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Placards & rangements</h5>
                          <p className="text-sm text-gray-600">Agencement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
                    <div className="mb-6">
                      <span className="text-[#38bdf8] text-xs font-semibold uppercase tracking-wide">
                        DOMAINES D'EXPERTISE
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Installation électrique</h5>
                          <p className="text-sm text-gray-600">Plomberie & sanitaires</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#38bdf8] mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Chauffage</h5>
                          <p className="text-sm text-gray-600">Domotique</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APropos;