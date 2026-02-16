"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="rolunk" className="py-28 lg:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual */}
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="relative w-full aspect-[3/4] overflow-hidden clip-cut-br">
                <Image
                  src="/images/IMG_6030.PNG"
                  alt="Szélig Tech munka"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-6 lg:-right-12 w-[52%] aspect-square overflow-hidden clip-cut-tl border-4 border-bg">
                <Image
                  src="/images/IMG_6025.PNG"
                  alt="CNC alkatrész közelkép"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-6 -left-4 bg-gradient-to-r from-gold to-gold-light text-bg px-5 py-3 clip-cut-all">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase">
                  {t("badge")}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="mt-10 lg:mt-0">
              <SectionHeader
                eyebrow={t("eyebrow")}
                title={t("title")}
                titleHighlight={t("titleHighlight")}
                align="left"
              />

              <p className="text-[15px] text-white/50 leading-[1.9] mb-5">
                {t("p1")}
              </p>
              <p className="text-[15px] text-white/50 leading-[1.9] mb-5">
                {t("p2")}
              </p>
              <p className="text-[15px] text-white/50 leading-[1.9] mb-10">
                {t("p3")}
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 bg-bg-2 border border-white/5 border-l-2 border-l-gold text-[13px] font-medium text-steel"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-gold flex-shrink-0"
                    />
                    {t(`highlights.${idx}`)}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
