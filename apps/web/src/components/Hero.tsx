import type { HeroContent } from "@aspire/shared";

interface HeroProps {
  hero: HeroContent;
  tagline: string;
}

export function Hero({ hero, tagline }: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-brand-900/30 to-slate-950 px-6 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-brand-500)_0%,_transparent_50%)] opacity-20" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-500">
          {tagline}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          {hero.subtitle}
        </p>
        <a
          href={hero.ctaHref}
          className="mt-10 inline-flex rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500"
        >
          {hero.ctaLabel}
        </a>
      </div>
    </section>
  );
}
