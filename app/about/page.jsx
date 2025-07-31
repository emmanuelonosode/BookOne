import React from "react";
import Image from "next/image";
import Link from "next/link";
import { generateMetaTags } from "../seo-config";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

export const metadata = generateMetaTags({
  title:
    "About BookOne - Our Story, Mission & Team | Web Design & AI Automation",
  description:
    "Discover BookOne's journey from a passion project to a leading digital agency. Learn about our mission, team, and commitment to transforming businesses through innovative web design and AI automation.",
  url: "/about",
  keywords: [
    "about BookOne",
    "BookOne team",
    "digital agency Nigeria",
    "web design company",
    "AI automation services",
    "Emmanuel Onosode",
    "digital transformation",
    "business automation",
    "web development agency",
  ],
});

export default function AboutPage() {
  const stats = [
    { number: "50+", label: "Projects Delivered", icon: "📊" },
    { number: "98%", label: "Client Satisfaction", icon: "⭐" },
    { number: "5+", label: "Years Experience", icon: "🚀" },
    { number: "24/7", label: "Support Available", icon: "🛟" },
  ];

  const values = [
    {
      title: "Innovation First",
      description:
        "We stay ahead of digital trends to deliver cutting-edge solutions that future-proof your business.",
      icon: "🚀",
    },
    {
      title: "Results Driven",
      description:
        "Every strategy, design, and line of code is optimized for measurable business growth and ROI.",
      icon: "📈",
    },
    {
      title: "Client Partnership",
      description:
        "We don't just build websites—we build lasting partnerships focused on your long-term success.",
      icon: "🤝",
    },
    {
      title: "Quality Excellence",
      description:
        "From initial concept to final deployment, we maintain the highest standards of quality and performance.",
      icon: "💎",
    },
  ];

  const team = [
    {
      name: "Emmanuel Onosode",
      role: "Founder & CEO",
      image: "/ceo.jpg",
      bio: "Visionary leader with 5+ years in digital transformation. Emmanuel's strategic approach has helped dozens of businesses achieve 300%+ growth through smart automation and design.",
      expertise: [
        "Strategic Planning",
        "Digital Transformation",
        "Business Growth",
      ],
    },
    {
      name: "Jackson Fisher",
      role: "Technical Project Manager",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "Engineering excellence meets flawless execution. Jackson ensures every project delivers on time, on budget, and exceeds expectations with his agile methodology expertise.",
      expertise: [
        "Project Management",
        "System Architecture",
        "Quality Assurance",
      ],
    },
    {
      name: "Ava Thompson",
      role: "AI Automation Strategist",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "AI automation expert who's saved clients 1000+ hours monthly through intelligent workflow design. Ava transforms complex processes into seamless, profitable systems.",
      expertise: [
        "AI Integration",
        "Workflow Automation",
        "Process Optimization",
      ],
    },
    {
      name: "Elijah Brooks",
      role: "Brand & Motion Designer",
      image: "https://randomuser.me/api/portraits/men/83.jpg",
      bio: "Creative powerhouse behind award-winning brand identities. Elijah's designs don't just look stunning—they convert visitors into customers and build lasting brand loyalty.",
      expertise: ["Brand Design", "Motion Graphics", "UX/UI Design"],
    },
    {
      name: "Ellie Bennett",
      role: "Content & SEO Strategist",
      image: "https://randomuser.me/api/portraits/women/34.jpg",
      bio: "SEO strategist who's driven 500%+ organic traffic growth for clients. Ellie combines data-driven insights with compelling storytelling to dominate search rankings.",
      expertise: ["SEO Strategy", "Content Marketing", "Performance Analytics"],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Trusted by 50+ Growing Businesses
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              We Turn Ideas Into
              <span className="block">Digital Success</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              BookOne is where ambitious businesses transform their digital
              presence. We combine strategic thinking, cutting-edge technology,
              and proven methodologies to deliver results that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Your Project Today
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission: Your Success
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We exist to bridge the gap between ambitious business goals and
                digital reality. Every website we build, every automation we
                implement, and every strategy we craft is designed with one
                purpose: <strong>accelerating your business growth</strong>.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                In a world where digital presence determines business success,
                we ensure you're not just keeping up—you're leading the pack.
              </p>
              <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
                <p className="text-blue-800 font-semibold mb-2">Our Promise</p>
                <p className="text-gray-700">
                  "We don't just deliver projects—we deliver results that
                  transform your business and position you for sustainable,
                  long-term success."
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-xl"></div>
              <img
                className="relative w-full h-96 object-cover rounded-2xl shadow-lg"
                src="/about-team.jpg"
                alt="BookOne team collaborating on digital solutions"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Drives Everything We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values aren't just words on a wall—they're the foundation
              of every project, every client relationship, and every success
              story we create together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            From Vision to Reality
          </h2>
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              BookOne started with a powerful observation: talented businesses
              across Africa were being held back by outdated digital strategies
              and cookie-cutter solutions that didn't understand their unique
              challenges.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our founder Emmanuel recognized that success in today's market
              requires more than just a website—it demands a comprehensive
              digital ecosystem that works as hard as you do. That's when
              BookOne was born.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to be the strategic partner that ambitious
              businesses trust to transform their digital presence and unlock
              new levels of growth. Every client success story fuels our passion
              to push boundaries and deliver exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet the Experts Behind Your Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of strategists, designers, and developers brings
              together decades of experience and a shared passion for delivering
              exceptional results.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <Image
                    src={member.image}
                    width={100}
                    height={100}
                    alt={member.name}
                    className="rounded-full mx-auto border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    {member.bio}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join the growing list of successful businesses who've partnered with
            BookOne to achieve remarkable digital growth. Your success story
            starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            >
              Get Your Free Strategy Session
            </Link>
            <Link
              href="/case-studies"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              See Our Success Stories
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            ✅ Free consultation • ✅ No obligation • ✅ Immediate actionable
            insights
          </p>
        </div>
      </section>
    </div>
  );
}
