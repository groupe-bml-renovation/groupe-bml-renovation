'use client';
import React from 'react';
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function ZoomParallaxDemo2() {
	const images = [
		{
			src: 'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254036/08c9784d-a6ba-4494-8ba9-b6935de010d6_kaax7w.jpg',
			alt: 'Projet de rénovation BML',
		},
		{
			src: 'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254052/IMG-20250909-WA0040_izcj1t.jpg',
			alt: 'Rénovation intérieure BML',
		},
		{
			src: 'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254020/6926647f-2fa7-4e03-8143-cdc548d4eaf7_neftu9.jpg',
			alt: 'Travaux de rénovation BML',
		},
		{
			src: 'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254730/IMG-20250909-WA0036_tjkv9r.jpg',
			alt: 'Réalisation BML Rénovation',
		},
		{
			src: 'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod.jpg',
			alt: 'Projet terminé BML',
		},
		{
			src: 'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254062/IMG-20250909-WA0037_lm9udg.jpg',
			alt: 'Rénovation professionnelle BML',
		},
	];

	return (
		<>
			<ZoomParallax images={images} />
		</>
	);
}
