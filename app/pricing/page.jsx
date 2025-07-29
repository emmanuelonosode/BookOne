import React from "react";
import { generateMetaTags } from "../seo-config";

export const metadata = generateMetaTags({
  title: "Pricing Plans - Web Design, SEO & AI Automation Services | BookOne",
  description:
    "Choose from our flexible pricing plans for web design, SEO optimization, and AI automation services. Transparent pricing for businesses of all sizes.",
  url: "/pricing",
  keywords: [
    "web design pricing",
    "SEO services pricing",
    "AI automation pricing",
    "digital agency pricing",
    "website development cost",
    "business automation pricing",
    "BookOne pricing",
    "Nigeria digital services pricing",
  ],
});

// Reusable PricingCard component
const PricingCard = ({
  title,
  price,
  period,
  features,
  buttonText,
  isPrimary = false,
  contactLink = "#",
}) => {
  return (
    <div
      className={`
      relative bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between
      transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
      ${isPrimary ? "border-4 border-blue-600" : "border border-gray-200"}
    `}
    >
      {isPrimary && (
        <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg transform rotate-6">
          Most Popular
        </div>
      )}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-3">{title}</h3>
        {price !== "Custom" ? (
          <div className="flex items-baseline mb-6">
            <span className="text-5xl font-extrabold text-blue-600">
              ${price}
            </span>
            <span className="ml-1 text-xl font-medium text-gray-500">
              /{period}
            </span>
          </div>
        ) : (
          <p className="text-4xl font-extrabold text-blue-600 mb-6">
            Contact for Quote
          </p>
        )}

        <ul className="space-y-4 mb-8 text-gray-700">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-lg">
              <svg
                className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          className={`
          w-full py-4 px-6 rounded-xl font-semibold text-xl shadow-lg
          transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4
          ${
            isPrimary
              ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-200"
          }
        `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// Main PricingPage component for BookOne website
const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-purple-800 mb-6 leading-tight rounded-lg p-2 inline-block bg-white shadow-lg">
            Flexible Pricing Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect plan for your needs. Whether you're just starting
            out or looking for advanced solutions, BookOne has you covered.
          </p>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Starter Plan */}
          <PricingCard
            title="Starter"
            price="49"
            period="month"
            features={[
              "Basic Web Design Templates",
              "Standard SEO Setup",
              "Email Support",
              "5 Pages Website",
              "Mobile Responsiveness",
              "Monthly Analytics Report",
            ]}
            buttonText="Get Started"
          />

          {/* Business Plan (Most Popular) */}
          <PricingCard
            title="Business"
            price="149"
            period="month"
            features={[
              "Custom Web Design",
              "Advanced SEO Strategy",
              "Priority Email & Chat Support",
              "Unlimited Pages Website",
              "AI Automation Integration (Basic)",
              "Weekly Performance Reports",
              "Dedicated Account Manager",
            ]}
            buttonText="Choose Business"
            isPrimary={true}
          />

          {/* Custom Plan */}
          <PricingCard
            title="Custom"
            price="Custom" // Special value for custom tier
            period=""
            features={[
              "Tailored Web Design & Development",
              "Full-scale AI Automation",
              "Comprehensive Website Optimization",
              "Advanced SEO & Content Strategies",
              "Dedicated Development Team",
              "24/7 Premium Support",
              "On-demand Consulting",
            ]}
            buttonText="Contact for Quote"
            contactLink="/contact" // Link to a contact page
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
