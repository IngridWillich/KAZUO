// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// /** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };
  
  export default nextConfig;