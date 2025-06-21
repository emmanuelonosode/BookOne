"use client";

import React from "react";
import Image from "next/image";
import { quickLinks } from "../Commons/details";
import Link from "next/link";
import Btn from "./Btn";

function Footer() {
  return (
    <footer className="py-20 font-sans bg-white text-black">
      <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between items-start gap-y-12">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start w-full md:w-[20%]">
          <Image src="/logo.png" alt="logo" width={120} height={120} />
          <h3 className="font-mono mt-2">BookOne</h3>
        </div>

        {/* Quick Links Column 1 */}
        <div className="w-full md:w-[20%]">
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
        <div className="w-full md:w-[20%]">
          <h6 className="mb-4 font-semibold">Resources</h6>
          <div>
            {quickLinks.map(({ href, label }, index) => (
              <Link key={index} href={`#${href}`}>
                <p className="py-2 hover:underline cursor-pointer">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <form className="w-full md:w-[30%]">
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
            <Btn label="Subscribe" size="md" />
          </div>
          <p className="text-[12px] leading-[150%] text-gray-600">
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
