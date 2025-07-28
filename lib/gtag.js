// components/GoogleAnalytics.jsx
"use client"; // This directive makes it a Client Component

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation"; // Hooks for App Router navigation

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construct the full URL for the page view
    const url = pathname + searchParams.toString();

    // Check if gtag is available globally (it should be, due to the Script component in layout)
    if (window.gtag) {
      // Send a page_view event with the new URL
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]); // Re-run effect when pathname or searchParams change

  return null; // This component doesn't render any visible UI
}
