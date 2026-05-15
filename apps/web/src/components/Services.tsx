import type { ServiceItem } from "@aspire/shared";

interface ServicesProps {
  services: ServiceItem[];
}

export function Services({ services }: ServicesProps) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-white">Our services</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
          End-to-end infrastructure and platform capabilities.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-brand-600/50"
            >
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
