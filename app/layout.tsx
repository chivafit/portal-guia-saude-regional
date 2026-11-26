import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { CityEntryModal } from "@/components/CityEntryModal";
import { AppBootstrap } from "@/components/AppBootstrap";
import { AppBottomNav } from "@/components/AppBottomNav";
import { GlobalSiteHeader } from "@/components/GlobalSiteHeader";
import { GuiaSaudeLogoGradients } from "@/components/GuiaSaudeLogo";
import { GlobalSiteFooter } from "@/components/GlobalSiteFooter";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";
/* Portal foundation and merged canonical interface. */
import "./globals.css";
import "./portal-canonical.css";

// Duas fontes da mesma família, servidas pelo próprio site: Inter nos textos e
// Inter Tight nos títulos. Usadas pelas variáveis --gs-font-body e --gs-font-display.
const bodyFont = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const displayFont = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--font-inter-tight" });
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Guia Saúde — Portal Regional",template:"%s | Guia Saúde"},description:defaultDescription,icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"},{url:"/favicon-32.png",sizes:"32x32",type:"image/png"}],shortcut:"/favicon.svg",apple:[{url:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]},applicationName:siteName,manifest:"/manifest.webmanifest",appleWebApp:{capable:true,statusBarStyle:"default",title:"Guia Saúde"},keywords:["Guia Saúde","portal de saúde","profissionais de saúde","Piumhi"],openGraph:{title:"Guia Saúde — Portal Regional",description:defaultDescription,type:"website",locale:"pt_BR",siteName,images:[{url:"/og.png",width:1536,height:864,alt:"Guia Saúde — portal de saúde"}]},twitter:{card:"summary_large_image",title:"Guia Saúde — Portal Regional",description:defaultDescription,images:["/og.png"]}};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#0f9d7e"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR" className={`${bodyFont.variable} ${displayFont.variable}`}><body><GuiaSaudeLogoGradients/><AppBootstrap/><GlobalSiteHeader/>{children}<GlobalSiteFooter/><CityEntryModal/><AppBottomNav/></body></html>}
