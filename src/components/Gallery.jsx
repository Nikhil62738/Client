import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: '01', category: 'Bollywood', title: 'Roshni', sub: 'Feature Film · Mumbai, 2025',
    img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071',
    wide: true,
    reel: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4'
  },
  {
    id: '02', category: 'OTT Series', title: 'Andhere Ki Lehar', sub: 'Amazon Prime · Delhi',
    img: 'https://images.unsplash.com/photo-1618472609777-b038f5a4f2df?q=80&w=2064',
    reel: 'https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_25fps.mp4'
  },
  {
    id: '03', category: 'Music Video', title: 'Tanhaiyan', sub: 'T-Series Artist · Mumbai',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070',
    reel: 'https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_24fps.mp4'
  },
  {
    id: '04', category: 'Wedding Film', title: 'Ek Naya Safar', sub: 'Royal Palace · Udaipur',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069',
    wide: true,
    reel: 'https://videos.pexels.com/video-files/3212678/3212678-hd_1920_1080_25fps.mp4'
  },
  {
    id: '05', category: 'Commercial', title: 'Drishtikon', sub: 'Tanishq x Krish Pachpor',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976',
    reel: 'https://videos.pexels.com/video-files/2356125/2356125-hd_1920_1080_24fps.mp4'
  },
  {
    id: '06', category: 'Documentary', title: 'Varanasi Calling', sub: 'BBC India · Kashi',
    img: 'https://images.unsplash.com/photo-1561361058-c24e0a74e41b?q=80&w=2070',
    reel: 'https://videos.pexels.com/video-files/3763432/3763432-hd_1920_1080_25fps.mp4'
  },
];

function ProjectCard({ proj, index }) {
  const videoRef = useRef(null);
  const [transform3d, setTransform3d] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const onMouseMove = (e) => {
    if (!hovered) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
      setTransform3d(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    } else {
      setTransform3d('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setTransform3d('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTransform3d('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        gridColumn: proj.wide ? 'span 2' : 'span 1',
        position: 'relative', overflow: 'hidden', borderRadius: '8px',
        height: proj.wide ? '560px' : '480px', backgroundColor: '#0C0F1D',
        cursor: 'pointer',
        transition: 'transform 0.1s ease-out, box-shadow 0.4s',
        transform: transform3d,
        transformStyle: 'preserve-3d',
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.2)'
      }}
    >
      {/* Static thumbnail image */}
      <motion.img
        src={proj.img}
        alt={proj.title}
        animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
      />

      {/* Reel video — plays on hover */}
      {proj.reel && (
        <motion.video
          ref={videoRef}
          loop
          playsInline
          preload="none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
          }}
        >
          <source src={proj.reel} type="video/mp4" />
        </motion.video>
      )}

      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(7,8,15,0.97) 0%, rgba(7,8,15,0.15) 55%, transparent 100%)',
        zIndex: 1
      }} />

      {/* Hover teal+saffron tint */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(135deg, rgba(0,207,255,0.06) 0%, rgba(255,85,0,0.07) 100%)'
        }}
      />

      {/* Play indicator badge — top right */}
      {proj.reel && (
        <motion.div
          animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: '20px', right: '20px', zIndex: 3,
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(255,85,0,0.85)',
            padding: '6px 12px', borderRadius: '30px',
            backdropFilter: 'blur(8px)',
            transform: hovered ? 'translateZ(0)' : 'translateZ(30px)',
            transition: 'transform 0.3s ease-out'
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '2px', color: '#fff', textTransform: 'uppercase' }}>
            Reel
          </span>
        </motion.div>
      )}

      {/* Playing label — shows on hover */}
      {proj.reel && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: '20px', right: '20px', zIndex: 3,
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(0,207,255,0.15)',
            border: '1px solid rgba(0,207,255,0.4)',
            padding: '6px 14px', borderRadius: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Animated live dot */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--color-accent)', textTransform: 'uppercase' }}>
            Playing
          </span>
        </motion.div>
      )}

      {/* Text info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px 40px', zIndex: 3, transform: hovered ? 'translateZ(0)' : 'translateZ(40px)', transition: 'transform 0.3s ease-out' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '3px', color: 'var(--color-accent)', textTransform: 'uppercase' }}>{proj.id}</span>
          <div style={{ width: '26px', height: '1px', backgroundColor: 'var(--color-accent)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '3px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{proj.category}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: proj.wide ? '2.4rem' : '1.9rem', marginBottom: '6px', color: 'var(--color-text)' }}>
          {proj.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{proj.sub}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="work" style={{ padding: '120px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '70px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="section-label"
            >Selected Work</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              Stories I've<br /><span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Brought to Life</span>
            </motion.h2>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-highlight)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Hover cards to play reel
            </span>
          </motion.div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
