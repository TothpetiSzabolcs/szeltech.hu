"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  
  const [loadedImages, setLoadedImages] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  const handleImageLoad = (key: keyof typeof loadedImages) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <section id="fooldal" className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      {/* Background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,160,96,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,160,96,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 70% at 60% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(192,160,96,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-24 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-24">

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">
              <span className="block w-8 h-px bg-gold" />
              {t("eyebrow")}
            </div>

            <h1 className="text-6xl md:text-7xl xl:text-[88px] font-black leading-[0.93] tracking-tight text-steel-chrome mb-7">
              {t("title1")}
              <br />
              <em className="not-italic text-gradient-gold">{t("title2")}</em>
              <br />
              {t("title3")}
            </h1>

            <p className="text-base font-light text-steel-dark leading-relaxed max-w-md mb-10">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#kapcsolat" variant="primary">
                {t("cta_primary")} <ArrowRight size={15} />
              </Button>
              <Button href="#munkak" variant="ghost">
                {t("cta_secondary")}
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-14 flex gap-8 border-t border-white/5 pt-8">
              {[
                { value: "5+",  label: tStats("experience") },
                { value: "90K+", label: tStats("parts") },
                { value: "100%", label: tStats("deadline") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-gradient-gold leading-none mb-1">{stat.value}</p>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-steel-dark/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image mosaic with skeletons */}
          <div className="relative h-[520px] lg:h-[640px]">
            {/* Image 1 */}
            <div className="absolute top-0 left-0 w-[60%] h-[65%] overflow-hidden clip-cut-br">
              {!loadedImages.img1 && <Skeleton className="w-full h-full" />}
              <Image
                src="/images/IMG_6032.PNG"
                alt="CNC alkatrész"
                fill
                className={`object-cover hover:scale-105 transition-all duration-700 ${
                  loadedImages.img1 ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad("img1")}
              />
            </div>

            {/* Image 2 */}
            <div className="absolute top-0 right-0 w-[37%] h-[48%] overflow-hidden clip-cut-tl">
              {!loadedImages.img2 && <Skeleton className="w-full h-full" />}
              <Image
                src="/images/IMG_6031.PNG"
                alt="CNC alkatrész"
                fill
                className={`object-cover hover:scale-105 transition-all duration-700 ${
                  loadedImages.img2 ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad("img2")}
              />
            </div>

            {/* Image 3 */}
            <div className="absolute bottom-0 left-0 w-[37%] h-[33%] overflow-hidden">
              {!loadedImages.img3 && <Skeleton className="w-full h-full" />}
              <Image
                src="/images/IMG_6022.PNG"
                alt="Precíziós alkatrész"
                fill
                className={`object-cover hover:scale-105 transition-all duration-700 ${
                  loadedImages.img3 ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad("img3")}
              />
            </div>

            {/* Image 4 */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[50%] overflow-hidden clip-cut-tl">
              {!loadedImages.img4 && <Skeleton className="w-full h-full" />}
              <Image
                src="/images/IMG_6023.PNG"
                alt="CNC munkadarab"
                fill
                className={`object-cover hover:scale-105 transition-all duration-700 ${
                  loadedImages.img4 ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad("img4")}
              />
            </div>

            <div className="absolute top-[64%] left-[3%] right-[3%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#rolunk" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/40 hover:text-gold transition-colors animate-bounce" aria-label="Görgetés">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}