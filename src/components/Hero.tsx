import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientCTAButton } from "@/components/ui/gradient-cta-button";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["À GRENOBLE", "EN ISÈRE", "CLÉS EN MAIN", "TOUT COMPRIS", "SUR MESURE"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const handleContactClick = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Découvrez nos services <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-white">RÉNOVATION MAISON</span>
              <br />
              <span className="text-white">APPARTEMENT &</span>
              <br />
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold bg-gradient-to-r from-blue-400 from-30% via-gray-200 via-70% to-gray-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-slate-300 max-w-2xl text-center">
              Spécialistes en rénovation d'appartement et maison à Grenoble et en Isère avec 10 ans d'excellence,
              nous transformons votre espace de vie avec notre savoir-faire et notre équipe d'experts en rénovation intérieure.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <MovingBorderButton
              onClick={handleContactClick}
              borderRadius="1.75rem"
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white flex items-center gap-2 text-sm px-4 py-2"
              duration={3}
            >
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold">Demander un devis gratuit</span>
                <span className="text-xs font-normal opacity-90">Réponse sous 24h</span>
              </div>
              <PhoneCall className="w-4 h-4 flex-shrink-0" />
            </MovingBorderButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
