"use client";

import React from "react";
import { quickLinks } from "../../Commons/details";
import Link from "next/link";
import Btn from "../Btn";

function Footer() {
  async function handleSubmit(data) {
    const email = Object.fromEntries(data);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });

    const result = await res.json();
    alert(result.message || result.error);
  }
  return (
    <footer className="py-20 font-sans bg-black text-light">
      <div className="container mx-auto flex flex-wrap justify-between items-start gap-y-12">
        {/* Logo */}
        <Link href="/" className="w-full">
          <p className="text-5xl font-bold text-light">BookOne</p>
          <p className="text-light/80 mt-2 ">Unluck digital profit</p>
        </Link>
        {/* Quick Links Column 1 */}
        <div className=" md:w-[20%]">
          <h6 className="mb-4 font-semibold">Quick Links</h6>
          <div>
            {quickLinks.map(({ href, label }, index) => (
              <Link key={index} href={`#${href}`}>
                <p className="py-2 hover:underline cursor-pointer">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links Column 2 */}
        <div className=" md:w-[20%]">
          <h6 className="mb-4 font-semibold">Resources</h6>
          <div>
            {quickLinks.map(({ href, label }, index) => (
              <Link key={index} href={`${href}`}>
                <p className="py-2 hover:underline cursor-pointer">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <form action={handleSubmit} className="w-full md:w-[40%]">
          <h6 className="font-semibold">Subscribe</h6>
          <p className="text-sm mb-6 mt-4">
            Join our newsletter for the latest updates and insights.
          </p>
          <div className="flex gap-2 mb-4 flex-col sm:flex-row">
            <input
              className="p-2 border rounded-sm w-full"
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
            />
            <Btn
              label="Subscribe"
              sec
              className="rounded-sm border-white text-white hover:text-black"
            />
          </div>
          <p className="text-[12px] leading-[150%] text-light/65">
            By subscribing, you consent to our Privacy Policy and receive
            updates.
          </p>
        </form>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-20 flex flex-col sm:flex-row justify-between items-center gap-y-4">
        <p className="text-[12px] text-center sm:text-left">
          &copy; {new Date().getFullYear()} BookOne. All rights reserved.
        </p>
        <div className="flex gap-6 text-[12px] flex-wrap justify-center">
          <Link href="/privacy-policy">
            <p className="hover:underline cursor-pointer">Privacy Policy</p>
          </Link>
          <Link href="/terms">
            <p className="hover:underline cursor-pointer">Terms of Service</p>
          </Link>
          <Link href="/cookies">
            <p className="hover:underline cursor-pointer">Cookies Settings</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
