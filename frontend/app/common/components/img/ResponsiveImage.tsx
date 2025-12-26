import Image from "next/image";
import type { Image as ImageType } from "@/app/_domain/module.interface";

interface ResponsiveImageProps {
  imageData: ImageType;
  width?: number;
  height?: number;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  dataSpeed?: string;
  className?: string;
  containerClassName?: string;
  variant?: "hero" | "card" | "thumbnail" | "gallery" | "icon" | "banner";
}

const VARIANT_CONFIG = {
  hero: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw",
    dimensions: { width: 1920, height: 1080 },
    quality: 90,
    priority: true,
  },
  banner: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw",
    dimensions: { width: 1440, height: 400 },
    quality: 85,
    priority: false,
  },
  card: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
    dimensions: { width: 600, height: 400 },
    quality: 80,
    priority: false,
  },
  gallery: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw",
    dimensions: { width: 800, height: 600 },
    quality: 85,
    priority: false,
  },
  thumbnail: {
    sizes: "(max-width: 768px) 150px, 200px",
    dimensions: { width: 200, height: 200 },
    quality: 75,
    priority: false,
  },
  icon: {
    sizes: "64px",
    dimensions: { width: 64, height: 64 },
    quality: 90,
    priority: false,
  },
};

const ResponsiveImage = ({
  imageData,
  width,
  height,
  quality,
  sizes,
  priority,
  dataSpeed,
  className,
  variant = "card",
}: ResponsiveImageProps) => {
  const config = VARIANT_CONFIG[variant];
  const imageSrc = imageData.media.url;
  const altText = imageData.alt.altText;
  const finalWidth = width || config.dimensions.width;
  const finalHeight = height || config.dimensions.height;
  const finalSizes = sizes || config.sizes;
  const finalPriority = priority !== undefined ? priority : config.priority;
  const finalQuality = quality || config.quality;

  return (
    <Image
      src={imageSrc}
      alt={altText}
      width={finalWidth}
      height={finalHeight}
      sizes={finalSizes}
      priority={finalPriority}
      quality={finalQuality}
      className={className}
      data-speed={dataSpeed}
    />
  );
};

export default ResponsiveImage;
