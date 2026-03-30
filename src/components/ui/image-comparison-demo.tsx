import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison";

export default function RenovationBeforeAfter() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <p className="text-slate-700 text-sm mt-2">
          Glissez pour voir la transformation
        </p>
      </div>
      <ImageComparison className="w-full h-[700px] xl:h-[800px] rounded-2xl shadow-2xl" enableHover>
        <ImageComparisonImage
          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_53_53_zd2zb7%20(1).png"
          alt="Avant rénovation - espace à rénover"
          position="left"
        />
        <ImageComparisonImage
          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_54_07_er2wbg%20(1).jpg"
          alt="Après rénovation - espace moderne et rénové"
          position="right"
        />
        <ImageComparisonSlider className="w-1 bg-[#38bdf8]/80 backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8] border-2 border-white shadow-lg">
            <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </div>
        </ImageComparisonSlider>
      </ImageComparison>
      
      {/* Second Before/After Comparison */}
      <div className="text-center mb-4 mt-12">
        <p className="text-slate-700 text-sm mt-2">
          Une autre transformation remarquable
        </p>
      </div>
      <ImageComparison className="w-full h-[700px] xl:h-[800px] rounded-2xl shadow-2xl" enableHover>
        <ImageComparisonImage
          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi%20(1).jpg"
          alt="Avant rénovation - ancien état"
          position="left"
        />
        <ImageComparisonImage
          src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/2431360b-44d0-49e5-8f85-74a6c9401cf6_frqn6u%20(1).jpg"
          alt="Après rénovation - transformation complète"
          position="right"
        />
        <ImageComparisonSlider className="w-1 bg-[#38bdf8]/80 backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8] border-2 border-white shadow-lg">
            <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </div>
        </ImageComparisonSlider>
      </ImageComparison>
    </div>
  );
}