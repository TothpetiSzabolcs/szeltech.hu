"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

// Gépek és spec darabszámaik
const machines = [
  { id: "cnc_lathe_small", specCount: 4 },
  { id: "cnc_lathe_large", specCount: 4 },
  { id: "cnc_milling", specCount: 3 },
  { id: "conventional_lathe", specCount: 4 },
];

export function Machines() {
  const t = useTranslations("machines");

  return (
    <section id="geppark" className="py-28 lg:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {machines.map((machine, i) => {
            const number = String(i + 1).padStart(2, "0");
            
            return (
              <AnimatedSection key={machine.id} delay={i * 0.1}>
                <article className="group relative p-8 bg-bg-2 border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 h-full">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <p className="text-[10px] font-bold tracking-[0.25em] text-gold/50 uppercase mb-4">
                    {number}
                  </p>

                  <h3 className="text-xl font-bold text-steel-chrome mb-5 tracking-tight pr-12">
                    {t(`items.${machine.id}.title`)}
                  </h3>

                  <ul className="flex flex-col gap-2.5">
                    {Array.from({ length: machine.specCount }, (_, idx) => (
                      <li key={idx} className="text-[13px] font-medium text-steel-dark/70 flex items-start gap-2">
                        <span className="block w-3 h-px bg-gold/50 mt-2 flex-shrink-0" />
                        <span>{t(`items.${machine.id}.specs.${idx}`)}</span>
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