/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: { scrollRestoration: true },
  images: { formats: ['image/avif','image/webp'] },
  headers: async () => ([
    {
      source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|css|js|woff|woff2)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ],
    },
    {
      source: '/(pricing|docs|privacy|terms|contact)',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=604800' }
      ],
    },
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { 
          key: 'Content-Security-Policy', 
          value: "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; font-src 'self' https: data:; connect-src 'self' https://api.levqor.ai https://vercel.live; frame-ancestors 'none';" 
        },
        { 
          key: 'Strict-Transport-Security', 
          value: 'max-age=63072000; includeSubDomains; preload' 
        },
      ],
    }
  ]),
};
module.exports = nextConfig;
