"use client";

import { useEffect, useState } from "react";

export function AppBootstrap() {
  const [nativeLaunch, setNativeLaunch] = useState(false);
  const [launchLeaving, setLaunchLeaving] = useState(false);

  useEffect(() => {
    let active = true;
    let observer: IntersectionObserver | undefined;
    let leaveTimer: number | undefined;
    let removeTimer: number | undefined;

    const handleAppClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const closeTarget = target?.closest(".native-filter-heading > span, .native-filter-backdrop");
      if (closeTarget) {
        const sheet = closeTarget.closest(".native-filter-sheet") as HTMLDetailsElement | null;
        if (sheet?.open) sheet.open = false;
        return;
      }
      const allSpecialties = target?.closest(".native-search-discovery .native-section-head a");
      if (allSpecialties) {
        event.preventDefault();
        window.location.href = "/buscar/especialidades";
      }
    };
    document.addEventListener("click", handleAppClick);

    void import("@capacitor/core").then(({ Capacitor }) => {
      if (!active) return;
      if (Capacitor.isNativePlatform()) {
        document.documentElement.dataset.platform = Capacitor.getPlatform();
        document.documentElement.classList.add("native-app");
        setNativeLaunch(true);
        leaveTimer = window.setTimeout(() => setLaunchLeaving(true), 1050);
        removeTimer = window.setTimeout(() => setNativeLaunch(false), 1550);
        const motionTargets = document.querySelectorAll<HTMLElement>([
          ".root-guide-home > section", ".root-guide-home .home-featured-professional-card", ".root-guide-home .city-partner-grid > *", ".root-guide-home .city-editorial-mosaic > *", ".health-os-shortcut", ".health-os-editorial-card", ".native-search-card", ".native-search-category", ".native-search-results .doctor-card", ".native-search-results .business-card", ".native-specialties-list > a", ".profile-clean-card", ".profile-clean-details > article",
        ].join(","));
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) motionTargets.forEach((target) => target.classList.add("app-reveal-visible"));
        else {
          observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add("app-reveal-visible"); observer?.unobserve(entry.target); }); }, { rootMargin: "0px 0px -6%", threshold: 0.06 });
          motionTargets.forEach((target, index) => { target.classList.add("app-reveal"); target.style.setProperty("--app-reveal-delay", `${Math.min(index % 6, 5) * 42}ms`); observer?.observe(target); });
        }
        return;
      }
      if ("serviceWorker" in navigator && window.isSecureContext) void navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" });
    });

    return () => {
      active = false;
      observer?.disconnect();
      document.removeEventListener("click", handleAppClick);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);

  if (!nativeLaunch) return null;
  return <div className={`health-os-launch${launchLeaving ? " is-leaving" : ""}`} aria-hidden="true"><div className="health-os-launch-aurora" /><div className="health-os-launch-orb"><i /><b /></div><div className="health-os-launch-copy"><strong>Guia Saúde</strong><span>SAÚDE MAIS PERTO DE VOCÊ</span><small>PIUMHI · MG</small></div></div>;
}
