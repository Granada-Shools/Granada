'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface NavChild {
  label: string;
  href: string;
}
export interface NavItem {
  label: string;
  href: string;
  image: string;
  imageCaption: string;
  children?: NavChild[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  quickLinks: { label: string; href: string }[];
  enquireHref: string;
  applyHref: string;
  sideImage: string;
  sideImageAlt: string;
}

export default function SchoolSideNav({
  open,
  onClose,
  navItems,
  quickLinks,
  enquireHref,
  applyHref,
  sideImage,
  sideImageAlt,
}: Props) {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState('');
  const [sf, setSf] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) setActive(0);
  }, [open]);

  const cur = navItems[active];
  const sr = search.trim()
    ? navItems.flatMap((n) =>
        [{ label: n.label, href: n.href }, ...(n.children || [])].filter((c) =>
          c.label.toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  const P = '#213558';
  const S = '#aac20c';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'row',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.77,0,0.175,1)',
        boxShadow: '-8px 0 60px rgba(0,0,0,0.3)',
        fontSize: 'clamp(0.7rem,1.5vw,1rem)',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* ── Left panel: nav content (75%) ─────────────────────────────────── */}
      <div
        style={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
          background: '#213558',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(0.8rem,2vw,1.1rem) clamp(1.5rem,3vw,2.5rem)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0,
            gap: 'clamp(0.8rem,2vw,1.5rem)',
            background: 'rgba(0,0,0,0.2)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 'clamp(0.5rem,1.5vw,1.5rem)',
              alignItems: 'center',
              flexWrap: 'wrap',
              flex: 1,
              minWidth: 0,
            }}
          >
            {quickLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={onClose}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.6rem,1.2vw,0.7rem)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = S)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ flex: 1, maxWidth: 280, position: 'relative' }}>
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSf(true)}
              onBlur={() => setTimeout(() => setSf(false), 150)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.1)',
                border: `1px solid ${sf ? '#fff' : 'rgba(255,255,255,0.3)'}`,
                color: '#fff',
                padding: '0.45rem 2rem 0.45rem 0.8rem',
                fontSize: 'clamp(0.72rem,1vw,0.8rem)',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '0.7rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(0.78rem,1.1vw,0.88rem)',
                pointerEvents: 'none',
              }}
            >
              ⌕
            </span>
            {search.trim() && sr.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  border: `1px solid ${P}30`,
                  zIndex: 10,
                  maxHeight: 240,
                  overflowY: 'auto',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                {sr.map((r, i) => (
                  <a
                    key={i}
                    href={r.href}
                    onClick={() => {
                      setSearch('');
                      onClose();
                    }}
                    style={{
                      display: 'block',
                      padding: '0.6rem 1rem',
                      color: '#1c1b1c',
                      textDecoration: 'none',
                      fontSize: 'clamp(0.75rem,1.02vw,0.82rem)',
                      borderBottom: '1px solid #f0eee9',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = `${P}10`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    {r.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: `1px solid rgba(255,255,255,0.4)`,
              color: '#fff',
              width: 'clamp(32px,6vw,36px)',
              height: 'clamp(32px,6vw,36px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = S;
              e.currentTarget.style.color = P;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#fff';
            }}
            aria-label="Close"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <line
                x1="1"
                y1="1"
                x2="12"
                y2="12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="12"
                y1="1"
                x2="1"
                y2="12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Col 1 — primary nav list */}
          <div
            style={{
              width: 'clamp(400px,55vw,550px)',
              fontWeight: 500,
              flexShrink: 0,
              borderRight: '1px solid rgba(255,255,255,0.1)',
              overflowY: 'auto',
              padding: 'clamp(1rem,2vw,1.5rem) 0',
              background: 'rgba(0,0,0,0.2)',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1 }}>
              {navItems.map((item, i) => (
                <button
                  key={item.label}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    setActive(i);
                    const dest = item.children?.[0]?.href ?? item.href;
                    onClose();
                    router.push(dest);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    background:
                      active === i ? 'rgba(255,255,255,0.15)' : 'transparent',
                    border: 'none',
                    borderLeft:
                      active === i ? `3px solid ${S}` : '3px solid transparent',
                    padding:
                      'clamp(0.65rem,1.5vw,0.85rem) clamp(1.1rem,2vw,1.5rem) clamp(0.65rem,1.5vw,0.85rem) clamp(1rem,2vw,1.35rem)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(1.1rem,1.3vw,1.5rem)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: active === i ? S : '#fff',
                      transition: 'color 0.2s',
                      fontFamily: 'inherit',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </span>
                  <svg
                    width="5"
                    height="9"
                    viewBox="0 0 5 9"
                    fill="none"
                    style={{ flexShrink: 0, opacity: active === i ? 1 : 0.3 }}
                  >
                    <path
                      d="M1 1l3 3.5L1 8"
                      stroke={active === i ? S : '#fff'}
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
            {/* Contact Us link at bottom */}
            <a
              href={enquireHref}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding:
                  'clamp(0.65rem,1.5vw,0.85rem) clamp(1.1rem,2vw,1.5rem) clamp(0.65rem,1.5vw,0.85rem) clamp(1rem,2vw,1.35rem)',
                borderTop: '1px solid rgba(255,255,255,0.12)',
                borderLeft: '3px solid transparent',
                textDecoration: 'none',
                gap: '0.5rem',
                background: 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderLeftColor = S;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderLeftColor = 'transparent';
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(1.25rem,1.2vw,0.8rem)',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: S,
                  fontFamily: 'inherit',
                }}
              >
                Contact Us
              </span>
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                style={{ flexShrink: 0, opacity: 0.7 }}
              >
                <path
                  d="M1 1l3 3.5L1 8"
                  stroke={S}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Col 2 + Col 3 */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Col 2 — children links */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                background: '#213558',
              }}
            >
              <div
                style={{
                  padding: 'clamp(1rem,2vw,1.5rem) clamp(1rem,2vw,1.5rem) 0',
                  flexShrink: 0,
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(0.55rem,1rem,0.6rem)',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  {cur.label}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding:
                    'clamp(0.85rem,1.5vw,1.25rem) clamp(1rem,2vw,1.5rem)',
                }}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
                >
                  {cur.children?.map((child, i) => (
                    <a
                      key={i}
                      href={child.href}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(0.4rem,0.8vw,0.6rem)',
                        padding: 'clamp(0.4rem,0.8vw,0.55rem) 0',
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: 'clamp(0.7rem,1.2vw,0.8rem)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = S;
                        const d = e.currentTarget.querySelector(
                          '.dot'
                        ) as HTMLElement;
                        if (d) d.style.background = S;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#fff';
                        const d = e.currentTarget.querySelector(
                          '.dot'
                        ) as HTMLElement;
                        if (d) d.style.background = 'transparent';
                      }}
                    >
                      <span
                        className="dot"
                        style={{
                          width: 5,
                          height: 5,
                          border: `1px solid ${S}`,
                          flexShrink: 0,
                          transition: 'background 0.2s',
                          background: 'transparent',
                        }}
                      />
                      {child.label}
                    </a>
                  ))}
                </div>
                <div
                  className="section-blue"
                  style={{
                    display: 'flex',
                    gap: 'clamp(0.4rem,0.8vw,0.6rem)',
                    marginTop: 'clamp(1rem,1.5vw,1.5rem)',
                    flexWrap: 'wrap',
                  }}
                >
                  <a
                    href={enquireHref}
                    onClick={onClose}
                    className="btn-solid"
                    style={{
                      fontSize: 'clamp(0.55rem,1rem,0.6rem)',
                      padding:
                        'clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)',
                    }}
                  >
                    Enquire
                  </a>
                  <a
                    href={applyHref}
                    onClick={onClose}
                    className="btn-outline"
                    style={{
                      fontSize: 'clamp(0.55rem,1rem,0.6rem)',
                      padding:
                        'clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)',
                    }}
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: 'clamp(0.6rem,1.5vw,0.85rem) clamp(1.5rem,3vw,2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            gap: 'clamp(0.5rem,1vw,1rem)',
            flexWrap: 'wrap',
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 'clamp(0.5rem,1vw,0.75rem)',
              alignItems: 'center',
            }}
          >
            {[
              {
                k: 'FB',
                i: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ),
              },
              {
                k: 'IG',
                i: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                ),
              },
              {
                k: 'LI',
                i: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                k: 'TW',
                i: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
            ].map(({ k, i }) => (
              <a
                key={k}
                href="#"
                style={{
                  width: 'clamp(24px,4vw,28px)',
                  height: 'clamp(24px,4vw,28px)',
                  border: `1px solid rgba(255,255,255,0.4)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = S;
                  e.currentTarget.style.color = P;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                {i}
              </a>
            ))}
          </div>
          <p
            style={{
              color: '#fff',
              fontSize: 'clamp(0.6rem,1vw,0.7rem)',
              letterSpacing: '0.06em',
            }}
          >
            Vipingo, Kilifi County, Kenya
          </p>
        </div>
      </div>

      {/* ── Right panel: active nav-item image (25%) ─────────────────────── */}
      <div
        onClick={onClose}
        className="sidenav-right-panel"
        style={{
          flex: 1,
          background: '#213558',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 80vh centered image container — single active image only */}
        <div
          style={{
            position: 'relative',
            width: '82%',
            height: '80vh',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${cur.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 0.4s ease',
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top,rgba(33,53,88,0.85) 0%,rgba(33,53,88,0.15) 60%)',
              pointerEvents: 'none',
            }}
          />
          {/* Caption */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(1rem,2vw,1.5rem)',
              left: 'clamp(1rem,2vw,1.25rem)',
              right: 'clamp(1rem,2vw,1.25rem)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <p
              style={{
                fontFamily: "'Euclid Circular A',sans-serif",
                color: '#fff',
                fontSize: 'clamp(0.75rem,1.2vw,0.95rem)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {cur.imageCaption}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .sidenav-right-panel { display: none !important; }
        @media(min-width: 900px) { .sidenav-right-panel { display: flex !important; } }
      `}</style>
    </div>
  );
}
