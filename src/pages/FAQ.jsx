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
