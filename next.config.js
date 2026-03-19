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
        destination: "https://www.realtor.ca/agent/2240911/duane-enns-1-90-brandt-street-steinbach-manitoba-r3g0t3",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
