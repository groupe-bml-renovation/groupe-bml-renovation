import { Pen } from 'lucide-react';

export default function StickyCallButton() {
  const handleClick = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleClick}
        className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30 backdrop-blur-sm"
        aria-label="Demander un devis gratuit"
      >
        <div className="flex flex-col items-start leading-tight">
          <span className="font-semibold whitespace-nowrap">Demander un devis gratuit</span>
          <span className="text-xs font-normal opacity-90 whitespace-nowrap">Réponse sous 24h</span>
        </div>
        <div className="flex flex-col items-center">
          <Pen className="w-5 h-5 stroke-[2.5] flex-shrink-0" />
          <div className="w-8 h-0.5 bg-current rounded-full mt-1"></div>
        </div>
      </button>
    </div>
  );
}
