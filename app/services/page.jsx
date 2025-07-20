import React from "react";
import Link from "next/link";

// Main ServicesPage component for BookOne website
const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 md:py-28 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-primary mb-6 leading-tight rounded-lg p-2 inline-block">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At BookOne, we offer a comprehensive suite of digital solutions
            designed to elevate your online presence and streamline your
            operations. Discover how we can help you achieve your goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Service Card: Web Design & Development */}
          <ServiceCard
            title="Web Design & Development"
            description="Crafting visually stunning, highly functional, and user-friendly websites tailored to your unique brand identity. From concept to launch, we build responsive and engaging digital experiences."
            features={[
              "Custom Website Design",
              "Responsive Development (Mobile-first)",
              "E-commerce Solutions",
              "Content Management Systems (CMS)",
              "Frontend & Backend Development",
            ]}
            icon="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" // House icon (simplified SVG path)
          />

          {/* Service Card: Business AI Automation */}
          <ServiceCard
            title="Business AI Automation"
            description="Leverage the power of Artificial Intelligence to automate repetitive tasks, optimize workflows, and gain deeper insights, driving efficiency and innovation within your business."
            features={[
              "Workflow Automation",
              "AI-Powered Analytics",
              "Customer Service Chatbots",
              "Predictive Modeling",
              "Intelligent Data Processing",
            ]}
            icon="M9 3v.5a2.5 2.5 0 0 1 5 0v-.5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2zm2 2h2v10h-2V5z" // Robot/Automation icon (simplified SVG path)
          />

          {/* Service Card: Website Optimization */}
          <ServiceCard
            title="Website Optimization"
            description="Enhance your website's performance, speed, and user experience to ensure maximum engagement and conversion rates. We fine-tune every aspect for peak efficiency."
            features={[
              "Page Speed Optimization",
              "Core Web Vitals Improvement",
              "Image & Asset Optimization",
              "Code Minification",
              "Performance Audits",
            ]}
            icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" // Tune/Performance icon (simplified SVG path)
          />

          {/* Service Card: SEO Services */}
          <ServiceCard
            title="SEO Services"
            description="Boost your online visibility and drive organic traffic to your website. Our comprehensive SEO strategies are designed to improve your search engine rankings and reach your target audience."
            features={[
              "Keyword Research & Analysis",
              "On-Page SEO Optimization",
              "Off-Page SEO (Link Building)",
              "Technical SEO Audit",
              "Content Strategy for SEO",
            ]}
            icon="M15.5 14h-.79l-.28-.27C14.76 12.83 15.3 11.57 15.3 10.2c0-3.03-2.47-5.5-5.5-5.5S4.3 7.17 4.3 10.2c0 3.03 2.47 5.5 5.5 5.5s5.5-2.47 5.5-5.5zM9.8 14.7c-2.49 0-4.5-2.01-4.5-4.5S7.31 5.7 9.8 5.7s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0 0l4.3 4.3" // Search icon (simplified SVG path)
          />

          {/* Service Card: Content Writing */}
          <ServiceCard
            title="Content Writing"
            description="Engage your audience with compelling, high-quality content that informs, educates, and converts. From blog posts to website copy, we craft words that resonate."
            features={[
              "Blog Post Writing",
              "Website Copywriting",
              "Product Descriptions",
              "SEO Content Creation",
              "Marketing Collateral",
            ]}
            icon="M19 4H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V6h14v14zM9 10h6v1.5H9zm0 2.5h6V14H9zm0 2.5h4V16H9z" // Article/Writing icon (simplified SVG path)
          />

          {/* Service Card: Custom Solutions */}
          <ServiceCard
            title="Custom Solutions"
            description="Have a unique digital challenge? We specialize in developing bespoke solutions tailored precisely to your specific needs, ensuring a perfect fit for your business."
            features={[
              "Bespoke Software Development",
              "Integration Services",
              "System Customization",
              "Strategic IT Consulting",
              "Scalable Architectures",
            ]}
            icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-6h2v6h-2zm0-8V7h2v2h-2z" // Gear/Customization icon (simplified SVG path)
          />
        </div>
      </div>
    </div>
  );
};

// Reusable ServiceCard component
const ServiceCard = ({ title, description, features, icon }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 flex flex-col justify-between border-b-4 border-light">
      <div>
        <div className="flex items-center mb-4">
          {/* Icon from Lucide React (or simple SVG for demonstration) */}
          <div className="flex-shrink-0 bg-primary p-3 rounded-full shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={icon} />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-zinc -700 ml-4">{title}</h2>
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
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
      <div className="mt-8">
        <Link href="/#contact">
          <button className="w-full bg-primary  text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Get Consultation{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesPage;
