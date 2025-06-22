"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { navDetails, socialIcons } from "../Commons/details.js";
import Btn from "./Btn.tsx";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="">
      <nav className="flex container h-16 items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <h6 className="font-mono">BookOne</h6>
          </div>
        </Link>
        <ul className="flex gap-8 max-md:hidden">
          {navDetails.map(({ name, href, id }) => (
            <li
              className="font-sans text-[16px] font-normal leading-[150%] tracking-normal"
              key={id}
            >
              <Link href={href}> {name}</Link>
            </li>
          ))}
          <Link href="/blogs">
            <li className="font-sans text-[16px] font-normal leading-[150%] tracking-normal">
              More
            </li>
          </Link>
          <Link href="/blogs">
            <li className="font-sans text-[16px] font-normal leading-[150%] tracking-normal">
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
            <Link href="/auth/signin">
              <Btn label="Sign In" size="md" />
            </Link>
          )}
          {menuOpen ? (
            <Image
              className="md:hidden"
              src="/close.svg"
              width={32}
              height={28}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Image
              className="md:hidden"
              src="/menu.svg"
              width={32}
              height={28}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </nav>

      <nav
        className={`
      ${menuOpen ? " h-screen w-full md:hidden" : " hidden"}`}
      >
        <ul className=" container">
          {navDetails.map(({ name, href, id }) => (
            <Link key={id} href={href}>
              {" "}
              <div className="flex hover:shadow py-2 border-t items-center justify-between w-full">
                <li
                  className="font-sans text-[18px] font-normal leading-[150%] tracking-normal"
                  key={id}
                >
                  {name}
                </li>
                <Image src="/chevron-right.svg" height={28} width={28} />
              </div>
            </Link>
          ))}
          <Link href="/blogs">
            <div className="flex hover:shadow border-t py-2 items-center justify-between w-full">
              <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal">
                More
              </li>
              <Image src="/chevron-right.svg" height={28} width={28} />
            </div>
          </Link>
          <Link href="/blogs">
            <div className="flex hover:shadow border-y py-2 items-center justify-between w-full">
              <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal">
                Blogs
              </li>
              <Image src="/chevron-right.svg" height={28} width={28} />
            </div>
          </Link>
          {isAdmin && (
            <>
              <Link href="/blogs/new">
                <div className="flex hover:shadow border-y py-2 items-center justify-between w-full">
                  <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal text-green-600">
                    New Post
                  </li>
                  <Image src="/chevron-right.svg" height={28} width={28} />
                </div>
              </Link>
              <Link href="/admin">
                <div className="flex hover:shadow border-y py-2 items-center justify-between w-full">
                  <li className="font-sans text-[18px] font-normal leading-[150%] tracking-normal text-blue-600">
                    Admin Panel
                  </li>
                  <Image src="/chevron-right.svg" height={28} width={28} />
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
