import type { SiteConfig } from "@aspire/shared";

export const siteConfig: SiteConfig = {
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
  services: [
    {
      id: "cloud",
      title: "Cloud architecture",
      description:
        "Design and migrate workloads to AWS, Azure, or GCP with security and cost optimization built in.",
    },
    {
      id: "devops",
      title: "DevOps & CI/CD",
      description:
        "Automated pipelines, infrastructure as code, and observability for faster, safer releases.",
    },
    {
      id: "platform",
      title: "Platform engineering",
      description:
        "Internal developer platforms and golden paths that accelerate your engineering teams.",
    },
  ],
};
