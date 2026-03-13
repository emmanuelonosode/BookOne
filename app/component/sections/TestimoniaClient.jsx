"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { sanity, getImageUrl } from "@/lib/sanity";
import { allTestimoniaQuery } from "@/lib/queries";
import Image from "next/image";
import {
  Quote,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Memoized testimonial card component
const TestimonialCard = memo(({ testimonial, isActive }) => {
  return (
    <article
      className={`
        shrink-0 w-full p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-out
        ${isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"}
      `}
      role="group"
      aria-roledescription="testimonial"
    >
      <div className="bg-[#1A1A24]/60 backdrop-blur-md rounded-[2rem] p-8 sm:p-10 border border-white/10 shadow-sm hover:shadow-[0_20px_40px_rgba(107,70,193,0.15)] hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between">
        
        <div className="relative z-10">
          {/* Main testimonial content */}
          <div className="mb-8">
            <div className="mb-6">
               <Quote className="w-8 h-8 text-white/10 rotate-180" />
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-white mb-4 leading-tight">
              {testimonial.tag}
            </p>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              {testimonial.desc}
            </p>
          </div>

          {/* Client info */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
            <div className="flex-shrink-0">
              <Image
                src={getImageUrl(testimonial.image)}
                alt={`${testimonial.name}, ${testimonial.position}`}
                width={48}
                height={48}
                className="rounded-full object-cover w-12 h-12 bg-[#0B0B0E]"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/48x48/E2E8F0/64748B?text=" +
                    testimonial.name.charAt(0);
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">
                {testimonial.name}
              </h3>
              <div className="text-sm text-slate-400">
                <span className="font-medium text-[#A78BFA]">
                  {testimonial.position}
                </span>
                {testimonial.company && (
                  <>
                    <span className="mx-1.5 text-white/20">•</span>
                    <span>{testimonial.company}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

// Memoized navigation button
const NavButton = memo(({ direction, onClick, className = "" }) => {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 z-20
        w-12 h-12 sm:w-14 sm:h-14 bg-[#1A1A24]/60 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10
        flex items-center justify-center group
        hover:border-[#6B46C1]/50 hover:shadow-[0_0_15px_rgba(107,70,193,0.3)] hover:scale-105 transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0B0B0E]
        ${direction === "prev" ? "-left-6 sm:-left-7" : "-right-6 sm:-right-7"}
        ${className}
      `}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} testimonial`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#A78BFA] group-hover:text-white transition-colors" />
    </button>
  );
});

const Testimonia = ({ testimonia: initialTestimonia }) => {
  const [testimonia, setTestimonia] = useState(initialTestimonia || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTestimonia(initialTestimonia || []);
  }, [initialTestimonia]);

  const totalTestimonials = testimonia.length;
  const hasMultipleTestimonials = totalTestimonials > 1;

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (!hasMultipleTestimonials || !isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
    }, 6000); // Increased interval for better UX
  }, [hasMultipleTestimonials, totalTestimonials, isAutoPlaying]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle auto-play
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  // Handle mouse events for auto-play pause
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseEnter = () => {
      setIsAutoPlaying(false);
      stopAutoPlay();
    };

    const handleMouseLeave = () => {
      setIsAutoPlaying(true);
    };

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [stopAutoPlay]);

  // Smooth scroll to current testimonial
  useEffect(() => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.clientWidth * currentIndex;
      sliderRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    stopAutoPlay();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
    setTimeout(() => setIsAutoPlaying(true), 3000); // Resume auto-play after 3 seconds
  }, [totalTestimonials, stopAutoPlay]);

  const goToPrev = useCallback(() => {
    stopAutoPlay();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalTestimonials) % totalTestimonials
    );
    setTimeout(() => setIsAutoPlaying(true), 3000); // Resume auto-play after 3 seconds
  }, [totalTestimonials, stopAutoPlay]);

  const goToSlide = useCallback(
    (index) => {
      stopAutoPlay();
      setCurrentIndex(index);
      setTimeout(() => setIsAutoPlaying(true), 3000); // Resume auto-play after 3 seconds
    },
    [stopAutoPlay]
  );

  if (testimonia.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-[#0B0B0E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 bg-[#0B0B0E] relative overflow-hidden"
      aria-label="Client Testimonials"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A24]/60 border border-white/10 backdrop-blur-md shadow-sm text-sm font-medium text-[#A78BFA] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
            </span>
            Client Success Stories
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Transforming Businesses, <br className="hidden md:block" />
            <span className="text-[#8B5CF6]">
              One Website at a Time.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            See how we've helped businesses like yours achieve remarkable growth
            through strategic web design and digital solutions.
          </p>
        </header>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden scroll-smooth"
            role="region"
            aria-live="polite"
            aria-label="Testimonial carousel"
          >
            {testimonia.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial._id || testimonial.name}
                testimonial={testimonial}
                isActive={index === currentIndex}
              />
            ))}
          </div>

          {/* Navigation */}
          {hasMultipleTestimonials && (
            <>
              <NavButton direction="prev" onClick={goToPrev} />
              <NavButton direction="next" onClick={goToNext} />
            </>
          )}

          {/* Pagination dots */}
          {hasMultipleTestimonials && (
            <nav
              className="flex justify-center gap-2 sm:gap-3 mt-8"
              role="tablist"
              aria-label="Testimonial pagination"
            >
              {testimonia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    w-2.5 h-2.5 rounded-full transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#0B0B0E]
                    ${
                      index === currentIndex
                        ? "bg-[#8B5CF6] w-8 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                        : "bg-white/20 hover:bg-white/40"
                    }
                  `}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonia;
