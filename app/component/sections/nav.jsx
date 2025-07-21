"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { navDetails, socialIcons } from "../../Commons/details.js";
import Btn from "../Btn.jsx";
import { usePathname } from "next/navigation.js";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (menuOpen) {
        window.document.body.style.overflow = "hidden";
      } else {
        window.document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        window.document.body.style.overflow = "";
      }
    };
  }, [menuOpen]);
  return (
    <header className="">
      <nav className="flex container h-16  items-center justify-between">
        <Link href="/" scroll={false}>
          <p className="text-2xl font-bold text-primary">BookOne</p>
        </Link>
        <ul className="flex gap-8 max-md:hidden">
          {navDetails.map(({ name, href, id }) => (
            <li
              className="font-sans text-[16px] pat font-normal leading-[150%] tracking-normal"
              key={id}
            >
              <Link scroll={false} href={href}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          {menuOpen ? (
            <button
              className="md:hidden"
              onClick={() => {
                window.innerHeight == "100vh";
                setMenuOpen(!menuOpen);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#000000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          ) : (
            <button
              className="md:hidden w-8 h-7"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18L20 18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>

      <nav
        className={`
      ${menuOpen ? " h-screen w-full md:hidden " : " hidden"}`}
      >
        <ul className=" container">
          {navDetails.map(({ name, href, id }) => (
            <Link key={id} onClick={() => setMenuOpen(false)} href={href}>
              {" "}
              <ul className="flex hover:shadow py-2 border-t items-center justify-between w-full">
                <li
                  className="font-sans text-[18px] font-normal leading-[150%] tracking-normal"
                  key={id}
                >
                  {name}
                </li>

                <button className="w-7 h-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2e073f"
                  >
                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                  </svg>
                </button>
              </ul>
            </Link>
          ))}
          <Link href="/blogs">
            <ul className="flex hover:shadow border-t py-2 items-center justify-between w-full">
              <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal">
                More
              </li>
              <Image
                src="/chevron-right.svg"
                alt="chevron right"
                height={28}
                width={28}
              />
            </ul>
          </Link>
          <Link href="/blogs">
            <ul className="flex hover:shadow border-y py-2 items-center justify-between w-full">
              <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal">
                Blogs
              </li>
              <Image
                src="/chevron-right.svg"
                alt="chevron right"
                height={28}
                width={28}
              />
            </ul>
          </Link>
        </ul>

        <div className="mt-12 container">
          <h4>follow us on all platform</h4>
          <div className="flex mt-3 gap-6 items-center">
            {socialIcons.map(({ src, alt, href }, index) => (
              <Link href={href} key={index}>
                <Image src={src} alt={alt} height={28} width={28} />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
