import Link from "next/link";
import {
  CheckCircle2,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
const ForWhoSection = () => {
  return (
    <section className="py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for Growing Businesses
          </h2>
          {/* Alternative headline for A/B testing */}
          {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Growth Partner Ready
          </h2> */}

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine professional web design, strategic SEO, and intelligent
            AI automation to help ambitious businesses scale faster and work
            smarter.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Small Businesses */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4a2 2 0 012-2h4a2 2 0 012 2v4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Small Businesses
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Increase local visibility by 3x with targeted SEO strategies
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Save 15+ hours weekly with AI-powered customer support
                  automation
                </span>
              </li>
            </ul>
          </div>

          {/* Startups & Founders */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Startups & Founders
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Launch market-ready websites 60% faster than traditional
                  development
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Scale operations without hiring with intelligent automation
                  workflows
                </span>
              </li>
            </ul>
          </div>

          {/* Creators & Solopreneurs */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Creators & Solopreneurs
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Convert 40% more visitors with high-converting, professional
                  websites
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Focus on content creation while AI handles lead nurturing
                  automatically
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Proof */}
        <section className="w-full py-12 px-4 flex justify-center items-center bg-transparent">
          {/* Main Container with ultra-soft shadow for a floating effect */}
          <div className="max-w-5xl w-full bg-zinc-50 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 overflow-hidden relative transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)]">
            {/* Subtle background texture - fluid organic shapes using very light gray tones */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-zinc-100/50 rounded-full blur-3xl opacity-40 pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] bg-zinc-100/70 rounded-full blur-3xl opacity-40 pointer-events-none mix-blend-multiply" />

            <div className="relative z-10 p-8 md:p-14 lg:p-20 text-center">
              {/* Header Section */}
              <div className="max-w-3xl mx-auto mb-16">
                {/* Monochrome Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-zinc-700 text-sm font-medium mb-8 border border-zinc-100">
                  <CheckCircle2
                    className="w-4 h-4 text-zinc-900"
                    strokeWidth={1.5}
                  />
                  <span>Proven Results</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight leading-tight">
                  Trusted by over 100 growing businesses.
                </h2>
                <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
                  Scale smarter with data-driven digital solutions designed for
                  growth.
                </p>
              </div>

              {/* Metrics Grid (Clean Monochrome Bento) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Metric 1 */}
                <div className="group bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-zinc-50 hover:border-zinc-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-zinc-50 text-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-500">
                    <TrendingUp className="w-8 h-8" strokeWidth={1.2} />
                  </div>
                  <div className="text-5xl font-bold text-zinc-900 mb-2 tracking-tighter">
                    47%
                  </div>
                  <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                    Traffic Increase
                  </div>
                </div>

                {/* Metric 2 */}
                <div
                  className="group bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-zinc-50 hover:border-zinc-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: "100ms" }}
                >
                  <div className="w-16 h-16 bg-zinc-50 text-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-500">
                    <Clock className="w-8 h-8" strokeWidth={1.2} />
                  </div>
                  <div className="text-5xl font-bold text-zinc-900 mb-2 tracking-tighter">
                    20+
                  </div>
                  <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                    Hours Saved Weekly
                  </div>
                </div>

                {/* Metric 3 */}
                <div
                  className="group bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-zinc-50 hover:border-zinc-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="w-16 h-16 bg-zinc-50 text-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-500">
                    {/* Using fill-current to make the star solid black */}
                    <Star className="w-8 h-8 fill-current" strokeWidth={1.2} />
                  </div>
                  <div className="text-5xl font-bold text-zinc-900 mb-2 tracking-tighter">
                    4.9/5
                  </div>
                  <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                    Client Rating
                  </div>
                </div>
              </div>

              {/* Action Buttons (Monochrome) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://calendar.notion.so/meet/officialbookone/call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-10 py-4 bg-zinc-900 hover:bg-black text-white font-medium rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Start Your Growth Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                <a
                  href="/get-started"
                  className="group inline-flex items-center justify-center px-10 py-4 bg-white text-zinc-700 hover:text-zinc-900 font-medium rounded-2xl transition-all duration-300 border-2 border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  Get Free Website Audit
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ForWhoSection;
