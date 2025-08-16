"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { sanity, urlFor } from "@/lib/sanity";
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
        flex-shrink-0 w-full p-6 sm:p-8 lg:p-12 transition-all duration-500
        ${isActive ? "opacity-100 scale-100" : "opacity-90 scale-95"}
      `}
      role="group"
      aria-roledescription="testimonial"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />

        {/* Quote icon */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300 rotate-180" />
        </div>

        <div className="relative z-10">
          {/* Star rating */}

          {/* Main testimonial content */}
          <div className="mb-6 sm:mb-8">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 leading-relaxed">
              {testimonial.tag}
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              {testimonial.desc}
            </p>
          </div>

          {/* Results metrics (if available) */}

          {/* Client info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="flex-shrink-0">
              <Image
                src={urlFor(testimonial.image).url()}
                alt={`${testimonial.name}, ${testimonial.position}`}
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16 border-4 border-purple-200 shadow-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/64x64/8B5CF6/FFFFFF?text=" +
                    testimonial.name.charAt(0);
                }}
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {testimonial.name}
              </h3>
              <p className="text-purple-600 font-medium text-sm sm:text-base mb-1">
                {testimonial.position}
              </p>
              {testimonial.company && (
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              )}
              {/* Project type badge */}
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {testimonial.projectType || "Website Design & Development"}
                </span>
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
        w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg 
        flex items-center justify-center group
        hover:shadow-xl hover:scale-105 transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        ${direction === "prev" ? "-left-6 sm:-left-7" : "-right-6 sm:-right-7"}
        ${className}
      `}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} testimonial`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 group-hover:text-purple-700 transition-colors" />
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden"
      aria-label="Client Testimonials"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 sm:-right-48 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 sm:-left-48 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Client Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl max-w-2xl mx-auto lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Transforming Businesses,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              One Website at a Time
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            See how we've helped businesses like yours achieve remarkable growth
            through strategic web design, development, and digital marketing
            solutions.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <span className="font-medium">100+ Happy Clients</span>
          </div>
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
              className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12"
              role="tablist"
              aria-label="Testimonial pagination"
            >
              {testimonia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    ${
                      index === currentIndex
                        ? "bg-purple-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                    }
                  `}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </nav>
          )}

          {/* Auto-play indicator */}
          {hasMultipleTestimonials && isAutoPlaying && (
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Auto-playing • Hover to pause
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonia;
