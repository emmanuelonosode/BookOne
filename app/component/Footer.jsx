"use client";

import React from "react";
import Image from "next/image";
import { quickLinks } from "../Commons/details";
import Link from "next/link";
import Btn from "./Btn";
function Footer() {
  return (
    <footer className="py-20 font-sans">
      <div className="container flex justify-between">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="logo" width={120} height={120} />
          <h3 className="font-mono">BookOne</h3>
        </div>
        <div>
          <h6 className="mb-4">Quick Links</h6>

          <div>
            {quickLinks.map(({ href, label }, index) => (
              <Link key={index} href={`#${href}`}>
                <p className="py-2">{label}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h6 className="mb-4">Quick Links</h6>

          <div>
            {quickLinks.map(({ href, label }, index) => (
              <Link key={index} href={`#${href}`}>
                <p className="py-2">{label}</p>
              </Link>
            ))}
          </div>
        </div>
        <form className="w-md">
          <h6>Suscribe</h6>
          <p className="pat mb-6 mt-4">
            Join our newsletter for the latest updates and insights.
          </p>
          <div className="flex gap-2 mb-4">
            <input
              className="p-2 border rounded-sm w-full"
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
            />
            <Btn label="Suscribe" size="md" />
          </div>
          <p className="text-[12px] leading-[150%]">
            By subscribing, you consent to our Privacy Policy and receive
            updates.
          </p>
        </form>
      </div>
      <div className="flex justify-between container mt-20">
        <p className="text-[12px]">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="flex gap-6">

        <Link href="/privacy-policy">
          <p className="text-[12px]">Privacy Policy</p>
        </Link>
        <Link href="/privacy-policy"></Link>
        <Link href="/privacy-policy">
          <p className="text-[12px]">Terms of Service</p>
        </Link>
        <Link href="/privacy-policy">
          <p className="text-[12px]">Cookies Settings</p>
        </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
