"use client"

import React,{useState} from "react";
import Btn from "./Btn.jsx";
import {AnimatedButton} from "./Btn.jsx"
import { contact } from "../Commons/details";

function Contact() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState("")
 async function handleChange(dat) {
    const obj = Object.fromEntries(dat);
    const allData = {
      ...obj,
    };
    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const dataBack = await res.json();
      setData(dataBack);

      // Optional: show a success message
      alert(dataBack.message || "Message sent successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
    



  }
  return (
    <section id="contact" className="py-28 bg-light">
      <div className="container flex max-md:flex-col gap-8">
        <form
          action={handleChange}
          className="flex-col flex max-w-xl w-full bg-white px-12 py-8 shadow-md rounded-xl"
        >
          <div className="mb-8">
            <h2>Contact us</h2>
            <p className="pat">get a free consultation from us</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              name="name"
              id="name"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              name="email"
              id="email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              How can we help?
            </label>
            <select
              id="service"
              name="service"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option>Website Design & Building</option>
              <option>AI Automation</option>
              <option>Search Engine Optimization (SEO)</option>
              <option>Website Optimization (CRO)</option>
              <option>General Inquiry</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="message"
            >
              message
            </label>
            <textarea
              name="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              id="message"
              placeholder="Type your message..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="mb-6 bg-light" htmlFor="terms">
              <input
                type="checkbox"
                className="mr-2"
                name="terms"
                id="terms"
                value="terms"
              />
              Terms
            </label>
          </div>
          {data && <div className="mb-4">
            <p>{}</p>
            </div>}

          <Btn label={`${loading ? "loading..." : "Submit"}`} />
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
            <div key={index} className="shadow-sm bg-white p-2 px-4 rounded-md">
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
