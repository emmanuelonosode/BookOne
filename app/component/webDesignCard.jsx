import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function WebDesignDetails({ details }) {
  if (!details) return null;

  return (
    <div className="space-y-8">
      {details.heroImage && (
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={urlFor(details.heroImage).url()}
            alt="Hero Image"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 700px"
            priority
          />
        </div>
      )}

      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {Array.isArray(details.keyFeatures) &&
            details.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Technology Stack</h3>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(details.techStack) &&
            details.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>

      {details.liveUrl && (
        <a
          href={details.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
        >
          View Live Site
        </a>
      )}
    </div>
  );
}
