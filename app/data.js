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
    url: "https://www.facebook.com/share/167MKuLzi3/?mibextid=wwXlfr",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/bookone-web-design-automation/",
  },
  {
    name: "X (Twitter)",
    url: "https://twitter.com/bookonedotdev",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/bookone.dev/",
  },
];