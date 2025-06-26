import type { Metadata } from "next";
import { Prosto_One, Poppins, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Nav from "./component/nav.jsx";
import Footer from "./component/Footer";
import AuthProvider from "./component/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  style: ["normal", "italic"],
});

const prostoOne = Prosto_One({
  variable: "--font-prosto-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  style: "normal",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookOne Your Business ",
  description: "The leading business digital optimizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${prostoOne.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <section className="shadow">
            <Nav />
          </section>

          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
