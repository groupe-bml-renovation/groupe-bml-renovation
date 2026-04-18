import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface GalleryImage {
  name: string;
  imageUrl: string;
  description?: string;
}

interface ProjectGallerySectionProps {
  title?: string;
  description?: string;
  images?: GalleryImage[];
  showHeader?: boolean;
  reducedPadding?: boolean;
  scrollDirection?: 'left' | 'right';
  topSpacing?: string;
}

export default function ProjectGallerySection({
  title = 'Galerie du projet',
  description = 'Découvrez notre galerie d\'images de ce projet de salle de bain PMR.',
  images: customImages,
  showHeader = true,
  reducedPadding = false,
  scrollDirection = 'left',
  topSpacing = ''
}: ProjectGallerySectionProps) {

  const defaultImages: GalleryImage[] = [
    {
      name: 'Salle de bain PMR 1',
      imageUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2001.png'
    },
    {
      name: 'Salle de bain PMR 2',
      imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1260&q=80'
    },
    {
      name: 'Salle de bain PMR 3',
      imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1260&q=80'
    },
    {
      name: 'Salle de bain PMR 4',
      imageUrl: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1260&q=80'
    },
    {
      name: 'Salle de bain PMR 5',
      imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1260&q=80'
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const galleryImages = customImages || defaultImages;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;

    const container = scrollContainerRef.current;
    const imageCard = container.querySelector('[data-gallery-card]') as HTMLElement;

    if (!imageCard) return;

    const cardWidth = imageCard.offsetWidth;
    const flexContainer = container.querySelector('.flex') as HTMLElement;

    let computedGap = 32;
    if (flexContainer) {
      const gapStyle = window.getComputedStyle(flexContainer).gap;
      const gapMatch = gapStyle.match(/^([\d.]+)(px|rem|em)?/);
      if (gapMatch) {
        const gapValue = parseFloat(gapMatch[1]);
        const gapUnit = gapMatch[2] || 'px';

        if (gapUnit === 'rem') {
          const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
          computedGap = Math.round(gapValue * rootFontSize);
        } else if (gapUnit === 'em') {
          const fontSize = parseFloat(window.getComputedStyle(flexContainer).fontSize);
          computedGap = Math.round(gapValue * fontSize);
        } else {
          computedGap = Math.round(gapValue);
        }
      }
    }

    const scrollAmount = (cardWidth + computedGap) * (direction === 'right' ? 1 : -1);
    const currentScrollLeft = container.scrollLeft;
    const newPosition = currentScrollLeft + scrollAmount;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const finalPosition = Math.max(0, Math.min(newPosition, maxScroll));

    isScrollingRef.current = true;
    setIsPaused(true);

    container.scrollTo({
      left: finalPosition,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrollingRef.current = false;
      setCarouselPosition(container.scrollLeft);
    }, 600);

    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const scrollThreshold = 10;
  const currentScrollPosition = scrollContainerRef.current?.scrollLeft ?? carouselPosition;
  const maxScrollPosition = scrollContainerRef.current ? scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth : 0;
  const canScrollLeft = currentScrollPosition > scrollThreshold;
  const canScrollRight = currentScrollPosition < (maxScrollPosition - scrollThreshold);

  return (
    <section className={`${reducedPadding ? 'pt-0' : 'pt-12'} pb-0 bg-transparent -mt-8 ${topSpacing}`}>
      <div className="max-w-7xl mx-auto px-6">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        )}

        <div className="w-full relative overflow-hidden flex items-center justify-center">
          <div className="relative z-10 w-full flex items-center justify-center pt-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg pointer-events-auto ${
                canScrollLeft
                  ? 'bg-slate-800 hover:bg-slate-900 hover:shadow-2xl hover:scale-110 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed'
              }`}
              aria-label="Images précédentes"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            <div
              ref={scrollContainerRef}
              className="scroll-container w-full max-w-6xl overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
              onScroll={() => {
                if (!isScrollingRef.current) {
                  setCarouselPosition(scrollContainerRef.current?.scrollLeft ?? 0);
                }
              }}
            >
              <div
                className="infinite-scroll flex gap-8 w-max"
                onMouseEnter={() => !isPaused && setIsPaused(true)}
                onMouseLeave={() => isPaused && setIsPaused(false)}
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              >
                <div className={`flex gap-8 ${scrollDirection === 'right' ? 'animate-scroll-reverse' : 'animate-scroll'}`}>
                  {galleryImages.map((image, index) => (
                    <div key={`set1-${index}`} data-gallery-card className="flex-shrink-0 w-80 flex flex-col items-center justify-center rounded-lg overflow-hidden bg-white p-0 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="w-full h-64 flex items-center justify-center overflow-hidden bg-gray-100">
                        <OptimizedImage
                          src={image.imageUrl}
                          alt={image.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          width={400}
                          height={300}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      {image.description && (
                        <p className="text-center text-sm font-medium text-gray-700 leading-tight line-clamp-2 p-4 w-full">
                          {image.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className={`flex gap-8 ${scrollDirection === 'right' ? 'animate-scroll-reverse' : 'animate-scroll'}`} aria-hidden="true">
                  {galleryImages.map((image, index) => (
                    <div key={`set2-${index}`} className="flex-shrink-0 w-80 flex flex-col items-center justify-center rounded-lg overflow-hidden bg-white p-0 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="w-full h-64 flex items-center justify-center overflow-hidden bg-gray-100">
                        <OptimizedImage
                          src={image.imageUrl}
                          alt={image.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          width={400}
                          height={300}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      {image.description && (
                        <p className="text-center text-sm font-medium text-gray-700 leading-tight line-clamp-2 p-4 w-full">
                          {image.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg pointer-events-auto ${
                canScrollRight
                  ? 'bg-slate-800 hover:bg-slate-900 hover:shadow-2xl hover:scale-110 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed'
              }`}
              aria-label="Images suivantes"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
