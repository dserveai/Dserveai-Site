import { WebPageSchema } from './types';

const SITE_URL = "https://dserveai.com";

export function generateWebPage(params: { title: string; path: string }): WebPageSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.title,
    url: `${SITE_URL}${params.path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` }
  };
}

export function generateAboutPage(): WebPageSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us | Dserve AI",
    url: `${SITE_URL}/about`,
    isPartOf: { "@id": `${SITE_URL}/#website` }
  };
}

export function generateContactPage(): WebPageSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us | Dserve AI",
    url: `${SITE_URL}/contact`,
    isPartOf: { "@id": `${SITE_URL}/#website` }
  };
}

export function generateCollectionPage(params: { title: string; path: string; description: string }): WebPageSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.title,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` }
  };
}
