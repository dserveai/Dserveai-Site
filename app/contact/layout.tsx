import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Request an AI Pilot Project - Dserve AI",
  description: "Get in touch with Dserve AI. Outline your AI data and solution requirements, and our project management team will connect with you within 24 hours.",
  alternates: { canonical: "https://dserveai.com/contact" },
  openGraph: {
    title: "Contact Us | Dserve AI",
    description: "Get in touch with Dserve AI. Outline your AI data and solution requirements, and our project management team will connect with you within 24 hours.",
    type: "website",
    url: "https://dserveai.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Dserve AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Request an AI Pilot Project - Dserve AI",
    description: "Get in touch with Dserve AI. Outline your AI data and solution requirements, and our project management team will connect with you within 24 hours.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
