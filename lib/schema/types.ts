// Base types for Schema.org JSON-LD

export interface BaseEntity {
  "@type": string;
  "@id"?: string;
  name?: string;
  description?: string;
  url?: string;
}

export interface OrganizationSchema extends BaseEntity {
  "@type": "Organization";
  logo?: {
    "@type": "ImageObject";
    url: string;
  };
  sameAs?: string[];
  contactPoint?: any[];
  address?: any[];
}

export interface WebSiteSchema extends BaseEntity {
  "@type": "WebSite";
  publisher?: { "@id": string };
}

export interface WebPageSchema extends BaseEntity {
  "@type": "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
  isPartOf?: { "@id": string };
  about?: { "@id": string };
  mainEntity?: any;
}

export interface ServiceSchema extends BaseEntity {
  "@type": "Service";
  provider?: { "@id": string };
}

export interface ArticleSchema extends BaseEntity {
  "@type": "Article" | "TechArticle";
  headline: string;
  image?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: { "@type": "Organization" | "Person"; name: string; url?: string };
  publisher?: { "@id": string };
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}
