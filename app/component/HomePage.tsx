import { main } from "framer-motion/client";
import React from "react";
import Btn from "./Btn";
import Service from "../component/Service"
import Testimonia from "../component/Testimonia"
import AboutUs from "../component/AboutUs";
import CTA from "../component/CTA.jsx"
import OurProcess from "../component/OurProcess"
import Image from "next/image";

function HomePage() {
  return (
    <>
      <section className="py-20 font-sans">
        <main className="container flex items-center gap-5">
          <div className="w-full">
            <h1 className="mb-6">
              Empowering Your Business with Innovative Web Solutions
            </h1>
            <h5>
              Welcome to our platform, where we transform your business ideas
              into reality. Explore our comprehensive web services designed to
              enhance efficiency and drive growth.
            </h5>
            <div className="mt-8 flex gap-4">
              <Btn label="Get Started" size="md" />
              <Btn
                variant="secondary"
                label="Get Free Consultation &rarr;"
                size="md"
              />
            </div>
          </div>
          <div className="w-full">
            <Image src="/hero.avif" alt="hero image" width={620} height={600} />
          </div>
        </main>
      </section>
      <section>
        <Service/>
      </section>
      <Testimonia/>
     <OurProcess/>
     <AboutUs/>
     <CTA/>
    </>
  );
}

export default HomePage;
