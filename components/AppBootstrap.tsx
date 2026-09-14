"use client";

import { useEffect } from "react";

export function AppBootstrap() {
  useEffect(() => {
    let active = true;

    void import("@capacitor/core").then(({ Capacitor }) => {
      if (!active) return;

      if (Capacitor.isNativePlatform()) {
        document.documentElement.dataset.platform = Capacitor.getPlatform();
        document.documentElement.classList.add("native-app");
        return;
      }

      if ("serviceWorker" in navigator && window.isSecureContext) {
        void navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
