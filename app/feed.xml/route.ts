import { NextResponse } from 'next';
export const dynamic = "force-static";
import { blogPosts, caseStudies } from '@/lib/data';

export async function GET() {
  const SITE_URL = 'https://dserveai.com';

  const items = [
    ...blogPosts.map((post) => ({
      title: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      date: new Date(post.date).toUTCString(),
      description: `Read our latest article on ${post.category}: ${post.title}`,
    })),
    ...caseStudies.map((cs) => ({
      title: cs.title,
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      date: new Date().toUTCString(), // Case studies don't have dates in data.ts currently, defaulting to now
      description: cs.description,
    })),
  ];

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Dserve AI - Latest Updates</title>
      <link>${SITE_URL}</link>
      <description>Premium AI Data &amp; Solutions Company</description>
      <language>en</language>
      ${items
        .map(
          (item) => `
      <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${item.url}</link>
        <description><![CDATA[${item.description}]]></description>
        <pubDate>${item.date}</pubDate>
        <guid isPermaLink="true">${item.url}</guid>
      </item>`
        )
        .join('')}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
