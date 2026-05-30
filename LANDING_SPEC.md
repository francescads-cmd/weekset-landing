# weekset · LANDING_SPEC.md

Specifica completa per implementare la landing page weekset.

> Linee guida: react + vite già scaffoldati. react-router-dom + react-i18next + i18next + i18next-browser-languagedetector già installati.
> NO TypeScript. NO Tailwind. NO test framework. NO storybook.
> Sostituisci `App.css` e `index.css` di scaffold con quanto qui sotto.

---

## 1 · Struttura file da creare

```
src/
  config.js
  i18n.js
  styles/
    tokens.css
    landing.css
  locales/
    it.json
    en.json
    es.json
    de.json
    fr.json
  components/
    SteamSetLogo.jsx
    Nav.jsx
    Hero.jsx
    StatsBar.jsx
    HowItWorks.jsx
    Catalog.jsx
    Features.jsx
    FinalCTA.jsx
    Footer.jsx
  pages/
    Landing.jsx
    FAQ.jsx
  App.jsx
  main.jsx
```

Rimuovi: `src/App.css`, `src/assets/react.svg`. Lascia `src/assets/vite.svg` come favicon temporanea.

---

## 2 · `index.html` (root del progetto)

Modifica `<head>` aggiungendo Google Fonts e lang IT default:

```html
<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <title>weekset · Pianifica la settimana. Libera la testa.</title>
    <meta name="description" content="Pianifichi pranzo e cena una volta. La lista della spesa si crea da sola: esatta, senza sprechi.">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 3 · `src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tokens.css';
import './styles/landing.css';
import './i18n';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

---

## 4 · `src/config.js`

```js
export const FEATURES = {
  testimonials: false, // mostra sezione testimonianze
  pricing: false,      // mostra sezione prezzi
};

export const SUPPORTED_LANGS = ['it', 'en', 'es', 'de', 'fr'];
export const DEFAULT_LANG = 'it';

// URL dell'app (PWA). Per ora stesso dominio, dopo Vercel rewrite.
export const APP_URL = '/app';
```

---

## 5 · `src/i18n.js`

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import it from './locales/it.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import { DEFAULT_LANG } from './config';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
      fr: { translation: fr },
    },
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
  });

export default i18n;
```

---

## 6 · `src/App.jsx` — routing

```jsx
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGS, DEFAULT_LANG } from './config';
import Landing from './pages/Landing';
import FAQ from './pages/FAQ';

function LangWrapper({ children }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  if (!lang || !SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
      <Route path="/:lang" element={<LangWrapper><Landing /></LangWrapper>} />
      <Route path="/:lang/faq" element={<LangWrapper><FAQ /></LangWrapper>} />
      <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
    </Routes>
  );
}
```

---

## 7 · `src/styles/tokens.css`

```css
:root {
  color-scheme: light;

  /* Palette Basilico */
  --foglia-50:  #E3EFEC;
  --foglia-100: #C8DED9;
  --foglia-500: #1F5C52;
  --foglia-600: #1A4D45;
  --foglia-800: #103A33;
  --foglia-900: #0E2D27;

  --pomodoro-50:  #FFEEE9;
  --pomodoro-100: #FFD7C9;
  --pomodoro-500: #FF7A5C;
  --pomodoro-600: #E0654A;
  --pomodoro-700: #B84F38;

  --cream-50:  #FAFBF9;
  --cream-100: #F4F5F2;
  --cream-200: #ECEEEB;
  --cream-300: #D8DBD7;
  --cream-400: #B0B5B1;
  --cream-500: #8A8F8C;
  --cream-600: #5A6663;
  --cream-700: #3D4541;
  --cream-800: #14201D;

  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  --r-xs: 4px;
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;
  --r-full: 999px;

  --shadow-sm: 0 1px 4px rgba(20,30,28,0.06);
  --shadow-md: 0 4px 16px rgba(20,30,28,0.08);
  --shadow-lg: 0 8px 32px rgba(20,30,28,0.12);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { font-family: var(--font-body); color: var(--cream-800); background: var(--cream-100); }
button { font-family: inherit; cursor: pointer; }
a { color: inherit; text-decoration: none; }
```

---

## 8 · `src/styles/landing.css`

Replica fedele del mockup v4 mostrato in chat. Stesso layout, stessi colori, stessi spacing. Mobile-first con breakpoint a 768px: sotto, hero diventa colonna singola, phone mockup sotto al testo, mini-mockup degli step sotto al testo, features grid 1 colonna.

Container max-width 1180px centrato. Tutte le sezioni full-width (background colorato) con padding interno responsive.

Stati hover:
- Bottoni primary Pomodoro: hover → Pomodoro 600
- Bottoni nav: hover → opacità leggera su bg
- Link footer/lingua: hover → underline o opacity 1

Focus state: outline `3px solid var(--foglia-50)` con `outline-offset: 2px` su elementi interattivi.

Animazioni: niente animazioni decorative. Solo `transition: 0.15s` su hover button/link.

---

## 9 · `src/components/SteamSetLogo.jsx`

Logo Steam Set scalabile.

```jsx
export default function SteamSetLogo({ size = 28, onDark = true }) {
  const bg = onDark ? 'rgba(255,255,255,0.15)' : '#1F5C52';
  const dotColor = '#FFD7C9';
  const bowlColor = '#FF7A5C';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="weekset">
      <rect width="32" height="32" rx="7.5" fill={bg}/>
      <circle cx="11" cy="8" r="1.7" fill={dotColor}/>
      <circle cx="16" cy="8" r="1.7" fill={dotColor} opacity="0.78"/>
      <circle cx="21" cy="8" r="1.7" fill={dotColor} opacity="0.55"/>
      <circle cx="11" cy="13" r="1.7" fill={dotColor} opacity="0.4"/>
      <circle cx="16" cy="13" r="1.7" fill={dotColor} opacity="0.25"/>
      <circle cx="21" cy="13" r="1.7" fill={dotColor} opacity="0.13"/>
      <ellipse cx="16" cy="20" rx="9.5" ry="1.6" fill={bowlColor}/>
      <path d="M 6.5 20 Q 16 30, 25.5 20 Z" fill={bowlColor}/>
    </svg>
  );
}
```

---

## 10 · Componenti landing

Ogni componente legge il copy via `useTranslation()`. Il visual è quello del mockup v4 mostrato a Francesca in chat:

- **Nav.jsx** — Foglia 500 background. SteamSetLogo 28 + wordmark "weekset" Fraunces 700 lowercase + selettore lingua "IT ▾" + CTA "Inizia gratis" Pomodoro + hamburger 3 righe. Hamburger apre un menu drawer mobile con: Accedi, Come funziona (anchor `#how`), Ricettario (anchor `#catalog`), FAQ (Link a `/:lang/faq`).

- **Hero.jsx** — Foglia 500. Tag `✦ {t('hero.tag')}` su pill Vapore 20% opacity, H1 Fraunces 700 40px con `\n` → `<br/>`, sub Inter, CTA primary Pomodoro + anchor link `#how`, social proof piccolo. A destra: phone mockup come nel mockup v4 (frame, header verde con wordmark+✦Genera, tab Menu/Spesa/Ricette con Menu attivo, body Cream con 3 day-mini: Lun pasta+insalata, Mar zuppa+salmone, Mer disabled "✦ Genera pasto").

- **StatsBar.jsx** — bianco con border-bottom Cream 200. 3 numeri (Fraunces 22 Foglia 500) + label (Inter 10 700 uppercase Cream 600 letter-spacing 1.5px).

- **HowItWorks.jsx** — id="how". Background Cream 100. Eyebrow + H2 Fraunces 28 + sub. Poi 3 step row: numero 32px cerchio Foglia + body + mini mockup 180px. Step 1 mini mockup = mini-calendario 3 day card; step 2 = mini lista spesa per categoria; step 3 = lista in modalità shopping con 2 avatar (F verde Foglia, M Pomodoro) e progress "9 di 17" con barra 65%.

- **Catalog.jsx** — id="catalog". Background Cream 50, border top/bottom Cream 200 (NIENTE FOGLIA come bg — la regola "no verde su verde" del brief). 3 recipe card bianche con bordo Cream 200: Pasta al pomodoro (Primo · 15 min · 4 porzioni) + Aggiungi; Pollo al limone (Secondo · 25 min · 4 porzioni) + Aggiungi; Insalata di farro (Primo · 20 min · 4 porzioni) + stato Aggiunta (Foglia 50 bg, Foglia 500 text, con check ✓). Sotto: cuisine pills (Italiana attiva Foglia 500 bg+white, altre bianche con bordo+cream-700: Spagnola/Francese/Greca con suffisso "· presto", e ultima "+ Suggerisci →").

- **Features.jsx** — Background white. Eyebrow + H2 + grid 2x2 (su mobile diventa 1 colonna). 4 card Cream 50 con icon 38px (calendar Foglia, lightning Pomodoro, house Foglia, lightning Pomodoro per ✦ AI). Le icone sono SVG inline Phosphor-style fill currentColor.

- **FinalCTA.jsx** — Background Notte (#103A33). Centrato. Tagline Fraunces 32 bianco + sub Vapore 75% + CTA Pomodoro 15px font + nota Vapore 45%.

- **Footer.jsx** — Background Foglia 900 (#0E2D27). Due righe:
  - Riga 1: wordmark + links (FAQ Link a `/:lang/faq`, Privacy, Termini, hello@weekset.app)
  - Riga 2: 5 lingue cliccabili — click → `navigate(\`/${newLang}\`)`. Lingua attiva in Vapore 700, altre opacità 45.

---

## 11 · `src/pages/Landing.jsx`

```jsx
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import HowItWorks from '../components/HowItWorks';
import Catalog from '../components/Catalog';
import Features from '../components/Features';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import { FEATURES } from '../config';

export default function Landing() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Catalog />
      <Features />
      {/* Sezione testimonianze (nascosta — attivare quando ci sono feedback) */}
      {/* {FEATURES.testimonials && <Testimonials />} */}
      {/* Sezione prezzi (nascosta — attivare post beta) */}
      {/* {FEATURES.pricing && <Pricing />} */}
      <FinalCTA />
      <Footer />
    </>
  );
}
```

---

## 12 · `src/pages/FAQ.jsx`

Placeholder pulito:

```jsx
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function FAQ() {
  const { t } = useTranslation();
  const { lang } = useParams();
  return (
    <>
      <Nav />
      <main style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 28px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--foglia-500)', marginBottom: '12px',
        }}>{t('faq.eyebrow')}</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700,
          color: 'var(--cream-800)', marginBottom: '20px',
        }}>{t('faq.title')}</h1>
        <Link to={`/${lang}`} style={{
          fontSize: '14px', fontWeight: 600, color: 'var(--foglia-500)',
          textDecoration: 'underline', textUnderlineOffset: '4px',
        }}>{t('faq.back')}</Link>
      </main>
      <Footer />
    </>
  );
}
```

---

## 13 · `src/locales/it.json` — COPY ESATTO

```json
{
  "nav": {
    "cta": "Inizia gratis",
    "login": "Accedi",
    "howItWorks": "Come funziona",
    "catalog": "Ricettario",
    "faq": "FAQ"
  },
  "hero": {
    "tag": "Pianifica la settimana",
    "title": "Organizza\nla settimana.\nLibera la testa.",
    "sub": "Pianifichi pranzo e cena una volta. La lista della spesa si crea da sola: esatta, senza sprechi. E smetti di chiederti \"cosa cucino?\" ogni sera.",
    "cta": "Inizia gratis →",
    "anchor": "Vedi come funziona ↓",
    "social": "Gratuita · Nessuna carta richiesta",
    "phone": {
      "wm": "weekset",
      "gen": "✦ Genera",
      "tabs": ["Menu", "Spesa", "Ricette"],
      "days": [
        { "name": "Lunedì 2 giugno", "lunch": "🍝 Pasta al pomodoro", "dinner": "🥗 Insalata di farro" },
        { "name": "Martedì 3 giugno", "lunch": "🍲 Zuppa di legumi", "dinner": "🐟 Salmone al forno" }
      ],
      "empty": "✦ Genera pasto",
      "emptyDay": "Mercoledì 4 giugno",
      "lunchLabel": "Pranzo",
      "dinnerLabel": "Cena"
    }
  },
  "stats": [
    { "num": "14", "label": "Pasti pianificati" },
    { "num": "1", "label": "Lista della spesa" },
    { "num": "0", "label": "Sprechi nel frigo" }
  ],
  "how": {
    "label": "Come funziona",
    "title": "Una decisione la domenica.\nSette giorni risolti.",
    "sub": "Tre passi rapidi. Poi non ci pensi più fino alla settimana dopo.",
    "step1": {
      "title": "Scegli pranzo e cena per la settimana",
      "desc": "Aggiungi ricette dal ricettario in un tap, o usa quelle che hai già salvato. Quattordici pasti decisi una volta sola."
    },
    "step2": {
      "title": "La lista della spesa si crea esatta",
      "desc": "weekset somma gli ingredienti e scala le porzioni sulla tua famiglia. Compri solo quello che ti serve: niente cibo che marcisce in frigo, niente soldi buttati."
    },
    "step3": {
      "title": "Fai la spesa coordinata in famiglia",
      "desc": "Ognuno spunta quello che prende: la lista si aggiorna in tempo reale per tutti. Stop doppioni, stop messaggi \"hai preso il pane?\""
    },
    "mock": {
      "menu": "Menu",
      "shopping": "Lista della spesa",
      "atSupermarket": "Al supermercato",
      "category1": "Frutta e verdura",
      "category2": "Pane e cereali",
      "items": [
        { "name": "Pomodori", "qty": "500g" },
        { "name": "Basilico", "qty": "1 mazzo" },
        { "name": "Limoni", "qty": "2" },
        { "name": "Pasta", "qty": "500g" },
        { "name": "Farro", "qty": "300g" }
      ],
      "progress": "9 di 17"
    }
  },
  "catalog": {
    "label": "Il ricettario",
    "title": "92 ricette quotidiane.\nIn un tap.",
    "sub": "Non un ricettario gourmet. La cucina di casa, già pronta da aggiungere al menu. Modifichi quello che vuoi: diventa tua.",
    "add": "+ Aggiungi",
    "added": "Aggiunta",
    "recipes": [
      { "name": "Pasta al pomodoro", "type": "Primo", "time": "15 min", "servings": "4 porzioni", "state": "add" },
      { "name": "Pollo al limone", "type": "Secondo", "time": "25 min", "servings": "4 porzioni", "state": "add" },
      { "name": "Insalata di farro", "type": "Primo", "time": "20 min", "servings": "4 porzioni", "state": "added" }
    ],
    "cuisines": {
      "active": "Italiana",
      "soon": "presto",
      "list": ["Spagnola", "Francese", "Greca"],
      "suggest": "+ Suggerisci →"
    }
  },
  "features": {
    "label": "Funzionalità",
    "title": "Tutto quello che serve.\nNiente che distrae.",
    "items": [
      {
        "icon": "calendar",
        "title": "Menu settimanale",
        "desc": "Pianifica i 7 giorni. Copia e incolla settimane intere quando si ripete il ritmo di casa."
      },
      {
        "icon": "lightning",
        "title": "Niente sprechi",
        "desc": "Quantità calcolate sulle porzioni di casa. Compri quello che cucini davvero; niente sacchetti dimenticati a marcire."
      },
      {
        "icon": "house",
        "title": "Spesa condivisa",
        "desc": "Codice invito di 8 caratteri. La famiglia spunta gli articoli in tempo reale: niente doppi acquisti, niente messaggi."
      },
      {
        "icon": "sparkle",
        "title": "✦ Import con AI",
        "desc": "Aggiungi una ricetta da testo, foto o messaggio vocale. weekset la trasforma in scheda pronta."
      }
    ]
  },
  "cta": {
    "tagline": "Pianifica una volta.\nCucina tutta la settimana.",
    "sub": "Gratuita per chi inizia adesso: senza limiti, per sempre.",
    "button": "Inizia gratis →",
    "note": "Nessuna carta · iPhone e Android · 2 minuti per iniziare"
  },
  "footer": {
    "links": {
      "faq": "FAQ",
      "privacy": "Privacy",
      "terms": "Termini",
      "email": "hello@weekset.app"
    },
    "langs": {
      "it": "Italiano",
      "en": "English",
      "es": "Español",
      "de": "Deutsch",
      "fr": "Français"
    }
  },
  "faq": {
    "eyebrow": "FAQ",
    "title": "FAQ in arrivo",
    "back": "← Torna alla home"
  }
}
```

---

## 14 · Altre lingue: `en.json`, `es.json`, `de.json`, `fr.json`

Per questo prompt iniziale, **copia identica di `it.json`** (i valori restano in italiano). Un prompt successivo si occuperà delle traduzioni reali. Questo permette di testare il routing multilingua subito.

---

## 15 · Selettore lingua nella Nav e nel Footer

Sia in Nav (pill "IT ▾") sia in Footer, il click su una lingua deve:
1. Leggere il path corrente (es. `/it` o `/it/faq`)
2. Sostituire il prefisso lingua col nuovo (es. `/en` o `/en/faq`)
3. `navigate()` al nuovo URL

```jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS } from '../config';

function useLangSwitch() {
  const navigate = useNavigate();
  const location = useLocation();
  return (newLang) => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length > 0 && SUPPORTED_LANGS.includes(segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    navigate('/' + segments.join('/'));
  };
}
```

---

## 16 · Test finale richiesto

Quando tutto creato, esegui:

```bash
npm run dev
```

Apri `http://localhost:5173/it` — la landing deve renderizzare completamente con copy italiano e tutte le sezioni del mockup v4.

Apri `http://localhost:5173/en` — la landing deve renderizzare in inglese (per ora con copy italiano duplicato).

Apri `http://localhost:5173/it/faq` — deve mostrare il placeholder "FAQ in arrivo".

Apri `http://localhost:5173/abc` — deve fare redirect a `/it`.

NON pushare ancora. Conferma a Francesca che è pronto per il test locale.

---

## 17 · Cose da NON fare

- NIENTE Tailwind, NIENTE styled-components — solo CSS files vanilla con CSS variables.
- NIENTE TypeScript.
- NIENTE library extra oltre a quelle già installate.
- NIENTE animazioni decorative, scroll-effects, parallax.
- NIENTE testimonianze visibili (FEATURES.testimonials = false).
- NIENTE sezione prezzi visibile (FEATURES.pricing = false).
- NIENTE blocchi "verde su verde" — Catalog è Cream 50, mai Foglia.
- NIENTE em-dash nei copy (`—`). Usare `:` o `;`.
- NIENTE emoji native nel chrome UI — solo `✦`, `→`, `·`, `↓`, `←` come typographic glyphs (le emoji nei nomi ricetta come 🍝🥗🍲🐟 sono user-content nel phone mockup, restano).
