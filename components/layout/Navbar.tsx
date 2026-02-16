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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">
        <Link
          href={`/${currentLocale}`}
          className="text-lg font-black tracking-[0.12em] uppercase text-steel-chrome flex-shrink-0"
        >
          Szel<span className="text-gold">Tech</span>
        </Link>

        {/* Desktop nav links - 1186px+ */}
        <ul className="hidden min-[1186px]:flex items-center gap-6 xl:gap-10 list-none">
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

        {/* Jobb oldali csoport: Nyelvválasztó + CTA/Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 mr-8">
          {/* Nyelvválasztó - MINDIG látható */}
          <div className="flex items-center gap-1 sm:gap-2">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={clsx(
                  "text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-1.5 sm:px-2 py-1 transition-colors",
                  currentLocale === loc
                    ? "text-gold"
                    : "text-steel-dark hover:text-gold-light",
                )}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Desktop CTA button - 1186px+ */}
          <a
            href="#kapcsolat"
            className="hidden min-[1186px]:inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase bg-gradient-to-r from-gold to-gold-light text-bg clip-cut-all hover:opacity-90 transition-opacity"
          >
            {t("cta")}
          </a>

          {/* Mobile hamburger - <1186px */}
          <button
            className="min-[1186px]:hidden text-steel-dark hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobil menü - <1186px */}
      {mobileOpen && (
        <div className="min-[1186px]:hidden bg-bg-2 border-t border-white/5 px-6 py-6 flex flex-col gap-5">
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
          <a
            href="#kapcsolat"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[12px] font-bold tracking-[0.1em] uppercase bg-gradient-to-r from-gold to-gold-light text-bg clip-cut-all hover:opacity-90 transition-opacity"
            onClick={() => setMobileOpen(false)}
          >
            {t("cta")}
          </a>
        </div>
      )}
    </header>
  );
}
