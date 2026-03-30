'use client';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	images: Image[];
}

export function ZoomParallaxStatic({ images }: ZoomParallaxProps) {
	return (
		<div className="relative w-full bg-gradient-to-b from-gray-50 to-white py-12">
			<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
				<div className="hidden lg:block relative min-h-[800px]">
					<div className="h-full overflow-hidden relative">
						{images.map(({ src, alt }, index) => {
							const positions = [
								'top-0 left-1/2 -translate-x-1/2 h-[280px] w-[320px] z-10',
								'top-[120px] left-[80px] h-[240px] w-[280px] z-30 -rotate-3',
								'-top-[40px] left-[420px] h-[360px] w-[200px] z-20 rotate-2',
								'top-[240px] left-1/2 translate-x-[-50px] h-[200px] w-[200px] z-40 -rotate-1',
								'top-[240px] left-[100px] h-[200px] w-[160px] z-20 rotate-1',
								'-top-[80px] left-[-120px] h-[200px] w-[240px] z-10 -rotate-2',
								'top-[300px] left-1/2 translate-x-[120px] h-[120px] w-[120px] z-5 rotate-3',
							];

							return (
								<div
									key={index}
									className={`absolute shadow-lg rounded-lg overflow-hidden border-4 border-white transition-transform duration-300 hover:z-50 hover:scale-110 ${positions[index] || ''}`}
								>
									<img
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
										className="h-full w-full object-cover"
									/>
								</div>
							);
						})}
					</div>
				</div>

				<div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-4">
					{images.map(({ src, alt }, index) => (
						<div key={index} className="rounded-lg overflow-hidden shadow-md border-2 border-white">
							<img
								src={src || '/placeholder.svg'}
								alt={alt || `Parallax image ${index + 1}`}
								className="w-full h-[200px] md:h-[250px] object-cover"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
