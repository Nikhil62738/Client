import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { quote: "Krish brings a sense of 'Drishtikon' — perspective — that is rare. He shot our OTT pilot and it looked like a ₹10 crore production on a fraction of the budget.", author: "Rajan Mehra", role: "Executive Producer, Amazon Prime India" },
  { quote: "The way he captured our wedding in Udaipur was beyond words. Every frame felt like a painting. He understands the soul of Indian celebrations.", author: "Priya & Arjun Singhania", role: "Clients · Udaipur Royal Wedding" },
  { quote: "For our Tanishq campaign, Krish delivered visuals that became iconic. He is not just a DP — he is a visual poet.", author: "Sneha Kapoor", role: "Creative Director, Tanishq" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="testimonials" style={{ padding: '140px 0', backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative large quote mark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-55%)',
        fontSize: '28rem', color: 'rgba(201,169,110,0.03)', fontFamily: 'var(--font-serif)',
        lineHeight: 1, pointerEvents: 'none', zIndex: 0, userSelect: 'none'
      }}>❝</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-label" style={{ marginBottom: '70px' }}>
          What Clients Say
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left — quote */}
          <div style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.55, marginBottom: '36px', fontStyle: 'italic', color: 'var(--color-text)' }}>
                  "{testimonials[current].quote}"
                </p>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '4px' }}>{testimonials[current].author}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-accent)', letterSpacing: '1px' }}>{testimonials[current].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — nav cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                onClick={() => setCurrent(i)}
                whileHover={{ x: 6 }}
                data-cursor="READ"
                className={i === current ? '' : 'glass'}
                style={{
                  padding: '20px 24px', borderRadius: '6px', transition: 'all 0.3s',
                  border: i === current ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
                  backgroundColor: i === current ? 'rgba(201,169,110,0.06)' : 'transparent',
                  opacity: i === current ? 1 : 0.5,
                }}
              >
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-text)', marginBottom: '3px' }}>{t.author}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '1px' }}>{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
