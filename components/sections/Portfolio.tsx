"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const galleryImages = [
  { src: "/images/IMG_6032.PNG", span: "col-span-2" },
  { src: "/images/IMG_6031.PNG" },
  { src: "/images/IMG_6030.PNG" },
  { src: "/images/IMG_6026.PNG", span: "row-span-2" },
  { src: "/images/IMG_6025.PNG" },
  { src: "/images/IMG_6024.PNG" },
  { src: "/images/IMG_6023.PNG", span: "col-span-2" },
];

export function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <section id="munkak" className="py-28 lg:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-4 auto-rows-[220px] gap-3">
          {galleryImages.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden bg-bg-3 cursor-pointer ${item.span || ""}`}
            >
              <Image
                src={item.src}
                alt={t(`items.${i}`)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-gold-light">
                  {t(`items.${i}`)}
                </span>
              </div>
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}