"use client";
import { FancyCtaButton } from "../Btn";
import Link from "next/link";

function HeroSection() {

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-100 via-gray-50 to-white relative overflow-hidden">
      {/* Main Content */}
      <div
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-light text-gray-800">
                Transform Your Business Online <br />
                <span className="text-gray-600">
                  with Our Digital Solutions.
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Attract quality leads, and achieve sustainable growth through
                bespoke web design, advanced SEO, powerful AI automation, and
                compelling content.
              </p>
            </div>

            <div>
              <Link
                href="/get-started"
                aria-label="Get started - View pricing and begin your project"
              >
                <FancyCtaButton text="Propel Your Business Forward" />
              </Link>
            </div>
          </div>

          {/* Right Content - Simplified */}
          <div className="relative flex flex-col items-center space-y-8">
            {/* Simplified Glowing Orb */}
            <div className="relative">
              <div
               
                className="w-80 h-80 md:w-96 md:h-96 relative"
              >
                {/* Main orb with gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/35 via-primary/35 to-primary/35 opacity-80 blur-sm"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-primary/15 to-primary/15 opacity-90"></div>

                


              </div>
            </div>

            {/* Bottom Text */}
            <div
              className="text-center space-y-4 max-w-md"
            >
              <p className="text-gray-600 leading-relaxed">
                Whether through intuitive interfaces, immersive AI Automation,
                or bold visual storytelling,
                <span className="text-gray-800 font-medium">
                  {" "}
                  we design moments that people don't just see, they feel.
                </span>
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  UI/UX
                </span>
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  AI Automation
                </span>
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  SEO Optimization
                </span>
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  +
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
