import { main } from "framer-motion/client";
import React from "react";
import Btn from "./Btn";
import Service from "../component/Service";
import Testimonia from "../component/Testimonia";
import AboutUs from "../component/AboutUs";
import { AboutSection } from "../component/AboutUs";
import CTA from "../component/CTA";
import OurProcess from "../component/OurProcess";
import FeaturedBlog from "../component/featuredBlogs.jsx";
import FAQ from "../component/FAQ";
import Contact from "../component/contact.jsx";
import Image from "next/image";

function HomePage() {
  return (
    <main>
      <section id="home" className="bg-white py-29 ">
        <div className="container px-6 text-center">
          <h1 className=" md:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock <span className="text-primary">Digital Profit</span> with
            BookOne
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We transform your online presence into a highly profitable asset.
            From stunning websites to intelligent AI automation, we deliver the
            complete web advantage your business needs to thrive.
          </p>
          <div className="mt-8 flex justify-center items-center gap-4">
            <a
              href="#contact"
              className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Your Project
            </a>
            <a href="#services" className="text-primary font-bold py-3 px-8">
              Explore Services &rarr;
            </a>
          </div>
        </div>
      </section>
      <section>
        <Service />
      </section>
      <Testimonia />
      <OurProcess />
      <AboutUs />
      <AboutSection />
      <FeaturedBlog />
      <FAQ />
      {/* <Stat/> */}
      <CTA />
      <Contact />
    </main>
  );
}

export default HomePage;
