"use client";

import { useEffect, useRef } from "react";
import Btn from "../Btn";

const BookOneServices = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="scroll-smooth py-22">
      <style jsx>{`
        html {
          scroll-snap-type: y mandatory;
        }

        .section {
          scroll-snap-align: start;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-element {
          opacity: 0;
        }

        .animate .animate-element {
          animation-fill-mode: forwards;
        }

        .animate .fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }

        .animate .scale-in {
          animation: scaleIn 0.6s ease-out 0.3s forwards;
        }

        .animate .slide-left {
          animation: slideInLeft 0.8s ease-out 0.2s forwards;
        }

        .animate .slide-right {
          animation: slideInRight 0.8s ease-out 0.2s forwards;
        }

        .animate .stagger-1 {
          animation: fadeUp 0.8s ease-out 0.2s forwards;
        }

        .animate .stagger-2 {
          animation: fadeUp 0.8s ease-out 0.4s forwards;
        }

        .animate .stagger-3 {
          animation: fadeUp 0.8s ease-out 0.6s forwards;
        }

        .animate .stagger-4 {
          animation: fadeUp 0.8s ease-out 0.8s forwards;
        }

        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape:nth-child(2) {
          animation-delay: 2s;
        }

        .floating-shape:nth-child(3) {
          animation-delay: 4s;
        }
      `}</style>

      {/* Intro Section */}
      <section
        ref={addToRefs}
        className="section h-screen flex items-center justify-center  relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-violet-500"
      >
        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-shape absolute w-72 h-72 bg-white/10 rounded-full top-20 left-20"></div>
          <div className="floating-shape absolute w-36 h-36 bg-white/10 rounded-full top-1/2 right-20"></div>
          <div className="floating-shape absolute w-48 h-48 bg-white/10 rounded-full bottom-20 left-1/3"></div>
        </div>

        <div className="max-w-6xl mx-auto px-8 text-center text-white z-10">
          <h1 className="animate-element fade-up text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
            What We Do at BookOne
          </h1>
          <p className="animate-element fade-up text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Transform your digital presence with our comprehensive solutions
            designed to elevate your business
          </p>
          <div className="animate-element fade-up">
            <div className="inline-flex items-center text-lg opacity-80">
              <span className="mr-2">Scroll to explore</span>
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Website Development Section */}
      <section
        ref={addToRefs}
        className="section h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100"
      >
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="animate-element fade-up text-5xl md:text-6xl font-light text-slate-800 mb-6">
              Website Design & Development
            </h2>
            <p className="animate-element fade-up text-xl text-slate-600 mb-8">
              Fully responsive, mobile-friendly websites built with modern
              technology and optimized for performance.
            </p>
          </div>
          <div className="space-y-4">
            <div className="animate-element stagger-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-violet-700">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Modern & Responsive
              </h3>
              <p className="text-slate-600">
                Clean, mobile-friendly design tailored to your brand
              </p>
            </div>
            <div className="animate-element stagger-2 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-violet-700">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                SEO Optimized
              </h3>
              <p className="text-slate-600">
                Built with speed and search engine optimization in mind
              </p>
            </div>
            <div className="animate-element stagger-3 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-violet-700">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Content Management
              </h3>
              <p className="text-slate-600">
                Easy-to-use CMS with content writing included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Optimization Section */}
      <section
        ref={addToRefs}
        className="section md:h-screen mb-10 py-10 flex items-center justify-center bg-gradient-to-br from-white to-slate-50"
      >
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            <div className="animate-element stagger-1 bg-gradient-to-r from-violet-700 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Keyword Research</h3>
              <p>Tailored keyword strategy for your niche and audience</p>
            </div>
            <div className="animate-element stagger-2 bg-gradient-to-r from-violet-700 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Technical SEO</h3>
              <p>Site speed optimization and mobile-friendliness fixes</p>
            </div>
            <div className="animate-element stagger-3 bg-gradient-to-r from-violet-700 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Performance Tracking
              </h3>
              <p>Google Analytics setup with monthly performance reports</p>
            </div>
          </div>
          <div className="text-center lg:text-right order-1 lg:order-2">
            <h2 className="animate-element fade-up text-5xl md:text-6xl font-light text-slate-800 mb-6">
              SEO Optimization
            </h2>
            <p className="animate-element fade-up text-xl text-slate-600 mb-8">
              Boost your visibility and attract quality leads with advanced SEO
              strategies and technical optimization.
            </p>
          </div>
        </div>
      </section>

      {/* AI Automation Section */}
      <section
        ref={addToRefs}
        className="section md:h-screen mb-10 py-10 flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200"
      >
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="animate-element fade-up text-5xl md:text-6xl font-light text-slate-800 mb-6">
              AI Automation & Agent Setup
            </h2>
            <p className="animate-element fade-up text-xl text-slate-600 mb-8">
              Streamline your business with intelligent AI assistants and
              automated workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="animate-element stagger-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                AI Chatbots
              </h3>
              <p className="text-slate-600 text-sm">
                Custom trained assistants for bookings and support
              </p>
            </div>
            <div className="animate-element stagger-2 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Workflows
              </h3>
              <p className="text-slate-600 text-sm">
                Automated reminders and form processing
              </p>
            </div>
            <div className="animate-element stagger-3 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Integrations
              </h3>
              <p className="text-slate-600 text-sm">
                Connect with WhatsApp, CRMs, and tools
              </p>
            </div>
            <div className="animate-element stagger-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Training
              </h3>
              <p className="text-slate-600 text-sm">
                Full system management training included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Writing Section */}
      <section
        ref={addToRefs}
        className="section md:h-screen mb-10 py-10 flex items-center justify-center bg-gradient-to-br from-white to-violet-50"
      >
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="animate-element slide-left bg-violet-700 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Website Content</h3>
              <p className="text-violet-100">
                Compelling homepages, about pages, and service descriptions that
                convert visitors into customers.
              </p>
            </div>
            <div
              className="animate-element slide-left bg-purple-600 text-white p-8 rounded-3xl shadow-xl"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-2xl font-bold mb-4">SEO Blog Articles</h3>
              <p className="text-purple-100">
                Strategic content optimized to rank and attract your target
                audience organically.
              </p>
            </div>
            <div
              className="animate-element slide-left bg-violet-500 text-white p-8 rounded-3xl shadow-xl"
              style={{ animationDelay: "0.6s" }}
            >
              <h3 className="text-2xl font-bold mb-4">Brand Voice</h3>
              <p className="text-violet-100">
                Consistent tone and messaging across all platforms that reflects
                your unique brand personality.
              </p>
            </div>
          </div>
          <div className="text-center lg:text-right order-1 lg:order-2">
            {/* <div className="animate-element scale-in text-8xl text-violet-700 mb-6">
              ✍️
            </div> */}
            <h2 className="animate-element fade-up text-5xl md:text-6xl font-light text-slate-800 mb-6">
              Content Writing
            </h2>
            <p className="animate-element fade-up text-xl text-slate-600 mb-8">
              Engaging, SEO-optimized content that tells your story and drives
              results across all digital channels.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section
        ref={addToRefs}
        className="section md:h-screen mb-10 py-10 flex items-center justify-center bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="animate-element fade-up text-5xl md:text-6xl font-light mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="animate-element stagger-1">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-4">Discovery Call</h3>
                <p className="text-white/80">
                  We understand your goals, audience, and vision
                </p>
              </div>
            </div>
            <div className="animate-element stagger-2">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-4">Proposal & Pricing</h3>
                <p className="text-white/80">
                  Detailed quote with transparent pricing and timeline
                </p>
              </div>
            </div>
            <div className="animate-element stagger-3">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-4">Execution</h3>
                <p className="text-white/80">
                  We bring your vision to life with regular updates
                </p>
              </div>
            </div>
            <div className="animate-element stagger-4">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-4">Launch & Support</h3>
                <p className="text-white/80">
                  Deployment, training, and ongoing support
                </p>
              </div>
            </div>
          </div>
          <div className="animate-element fade-up mt-12">
            <Btn
              sec
              className="bg-white max-sm:w-full"
              label="Get Started Today"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookOneServices;
