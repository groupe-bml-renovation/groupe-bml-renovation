import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison";

interface BeforeAfterItem {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 1,
    title: "Rénovation Complète Intérieure",
    description: "Transformation totale d'un espace de vie avec aménagement moderne et finitions haut de gamme",
    beforeImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_53_53_zd2zb7%20(1).png",
    afterImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_54_07_er2wbg%20(1).jpg",
    beforeAlt: "Avant rénovation - espace intérieur à rénover",
    afterAlt: "Après rénovation - intérieur moderne et rénové"
  },
  {
    id: 2,
    title: "Rénovation Salle de Bain",
    description: "Transformation d'une salle de bain en espace spa moderne",
    beforeImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi%20(1).jpg",
    afterImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/2431360b-44d0-49e5-8f85-74a6c9401cf6_frqn6u%20(1).jpg",
    beforeAlt: "Avant rénovation - ancienne salle de bain",
    afterAlt: "Après rénovation - salle de bain moderne"
  },
  {
    id: 4,
    title: "Rénovation de sol avec isolation thermique",
    description: "Installation de nouveaux revêtements de sol avec isolation thermique performante",
    beforeImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-69.png",
    afterImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/263b1bc0-48b1-4d4d-84eb-fdb258af1d2c_kq1aov%20(2).jpg",
    beforeAlt: "Avant rénovation - ancien revêtement de sol",
    afterAlt: "Après rénovation - nouveau sol avec isolation thermique"
  },
  {
    id: 5,
    title: "Rénovation Piscine Extérieure",
    description: "Aménagement piscine avec terrasse et éclairage moderne",
    beforeImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/1090caa8-6c2e-4e6a-a6ad-f0353b69b48a_zdeunt%20(2).jpg",
    afterImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/bc078aff-282d-4960-90b1-d42ad4e4fb81_oc1z2v%20(1).jpg",
    beforeAlt: "Avant rénovation - ancienne piscine extérieure",
    afterAlt: "Après rénovation - piscine extérieure moderne avec aménagements"
  },
  {
    id: 6,
    title: "Rénovation Intérieure",
    description: "Transformation complète avec finitions modernes et aménagement optimisé",
    beforeImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-6.jpg",
    afterImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_12_oct._2025_a%CC%80_10_03_43_torc7s.png",
    beforeAlt: "Avant rénovation - espace intérieur à rénover",
    afterAlt: "Après rénovation - intérieur moderne et entièrement rénové"
  }
];

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const currentItem = beforeAfterData[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? beforeAfterData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === beforeAfterData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStart === null) return;
    const diff = clientX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (dragStart === null) return;

    const threshold = 80;
    if (dragOffset > threshold) {
      goToPrevious();
    } else if (dragOffset < -threshold) {
      goToNext();
    }

    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.image-comparison-slider') || target.closest('[class*="cursor-ew-resize"]')) {
      return;
    }
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.image-comparison-slider') || target.closest('[class*="cursor-ew-resize"]')) {
      return;
    }
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div className="space-y-8">
      <div
        className="relative"
        style={{
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ImageComparison
          key={currentItem.id}
          className="w-full h-[500px] lg:h-[600px] xl:h-[700px] rounded-2xl shadow-2xl"
        >
          <ImageComparisonImage
            src={currentItem.beforeImage}
            alt={currentItem.beforeAlt}
            position="left"
          />
          <ImageComparisonImage
            src={currentItem.afterImage}
            alt={currentItem.afterAlt}
            position="right"
          />
          <ImageComparisonSlider className="w-1 bg-[#38bdf8]/80 image-comparison-slider">
            <div className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8] border-2 border-white shadow-lg">
              <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
            </div>
          </ImageComparisonSlider>
        </ImageComparison>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPrevious();
          }}
          className="flex items-center justify-center w-12 h-12 bg-white border-2 border-slate-300 rounded-full hover:bg-slate-100 hover:border-slate-400 transition-colors duration-300 shadow-lg"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>

        {/* Progress Indicators */}
        <div className="flex space-x-2">
          {beforeAfterData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? 'bg-[#38bdf8]'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNext();
          }}
          className="flex items-center justify-center w-12 h-12 bg-white border-2 border-slate-300 rounded-full hover:bg-slate-100 hover:border-slate-400 transition-colors duration-300 shadow-lg"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      {/* Counter */}
      <div className="text-center mt-4">
        <span className="text-slate-600 text-sm">
          {currentIndex + 1} / {beforeAfterData.length}
        </span>
      </div>
    </div>
  );
}