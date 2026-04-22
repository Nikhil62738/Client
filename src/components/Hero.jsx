import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const words = ["Capturing", "The", "Unseen."];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // 3D Parallax Heading
  const [headingPos, setHeadingPos] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    setHeadingPos({ x: x * 20, y: y * 20 });
  };

  // Magnetic CTA
  const btnRef = useRef(null);
  const [magPos, setMagPos] = useState({ x: 0, y: 0 });
  const onMagMove = (e) => {
    const r = btnRef.current.getBoundingClientRect();
    setMagPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.25 });
  };
  const onMagLeave = () => setMagPos({ x: 0, y: 0 });

  return (
    <section ref={ref} id="hero" onMouseMove={onMouseMove} style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', perspective: '1000px' }}>

      {/* ── Background Video ─────────────────────────────── */}
      {/* 🎬 To swap video: change the `src` below to your own .mp4 file path or URL */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            filter: 'brightness(0.55) saturate(1.3) contrast(1.05)'
          }}
        >
          {/* Free sample: Cinematic city/nature footage from Pexels */}
          <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic color-grade overlay — lighter teal+saffron tint */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(0,30,50,0.3) 0%, rgba(60,20,0,0.25) 100%)'
      }} />

      {/* Bottom fade to page bg */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 2,
        background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 100%)'
      }} />

      {/* ── Content ───────────────────────────────── */}
      <motion.div style={{
        position: 'relative', zIndex: 3, y: textY, opacity,
        padding: '0 40px 80px', width: '100%', maxWidth: '1360px', margin: '0 auto'
      }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}
        >
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-saffron)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-saffron)' }}>
            Cinematographer · Malkapur, Maharashtra
          </span>
        </motion.div>

        {/* Word reveal heading with 3D Parallax */}
        <motion.div
          style={{
            marginBottom: '40px',
            rotateY: headingPos.x,
            rotateX: -headingPos.y,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {words.map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.25em', transform: `translateZ(${i * 20}px)` }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.7 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
                  fontWeight: 400,
                  color: i === 2 ? 'var(--color-gold)' : 'var(--color-text)',
                  fontStyle: i === 2 ? 'italic' : 'normal',
                  lineHeight: 1.05,
                  letterSpacing: '-2px',
                  textShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </motion.div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '380px', lineHeight: 1.7 }}
          >
            From the streets of Malkapur to the skylines of Mumbai — crafting frames that live forever.
          </motion.p>

          {/* Magnetic CTA */}
          <motion.div
            ref={btnRef}
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
            animate={{ x: magPos.x, y: magPos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="#reels"
              data-cursor="VIEW"
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
                letterSpacing: '3px', textTransform: 'uppercase', color: '#000',
                backgroundColor: 'var(--color-text)', padding: '18px 36px',
                borderRadius: '60px', textDecoration: 'none',
                transition: 'background-color 0.4s, color 0.4s'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-highlight)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-text)'; e.currentTarget.style.color = '#000'; }}
            >
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{ position: 'absolute', right: '40px', bottom: '50px', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-text-muted)', writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '50px', backgroundColor: 'var(--color-saffron)', transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
