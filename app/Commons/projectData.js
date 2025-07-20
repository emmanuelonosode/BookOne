// Project data for BookOne portfolio
export const projects = [
  {
    slug: "harmony-health-redesign",
    title: "Harmony Health Website Redesign",
    category: "Web Design",
    overview:
      "A complete overhaul of a healthcare provider's online presence, focusing on user experience, appointment scheduling, and responsive design.",
    challenge:
      "The existing website was outdated, difficult to navigate, and not mobile-friendly. Patients struggled to book appointments and find information quickly.",
    whatWeDid: [
      "Conducted comprehensive UX research and user interviews",
      "Designed a modern, accessible interface with clear navigation",
      "Implemented online appointment booking system",
      "Created responsive design for all devices",
      "Integrated patient portal functionality",
    ],
    results: [
      "40% increase in online appointment bookings",
      "60% reduction in bounce rate",
      "85% improvement in mobile user satisfaction",
      "50% faster page load times",
    ],
    images: ["/port-1.avif", "/port-2.avif", "/port-3.avif"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    liveUrl: "https://harmonyhealth.com",
    testimonial: {
      quote:
        "BookOne transformed our online presence completely. Our patients can now easily book appointments and find information, which has significantly improved our patient satisfaction scores.",
      author: "Dr. Sarah Johnson",
      role: "Medical Director, Harmony Health",
    },
  },
  {
    slug: "techstartup-seo-campaign",
    title: "TechStartup SEO & Marketing Campaign",
    category: "SEO & Marketing",
    overview:
      "Comprehensive SEO and marketing strategy for a B2B SaaS company to increase organic traffic and generate qualified leads.",
    challenge:
      "The company had great products but struggled with online visibility and lead generation. Their website wasn't ranking for relevant keywords and lacked conversion optimization.",
    whatWeDid: [
      "Conducted comprehensive SEO audit and keyword research",
      "Optimized website structure and content for target keywords",
      "Implemented conversion rate optimization strategies",
      "Created content marketing strategy with blog series",
      "Set up Google Analytics and conversion tracking",
    ],
    results: [
      "300% increase in organic traffic within 6 months",
      "150% improvement in lead generation",
      "Top 3 rankings for 25+ target keywords",
      "40% increase in conversion rate",
    ],
    images: ["/chart.webp", "/port-4.avif", "/port-5.avif"],
    techStack: [
      "Google Analytics",
      "Google Search Console",
      "SEMrush",
      "Hotjar",
      "HubSpot",
    ],
    liveUrl: "https://techstartup.com",
    testimonial: {
      quote:
        "BookOne's SEO strategy completely transformed our online presence. We're now generating qualified leads consistently and our organic traffic has grown exponentially.",
      author: "Mike Chen",
      role: "CEO, TechStartup",
    },
  },
  {
    slug: "retail-ai-automation",
    title: "Retail AI Customer Support Automation",
    category: "AI Automation",
    overview:
      "Implemented an AI-driven chatbot and automation system for a retail client to improve customer support efficiency and satisfaction.",
    challenge:
      "The retail company was overwhelmed with customer support tickets, leading to long response times and frustrated customers. Manual processes were inefficient and costly.",
    whatWeDid: [
      "Analyzed customer support workflows and pain points",
      "Designed AI chatbot with natural language processing",
      "Integrated with existing CRM and ticketing systems",
      "Implemented automated response routing and escalation",
      "Created analytics dashboard for support metrics",
    ],
    results: [
      "70% reduction in support ticket volume",
      "90% improvement in response time (from 24h to 2h average)",
      "85% customer satisfaction with AI responses",
      "40% reduction in support costs",
    ],
    images: ["/busyman.webp", "/port-1.avif", "/port-2.avif"],
    techStack: ["OpenAI GPT-4", "Python", "Node.js", "MongoDB", "Zendesk API"],
    liveUrl: "https://retail-automation-demo.com",
    testimonial: {
      quote:
        "The AI automation system from BookOne revolutionized our customer support. We can now handle 10x more inquiries with better customer satisfaction.",
      author: "Lisa Rodriguez",
      role: "Customer Success Manager",
    },
  },
  {
    slug: "ecommerce-performance-boost",
    title: "E-commerce Performance Boost",
    category: "Web Design",
    overview:
      "Optimized a large e-commerce platform, achieving significant improvements in page load speed and conversion rates across all devices.",
    challenge:
      "The e-commerce site was experiencing slow load times, poor mobile experience, and low conversion rates. Customers were abandoning their carts due to performance issues.",
    whatWeDid: [
      "Conducted comprehensive performance audit",
      "Optimized images and implemented lazy loading",
      "Implemented CDN and caching strategies",
      "Redesigned mobile-first responsive layout",
      "Optimized checkout process and payment flow",
    ],
    results: [
      "40% improvement in page load speed",
      "35% increase in mobile conversion rate",
      "50% reduction in cart abandonment",
      "25% increase in average order value",
    ],
    images: ["/port-3.avif", "/port-4.avif", "/port-5.avif"],
    techStack: ["Next.js", "Vercel", "Cloudflare", "Stripe", "Redis"],
    liveUrl: "https://ecommerce-demo.com",
    testimonial: {
      quote:
        "BookOne's performance optimization work transformed our online store. The faster load times and better mobile experience have directly impacted our sales.",
      author: "David Thompson",
      role: "E-commerce Director",
    },
  },
  {
    slug: "local-business-seo-success",
    title: "Local Business SEO Success",
    category: "SEO & Marketing",
    overview:
      "Developed and executed an SEO strategy for a local restaurant, resulting in top rankings for key local keywords and increased online reservations.",
    challenge:
      "The restaurant was struggling to compete with larger chains in local search results. They had no online presence and were missing out on potential customers.",
    whatWeDid: [
      "Conducted local SEO audit and competitor analysis",
      "Optimized Google My Business profile and local citations",
      "Created location-specific content and landing pages",
      "Implemented local link building strategy",
      "Set up online reservation system and tracking",
    ],
    results: [
      "50% increase in online reservations",
      "Top 3 rankings for 15+ local keywords",
      "200% increase in local search visibility",
      "40% improvement in customer reviews",
    ],
    images: ["/port-1.avif", "/port-2.avif", "/port-3.avif"],
    techStack: [
      "Google My Business",
      "Yelp",
      "Local citations",
      "Schema markup",
      "Google Analytics",
    ],
    liveUrl: "https://restaurant-demo.com",
    testimonial: {
      quote:
        "BookOne helped us dominate local search results. We're now the top result for 'restaurant near me' searches in our area, and our online reservations have skyrocketed.",
      author: "Maria Garcia",
      role: "Owner, Local Restaurant",
    },
  },
  {
    slug: "manufacturing-process-automation",
    title: "Manufacturing Process Automation",
    category: "AI Automation",
    overview:
      "Designed and developed a custom automation system for a manufacturing client to streamline their production tracking and quality control.",
    challenge:
      "The manufacturing company was using manual processes for quality control and production tracking, leading to errors, delays, and inconsistent product quality.",
    whatWeDid: [
      "Analyzed manufacturing workflows and quality control processes",
      "Designed AI-powered quality inspection system",
      "Implemented real-time production tracking dashboard",
      "Created automated reporting and alert system",
      "Integrated with existing ERP and MES systems",
    ],
    results: [
      "95% reduction in quality control errors",
      "60% faster production cycle times",
      "Real-time visibility into production status",
      "30% reduction in operational costs",
    ],
    images: ["/port-4.avif", "/port-5.avif", "/busyman.webp"],
    techStack: [
      "Computer Vision AI",
      "Python",
      "React",
      "PostgreSQL",
      "IoT sensors",
    ],
    liveUrl: "https://manufacturing-automation-demo.com",
    testimonial: {
      quote:
        "The automation system from BookOne has revolutionized our manufacturing process. We can now track quality in real-time and have eliminated most manual errors.",
      author: "Robert Wilson",
      role: "Operations Manager",
    },
  },
];

// Helper function to get projects by category
export const getProjectsByCategory = (category) => {
  if (category === "All") return projects;
  return projects.filter((project) => project.category === category);
};

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};

// Get unique categories
export const getCategories = () => {
  const categories = [...new Set(projects.map((project) => project.category))];
  return ["All", ...categories];
};
