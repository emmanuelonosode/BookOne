// data.js
import {
  Code,
  Search,
  Bot,
  FileText,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  BarChart3,
  Target,
  DollarSign,
  Zap,
  Rocket,
  Users,
  Award,
  Star,
} from "lucide-react";

export const mainServices = [
  {
    id: "website",
    icon: Code,
    title: "Website Design & Development",
    subtitle: "Modern, fast, conversion-optimized",
    color: "violet",
    bgGradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    textColor: "text-violet-600",
    description:
      "Fast, responsive websites built with modern technology and optimized for conversions and search engines.",
    keyFeatures: ["React/Next.js", "95+ Lighthouse", "Mobile-First"],
    services: [
      {
        title: "Modern & Responsive Design",
        description:
          "Mobile-first, accessible design that works on all devices and screen sizes",
        features: [
          "Mobile-optimized",
          "Fast loading",
          "Cross-browser compatible",
        ],
      },
      {
        title: "SEO & Performance Optimized",
        description:
          "Built for speed and search engines with 95+ Lighthouse scores",
        features: [
          "Core Web Vitals optimized",
          "Schema markup",
          "Image optimization",
        ],
      },
      {
        title: "Content Management System",
        description:
          "User-friendly CMS with professional content writing included",
        features: ["Easy updates", "SEO-friendly", "Professional copywriting"],
      },
    ],
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Performance",
    subtitle: "Data-driven visibility growth",
    color: "emerald",
    bgGradient: "from-emerald-500 to-green-600",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-600",
    description:
      "Boost visibility and attract quality leads with data-driven SEO strategies that deliver measurable results.",
    keyFeatures: [
      "Strategic Research",
      "Technical Audits",
      "Performance Analytics",
    ],
    services: [
      {
        title: "Strategic Keyword Research",
        description:
          "Data-driven keyword strategy targeting your ideal customers",
        impact: "3x more qualified traffic",
      },
      {
        title: "Technical SEO Audit",
        description:
          "Complete site optimization for speed and search visibility",
        impact: "50% faster load times",
      },
      {
        title: "Performance Analytics",
        description:
          "Monthly reports with actionable insights and recommendations",
        impact: "Track ROI and growth",
      },
    ],
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Automation & Integration",
    subtitle: "24/7 intelligent workflows",
    color: "blue",
    bgGradient: "from-blue-500 to-cyan-600",
    lightBg: "bg-blue-50",
    textColor: "text-blue-600",
    description:
      "Streamline operations with intelligent AI assistants and automated workflows that work 24/7.",
    keyFeatures: ["AI Chatbots", "Smart Workflows", "System Integrations"],
    services: [
      {
        icon: MessageSquare,
        title: "AI Chatbots",
        description: "24/7 customer support with booking and FAQ automation",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        icon: RefreshCw,
        title: "Smart Workflows",
        description: "Automated lead nurturing and appointment reminders",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        icon: ExternalLink,
        title: "System Integrations",
        description:
          "Connect WhatsApp, CRM, email, and business tools seamlessly",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        icon: BarChart3,
        title: "Training & Support",
        description: "Complete setup with hands-on training and documentation",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
    ],
  },
  {
    id: "content",
    icon: FileText,
    title: "Content That Converts",
    subtitle: "Strategic storytelling & copy",
    color: "purple",
    bgGradient: "from-purple-500 to-indigo-600",
    lightBg: "bg-purple-50",
    textColor: "text-purple-600",
    description:
      "Strategic content creation that tells your story, ranks in search, and drives real business results.",
    keyFeatures: ["Converting Copy", "SEO Content", "Brand Voice"],
    services: [
      {
        title: "Website Copy That Converts",
        description:
          "Persuasive homepage, about, and service pages that turn visitors into customers",
        bgColor: "bg-gradient-to-br from-violet-600 to-purple-700",
        results: "Up to 40% higher conversion rates",
      },
      {
        title: "SEO Content Strategy",
        description:
          "Blog articles and landing pages optimized to rank and attract your audience",
        bgColor: "bg-gradient-to-br from-purple-600 to-indigo-700",
        results: "300% increase in organic traffic",
      },
      {
        title: "Brand Voice Development",
        description:
          "Consistent messaging that reflects your unique personality across all channels",
        bgColor: "bg-gradient-to-br from-indigo-600 to-violet-700",
        results: "Stronger brand recognition",
      },
    ],
  },
];

export const processSteps = [
  {
    icon: Target,
    title: "Discovery & Strategy",
    description:
      "Deep dive into your goals, target audience, and competitive landscape",
    duration: "1-2 days",
  },
  {
    icon: DollarSign,
    title: "Proposal & Agreement",
    description:
      "Transparent pricing, detailed timeline, and clear project scope",
    duration: "1 day",
  },
  {
    icon: Zap,
    title: "Design & Development",
    description:
      "Collaborative creation process with regular updates and feedback loops",
    duration: "2-4 weeks",
  },
  {
    icon: Rocket,
    title: "Launch & Optimization",
    description:
      "Deployment, testing, training, and ongoing performance monitoring",
    duration: "1 week + ongoing",
  },
];

export const impactHighlights = [
  { icon: Users, label: "Happy Clients", value: "100+" },
  { icon: Award, label: "Projects Completed", value: "100+" },
  { icon: Star, label: "5-Star Reviews", value: "98%" },
];

export const companySocialLinks = [
  {
    name: "Facebook",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    url: "https://www.facebook.com/share/167MKuLzi3/?mibextid=wwXlfr",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    url: "https://www.linkedin.com/company/bookone-web-design-automation/",
  },
  {
    name: "X (Twitter)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    url: "https://twitter.com/bookonedotdev",
  },
  {
    name: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-instagram-icon lucide-instagram"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    url: "https://www.instagram.com/bookone.dev/",
  },
];
