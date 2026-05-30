import { useTranslation } from 'react-i18next';

function IconCalendar({ color }) {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="28" height="24" rx="3" stroke={color} strokeWidth="2.2" fill="none"/>
      <line x1="5" y1="15" x2="33" y2="15" stroke={color} strokeWidth="2.2"/>
      <line x1="13" y1="5" x2="13" y2="11" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="25" y1="5" x2="25" y2="11" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <rect x="11" y="20" width="5" height="4" rx="1" fill={color}/>
      <rect x="20" y="20" width="5" height="4" rx="1" fill={color}/>
    </svg>
  );
}

function IconLightning({ color }) {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 5L10 21H19L16 33L28 17H19L22 5Z" fill={color}/>
    </svg>
  );
}

function IconHouse({ color }) {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 19L19 7L33 19" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="10" y="19" width="18" height="14" rx="1.5" stroke={color} strokeWidth="2.2" fill="none"/>
      <rect x="15" y="25" width="8" height="8" rx="1" fill={color}/>
    </svg>
  );
}

function IconSparkle({ color }) {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4L21.5 15.5L33 18L21.5 20.5L19 32L16.5 20.5L5 18L16.5 15.5L19 4Z" fill={color}/>
      <circle cx="28" cy="9" r="2" fill={color} opacity="0.6"/>
      <circle cx="11" cy="29" r="1.5" fill={color} opacity="0.4"/>
    </svg>
  );
}

const ICONS = {
  calendar: (color) => <IconCalendar color={color} />,
  lightning: (color) => <IconLightning color={color} />,
  house: (color) => <IconHouse color={color} />,
  sparkle: (color) => <IconSparkle color={color} />,
};

const ICON_COLORS = {
  calendar: 'var(--foglia-500)',
  lightning: 'var(--pomodoro-500)',
  house: 'var(--foglia-500)',
  sparkle: 'var(--pomodoro-500)',
};

export default function Features() {
  const { t } = useTranslation();
  const items = t('features.items', { returnObjects: true });

  return (
    <section className="features">
      <div className="features__inner">
        <div className="features__header">
          <div className="section-eyebrow">{t('features.label')}</div>
          <h2 className="section-h2">{t('features.title')}</h2>
        </div>
        <div className="features__grid">
          {items.map((item, i) => (
            <div key={i} className="feature-card">
              <div className="feature-card__icon">
                {ICONS[item.icon] ? ICONS[item.icon](ICON_COLORS[item.icon]) : null}
              </div>
              <h3 className="feature-card__title">{item.title}</h3>
              <p className="feature-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
