import { useTranslation } from 'react-i18next';

export default function StatsBar() {
  const { t } = useTranslation();
  const stats = t('stats', { returnObjects: true });

  return (
    <section className="stats">
      <div className="stats__inner">
        {stats.map((s, i) => (
          <div key={i} className="stats__item">
            <span className="stats__num">{s.num}</span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
