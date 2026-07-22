import { OrganizationSchema, WebSiteSchema } from './types';

const SITE_URL = "https://dserveai.com";

export function generateOrganization(): OrganizationSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Dserve AI",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    description: "Premium AI Data & Solutions Company bridging the gap between AI ambition and execution. We provide high-quality datasets, data annotation, and custom AI solutions.",
    sameAs: [
      "https://www.linkedin.com/company/106909852/"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "connect@dserveai.com",
      "url": `${SITE_URL}/contact`,
      "availableLanguage": ["English"]
    },
    address: [
      { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
      { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" }
    ],
    hasOfferCatalog: { "@id": `${SITE_URL}/services/#itemList` }
  };
}

export function generateWebSite(): WebSiteSchema & { "@context": "https://schema.org" } {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Dserve AI",
    publisher: { "@id": `${SITE_URL}/#organization` }
  };
}

// Unified graph for Homepage
export function generateHomepageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganization(),
      generateWebSite(),
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Dserve AI | Empowering AI with High-Quality Data",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` }
      }
    ]
  };
}
