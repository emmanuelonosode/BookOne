"use client";

import React, { useState } from "react";
import platform from "platform";
import Btn from "../Btn.jsx";
import { contact } from "../../Commons/details.js";

function Contact() {
  const [data, setData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, setPending] = useState(false);

  // Fetch system/user info
  async function getSystemInfo() {
    let country = "";
    try {
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

  // Handle form submission
  async function handleChange(event) {
    event.preventDefault();
    setPending(true);
    setData("");
    setErrorMsg("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());

    try {
      const systemInfo = await getSystemInfo();
      const payload = { ...obj, systemInfo };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network error");

      const resData = await res.json();
      setData(resData.message || "Message sent successfully!");
      form.reset(); // Optional: clear the form
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-28 bg-light"
      aria-label="Contact Section"
    >
      {/* Intro */}
      <section className="py-20 text-center">
        <div className="container max-w-2xl mx-auto">
          <h2 className="h2 mb-4">
            Ready to bring your <span className="text-primary">business</span>{" "}
            online?
          </h2>
          <p className="pat mb-8">
            Let's talk about how BookOne can help you launch smarter and faster.
          </p>
        </div>
      </section>

      <div className="container flex max-md:flex-col gap-8">
        {/* Form */}
        <form
          onSubmit={handleChange}
          className="flex-col flex max-w-xl w-full bg-white px-12 py-8 shadow-md rounded-xl"
          autoComplete="on"
        >
          <div className="mb-8">
            <h3 className="h3">Contact us</h3>
            <p className="pat">Get a free consultation from us</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue="Emmanuel Onosode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              defaultValue="emmanuelonosode4@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
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
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message *
            </label>
            <textarea
              name="message"
              id="message"
              required
              defaultValue="More Money In Jesus Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="terms">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                required
                className="mr-2"
              />
              I accept the terms and conditions *
            </label>
          </div>

          <div className="mb-4" aria-live="polite">
            {data && <p className="text-green-600">{data}</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          </div>

          <Btn type="submit" label={pending ? "Sending..." : "Submit"} sec />
        </form>

        {/* Map */}
        <section className="w-full" aria-label="Business Location Map">
          <iframe
            title="Business Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6748.559397877792!2d4.601460247410117!3d7.768472024886876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037882cc5d1c8a9%3A0xa6db63516ea57615!2sUniosun%20Main%20Gate!5e0!3m2!1sen!2sng!4v1747172774614!5m2!1sen!2sng"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="rounded-xl shadow-lg border"
          />
        </section>
      </div>

      {/* Contact Info Cards */}
      <section className="py-28">
        <div className="container grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-12">
          {contact.map(({ src, label, description, value }, index) => (
            <div key={index} className="shadow-sm bg-white p-8 rounded-md">
              <img src={src} alt={`${label} icon`} className="w-6 h-6" />
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
