import Image from "next/image";
import { getImageUrl } from "@/lib/sanity";

export default function AiAutomationDetails({ details }) {
  if (!details) return null;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Key Outcomes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.keyOutcomes?.map((outcome, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg flex items-center"
            >
              <p className="text-xl font-bold text-cyan-400 mr-4">
                {outcome.detail}
              </p>
              <p className="text-gray-300">{outcome.outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {details.automationWorkflow && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Automation Workflow
          </h3>
          <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-700">
            <Image
              src={getImageUrl(details.automationWorkflow)}
              alt="Automation Workflow Diagram"
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {details.technologies?.map((tech) => (
            <span
              key={tech}
              className="bg-red-500 text-white px-3 py-1 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
