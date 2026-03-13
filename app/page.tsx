import PortfolioSection from "./component/sections/Portfolio.jsx";

import Service from "./component/sections/Service.jsx";

import Testimonia from "./component/sections/Testimonia.jsx";

import FeaturedBlog from "./component/sections/FeaturedBlogs.jsx";

import FAQ from "./component/sections/FAQ.jsx";

import Contact from "./component/sections/Contact.jsx";

import ForWhoSection from "./component/sections/ForWho.jsx";

import HeroSection from "./component/sections/HeroSection.jsx";

// Generate comprehensive metadata for the homepage
export const metadata = {
  title: "BookOne | Premium Web Design & AI Automation Agency",
  description:
    "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems to scale operations and dominate search.",
  keywords: [
    "web designer",
    "AI automation expert",
    "SEO packed websites",
    "AI business integration",
    "premium web design",
    "business automation agency",
    "AI workflow integration",
    "technical SEO expert",
  ],
  authors: [{ name: "BookOne", url: "https://bookone.dev" }],
  creator: "BookOne",
  publisher: "BookOne",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BookOne | Premium Web Design & AI Automation Agency",
    description:
      "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev",
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BookOne - Web Design & AI Automation Experts",
      },
    ],
    locale: "en_US",
    type: "website",
    publisher: "BookOne",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookOne | Premium Web Design & AI Automation Agency",
    description:
      "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems.",
    images: ["/opengraph-image.png"],
    site: "@bookone.dev",
  },
};

function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BookOne",
    "image": `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/icon.svg`,
    "@id": `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}`,
    "url": `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}`,
    "telephone": "+2348077080903",
    "priceRange": "$$",
    "knowsAbout": [
      "Web Design",
      "Search Engine Optimization (SEO)",
      "Artificial Intelligence",
      "Business Process Automation",
      "Custom Software Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.5244,
      "longitude": 3.3792
    },
    "sameAs": [
      "https://twitter.com/bookone.dev"
    ],
    "description": "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems into their operations."
  };

  return (
    <main className="">
      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <Service/>
      <ForWhoSection />
      <PortfolioSection/>
      <Testimonia />
      <FeaturedBlog />
      <FAQ />
      <Contact />
    </main>
  );
}

export default HomePage;
