import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();
  const mock = t('how.mock', { returnObjects: true });
  const items = mock.items || [];

  return (
    <section id="how" className="how">
      <div className="how__inner">
        <div className="how__header">
          <div className="section-eyebrow">{t('how.label')}</div>
          <h2 className="section-h2">{t('how.title')}</h2>
          <p className="section-sub">{t('how.sub')}</p>
        </div>

        <div className="how__steps">
          {/* Step 1 */}
          <div className="how__step">
            <div className="how__step-left">
              <div className="how__step-num">1</div>
              <div className="how__step-body">
                <h3 className="how__step-title">{t('how.step1.title')}</h3>
                <p className="how__step-desc">{t('how.step1.desc')}</p>
              </div>
            </div>
            <div className="how__step-mock">
              <div className="step-mock">
                <div className="mock-cal">
                  <div className="mock-cal-day">
                    <div className="mock-cal-day-name">Lun</div>
                    <div className="mock-cal-meal">🍝 Pasta al pomodoro</div>
                    <div className="mock-cal-meal">🥗 Insalata di farro</div>
                  </div>
                  <div className="mock-cal-day">
                    <div className="mock-cal-day-name">Mar</div>
                    <div className="mock-cal-meal">🍲 Zuppa di legumi</div>
                    <div className="mock-cal-meal">🐟 Salmone al forno</div>
                  </div>
                  <div className="mock-cal-day">
                    <div className="mock-cal-day-name">Mer</div>
                    <div className="mock-cal-meal">🍗 Pollo al limone</div>
                    <div className="mock-cal-meal">🥦 Verdure grigliate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="how__step">
            <div className="how__step-left">
              <div className="how__step-num">2</div>
              <div className="how__step-body">
                <h3 className="how__step-title">{t('how.step2.title')}</h3>
                <p className="how__step-desc">{t('how.step2.desc')}</p>
              </div>
            </div>
            <div className="how__step-mock">
              <div className="step-mock">
                <div className="mock-list-header">{mock.shopping}</div>
                <div className="mock-cat-name">{mock.category1}</div>
                {items.slice(0, 3).map((item, i) => (
                  <div key={i} className="mock-item">
                    <span>{item.name}</span>
                    <span>{item.qty}</span>
                  </div>
                ))}
                <div className="mock-cat-name">{mock.category2}</div>
                {items.slice(3).map((item, i) => (
                  <div key={i} className="mock-item">
                    <span>{item.name}</span>
                    <span>{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="how__step">
            <div className="how__step-left">
              <div className="how__step-num">3</div>
              <div className="how__step-body">
                <h3 className="how__step-title">{t('how.step3.title')}</h3>
                <p className="how__step-desc">{t('how.step3.desc')}</p>
              </div>
            </div>
            <div className="how__step-mock">
              <div className="step-mock">
                <div className="mock-shop-header">{mock.atSupermarket}</div>
                <div className="mock-shop-avatars">
                  <span className="mock-avatar mock-avatar--f">F</span>
                  <span className="mock-avatar mock-avatar--m">M</span>
                </div>
                <div className="mock-progress-bar">
                  <div className="mock-progress-fill" style={{ width: '65%' }} />
                </div>
                <div className="mock-progress-label">{mock.progress}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
