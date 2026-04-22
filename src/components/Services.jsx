import { motion } from 'framer-motion';

const services = [
  {
    num: '01', title: 'Director of Photography',
    desc: 'Full creative control of the visual language — from pre-production lighting plans and lens selection to on-set direction. Available for Bollywood features, OTT originals, and indie films.',
    tags: ['Arri Alexa Mini', 'RED Monstro', 'Sony Venice']
  },
  {
    num: '02', title: 'Cinematic Wedding Films',
    desc: 'Premium wedding storytelling across India — Udaipur, Jaipur, Goa, Mumbai. We capture the emotion between the rituals, not just the rituals themselves.',
    tags: ['Pre-Wedding', 'Baraat', 'Reception', 'Drone Aerial']
  },
  {
    num: '03', title: 'Commercial & Brand',
    desc: 'High-end production for luxury brands, FMCG, fashion, and OTT promos. Trusted by Tanishq, Lakmé, Myntra, and leading Indian startups.',
    tags: ['TVC', 'Product Films', 'Campaign']
  },
  {
    num: '04', title: 'Color Grading & DI',
    desc: 'Full Digital Intermediate and finishing in DaVinci Resolve. Achieve a premium cinematic look — from warm Bollywood warmth to cold OTT grit.',
    tags: ['Resolve Studio', 'LUT Design', 'HDR Delivery']
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '80px 0', backgroundColor: 'var(--color-bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-label">
              What I Offer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Services &<br /><span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Capabilities</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '280px', lineHeight: 1.7, textAlign: 'right' }}
            className="hide-mobile"
          >
            Based in Malkapur. Available across Maharashtra and internationally.
          </motion.p>
        </div>

        {/* Service rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="responsive-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: '40px',
                alignItems: 'start',
                padding: '48px 0',
                borderBottom: '1px solid var(--color-border)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--color-text-muted)', paddingTop: '4px' }}>{s.num}</div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '14px', color: 'var(--color-text)' }}>{s.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '2px',
                      textTransform: 'uppercase', padding: '5px 12px', borderRadius: '30px',
                      border: '1px solid var(--color-border)', color: 'var(--color-text-muted)'
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
