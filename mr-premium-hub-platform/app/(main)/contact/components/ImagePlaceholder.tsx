import Image from "next/image";

interface ImagePlaceholderProps {
  className?: string;
  src?: string;
  alt?: string;
}

export default function ImagePlaceholder({
  className = "",
  src,
  alt = "تصویر تماس",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-gray-800 rounded-2xl overflow-hidden relative ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-800" />
      )}
    </div>
  );
}

