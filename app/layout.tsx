import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { CityEntryModal } from "@/components/CityEntryModal";
import { AppBootstrap } from "@/components/AppBootstrap";
import { AppBottomNav } from "@/components/AppBottomNav";
import { SearchReferenceLanding } from "@/components/SearchReferenceLanding";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";
import "./mobile-audit.css";
import "./podcast-highlight.css";
import "./podcast-photo-highlight.css";
import "./load-more-button.css";
import "./home-featured-professionals.css";
import "./native-app.css";
import "./health-os.css";
import "./health-os-extended.css";
import "./health-os-reference.css";
import "./health-os-flow.css";
import "./health-os-motion.css";
import "./health-os-contact.css";
import "./health-os-flow-a11y.css";
import "./health-os-flow-desktop.css";
import "./health-os-search-final.css";
import "./health-os-search-reference.css";
import "./search-reference-structural.css";
import "./health-os-nav-reference-final.css";
import "./health-os-home-reference-final.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Guia Saúde — Portal Regional", template: "%s | Guia Saúde" },
  description: defaultDescription,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  applicationName: siteName,
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Guia Saúde" },
  keywords: ["Guia Saúde", "portal de saúde", "profissionais de saúde", "Piumhi"],
  openGraph: { title: "Guia Saúde — Portal Regional", description: defaultDescription, type: "website", locale: "pt_BR", siteName, images: [{ url: "/og.png", width: 1536, height: 864, alt: "Guia Saúde — portal de saúde" }] },
  twitter: { card: "summary_large_image", title: "Guia Saúde — Portal Regional", description: defaultDescription, images: ["/og.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f7fa",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><AppBootstrap /><Suspense fallback={null}><SearchReferenceLanding /></Suspense>{children}<CityEntryModal /><AppBottomNav /></body></html>;
}
