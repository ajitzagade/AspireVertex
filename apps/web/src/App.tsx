import { useEffect, useState } from "react";
import type { SiteConfig } from "@aspire/shared";
import { API_ROUTES } from "@aspire/shared";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { Services } from "./components/Services.tsx";
import { Footer } from "./components/Footer.tsx";
import { fetchJson } from "./lib/api.ts";

const fallbackConfig: SiteConfig = {
  siteName: "AspireInfraTech",
  tagline: "Building resilient infrastructure for tomorrow",
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    title: "Infrastructure technology that scales with you",
    subtitle:
      "Cloud, DevOps, and platform engineering tailored for modern enterprises.",
    ctaLabel: "Get in touch",
    ctaHref: "#contact",
  },
  services: [],
};

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(fallbackConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<SiteConfig>(API_ROUTES.site)
      .then(setConfig)
      .catch(() => setError("Could not load site content. Showing defaults."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteName={config.siteName} nav={config.nav} />
      <main className="flex-1">
        {loading && (
          <p className="text-center text-sm text-slate-400 py-2" aria-live="polite">
            Loading…
          </p>
        )}
        {error && (
          <p className="text-center text-sm text-amber-400/90 py-2" role="status">
            {error}
          </p>
        )}
        <Hero hero={config.hero} tagline={config.tagline} />
        <Services services={config.services} />
      </main>
      <Footer siteName={config.siteName} tagline={config.tagline} />
    </div>
  );
}
