import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

initOpenNextCloudflareForDev();
export default nextConfig;
