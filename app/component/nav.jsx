"use client"


import Image from "next/image";
import Link from "next/link";
import React,{useState} from "react";
import { navDetails, socialIcons } from "../Commons/details.js";
import Btn from "./Btn.tsx";
function Nav() {

  const [menuOpen, setMenuOpen]= useState(false);



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
            <Link href={href}>
              {" "}
                {name}
            </Link>
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
        </ul>
        <div className="flex gap-4 items-center">
          <Btn label="Contact Us" size="md" />
          {
            menuOpen ? (

              <Image className="md:hidden" src="/close.svg" width={32} height={28} onClick={()=> setMenuOpen(false)}/>
            ):(
              <Image className="md:hidden" src="/menu.svg" width={32} height={28} onClick={()=> setMenuOpen(true)}/>

            )
          }
        </div>
      </nav>
 
    <nav className={`
      ${
       menuOpen ? " h-screen w-full md:hidden" :" hidden"
      }`}>
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
        </ul>

        <div className="mt-12 container">
          <h4>
            follow us on all platform
          </h4>
          <div className="flex mt-3 gap-6 items-center">
            {
              socialIcons.map(({src, alt, href}, index)=>(
              <Link href={href} key={index} >

                <Image
                src={src}
                alt={alt}
                height={28}
                width={28}
                />
              </Link>
              ))
            }
          </div>
        </div>
      </nav> 
     
  
    </header>
  );
}

export default Nav;
