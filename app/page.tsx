import React from "react";
import PortfolioPreview from "./component/sections/portfolio.jsx";
import Service from "./component/sections/Service.jsx";
import Testimonia from "./component/sections/Testimonia.jsx";
import AboutUs from "./component/sections/AboutUs";
import HeroSection from "./component/sections/HeroSection.jsx";
import FeaturedBlog from "./component/sections/featuredBlogs.jsx";
import FAQ from "./component/sections/FAQ.jsx";
import Contact from "./component/sections/contact.jsx";
import { generateMetaTags } from "./seo-config";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

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
});

function HomePage() {
  return (
    <main className="">
      <HeroSection />
      <Service />
      <PortfolioPreview />

      <Testimonia />
      <AboutUs />
      <FeaturedBlog />
      <FAQ />
      <Contact />
    </main>
  );
}

export default HomePage;
