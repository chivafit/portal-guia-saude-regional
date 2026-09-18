import type { Metadata, Viewport } from "next";
import { CityEntryModal } from "@/components/CityEntryModal";
import { AppBootstrap } from "@/components/AppBootstrap";
import { AppBottomNav } from "@/components/AppBottomNav";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";

/* Portal foundation + canonical Health OS stack.
   Component families have one canonical owner; continuous-canvas is visual-only and loads last. */
import "./globals.css";
import "./native-app.css";
import "./health-os.css";
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
import "./health-os-legacy-compat.css";
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
import "./health-os-product-polish.css";
import "./health-os-desktop-home.css";
/* Canonical component owners. Keep these immediately before the visual canvas. */
import "./health-os-navbar.css";
import "./health-os-back-navigation-fix.css";
import "./health-os-profile-controls-final.css";
/* Desktop-only route adaptation. Mobile is intentionally untouched. */
import "./desktop-routes.css";
/* Desktop-only fidelity refinement against the official Guia Saúde identity board. */
import "./health-os-desktop-refinement.css";
/* Home-only fidelity refinement against the official Guia Saúde identity board. */
import "./health-os-home-refinement.css";
/* Shared native-page refinement for directory, profile and editorial surfaces. */
import "./health-os-pages-refinement.css";
/* Brand identity override: non-destructive and intentionally late in the cascade. */
import "./health-os-brand-refresh.css";
/* Mobile-only accessibility refinement for secondary copy, states and logo legibility. */
import "./health-os-mobile-accessibility.css";
/* Targeted WCAG contrast fixes for profile editorial surfaces. */
import "./health-os-contrast-fixes.css";
/* Logo composition aligned to the supplied Guia Saúde identity reference. */
import "./health-os-logo-reference.css";
/* Approved desktop app showcase composition. */
import "./desktop-app-reference.css";
/* Final desktop interaction, hierarchy and contrast polish. */
import "./desktop-design-polish.css";
/* Editorial redesign for the institutional About page. */
import "./about-page-polish.css";
/* Compact service flow for the profile inclusion page. */
import "./inclusion-page-polish.css";
/* Shared header CTA sizing and capitalization. */
import "./header-cta-polish.css";
/* Merged brand: current symbol with the supplied wordmark typography. */
import "./brand-merged-polish.css";
/* Visual atmosphere only: must remain the final global CSS layer. */
import "./health-os-continuous-canvas.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: "Guia Saúde — Portal Regional", template: "%s | Guia Saúde" }, description: defaultDescription,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }], shortcut: "/favicon.svg", apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] },
  applicationName: siteName, manifest: "/manifest.webmanifest", appleWebApp: { capable: true, statusBarStyle: "default", title: "Guia Saúde" }, keywords: ["Guia Saúde", "portal de saúde", "profissionais de saúde", "Piumhi"],
  openGraph: { title: "Guia Saúde — Portal Regional", description: defaultDescription, type: "website", locale: "pt_BR", siteName, images: [{ url: "/og.png", width: 1536, height: 864, alt: "Guia Saúde — portal de saúde" }] },
  twitter: { card: "summary_large_image", title: "Guia Saúde — Portal Regional", description: defaultDescription, images: ["/og.png"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0f9d7e" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body><AppBootstrap />{children}<CityEntryModal /><AppBottomNav /></body></html>; }
