import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ to, label, prefix = '', suffix = '+' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);
  const [transform3d, setTransform3d] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      setCount(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, to]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -15;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
    setTransform3d(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const onMouseLeave = () => {
    setTransform3d('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        textAlign: 'center',
        padding: '30px 10px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'transform 0.1s ease-out, background-color 0.4s, border-color 0.4s',
        transform: transform3d,
        cursor: 'default',
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,153,51,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,153,51,0.1)'; }}
    >
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
        color: 'var(--color-gold)',
        lineHeight: 1,
        transform: 'translateZ(40px)',
        textShadow: '0 10px 20px rgba(0,0,0,0.3)'
      }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.65rem',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginTop: '12px',
        transform: 'translateZ(20px)'
      }}>
        {label}
      </div>
    </motion.div>
  );
}

const brands = ["NETFLIX", "VOGUE INDIA", "SONY MUSIC", "HBO", "BMW", "TANISHQ", "AMAZON PRIME", "T-SERIES", "LAKMÉ", "NETFLIX", "VOGUE INDIA", "SONY MUSIC", "HBO", "BMW", "TANISHQ", "AMAZON PRIME", "T-SERIES", "LAKMÉ"];

export default function PremiumStats() {
  return (
    <>
      {/* Marquee */}
      <section style={{ position: 'relative', padding: '28px 0', backgroundColor: 'var(--color-surface)', overflow: 'hidden', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '160px', zIndex: 2, background: 'linear-gradient(to right, #050505, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '160px', zIndex: 2, background: 'linear-gradient(to left, #050505, transparent)', pointerEvents: 'none' }} />
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
          style={{ display: 'flex', gap: '60px', alignItems: 'center', whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {brands.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>{b}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-saffron)', opacity: 0.5, flexShrink: 0 }} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="responsive-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            marginBottom: '80px'
          }}>
            <Counter to={150} label="Productions" />
            <Counter to={24} label="Industry Awards" />
            <Counter to={12} label="Years of Craft" />
            <Counter to={8} label="Countries Shot In" />
          </div>

          {/* Divider quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              borderLeft: '2px solid var(--color-saffron)', paddingLeft: '28px', maxWidth: '700px', margin: '0 auto'
            }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--color-text)', lineHeight: 1.65, marginBottom: '16px' }}>
              "You're not paying for a day of shooting. You're investing in a decade of refined taste, technical mastery, and an unwavering commitment to making your vision unforgettable."
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              — Krish Pachpor
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
