"use client";
import { useEffect } from "react";

const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log("LCP:", lastEntry.startTime);

        // Send to analytics if needed
        if (window.gtag) {
          window.gtag("event", "LCP", {
            value: Math.round(lastEntry.startTime),
            event_category: "Web Vitals",
          });
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log("FID:", entry.processingStart - entry.startTime);

          if (window.gtag) {
            window.gtag("event", "FID", {
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: "Web Vitals",
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log("CLS:", clsValue);

            if (window.gtag) {
              window.gtag("event", "CLS", {
                value: Math.round(clsValue * 1000) / 1000,
                event_category: "Web Vitals",
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });

      // Monitor Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            const ttfb = entry.responseStart - entry.requestStart;
            console.log("TTFB:", ttfb);

            if (window.gtag) {
              window.gtag("event", "TTFB", {
                value: Math.round(ttfb),
                event_category: "Web Vitals",
              });
            }
          }
        });
      });
      navigationObserver.observe({ entryTypes: ["navigation"] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        navigationObserver.disconnect();
      };
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
