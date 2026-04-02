"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"
import { FaYoutube, FaTiktok, FaPinterest } from "react-icons/fa"

interface FooterProps {
  onNavigateToServices?: (serviceId?: string) => void;
}

export function Footer({ onNavigateToServices }: FooterProps) {
  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-12">
          <div className="flex-1">
            <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Accueil
              </button>
              <button
                onClick={() => onNavigateToServices?.()}
                className="block transition-colors hover:text-[#38bdf8] text-left"
              >
                Services
              </button>
              <a href="#" className="block transition-colors hover:text-[#38bdf8]">
                À Propos
              </a>
              <a href="#" className="block transition-colors hover:text-[#38bdf8]">
                Réalisations
              </a>
              <a href="#" className="block transition-colors hover:text-[#38bdf8]">
                Contact
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-end">
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-right">Suivez-nous</h3>
              <div className="flex space-x-4 mb-8">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600"
                        onClick={() => window.open('https://www.facebook.com/profile.php?id=61580321886961', '_blank')}
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suivez-nous sur Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-blue-400 hover:text-white hover:border-blue-400"
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
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600"
                        onClick={() => window.open('https://www.instagram.com/groupebml_renovation/', '_blank')}
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suivez-nous sur Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-blue-700 hover:text-white hover:border-blue-700"
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
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-red-600 hover:text-white hover:border-red-600"
                        onClick={() => window.open('https://www.youtube.com/@groupebmlrenovation', '_blank')}
                      >
                        <FaYoutube className="h-4 w-4" />
                        <span className="sr-only">YouTube</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suivez-nous sur YouTube</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-red-700 hover:text-white hover:border-red-700"
                        onClick={() => window.open('https://www.pinterest.com/groupebmlrenovation', '_blank')}
                      >
                        <FaPinterest className="h-4 w-4" />
                        <span className="sr-only">Pinterest</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suivez-nous sur Pinterest</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:bg-black hover:text-white hover:border-black"
                        onClick={() => window.open('https://www.tiktok.com/@groupebmlrenovation', '_blank')}
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
            </div>

            <div className="relative text-right">
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <address className="space-y-2 text-sm not-italic">
                <p>Téléphone: <a href="tel:0756915997"><span>07 56 91 59 97</span></a></p>
                <p>Email: <a href="mailto:contact@groupe-bml-renovation.com">contact@groupe-bml-renovation.com</a></p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Nos Zones d'Intervention à Grenoble et Isère</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="font-semibold text-red-900 text-sm">Grenoble (38000)</p>
                <p className="text-xs text-red-700">Zone principale</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-semibold text-blue-900 text-sm">Échirolles (38130)</p>
                <p className="text-xs text-blue-700">Zone étendue</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-semibold text-blue-900 text-sm">Meylan (38240)</p>
                <p className="text-xs text-blue-700">Zone étendue</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-semibold text-blue-900 text-sm">Fontaine (38600)</p>
                <p className="text-xs text-blue-700">Zone étendue</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-semibold text-blue-900 text-sm">Saint-Martin-d'Hères (38400)</p>
                <p className="text-xs text-blue-700">Zone étendue</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-semibold text-blue-900 text-sm">Voiron (38500)</p>
                <p className="text-xs text-blue-700">Zone étendue</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Nous intervenons également dans l'ensemble de l'Isère et de la région Auvergne-Rhône-Alpes. Contactez-nous pour connaître la disponibilité dans votre commune.
            </p>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Notre Siège à Grenoble en Isère</h3>
            <p className="text-slate-600">Nous vous accueillons à Grenoble pour discuter de votre projet de rénovation</p>
          </div>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89442.09834098153!2d5.6479!3d45.1885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af48bd689be6f%3A0x618c10cd6e995398!2sGrenoble%2C%20France!5e0!3m2!1sen!2sfr!4v1699000000000!5m2!1sen!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </footer>
  )
}
