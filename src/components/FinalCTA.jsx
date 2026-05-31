import { useTranslation } from 'react-i18next';
import { SIGNUP_URL } from '../config';

export default function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section className="final-cta">
      <div className="final-cta__inner">
        <h2 className="final-cta__tagline">{t('cta.tagline')}</h2>
        <p className="final-cta__sub">{t('cta.sub')}</p>
        <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ fontSize: '15px' }}>
          {t('cta.button')}
        </a>
        <p className="final-cta__note">{t('cta.note')}</p>
      </div>
    </section>
  );
}
