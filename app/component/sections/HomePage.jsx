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

function HomePage() {
  return (
    <main className="">
      <HeroSection/>
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
