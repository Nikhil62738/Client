import { useState } from 'react';
import { motion } from 'framer-motion';

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '16px 0',
  background: 'transparent',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  color: 'var(--color-text)',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  transition: 'border-color 0.3s',
  boxSizing: 'border-box',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  borderRadius: 0,
};

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/cinematic.krish_?igsh=bXB1YmxmcGE4NGZz' },
  { name: 'Vimeo', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'IMDb', href: '#' },
];

const WHATSAPP_NUMBER = "919820000000"; // Replace with your actual WhatsApp number

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*New Inquiry from Portfolio*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Project Type:* ${formData.projectType || 'Not specified'}\n` +
      `*Message:* ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="contact" style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>
          {/* Left info */}
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-label" style={{ marginBottom: '24px' }}>
              Get in Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: '40px' }}
            >
              Let's Create<br /><span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Together.</span>
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
                Available for Bollywood features, OTT projects, luxury weddings across India, and international campaigns. Response within 24 hours.
              </p>

              {/* Contact details */}
              {[
                { label: 'Email', value: 'krish@krishpachpor.com' },
                { label: 'Phone', value: '+91 98200 XXXXX' },
                { label: 'Location', value: 'Malkapur, Maharashtra, India' },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--color-text)' }}>{item.value}</div>
                </div>
              ))}

              {/* Socials */}
              <div style={{ display: 'flex', gap: '24px', marginTop: '40px' }}>
                {socials.map(s => (
                  <motion.a
                    key={s.name} href={s.href}
                    whileHover={{ y: -4 }}
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--color-text-muted)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    {s.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="glass"
            style={{ padding: 'clamp(20px, 5vw, 50px)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '10px' }}>Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Your Name" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '10px' }}>Email</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="your@email.com" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '10px' }}>Project Type</label>
              <select 
                name="projectType" value={formData.projectType} onChange={handleChange}
                style={{ ...inputStyle, appearance: 'none' }}
              >
                <option value="" style={{ backgroundColor: '#0C0F1D' }}>Select a category</option>
                <option value="Bollywood / Feature Film" style={{ backgroundColor: '#0C0F1D' }}>Bollywood / Feature Film</option>
                <option value="OTT Series / Web Show" style={{ backgroundColor: '#0C0F1D' }}>OTT Series / Web Show</option>
                <option value="Luxury Wedding Film" style={{ backgroundColor: '#0C0F1D' }}>Luxury Wedding Film</option>
                <option value="Brand / Commercial" style={{ backgroundColor: '#0C0F1D' }}>Brand / Commercial</option>
                <option value="Music Video" style={{ backgroundColor: '#0C0F1D' }}>Music Video</option>
                <option value="Documentary" style={{ backgroundColor: '#0C0F1D' }}>Documentary</option>
              </select>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '10px' }}>Tell Me About Your Vision</label>
              <textarea 
                name="message" value={formData.message} onChange={handleChange}
                placeholder="Describe your project, timeline, and budget range..." rows={5} required
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>

            <button
              type="submit"
              style={{
                alignSelf: 'flex-start', padding: '16px 40px',
                backgroundColor: 'var(--color-gold)', color: '#000',
                fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase',
                border: 'none', borderRadius: '40px', transition: 'all 0.3s', fontWeight: 500
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-highlight)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-gold)'; e.currentTarget.style.color = '#000'; }}
            >
              Send WhatsApp Message →
            </button>
          </motion.form>
        </div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', marginTop: '100px', paddingTop: '30px', flexWrap: 'wrap', gap: '16px' }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '1px' }}>
            © 2026 Krish Pachpor. All Rights Reserved. Malkapur, Maharashtra.
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(201,169,110,0.4)' }}>
            Crafting frames that live forever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
