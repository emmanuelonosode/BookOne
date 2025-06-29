import React from "react";
import { offer } from "../../Commons/details";
import Image from "next/image";
function Service() {
  return (
    <section className="py-28">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-20 font-sans">
          <h3 className="h3">
            Transform Your Business with Our Comprehensive Web Solutions and
            Automation Services
          </h3>
          <h5 className="h5">
            Our web development services create stunning, user-friendly websites
            tailored to your business needs. With cutting-edge AI automation, we
            streamline processes to enhance efficiency and productivity. Explore
            our range of web-based services designed to elevate your online
            presence.
          </h5>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 justify-between">
          {offer.map(({ tag, icon, desc }, index) => (
            <div
              className="w-full p-8 rounded-md shadow hover:shadow-2xl transition-all duration-300 ease-in-out hover:bg-[#d997f5] hover:scale-[1.02]"
              key={index}
            >
              <Image src={icon} desc={desc} alt={icon} height={32} width={32} />

              <h4 className="h4 my-6">{tag}</h4>
              <p className="pat">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;
