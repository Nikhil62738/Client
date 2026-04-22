import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('invite'); // invite, reward

  useEffect(() => {
    const hasSeen = localStorage.getItem('seen_review_popup');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('seen_review_popup', 'true');
  };

  const handleReview = () => {
    // Open Google Review link in new tab
    window.open('https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID', '_blank');
    // Show reward step
    setStep('reward');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            style={{
              width: '90%', maxWidth: '440px',
              backgroundColor: '#0C0F1D',
              border: '1px solid rgba(255,153,51,0.2)',
              borderRadius: '16px',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,153,51,0.1)',
              overflow: 'hidden'
            }}
          >
            {/* Ambient background glow */}
            <div style={{
              position: 'absolute', top: '-20%', right: '-20%',
              width: '60%', height: '60%',
              background: 'radial-gradient(circle, rgba(255,153,51,0.08) 0%, transparent 70%)',
              zIndex: 0
            }} />

            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                fontSize: '1.2rem', cursor: 'pointer', zIndex: 1
              }}
            >
              &times;
            </button>

            {step === 'invite' ? (
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '50%', 
                  backgroundColor: 'rgba(255,153,51,0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' 
                }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--color-gold)">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff', marginBottom: '14px' }}>
                  Enjoying the <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Vision?</span>
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
                  Share your thoughts on Google and unlock a <span style={{ color: '#fff', fontWeight: 600 }}>Special Premiere Offer</span> for your next cinematic project.
                </p>

                <button
                  onClick={handleReview}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '40px',
                    backgroundColor: 'var(--color-gold)', color: '#000',
                    fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
                    letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase',
                    border: 'none', cursor: 'pointer', marginBottom: '16px',
                    boxShadow: '0 10px 20px rgba(255,153,51,0.2)'
                  }}
                >
                  Write a Review
                </button>
                <button
                  onClick={handleClose}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Maybe Later
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
              >
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '50%', 
                  backgroundColor: 'rgba(0,184,212,0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' 
                }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--color-accent)">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.5 2.5 0 0 0-5 0c0 .35.07.69.18 1H9.18c.11-.31.18-.65.18-1a2.5 2.5 0 0 0-5 0c0 .35.07.69.18 1H2v14h18V6zM9 4c0-.55.45-1 1-1s1 .45 1 1s-.45 1-1 1s-1-.45-1-1zM5 4c0-.55.45-1 1-1s1 .45 1 1s-.45 1-1 1s-1-.45-1-1zm13 14H4V8h5.08L7 10.83L8.41 12.25L11.17 9.5L12 8.66l.83.84l2.76 2.75l1.41-1.42L14.92 8H20v10z"/>
                  </svg>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff', marginBottom: '14px' }}>
                  Premier <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Unlocked</span>
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you for your support. Use the code below for <span style={{ color: '#fff', fontWeight: 600 }}>15% OFF</span> your first booking.
                </p>

                <div style={{
                  padding: '16px', borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px dashed var(--color-accent)',
                  fontFamily: 'var(--font-sans)', fontSize: '1.2rem',
                  color: 'var(--color-accent)', fontWeight: 700,
                  letterSpacing: '4px', marginBottom: '32px'
                }}>
                  CINEMA15
                </div>

                <button
                  onClick={handleClose}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '40px',
                    backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff',
                    fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
                    letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase',
                    border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
                  }}
                >
                  Claim & Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
