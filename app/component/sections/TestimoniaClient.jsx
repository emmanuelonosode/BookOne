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
      <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between">
        
        <div className="relative z-10">
          {/* Main testimonial content */}
          <div className="mb-8">
            <div className="mb-6">
               <Quote className="w-8 h-8 text-gray-300 rotate-180" />
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 leading-tight">
              {testimonial.tag}
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {testimonial.desc}
            </p>
          </div>

          {/* Client info */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
            <div className="flex-shrink-0">
              <Image
                src={getImageUrl(testimonial.image)}
                alt={`${testimonial.name}, ${testimonial.position}`}
                width={48}
                height={48}
                className="rounded-full object-cover w-12 h-12 bg-gray-100"
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
              <h3 className="font-semibold text-slate-900 text-base">
                {testimonial.name}
              </h3>
              <div className="text-sm text-slate-500">
                <span className="font-medium text-slate-700">
                  {testimonial.position}
                </span>
                {testimonial.company && (
                  <>
                    <span className="mx-1.5 text-gray-300">•</span>
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
      className="py-24 bg-[#FAFAFA] relative overflow-hidden"
      aria-label="Client Testimonials"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-slate-700 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b46c1]"></span>
            </span>
            Client Success Stories
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Transforming Businesses, <br className="hidden md:block" />
            <span className="text-slate-500">
              One Website at a Time.
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
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
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    ${
                      index === currentIndex
                        ? "bg-[#6b46c1] w-8"
                        : "bg-gray-300 hover:bg-gray-400"
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
