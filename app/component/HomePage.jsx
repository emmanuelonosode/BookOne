// import { motion } from "framer-motion";
import React from "react";
import Btn from "./Btn";
import { AnimatedButton } from "./Btn";
import Service from "./Service";
import Testimonia from "./Testimonia";
import AboutUs from "./AboutUs";
import { AboutSection } from "./AboutUs";
import CTA from "./CTA";
import OurProcess from "./OurProcess";
import FeaturedBlog from "./featuredBlogs.jsx";
import FAQ from "./FAQ";
import Contact from "./contact.jsx";
import Image from "next/image";

function HomePage() {
  return (
    <main>
      <section id="home" className=" py-29 ">
        <div className="container px-6 text-center">
          <h1 className=" text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock <span className="text-primary">Digital Profit</span> with
            BookOne
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We transform your online presence into a highly profitable asset.
            From stunning websites to intelligent AI automation, we deliver the
            complete web advantage your business needs to thrive.
          </p>
          <div className="mt-8 flex justify-center items-center gap-4">
            <AnimatedButton label=" Start Your Project" />
            <a href="#services" className="text-primary font-bold py-3 px-8">
              Explore Services &rarr;
            </a>
          </div>
          <div className="h-25 overflow-hidden">
            <Image src="/noise.png" alt="noise" width={1440} height={100} />
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
