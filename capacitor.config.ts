import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "br.com.guiasaude.portal",
  appName: "Guia Saúde",
  webDir: "out",
  backgroundColor: "#f5faf8",
  android: { backgroundColor: "#f5faf8" },
  ios: { backgroundColor: "#f5faf8", contentInset: "never" },
};

export default config;
