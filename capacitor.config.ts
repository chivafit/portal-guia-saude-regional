import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "br.com.guiasaude.portal",
  appName: "Guia Saúde",
  webDir: "out",
  backgroundColor: "#F6F8FC",
  android: { backgroundColor: "#F6F8FC" },
  ios: { backgroundColor: "#F6F8FC", contentInset: "never" },
};

export default config;
