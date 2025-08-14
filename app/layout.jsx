// app/layout.jsx or layout.tsx

import { Poppins, Roboto } from "next/font/google";
import CookieConsent from "./component/CookieConsentBoss";
import "./globals.css";
import Nav from "./component/sections/nav.jsx";
import Footer from "./component/sections/Footer.jsx";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Optimize font loading with minimal weights and preloading
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Reduced weights for faster loading
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Reduced weights for faster loading
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
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
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />

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
        className={`${poppins.className} ${roboto.className} antialiased`}
        suppressHydrationWarning
      >
        <Nav />

        <main aria-label="Main Content">{children}</main>

        <Footer />

        <CookieConsent />
      </body>
    </html>
  );
}
