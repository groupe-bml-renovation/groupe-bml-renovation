import React from 'react';

interface Statistic {
  number: string;
  label: string;
}

const StatisticsCards: React.FC = () => {

  const statistics: Statistic[] = [
    {
      number: '10',
      label: "D'EXPÉRIENCE"
    },
    {
      number: '+300',
      label: 'PROJETS RÉALISÉS'
    },
    {
      number: '+75',
      label: 'Artisans PARTENAIRES'
    },
    {
      number: '99%',
      label: 'CLIENTS SATISFAITS'
    }
  ];

  return (
    <section
      id="statistics-section"
      className="relative w-full bg-slate-950 overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-sky-400/50 p-8 md:p-10 text-center transition-all duration-500 transform opacity-100 translate-y-0"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 to-sky-400/0 group-hover:from-sky-400/10 group-hover:to-sky-400/5 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-sky-400 mb-4 leading-tight">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white leading-relaxed">
                  {stat.label}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsCards;
