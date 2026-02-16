"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";
import { routing } from "@/i18n/routing";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || routing.defaultLocale;

  const switchLocale = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    window.location.href = segments.join("/");
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">
        <Link
          href={`/${currentLocale}`}
          className="text-lg font-black tracking-[0.12em] uppercase text-steel-chrome"
        >
          Szel<span className="text-gold">Tech</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[12px] font-semibold tracking-[0.1em] uppercase text-steel-dark hover:text-gold-light transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2 mr-4">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={clsx(
                "text-[11px] font-bold tracking-widest uppercase px-2 py-1 transition-colors",
                currentLocale === loc
                  ? "text-gold"
                  : "text-steel-dark hover:text-gold-light",
              )}
            >
              {loc}
            </button>
          ))}
        </div>

        <a
          href="#kapcsolat"
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase bg-gradient-to-r from-gold to-gold-light text-bg clip-cut-all hover:opacity-90 transition-opacity"
        >
          {t("cta")}
        </a>

        <button
          className="md:hidden text-steel-dark hover:text-gold transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-bg-2 border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-widest uppercase text-steel-dark hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-white/5">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  switchLocale(loc);
                  setMobileOpen(false);
                }}
                className={clsx(
                  "text-[11px] font-bold tracking-widest uppercase px-2 py-1",
                  currentLocale === loc ? "text-gold" : "text-steel-dark",
                )}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
