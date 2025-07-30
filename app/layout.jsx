// app/layout.jsx or layout.tsx

import { Prosto_One, Poppins, Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import CookieConsent from "../app/component/CookieConsentBoss";
import "./globals.css";
import Nav from "./component/sections/nav.jsx";
import Footer from "./component/sections/Footer.jsx";
import Script from "next/script";
import GoogleAnalytics from "../lib/gtag";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const prostoOne = Prosto_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const geistSans = Geist({ subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"
  ),
  title:
    "BookOne - Professional Web Design, Development & AI Solutions for Your Business",
  description:
    "BookOne offers expert web design, development, and AI automation services to help businesses grow online, improve efficiency, and stand out.",
  keywords: [
    "business optimization",
    "digital solutions",
    "web development",
    "SEO",
    "automation",
    "BookOne",
    "AI automation",
    "content writing",
    "website optimization",
    "branding",
    "software development",
    "IT consulting",
    "growth",
    "digital marketing",
    "online presence",
  ],
  openGraph: {
    title: "BookOne | Website Design, SEO & AI Automation for Modern Brands",
    description:
      "Boost your online presence with BookOne, Nigeria's digital agency for website design, SEO optimization, AI automation, and content strategy. Grow smarter online.",
    url: "https://bookone.dev",
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BookOne - Website Design, SEO & AI Automation for Modern Brands",
      },
    ],
    locale: "en_US",
    type: "website",
    publisher: "BookOne",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookOne | Website Design, SEO & AI Automation for Modern Brands",
    description:
      "Boost your online presence with BookOne, Nigeria's digital agency for website design, SEO optimization, AI automation, and content strategy. Grow smarter online.",
    images: ["/opengraph-image.png"],
    site: "@EmmanuelOnosod1",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Google Analytics Script (gtag.js) */}
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
      <body className={`${poppins.className} antialiased`}>
        <header
          className="backdrop-blur-2xl w-full fixed z-20"
          role="banner"
          aria-label="Main Navigation"
        >
          <Nav />
        </header>

        <main aria-label="Main Content">{children}</main>

        <footer role="contentinfo" aria-label="Footer">
          <Footer />
        </footer>

        {GA_MEASUREMENT_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
          </Suspense>
        )}

        <CookieConsent />
      </body>
    </html>
  );
}
