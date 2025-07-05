"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { navDetails, socialIcons } from "../../Commons/details.js";
import Btn from "../Btn.jsx";
import { usePathname } from "next/navigation.js";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const pathname = usePathname();
  const isBlog = pathname === "/blogs";
  const [search, setSearch] = useState("");
  console.log(isBlog);
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      if (menuOpen) {
        window.document.body.style.overflow = "hidden";
      } else {
        window.document.body.style.overflow = "";
      }
    }

    // Cleanup in case component unmounts
    return () => {
      if (typeof window !== "undefined") {
        window.document.body.style.overflow = "";
      }
    };
  }, [menuOpen]);
  return (
    <header className="">
      <nav className="flex container h-16  items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-bold text-primary">BookOne</p>
        </Link>
        <ul className="flex gap-8 max-md:hidden">
          {navDetails.map(({ name, href, id }) => (
            <li
              className="font-sans text-[16px] pat font-normal leading-[150%] tracking-normal"
              key={id}
            >
              <Link scroll={false} href={href}>
                {" "}
                {name}
              </Link>
            </li>
          ))}
          <Link href="/blogs">
            <li className="font-sans pat font-normal leading-[150%] tracking-normal">
              More
            </li>
          </Link>
          <Link href="/blogs">
            <li className="font-sans pat font-normal leading-[150%] tracking-normal">
              Blogs
            </li>
          </Link>
          {isAdmin && (
            <>
              <Link href="/blogs/new">
                <li className="font-sans text-[16px] font-normal leading-[150%] tracking-normal text-green-600">
                  New Post
                </li>
              </Link>
              <Link href="/admin">
                <li className="font-sans text-[16px] font-normal leading-[150%] tracking-normal text-blue-600">
                  Admin
                </li>
              </Link>
            </>
          )}
        </ul>

        {isBlog && (
          <input
            type="search"
            placeholder="wachu wanna read?"
            className="border-gray-400 border px-2 py-1 rounded-full "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <div className="flex gap-4 items-center">
          {status === "loading" ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Welcome, {session.user.name}
                {isAdmin && <span className="text-blue-600 ml-1">(Admin)</span>}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="#contact" className="hidden sm:block">
              <Btn label="Get a Free Consultation" />
            </Link>
          )}
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
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
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
              <div className="flex hover:shadow py-2 border-t items-center justify-between w-full">
                <li
                  className="font-sans text-[18px] font-normal leading-[150%] tracking-normal"
                  key={id}
                >
                  {name}
                </li>
             
                <button
                className="w-7 h-7"

                >
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
              </div>
            </Link>
          ))}
          <Link href="/blogs">
            <div className="flex hover:shadow border-t py-2 items-center justify-between w-full">
              <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal">
                More
              </li>
              <Image
                src="/chevron-right.svg"
                alt="chevron right"
                height={28}
                width={28}
              />
            </div>
          </Link>
          <Link href="/blogs">
            <div className="flex hover:shadow border-y py-2 items-center justify-between w-full">
              <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal">
                Blogs
              </li>
              <Image
                src="/chevron-right.svg"
                alt="chevron right"
                height={28}
                width={28}
              />
            </div>
          </Link>
          {isAdmin && (
            <>
              <Link href="/blogs/new">
                <div className="flex hover:shadow border-y py-2 items-center justify-between w-full">
                  <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal text-green-600">
                    New Post
                  </li>
                  <Image
                    src="/chevron-right.svg"
                    alt="chevron right"
                    height={28}
                    width={28}
                  />
                </div>
              </Link>
              <Link href="/admin">
                <div className="flex hover:shadow border-y py-2 items-center justify-between w-full">
                  <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal text-blue-600">
                    Admin Panel
                  </li>
                  <Image
                    src="/chevron-right.svg"
                    alt="chevron right"
                    height={28}
                    width={28}
                  />
                </div>
              </Link>
            </>
          )}
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
