// app/layout.jsx or layout.tsx

import { Poppins, Roboto, Montserrat } from "next/font/google";
import CookieConsent from "./component/CookieConsentBoss";
import "./globals.css";
import Nav from "./component/sections/nav.jsx";
import Footer from "./component/sections/Footer.jsx";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Optimize font loading with minimal weights and preloading
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Optimized weights
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Optimized weights
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-roboto",
});

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Optimized weights
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-montserrat",
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
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${poppins.variable} ${roboto.variable} ${mont.variable}`}>
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Analytics Script (gtag.js) - Load after page becomes interactive */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
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
        className={`${poppins.className} antialiased bg-white`}
        suppressHydrationWarning
      >
        <Nav />

        <main aria-label="Main Content" className="min-h-screen">{children}</main>

        <Footer />

        <CookieConsent />
      </body>
    </html>
  );
}
