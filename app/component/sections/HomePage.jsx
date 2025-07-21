import React from "react";
import PortfolioPreview from "./portfolio.jsx";
import Service from "./Service.jsx";
import Testimonia from "./Testimonia.jsx";
import AboutUs from "./AboutUs";
import OurProcess from "./OurProcess.jsx";
import HeroSection from "./HeroSection.jsx";
import FeaturedBlog from "./featuredBlogs.jsx";
import FAQ from "./FAQ.jsx";
import Contact from "./contact.jsx";

export const metadata = {
  title: "BookOne | Web Design, Development & Digital Agency",
  description:
    "BookOne is a digital agency specializing in web design, development, and digital transformation. Discover our services, portfolio, and insights.",
};

function HomePage() {
  return (
    <main className="">
      <HeroSection />
      <Service />
      <PortfolioPreview />
      <Testimonia />
      <OurProcess />
      <AboutUs />
      {/* <AboutSection /> */}
      <FeaturedBlog />
      <FAQ />
      {/* <Stat/> */}
      <Contact />
    </main>
  );
}

export default HomePage;
