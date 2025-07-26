import React from "react";
import PortfolioPreview from "./component/sections/portfolio.jsx";
import Service from "./component/sections/Service.jsx";
import Testimonia from "./component/sections/Testimonia.jsx";
import AboutUs from "./component/sections/AboutUs";
import OurProcess from "./component/sections/OurProcess.jsx";
import HeroSection from "./component/sections/HeroSection.jsx";
import FeaturedBlog from "./component/sections/featuredBlogs.jsx";
import FAQ from "./component/sections/FAQ.jsx";
import Contact from "./component/sections/contact.jsx";

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
