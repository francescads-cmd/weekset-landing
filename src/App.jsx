import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGS, DEFAULT_LANG } from './config';
import Landing from './pages/Landing';
import FAQ from './pages/FAQ';

const OG_LOCALES = { it: 'it_IT', en: 'en_US', es: 'es_ES', de: 'de_DE', fr: 'fr_FR' };

function setMeta(attr, name, content) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function LangWrapper({ children }) {
  const { lang } = useParams();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  useEffect(() => {
    if (!lang || !SUPPORTED_LANGS.includes(lang)) return;
    document.title = t('meta.title');
    setMeta('name', 'description', t('meta.description'));
    setMeta('property', 'og:url', `${window.location.origin}/${lang}`);
    setMeta('property', 'og:locale', OG_LOCALES[lang] || lang);
  }, [lang, i18n.language, t]);

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
