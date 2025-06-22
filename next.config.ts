/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/**",
      },
    ],
  },
  // experimental: {
  //   turbo: false,
  // },
};

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {

// };

module.exports = nextConfig;
