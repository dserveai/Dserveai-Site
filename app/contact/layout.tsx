import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Dserve AI | Custom Data Solutions for Enterprise",
  description: "Get in touch with our AI data engineers to discuss your custom dataset collection, annotation, and machine learning requirements.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
