import type { Metadata } from "next";
import localFont from "next/font/local";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dserve AI",
              "url": "https://dserveai.com",
              "logo": "https://dserveai.com/logo.png",
              "description": "Premium AI training datasets, data annotation, and collection services for cutting-edge AI development.",
              "sameAs": [
                "https://www.linkedin.com/company/106909852/"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Dserve AI",
              "url": "https://dserveai.com"
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
