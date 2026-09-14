"use client";

import { useEffect } from "react";

export function AppBootstrap() {
  useEffect(() => {
    let active = true;
    let observer: IntersectionObserver | undefined;

    void import("@capacitor/core").then(({ Capacitor }) => {
      if (!active) return;

      if (Capacitor.isNativePlatform()) {
        document.documentElement.dataset.platform = Capacitor.getPlatform();
        document.documentElement.classList.add("native-app");

        const motionTargets = document.querySelectorAll<HTMLElement>(
          ".root-guide-home > section, .root-guide-home .home-featured-professional-card, .root-guide-home .city-partner-grid > *, .root-guide-home .city-editorial-mosaic > *",
        );

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          motionTargets.forEach((target) => target.classList.add("app-reveal-visible"));
        } else {
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("app-reveal-visible");
                observer?.unobserve(entry.target);
              });
            },
            { rootMargin: "0px 0px -8%", threshold: 0.08 },
          );
          motionTargets.forEach((target) => {
            target.classList.add("app-reveal");
            observer?.observe(target);
          });
        }
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
      observer?.disconnect();
    };
  }, []);

  return null;
}
