import React from "react";
import Btn from "../component/Btn";
import { contact } from "../Commons/details";

function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="container flex max-md:flex-col gap-8">
        <form className="flex-col flex max-w-lg w-full " action="">
          <div className="mb-8">
            <h2>Contact us</h2>
            <p className="pat">get a free consultation from us</p>
          </div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="p-2 pat border max-w-lg rounded-lg mt-2 mb-6 w-full"
            name="name"
            id="name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="p-2 pat border max-w-lg rounded-lg mt-2 mb-6 w-full"
            name="email"
            id="email"
          />
          <label htmlFor="message">message</label>
          <textarea
            name="message"
            className="p-2 pat border max-w-lg rounded-lg mt-2 mb-6 w-full"
            id="message"
            placeholder="Type your message..."
          ></textarea>
          <label className="mb-6" htmlFor="terms">
            <input
              type="checkbox"
              className="mr-2"
              name="terms"
              id="terms"
              value="terms"
            />
            Terms
          </label>
          <Btn label="Submit" />
        </form>
        <section className="w-full">
          <div className="w-full h-full">
            <iframe
              title="Business Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6748.559397877792!2d4.601460247410117!3d7.768472024886876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037882cc5d1c8a9%3A0xa6db63516ea57615!2sUniosun%20Main%20Gate!5e0!3m2!1sen!2sng!4v1747172774614!5m2!1sen!2sng"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="rounded-xl shadow-lg border"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
      <section className="py-28">
        <div className="container grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-12">
          {contact.map(({ src, label, description, value }, index) => (
            <div key={index}>
              <img src={src} className="w-6 h-6" alt="" />
              <h4 className="mt-6">{label}</h4>
              <p className="text-[14px] mb-6 mt-4 text-gray-700 leading-[150%]">
                {description}
              </p>
              <p className="pat">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Contact;
