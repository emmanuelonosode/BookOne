import React from "react";
import { faq } from "../Commons/details";
import Btn from "../component/Btn";

function FAQ() {
  return (
    <section className="py-28">
      <div className="container">
        <div className="grid gap-4 max-w-lg">
          {" "}
          <h2 className="">FAQs</h2>
          <p className="text-[18px] leading-[150%]">
            Here are answers to common questions about my services and expertise
            in web development.
          </p>
        </div>
        <div className="grid md:grid-cols-2  gap-5 my-20">
          {faq.map(({ title, desc }, index) => (
            <details
              key={index}
              className="bg-[var(--accent-color)] cursor-pointer rounded-lg p-6"
            >
              <summary className="mb-4 font-bold text-[18px] leading-[150%]">
                {title}
              </summary>
              <p className="max-w-lg">{desc}</p>
            </details>
          ))}
        </div>
        <div className="max-w-lg">
          <h5 className="mb-2">Still have questions? </h5>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, nesciunt.
          </p>
          <Btn label="Contact" sec light />
        </div>
      </div>
    </section>
  );
}

export default FAQ;
