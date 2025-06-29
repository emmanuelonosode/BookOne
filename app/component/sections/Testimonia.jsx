"use client";

import React, { useState, useEffect, useRef } from "react";
import { testimonia } from "../../Commons/details";

const Testimonia = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const totalTestimonials = testimonia.length;
  const isMultipleTestimonials = totalTestimonials > 1;

  // Auto-play and pause on hover
  useEffect(() => {
    if (!isMultipleTestimonials) return;

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
      }, 5000); // Change slide every 5 seconds
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
    if (intervalRef.current) clearInterval(intervalRef.current); // Stop auto-play on manual interaction
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
  };

  const goToPrev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Stop auto-play on manual interaction
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalTestimonials) % totalTestimonials
    );
  };

  const goToSlide = (index) => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Stop auto-play on manual interaction
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 md:py-28 font-sans bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="mt-2 text-lg text-gray-600 max-w-xl mx-auto">
            Hear directly from businesses that have achieved remarkable growth
            and efficiency with BookOne.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div
            id="testimonial-slider"
            ref={sliderRef}
            className="flex overflow-x-hidden relative rounded-xl shadow-lg bg-white testimonial-slider-container"
            aria-live="polite" // Announces changes to screen readers
          >
            {testimonia.map((testimonial, index) => (
              <div
                key={testimonial.name} // Use name as key, assuming it's unique enough for sibling elements
                className="testimonial-card flex-shrink-0 w-full p-8 md:p-12 snap-center" // snap-center for smooth scrolling
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${totalTestimonials}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    {/* Replaced Next.js Image component with standard <img> tag */}
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s profile`}
                      className="rounded-md object-cover w-64 h-full border-4 border-purple-600" // Use BookOne primary color
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/100x100/cccccc/333333?text=User"; // Fallback image
                      }}
                    />
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <p className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
                      &quot;{testimonial.tag}&quot;
                    </p>
                    <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                      {testimonial.desc}
                    </p>
                    <p className="font-semibold text-purple-600 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (visible only for multiple testimonials) */}
          {isMultipleTestimonials && (
            <>
              <button
                onClick={goToPrev}
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 hidden md:block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <span className="text-2xl font-bold text-purple-600">‹</span>
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 hidden md:block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Next testimonial"
              >
                <span className="text-2xl font-bold text-purple-600">›</span>
              </button>
            </>
          )}

          {/* Pagination Dots (visible only for multiple testimonials) */}
          {isMultipleTestimonials && (
            <div className="flex justify-center space-x-2 mt-6" role="tablist">
              {testimonia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex
                      ? "bg-purple-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentIndex}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* CSS for custom scrollbar behavior and testimonial card sizing */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
        .testimonial-card {
            flex: 0 0 100%; /* Each card takes full width of the slider container */
            min-height: 300px; /* Ensure consistent height for cards */
        }
        @media (min-width: 768px) {
             .testimonial-card {
                min-height: 250px; /* Adjust height for larger screens */
            }
        }
      `}</style>
    </section>
  );
};

export default Testimonia;
