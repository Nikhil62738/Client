import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientMarquee from './components/ClientMarquee';
import PremiumStats from './components/PremiumStats';
import Reels from './components/Reels';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ReviewPopup from './components/ReviewPopup';

// ── Cinematic Loader ──────────────────────────────────────────
function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, backgroundColor: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', zIndex: 99999
      }}
    >
      {/* Logo reveal */}
      <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '10px', textTransform: 'uppercase', color: '#F2EDE8' }}
        >
          KRISH PACHPOR
        </motion.div>
      </div>

      {/* Sub label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '5px', color: '#FF9933', textTransform: 'uppercase', marginBottom: '50px' }}
      >
        Cinematographer · Malkapur, Maharashtra
      </motion.p>

      {/* Progress bar */}
      <div style={{ width: '220px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, delay: 0.4, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: 'var(--color-gold)' }}
        />
      </div>
    </motion.div>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="film-grain" />
      <div className="vignette" />

      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ReviewPopup />
          <Navbar />
          <main>
            <Hero />
            <PremiumStats />
            <Reels />

            <About />
            <ClientMarquee />
            <Services />
            <Testimonials />
            <Contact />
          </main>
        </motion.div>
      )}
    </>
  );
}
