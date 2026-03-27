import Image from "next/image";
import { getImageUrl } from "@/lib/sanity";

export function BlogImage({ image, alt, priority = false }) {
  if (!image?.asset) return null;

  const src = getImageUrl(image, "/placeholder-image.jpg");

  return (
    <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-100">
      <Image
        src={src}
        alt={alt || "Blog post image"}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        placeholder="blur"
        blurDataURL="/placeholder-image.jpg"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-image.jpg";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
