import React from 'react';

interface Partner {
  name: string;
  logoUrl: string;
}

interface StaticPartnersGridProps {
  logos?: Partner[];
  title?: string;
  columns?: number;
}

const defaultPartners: Partner[] = [
  {
    name: 'Tollens',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/tollens%402x%20(1).jpg'
  },
  {
    name: 'Gauthier',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gauthier%402x.jpg'
  },
  {
    name: 'Zolpan',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/logo-partenaire-zolpan.png'
  },
  {
    name: 'Seigneurerie',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/seigneurerie%402x.jpg'
  },
  {
    name: 'Grohe',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/grohe%402x.jpg'
  },
  {
    name: 'Jacob',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/jacob%402x.jpg'
  },
  {
    name: 'Roca',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/roca%402x.jpg'
  },
  {
    name: 'Thermor',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/thermor%402x.jpg'
  },
  {
    name: 'Atlantic',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/atlantic%402x.jpg'
  },
  {
    name: 'Geberit',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/geberit%402x.jpg'
  },
  {
    name: 'Schneider',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/schneider%402x.jpg'
  },
  {
    name: 'Legrand',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/legrand%402x.jpg'
  },
  {
    name: 'Siemens',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/siemens%402x.jpg'
  },
  {
    name: 'Scrigno',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/scrigno%402x.jpg'
  },
  {
    name: 'Vachette',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/vachette%402x.jpg'
  },
  {
    name: 'Cuisinella',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/cuisinella%402x.jpg'
  },
  {
    name: 'Bricard',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/bricard%402x.jpg'
  },
  {
    name: 'Euro Wall',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/euro-wall%402x.jpg'
  },
  {
    name: 'Homs',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/homs%402x.jpg'
  },
  {
    name: 'Udirev',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/udirev%402x.jpg'
  },
  {
    name: 'Gerflor',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gerflor%402x.jpg'
  },
  {
    name: 'Quick-Step',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/quick-step%402x.jpg'
  },
  {
    name: 'Saloni',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/saloni%402x.jpg'
  },
  {
    name: 'Artens',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/artens%402x.jpg'
  },
  {
    name: 'Marazzi',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/marazzi%402x.jpg'
  },
  {
    name: 'Porcelanosa',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/porcellanosa%402x.jpg'
  },
  {
    name: 'Rexel',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/rexel-logo_mpyv5e.avif'
  },
  {
    name: 'Decoceram',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/decoceram-logo_dgsdlz.avif'
  },
  {
    name: 'Leroy Merlin',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/leroy-merlin-logo_tx0qpv.avif'
  },
  {
    name: 'Saint Maclou',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/saint-maclou-logo_nqvk1a.avif'
  },
  {
    name: 'Samse',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/samse-logo_mqsetl.avif'
  },
  {
    name: 'La Platforme',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/la-platforme-logo_zbjmrm.avif'
  },
  {
    name: 'Point P',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/point-p-logo_mq6r8c.avif'
  },
  {
    name: 'Cedeo',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/cedeo-logo_gulsqe.avif'
  },
  {
    name: 'Le Comptoir',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/le-comptoir-logo_dvd4rc.avif'
  },
  {
    name: 'Solmur',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/solmur-logo_ke5lve.avif'
  },
  {
    name: 'Forbo',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/forbo2_g4baag%20(1).jpg'
  },
  {
    name: 'LMS',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo_LMS_insta_Plan_de_travail_1_Plan_de_travail_1_c8ybfl%20(1).jpg'
  },
  {
    name: 'Brun',
    logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/233f5492189448a4f76cf952714f_gmen2x%20(1).png'
  }
];

export default function StaticPartnersGrid({
  logos = defaultPartners,
  title = 'Nos partenaires de confiance',
  columns = 4
}: StaticPartnersGridProps) {
  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7'
  }[columns] || 'grid-cols-4';

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        )}

        <div className={`grid ${gridColsClass} gap-6 md:gap-8`}>
          {logos.map((logo, index) => (
            <div
              key={`partner-${index}`}
              className="flex items-center justify-center h-24 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:border-[#38bdf8] hover:shadow-md transition-all duration-300 p-4"
            >
              <img
                src={logo.logoUrl}
                alt={logo.name}
                className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
