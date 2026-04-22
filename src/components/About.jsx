import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
});

const awards = [
  { year: '2025', title: 'Best Cinematography', body: 'Mumbai International Film Festival' },
  { year: '2024', title: 'Golden Frame Award', body: 'IFFI Goa — Short Film' },
  { year: '2023', title: 'OTT Visionary Award', body: 'Screen India Summit' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        {/* Top Label */}
        <motion.p {...fadeUp()} className="section-label" style={{ marginBottom: '80px' }}>
          About the Artist
        </motion.p>

        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* ── Portrait Side ─────────────────────── */}
          {/* ── Portrait Side with 3D Tilt ─────────────────────── */}
          <motion.div 
            {...fadeUp(0.1)} 
            style={{ 
              position: 'relative',
              perspective: '1000px'
            }}
          >
            {/* Saffron glow */}
            <div style={{
              position: 'absolute', top: '30%', left: '30%',
              width: '60%', height: '60%',
              background: 'radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)',
              filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none'
            }} />
            {/* Teal glow */}
            <div style={{
              position: 'absolute', bottom: '10%', right: '5%',
              width: '40%', height: '40%',
              background: 'radial-gradient(circle, rgba(0,194,194,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none'
            }} />

            <motion.div
              whileHover={{ 
                rotateX: -5, rotateY: 5, scale: 1.02,
                transition: { duration: 0.4, ease: 'easeOut' }
              }}
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                cursor: 'pointer'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1974"
                alt="Krish Pachpor — Cinematographer"
                style={{
                  width: '100%', borderRadius: '6px', position: 'relative', zIndex: 1,
                  filter: 'contrast(1.1) saturate(0.95)', display: 'block',
                  maxHeight: '600px', objectFit: 'cover',
                  transform: 'translateZ(0)'
                }}
              />

              {/* Floating stat card in 3D space */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="glass"
                style={{
                  position: 'absolute', bottom: '30px', right: '30px',
                  zIndex: 2, padding: '24px 32px', borderRadius: '8px',
                  transform: 'translateZ(60px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', lineHeight: 1, color: 'var(--color-gold)' }}>12+</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: '6px' }}>Years of Craft</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Text Side ─────────────────────────── */}
          <div>
            <motion.h2 {...fadeUp(0.15)} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.15, marginBottom: '30px' }}>
              Light is my<br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>language.</span>
            </motion.h2>

            <motion.p {...fadeUp(0.25)} style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.85, marginBottom: '20px' }}>
              Born in Malkapur, trained in Mumbai — I've spent over a decade behind the lens documenting the soul of India. From the ghats of Kashi to the runways of Delhi Fashion Week, every frame is a conversation between light and emotion.
            </motion.p>
            <motion.p {...fadeUp(0.35)} style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.85, marginBottom: '50px' }}>
              I work across Bollywood features, OTT originals, high-end weddings, and global brand campaigns — always with the same philosophy: <em style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>great cinematography makes people feel before they think.</em>
            </motion.p>

            {/* Awards */}
            <motion.div {...fadeUp(0.4)}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '20px' }}>
                Recognition
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {awards.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
                    style={{
                      display: 'flex', gap: '24px', alignItems: 'flex-start',
                      padding: '18px 0',
                      borderBottom: i < awards.length - 1 ? '1px solid var(--color-border)' : 'none'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--color-text-muted)', minWidth: '38px', paddingTop: '2px' }}>{a.year}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '3px' }}>{a.title}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{a.body}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
