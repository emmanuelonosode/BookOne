"use client"
import React from 'react'
import Tagline from '../tagline'
import {motion} from "framer-motion"
import Link from 'next/link';
function BlogCard1(props) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{  amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img src={props.banner} alt="" className="w-full aspect-video mb-6 " />
      <div className="text-[14px] flex gap-4 mb-4 font-semi-bold leading-[150%]">
        <p>{props.timeToRead}</p>
      </div>
      <h4 className="mb-2">{props.title}</h4>
      <p className="pat">{props.desc}</p>
      <Link href={`/blogs/${props.slug}`} className="w-full">
      
      <button className="flex items-center pat mt-6">
        Read more{" "}
        <svg
          viewBox="0 0 12 12"
          enableBackground="new 0 0 12 12"
          className="w-4 h-4 "
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <polygon
              fill="#1D1D1B"
              points="3.8535156,12 3.1464844,11.2929688 8.4394531,6 3.1464844,0.7070313 3.8535156,0 9.8535156,6 "
            ></polygon>
          </g>
        </svg>
      </button>
      </Link>
    </motion.article>
  );
}

export default BlogCard1