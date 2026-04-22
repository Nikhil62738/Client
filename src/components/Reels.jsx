import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const reels = [
  { id: 'R01', title: 'Halad', category: 'Event', video: '/reels/Halad.mp4' },
  { id: 'R02', title: 'Saptapadi', category: 'Wedding', video: '/reels/Sappt padi.mp4' },
  { id: 'R03', title: 'Shop Opening', category: 'Commercial', video: '/reels/Shop opening.mp4' },
  { id: 'R04', title: 'Varat', category: 'Wedding', video: '/reels/Varat.mp4' },
  { id: 'R05', title: 'Vastu Shanti', category: 'Event', video: '/reels/VastuSanti.mp4' },
  { id: 'R06', title: 'Welcome', category: 'Wedding', video: '/reels/Welcome .mp4' },
];

function ReelCard({ reel, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [transform3d, setTransform3d] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const onMouseMove = (e) => {
    if (!playing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
      setTransform3d(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    } else {
      setTransform3d('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }
  };

  const onEnter = () => {
    setPlaying(true);
    setTransform3d('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const onLeave = () => {
    setPlaying(false);
    setTransform3d('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      onClick={() => {
        if (playing) onLeave();
        else onEnter();
      }}
      style={{
        flexShrink: 0,
        width: '270px',
        height: '480px',
        borderRadius: '18px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#0C0F1D',
        border: `1px solid ${playing ? 'var(--color-accent)' : 'var(--color-border)'}`,
        boxShadow: playing
          ? '0 0 30px rgba(0,207,255,0.25), 0 20px 50px rgba(0,0,0,0.5)'
          : '0 10px 40px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.1s ease-out',
        transform: transform3d,
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
    >
      <video
        ref={videoRef}
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 1,
          transition: 'transform 0.6s ease',
          transform: `scale(${playing ? 1.06 : 1})`,
        }}
      >
        <source src={reel.video} type="video/mp4" />
      </video>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to top, rgba(7,8,15,0.95) 0%, rgba(7,8,15,0.05) 55%, transparent 100%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute', top: '14px', left: '14px', zIndex: 4,
        display: 'flex', alignItems: 'center', gap: '5px',
        background: playing ? 'rgba(0,207,255,0.15)' : 'rgba(255,85,0,0.85)',
        border: playing ? '1px solid rgba(0,207,255,0.5)' : 'none',
        padding: '5px 10px', borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s, transform 0.3s ease-out',
        transform: playing ? 'translateZ(0)' : 'translateZ(30px)',
      }}>
        {playing ? (
          <>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', animation: 'pulse 1s infinite', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.55rem', letterSpacing: '2px', color: 'var(--color-accent)', textTransform: 'uppercase' }}>Playing</span>
          </>
        ) : (
          <>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.55rem', letterSpacing: '2px', color: '#fff', textTransform: 'uppercase' }}>Reel</span>
          </>
        )}
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: playing ? 0 : 1, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3" /></svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px', zIndex: 4, transform: playing ? 'translateZ(0)' : 'translateZ(40px)', transition: 'transform 0.3s ease-out' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', display: 'block', marginBottom: '5px' }}>{reel.category}</span>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: 1.25 }}>{reel.title}</h4>
      </div>
    </motion.div>
  );
}

export default function Reels() {
  const scroll = (direction) => {
    const strip = document.getElementById('reels-strip');
    if (strip) strip.scrollBy({ left: direction * 310, behavior: 'smooth' });
  };

  return (
    <section id="reels" style={{ padding: '100px 0', backgroundColor: 'var(--color-bg)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-label">Reels</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>Behind the <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Frame</span></motion.h2>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => scroll(-1)} style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={() => scroll(1)} style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid var(--color-accent)', backgroundColor: 'var(--color-accent)', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '2px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '40px' }}>← Scroll horizontally · Hover or Tap to play →</motion.p>
      </div>

      <div id="reels-strip" style={{
        display: 'flex', gap: '16px', overflowX: 'auto', paddingLeft: 'max(40px, calc((100vw - 1360px) / 2))', paddingRight: 'max(40px, calc((100vw - 1360px) / 2))', paddingBottom: '16px', scrollbarWidth: 'none'
      }}>
        {reels.map((reel, i) => <ReelCard key={reel.id} reel={reel} index={i} />)}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.7); } }
        @media (max-width: 768px) {
          #reels-strip { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  );
}
