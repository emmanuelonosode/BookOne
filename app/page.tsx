import HeroSection from "./component/sections/HeroSection.jsx";
import MarqueeTicker from "./component/sections/MarqueeTicker.jsx";
import Service from "./component/sections/Service.jsx";
import PortfolioSection from "./component/sections/Portfolio.jsx";
import ManifestoSection from "./component/sections/ManifestoSection.jsx";
import Testimonia from "./component/sections/Testimonia.jsx";
import FeaturedBlog from "./component/sections/FeaturedBlogs.jsx";
import FeaturedWebsites from "./component/sections/FeaturedWebsites.jsx";
import FAQ from "./component/sections/FAQ.jsx";
import ForWhoSection from "./component/sections/ForWho.jsx";
import Contact from "./component/sections/Contact.jsx";

export const metadata = {
  title: "Bookone Studio | Web Design & AI Automation Agency",
  description:
    "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems to scale operations and dominate search.",
  keywords: [
    "web design agency Nigeria",
    "web designer Lagos",
    "AI automation agency",
    "SEO agency Nigeria",
    "website development Lagos",
    "done-for-you website",
    "websites for sale",
    "buy a website Nigeria",
    "affordable web design Nigeria",
    "business website Nigeria",
    "Next.js web design agency",
    "digital agency Lagos Nigeria",
  ],
  authors: [{ name: "Bookone Studio", url: "https://bookone.dev" }],
  creator: "Bookone Studio",
  publisher: "Bookone Studio",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bookone Studio | Web Design & AI Automation Agency",
    description:
      "Expert Web Designer & AI Automation Agency. We build SEO-packed websites and help businesses integrate intelligent AI systems.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev",
    siteName: "Bookone Studio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bookone Studio - Web Design & AI Automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookone Studio | Web Design & AI Automation Agency",
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
    name: "Bookone Studio",
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

  const siteNav = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bookone Studio Site Navigation",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Our Services", url: `${BASE_URL}/services`, description: "Web design, SEO optimization, AI automation, and e-commerce development" },
      { "@type": "ListItem", position: 2, name: "Portfolio", url: `${BASE_URL}/portfolio`, description: "View our work — websites and digital projects we've built for clients" },
      { "@type": "ListItem", position: 3, name: "Websites for Sale", url: `${BASE_URL}/websites`, description: "Pre-built and done-for-you websites ready to launch" },
      { "@type": "ListItem", position: 4, name: "Blog", url: `${BASE_URL}/blogs`, description: "Insights on web design, SEO, and AI automation" },
      { "@type": "ListItem", position: 5, name: "About Us", url: `${BASE_URL}/about`, description: "Learn about Bookone Studio's mission and team" },
      { "@type": "ListItem", position: 6, name: "Get Started", url: `${BASE_URL}/get-started`, description: "Start your project — free proposal within 24 hours" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNav) }}
      />
      <HeroSection />
      <MarqueeTicker />
      <Service />
      <PortfolioSection />
      <ManifestoSection />
      <FeaturedWebsites />
      <Testimonia />
      <FeaturedBlog />
      <ForWhoSection />
      <FAQ />
      <Contact />
    </>
  );
}
