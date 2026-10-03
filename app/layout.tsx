import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Archivo, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/content";
import { jsonLdGraph } from "@/lib/jsonld";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Shivang Khandelwal - Full-Stack Engineer",
    template: "%s - Shivang Khandelwal",
  },
  description: site.tagline,
  keywords: [
    "Shivang Khandelwal",
    "full-stack engineer",
    "Oracle",
    "DevLens",
    "AI agents",
    "MCP",
    "React",
    "Next.js",
    "Node.js",
    "portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: "Shivang Khandelwal",
    title: "Shivang Khandelwal - Full-Stack Engineer",
    description: site.tagline,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivang Khandelwal - Full-Stack Engineer",
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
};

// Set theme before paint: default light, restore saved choice. No flash.
const themeInit = `(()=>{try{const t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;else document.documentElement.dataset.theme="light";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${archivo.variable} ${jetbrains.variable} min-h-screen flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
