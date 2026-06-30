import { BreadcrumbListSchema } from './types';

const SITE_URL = "https://dserveai.com";

export function generateBreadcrumbList(items: { name: string; path: string }[]): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}
