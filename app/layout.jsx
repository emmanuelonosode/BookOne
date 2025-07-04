import { Prosto_One, Poppins, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Nav from "./component/sections/nav.jsx";
import Footer from "./component/sections/Footer.jsx";
import AuthProvider from "./component/AuthProvider";

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

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "BookOne Your Business ",
  description: "The leading business digital optimizer",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${poppins.className} antialiased`}>
        <AuthProvider>
          <section className="shadow-md w-full fixed z-10">
            <Nav />
          </section>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
