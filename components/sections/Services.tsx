"use client";

import { Cog, Layers, Wrench, Puzzle, ShieldCheck, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { serviceIds } from "@/data/services";

const icons = [Cog, Layers, Wrench, Puzzle, ShieldCheck, MessageSquare];

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="szolgaltatasok" className="py-28 lg:py-36 bg-bg-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceIds.map((id, i) => {
            const Icon = icons[i] ?? Cog;
            const number = String(i + 1).padStart(2, "0");
            
            return (
              <AnimatedSection key={id} delay={i * 0.1}>
                <article className="group relative p-10 bg-bg border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 h-full">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <p className="text-[10px] font-bold tracking-[0.25em] text-gold/50 uppercase mb-6">
                    {number}
                  </p>

                  <div className="w-12 h-12 flex items-center justify-center bg-gold/8 border border-gold/20 clip-cut-all mb-6 text-gold">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-xl font-bold text-steel-chrome mb-3 tracking-tight">
                    {t(`items.${id}.title`)}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    {t(`items.${id}.description`)}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {[0, 1, 2].map((idx) => (
                      <li key={idx} className="text-[12px] font-medium text-steel-dark/70 flex items-center gap-2">
                        <span className="block w-3 h-px bg-gold/50" />
                        {t(`items.${id}.features.${idx}`)}
                      </li>
                    ))}
                  </ul>

                  <span
                    className="absolute -bottom-3 right-4 text-9xl font-black text-white/[0.02] leading-none pointer-events-none select-none"
                    aria-hidden
                  >
                    {number}
                  </span>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}