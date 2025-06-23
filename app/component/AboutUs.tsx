"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js"; // Import Chart and registerables

// Register all Chart.js components (important for Doughnut chart, legends, tooltips etc.)
Chart.register(...registerables);

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
      className={`py-16 md:py-28 font-sans ${sectionBgClass} ${className}`}
    >
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold leading-tight max-w-2xl mx-auto mb-4 ${headlineClass}`}
        >
          {headline}
        </h2>
        <p
          className={`text-lg leading-relaxed max-w-2xl mx-auto mb-8 ${descriptionClass}`}
        >
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              onClick={button.onClick}
              className={getButtonClasses(button.variant)}
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

// New RoiChart Component
interface RoiChartProps {
  className?: string;
}

const RoiChart: React.FC<RoiChartProps> = ({ className }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy existing chart before creating a new one
        }
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: [
              "Lead Generation",
              "Conversion Optimization",
              "Efficiency Gains",
              "Brand Equity",
            ],
            datasets: [
              {
                label: "Contribution to ROI",
                data: [40, 30, 20, 10],
                backgroundColor: [
                  "#6B46C1", // Primary Purple
                  "#805AD5",
                  "#9F7AEA",
                  "#B794F4",
                ],
                borderColor: "#FFFFFF",
                borderWidth: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Important for respecting container dimensions
            cutout: "70%",
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 20,
                  font: {
                    family: "'Inter', sans-serif",
                  },
                },
              },
              tooltip: {
                titleFont: {
                  family: "'Montserrat', sans-serif",
                  weight: "bold",
                  size: 14,
                },
                bodyFont: {
                  family: "'Inter', sans-serif",
                },
                padding: 10,
                cornerRadius: 4,
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            },
          },
        });
      }
    }
    // Cleanup function: destroy chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []); // Empty dependency array ensures it runs once on mount and cleans up on unmount

  return (
    <div
      className={`chart-container h-80 md:h-96 max-w-lg mx-auto ${className}`}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

// Define the type for the AboutSection component's props
interface AboutSectionProps {
  storyHeadline?: string;
  storyParagraph?: string;
  storyImageUrl?: string;
  storyImageAlt?: string;
  statsHeadline?: string;
  statsParagraph?: string;
  statsData?: {
    value: string;
    description: string;
  }[];
  statsImageUrl?: string;
  statsImageAlt?: string;
  className?: string;
}

/**
 * A comprehensive About Section component for BookOne, combining company story and key statistics.
 * It is designed for production-grade web applications, ensuring type safety, responsiveness,
 * and consistent branding with a purple color scheme.
 *
 * @param {AboutSectionProps} props - The properties for the component.
 * @returns {JSX.Element} The About Section React component.
 */
export const AboutSection: React.FC<AboutSectionProps> = ({
  // Exported as named export for consistency
  storyHeadline = "Tell the story of how your company came about",
  storyParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing velit non nulla in amet pellentesque. Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet fames arcu. Lacinia eget faucibus urna, nam risus nec elementum cras",
  storyImageUrl = "https://placehold.co/800x800/6B46C1/FFFFFF?text=About+Us", // Placeholder image with purple theme
  storyImageAlt = "About BookOne",
  statsHeadline = "Highlight achievements by the numbers",
  statsParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  statsData = [
    { value: "500+", description: "Projects completed" },
    { value: "200%", description: "Year on year growth" },
    { value: "$50M", description: "Invested Value" },
    { value: "10K+", description: "Satisfied Clients" },
  ],
  statsImageUrl = "https://placehold.co/600x600/805AD5/FFFFFF?text=Stats", // Placeholder image with a complementary purple shade
  statsImageAlt = "Statistics Image",
  className = "", // Default empty string for className
}) => {
  // Define primary purple color for consistency
  const primaryPurple = "bg-purple-600 text-white"; // For badge/highlight
  const lightPurpleText = "text-purple-700"; // For numbers

  return (
    <section className={`py-16 md:py-28 font-sans ${className}`}>
      <div className="container mx-auto px-6">
        {/* About Us Story Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:space-x-12 mb-16 md:mb-24">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <p
              className={`mb-4 px-3 py-1 text-sm font-medium rounded-md inline-block ${primaryPurple}`}
            >
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {storyHeadline}
            </h2>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed">
              {storyParagraph}
            </p>
          </div>
        </div>
        {/* Story Image */}
        <div className="mb-16 md:mb-24 flex justify-center">
          <img
            src={storyImageUrl}
            alt={storyImageAlt}
            width={800}
            height={450}
            className="w-full max-w-4xl rounded-xl shadow-lg aspect-video object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x450/6B46C1/FFFFFF?text=Image+Load+Error"; // Fallback
            }}
          />
        </div>
        {/* Statistics Section */}
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={statsImageUrl}
              alt={statsImageAlt}
              width={600}
              height={600}
              className="w-full max-w-sm md:max-w-md rounded-xl shadow-lg object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x600/805AD5/FFFFFF?text=Stats+Error"; // Fallback
              }}
            />
          </div>
          <div className="w-full md:w-1/2 max-w-[600px] mb-12 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {statsHeadline}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {statsParagraph}
            </p>
            <div className="grid grid-cols-2 mt-8 gap-x-8 gap-y-6">
              {statsData.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <h3
                    className={`text-4xl md:text-5xl font-extrabold mb-1 ${lightPurpleText}`}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Your Profitability Partner
            </h3>
            <p className="text-gray-600">
              At BookOne, every service is a component of a larger strategy
              aimed at increasing your revenue and efficiency. This chart
              illustrates our holistic approach, where every piece contributes
              to your bottom line. We don't just build; we build for growth.
            </p>
          </div>
          <div className="lg:col-span-3">
            <RoiChart /> {/* Render the new Chart component here */}
          </div>
        </div>
      </div>
    </section>
  );
};
