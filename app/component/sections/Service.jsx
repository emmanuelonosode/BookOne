"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import Btn from "../Btn";
import Link from "next/link";
import {
  MessageSquare,
  RefreshCw,
  Link as LinkIcon,
  BarChart3,
  Target,
  DollarSign,
  Zap,
  Rocket,
  PenTool,
} from "lucide-react";

const BookOneServices = () => {
  const sectionsRef = useRef([]);

  // Memoize the observer callback to prevent unnecessary re-renders
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, []);

  // Memoize the observer options
  const observerOptions = useMemo(
    () => ({
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px", // Optimize for better performance
    }),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [observerCallback, observerOptions]);

  // Memoize the addToRefs function to prevent unnecessary re-renders
  const addToRefs = useCallback((el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  }, []);

  // Memoize service data to prevent recreation
  const websiteServices = useMemo(
    () => [
      {
        title: "Modern & Responsive",
        description: "Clean, mobile-friendly design tailored to your brand",
        delay: "0.2s",
      },
      {
        title: "SEO Optimized",
        description: "Built with speed and search engine optimization in mind",
        delay: "0.4s",
      },
      {
        title: "Content Management",
        description: "Easy-to-use CMS with content writing included",
        delay: "0.6s",
      },
    ],
    []
  );

  const seoServices = useMemo(
    () => [
      {
        title: "Keyword Research",
        description: "Tailored keyword strategy for your niche and audience",
      },
      {
        title: "Technical SEO",
        description: "Site speed optimization and mobile-friendliness fixes",
      },
      {
        title: "Performance Tracking",
        description: "Google Analytics setup with monthly performance reports",
      },
    ],
    []
  );

  const aiServices = useMemo(
    () => [
      {
        icon: MessageSquare,
        title: "AI Chatbots",
        description: "Custom trained assistants for bookings and support",
        color: "text-blue-600",
      },
      {
        icon: RefreshCw,
        title: "Workflows",
        description: "Automated reminders and form processing",
        color: "text-green-600",
      },
      {
        icon: LinkIcon,
        title: "Integrations",
        description: "Connect with WhatsApp, CRMs, and tools",
        color: "text-purple-600",
      },
      {
        icon: BarChart3,
        title: "Training",
        description: "Full system management training included",
        color: "text-orange-600",
      },
    ],
    []
  );

  const contentServices = useMemo(
    () => [
      {
        title: "Website Content",
        description:
          "Compelling homepages, about pages, and service descriptions that convert visitors into customers.",
        bgColor: "bg-violet-700",
        textColor: "text-violet-100",
        delay: "0s",
      },
      {
        title: "SEO Blog Articles",
        description:
          "Strategic content optimized to rank and attract your target audience organically.",
        bgColor: "bg-purple-600",
        textColor: "text-purple-100",
        delay: "0.4s",
      },
      {
        title: "Brand Voice",
        description:
          "Consistent tone and messaging across all platforms that reflects your unique brand personality.",
        bgColor: "bg-violet-500",
        textColor: "text-violet-100",
        delay: "0.6s",
      },
    ],
    []
  );

  const processSteps = useMemo(
    () => [
      {
        icon: Target,
        title: "Discovery Call",
        description: "We understand your goals, audience, and vision",
      },
      {
        icon: DollarSign,
        title: "Proposal & Pricing",
        description: "Detailed quote with transparent pricing and timeline",
      },
      {
        icon: Zap,
        title: "Execution",
        description: "We bring your vision to life with regular updates",
      },
      {
        icon: Rocket,
        title: "Launch & Support",
        description: "Deployment, training, and ongoing support",
      },
    ],
    []
  );

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
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
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
          animation: fadeUp 0.6s ease-out forwards;
        }

        .animate .scale-in {
          animation: scaleIn 0.5s ease-out 0.2s forwards;
        }

        .animate .slide-left {
          animation: slideInLeft 0.6s ease-out 0.1s forwards;
        }

        .animate .slide-right {
          animation: slideInRight 0.6s ease-out 0.1s forwards;
        }

        .animate .stagger-1 {
          animation: fadeUp 0.6s ease-out 0.1s forwards;
        }

        .animate .stagger-2 {
          animation: fadeUp 0.6s ease-out 0.2s forwards;
        }

        .animate .stagger-3 {
          animation: fadeUp 0.6s ease-out 0.3s forwards;
        }

        .animate .stagger-4 {
          animation: fadeUp 0.6s ease-out 0.4s forwards;
        }

        .floating-shape {
          animation: float 8s ease-in-out infinite;
        }

        .floating-shape:nth-child(2) {
          animation-delay: 2.5s;
        }

        .floating-shape:nth-child(3) {
          animation-delay: 5s;
        }
      `}</style>

      {/* Intro Section */}
      <section
        ref={addToRefs}
        className="section h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-violet-500"
      >
        {/* Floating Shapes - Reduced for performance */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-shape absolute w-64 h-64 bg-white/8 rounded-full top-20 left-20"></div>
          <div className="floating-shape absolute w-32 h-32 bg-white/8 rounded-full top-1/2 right-20"></div>
          <div className="floating-shape absolute w-40 h-40 bg-white/8 rounded-full bottom-20 left-1/3"></div>
        </div>

        <div className="max-w-6xl mx-auto px-8 text-center text-white z-10">
          <h2 className="animate-element fade-up text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
            What We Do at BookOne
          </h2>
          <p className="animate-element fade-up text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Transform your digital presence with our comprehensive solutions
            designed to elevate your business
          </p>
          <div className="animate-element fade-up">
            <div className="inline-flex items-center text-base opacity-80">
              <span className="mr-2">Scroll to explore</span>
              <svg
                className="w-5 h-5 animate-bounce"
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
            <h2 className="animate-element fade-up text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Website Design & Development
            </h2>
            <p className="animate-element fade-up text-lg text-slate-600 mb-8">
              Fully responsive, mobile-friendly websites built with modern
              technology and optimized for performance.
            </p>
          </div>
          <div className="space-y-4">
            {websiteServices.map((service, index) => (
              <div
                key={service.title}
                className={`animate-element stagger-${
                  index + 1
                } bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-violet-700`}
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600">{service.description}</p>
              </div>
            ))}
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
            {seoServices.map((service, index) => (
              <div
                key={service.title}
                className={`animate-element stagger-${
                  index + 1
                } bg-gradient-to-r from-violet-700 to-purple-600 text-white p-6 rounded-2xl shadow-lg`}
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center lg:text-right order-1 lg:order-2">
            <h2 className="animate-element fade-up text-4xl md:text-5xl font-light text-slate-800 mb-6">
              SEO Optimization
            </h2>
            <p className="animate-element fade-up text-lg text-slate-600 mb-8">
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
            <h2 className="animate-element fade-up text-4xl md:text-5xl font-light text-slate-800 mb-6">
              AI Automation & Agent Setup
            </h2>
            <p className="animate-element fade-up text-lg text-slate-600 mb-8">
              Streamline your business with intelligent AI assistants and
              automated workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className={`animate-element stagger-${
                    index + 1
                  } bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="text-3xl mb-4 flex justify-center">
                    <IconComponent className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {service.description}
                  </p>
                </div>
              );
            })}
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
            {contentServices.map((service, index) => (
              <div
                key={service.title}
                className={`animate-element slide-left ${service.bgColor} text-white p-8 rounded-3xl shadow-xl`}
                style={{ animationDelay: service.delay }}
              >
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className={service.textColor}>{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center lg:text-right order-1 lg:order-2">
            <div className="animate-element scale-in text-6xl text-violet-700 mb-6 flex justify-center">
              <PenTool className="w-20 h-20" />
            </div>
            <h2 className="animate-element fade-up text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Content Writing
            </h2>
            <p className="animate-element fade-up text-lg text-slate-600 mb-8">
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
          <h2 className="animate-element fade-up text-4xl md:text-5xl font-light mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.title}
                  className={`animate-element stagger-${index + 1}`}
                >
                  <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl mb-4 flex justify-center">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-white/80">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="animate-element fade-up mt-12">
            <Link
              href="/get-started"
              className="inline-block"
              aria-label="Get started today - View pricing and begin your project"
            >
              <Btn
                sec
                className="bg-white max-sm:w-full"
                label="Get Started Today"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookOneServices;
