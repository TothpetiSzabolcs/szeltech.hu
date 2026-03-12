import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";
import { CookieBanner } from "@/components/layout/CookieBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://szeltech.hu";

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        hu: `${baseUrl}/hu`,
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      locale: locale === "hu" ? "hu_HU" : locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Script
          id="gtm-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'wait_for_update': 500
        });
      `,
          }}
        />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "SzelTech – Szélig Zoltán Egyéni Vállalkozó",
              description:
                "Professzionális CNC esztergálás és marás Nagykanizsán. Egyedi és sorozatgyártás, sürgős megrendelések.",
              url: "https://szeltech.hu",
              telephone: "+36204276211",
              email: "szeligfem@gmail.com",
              vatID: "HU69454127",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Csengery út 111.",
                addressLocality: "Nagykanizsa",
                addressCountry: "HU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 46.459,
                longitude: 16.9897,
              },
              priceRange: "$$",
              image: "https://szeltech.hu/og.png",
              sameAs: [],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "CNC Megmunkálási Szolgáltatások",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "CNC forgácsolás",
                      description:
                        "Precíz CNC esztergálási és marási megoldások kis-, közepes, valamint nagyobb szériákhoz is.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fémipari szerelési és hegesztési munkák",
                      description:
                        "Kiegészítő fémipari munkák a gyártási és összeállítási folyamat részeként.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Gépelemek és funkcionális részegységek",
                      description:
                        "Komplett gépelemek és funkcionális részegységek gyártása és összeállítása.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Komplex megoldások egy kézből",
                      description:
                        "Megbízható, rugalmas kivitelezés a gyártástól az összeállításig.",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T8D9G4XT');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T8D9G4XT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
