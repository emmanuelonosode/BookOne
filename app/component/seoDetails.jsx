import Image from "next/image";
import { getImageUrl } from "@/lib/sanity";

export default function SeoDetails({ details }) {
  if (!details) return null;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-[#1C1917] mb-4">
          Quantifiable Results
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {details.results?.map((result, index) => (
            <div key={index} className="bg-white border border-[#1C1917]/[0.08] p-4 rounded-xl">
              <p className="text-3xl font-bold text-[#15803D]">
                {result.value}
              </p>
              <p className="text-[#6F6A62]">{result.metric}</p>
            </div>
          ))}
        </div>
      </div>

      {details.keywordRankings && (
        <div>
          <h3 className="text-2xl font-bold text-[#1C1917] mb-4">
            Keyword Ranking Improvements
          </h3>
          <div className="relative w-full h-80 rounded-lg overflow-hidden border border-[#1C1917]/[0.08]">
            <Image
              src={getImageUrl(details.keywordRankings)}
              alt="Keyword Ranking Graph"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-bold text-[#1C1917] mb-4">
          Services Provided
        </h3>
        <div className="flex flex-wrap gap-2">
          {details.servicesProvided?.map((service) => (
            <span
              key={service}
              className="bg-[#15803D]/[0.08] text-[#15803D] border border-[#15803D]/20 px-3 py-1 text-sm rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
