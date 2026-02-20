import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "privacy" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "privacy" });

  return (
    <main className="min-h-screen bg-bg pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <h1 className="text-4xl md:text-5xl font-black text-steel-chrome mb-4">
          {t("title")}
        </h1>
        <p className="text-sm text-steel-dark/60 mb-12">{t("last_updated")}: February 17, 2026</p>

        <div className="prose prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.intro.title")}</h2>
            <p className="text-steel-dark leading-relaxed">{t("sections.intro.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.controller.title")}</h2>
            <div className="bg-bg-2 border border-white/5 p-6 rounded space-y-2">
              <p className="text-steel-dark"><strong>Name:</strong> Szélig Zoltán Sole Proprietorship</p>
              <p className="text-steel-dark"><strong>{t("sections.controller.tax")}:</strong> HU69454127</p>
              <p className="text-steel-dark"><strong>{t("sections.controller.reg")}:</strong> 53206042</p>
              <p className="text-steel-dark"><strong>{t("sections.controller.email")}:</strong> szeligfem@gmail.com</p>
              <p className="text-steel-dark"><strong>{t("sections.controller.phone")}:</strong> +36 20 427 6211</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.data_collected.title")}</h2>
            <p className="text-steel-dark leading-relaxed mb-4">{t("sections.data_collected.content")}</p>
            <ul className="list-disc list-inside text-steel-dark space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i}>{t(`sections.data_collected.items.${i}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.purpose.title")}</h2>
            <p className="text-steel-dark leading-relaxed">{t("sections.purpose.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.legal_basis.title")}</h2>
            <p className="text-steel-dark leading-relaxed">{t("sections.legal_basis.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.storage.title")}</h2>
            <p className="text-steel-dark leading-relaxed">{t("sections.storage.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.rights.title")}</h2>
            <p className="text-steel-dark leading-relaxed mb-4">{t("sections.rights.content")}</p>
            <ul className="list-disc list-inside text-steel-dark space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i}>{t(`sections.rights.items.${i}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-steel-chrome mb-4">{t("sections.contact.title")}</h2>
            <p className="text-steel-dark leading-relaxed">{t("sections.contact.content")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}