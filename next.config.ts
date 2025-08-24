import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Enable standalone build for Cloudflare Workers
  output: "standalone",

  // Core performance settings
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  productionBrowserSourceMaps: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "@sanity/image-url",
      "date-fns",
      "chart.js",
    ],
    optimizeCss: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: ["@sanity/client"],

  // Turbopack configuration for development
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Image optimization settings
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable modern image formats
    unoptimized: false,
    // Optimize for performance
    loader: "default",
    loaderFile: undefined,
  },

  // Advanced Webpack optimization
  webpack: (config, { dev, isServer, webpack }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Advanced bundle splitting
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          // Vendor chunks
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
          },
          // Framer Motion (heavy library)
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer-motion",
            chunks: "all",
            priority: 20,
            reuseExistingChunk: true,
          },
          // Sanity CMS
          sanity: {
            test: /[\\/]node_modules[\\/]@sanity[\\/]/,
            name: "sanity",
            chunks: "all",
            priority: 15,
            reuseExistingChunk: true,
          },
          // Chart.js
          charts: {
            test: /[\\/]node_modules[\\/]chart\.js[\\/]/,
            name: "charts",
            chunks: "all",
            priority: 15,
            reuseExistingChunk: true,
          },
          // React and React DOM
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
            priority: 25,
            reuseExistingChunk: true,
          },
          // Common utilities
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };

      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Optimize module resolution
      config.resolve.modules = ["node_modules"];
      config.resolve.extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];

      // Add performance hints
      config.performance = {
        hints: "warning",
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      };
    }

    // Optimize SVG loading
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Add compression plugin for production
    if (!dev && !isServer) {
      const CompressionPlugin = require("compression-webpack-plugin");
      config.plugins.push(
        new CompressionPlugin({
          filename: "[path][base].gz",
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }

    // Optimize for Cloudflare Workers
    if (!dev && isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "node:fs": "commonjs node:fs",
        "node:path": "commonjs node:path",
        "node:os": "commonjs node:os",
      });
    }

    return config;
  },

  // Custom headers for security & caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Performance headers
          { key: "X-Response-Time", value: "0" },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      // Font optimization
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for performance
  async redirects() {
    return [
      // Redirect www to non-www for better performance
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.bookone.dev",
          },
        ],
        destination: "https://bookone.dev/:path*",
        permanent: true,
      },
    ];
  },

  // Rewrites for performance
  async rewrites() {
    return [
      // Optimize API routes
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

initOpenNextCloudflareForDev();
export default nextConfig;
