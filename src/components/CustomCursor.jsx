import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    let trailX = -100, trailY = -100;
    let raf;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const interactive = el.closest('a, button, [data-cursor]');
      setIsHover(!!interactive);
      setLabel(interactive?.dataset?.cursor || '');
    };

    const animTrail = () => {
      trailX += (pos.x - trailX) * 0.08;
      trailY += (pos.y - trailY) * 0.08;
      setTrail({ x: trailX, y: trailY });
      raf = requestAnimationFrame(animTrail);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animTrail);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [pos]);

  return (
    <>
      {/* Trailing ring */}
      <div style={{
        position: 'fixed', left: trail.x - 20, top: trail.y - 20,
        width: 40, height: 40, borderRadius: '50%',
        border: `1px solid ${isHover ? 'var(--color-highlight)' : 'rgba(255,255,255,0.2)'}`,
        pointerEvents: 'none', zIndex: 10002,
        transform: `scale(${isHover ? 1.8 : 1})`,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {label && (
          <span style={{ fontSize: '8px', letterSpacing: '1px', color: 'var(--color-highlight)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {label}
          </span>
        )}
      </div>
      {/* Sharp dot */}
      <div style={{
        position: 'fixed', left: pos.x - 3, top: pos.y - 3,
        width: 6, height: 6, borderRadius: '50%',
        backgroundColor: isHover ? 'var(--color-highlight)' : 'var(--color-accent)',
        pointerEvents: 'none', zIndex: 10003,
        transition: 'background-color 0.2s'
      }} />
    </>
  );
}
