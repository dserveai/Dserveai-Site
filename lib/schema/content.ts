import { ServiceSchema, ArticleSchema } from './types';

const SITE_URL = "https://dserveai.com";
const ORG_ID = `${SITE_URL}/#organization`;

export function generateService(params: { name: string; description: string; path: string }): ServiceSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    provider: { "@id": ORG_ID },
    url: `${SITE_URL}${params.path}`,
  };
}

export function generateArticle(params: { title: string; date: string; image?: string; path: string; isTech?: boolean }): ArticleSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": params.isTech ? "TechArticle" : "Article",
    headline: params.title,
    datePublished: params.date,
    dateModified: params.date,
    image: params.image ? [params.image.startsWith('http') ? params.image : `${SITE_URL}${params.image}`] : undefined,
    author: {
      "@type": "Organization",
      name: "Dserve AI",
      url: SITE_URL
    },
    publisher: { "@id": ORG_ID },
    url: `${SITE_URL}${params.path}`
  };
}

export function generateFAQPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
}

export function generateServiceItemList(services: { title: string; description: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/services/#itemList`,
    "name": "Dserve AI Core Services",
    "itemListElement": services.map((svc, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": svc.title,
        "description": svc.description,
        "url": `${SITE_URL}/services/${svc.slug}`
      }
    }))
  };
}
