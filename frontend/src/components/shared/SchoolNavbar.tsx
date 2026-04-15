'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SchoolSideNav, { NavItem } from './SchoolSideNav';

interface Props {
  scrolledLogo: string;
  clearLogo: string;
  logoAlt: string;
  logoHref: string;
  navItems: NavItem[];
  quickLinks: { label: string; href: string }[];
  enquireHref: string;
  applyHref: string;
  headerApplyHref?: string;
  sideImage: string;
  sideImageAlt: string;
}

export default function SchoolNavbar({
  scrolledLogo,
  clearLogo,
  logoAlt,
  logoHref,
  navItems,
  quickLinks,
  enquireHref,
  applyHref,
  headerApplyHref,
  sideImage,
  sideImageAlt,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const resolvedHeaderApply = headerApplyHref ?? applyHref;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <SchoolSideNav
        open={open}
        onClose={() => setOpen(false)}
        navItems={navItems}
        quickLinks={quickLinks}
        enquireHref={enquireHref}
        applyHref={applyHref}
        sideImage={sideImage}
        sideImageAlt={sideImageAlt}
      />
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 #e8e6e3' : 'none',
          padding: scrolled ? '0.7rem 0' : 'clamp(0.8rem,2vw,1.2rem) 0',
        }}
      >
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1rem,3vw,2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(0.8rem,1.5vw,1rem)',
          }}
        >
          {/* Logo — collapses width on scroll */}
          <a
            href={logoHref}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              maxWidth: scrolled ? '0px' : '500px',
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? 'none' : 'auto',
              transition: 'max-width 0.4s ease, opacity 0.3s ease',
            }}
            tabIndex={scrolled ? -1 : 0}
            aria-hidden={scrolled}
          >
            <Image
              src={clearLogo}
              alt={logoAlt}
              width={120}
              height={54}
              style={{
                height: 'auto',
                width: 'clamp(180px,7vw,170px)',
                flexShrink: 0,
              }}
              priority
            />
          </a>

          {/* Right side controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1rem,2vw,1.5rem)',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'none',
                gap: 'clamp(0.75rem,1.5vw,1.25rem)',
                alignItems: 'center',
              }}
              className="nav-quick"
            >
              {quickLinks.slice(0, 2).map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    color: scrolled ? 'var(--muted)' : 'rgba(255,255,255)',
                    textDecoration: 'none',
                    fontSize: 'clamp(0.8rem,1.2vw,0.98rem)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = scrolled
                      ? 'var(--primary)'
                      : '#fff')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = scrolled
                      ? 'var(--muted)'
                      : 'rgba(255,255,255,0.9)')
                  }
                >
                  {label}
                </a>
              ))}
              <a
                href={resolvedHeaderApply}
                className="btn-green"
                style={{
                  fontSize: 'clamp(0.7rem,1.2vw,0.82rem)',
                  padding:
                    'clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)',
                }}
              >
                Apply Now
              </a>
            </div>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              style={{
                background: 'none',
                border: `2.5px solid ${scrolled ? 'rgba(33,53,88,0.55)' : 'rgba(255,255,255,0.9)'}`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                padding: '0.5rem 0.6rem',
                transition: 'border-color 0.3s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = scrolled
                  ? 'var(--primary)'
                  : '#fff')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = scrolled
                  ? 'rgba(33,53,88,0.35)'
                  : 'rgba(255,255,255,0.6)')
              }
            >
              <span
                style={{
                  width: 25,
                  height: 2.2,
                  background: scrolled ? 'var(--primary)' : '#fff',
                  display: 'block',
                  transition: 'background 0.4s',
                }}
              />
              <span
                style={{
                  width: 21,
                  height: 2.5,
                  background: scrolled ? 'var(--primary)' : '#fff',
                  display: 'block',
                  transition: 'background 0.4s',
                }}
              />
              <span
                style={{
                  width: 17,
                  height: 2.5,
                  background: scrolled
                    ? 'var(--secondary)'
                    : 'rgba(255,255,255,0.7)',
                  display: 'block',
                }}
              />
            </button>

            <style>{`@media(min-width:768px){.nav-quick{display:flex!important}}`}</style>
          </div>
        </div>
      </header>
    </>
  );
}
