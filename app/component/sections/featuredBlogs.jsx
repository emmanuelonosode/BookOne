import React from "react";
import Tagline from "../tagline.jsx";
import { featBlogs } from "../../Commons/details.js";
import Btn from "../Btn.jsx";
import { FadeInSection } from "../fadeIn.jsx";
import Link from "next/link";

function FeaturedBlogs() {
  return (
    <section className="py-28">
      <div className="container">
        <div>
          <Tagline tag="Featured Blogs" />
          <h2 className="mt-4 mb-2">Insights on Development</h2>
          <p className="text-[18px] leading-[150%]">
            Explore the latest trends in web development and design.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-12 py-20">
          {featBlogs.map(
            (
              {
                tag,
                src,
                href,
                label,
                desc,
                authorImage,
                authorName,
                date,
                readTime,
              },
              index
            ) => (
              <FadeInSection key={index}>
                <article key={index}>
                  <img
                    className="w-full aspect-video mb-6"
                    src={src}
                    alt={label}
                  />

                  <Link href={href}>
                    <p>
                      <small className="font-semibold text-[14px] leading-[150%]">
                        {tag}
                      </small>
                    </p>
                    <h5 className="my-2">{label}</h5>
                    <p>{desc}</p>
                    <div className="flex items-center mt-6 gap-4">
                      <img
                        className="w-10 h-10 rounded-full object-fill"
                        src={authorImage}
                        alt={authorName}
                      />
                      <div className="">
                        <p className="font-semibold text-[14px] leading-[150%]">
                          <small>{authorName}</small>
                        </p>
                        <p>
                          {date} | {readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              </FadeInSection>
            )
          )}
        </div>
        <div className="flex items-center justify-center">
          <Btn label="View all" />
        </div>
      </div>
    </section>
  );
}

export default FeaturedBlogs;
