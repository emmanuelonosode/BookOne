import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com", "randomuser.me", "cdn.sanity.io"], // 👈 add the domain here
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
