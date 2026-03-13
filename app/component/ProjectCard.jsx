"use client";
import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity";
import { ArrowUpRight } from "lucide-react";

// Antigravity Light Mode ProjectCard
export default function ProjectCard({ project, index = 0 }) {
  const image = project.mainImage || project.heroMedia || project.image;
  const description =
    project.overview || project.shortDescription || project.description;
  const slug =
    project.slug?.current || project.slug || project._id || project.id;

  // Motion values for pointer and tilt
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Normalized [-0.5, 0.5] values based on card width/height
  const normX = useTransform(pointerX, (v, target) => v);
  const normY = useTransform(pointerY, (v, target) => v);

  // Map normalized ranges to degrees for tilt (X-axis rotates vertically)
  const rotateY = useTransform(normX, [-0.5, 0.5], [18, -18]);
  const rotateX = useTransform(normY, [-0.5, 0.5], [-18, 18]);

  // Smooth springs
  const springConfig = { stiffness: 200, damping: 20 };
  const springRotY = useSpring(rotateY, springConfig);
  const springRotX = useSpring(rotateX, springConfig);

  // Parallax translateZ effect values (we'll approximate with translateY/translateX for browsers)
  const imgOffsetX = useTransform(normX, [-0.5, 0.5], [12, -12]);
  const imgOffsetY = useTransform(normY, [-0.5, 0.5], [-8, 8]);
  const contentOffsetX = useTransform(normX, [-0.5, 0.5], [6, -6]);
  const contentOffsetY = useTransform(normY, [-0.5, 0.5], [-4, 4]);

  const springImgX = useSpring(imgOffsetX, { stiffness: 180, damping: 20 });
  const springImgY = useSpring(imgOffsetY, { stiffness: 180, damping: 20 });
  const springContentX = useSpring(contentOffsetX, {
    stiffness: 180,
    damping: 20,
  });
  const springContentY = useSpring(contentOffsetY, {
    stiffness: 180,
    damping: 20,
  });

  // Cursor glow radial background
  const glowX = useTransform(pointerX, (v) => `${v}px`);
  const glowY = useTransform(pointerY, (v) => `${v}px`);
  const glow = useMotionTemplate`radial-gradient(300px circle at ${glowX} ${glowY}, rgba(107,70,193,0.15), transparent 40%)`;

  // Hover/focus state
  const [isHover, setIsHover] = React.useState(false);

  function handleMove(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5..0.5
    pointerX.set(x);
    pointerY.set(y);
  }

  function handleLeave() {
    pointerX.set(0);
    pointerY.set(0);
    setIsHover(false);
  }

  function handleEnter(e) {
    handleMove(e);
    setIsHover(true);
  }

  const href = `/portfolio/${slug}`;

  return (
    <motion.article
      className="group relative bg-[#1A1A24]/60 border border-white/10 backdrop-blur-md rounded-4xl overflow-hidden will-change-transform hover:border-purple-500/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true, amount: 0.4 }}
      role="article"
      aria-labelledby={`project-title-${slug}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={0}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
        boxShadow: isHover
          ? "0 30px 80px rgba(107,70,193,0.25)"
          : "0 8px 30px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        translate: isHover ? "0px -8px" : "0px 0px",
      }}
    >
      {/* Cursor Glow Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity"
        style={{ background: glow, opacity: isHover ? 1 : 0 }}
      />

      {/* Interactive Inner Wrapper - apply tilt */}
      <motion.div
        className="relative z-10 overflow-hidden"
        style={{
          transform: useMotionValue(
            `rotateX(${springRotX.get()}deg) rotateY(${springRotY.get()}deg)`
          ),
        }}
      >
        {/* Media layer (appears closer - translateZ) */}
        <motion.div
          className="relative w-full aspect-video overflow-hidden bg-black/20"
          style={{
            transformStyle: "preserve-3d",
            translateZ: "30px",
          }}
        >
          {image ? (
            // Use regular img to avoid Next.js Image SSR issues in some preview environments
            <motion.img
              src={getImageUrl(image)}
              alt={`${project.title} preview`}
              className="w-full h-full object-contain will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                translateZ: "30px",
                x: springImgX,
                y: springImgY,
              }}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#1A1A24] to-[#0B0B0E] flex items-center justify-center">
              <div className="text-slate-500">No preview</div>
            </div>
          )}

          {/* image overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
        </motion.div>

        {/* Content layer (slightly behind) */}
        <motion.div
          className="p-6 md:p-8 bg-black/20 backdrop-blur-sm border-t border-white/5"
          style={{
            transformStyle: "preserve-3d",
            translateZ: "20px",
            x: springContentX,
            y: springContentY,
          }}
        >
          <h3
            id={`project-title-${slug}`}
            className="text-lg md:text-xl font-semibold text-white mb-2"
          >
            {project.title}
          </h3>
          {description && (
            <p className="text-sm text-slate-400 mb-4 line-clamp-3">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {project.tags?.slice?.(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#A78BFA]">
                View Project
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Clickable overlay link */}
      {href ? (
        <Link
          href={href}
          className="absolute inset-0 z-20"
          aria-label={`Open ${project.title}`}
        />
      ) : (
        <a
          className="absolute inset-0 z-20"
          aria-label={`Open ${project.title}`}
        />
      )}
    </motion.article>
  );
}

// Optional: Enhanced version for featured projects
export function FeaturedProjectCard({ project }) {
  // Support both old project schema and new case study schema
  const image = project.mainImage || project.heroMedia;
  const description = project.overview || project.shortDescription;
  const slug = project.slug?.current || project.slug;

  return (
    <motion.article
      className="group relative bg-[#1A1A24]/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(107,70,193,0.15)] border border-white/10 hover:border-purple-500/30 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link href={`/portfolio/${slug}`} className="block h-full">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 lg:h-96 overflow-hidden">
            {image ? (
              <Image
                src={getImageUrl(image)}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-[#1A1A24] to-[#0B0B0E]" />
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent lg:bg-none" />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center text-sm font-medium text-[#A78BFA] mb-4">
              <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mr-2 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              Featured Project
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#A78BFA] transition-colors duration-300">
              {project.title}
            </h3>

            {description && (
              <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-8">
                {description}
              </p>
            )}

            <div className="flex items-center text-[#A78BFA] font-semibold group-hover:text-white transition-colors duration-300">
              <span>Explore Project</span>
              <ArrowUpRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Usage example component showing both cards
export function PortfolioGrid({ projects }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Featured Project */}
      {projects?.[0] && (
        <div className="mb-16">
          <FeaturedProjectCard project={projects[0]} />
        </div>
      )}

      {/* Regular Projects Grid */}
      {projects?.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.slice(1).map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
