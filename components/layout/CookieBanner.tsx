"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const translations = {
  hu: {
    message: "Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében.",
    accept: "Elfogadom",
    reject: "Elutasítom",
    learnMore: "Adatkezelési tájékoztató",
  },
  en: {
    message: "This website uses cookies to improve your experience.",
    accept: "Accept",
    reject: "Reject",
    learnMore: "Privacy Policy",
  },
  de: {
    message: "Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    learnMore: "Datenschutzerklärung",
  },
};

export function CookieBanner({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);
  const t = translations[locale as keyof typeof translations] ?? translations.hu;

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
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

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-yellow-500/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 text-center md:text-left">
          {t.message}{" "}
          <Link
            href={`/${locale}/adatkezeles`}
            className="text-yellow-500 underline hover:text-yellow-400"
          >
            {t.learnMore}
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm border border-gray-600 text-gray-300 hover:border-gray-400 rounded transition-colors"
          >
            {t.reject}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-400 rounded transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}