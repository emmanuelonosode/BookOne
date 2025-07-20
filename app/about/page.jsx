import React from "react";
import Image from "next/image";

export const metadata = {
  title: "About | BookOne",
  description:
    "Learn about BookOne’s mission, story, and team behind our web design & development agency.",
};

export default function AboutPage() {
  return (
    <section className="py-24 px-6 md:px-20 max-w-6xl mx-auto text-neutral-800">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold  mb-4">About BookOne</h1>
        <p className=" max-w-3xl mx-auto">
          Welcome to the heart of BookOne, where our passion for literature and
          community comes to life. We believe in the transformative power of
          stories and the magic that happens when readers connect.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Our Mission & Vision
        </h2>
        <p className="mb-4">
          <strong>Mission:</strong>Mission: At BookOne, our mission is to
          cultivate a vibrant, inclusive, and accessible global reading
          community. We strive to connect readers with books that inspire,
          challenge, and entertain, while empowering authors to reach new
          audiences and share their unique voices.
        </p>
        <p>
          <strong>Vision:</strong> To become the go-to agency for
          forward-thinking brands looking to build online success through
          elegant design, reliable development, and strategic digital
          transformation.
        </p>
      </div>

      {/* Story */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          The Story Behind BookOne
        </h2>
        <p>
          BookOne was born from a simple yet profound realization: in an
          increasingly digital world, the joy of reading and the camaraderie of
          book clubs were becoming fragmented. Our founder, an avid reader
          frustrated by scattered recommendations and isolated discussions,
          dreamed of a unified platform. A place where book lovers could not
          only discover their next favorite read but also connect with
          like-minded individuals, join insightful conversations, and celebrate
          the shared experience of storytelling.
          <br />
          <br />
          From humble beginnings as a passion project, BookOne has grown into a
          thriving hub, built on the principles of community, discovery, and
          respect for the written word. Every feature, every design choice, is
          made with our users in mind, ensuring a seamless and enriching
          experience for everyone who walks through our digital doors.
        </p>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-8">
          Meet Our Team
        </h2>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* CEO */}
          <div className="p-6 bg-light rounded-xl shadow">
            <Image
              src="https://randomuser.me/api/portraits/men/75.jpg"
              width={80}
              height={80}
              alt="CEO"
              className="rounded-full mb-4"
            />
            <h3 className="font-semibold text-lg text-primary">
              Emmanuel Onosode
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Chief Executive Officer
            </p>
            <p>
              Emmanuel leads BookOne with a strong vision for digital
              transformation and creativity. With a background in tech startups
              and systems development, he ensures every project is
              purpose-driven.
            </p>
          </div>

          {/* Frontend Lead */}
          <div className="p-6 bg-light rounded-xl shadow">
            <Image
              src="https://randomuser.me/api/portraits/men/45.jpg"
              width={80}
              height={80}
              alt="Frontend Developer"
              className="rounded-full mb-4"
            />
            <h3 className="font-semibold text-lg text-primary">
              David Johnson
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Lead Frontend Developer
            </p>
            <p>
              David crafts seamless interfaces and responsive layouts. He
              specializes in modern JavaScript frameworks, especially React and
              Next.js, ensuring optimal user experience across all platforms.
            </p>
          </div>

          {/* Web Designers */}
          <div className="p-6 bg-light rounded-xl shadow">
            <Image
              src="https://randomuser.me/api/portraits/women/60.jpg"
              width={80}
              height={80}
              alt="Web Designer"
              className="rounded-full mb-4"
            />
            <h3 className="font-semibold text-lg text-primary">
              Lisa Adekunle
            </h3>
            <p className="text-sm text-gray-600 mb-2">UI/UX Designer</p>
            <p>
              Lisa brings creativity and clarity to every design. She's
              passionate about accessible layouts and elegant interactions that
              tell a story while serving user needs.
            </p>
          </div>

          <div className="p-6 bg-light rounded-xl shadow">
            <Image
              src="https://randomuser.me/api/portraits/women/25.jpg"
              width={80}
              height={80}
              alt="Web Designer"
              className="rounded-full mb-4"
            />
            <h3 className="font-semibold text-lg text-primary">Tosin Bello</h3>
            <p className="text-sm text-gray-600 mb-2">Visual Designer</p>
            <p>
              Tosin specializes in branding and typography. She ensures that
              every visual element reinforces the BookOne identity and resonates
              with our client’s audience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
