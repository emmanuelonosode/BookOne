import React from "react";
import { faq } from "../Commons/details";
import Btn from "../component/Btn";

function FAQ() {
  return (
    <section className="py-28">
      <div className="container flex max-md:flex-col  bg-primary/80 p-8 rounded-lg gap-10">
        <div className="grid gap-4 max-w-md">
          {" "}
          <div>
            <h2 className="">FAQs</h2>
            <p className="text-[18px] leading-[150%]">
              Here are answers to common questions about my services and
              expertise in web development.
            </p>
          </div>
          <div className="max-w-lg max-md:hidden">
            <h5 className="mb-2">Still have questions? </h5>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, nesciunt.
            </p>
            <Btn label="Contact" sec light />
          </div>
        </div>
        <div className="w-full">
          {faq.map(({ title, desc }, index) => (
            <details
              key={index}
              className="cursor-pointer border-b text-light first:border-t p-4"
            >
              <summary className="mb-4 font-bold text-[18px]  leading-[150%]">
                {title}
              </summary>
              <p className="">{desc}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
