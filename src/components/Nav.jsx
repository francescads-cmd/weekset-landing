import { useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SteamSetLogo from './SteamSetLogo';
import { SUPPORTED_LANGS, SIGNUP_URL, LOGIN_URL } from '../config';

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

export default function Nav() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const switchLang = useLangSwitch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = (lang || i18n.language || 'it').toUpperCase();

  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link to={`/${lang || 'it'}`} className="nav__brand">
          <SteamSetLogo size={28} onDark />
          <span className="nav__wordmark">weekset</span>
        </Link>

        <div className="nav__actions">
          <div className="nav__lang-selector">
            <button
              className="nav__lang-btn"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Cambia lingua"
            >
              {currentLang} ▾
            </button>
            {langOpen && (
              <div className="nav__lang-dropdown">
                {SUPPORTED_LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      switchLang(l);
                      setLangOpen(false);
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary nav__cta">
            {t('nav.cta')}
          </a>

          <button
            className="nav__hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Apri menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav__drawer">
          <button
            className="nav__drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Chiudi menu"
          >
            ✕
          </button>
          <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="nav__drawer-link" onClick={() => setMenuOpen(false)}>
            {t('nav.login')}
          </a>
          <a
            href="#how"
            className="nav__drawer-link"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }), 80);
            }}
          >
            {t('nav.howItWorks')}
          </a>
          <a
            href="#catalog"
            className="nav__drawer-link"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 80);
            }}
          >
            {t('nav.catalog')}
          </a>
          <Link
            to={`/${lang || 'it'}/faq`}
            className="nav__drawer-link"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.faq')}
          </Link>
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary nav__drawer-cta" onClick={() => setMenuOpen(false)}>
            {t('nav.cta')}
          </a>
        </div>
      )}
    </nav>
  );
}
