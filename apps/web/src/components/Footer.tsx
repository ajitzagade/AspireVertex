interface FooterProps {
  siteName: string;
  tagline: string;
}

export function Footer({ siteName, tagline }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-slate-800 bg-slate-900/40 px-6 py-12"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-lg font-semibold text-white">{siteName}</p>
        <p className="mt-1 text-sm text-slate-400">{tagline}</p>
        <p className="mt-6 text-xs text-slate-500">
          © {year} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
