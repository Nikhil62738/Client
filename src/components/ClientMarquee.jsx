import { motion } from 'framer-motion';

const brands = ["NETFLIX", "VOGUE INDIA", "SONY MUSIC", "HBO", "BMW", "NIKE", "APPLE", "RED BULL", "AMAZON", "NETFLIX", "VOGUE INDIA", "SONY MUSIC", "HBO", "BMW", "NIKE", "APPLE", "RED BULL", "AMAZON"];

export default function ClientMarquee() {
  return (
    <section style={{ position: 'relative', padding: '28px 0', backgroundColor: '#050505', overflow: 'hidden', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '180px', zIndex: 2, background: 'linear-gradient(to right, #050505, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '180px', zIndex: 2, background: 'linear-gradient(to left, #050505, transparent)', pointerEvents: 'none' }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        style={{ display: 'flex', gap: '70px', alignItems: 'center', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {brands.map((b, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '70px'
          }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>{b}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', opacity: 0.4, flexShrink: 0 }} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
