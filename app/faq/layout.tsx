import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Dserve AI Data Services",
  description: "Find answers to common questions about Dserve AI's data annotation pipelines, compliance (HIPAA/GDPR), delivery speeds, and quality assurance processes.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
