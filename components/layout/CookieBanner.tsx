"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const translations = {
  hu: {
    title: "Süti beállítások",
    message: "Weboldalunk sütiket használ a jobb felhasználói élmény és a látogatottság mérése érdekében.",
    accept: "Elfogadom",
    reject: "Elutasítom",
    learnMore: "Adatkezelési tájékoztató",
  },
  en: {
    title: "Cookie Settings",
    message: "We use cookies to improve your experience and measure website traffic.",
    accept: "Accept",
    reject: "Reject",
    learnMore: "Privacy Policy",
  },
  de: {
    title: "Cookie-Einstellungen",
    message: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Website-Verkehr zu messen.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    learnMore: "Datenschutzerklärung",
  },
};

export function CookieBanner({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = translations[locale as keyof typeof translations] ?? translations.hu;

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
    setMounted(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
    });
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Arany vonal a tetején */}
      <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      <div className="bg-gray-950/95 backdrop-blur-md border-t border-white/5 px-4 py-4 md:py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Bal oldal — ikon + szöveg */}
          <div className="flex items-start gap-3">
            {/* Cookie ikon */}
            <div className="mt-0.5 shrink-0 w-8 h-8 rounded border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-yellow-500 uppercase tracking-widest mb-0.5">
                {t.title}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
                {t.message}{" "}
                <Link
                  href={`/${locale}/adatkezeles`}
                  className="text-yellow-500/80 hover:text-yellow-400 underline underline-offset-2 transition-colors"
                >
                  {t.learnMore}
                </Link>
              </p>
            </div>
          </div>

          {/* Jobb oldal — gombok */}
          <div className="flex items-center gap-2 shrink-0 ml-11 sm:ml-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200 border border-white/10 hover:border-white/20 rounded transition-all duration-200"
            >
              {t.reject}
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 text-sm font-semibold bg-yellow-500 hover:bg-yellow-400 text-gray-950 rounded transition-all duration-200"
            >
              {t.accept}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}