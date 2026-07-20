import type { Metadata } from "next";
import localFont from "next/font/local";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import "./globals.css";

const nasalization = localFont({
  src: "../public/fonts/nasalization.otf",
  variable: "--font-nasalization",
});

export const metadata: Metadata = {
  title: "Dserve AI | Empowering AI with High-Quality Data",
  description: "Dserve AI delivers premium AI training datasets, data annotation, and collection services. Trusted by leading AI companies worldwide to power smarter models.",
  keywords: "AI data collection, data annotation, AI training datasets, machine learning data, custom datasets, computer vision datasets, NLP datasets, healthcare AI data",
  authors: [{ name: "Dserve AI" }],
  creator: "Dserve AI",
  publisher: "Dserve AI",
  metadataBase: new URL("https://dserveai.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dserveai.com",
    siteName: "Dserve AI",
    title: "Dserve AI | Empowering AI with High-Quality Data",
    description: "Premium AI training datasets, data annotation, and collection services for cutting-edge AI development.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dserve AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dserve AI | Empowering AI with High-Quality Data",
    description: "Premium AI training datasets and data annotation services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nasalization.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <style dangerouslySetInnerHTML={{__html: `
          .skip-link { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
          .skip-link:focus { position: absolute; top: 0; left: 0; padding: 1rem; background: #0ea5e9; color: #fff; z-index: 9999; width: auto; height: auto; clip: auto; }
        `}} />
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
