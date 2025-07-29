import React from "react";
import Image from "next/image";
import { generateMetaTags } from "../seo-config";

export const metadata = generateMetaTags({
  title:
    "About BookOne - Our Story, Mission & Team | Web Design & AI Automation",
  description:
    "Discover BookOne's journey from a passion project to a leading digital agency. Learn about our mission, team, and commitment to transforming businesses through innovative web design and AI automation.",
  url: "/about",
  keywords: [
    "about BookOne",
    "BookOne team",
    "digital agency Nigeria",
    "web design company",
    "AI automation services",
    "Emmanuel Onosode",
    "digital transformation",
    "business automation",
    "web development agency",
  ],
});

export default function AboutPage() {
  const team = [
    {
      name: "Emmanuel Onosode",
      role: "Founder & CEO",
      image: "/ceo.jpg",
      bio: "Emmanuel leads BookOne with a strong vision for digital transformation. His background in tech startups and system design ensures that every client project is strategically positioned for success.",
    },
    {
      name: "Jackson Fisher",
      role: "Technical Project Manager",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "Jackson ensures every BookOne project runs smoothly — from planning to deployment. His engineering background and agile mindset make him an expert at team coordination and delivery.",
    },
    {
      name: "Ava Thompson",
      role: "AI Automation Strategist",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Ava designs smart, efficient automations that power our clients’ growth. From chatbot flows to backend automations, she makes sure workflows work for humans — not the other way around.",
    },
    {
      name: "Elijah Brooks",
      role: "Brand & Motion Designer",
      image: "https://randomuser.me/api/portraits/men/83.jpg",
      bio: "Elijah gives BookOne its visual soul. His creative motion graphics, brand systems, and interactive designs ensure that every touchpoint is polished, purposeful, and unforgettable.",
    },
    {
      name: "Ellie Bennett",
      role: "Content & SEO Strategist",
      image: "https://randomuser.me/api/portraits/women/34.jpg",
      bio: "Ellie crafts content strategies that rank. With her SEO expertise and storytelling flair, she helps clients grow visibility, traffic, and trust — one headline at a time.",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto text-neutral-800">
      {/* Header */}
      <div className="mb-4 md:flex items-center gap-12 justify-between">
        <h1 className="text-5xl font-bold w-full mb-4">
          Welcome to the heart of BookOne
        </h1>
        <p className="w-full text-lg">
          where our passion for digital innovation and business growth comes to
          life. We believe in the power of elegant design, scalable development,
          and automation to help businesses thrive online.
        </p>
      </div>

      {/* Image */}
      <div className="w-full rounded-xl overflow-hidden mb-16">
        <img
          className="w-full h-full object-cover"
          src="/about-team.jpg"
          alt="Team illustration"
        />
      </div>

      {/* Mission & Vision */}
      <div className="my-20">
        <h2 className="text-3xl font-semibold text-zinc-900 mb-4">
          Our Mission & Vision
        </h2>
        <p className="mb-4">
          <strong>Mission:</strong> At BookOne, our mission is to help ambitious
          brands grow with the right digital tools. We build websites, automate
          workflows, and craft SEO strategies that drive measurable results.
        </p>
        <p>
          <strong>Vision:</strong> To become the go-to web agency in Africa for
          businesses looking to build their online presence through bold,
          strategic, and reliable digital solutions.
        </p>
      </div>

      {/* Story */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          The Story Behind BookOne
        </h2>
        <p>
          BookOne began with a simple question: why are so many local businesses
          struggling to make an impact online? Our founder recognized the need
          for affordable, high-impact digital solutions tailored to the African
          market.
          <br />
          <br />
          Since our first project, we’ve evolved into a small but mighty team
          dedicated to transforming ideas into scalable digital platforms. Every
          project is a collaboration rooted in purpose, creativity, and
          technical excellence.
        </p>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-10">
          Meet Our Team
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Image
                src={member.image}
                width={80}
                height={80}
                alt={member.name}
                className="rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg text-primary">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{member.role}</p>
              <p className="text-sm text-gray-700">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
