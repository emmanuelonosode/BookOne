import { sanity, getImageUrl } from "../../lib/sanity";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "../component/ProjectCard";
import { allCaseStudiesQuery } from "@/lib/queries";
import Link from "next/link";
import { GlowWrapper } from "./PortfolioClientComponents";

// --- PortfolioPage Component ---
export default async function PortfolioPage() {
  const caseStudies = await sanity.fetch(
    allCaseStudiesQuery,
    {},
    { next: { revalidate: 60 } }
  );

  // Generate structured data for the portfolio page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BookOne Portfolio",
    description:
      "Showcasing our impactful work across various industries. Each project is a testament to our dedication to innovation and client success.",
    url: `${baseUrl}/portfolio`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((caseStudy, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: caseStudy.title,
          description: caseStudy.shortDescription,
          url: `${baseUrl}/portfolio/${caseStudy.slug}`,
          image: caseStudy.heroMedia
            ? getImageUrl(caseStudy.heroMedia)
            : undefined,
          creator: {
            "@type": "Organization",
            name: "BookOne",
          },
        },
      })),
    },
    publisher: {
      "@type": "Organization",
      name: "BookOne",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  return (
    <>
      <Script
        id="portfolio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <section
        id="portfolio-section"
        className="min-h-screen bg-[#0B0B0E] py-24 px-4 sm:px-6 lg:px-8 text-slate-300 font-sans selection:bg-[#6b46c1] selection:text-white relative overflow-hidden"
        aria-labelledby="portfolio-heading"
      >
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#6b46c1]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-y-1/2 -translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20 lg:mb-24">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A24]/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(107,70,193,0.3)] text-sm font-medium text-[#A78BFA] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A78BFA]"></span>
              </span>
              Our Work
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
              Innovative builds powering <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-purple-400">digital evolution.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
              Showcasing our impactful work across various industries. Each
              project is a testament to our dedication to innovation and client
              success.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="mb-24">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              role="group"
              aria-label="Portfolio Case Studies"
            >
              {caseStudies.map((caseStudy) => (
                <GlowWrapper key={caseStudy._id}>
                  <ProjectCard project={caseStudy} />
                </GlowWrapper>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <GlowWrapper
            className="!bg-[#050508] text-white border-white/10 shadow-[0_0_30px_rgba(107,70,193,0.15)] overflow-hidden"
            gridColor="rgba(255, 255, 255, 0.1)"
          >
            <div className="p-12 md:p-16 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B46C1] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3B82F6] rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  Ready to Start Your Project?
                </h3>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
                  Let&apos;s discuss your vision and create something amazing together.
                  Get in touch for a free consultation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/get-started"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-[#6b46c1] text-white font-bold rounded-full hover:bg-[#8B5CF6] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all hover:-translate-y-1"
                  >
                    <span>Start Your Project</span>
                    <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all"
                  >
                    <span>Learn More About Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </GlowWrapper>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  return {
    title: "Portfolio | BookOne - Web Design, SEO & AI Automation Projects",
    description:
      "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation. See how we help businesses grow with innovative digital solutions.",
    keywords: [
      "portfolio",
      "web design projects",
      "SEO projects",
      "AI automation projects",
      "website development",
      "digital marketing",
      "business automation",
      "BookOne portfolio",
      "Nigeria digital agency",
      "client projects",
      "case studies",
    ],
    authors: [{ name: "BookOne" }],
    creator: "BookOne",
    publisher: "BookOne",
    classification: "Portfolio",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/portfolio",
    },
    openGraph: {
      title: "Portfolio | BookOne - Web Design, SEO & AI Automation Projects",
      description:
        "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation. See how we help businesses grow with innovative digital solutions.",
      type: "website",
      url: `${baseUrl}/portfolio`,
      siteName: "BookOne",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "BookOne Portfolio - Web Design, SEO & AI Automation Projects",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | BookOne - Web Design, SEO & AI Automation Projects",
      description:
        "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation.",
      images: ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
    },
    other: {
      "portfolio:category": "Web Design, SEO, AI Automation",
      "portfolio:client_count": "30+",
      "portfolio:project_types": "Websites, SEO Campaigns, AI Workflows",
    },
  };
}
