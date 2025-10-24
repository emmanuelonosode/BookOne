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
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <g>
          <path
            d="M127.999746,23.06353 C162.177385,23.06353 166.225393,23.1936027 179.722476,23.8094161 C192.20235,24.3789926 198.979853,26.4642218 203.490736,28.2166477 C209.464938,30.5386501 213.729395,33.3128586 218.208268,37.7917319 C222.687141,42.2706052 225.46135,46.5350617 227.782844,52.5092638 C229.535778,57.0201472 231.621007,63.7976504 232.190584,76.277016 C232.806397,89.7746075 232.93647,93.8226147 232.93647,128.000254 C232.93647,162.177893 232.806397,166.225901 232.190584,179.722984 C231.621007,192.202858 229.535778,198.980361 227.782844,203.491244 C225.46135,209.465446 222.687141,213.729903 218.208268,218.208776 C213.729395,222.687649 209.464938,225.461858 203.490736,227.783352 C198.979853,229.536286 192.20235,231.621516 179.722476,232.191092 C166.227425,232.806905 162.179418,232.936978 127.999746,232.936978 C93.8200742,232.936978 89.772067,232.806905 76.277016,232.191092 C63.7971424,231.621516 57.0196391,229.536286 52.5092638,227.783352 C46.5345536,225.461858 42.2700971,222.687649 37.7912238,218.208776 C33.3123505,213.729903 30.538142,209.465446 28.2166477,203.491244 C26.4637138,198.980361 24.3784845,192.202858 23.808908,179.723492 C23.1930946,166.225901 23.0630219,162.177893 23.0630219,128.000254 C23.0630219,93.8226147 23.1930946,89.7746075 23.808908,76.2775241 C24.3784845,63.7976504 26.4637138,57.0201472 28.2166477,52.5092638 C30.538142,46.5350617 33.3123505,42.2706052 37.7912238,37.7917319 C42.2700971,33.3128586 46.5345536,30.5386501 52.5092638,28.2166477 C57.0196391,26.4642218 63.7971424,24.3789926 76.2765079,23.8094161 C89.7740994,23.1936027 93.8221066,23.06353 127.999746,23.06353 M127.999746,0 C93.2367791,0 88.8783247,0.147348072 75.2257637,0.770274749 C61.601148,1.39218523 52.2968794,3.55566141 44.1546281,6.72008828 C35.7374966,9.99121548 28.5992446,14.3679613 21.4833489,21.483857 C14.3674532,28.5997527 9.99070739,35.7380046 6.71958019,44.1551362 C3.55515331,52.2973875 1.39167714,61.6016561 0.769766653,75.2262718 C0.146839975,88.8783247 0,93.2372872 0,128.000254 C0,162.763221 0.146839975,167.122183 0.769766653,180.774236 C1.39167714,194.398852 3.55515331,203.703121 6.71958019,211.845372 C9.99070739,220.261995 14.3674532,227.400755 21.4833489,234.516651 C28.5992446,241.632547 35.7374966,246.009293 44.1546281,249.28042 C52.2968794,252.444847 61.601148,254.608323 75.2257637,255.230233 C88.8783247,255.85316 93.2367791,256 127.999746,256 C162.762713,256 167.121675,255.85316 180.773728,255.230233 C194.398344,254.608323 203.702613,252.444847 211.844864,249.28042 C220.261995,246.009293 227.400247,241.632547 234.516143,234.516651 C241.632039,227.400755 246.008785,220.262503 249.279912,211.845372 C252.444339,203.703121 254.607815,194.398852 255.229725,180.774236 C255.852652,167.122183 256,162.763221 256,128.000254 C256,93.2372872 255.852652,88.8783247 255.229725,75.2262718 C254.607815,61.6016561 252.444339,52.2973875 249.279912,44.1551362 C246.008785,35.7380046 241.632039,28.5997527 234.516143,21.483857 C227.400247,14.3679613 220.261995,9.99121548 211.844864,6.72008828 C203.702613,3.55566141 194.398344,1.39218523 180.773728,0.770274749 C167.121675,0.147348072 162.762713,0 127.999746,0 Z M127.999746,62.2703115 C91.698262,62.2703115 62.2698034,91.69877 62.2698034,128.000254 C62.2698034,164.301738 91.698262,193.730197 127.999746,193.730197 C164.30123,193.730197 193.729689,164.301738 193.729689,128.000254 C193.729689,91.69877 164.30123,62.2703115 127.999746,62.2703115 Z M127.999746,170.667175 C104.435741,170.667175 85.3328252,151.564259 85.3328252,128.000254 C85.3328252,104.436249 104.435741,85.3333333 127.999746,85.3333333 C151.563751,85.3333333 170.666667,104.436249 170.666667,128.000254 C170.666667,151.564259 151.563751,170.667175 127.999746,170.667175 Z M211.686338,59.6734287 C211.686338,68.1566129 204.809755,75.0337031 196.326571,75.0337031 C187.843387,75.0337031 180.966297,68.1566129 180.966297,59.6734287 C180.966297,51.1902445 187.843387,44.3136624 196.326571,44.3136624 C204.809755,44.3136624 211.686338,51.1902445 211.686338,59.6734287 Z"
          ></path>
        </g>
      </svg>
    ),
    url: "https://www.instagram.com/bookone.dev/",
  },
];
