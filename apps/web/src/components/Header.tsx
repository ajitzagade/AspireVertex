import type { NavItem } from "@aspire/shared";

interface HeaderProps {
  siteName: string;
  nav: NavItem[];
}

export function Header({ siteName, nav }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-lg font-semibold tracking-tight text-white">
          {siteName}
        </a>
        <nav className="hidden gap-8 sm:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
