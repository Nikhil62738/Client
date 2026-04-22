import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Work', target: 'reels' },
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Contact', target: 'contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: scrolled ? '70px' : '90px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px',
          background: scrolled || menuOpen ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile-btn { display: flex !important; }
            nav { padding: 0 24px !important; height: 70px !important; }
          }
        `}</style>

        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', zIndex: 1001 }}>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-text)' }}>KRISH</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.55rem', letterSpacing: '4px', color: 'var(--color-accent)', textTransform: 'uppercase' }}>PACHPOR</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="nav-desktop" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={`#${link.target}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 + i * 0.08, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '2px',
                textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none',
                transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '2px',
              textTransform: 'uppercase', color: '#000', textDecoration: 'none',
              padding: '10px 24px', backgroundColor: 'var(--color-accent)', borderRadius: '30px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.target.style.backgroundColor = 'var(--color-highlight)'; }}
            onMouseLeave={e => { e.target.style.backgroundColor = 'var(--color-accent)'; }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', flexDirection: 'column', gap: '6px', cursor: 'pointer', zIndex: 1001,
            width: '30px', alignItems: 'flex-end'
          }}
        >
          <motion.div animate={{ width: menuOpen ? '100%' : '100%', rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.3 }} style={{ height: '2px', backgroundColor: '#fff', width: '30px' }} />
          <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ height: '2px', backgroundColor: '#fff', width: '20px' }} />
          <motion.div animate={{ width: menuOpen ? '100%' : '100%', rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.3 }} style={{ height: '2px', backgroundColor: '#fff', width: '25px' }} />
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              backgroundColor: '#07080F', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '40px',
              paddingTop: '60px'
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={`#${link.target}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff',
                  textDecoration: 'none', letterSpacing: '4px', textTransform: 'uppercase'
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.1 }}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#000',
                textDecoration: 'none', letterSpacing: '3px', textTransform: 'uppercase',
                padding: '16px 40px', backgroundColor: 'var(--color-accent)', borderRadius: '40px'
              }}
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
