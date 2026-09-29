/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
  },
  allowedDevOrigins: ['192.168.1.155:3000', 'localhost:3000', '192.168.1.155', 'localhost']
}
