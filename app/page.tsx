import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { generateMetaTags } from "./seo-config";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

// Dynamically import non-critical components
const PortfolioPreview = dynamic(
  () => import("./component/sections/portfolio.jsx"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
    ssr: true,
  }
);

const Service = dynamic(() => import("./component/sections/Service.jsx"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
  ssr: true,
});

const Testimonia = dynamic(
  () => import("./component/sections/Testimonia.jsx"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
    ssr: true,
  }
);



const FeaturedBlog = dynamic(
  () => import("./component/sections/featuredBlogs.jsx"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
    ssr: true,
  }
);

const FAQ = dynamic(() => import("./component/sections/FAQ.jsx"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
  ssr: true,
});

const Contact = dynamic(() => import("./component/sections/contact.jsx"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
  ssr: true,
});

const ForWhoSection = dynamic(() => import("./component/sections/forWho.jsx"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
  ssr: true,
});

// Import HeroSection normally as it's above the fold
import HeroSection from "./component/sections/HeroSection.jsx";

// Generate comprehensive metadata for the homepage
export const metadata = generateMetaTags({
  title: "BookOne | Professional Web Design, SEO & AI Automation Services",
  description:
    "Transform your business with BookOne's expert web design, SEO optimization, and AI automation services. Nigeria's leading digital agency helping businesses grow online.",
  url: "/",
  keywords: [
    "web design Nigeria",
    "SEO services Nigeria",
    "AI automation Nigeria",
    "digital agency Nigeria",
    "website development Nigeria",
    "business automation",
    "digital marketing Nigeria",
    "web development agency",
    "SEO optimization",
    "AI workflow automation",
  ],
  authors: [{ name: "BookOne", url: "https://bookone.dev" }],
  creator: "BookOne",
  publisher: "BookOne",
  alternates: {
    canonical: "https://bookone.dev",
  },
  openGraph: {
    title: "BookOne - Website Design, SEO & AI Automation for Modern Brands",
    description:
      "Boost your online presence with BookOne, Nigeria's digital agency for website design, SEO optimization, AI automation, and content strategy. Grow smarter online.",
    url: "https://bookone.dev",
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BookOne - Website Design, SEO & AI Automation for Modern Brands",
      },
    ],
    locale: "en_US",
    type: "website",
    publisher: "BookOne",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookOne - Website Design, SEO & AI Automation for Modern Brands",
    description:
      "Boost your online presence with BookOne, Nigeria's digital agency for website design, SEO optimization, AI automation, and content strategy. Grow smarter online.",
    images: ["/opengraph-image.png"],
    site: "@EmmanuelOnosod1",
  },
});

function HomePage() {
  return (
    <main className="">
      {/* Above the fold content - load immediately */}
      <HeroSection />

      {/* Below the fold content - lazy load with suspense */}
      <Suspense
        fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}
      >
        <Service />
      </Suspense>
      <Suspense
        fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}
      >
        <ForWhoSection />
      </Suspense>
      <Suspense
        fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}
      >
        <PortfolioPreview />
      </Suspense>

      <Suspense
        fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}
      >
        <Testimonia />
      </Suspense>

    

      <Suspense
        fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}
      >
        <FeaturedBlog />
      </Suspense>

      <Suspense
        fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}
      >
        <FAQ />
      </Suspense>

      <Suspense
        fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}
      >
        <Contact />
      </Suspense>
    </main>
  );
}

export default HomePage;
