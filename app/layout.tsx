import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CityEntryModal } from "@/components/CityEntryModal";
import { AppBootstrap } from "@/components/AppBootstrap";
import { AppBottomNav } from "@/components/AppBottomNav";
import { PodcastPlayerProvider } from "@/components/podcast/PodcastPlayer";
import { GlobalSiteHeader } from "@/components/GlobalSiteHeader";
import { GuiaSaudeLogoGradients } from "@/components/GuiaSaudeLogo";
import { GlobalSiteFooter } from "@/components/GlobalSiteFooter";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";
/* Portal foundation and merged canonical interface. */
import "./globals.css";
import "./portal-canonical.css";

// Tipografia do design de referência (37LAB), servida pelo próprio site:
// Inter em 400 e 500 (só esses pesos são carregados, então nada fica mais pesado que 500).
// Usadas pelas variáveis --gs-font-body, --gs-font-display e --gs-font-serif.
const sansFont = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-gs-inter" });
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Guia Saúde — Portal Regional",template:"%s | Guia Saúde"},description:defaultDescription,icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"},{url:"/favicon-32.png",sizes:"32x32",type:"image/png"}],shortcut:"/favicon.svg",apple:[{url:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]},applicationName:siteName,manifest:"/manifest.webmanifest",appleWebApp:{capable:true,statusBarStyle:"default",title:"Guia Saúde"},keywords:["Guia Saúde","portal de saúde","profissionais de saúde","Piumhi"],openGraph:{title:"Guia Saúde — Portal Regional",description:defaultDescription,type:"website",locale:"pt_BR",siteName,images:[{url:"/og.png",width:1536,height:864,alt:"Guia Saúde — portal de saúde"}]},twitter:{card:"summary_large_image",title:"Guia Saúde — Portal Regional",description:defaultDescription,images:["/og.png"]}};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#0b7f65"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR" className={sansFont.variable}><body><GuiaSaudeLogoGradients/><AppBootstrap/><PodcastPlayerProvider><GlobalSiteHeader/>{children}<GlobalSiteFooter/><CityEntryModal/><AppBottomNav/></PodcastPlayerProvider></body></html>}
