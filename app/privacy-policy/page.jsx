import React from "react";

// Reusable LegalDocCard component
const LegalDocCard = ({ title, description, link }) => {
  return (
    <div
      className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between
      transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
      border border-gray-200"
    >
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      </div>
      <div className="mt-auto">
        <a
          href={link}
          className="inline-block w-full text-center py-3 px-6 rounded-xl font-semibold text-xl shadow-lg
          transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
          bg-blue-600 text-white hover:bg-blue-700"
        >
          View Document
        </a>
      </div>
    </div>
  );
};

// Main LegalPage component for BookOne website
const LegalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-6 leading-tight rounded-lg p-2 inline-block bg-white shadow-lg">
            Legal Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trust is important to us. Here you can find important legal
            documents that govern your use of BookOne's services.
          </p>
        </div>

        {/* Legal Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Privacy Policy Card */}
          <LegalDocCard
            title="Privacy Policy"
            description="Understand how BookOne collects, uses, protects, and handles your personal information when you use our website and services."
            link="/privacy-policy"
          />

          {/* Terms of Service Card */}
          <LegalDocCard
            title="Terms of Service"
            description="Read the terms and conditions that govern your use of the BookOne platform, outlining your rights and responsibilities as a user."
            link="/terms-of-service"
          />

          {/* Cookie Policy Card */}
          <LegalDocCard
            title="Cookie Policy"
            description="Learn about how BookOne uses cookies and similar tracking technologies to enhance your browsing experience and analyze site usage."
            link="/cookie-policy"
          />
        </div>

        {/* Additional Legal Info (Optional) */}
        <div className="mt-16 text-center text-gray-600">
          <p className="mb-4">
            For any questions regarding these documents or other legal
            inquiries, please don't hesitate to contact our support team.
          </p>
          <a
            href="/contact" // Link to your contact page
            className="inline-block bg-blue-100 text-blue-700 font-semibold py-3 px-8 rounded-xl shadow-md
            transition-all duration-300 transform hover:scale-105 hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
