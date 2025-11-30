import PortfolioSection from "./component/sections/portfolio.jsx";

import Service from "./component/sections/Service.jsx";

import Testimonia from "./component/sections/Testimonia.jsx";

import FeaturedBlog from "./component/sections/featuredBlogs.jsx";

import FAQ from "./component/sections/FAQ.jsx";

import Contact from "./component/sections/contact.jsx";

import ForWhoSection from "./component/sections/forWho.jsx";

import HeroSection from "./component/sections/HeroSection.jsx";

// Generate comprehensive metadata for the homepage
export const metadata = {
  title: "BookOne | Professional Web Design, SEO & AI Automation Services",
  description:
    "Transform your business with BookOne's expert web design, SEO optimization, and AI automation services. Nigeria's leading digital agency helping businesses grow online.",
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
    canonical: "/",
  },
  openGraph: {
    title: "BookOne - Website Design, SEO & AI Automation for Modern Brands",
    description:
      "Boost your online presence with BookOne, Nigeria's digital agency for website design, SEO optimization, AI automation, and content strategy. Grow smarter online.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev",
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
    site: "@bookone.dev",
  },
};

function HomePage() {
  return (
    <main className="">
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
