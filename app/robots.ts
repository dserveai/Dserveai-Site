import { MetadataRoute } from 'next';
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'omgili', 'omgilibot'],
        allow: '/',
      }
    ],
    sitemap: 'https://dserveai.com/sitemap.xml',
    host: 'https://dserveai.com',
  };
}
