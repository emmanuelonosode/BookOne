import { sanity } from "@/lib/sanity";
import { homepageCaseStudiesQuery } from "@/lib/queries";
import ProjectCard from "../ProjectCard";
import Link from "next/link";
import { ArrowRight, Star, Users, Award } from "lucide-react";


export default async function PortfolioSection() {
  const allCaseStudies = await sanity.fetch(
    homepageCaseStudiesQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <section
      id="portfolio-section"
      className="min-h-screen bg-[#0B0B0E] py-16 px-4 sm:px-6 lg:px-8 text-white"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1A1A24]/60 border border-white/10 backdrop-blur-md text-[#A78BFA] px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Star className="w-4 h-4 mr-1 text-[#A78BFA]" />
            Recent Shipments
          </div>

          <div className="">
            <h2
              id="portfolio-heading"
              className="text-4xl text-center sm:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight"
            >
              Featured Work
            </h2>

            <p className="text-lg text-center text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              We don't just build websites; we build digital assets that generate revenue. Explore our recent projects across various industries and see the tangible results of our partnerships.
            </p>
          </div>
        </div>

        {/* Featured Case Study Highlight */}
        {allCaseStudies.length > 0 && (
          <div className=" pb-8 sm:p-12">
            <ProjectCard project={allCaseStudies[0]} featured={true} />
          </div>
        )}

        {/* Section Header for Other Case Studies */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            More Amazing Case Studies
          </h2>
          <div className="w-24 h-1 bg-[#8B5CF6]/50 mx-auto rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
        </div>

        {/* Case Studies Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          role="group"
          aria-label="Portfolio Case Studies"
        >
          {allCaseStudies.slice(1).map((caseStudy, index) => (
            <div key={caseStudy._id} className="mb-8">
              <ProjectCard project={caseStudy} index={index} />
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-[#11111A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(107,70,193,0.15)] hover:border-purple-500/20 transition-all duration-500">
          {/* Background decoration */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-40 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto font-light">
              Let's discuss your project and explore how we can help transform
              your digital presence and achieve exceptional results together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/get-started"
                aria-label="Start your project - View pricing and begin your project"
                className="group inline-flex items-center justify-center gap-2 bg-[#6B46C1] hover:bg-[#8B5CF6] text-white py-4 px-8 rounded-full font-bold shadow-[0_0_20px_rgba(107,70,193,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/portfolio"
                aria-label="View complete portfolio - See all our projects"
                className="group inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white py-4 px-8 rounded-full font-bold hover:bg-white/5 hover:border-white/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <span>View Complete Portfolio</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
