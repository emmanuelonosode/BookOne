// app/layout.jsx or layout.tsx

import { Playfair_Display, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Display serif — headlines, big moments
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  variable: "--font-display",
});

// Body sans — all UI text
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-sans",
});

import Nav from "./component/sections/Nav.jsx";

const Footer = dynamic(() => import("./component/sections/Footer.jsx"), {
  ssr: true,
  loading: () => (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-32 bg-gray-800 animate-pulse rounded"></div>
      </div>
    </footer>
  ),
});

const CookieConsent = dynamic(() => import("./component/CookieConsentBoss"), {
  ssr: true, // SSR enabled for better performance
  loading: () => null,
});

// Remove conflicting metadata - let individual pages define their own metadata
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"
  ),
  title: {
    default: "BookOne — Web Design, SEO & AI Automation Agency",
    template: "%s | BookOne",
  },
  description:
    "BookOne is a digital agency specializing in web design, SEO optimization, and AI automation to help businesses grow online.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect for critical resources */}
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Resource hints for better performance */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />

        {/* Google Analytics Script (gtag.js) - Load with lowest priority */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
              id="google-analytics"
            />
            <Script
              id="google-analytics-init"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${dmSans.className} antialiased bg-[#080808] text-slate-50`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-[#6b46c1] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>

        <Nav />

        <main id="main-content" aria-label="Main Content" className="min-h-screen">
          {children}
        </main>

        <Footer />

        <CookieConsent />
      </body>
    </html>
  );
}
