// // /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// // export default nextConfig;
// // /** @type {import('next').NextConfig} */
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "**",
//         },
//       ],
//     },
//   }
  
  
//   export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  i18n: {
    locales: ["es", "en"], // Lista de idiomas disponibles
    defaultLocale: "es",    // Idioma predeterminado
  },
};

export default nextConfig;
