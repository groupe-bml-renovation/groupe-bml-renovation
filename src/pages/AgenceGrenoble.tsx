import React, { Suspense, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Shield, Star, Users, 
  CheckCircle, ChevronRight, Pen, MessageSquare, Quote, 
  ChevronLeft, ExternalLink, Calendar, Award, HardHat
} from 'lucide-react';
import { FooterSection } from '../components/footer-section';
import PageLoader from '../components/PageLoader';
import UnifiedContactForm from '../components/UnifiedContactForm';
import { OptimizedImage } from '../components/OptimizedImage';

const AgenceGrenoble: React.FC = () => {
    const [activeProject, setActiveProject] = useState(0);

    const images = {
        hero: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/grenoble_landscape_hero_1775488138864.png",
        shopfront: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/bml_renovation_shopfront_grenoble_1775488156215.png",
        manager: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/agency_manager_grenoble_1775488182675.png",
        projects: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        ]
    };

    const renovationTypes = [
        ["Rénovation maison ancienne", "Rénovation appartement canut", "Maçonnerie & Gros œuvre", "Façade & Isolation", "Menuiseries extérieures"],
        ["Aménagement de combles Lyon", "Cuisine haut de gamme", "Salle de bain sur mesure", "Travaux de peinture", "Revêtements de sols"],
        ["Devis travaux Grenoble", "Artisan maçon Isère", "Peintre en bâtiment 38", "Électricien professionnel", "Plombier chauffagiste"]
    ];

    return (
        <Suspense fallback={<PageLoader />}>
            <div className="min-h-screen bg-white text-[#333] font-sans overflow-x-hidden">
                <Helmet>
                    <title>Groupe BML Rénovation Grenoble | Entreprise de Travaux Isère</title>
                    <meta name="description" content="Découvrez notre agence de rénovation à Grenoble. Groupe BML vous accompagne dans tous vos projets : maison, appartement, extension. Devis sous 24h." />
                    <link rel="canonical" href="https://groupe-bml-renovation.fr/agence-grenoble" />
                </Helmet>

                {/* Sub-header / Breadcrumb like Illico */}
                <div className="bg-[#f2f6f9] border-b border-slate-200 py-2 hidden md:block">
                    <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest">
                        <span>Accueil</span> <ChevronRight size={10} /> <span>Nos agences</span> <ChevronRight size={10} /> <span className="font-bold text-[#003265]">Grenoble</span>
                    </div>
                </div>

                {/* Hero Section with Title Overlay */}
                <section className="relative h-[450px] md:h-[550px] overflow-hidden">
                    <OptimizedImage 
                      src={images.hero} 
                      alt="Grenoble Landscape" 
                      className="w-full h-full object-cover"
                      priority={true}
                      width={1920}
                      height={550}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-x-0 bottom-0 py-10 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="max-w-7xl mx-auto px-6">
                            <h1 className="text-4xl md:text-6xl font-bold text-white uppercase drop-shadow-2xl">
                                ILLICO travaux <span className="text-[#f58220]">Grenoble</span>
                            </h1>
                            <div className="mt-4 flex flex-wrap gap-4">
                                <button className="bg-[#f58220] hover:bg-[#d96a12] text-white font-bold py-3 px-8 rounded flex items-center gap-2 transition-all shadow-lg text-sm md:text-base">
                                   <Pen size={18} /> DEMANDER UN DEVIS
                                </button>
                                <a href="tel:0756915997" className="bg-white hover:bg-slate-50 text-[#003265] font-bold py-3 px-8 rounded flex items-center gap-2 transition-all shadow-lg text-sm md:text-base">
                                   <Phone size={18} /> 07 56 91 59 97
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Manager/Intro Info Card (Specific Style) */}
                <section className="relative z-20 -mt-16 md:-mt-24 px-6 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-[#e9eff4] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white">
                            <div className="md:w-1/3 p-8 flex flex-col items-center text-center bg-white">
                                <OptimizedImage 
                                    src={images.manager} 
                                    alt="David" 
                                    className="w-32 h-32 rounded-full border-4 border-[#e9eff4] mb-4 object-cover"
                                    width={128}
                                    height={128}
                                />
                                <h2 className="text-2xl font-bold text-[#003265]">David</h2>
                                <p className="text-slate-500 font-semibold mb-4 text-sm tracking-wide">Responsable d'agence</p>
                                <div className="space-y-3 w-full text-left">
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                        <MapPin size={16} className="text-[#f58220]" /> 5 Av. Paul Verlaine, 38100 Grenoble
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                        <Phone size={16} className="text-[#f58220]" /> 07 56 91 59 97
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                        <Mail size={16} className="text-[#f58220]" /> grenoble@illico-travaux.fr
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                                <Quote className="text-[#f58220]/20 w-16 h-16 absolute top-4 right-4 hidden md:block" />
                                <p className="text-lg md:text-xl text-[#003265] leading-relaxed italic mb-8 relative z-10">
                                    "Confier vos travaux à notre agence de Grenoble, c'est l'assurance d'un projet mené avec rigueur et transparence. Du premier devis à la réception finale, je suis à vos côtés pour transformer votre habitat en toute sérénité."
                                </p>
                                <div className="flex flex-wrap gap-8">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#003265] text-white p-2 rounded">
                                            <Award size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-black leading-none mb-1">Expertise</p>
                                            <p className="font-bold text-[#003265] leading-none">Certifiée RGE</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#f58220] text-white p-2 rounded">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-black leading-none mb-1">Garanties</p>
                                            <p className="font-bold text-[#003265] leading-none">Décennale Incluse</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Presentation Section with Slider-like Layout */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#003265] mb-8 uppercase tracking-tight">
                                    Votre agence <span className="text-[#f58220]">Illico Travaux à Grenoble</span>
                                <div className="w-20 h-1 bg-[#f58220] mt-4" />
                                </h2>
                                <div className="space-y-6 text-[#4a4a4a] text-lg leading-relaxed">
                                    <p>
                                        Vous avez un projet de <strong>rénovation</strong> de maison, d'appartement ou d'extension à Grenoble ? 
                                        L'agence Illico Travaux Grenoble vous accompagne de A à Z.
                                    </p>
                                    <p>
                                        Nous gérons pour vous la conception, le chiffrage, la sélection des artisans locaux et le suivi des travaux. 
                                        Bénéficiez d'un <strong>interlocuteur unique</strong> et de prix négociés.
                                    </p>
                                    <ul className="space-y-3 font-medium text-[#003265]">
                                        <li className="flex items-center gap-3"><CheckCircle className="text-[#f58220]" size={20} /> Estimation précise sous 24h/48h</li>
                                        <li className="flex items-center gap-3"><CheckCircle className="text-[#f58220]" size={20} /> Artisans locaux sélectionnés et vérifiés</li>
                                        <li className="flex items-center gap-3"><CheckCircle className="text-[#f58220]" size={20} /> Accompagnement sur-mesure (assistance MOA)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl border-8 border-slate-50">
                                <OptimizedImage 
                                    src={images.shopfront} 
                                    alt="Illico Travaux Shop" 
                                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700" 
                                    width={600}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ratings Banner */}
                <section className="bg-[#f2f6f9] py-12">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded shadow-sm flex flex-col items-center">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-6 mb-4" alt="Google" />
                           <div className="flex gap-1 text-[#f5c518] mb-2">
                               {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                           </div>
                           <p className="text-sm font-bold">4.8 / 5 <span className="text-slate-400 font-normal">(120 avis)</span></p>
                        </div>
                        <div className="bg-white p-6 rounded shadow-sm flex flex-col items-center">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Trustpilot_logo.svg/1200px-Trustpilot_logo.svg.png" className="h-6 mb-4" alt="Trustpilot" />
                           <div className="flex gap-1 text-[#00b67a] mb-2">
                               {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                           </div>
                           <p className="text-sm font-bold">Excellent <span className="text-slate-400 font-normal">(4.9/5)</span></p>
                        </div>
                        <div className="lg:col-span-2 flex items-center justify-center lg:justify-end gap-6 border-t md:border-t-0 md:border-l border-slate-200 mt-6 md:mt-0 pt-6 md:pt-0">
                           <p className="text-[#003265] font-black text-2xl uppercase tracking-tighter">Nos clients <br className="hidden lg:block"/> nous adorent</p>
                           <button className="bg-[#003265] hover:bg-[#00254a] text-white font-bold py-3 px-8 rounded shadow transition-all">VOIR LES AVIS</button>
                        </div>
                    </div>
                </section>

                {/* Expertise Grid Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-[#003265] mb-12 text-center uppercase tracking-widest">
                            Nos domaines <span className="text-[#f58220]">d'intervention</span>
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[
                                { title: "Rénovation maison", icon: HardHat },
                                { title: "Rénovation appartement", icon: MapPin },
                                { title: "Agrandissement", icon: ChevronRight },
                                { title: "Aménagement", icon: Users },
                                { title: "Cuisine", icon: Pen },
                                { title: "Salle de bain", icon: MessageSquare },
                                { title: "Peinture", icon: Shield },
                                { title: "Électricité", icon: Shield },
                                { title: "Plomberie", icon: Shield },
                                { title: "Maçonnerie", icon: Shield },
                                { title: "Menuiserie", icon: Shield },
                                { title: "Toiture", icon: Shield }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ backgroundColor: '#f2f6f9', borderColor: '#f58220' }}
                                    className="p-6 border border-slate-100 rounded-lg flex flex-col items-center gap-3 transition-all text-center group active:scale-95"
                                >
                                    <div className="bg-[#e9eff4] group-hover:bg-[#f58220] group-hover:text-white p-3 rounded-full transition-colors text-[#003265]">
                                        <item.icon size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-800 leading-tight uppercase tracking-tighter">{item.title}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Inspiration Image Slider Section (thumbnails style) */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-[#003265] mb-8 uppercase text-center">
                            En quelques images issues de nos <span className="text-[#f58220]">réalisations</span>
                        </h2>
                        
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-6">
                            <AnimatePresence mode="wait">
                                <motion.img 
                                    key={activeProject}
                                    src={images.projects[activeProject]} 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-cover" 
                                />
                            </AnimatePresence>
                            <button 
                                onClick={() => setActiveProject((prev) => (prev > 0 ? prev - 1 : images.projects.length - 1))}
                                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white backdrop-blur-md transition-all"
                            >
                                <ChevronLeft />
                            </button>
                            <button 
                                onClick={() => setActiveProject((prev) => (prev < images.projects.length - 1 ? prev + 1 : 0))}
                                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white backdrop-blur-md transition-all"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 px-2 md:px-0">
                            {images.projects.map((img, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setActiveProject(i)}
                                    className={`relative aspect-video rounded-xl overflow-hidden shadow-md transition-all ${activeProject === i ? 'ring-4 ring-[#f58220]' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" width={300} height={169} loading="lazy" />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Blue CTA Banner Section */}
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-[#003265] rounded-[40px] p-10 md:p-16 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8 max-w-4xl leading-none">
                                Besoin d'un accompagnement personnalisé pour vos travaux ?
                            </h2>
                            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl font-light">
                                Votre agence Illico Travaux à Grenoble réalise pour vous une estimation gratuite de votre projet sous 24h/48h.
                            </p>
                            <button 
                                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-[#f58220] hover:bg-white hover:text-[#003265] text-white font-black py-6 px-16 rounded-2xl transition-all shadow-2xl text-xl uppercase tracking-wider scale-110 md:scale-100"
                            >
                                ESTIMER MON PROJET
                            </button>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <div id="contact-form" className="py-20">
                    <UnifiedContactForm />
                </div>

                {/* Link Grid Footer Section */}
                <section className="py-20 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {["Nos types de rénovations", "Nos projets par pièce", "Nos interventions par secteur", "Nos services & conseils"].map((cat, i) => (
                                <div key={i}>
                                    <h5 className="text-[#003265] font-black uppercase text-sm mb-6 pb-2 border-b-2 border-slate-50">{cat}</h5>
                                    <div className="space-y-3">
                                        {renovationTypes[i % 3].map(link => (
                                            <a key={link} className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#f58220] transition-colors group cursor-pointer">
                                                <ChevronRight size={12} className="text-[#f58220] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <FooterSection onNavigateToServices={() => {}} onNavigate={() => {}} />
            </div>
        </Suspense>
    );
};

export default AgenceGrenoble;
