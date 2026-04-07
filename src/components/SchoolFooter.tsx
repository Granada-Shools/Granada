'use client';
import Image from 'next/image';

interface Props {
  logoSrc: string;
  logoAlt: string;
  logoHref: string;
  tagline: string;
  schoolName: string;
  curriculumLinks: string[];
  footerColsClass: string;
}

export default function SchoolFooter({ logoSrc, logoAlt, logoHref, tagline, schoolName, curriculumLinks, footerColsClass }: Props) {
  const P = 'var(--primary)';
  return (
    <footer id="contact" style={{ background: 'var(--primary)', color: '#fff', padding: 'clamp(3rem,4vw,5rem) clamp(1rem,2vw,2rem) clamp(1.2rem,2vw,2rem)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(2rem,3vw,4rem)', marginBottom: 'clamp(2rem,3vw,3.5rem)' }} className={footerColsClass}>
          {/* Col 1 — logo + tagline + socials */}
          <div>
            <a href={logoHref} style={{ textDecoration: 'none' }}>
              <Image src={logoSrc} alt={logoAlt} width={190} height={90} style={{ width: 'clamp(140px,16vw,250px)', height: 'auto', marginBottom: '0.75rem' }} />
            </a>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.75rem,0.9vw,0.82rem)', lineHeight: 1.8, maxWidth: 260, marginTop: 'clamp(0.8rem,1.2vw,1.25rem)' }}>{tagline}</p>
            <div style={{ display: 'flex', gap: 'clamp(0.4rem,0.8vw,0.65rem)', marginTop: 'clamp(0.9rem,1.2vw,1.4rem)' }}>
              {[
                { k: 'FB', i: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
                { k: 'IG', i: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
                { k: 'LI', i: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { k: 'TW', i: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
              ].map(({ k, i }) => (
                <a key={k} href="#" style={{ width: 'clamp(28px,3.5vw,32px)', height: 'clamp(28px,3.5vw,32px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>{i}</a>
              ))}
            </div>
          </div>

          {/* Col 2 — School links */}
          <div>
            <h4 style={{ fontSize: 'clamp(0.55rem,0.75vw,0.62rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: 'clamp(0.9rem,1.2vw,1.4rem)' }}>School</h4>
            {['About Us', 'Academic Life', 'Admissions', 'Curriculum', 'Campus Life', 'Our Team'].map(l => (
              <a key={l} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.7rem,0.9vw,0.8rem)', textDecoration: 'none', marginBottom: 'clamp(0.5rem,0.8vw,0.7rem)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>{l}</a>
            ))}
          </div>

          {/* Col 3 — Curriculum links (school-specific) */}
          <div>
            <h4 style={{ fontSize: 'clamp(0.55rem,0.75vw,0.62rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: 'clamp(0.9rem,1.2vw,1.4rem)' }}>Curriculum</h4>
            {curriculumLinks.map(l => (
              <a key={l} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.7rem,0.9vw,0.8rem)', textDecoration: 'none', marginBottom: 'clamp(0.5rem,0.8vw,0.7rem)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>{l}</a>
            ))}
          </div>

          {/* Col 4 — Contact Us */}
          <div>
            <h4 style={{ fontSize: 'clamp(0.55rem,0.75vw,0.62rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: 'clamp(0.9rem,1.2vw,1.4rem)' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem,1vw,0.9rem)' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.6rem,0.7vw,0.68rem)', marginBottom: 2, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Christopher Sabwa – Director</p>
                <a href="tel:+254714848289" style={{ color: '#fff', fontSize: 'clamp(0.7rem,0.9vw,0.8rem)', textDecoration: 'none' }}>+254 714 848 289</a>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.6rem,0.7vw,0.68rem)', marginBottom: 2, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Asya Adan – Officer</p>
                <a href="tel:+254717682138" style={{ color: '#fff', fontSize: 'clamp(0.7rem,0.9vw,0.8rem)', textDecoration: 'none' }}>+254 717 682 138</a>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.6rem,0.7vw,0.68rem)', marginBottom: 2, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Email</p>
                <a href="mailto:admissions@granadaschools.group" style={{ color: 'var(--secondary)', fontSize: 'clamp(0.65rem,0.85vw,0.75rem)', textDecoration: 'none', wordBreak: 'break-all' }}>admissions@granadaschools.group</a>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.6rem,0.7vw,0.68rem)', marginBottom: 2, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Address</p>
                <p style={{ color: '#fff', fontSize: 'clamp(0.7rem,0.9vw,0.8rem)', lineHeight: 1.6 }}>Vipingo, Kilifi County<br />Kenya Coast</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 'clamp(1.2rem,1.5vw,1.75rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(0.8rem,1.5vw,1rem)' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.65rem,0.8vw,0.72rem)' }}>© {new Date().getFullYear()} {schoolName}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 'clamp(1rem,1.5vw,1.75rem)', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Use', 'Safeguarding'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.6rem,0.8vw,0.68rem)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .${footerColsClass} { grid-template-columns: 1fr; }
        @media(min-width:640px) { .${footerColsClass} { grid-template-columns: 1fr 1fr 1fr 1fr !important; } }
      `}</style>
    </footer>
  );
}
