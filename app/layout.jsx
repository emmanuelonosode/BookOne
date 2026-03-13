// app/layout.jsx or layout.tsx

import { Poppins, Roboto, Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Optimize font loading with minimal weights and preloading
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Reduced weights for better performance
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"], // Reduced weights
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-roboto",
});

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Reduced weights
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-montserrat",
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
  // Basic metadata that applies to all pages
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
      className={`${poppins.variable} ${roboto.variable} ${mont.variable}`}
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
                    send_page_view: false, // Disable automatic page view tracking
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${poppins.className} antialiased bg-[#0B0B0E] text-slate-50`}
        suppressHydrationWarning
      >
        <Nav />

        <main aria-label="Main Content" className="min-h-screen">
          {children}
        </main>

        <Footer />

        <CookieConsent />
      </body>
    </html>
  );
}
