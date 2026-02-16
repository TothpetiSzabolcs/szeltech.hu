"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setSent(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t("form.errors.name_required");
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t("form.errors.name_min");
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t("form.errors.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("form.errors.email_invalid");
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t("form.errors.message_required");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("form.errors.message_min");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true);
        setFormData({ name: "", company: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setErrors({ general: t("form.errors.send_error") });
      }
    } catch (error) {
      setErrors({ general: t("form.errors.send_error") });
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    { icon: Mail, label: "Email", value: t("details.email"), href: `mailto:${t("details.email")}` },
    { icon: Phone, label: "Phone", value: t("details.phone"), href: `tel:${t("details.phone").replace(/\s/g, "")}` },
    { icon: MapPin, label: "Address", value: t("details.address"), href: undefined },
  ];

  return (
    <section id="kapcsolat" className="py-28 lg:py-36 bg-bg-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Info side */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl font-bold text-steel-chrome mb-2 tracking-tight">
                {t("subtitle")}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {t("subtext")}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gold/8 border border-gold/20 text-gold">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-[15px] font-medium text-steel hover:text-gold-light transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[15px] font-medium text-steel">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-6 bg-bg border border-white/5 border-l-2 border-l-gold">
              <p className="text-sm italic text-white/30 leading-relaxed">
                {t("quote")}
              </p>
              <p className="mt-3 text-[11px] font-bold tracking-widest uppercase text-gold/50">
                — Szélig Tech
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 relative bg-bg border border-white/5 p-8 lg:p-12">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light" />

            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-gold/10 border border-gold/30 text-gold mb-2">
                  <Send size={22} />
                </div>
                <h3 className="text-2xl font-bold text-steel-chrome">{t("form.success_title")}</h3>
                <p className="text-sm text-white/40 max-w-xs">{t("form.success_text")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {errors.general && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
                    {errors.general}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">
                      {t("form.name")} *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("form.name_placeholder")}
                      className={`w-full bg-white/3 border ${
                        errors.name ? "border-red-500/50" : "border-white/8"
                      } text-steel text-sm px-4 py-3.5 outline-none focus:border-gold/50 transition-colors placeholder:text-white/20`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">
                      {t("form.company")}
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t("form.company_placeholder")}
                      className="w-full bg-white/3 border border-white/8 text-steel text-sm px-4 py-3.5 outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">
                      {t("form.email")} *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("form.email_placeholder")}
                      className={`w-full bg-white/3 border ${
                        errors.email ? "border-red-500/50" : "border-white/8"
                      } text-steel text-sm px-4 py-3.5 outline-none focus:border-gold/50 transition-colors placeholder:text-white/20`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">
                      {t("form.phone")}
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("form.phone_placeholder")}
                      className="w-full bg-white/3 border border-white/8 text-steel text-sm px-4 py-3.5 outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">
                    {t("form.message")} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t("form.message_placeholder")}
                    className={`w-full bg-white/3 border ${
                      errors.message ? "border-red-500/50" : "border-white/8"
                    } text-steel text-sm px-4 py-3.5 outline-none focus:border-gold/50 transition-colors resize-none placeholder:text-white/20`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-gold to-gold-light text-bg text-[13px] font-black tracking-[0.1em] uppercase clip-cut-all hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Küldés..." : t("form.submit")} <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}