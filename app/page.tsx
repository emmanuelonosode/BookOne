import HeroSection from "./component/sections/HeroSection.jsx";
import MarqueeTicker from "./component/sections/MarqueeTicker.jsx";
import Service from "./component/sections/Service.jsx";
import PortfolioSection from "./component/sections/Portfolio.jsx";
import ManifestoSection from "./component/sections/ManifestoSection.jsx";
import Testimonia from "./component/sections/Testimonia.jsx";
import FeaturedBlog from "./component/sections/FeaturedBlogs.jsx";
import FAQ from "./component/sections/FAQ.jsx";
import ForWhoSection from "./component/sections/ForWho.jsx";
import Contact from "./component/sections/Contact.jsx";

export const metadata = {
  title: "BookOne | Web Design & AI Automation Agency",
  description:
    "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems to scale operations and dominate search.",
  keywords: [
    "web designer",
    "AI automation expert",
    "SEO packed websites",
    "premium web design",
    "business automation agency",
  ],
  authors: [{ name: "BookOne", url: "https://bookone.dev" }],
  creator: "BookOne",
  publisher: "BookOne",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BookOne | Web Design & AI Automation Agency",
    description:
      "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev",
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BookOne - Web Design & AI Automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookOne | Web Design & AI Automation Agency",
    description:
      "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems.",
    images: ["/opengraph-image.png"],
  },
};

export default function HomePage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BookOne",
    image: `${BASE_URL}/opengraph-image.png`,
    "@id": BASE_URL,
    url: BASE_URL,
    telephone: "+2348077080903",
    email: "hello@bookone.dev",
    priceRange: "$$",
    description:
      "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems to scale operations.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Allen Avenue",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.6018,
      longitude: 3.3515,
    },
    sameAs: [
      "https://twitter.com/bookonedotdev",
      "https://linkedin.com/company/bookone",
      "https://instagram.com/bookonedotdev",
    ],
    knowsAbout: [
      "Web Design", "Search Engine Optimization", "AI Automation",
      "E-commerce Development", "Business Process Automation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development", url: `${BASE_URL}/services` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Optimization", url: `${BASE_URL}/services` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation", url: `${BASE_URL}/services` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Development", url: `${BASE_URL}/services` } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <MarqueeTicker />
      <Service />
      <PortfolioSection />
      <ManifestoSection />
      <Testimonia />
      <FeaturedBlog />
      <ForWhoSection />
      <FAQ />
      <Contact />
    </>
  );
}
