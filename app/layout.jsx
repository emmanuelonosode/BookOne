// import { Prosto_One, Poppins, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Nav from "./component/sections/nav.jsx";
import Footer from "./component/sections/Footer.jsx";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
// });

// const prostoOne = Prosto_One({
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
// });

// const geistSans = Geist({
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata = {
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
    title: "BookOne Your Business",
    description: "The leading business digital optimizer",
    url: "https://bookone.dev",
    siteName: "BookOne",
    images: [
      {
        url: "https://bookone.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BookOne - The leading business digital optimizer",
      },
    ],
    locale: "en_US",
    type: "website",
    publisher: "BookOne",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookOne Your Business",
    description: "The leading business digital optimizer",
    images: ["https://bookone.dev/og-image.jpg"],
    site: "@EmmanuelOnosod1",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="publisher" content="BookOne" />
        <link rel="canonical" href="https://bookone.dev" />
      </head>
      <body>
        <header
          className="shadow-md backdrop-blur-2xl  w-full fixed z-10"
          role="banner"
          aria-label="Main Navigation"
        >
          <Nav />
        </header>
        <main aria-label="Main Content">{children}</main>
        <footer role="contentinfo" aria-label="Footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
