"use client";
import React, { useState, useCallback, memo } from "react";
import {
  Mail,
  Phone,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";

// Memoized contact data
const contactMethods = [
  {
    icon: <Mail className="w-6 h-6 text-white" />,
    label: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours",
    value: "officialbookone@gmail.com",
    href: "mailto:officialbookone@gmail.com",
    cta: "Send Email",
    responseTime: "24 hours",
    type: "email",
  },
  {
    icon: <Phone className="w-6 h-6 text-white" />,
    label: "Call Us",
    description:
      "Speak directly with our team during business hours (9 AM - 6 PM WAT)",
    value: "+234 807 708 0903",
    href: "tel:+2348077080903",
    cta: "Call Now",
    responseTime: "Immediate",
    type: "phone",
  },
];

// Memoized benefits list
const benefits = [
  "Free 30-minute consultation",
  "Custom project roadmap",
  "Transparent pricing",
  "No hidden fees",
  "Quick turnaround time",
];

// Memoized ContactCard component
const ContactCard = memo(({ contact, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    // Track conversion event here if needed
    setTimeout(() => setIsClicked(false), 200);
  }, []);

  return (
    <Link
      href={contact.href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        block bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 
        shadow-lg border border-white/40 group transition-all duration-300
        hover:shadow-2xl hover:border-white/60 hover:-translate-y-1
        ${isClicked ? "scale-95" : "scale-100"}
        relative overflow-hidden
      `}
    >
      {/* Animated background */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5
          transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }
        `}
      />

      {/* Response time badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          <Clock className="w-3 h-3" />
          {contact.responseTime}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
        {/* Icon */}
        <div
          className={`
            w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 
            flex items-center justify-center flex-shrink-0 
            transition-transform duration-300
            ${isHovered ? "scale-110 rotate-3" : "scale-100"}
          `}
        >
          {contact.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
            {contact.label}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
            {contact.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-purple-600 font-semibold text-lg sm:text-xl break-all sm:break-normal">
              {contact.value}
            </p>
            <span
              className={`
                inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 
                rounded-lg font-medium text-sm transition-all duration-300
                ${isHovered ? "bg-purple-200 translate-x-1" : ""}
              `}
            >
              {contact.cta}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

// Memoized BenefitItem component
const BenefitItem = memo(({ benefit, index }) => (
  <div
    className="flex items-center gap-3 text-purple-100"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
    <span className="text-sm sm:text-base">{benefit}</span>
  </div>
));

function Contact() {
  const [ctaClicked, setCtaClicked] = useState("");

  const handleCtaClick = useCallback((type) => {
    setCtaClicked(type);
    setTimeout(() => setCtaClicked(""), 200);
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden py-12 sm:py-16 lg:py-20"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 sm:-right-48 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 sm:-left-48 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl" />
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 sm:mb-6 leading-tight">
          Ready to bring your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-medium">
            business
          </span>{" "}
          online?
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
          Let's talk about how BookOne can help you launch smarter and faster.
          We're here to transform your digital presence with measurable results.
        </p>

        {/* Social proof */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>50+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>24hr Response Time</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Free Consultation</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Contact Method Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {contactMethods.map((contact, index) => (
              <ContactCard key={index} contact={contact} index={index} />
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent" />
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

            <div className="relative z-10">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-purple-100 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
                  Join 50+ businesses that have transformed their digital
                  presence with BookOne. Start your journey today with a free
                  consultation.
                </p>

                {/* Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-w-lg mx-auto mb-8">
                  {benefits.map((benefit, index) => (
                    <BenefitItem key={index} benefit={benefit} index={index} />
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <button
                  onClick={() => handleCtaClick("pricing")}
                  className={`
                    bg-white text-purple-600 px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg 
                    hover:bg-purple-50 transition-all duration-300 relative overflow-hidden group
                    ${ctaClicked === "pricing" ? "scale-95" : "scale-100"}
                    flex-1 sm:flex-none
                  `}
                >
                  <Link
                    href="/get-started"
                    className="flex items-center justify-center gap-2 w-full"
                    aria-label="Get started - View pricing and begin your project"
                  >
                    <span>View Pricing & Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </button>

                <button
                  onClick={() => handleCtaClick("consultation")}
                  className={`
                    border-2 border-white text-white px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg 
                    hover:bg-white hover:text-purple-600 transition-all duration-300 group
                    ${ctaClicked === "consultation" ? "scale-95" : "scale-100"}
                    flex-1 sm:flex-none
                  `}
                >
                  <Link
                    href="https://calendar.notion.so/meet/officialbookone/call"
                    className="flex items-center justify-center gap-2 w-full"
                    aria-label="Schedule free consultation - Book a call with our team"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Free Consultation</span>
                  </Link>
                </button>
              </div>

              {/* Additional trust signals */}
              <div className="text-center mt-6 sm:mt-8">
                <p className="text-purple-200 text-sm">
                  🔒 No spam, no commitments. Just honest advice to help your
                  business grow.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mt-12 sm:mt-16 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              We're here to help! Check out our frequently asked questions or
              reach out directly.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              View FAQ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
