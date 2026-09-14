import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "br.com.guiasaude.portal",
  appName: "Guia Saúde",
  webDir: "out",
  backgroundColor: "#ffffff",
  android: { backgroundColor: "#ffffff" },
  ios: { backgroundColor: "#ffffff", contentInset: "automatic" },
};

export default config;
