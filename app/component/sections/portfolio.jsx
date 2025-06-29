"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "NexaTech AI Dashboard",
    description:
      "Custom-built analytics dashboard for an AI startup, designed for performance and clarity.",
    image:
      "https://images.unsplash.com/photo-1617727553252-65863b1edac4?auto=format&fit=crop&w=800&q=80",
    slug: "nexatech-dashboard",
  },
  {
    title: "GlowSkin E-Commerce Store",
    description:
      "Modern, fast-loading online store built to scale — integrated with Stripe, product CMS, and CRM.",
    image:
      "https://images.unsplash.com/photo-1616401781227-d34f7ecf3ba0?auto=format&fit=crop&w=800&q=80",
    slug: "glowskin-store",
  },
  {
    title: "Univote Campus Voting Platform",
    description:
      "Secure web app used by over 1,000 students for digital elections. Mobile-first with live updates.",
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    slug: "univote-platform",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-28 bg-light text-neutral">
      <div className="container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Recent Projects</h2>
          <p className="text-muted mt-4">
            Here’s a peek at what we’ve built recently. Clean. Functional.
            Impactful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="relative h-[220px] w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/portfolio"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-[#5530a4] transition"
          >
            View Full Portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
