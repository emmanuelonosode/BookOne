import React from "react";
import { offer } from "../Commons/details";
import Image from "next/image";
function Service() {
  return (
    <section className="py-28">
      <div className="container">
        <div className="flex justify-between gap-8 mb-20 font-sans">
          <h3 className="">
            Transform Your Business with Our Comprehensive Web Solutions and
            Automation Services
          </h3>
          <h5 className="">
            Our web development services create stunning, user-friendly websites
            tailored to your business needs. With cutting-edge AI automation, we
            streamline processes to enhance efficiency and productivity. Explore
            our range of web-based services designed to elevate your online
            presence.
          </h5>
        </div>
        <div className="flex gap-4 justify-between">
          {offer.map(({ tag, icon, desc }, index) => (
            <div
              className="w-full p-4 rounded-md shadow transition-all duration-300 ease-in-out hover:bg-[#d997f5] hover:scale-[1.02]"
              key={index}
            >
              <Image src={icon} desc={desc} alt={icon} height={32} width={32} />

              <h4 className="my-6">{tag}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;
