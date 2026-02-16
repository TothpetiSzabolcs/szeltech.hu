"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { navLinks } from "@/data/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-bg-2 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="text-xl font-black tracking-[0.12em] uppercase text-steel-chrome mb-4">
              Szel<span className="text-gold">Tech</span>
            </p>
            <p className="text-sm text-steel-dark/70 leading-relaxed max-w-xs mb-4">
              {t("tagline")}
            </p>
            <div className="text-xs text-steel-dark/50 leading-relaxed space-y-1">
              <p className="font-semibold">{t("company_name")}</p>
              <p>{t("tax_number")}</p>
              <p>{t("reg_number")}</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-5">
              {t("sitemap")}
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-dark/70 hover:text-gold-light transition-colors"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-5">
              {t("contact")}
            </p>
            <div className="flex flex-col gap-3 text-sm text-steel-dark/70">
              <p>📧 {t("email")}</p>
              <p>📞 {t("phone")}</p>
              <p>📍 {t("address")}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 tracking-widest uppercase">
            © {new Date().getFullYear()} SzelTech. {t("rights")}
          </p>
          <div className="flex items-center gap-2">
            <span className="block w-4 h-px bg-gold/40" />
            <span className="text-xs text-gold/40 tracking-widest uppercase font-semibold">
              {t("motto")}
            </span>
            <span className="block w-4 h-px bg-gold/40" />
          </div>
        </div>
      </div>
    </footer>
  );
}
