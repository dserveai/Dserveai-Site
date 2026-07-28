import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about-dserve',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      // WordPress default structures
      {
        source: '/category/:slug*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/:slug*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/author/:slug*',
        destination: '/blog',
        permanent: true,
      },
      // Catch-all for old biometric/computer-vision slugs often found in WP URLs
      {
        source: '/high-quality-biometric-ai-data',
        destination: '/case-studies/biometric-verification-system',
        permanent: true,
      },
      {
        source: '/text-image-video-datasets',
        destination: '/services/multi-modal-data-collection',
        permanent: true,
      },
      {
        source: '/best-computer-vision-datasets',
        destination: '/services/computer-vision-analytics',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://images.unsplash.com https://upload.wikimedia.org https://www.clarity.ms https://*.google-analytics.com https://*.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com https://w.clarity.ms https://vitals.vercel-insights.com; media-src 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
