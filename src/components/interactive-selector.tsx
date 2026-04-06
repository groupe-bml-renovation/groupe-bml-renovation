import React, { useState, useEffect } from 'react';
import { Home, Paintbrush, Hammer, Wrench, Palette, Building } from 'lucide-react';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const options = [
    {
      title: "Rénovation Cuisine",
      description: "Cuisine moderne et fonctionnelle",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0044.jpg",
      icon: <Building size={24} className="text-white" />
    },
    {
      title: "Salle de Bain",
      description: "Espace spa et détente",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design%20(35)%20(1).png",
      icon: <Wrench size={24} className="text-white" />
    },
    {
      title: "Peinture intérieure et extérieure",
      description: "Finitions soignées et durables",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design%20(39)%20(1).png",
      icon: <Paintbrush size={24} className="text-white" />
    },
    {
      title: "Revêtement Sol",
      description: "Sols modernes et résistants",
      image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/263b1bc0-48b1-4d4d-84eb-fdb258af1d2c_kq1aov%20(2).jpg",
      icon: <Hammer size={24} className="text-white" />
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center bg-white font-sans text-slate-900 px-4 py-0">
      {/* Options Container */}
      <div className="options flex w-full max-w-[95vw] md:max-w-[900px] min-w-0 md:min-w-[600px] h-[250px] md:h-[450px] lg:h-[500px] mx-0 items-stretch overflow-hidden relative">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '40px',
              minHeight: '100px',
              margin: 0,
              borderRadius: 0,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? '#38bdf8' : '#e2e8f0',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              boxShadow: activeIndex === index 
                ? '0 20px 60px rgba(56, 189, 248, 0.3)' 
                : '0 4px 20px rgba(0,0,0,0.10)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'flex-grow, box-shadow, background-size, background-position'
            } as React.CSSProperties}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div 
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-30px',
                height: '120px',
                boxShadow: activeIndex === index 
                  ? 'inset 0 -120px 120px -120px rgba(0,0,0,0.4), inset 0 -120px 120px -80px rgba(0,0,0,0.2)' 
                  : 'inset 0 -120px 0px -120px rgba(0,0,0,0.4), inset 0 -120px 0px -80px rgba(0,0,0,0.2)'
              }}
            ></div>
            
            {/* Label with icon and info */}
            <div className="label absolute left-0 right-0 bottom-3 md:bottom-5 flex items-center justify-start h-10 md:h-12 z-2 pointer-events-none px-2 md:px-4 gap-2 md:gap-3 w-full">
              <div className="icon min-w-[32px] md:min-w-[44px] max-w-[32px] md:max-w-[44px] h-[32px] md:h-[44px] flex items-center justify-center rounded-full bg-[rgba(56,189,248,0.9)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#38bdf8] flex-shrink-0 flex-grow-0 transition-all duration-200">
                <div className="scale-75 md:scale-100">
                  {option.icon}
                </div>
              </div>
              <div className="info text-white whitespace-pre relative">
                <div 
                  className="main font-bold text-sm md:text-lg transition-all duration-700 ease-in-out drop-shadow-sm"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(15px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="sub text-xs md:text-base text-white/90 transition-all duration-700 ease-in-out drop-shadow-sm"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(15px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
        
        @media (max-width: 768px) {
          .options {
            height: 250px !important;
          }
          
          .option {
            min-width: 35px !important;
          }
        }
        
        @media (max-width: 480px) {
          .options {
            height: 200px !important;
          }
          
          .option {
            min-width: 30px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;