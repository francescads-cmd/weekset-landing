import { useTranslation } from 'react-i18next';

export default function Catalog() {
  const { t } = useTranslation();
  const recipes = t('catalog.recipes', { returnObjects: true });
  const cuisines = t('catalog.cuisines', { returnObjects: true });

  return (
    <section id="catalog" className="catalog">
      <div className="catalog__inner">
        <div className="catalog__header">
          <div className="section-eyebrow">{t('catalog.label')}</div>
          <h2 className="section-h2">{t('catalog.title')}</h2>
          <p className="section-sub">{t('catalog.sub')}</p>
        </div>

        <div className="recipe-cards">
          {recipes.map((recipe, i) => (
            <div
              key={i}
              className={`recipe-card${recipe.state === 'added' ? ' recipe-card--added' : ''}`}
            >
              <div className="recipe-card__type">{recipe.type}</div>
              <div className="recipe-card__name">{recipe.name}</div>
              <div className="recipe-card__meta">{recipe.time} · {recipe.servings}</div>
              {recipe.state === 'added' ? (
                <button className="recipe-card__btn recipe-card__btn--added" disabled>
                  ✓ {t('catalog.added')}
                </button>
              ) : (
                <button className="recipe-card__btn recipe-card__btn--add">
                  {t('catalog.add')}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="cuisine-pills">
          <button className="cuisine-pill cuisine-pill--active">{cuisines.active}</button>
          {(cuisines.list || []).map((name, i) => (
            <button key={i} className="cuisine-pill cuisine-pill--soon">
              {name} · <em style={{ fontStyle: 'normal', fontSize: '12px' }}>{cuisines.soon}</em>
            </button>
          ))}
          <button className="cuisine-pill cuisine-pill--suggest">{cuisines.suggest}</button>
        </div>
      </div>
    </section>
  );
}
