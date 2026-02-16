# 📚 SzelTech Weboldal - Projekt Dokumentáció

**Verzió:** 1.0.0  
**Utolsó frissítés:** 2026. február 16.  
**Készítette:** Tóthpéti Szabolcs

---

## 📋 Tartalomjegyzék

1. [Projekt Áttekintés](#-projekt-áttekintés)
2. [Tech Stack](#-tech-stack)
3. [Fájlstruktúra](#-fájlstruktúra)
4. [Telepítés és Futtatás](#-telepítés-és-futtatás)
5. [Konfigurációk](#️-konfigurációk)
6. [Fordítások Kezelése](#-fordítások-kezelése)
7. [Email Rendszer](#-email-rendszer)
8. [Deployment](#-deployment)
9. [DNS Beállítások](#-dns-beállítások)
10. [Maintenance](#-maintenance)
11. [Troubleshooting](#-troubleshooting)
12. [Support](#-support)

---

## 🎯 Projekt Áttekintés

A **SzelTech** egy háromnyelvű (magyar, angol, német) bemutatkozó weboldal Szélig Zoltán CNC forgácsolási vállalkozása számára.

### Fő Funkciók

- ✅ 3 nyelvű weboldal (HU/EN/DE)
- ✅ Reszponzív design (mobil/tablet/desktop)
- ✅ Email kapcsolatfelvételi űrlap
- ✅ Animációk és interaktív elemek
- ✅ SEO optimalizált
- ✅ Production-ready deployment

### URL Struktúra

- **Magyar:** `https://szeltech.hu/hu`
- **Angol:** `https://szeltech.hu/en`
- **Német:** `https://szeltech.hu/de`

---

## 🛠 Tech Stack

### Core Framework

- **Next.js 16.1.6** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**

### Styling

- **Tailwind CSS v4** (új @theme szintaxis)
- **Framer Motion** (scroll animációk)

### Internationalization

- **next-intl** (3 nyelv támogatás)

### Email

- **Resend API** (email küldés)

### Deployment

- **Vercel** (hosting + auto-deploy)
- **GitHub** (version control)

### Fonts

- **Inter** (Google Fonts, 300-900 weights)

---

## 📁 Fájlstruktúra

```
frontend/
├── app/
│   ├── [locale]/              # Locale-alapú routing
│   │   ├── layout.tsx         # Nyelv-specifikus layout
│   │   └── page.tsx           # Főoldal (sections összeállítás)
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts       # Email küldés API endpoint
│   ├── globals.css            # Tailwind v4 + custom styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root redirect → /hu
│   └── sitemap.ts             # XML sitemap generálás
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Fejléc + nyelvváltó
│   │   └── Footer.tsx         # Lábléc
│   ├── sections/
│   │   ├── Hero.tsx           # Hero szekció (képmozaik)
│   │   ├── About.tsx          # Rólunk szekció
│   │   ├── Services.tsx       # Szolgáltatások (4 kártya)
│   │   ├── Portfolio.tsx      # Képgaléria
│   │   └── Contact.tsx        # Kapcsolat űrlap
│   └── ui/
│       ├── Button.tsx         # Gomb komponens
│       ├── SectionHeader.tsx  # Szekció fejléc
│       ├── Skeleton.tsx       # Loading skeleton
│       └── AnimatedSection.tsx # Scroll animáció wrapper
│
├── data/
│   ├── navigation.ts          # Nav linkek
│   └── services.ts            # Szolgáltatás ID-k
│
├── i18n/
│   ├── routing.ts             # next-intl routing config
│   └── request.ts             # Message loader
│
├── messages/
│   ├── hu.json                # Magyar fordítások
│   ├── en.json                # Angol fordítások
│   └── de.json                # Német fordítások
│
├── public/
│   ├── images/                # Projekt képek (IMG_6022-6032.PNG)
│   └── robots.txt             # SEO robots
│
├── .env.local                 # Environment variables (git ignore!)
├── middleware.ts              # next-intl middleware
├── next.config.ts             # Next.js konfiguráció
├── package.json               # Dependencies
└── tailwind.config.ts         # Tailwind config (basic)
```

---

## 🚀 Telepítés és Futtatás

### Előfeltételek

- **Node.js 18+** telepítve
- **npm** vagy **yarn**

### 1. Klónozás

```bash
git clone https://github.com/TothpetiSzabolcs/szeltech.hu.git
cd szeltech.hu
```

### 2. Dependencies telepítése

```bash
npm install
```

### 3. Environment Variables beállítása

Hozz létre `.env.local` fájlt a projekt gyökerében:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Development szerver indítása

```bash
npm run dev
```

Nyisd meg: **http://localhost:3000/hu**

### 5. Production build

```bash
npm run build
npm start
```

---

## ⚙️ Konfigurációk

### Tailwind CSS v4

**Fájl:** `app/globals.css`

```css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

@theme {
  --color-gold: #c0a060;
  --color-gold-light: #d4b878;
  --color-gold-bright: #e8c870;
  --color-steel: #c8cfd8;
  --color-steel-dark: #8c95a0;
  --color-steel-chrome: #e8ecf0;
  --color-bg: #0a0b0d;
  --color-bg-2: #111318;
  --color-bg-3: #181b21;
}
```

### Next.js Config

**Fájl:** `next.config.ts`

```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
```

### i18n Routing

**Fájl:** `i18n/routing.ts`

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hu", "en", "de"],
  defaultLocale: "hu",
});
```

---

## 🌍 Fordítások Kezelése

### Fordítási fájlok

**Helyszín:** `messages/*.json`

Minden nyelvi fájl ugyanazt a struktúrát követi:

```json
{
  "nav": { ... },
  "hero": { ... },
  "about": { ... },
  "services": { ... },
  "portfolio": { ... },
  "contact": { ... },
  "footer": { ... },
  "stats": { ... },
  "meta": { ... }
}
```

### Új fordítás hozzáadása

1. Nyisd meg a megfelelő `messages/{locale}.json` fájlt
2. Add hozzá az új kulcsot
3. Használd a komponensben:

```tsx
const t = useTranslations("namespace");
return <h1>{t("key")}</h1>;
```

### Új nyelv hozzáadása

1. `i18n/routing.ts` → add hozzá a locale-t a listához
2. Hozz létre `messages/{locale}.json` fájlt
3. Másold át és fordítsd le az összes kulcsot

---

## 📧 Email Rendszer

### Resend API Setup

1. **Regisztráció:** https://resend.com
2. **API Key generálás:** Dashboard → API Keys → Create
3. **Environment Variable:** Másold a `.env.local` fájlba

### Email Endpoint

**Fájl:** `app/api/send-email/route.ts`

```ts
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, company, email, phone, message } = await request.json();
  
  await resend.emails.send({
    from: "SzelTech Website <onboarding@resend.dev>",
    to: ["szeligfem@gmail.com"],
    replyTo: email,
    subject: `Új ajánlatkérés: ${name}`,
    html: `...branded HTML template...`
  });
}
```

### Domain Verification (Production)

**Resend Dashboard → Domains → Add szeltech.hu**

DNS rekordok beállítása Rackhost-on:

| Type | Name | Value |
|------|------|-------|
| TXT | resend._domainkey | p=MIGfMA0GCSq... |
| TXT | send | v=spf1 include:amazonses.com ~all |
| MX | send | feedback.ses.amazonses.com (priority 10) |
| TXT | _dmarc | v=DMARC1; p=none; |

---

## 🚢 Deployment

### Vercel Platform

**URL:** https://vercel.com  
**Projekt URL:** https://szeltech-hu.vercel.app

### Automatikus Deploy

Minden **git push** a `main` branch-re automatikusan triggerel egy új deployment-et!

```bash
git add .
git commit -m "Update content"
git push origin main
```


### Environment Variables

**Vercel Dashboard → Project → Settings → Environment Variables**

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Manual Redeploy

Vercel Dashboard → Deployments → Latest → **Redeploy** gomb

---

## 🌐 DNS Beállítások

### Domain Provider

**Rackhost** - https://admin.rackhost.hu

### DNS Rekordok

#### Vercel Hosting

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 216.198.79.1 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

#### Email (Resend)

| Type | Name | Value | Priority | TTL |
|------|------|-------|----------|-----|
| TXT | resend._domainkey | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7OIDAOAB... | - | 3600 |
| TXT | send | v=spf1 include:amazonses.com ~all | - | 3600 |
| MX | send | feedback.ses.amazonses.com | 10 | 3600 |
| TXT | _dmarc | v=DMARC1; p=none; | - | 3600 |

### DNS Propagáció


**Ellenőrzés:**
- https://dnschecker.org
- https://www.whatsmydns.net

---

## 🔧 Maintenance

### Tartalom Frissítése

#### 1. Fordítások módosítása

Szerkeszd: `messages/hu.json`, `en.json`, `de.json`

```bash
git add messages/
git commit -m "Update translations"
git push
```


#### 2. Képek cseréje

- Helyszín: `public/images/`
- Fájlnevek megtartása vagy komponensekben is frissítés
- Push után auto-deploy

#### 3. Szolgáltatások módosítása

**Fordítások:** `messages/{locale}.json` → `services.items` rész  
**ID-k:** `data/services.ts` (ha új szolgáltatás)

#### 4. Cégadatok frissítése

`messages/{locale}.json` → `footer` és `contact.details` szekciók

### Komponens Módosítása

Minden komponens `components/` mappában. Szerkesztés után auto-reload dev-ben!

### Új Szekció Hozzáadása

1. Hozd létre: `components/sections/NewSection.tsx`
2. Import és használat: `app/[locale]/page.tsx`
3. Fordítások hozzáadása: `messages/*.json`

---

## 🐛 Troubleshooting

### Build Error

```bash
rm -rf .next
npm run build
```

### TypeScript Error

```bash
npx tsc --noEmit
```

### CSS nem tölt be

Hard refresh: **Ctrl+Shift+R** vagy **Ctrl+F5**

### Fordítás nem jelenik meg

1. Ellenőrizd a JSON szintaxist (vessző, idézőjel)
2. Restart dev szerver: `Ctrl+C` → `npm run dev`
3. Tiszta cache: Töröld a `.next` mappát

### Email nem megy

1. Ellenőrizd: `.env.local` → `RESEND_API_KEY` helyes-e
2. Resend Dashboard → API Keys → státusz ellenőrzés
3. Domain verification (ha production-ben)
4. Console log ellenőrzés (F12 → Console)

### Domain nem működik

1. **DNS propagáció várás** (5-60 perc)
2. **Ellenőrzés:** https://dnschecker.org → `szeltech.hu`
3. **Vercel Dashboard** → Domains → **Refresh** gomb
4. **Rackhost ellenőrzés:** Domain státusza "Aktív"?

### 404 Error a root-on (`/`)

Ez normális! Csak `/hu`, `/en`, `/de` útvonalak léteznek.

Ha automatikus redirect kell:
- `app/page.tsx` már tartalmazza: `redirect("/hu")`

### Framer Motion animációk nem működnek

```bash
npm install framer-motion
```

Restart dev szerver

---

## 📞 Support

### Developer

**Név:** Tóthpéti Szabolcs  
**Email:** szabolcstothpeti@gmail.com
**Telefon:** +36 30 282 9438

### Tulajdonos

**Név:** Szélig Zoltán  
**Email:** szeligfem@gmail.com  
**Telefon:** +36 20 427 6211  
**Telephely:** Nagykanizsa, Csengery út 111.

### Cégadatok

**Cégnév:** Szélig Zoltán Egyéni Vállalkozó  
**Közösségi adószám:** HU69454127  
**Ev nyilvántartási szám:** 53206042

---

## 📊 Projekt Státusz

| Elem | Státusz |
|------|---------|
| Development | ✅ Kész |
| Production Build | ✅ Működik |
| Vercel Deployment | ✅ Éles |
| DNS Setup | ⏳ Folyamatban |
| Email System | ✅ Működik |
| Resend Verification | ✅ Beállítva |
| Translations | ✅ HU/EN/DE |
| SEO | ✅ Optimalizált |
| Mobile Responsive | ✅ Tesztelt |

---

## 🔄 Changelog

### v1.0.0 - 2026.02.16

#### Added
- ✨ Initial release
- 🌍 3 nyelvű weboldal (HU/EN/DE)
- 📧 Email kapcsolatfelvételi űrlap
- 🎨 Framer Motion scroll animációk
- 💀 Loading skeleton komponensek
- 🔍 SEO meta tagek nyelvenkénti
- 📱 Teljes responsive design
- 🚀 Vercel deployment setup
- 🌐 DNS konfigurációk
- 📚 Dokumentáció

#### Configuration
- Next.js 16.1.6 App Router
- Tailwind CSS v4 custom theme
- next-intl internationalization
- Resend email API integration
- GitHub version control

---

## 📝 License

**© 2026 Szélig Zoltán Egyéni Vállalkozó**  
Minden jog fenntartva.

---

**Készült:** 2026. február 16.  
**Verzió:** 1.0.0  
**Következő lépések:** Domain aktiválás, SSL certificate, Analytics setup
