import { useTranslation } from 'react-i18next';
import { APP_URL } from '../config';

export default function Hero() {
  const { t } = useTranslation();
  const phone = t('hero.phone', { returnObjects: true });
  const days = phone.days || [];

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__tag">✦ {t('hero.tag')}</div>
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__sub">{t('hero.sub')}</p>
          <div className="hero__actions">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">{t('hero.cta')}</a>
            <a href="#how" className="hero__anchor">{t('hero.anchor')}</a>
          </div>
          <p className="hero__social">{t('hero.social')}</p>
        </div>

        <div className="hero__phone">
          <div className="phone-frame">
            <div className="phone-header">
              <span className="phone-wm">{phone.wm}</span>
              <span className="phone-gen">{phone.gen}</span>
            </div>
            <div className="phone-tabs">
              {(phone.tabs || []).map((tab, i) => (
                <span key={i} className={`phone-tab${i === 0 ? ' phone-tab--active' : ''}`}>
                  {tab}
                </span>
              ))}
            </div>
            <div className="phone-body">
              {days.map((day, i) => (
                <div key={i} className="phone-day">
                  <div className="phone-day-name">{day.name}</div>
                  <div className="phone-meal">
                    <span className="phone-meal-label">{phone.lunchLabel}</span>
                    {day.lunch}
                  </div>
                  <div className="phone-meal">
                    <span className="phone-meal-label">{phone.dinnerLabel}</span>
                    {day.dinner}
                  </div>
                </div>
              ))}
              <div className="phone-day phone-day--disabled">
                <div className="phone-day-name">{phone.emptyDay}</div>
                <div className="phone-day-empty">{phone.empty}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
