import Nav from '../components/Nav';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import HowItWorks from '../components/HowItWorks';
import Catalog from '../components/Catalog';
import Features from '../components/Features';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Catalog />
      <Features />
      <FinalCTA />
      <Footer />
    </>
  );
}
