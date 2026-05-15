export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  nav: NavItem[];
  hero: HeroContent;
  services: ServiceItem[];
}
