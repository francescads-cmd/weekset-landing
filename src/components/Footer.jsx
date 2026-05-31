import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

export default function Footer() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const switchLang = useLangSwitch();
  const currentLang = lang || 'it';
  const links = t('footer.links', { returnObjects: true });
  const langs = t('footer.langs', { returnObjects: true });

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__row1">
          <span className="footer__wordmark">weekset</span>
          <div className="footer__links">
            <Link to={`/${currentLang}/faq`} className="footer__link">{links.faq}</Link>
            <a href="https://www.iubenda.com/privacy-policy/67681832" className="iubenda-white iubenda-noiframe iubenda-embed footer__link" target="_blank" rel="noopener noreferrer">{links.privacy}</a>
            <a href="https://www.iubenda.com/privacy-policy/67681832/cookie-policy" className="iubenda-white iubenda-noiframe iubenda-embed footer__link" target="_blank" rel="noopener noreferrer">{links.cookie}</a>
            <a href={`mailto:${links.email}`} className="footer__link">{links.email}</a>
          </div>
        </div>
        <div className="footer__row2">
          {SUPPORTED_LANGS.map((l) => (
            <button
              key={l}
              className={`footer__lang${l === currentLang ? ' footer__lang--active' : ''}`}
              onClick={() => switchLang(l)}
            >
              {langs[l] || l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
