import type { Metadata, Viewport } from "next";
import { CityEntryModal } from "@/components/CityEntryModal";
import { AppBootstrap } from "@/components/AppBootstrap";
import { AppBottomNav } from "@/components/AppBottomNav";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";

/* Portal foundation + canonical Health OS stack.
   Superseded experimental/reference layers were intentionally removed. */
import "./globals.css";
import "./native-app.css";
import "./health-os.css";
import "./health-os-nav-reference-final.css";
import "./health-os-home-reference-final.css";
import "./health-os-profile-reference.css";
import "./health-os-specialties.css";
import "./health-os-liquid-motion-v2.css";
import "./health-os-magazine.css";
import "./health-os-osmo-interactions.css";
import "./health-os-motion-complete.css";
import "./health-os-canonical.css";
import "./health-os-podcast-canonical.css";
import "./health-os-route-audit.css";
import "./health-os-content-reader-canonical.css";
import "./health-os-reference-pages-final.css";
import "./health-os-global-density-final.css";
import "./health-os-content-hub-final.css";
import "./health-os-final-consolidation.css";
import "./health-os-release-guards.css";
import "./health-os-typography-a11y.css";
import "./health-os-section-header.css";
import "./health-os-design-system.css";
import "./health-os-iconography.css";
import "./health-os-components.css";
import "./health-os-spatial-system.css";
import "./health-os-variants.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: "Guia Saúde — Portal Regional", template: "%s | Guia Saúde" }, description: defaultDescription,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }], shortcut: "/favicon.svg", apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] },
  applicationName: siteName, manifest: "/manifest.webmanifest", appleWebApp: { capable: true, statusBarStyle: "default", title: "Guia Saúde" }, keywords: ["Guia Saúde", "portal de saúde", "profissionais de saúde", "Piumhi"],
  openGraph: { title: "Guia Saúde — Portal Regional", description: defaultDescription, type: "website", locale: "pt_BR", siteName, images: [{ url: "/og.png", width: 1536, height: 864, alt: "Guia Saúde — portal de saúde" }] },
  twitter: { card: "summary_large_image", title: "Guia Saúde — Portal Regional", description: defaultDescription, images: ["/og.png"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0f9d7e" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body><AppBootstrap />{children}<CityEntryModal /><AppBottomNav /></body></html>; }
