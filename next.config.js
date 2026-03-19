/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i10.moxi.onl",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/listings",
        destination: "https://duaneenns.coldwellbanker.ca",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
