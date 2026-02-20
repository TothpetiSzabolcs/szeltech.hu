"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";

export function Contact() {
  const t = useTranslations("contact");
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "hu";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    privacyAccepted: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
      privacyAccepted: "",
    };

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = t("form.errors.name");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = t("form.errors.email");
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = t("form.errors.message");
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = t("form.errors.privacy");
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      setSuccess(true);
      setTimeout(() => {
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
          privacyAccepted: false,
        });
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setGeneralError(t("form.errors.general"));
    } finally {
      setLoading(false);
    }
  };

  const privacyUrls: Record<string, string> = {
    hu: "adatkezeles",
    en: "privacy-policy",
    de: "datenschutz",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (success) {
    return (
      <section id="kapcsolat" className="py-28 lg:py-36 bg-bg-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gold/10 border border-gold/20 clip-cut-all flex items-center justify-center mx-auto mb-6">
              <Send size={32} className="text-gold" />
            </div>
            <h2 className="text-3xl font-bold text-steel-chrome mb-4">
              {t("success.title")}
            </h2>
            <p className="text-steel-dark">{t("success.message")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kapcsolat" className="py-28 lg:py-36 bg-bg-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow={t("eyebrow")}
              title={t("title")}
              titleHighlight={t("titleHighlight")}
              description={t("description")}
              align="left"
            />

            <div className="mt-12 space-y-6">
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-2">
                  {t("details.email_label")}
                </p>
                <a
                  href={`mailto:${t("details.email")}`}
                  className="text-lg text-steel-chrome hover:text-gold transition-colors"
                >
                  {t("details.email")}
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-2">
                  {t("details.phone_label")}
                </p>
                <a
                  href={`tel:${t("details.phone")}`}
                  className="text-lg text-steel-chrome hover:text-gold transition-colors"
                >
                  {t("details.phone")}
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-gold mb-2">
                  {t("details.address_label")}
                </p>
                <p className="text-lg text-steel-dark">
                  {t("details.address")}
                </p>
              </div>
            </div>

            <blockquote className="mt-12 border-l-2 border-gold pl-6 italic text-steel-dark">
              "{t("quote")}"
              <p className="mt-3 text-[11px] font-bold tracking-widest uppercase text-gold/50">
                — SzelTech
              </p>
            </blockquote>
          </div>

          <div className="bg-bg border border-white/5 p-8 lg:p-10">
            {generalError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-steel-dark/80 mb-3">
                    {t("form.name")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-bg-2 border ${
                      errors.name ? "border-red-500" : "border-white/10"
                    } px-4 py-3 text-steel-chrome focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-steel-dark/80 mb-3">
                    {t("form.company")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-bg-2 border border-white/10 px-4 py-3 text-steel-chrome focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-steel-dark/80 mb-3">
                    {t("form.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-bg-2 border ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } px-4 py-3 text-steel-chrome focus:outline-none focus:border-gold transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-steel-dark/80 mb-3">
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-bg-2 border border-white/10 px-4 py-3 text-steel-chrome focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-steel-dark/80 mb-3">
                  {t("form.message")} *
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-bg-2 border ${
                    errors.message ? "border-red-500" : "border-white/10"
                  } px-4 py-3 text-steel-chrome focus:outline-none focus:border-gold transition-colors resize-none`}
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 bg-bg-2 border border-white/10 checked:bg-gold checked:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors cursor-pointer"
                  />
                  <span className="text-sm text-steel-dark leading-relaxed">
                    {t("form.privacy_prefix")}{" "}
                    <Link
                      href={`/${currentLocale}/${privacyUrls[currentLocale] || "adatkezeles"}`}
                      className="text-gold hover:text-gold-light underline"
                      target="_blank"
                    >
                      {t("form.privacy_link")}
                    </Link>
                    {t("form.privacy_suffix")}
                  </span>
                </label>
                {errors.privacyAccepted && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.privacyAccepted}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-bg px-8 py-4 text-[12px] font-bold tracking-[0.1em] uppercase clip-cut-all hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? t("form.sending") : t("form.submit")}
                {!loading && <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
