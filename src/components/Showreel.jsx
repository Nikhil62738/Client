import { motion } from 'framer-motion';

export default function Showreel() {
  return (
    <section id="showreel" style={{ padding: '0 0 120px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ 
            rotateX: 4, 
            rotateY: -2,
            transition: { duration: 0.5, ease: 'easeOut' }
          }}
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '52%',       /* 16:9 aspect ratio */
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#0A0C18',
            border: '1px solid var(--color-border)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            cursor: 'pointer',
          }}
        >
          {/* ── VIDEO PLACEHOLDER ─────────────────────────────────
              Replace the src below with your own showreel video URL
              e.g. <source src="/videos/showreel.mp4" type="video/mp4" />
              or embed a YouTube iframe here
          ────────────────────────────────────────────────────────── */}

          {/* Subtle ambient grid pattern on empty state */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `
              linear-gradient(rgba(0,207,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,207,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />

          {/* Ambient glow center */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%', height: '60%',
            background: 'radial-gradient(circle, rgba(0,207,255,0.07) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 1
          }} />

          {/* Letterbox bars */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '7%', backgroundColor: '#000', zIndex: 2 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '7%', backgroundColor: '#000', zIndex: 2 }} />

          {/* Center play button */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '18px',
            transform: 'translateZ(80px)'
          }}>
            <motion.div
              whileHover={{ scale: 1.1, translateZ: '100px' }}
              whileTap={{ scale: 0.93 }}
              style={{
                width: '90px', height: '90px', borderRadius: '50%',
                backgroundColor: 'rgba(255,85,0,0.12)',
                border: '1px solid rgba(255,85,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', backdropFilter: 'blur(10px)',
              }}
            >
              {/* Pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '1px solid rgba(255,85,0,0.4)',
                }}
              />
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-highlight)">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </motion.div>

            {/* Placeholder text */}
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)'
            }}>
              Director's Reel · Add your video
            </p>
          </div>

          {/* Bottom-left title with Z index */}
          <div style={{ position: 'absolute', bottom: '10%', left: '40px', zIndex: 4, transform: 'translateZ(40px)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '6px' }}>
              Director's Reel
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-saffron)' }}>
              Krish Pachpor · Malkapur, Maharashtra
            </p>
          </div>

          {/* Duration badge */}
          <div style={{
            position: 'absolute', bottom: '10%', right: '36px', zIndex: 4,
            fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.35)', letterSpacing: '2px'
          }}>
            00:00
          </div>
        </motion.div>

        {/* Instructions note below player */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '1px',
            color: 'rgba(255,255,255,0.15)', textAlign: 'center', marginTop: '20px'
          }}
        >
          🎬 &nbsp; To add your showreel: open <code style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(0,207,255,0.08)', padding: '2px 6px', borderRadius: '4px' }}>src/components/Showreel.jsx</code> and paste your video link in the &lt;source&gt; tag
        </motion.p>
      </div>
    </section>
  );
}
