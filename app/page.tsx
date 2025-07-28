import React from "react";
import PortfolioPreview from "./component/sections/portfolio.jsx";
import Service from "./component/sections/Service.jsx";
import Testimonia from "./component/sections/Testimonia.jsx";
import AboutUs from "./component/sections/AboutUs";
import HeroSection from "./component/sections/HeroSection.jsx";
import FeaturedBlog from "./component/sections/featuredBlogs.jsx";
import FAQ from "./component/sections/FAQ.jsx";
import Contact from "./component/sections/contact.jsx";

export const metadata = {
  title: "BookOne | Website Design, SEO & AI Automation for Modern Brands",
  description:
    "Boost your online presence with BookOne, Nigeria's digital agency for website design, SEO optimization, AI automation, and content strategy. Grow smarter online.",
};

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
