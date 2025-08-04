// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
//       },
//       {
//         protocol: "https",
//         hostname: "i.postimg.cc",
//       },
//       {
//         protocol: "https",
//         hostname: "www.notion.so",
//       },
//       {
//         protocol: "https",
//         hostname: "media.houseandgarden.co.uk",
//       },
//       // Add other domains as needed
//       {
//         protocol: 'https',
//         hostname: '**.fbcdn.net', // Wildcard for all fbcdn subdomains
//         pathname: '/**',
//       },
//       {
//         protocol: "https",
//         hostname: "scontent-lhr8-1.xx.fbcdn.net",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "*.xx.fbcdn.net", // Covers all regional subdomains
//         pathname: "/**",
//       },
//     ],
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;






/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'scontent-lhr6-2.xx.fbcdn.net', // ✅ Add this exact one
      'scontent.xx.fbcdn.net',
      'fbcdn.net',
      'scontent-lhr8-1.xx.fbcdn.net',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      'i.postimg.cc',
      'www.notion.so',
      'media.houseandgarden.co.uk',
      'scontent-lhr6-2.xx.fbcdn.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
        pathname: '/**'
      }
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;