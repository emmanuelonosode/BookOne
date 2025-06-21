"use client";

import React from "react";
import Btn from "./Btn";

// Define the interface for the CTA button props
interface CtaButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}

// Define the interface for the CtaSection component's props
interface CtaSectionProps {
  /**
   * The main headline for the CTA section.
   * @default "Ready to Transform Your Digital Presence?"
   */
  headline?: string;
  /**
   * The descriptive paragraph providing more context for the CTA.
   * @default "Let BookOne craft profitable digital experiences tailored to your business goals. Get started today!"
   */
  description?: string;
  /**
   * An array of buttons to display in the CTA section.
   */
  buttons?: CtaButton[];
  /**
   * Additional CSS classes to apply to the main section container.
   */
  className?: string;
  /**
   * Defines the background style of the section.
   * 'primary-light' will use a light purple background (bg-purple-50).
   * 'dark' will use a dark background (bg-gray-800) with white text.
   * 'white' will use a white background.
   * @default "primary-light"
   */
  backgroundVariant?: "primary-light" | "dark" | "white";
}

/**
 * A versatile Call to Action (CTA) section component for production-grade web applications.
 * It provides a compelling headline, description, and customizable buttons,
 * with options for different background styles and full responsiveness.
 *
 * @param {CtaSectionProps} props - The properties for the component.
 * @returns {JSX.Element} The CTA Section React component.
 */
const CtaSection: React.FC<CtaSectionProps> = ({
  headline = "Ready to Transform Your Digital Presence?",
  description = "Let BookOne craft profitable digital experiences tailored to your business goals. Get started today!",
  buttons = [
    // Default buttons matching BookOne's style
    { label: "Get a Free Consultation", href: "#contact", variant: "primary" },
    { label: "Explore Our Services", href: "#services", variant: "outline" },
  ],
  className = "",
  backgroundVariant = "primary-light",
}) => {
  // Determine background and text colors based on variant
  let sectionBgClass = "";
  let headlineClass = "text-gray-900";
  let descriptionClass = "text-gray-600";

  switch (backgroundVariant) {
    case "primary-light":
      sectionBgClass = "bg-purple-50";
      headlineClass = "text-gray-900";
      descriptionClass = "text-gray-600";
      break;
    case "dark":
      sectionBgClass = "bg-gray-800";
      headlineClass = "text-white";
      descriptionClass = "text-gray-300";
      break;
    case "white":
      sectionBgClass = "bg-white";
      headlineClass = "text-gray-900";
      descriptionClass = "text-gray-600";
      break;
    default:
      sectionBgClass = "bg-purple-50";
      headlineClass = "text-gray-900";
      descriptionClass = "text-gray-600";
  }

  // Determine button styles based on background variant to ensure contrast
  const getButtonClasses = (variant: CtaButton["variant"]) => {
    let base =
      "font-bold py-3 px-8 rounded-lg transition-opacity hover:opacity-90";
    switch (variant) {
      case "primary":
        return `${base} ${
          backgroundVariant === "dark"
            ? "bg-purple-500 text-white"
            : "bg-purple-600 text-white"
        }`;
      case "secondary":
        return `${base} ${
          backgroundVariant === "dark"
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`;
      case "outline":
        return `${base} ${
          backgroundVariant === "dark"
            ? "border border-white text-white hover:bg-white hover:text-gray-800"
            : "border border-purple-600 text-purple-600 hover:bg-purple-50"
        }`;
      default:
        return `${base} ${
          backgroundVariant === "dark"
            ? "bg-purple-500 text-white"
            : "bg-purple-600 text-white"
        }`;
    }
  };

  return (
    <section
      className={`py-16 md:py-28  font-sans ${sectionBgClass} ${className}`}
    >
      <div className="container mx-auto px-6 text-center max-w-100">
        <h2
          className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${headlineClass}`}
        >
          {headline}
        </h2>
        <p className={`text-lg leading-relaxed mb-8 ${descriptionClass}`}>
          {description}
        </p>
        <div className="flex sm:flex-row justify-center items-center gap-4">
          <Btn label="Get Free Consultation" size="md" />
          <Btn label="Check Our Projects" size="md" variant="outline" />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
