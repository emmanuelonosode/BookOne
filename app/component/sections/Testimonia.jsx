"use client";

import React, { useState, useEffect, useRef } from "react";
import { sanity, urlFor } from "@/lib/sanity";
import { allTestimoniaQuery } from "@/lib/queries";
import Image from "next/image";

const Testimonia = () => {
  const [testimonia, setTestimonia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function fetchTestimonia() {
      const data = await sanity.fetch(allTestimoniaQuery);
      setTestimonia(data);
    }
    fetchTestimonia();
  }, []);

  const totalTestimonials = testimonia.length;
  const isMultipleTestimonials = totalTestimonials > 1;

  // Auto-play and pause on hover
  useEffect(() => {
    if (!isMultipleTestimonials) return;

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
      }, 5000);
    };

    startAutoPlay();

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      const handleMouseEnter = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
      const handleMouseLeave = () => {
        startAutoPlay();
      };
      sliderElement.addEventListener("mouseenter", handleMouseEnter);
      sliderElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        sliderElement.removeEventListener("mouseenter", handleMouseEnter);
        sliderElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalTestimonials, isMultipleTestimonials]);

  // Scroll to current testimonial when index changes
  useEffect(() => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.clientWidth * currentIndex;
      sliderRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const goToNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
  };

  const goToPrev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalTestimonials) % totalTestimonials
    );
  };

  const goToSlide = (index) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(index);
  };

  return (
    <section
      className="py-16 md:py-28 font-sans bg-gray-50"
      aria-label="Testimonials Section"
    >
      <div className="container mx-auto px-6">
        <header className="text-center mb-12" aria-label="Testimonials Header">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            tabIndex={0}
          >
            What Our Clients Say
          </h2>
          <p
            className="mt-2 text-lg text-gray-600 max-w-xl mx-auto"
            tabIndex={0}
          >
            Hear directly from businesses that have achieved remarkable growth
            and efficiency with BookOne.
          </p>
        </header>
        <div className="relative max-w-4xl mx-auto">
          <div
            id="testimonial-slider"
            ref={sliderRef}
            className="flex overflow-x-hidden relative rounded-xl shadow-lg bg-white testimonial-slider-container"
            aria-live="polite"
            aria-label="Testimonial Carousel"
            role="region"
          >
            {testimonia.map((testimonial, index) => (
              <article
                key={testimonial._id || testimonial.name}
                className="testimonial-card flex-shrink-0 w-full p-8 md:p-12 snap-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${
                  index + 1
                } of ${totalTestimonials}: ${testimonial.name}, ${
                  testimonial.position
                }`}
                tabIndex={0}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <Image
                      src={urlFor(testimonial.image).url()}
                      alt={`Photo of ${testimonial.name}, ${testimonial.position}`}
                      width={256}
                      height={256}
                      className="rounded-md object-cover w-64 h-full border-4 border-purple-600"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/100x100/cccccc/333333?text=User";
                      }}
                    />
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <blockquote>
                      <p className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
                        &quot;{testimonial.tag}&quot;
                      </p>
                      <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                        {testimonial.desc}
                      </p>
                    </blockquote>
                    <p className="font-semibold text-purple-600 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows */}
          {isMultipleTestimonials && (
            <>
              <button
                onClick={goToPrev}
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 hidden md:block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Previous testimonial"
                role="button"
              >
                <span className="text-2xl font-bold text-purple-600">
                  &#8249;
                </span>
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 hidden md:block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Next testimonial"
                role="button"
              >
                <span className="text-2xl font-bold text-purple-600">
                  &#8250;
                </span>
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {isMultipleTestimonials && (
            <nav
              className="flex justify-center space-x-2 mt-6"
              role="tablist"
              aria-label="Testimonial Pagination"
            >
              {testimonia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex
                      ? "bg-purple-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  tabIndex={0}
                ></button>
              ))}
            </nav>
          )}
        </div>
      </div>
      {/* CSS for custom scrollbar behavior and testimonial card sizing */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .testimonial-card {
            flex: 0 0 100%;
            min-height: 300px;
        }
        @media (min-width: 768px) {
             .testimonial-card {
                min-height: 250px;
            }
        }
      `}</style>
    </section>
  );
};

export default Testimonia;
