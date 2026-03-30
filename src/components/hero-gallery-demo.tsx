import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/ui/hero-gallery-scroll-animation"
import { Button } from "@/components/ui/button"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Phone } from "lucide-react"

// Using renovation-themed images from Pexels that match your brand
const RENOVATION_IMAGES = [
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
]

const BMLRenovationHero = () => {
  const scrollToContactForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return null
}

const BMLKitchenHero = () => {
  const scrollToContactForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ContainerScroll className="h-[350vh]">
      <BentoGrid
        variant={"fourCells"}
        className="sticky left-0 top-0 h-svh w-full p-4"
      >
        {RENOVATION_IMAGES.filter((_, index) => index <= 3).map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-xl shadow-xl"
          >
            <img
              className="size-full object-cover object-center"
              width="100%"
              height="100%"
              src={imageUrl}
              alt={`Rénovation cuisine BML ${index + 1}`}
            />
          </BentoCell>
        ))}
      </BentoGrid>
      <ContainerScale className="text-center">
        <h1 className="max-w-4xl text-4xl md:text-6xl font-bold tracking-tighter text-slate-800">
          RÉNOVATION<br />
          <span className="text-[#38bdf8]">CUISINE MODERNE</span>
        </h1>
        <p className="my-6 max-w-2xl text-lg text-slate-700 md:text-xl leading-relaxed">
          Transformation complète de votre cuisine avec des solutions sur mesure, 
          des matériaux de qualité et un design contemporain.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LiquidButton
            onClick={scrollToContactForm}
            className="text-black text-lg font-medium"
            size="xxl"
          >
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold">Demander un devis gratuit</span>
              <span className="text-sm font-normal opacity-90">Réponse sous 24h</span>
            </div>
            <Phone className="w-6 h-6 flex-shrink-0" />
          </LiquidButton>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}

const BMLBathroomHero = () => {
  const scrollToContactForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ContainerScroll className="h-[350vh] bg-slate-900 text-slate-100">
      <BentoGrid
        variant={"threeCells"}
        className="sticky left-0 top-0 h-svh w-full p-4"
      >
        {RENOVATION_IMAGES.filter((_, index) => index <= 2).map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-xl shadow-xl"
          >
            <img
              className="size-full object-cover object-center"
              width="100%"
              height="100%"
              src={imageUrl}
              alt={`Rénovation salle de bain BML ${index + 1}`}
            />
          </BentoCell>
        ))}
      </BentoGrid>
      <ContainerScale className="text-center">
        <h1 className="max-w-4xl text-4xl md:text-6xl font-bold tracking-tighter text-white">
          RÉNOVATION<br />
          <span className="text-[#38bdf8]">SALLE DE BAIN</span>
        </h1>
        <p className="my-6 max-w-2xl text-lg opacity-80 md:text-xl leading-relaxed">
          Création d'espaces spa modernes avec douche à l'italienne, 
          baignoires design et finitions haut de gamme.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LiquidButton
            onClick={scrollToContactForm}
            className="text-white text-lg font-medium"
            size="xxl"
          >
            <div className="flex flex-col items-start leading-tight">
              <span className="font-semibold">Demander un devis gratuit</span>
              <span className="text-sm font-normal opacity-90">Réponse sous 24h</span>
            </div>
            <Phone className="w-6 h-6 flex-shrink-0" />
          </LiquidButton>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}

export { BMLRenovationHero, BMLKitchenHero, BMLBathroomHero }