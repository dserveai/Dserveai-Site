import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Request an AI Pilot Project - Dserve AI",
  description: "Get in touch with Dserve AI. Outline your AI data and solution requirements, and our project management team will connect with you within 24 hours.",
  openGraph: {
    title: "Contact Us | Dserve AI",
    description: "Get in touch with Dserve AI. Outline your AI data and solution requirements, and our project management team will connect with you within 24 hours.",
    type: "website",
    url: "https://dserveai.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
