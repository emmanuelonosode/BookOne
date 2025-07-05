"use client";

import React, { useState } from "react";
import Btn from "../Btn.jsx";
import { contact } from "../../Commons/details.js";
// Install platform.js: npm install platform
import platform from "platform";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Helper to get system info
  async function getSystemInfo() {
    let country = "";
    try {
      // Fetch country using a public IP geolocation API
      const geoRes = await fetch("https://ipapi.co/json/");
      const geoData = await geoRes.json();
      country = geoData.country_name || "";
    } catch {
      country = "";
    }

    return {
      userAgent: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      os: platform.os?.toString() || "",
      manufacturer: platform.manufacturer || "",
      systemName: platform.name || "",
      country,
    };
  }

  async function handleChange(dat) {
    const obj = Object.fromEntries(dat);
    const allData = { ...obj };

    try {
      setLoading(true);
      setErrorMsg("");
      setData("");

      // Get system info and add to form data
      const systemInfo = await getSystemInfo();
      allData.systemInfo = systemInfo;

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
      setData(dataBack.message || "Message sent successfully!");
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
      setData("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-28 bg-light"
      aria-label="Contact Section"
      role="region"
    >
      {/* Intro Section */}
      <section className="py-20 text-center" aria-label="Contact Introduction">
        <div className="container max-w-2xl mx-auto">
          <h2 className="h2 mb-4" tabIndex={0}>
            Ready to bring your <span className="text-primary">business</span>{" "}
            online?
          </h2>
          <p className="pat mb-8" tabIndex={0}>
            Let's talk about how BookOne can help you launch smarter and faster.
          </p>
        </div>
      </section>

      <div className="container flex max-md:flex-col gap-8">
        {/* Contact Form */}
        <form
          action={handleChange}
          className="flex-col flex max-w-xl w-full bg-white px-12 py-8 shadow-md rounded-xl"
          aria-label="Contact Form"
          role="form"
          autoComplete="on"
        >
          <div className="mb-8">
            <h3 className="h3" tabIndex={0}>
              Contact us
            </h3>
            <p className="pat" tabIndex={0}>
              Get a free consultation from us
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              name="name"
              defaultValue="Emmanuel Onosode"
              id="name"
              required
              aria-required="true"
              aria-label="Your Name"
              aria-describedby="name-desc"
            />
            <span id="name-desc" className="sr-only">
              Enter your full name
            </span>
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              name="email"
              defaultValue="emmanuelonosode4@gmail.com"
              id="email"
              required
              aria-required="true"
              aria-label="Your Email"
              aria-describedby="email-desc"
            />
            <span id="email-desc" className="sr-only">
              Enter your email address
            </span>
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
              aria-label="Service Inquiry"
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
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              name="message"
              defaultValue="More Money In Jesus Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              id="message"
              placeholder="Type your message..."
              required
              aria-required="true"
              aria-label="Your Message"
              aria-describedby="message-desc"
            ></textarea>
            <span id="message-desc" className="sr-only">
              Enter your message
            </span>
          </div>
          <div className="mb-4">
            <label className="mb-6 bg-light" htmlFor="terms">
              <input
                type="checkbox"
                className="mr-2"
                name="terms"
                id="terms"
                value="terms"
                required
                aria-required="true"
                aria-label="Accept Terms"
              />
              I accept the terms and conditions{" "}
              <span aria-hidden="true">*</span>
            </label>
          </div>
          <div className="mb-4" aria-live="polite">
            {data && <p className="text-green-600">{data}</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          </div>
          <Btn
            label={loading ? "Loading..." : "Submit"}
            aria-label="Submit Contact Form"
            disabled={loading}
          />
        </form>

        {/* Map Section */}
        <section
          className="w-full"
          aria-label="Business Location Map"
          role="region"
        >
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
              aria-label="Google Map showing business location"
            ></iframe>
          </div>
        </section>
      </div>

      {/* Contact Info Cards */}
      <section className="py-28" aria-label="Contact Information" role="region">
        <div className="container grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-12">
          {contact.map(({ src, label, description, value }, index) => (
            <div
              key={index}
              className="shadow-sm bg-white p-8 rounded-md"
              role="article"
              aria-label={label}
              tabIndex={0}
            >
              <img
                src={src}
                className="w-6 h-6"
                alt={label ? `${label} icon` : "Contact icon"}
              />
              <h4 className="mt-6 text-lg font-semibold">{label}</h4>
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
