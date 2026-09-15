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
    let scrollTimer: number | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const routeFx = document.createElement("div");
    routeFx.className = "app-route-transition";
    document.body.appendChild(routeFx);

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
        return;
      }
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || reducedMotion || event.defaultPrevented || anchor.target === "_blank" || anchor.origin !== window.location.origin) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href || href.startsWith("#") || href === window.location.pathname + window.location.search) return;
      const rect = anchor.getBoundingClientRect();
      routeFx.style.setProperty("--route-x", `${rect.left + rect.width / 2}px`);
      routeFx.style.setProperty("--route-y", `${rect.top + rect.height / 2}px`);
      routeFx.classList.add("is-active");
      window.setTimeout(() => routeFx.classList.remove("is-active"), 420);
    };
    const handleScroll = () => {
      const dock = document.querySelector(".health-os-dock");
      dock?.classList.add("is-scrolling");
      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => dock?.classList.remove("is-scrolling"), 170);
    };
    document.addEventListener("click", handleAppClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    void import("@capacitor/core").then(({ Capacitor }) => {
      if (!active) return;
      if (Capacitor.isNativePlatform()) {
        document.documentElement.dataset.platform = Capacitor.getPlatform();
        document.documentElement.classList.add("native-app");
        setNativeLaunch(true);
        leaveTimer = window.setTimeout(() => setLaunchLeaving(true), 1050);
        removeTimer = window.setTimeout(() => setNativeLaunch(false), 1550);
        const motionTargets = document.querySelectorAll<HTMLElement>([
          ".root-guide-home > section", ".root-guide-home .home-featured-professional-card", ".root-guide-home .city-partner-grid > *", ".root-guide-home .city-editorial-mosaic > *", ".health-os-home .health-os-intro", ".health-os-home .health-os-search", ".health-os-home .health-os-shortcuts > *", ".health-os-home .health-os-feature", ".health-os-home .health-os-section", ".health-os-home .health-os-content-card", ".health-os-editorial-card", ".native-search-card", ".native-search-category", ".native-search-results .doctor-card", ".native-search-results .business-card", ".native-specialties-list > a", ".health-os-featured-card", ".profile-clean-card", ".profile-clean-details > article",
        ].join(","));
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
      window.removeEventListener("scroll", handleScroll);
      routeFx.remove();
      if (scrollTimer) window.clearTimeout(scrollTimer);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);

  if (!nativeLaunch) return null;
  return <div className={`health-os-launch${launchLeaving ? " is-leaving" : ""}`} aria-hidden="true"><div className="health-os-launch-aurora" /><div className="health-os-launch-orb"><i /><b /></div><div className="health-os-launch-copy"><strong>Guia Saúde</strong><span>SAÚDE MAIS PERTO DE VOCÊ</span><small>PIUMHI · MG</small></div></div>;
}
