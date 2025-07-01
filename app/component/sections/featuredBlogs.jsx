import React from "react";
import Tagline from "../tagline.jsx";
import Btn from "../Btn.jsx";
import { FadeInSection } from "../fadeIn.jsx";
import Link from "next/link";
import getReadTime from "@/lib/readTime.js"
export default async function FeaturedBlogs() {
  // Fetch blogs from your API route
  const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/blogs`, {
    cache: "no-store",
  });
  const featBlogs = res.ok ? await res.json() : [];

  function copyShit(blog){

    let readTime = "";
    if (blog && blog.content && Array.isArray(blog.content.blocks)) {
      const text = blog.content.blocks
        .map((block) => block.data?.text || "")
        .join(" ");
      readTime = getReadTime(text);
      return readTime
  }
  }
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
          {featBlogs.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No featured blogs found.
            </div>
          )}
          {featBlogs.map((prop, index) => (
            <FadeInSection key={index}>
              <article>
                <img
                  className="w-full aspect-video mb-6"
                  src={prop.banner}
                  alt={prop.title}
                />
                <Link href={`blogs/${prop.slug}`}>
                  {/* <p>
                    <small className="font-semibold text-[14px] leading-[150%]">
                      {tag}
                    </small>
                  </p> */}
                  <h5 className="my-2 h4 ">{prop.title}</h5>
                  <p className="pat">{prop.desc}</p>
                  <div className="flex items-center mt-6 gap-4">
                    <img
                      className="w-10 h-10 rounded-full object-fill"
                      src={
                        "https://imageio.forbes.com/specials-images/imageserve/68430eb327b8047e1d822fcd/0x0.jpg?format=jpg&crop=2088,2087,x227,y86,safe&height=416&width=416&fit=bounds"
                      }
                      alt={prop.author.name}
                    />
                    <div>
                      <p className="font-semibold text-[14px] leading-[150%]">
                        <small>{prop.author.name}</small>
                      </p>
                      <p>
                        {new Date(prop.createdAt).toLocaleString()}|{" "}
                        {copyShit(prop)}{ " Min read"}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            </FadeInSection>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Btn label="View all" />
        </div>
      </div>
    </section>
  );
}
