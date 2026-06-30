import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Dserve AI - The Intelligence Behind AI",
  description: "Learn about Dserve AI, our mission, and our global capabilities in building world-class AI data pipelines and solutions.",
  alternates: { canonical: "https://dserveai.com/about" },
  openGraph: {
    title: "About Us | Dserve AI",
    description: "Learn about Dserve AI, our mission, and our global capabilities in building world-class AI data pipelines.",
    type: "website",
    url: "https://dserveai.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Dserve AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Dserve AI",
    description: "Learn about Dserve AI, our mission, and our global capabilities in building world-class AI data pipelines.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
