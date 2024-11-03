import witchPWA from "next-pwa";
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// /** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})({
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

export default nextConfig;
