import Link from "next/link";

import { MenuIcon, SunDim } from "lucide-react";

const navItems = [
  { href: "#why-it-matters", label: "Why it matters" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#calculator", label: "Calculator" },
  { href: "#cta", label: "Get started" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-lg shadow-brand-blue/30">
            <SunDim className="h-5 w-5 text-brand-blue" />
          </div>
          <span className="text-base font-semibold uppercase tracking-[0.3em] text-brand-blue">
            SaveADay.ai
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-200 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-white/70 transition hover:bg-brand-blue/15 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
            <MenuIcon size={18} />
          </span>
        </div>
      </div>
    </header>
  );
}
