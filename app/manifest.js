export default function manifest() {
  return {
    name: "BookOne - Professional Web Design, SEO & AI Automation",
    short_name: "BookOne",
    description:
      "Professional web design, SEO & marketing, and AI automation services for businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#6B46C1",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "/logo.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "BookOne Portfolio - Desktop View",
      },
      {
        src: "/logo.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "BookOne Portfolio - Mobile View",
      },
    ],
  };
}
