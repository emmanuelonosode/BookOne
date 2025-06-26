"use client";

import React from "react";
import { process } from "../Commons/details";
import Image from "next/image";
import Btn from "./Btn";
import Tagline from "./tagline";

function OurProcess() {
  return (
    <section className="py-16 md:py-28 bg-light text-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-20">
          <Tagline tag="Engage" />
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mb-4 leading-tight">
            Our Simple Process for Client Success
          </h2>
          <p className="max-w-2xl text-neutral text-base md:text-lg">
            We prioritize understanding your unique needs. Our streamlined
            approach ensures effective solutions tailored for your business.
          </p>
        </div>

        {/* Process Cards */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left Steps */}
          <div className="flex flex-col gap-12 max-w-xs w-full">
            {process.slice(0, 2).map(({ icon, tag, desc }) => (
              <div key={tag} className="flex flex-col items-center text-center">
                <Image src={icon} alt={tag} width={48} height={48} />
                <h4 className="mt-4 text-xl font-semibold text-neutral">
                  {tag}
                </h4>
                <p className="mt-2 text-neutral">{desc}</p>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="w-full max-w-sm lg:max-w-md">
            <Image
              src="/hero.avif"
              alt="Our Process"
              width={540}
              height={540}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Right Steps */}
          <div className="flex flex-col gap-12 max-w-xs w-full">
            {process.slice(2, 4).map(({ icon, tag, desc }) => (
              <div key={tag} className="flex flex-col items-center text-center">
                <Image src={icon} alt={tag} width={48} height={48} />
                <h4 className="mt-4 text-xl font-semibold text-neutral">
                  {tag}
                </h4>
                <p className="mt-2 text-neutral">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16">
          <Btn label="Learn More" size="md" />
          <Btn label="Sign Up →" size="md" variant="ghost" />
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
