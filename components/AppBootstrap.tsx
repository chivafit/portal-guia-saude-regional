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
          [
            ".root-guide-home > section",
            ".root-guide-home .home-featured-professional-card",
            ".root-guide-home .city-partner-grid > *",
            ".root-guide-home .city-editorial-mosaic > *",
            ".health-os-shortcut",
            ".health-os-editorial-card",
            ".search-reference-card",
            ".app-search-page .doctor-card",
            ".app-search-page .business-card",
            ".app-search-page .directory-choice-columns > article",
            ".profile-clean-card",
          ].join(","),
        );

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
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
            { rootMargin: "0px 0px -6%", threshold: 0.06 },
          );
          motionTargets.forEach((target, index) => {
            target.classList.add("app-reveal");
            target.style.setProperty("--app-reveal-delay", `${Math.min(index % 6, 5) * 42}ms`);
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
