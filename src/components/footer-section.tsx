"use client"

import * as React from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { FaYoutube, FaTiktok, FaPinterest } from "react-icons/fa"
import { InterventionZones } from "./InterventionZones"

interface FooterSectionProps {
  onNavigateToServices?: (serviceId?: string) => void;
  onNavigate?: (page: string) => void;
}

export function FooterSection({ onNavigateToServices, onNavigate }: FooterSectionProps) {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const handleNavigation = (url: string) => {
    if (url === '/' || url === '') {
      window.location.href = isGrenoble ? '/grenoble' : '/';
    } else if (isGrenoble && !url.includes('/grenoble')) {
      window.location.href = `/grenoble${url}`;
    } else {
      window.location.href = url;
    }
  };

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-4 flex justify-center">
            <img
              src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo.png"
              alt="BML Rénovation Logo"
              className="h-24 w-auto object-contain"
              width={160}
              height={96}
              loading="lazy"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">BML Rénovation</h2>
          <p className="text-slate-600 max-w-md">Votre partenaire de confiance pour tous vos projets de rénovation depuis 10 ans.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-semibold">Principaux</h3>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => handleNavigation('/')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Accueil
              </button>
              <button
                onClick={() => handleNavigation('/apropos')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                À Propos
              </button>
              <button
                onClick={() => handleNavigation('/realisations')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Réalisations
              </button>
              <button
                onClick={() => handleNavigation('/faq')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigation('/devenir-franchise')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Devenir franchisé
              </button>
              <button
                onClick={() => handleNavigation('/devenir-artisan-partenaire')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Devenir artisan partenaire
              </button>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-semibold">Rénovation</h3>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => handleNavigation('/appartements')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Appartements
              </button>
              <button
                onClick={() => handleNavigation('/maisons-et-villas')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Maisons et Villas
              </button>
              <button
                onClick={() => handleNavigation('/boutiques-bureaux')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Boutiques & Bureaux
              </button>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => handleNavigation('/etapes-de-projet')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Étapes de Projet
              </button>
              <button
                onClick={() => handleNavigation('/financement')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Financement
              </button>
            </nav>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-semibold">Espaces</h3>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => handleNavigation('/salons')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Salons
              </button>
              <button
                onClick={() => handleNavigation('/cuisines')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Cuisines
              </button>
              <button
                onClick={() => handleNavigation('/chambres')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Chambres
              </button>
              <button
                onClick={() => handleNavigation('/salles-de-bain')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Salles de Bain
              </button>
              <button
                onClick={() => handleNavigation('/salles-de-bain-pmr')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Salles de Bain PMR
              </button>
              <button
                onClick={() => handleNavigation('/amenagement')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Aménagement
              </button>
              <button
                onClick={() => handleNavigation('/terrasse-bois')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Terrasse Bois
              </button>
              <button
                onClick={() => handleNavigation('/espace-verre')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Espace Verre
              </button>
              <button
                onClick={() => handleNavigation('/piscine')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Piscine
              </button>
            </nav>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-semibold">Métiers</h3>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => handleNavigation('/peinture')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Peinture
              </button>
              <button
                onClick={() => handleNavigation('/plomberie')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Plomberie
              </button>
              <button
                onClick={() => handleNavigation('/electricite')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Électricité
              </button>
              <button
                onClick={() => handleNavigation('/climatisation')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Climatisation
              </button>
              <button
                onClick={() => handleNavigation('/chauffage')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Chauffage
              </button>
              <button
                onClick={() => handleNavigation('/menuiserie')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Menuiserie
              </button>
              <button
                onClick={() => handleNavigation('/amiante')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Amiante
              </button>
              <button
                onClick={() => handleNavigation('/revetements-sols')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Revêtements Sols
              </button>
              <button
                onClick={() => handleNavigation('/revetements-muraux')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Revêtements Muraux
              </button>
              <button
                onClick={() => handleNavigation('/borne-electrique')}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Borne Électrique
              </button>
            </nav>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-semibold">Suivez-nous</h3>
            <div className="mb-6 flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-rounded"
                      className="text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shrink-0 h-8 w-8"
                      onClick={() => window.open('https://www.facebook.com/profile.php?id=61583239311358', '_blank')}
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur Facebook</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-rounded"
                      className="text-slate-700 hover:bg-blue-400 hover:text-white hover:border-blue-400 shrink-0 h-8 w-8"
                      onClick={() => window.open('https://x.com/BML_Renovation', '_blank')}
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur Twitter</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-rounded"
                      className="text-slate-700 hover:bg-pink-600 hover:text-white hover:border-pink-600 shrink-0 h-8 w-8"
                      onClick={() => window.open('https://www.instagram.com/groupe_bml_renovation_tce/', '_blank')}
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur Instagram</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-rounded"
                      className="text-slate-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 shrink-0 h-8 w-8"
                      onClick={() => window.open('https://www.linkedin.com/in/groupe-bml-r%C3%A9novation-tout-corps-d-%C3%A9tat-86aa693b1/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur LinkedIn</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-rounded"
                      className="text-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 shrink-0 h-8 w-8"
                      onClick={() => window.open('https://www.youtube.com/@GroupeBMLR%C3%A9novation', '_blank')}
                    >
                      <FaYoutube className="h-4 w-4" />
                      <span className="sr-only">YouTube</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur YouTube</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-rounded"
                      className="text-slate-700 hover:bg-red-700 hover:text-white hover:border-red-700 shrink-0 h-8 w-8"
                      onClick={() => window.open('https://fr.pinterest.com/38000bml/', '_blank')}
                    >
                      <FaPinterest className="h-4 w-4" />
                      <span className="sr-only">Pinterest</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur Pinterest</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-rounded"
                      className="text-slate-700 hover:bg-black hover:text-white hover:border-black shrink-0 h-8 w-8"
                      onClick={() => window.open('https://www.tiktok.com/@groupe_bml_renovation', '_blank')}
                    >
                      <FaTiktok className="h-4 w-4" />
                      <span className="sr-only">TikTok</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur TikTok</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Téléphone: <a href="tel:0756915997"><span>07 56 91 59 97</span></a></p>
              <p>Email: contact@groupe-bml-renovation.com</p>
              <p className="pt-2 border-t mt-2">5 Av. Paul Verlaine, 38100 Grenoble</p>
            </address>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Notre Localisation</h3>
            <p className="text-slate-600">5 Av. Paul Verlaine, 38100 Grenoble</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full h-64 rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18029.212838234685!2d5.703100730227123!3d45.1607314178529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af55e7fcef2a9%3A0x7fb9ce66faf8e6b9!2sGroupe%20BML%20R%C3%A9novation%20tout%20corps%20d&#39;%C3%A9tat!5e0!3m2!1sen!2sfr!4v1763451151876!5m2!1sen!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <InterventionZones />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center mb-4 md:mb-0"
          >
            <img
              src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Playfair%20Display-11.png"
              alt="10 ans badge"
              className="h-48 w-auto object-contain"
              width={192}
              height={192}
              loading="lazy"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © 2025 BML Rénovation. Tous droits réservés.
          </motion.p>
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4 text-sm"
          >
            <button
              onClick={() => handleNavigation('/politique-confidentialite')}
              className="transition-colors hover:text-[#38bdf8] text-left"
            >
              Politique de confidentialité
            </button>
            <button
              onClick={() => handleNavigation('/conditions-utilisation')}
              className="transition-colors hover:text-[#38bdf8] text-left"
            >
              Conditions d'utilisation
            </button>
            <button
              onClick={() => handleNavigation('/mentions-legales')}
              className="transition-colors hover:text-[#38bdf8] text-left"
            >
              Mentions légales
            </button>
          </motion.nav>
        </motion.div>
      </div>
    </footer>
  )
}
