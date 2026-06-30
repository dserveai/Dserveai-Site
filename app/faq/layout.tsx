import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Dserve AI Data Services",
  description: "Find answers to common questions about Dserve AI's data annotation pipelines, compliance (HIPAA/GDPR), delivery speeds, and quality assurance processes.",
  alternates: { canonical: "https://dserveai.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Dserve AI Data Services",
    description: "Find answers to common questions about Dserve AI's data annotation pipelines, compliance (HIPAA/GDPR), delivery speeds, and quality assurance processes.",
    type: "website",
    url: "https://dserveai.com/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dserve AI FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Dserve AI Data Services",
    description: "Find answers to common questions about Dserve AI's data annotation pipelines, compliance (HIPAA/GDPR), delivery speeds, and quality assurance processes.",
    images: ["/og-image.jpg"],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
