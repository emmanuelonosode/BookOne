import React from "react";
import { process } from "../Commons/details";
import { div } from "framer-motion/client";
import Image from "next/image";
import Btn from "./Btn";
import Tagline from "./tagline";
function OurProcess() {
  return (
    <section className="py-16 md:py-28 ">
      <div className="container">
        <div className="w-full text-center flex flex-col items-center mb-20">
          {/* <h6 className="bg-purple-200 py-1 px-3 rounded-md">Engage</h6> */}
          <Tagline tag="Engage"/>
          <h2 className="max-w-[768px] mb-6">
            Our Simple Process for Client Success
          </h2>
          <p className="max-w-[768px]">
            We prioritize understanding your unique needs. Our streamlined
            approach ensures effective solutions tailored for your business.
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="max-w-[322px] flex flex-col gap-16">
            {process.slice(0, 2).map(({ icon, tag, desc }) => (
              <div className="flex flex-col text-center items-center" key={tag}>
                <Image src={icon} alt={tag} width={40} height={40} />
                <h4 className="mt-6 mb-4">{tag}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <Image
              src="/hero.avif"
              alt="process image"
              width={540}
              height={540}
            />
          </div>
          <div className="max-w-[322px] flex flex-col gap-16">
            {process.slice(2, 4).map(({ icon, tag, desc }) => (
              <div className="flex flex-col text-center items-center" key={tag}>
                <Image src={icon} alt={tag} width={40} height={40} />
                <h4 className="mt-6 mb-4">{tag}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex place-content-center gap-6 mt-20">
          <Btn label="Learn More" size="md" />
          <Btn label="Sign Up &rarr;" size="md" variant="ghost"/>
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
