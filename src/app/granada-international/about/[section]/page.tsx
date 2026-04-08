'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
import SchoolNavbar from '@/components/SchoolNavbar';
import SchoolFooter from '@/components/SchoolFooter';

const NAV_ITEMS = [
  {
    label: 'About Us',
    href: '/granada-international/about',
    image: '/building.jpeg',
    imageCaption: 'A Unique Blend of Discovery + Purpose',
    children: [
      {
        label: "Principal's Welcome",
        href: '/granada-international/about/welcome',
      },
      {
        label: 'Vision & Mission',
        href: '/granada-international/about/vision',
      },
      { label: 'Core Values', href: '/granada-international/about/values' },
      { label: 'Our Story', href: '/granada-international/about/history' },
      { label: 'Boarding', href: '/granada-international/about/boarding' },
      {
        label: 'Staff & Leadership',
        href: '/granada-international/about/staff',
      },
    ],
  },
  {
    label: 'Admissions',
    href: '/granada-international/admissions',
    image: '/dorm.jpeg',
    imageCaption: 'A Unique Blend of Ambition + Opportunity',
    children: [
      {
        label: 'About Admissions',
        href: '/granada-international/admissions/intro',
      },
      {
        label: 'Admissions Team',
        href: '/granada-international/admissions/team',
      },
      {
        label: 'KG–Year 9 Process',
        href: '/granada-international/admissions/process',
      },
      {
        label: 'Senior School',
        href: '/granada-international/admissions/senior-process',
      },
      { label: 'Apply', href: '/granada-international/admissions/apply' },
    ],
  },
  {
    label: 'Academic',
    href: '/granada-international/academics',
    image: '/class.jpeg',
    imageCaption: 'A Unique Blend of Knowledge + Excellence',
    children: [
      { label: 'Overview', href: '/granada-international/academics/overview' },
      {
        label: 'Edexcel & Cambridge',
        href: '/granada-international/academics/edexcel',
      },
      {
        label: 'School Sections',
        href: '/granada-international/academics/sections',
      },
      {
        label: 'University Pathways',
        href: '/granada-international/academics/university',
      },
      { label: 'Apply', href: '/granada-international/academics/apply' },
    ],
  },
  {
    label: 'Campus Life',
    href: '/granada-international/campus-life',
    image: '/sports.jpeg',
    imageCaption: 'A Unique Blend of Growth + Community',
    children: [
      {
        label: 'Activities & Overview',
        href: '/granada-international/campus-life/activities',
      },
      {
        label: 'Facilities',
        href: '/granada-international/campus-life/facilities',
      },
      {
        label: 'Sports & Athletics',
        href: '/granada-international/campus-life/sports',
      },
      {
        label: 'Arts & Drama',
        href: '/granada-international/campus-life/arts',
      },
      { label: 'Music', href: '/granada-international/campus-life/music' },
      {
        label: 'Co-Curricular',
        href: '/granada-international/campus-life/cocurricular',
      },
      {
        label: 'Leadership',
        href: '/granada-international/campus-life/leadership',
      },
      {
        label: 'Boarding Life',
        href: '/granada-international/campus-life/boarding',
      },
    ],
  },
  {
    label: 'Pastoral & Wellbeing',
    href: '/granada-international/wellbeing',
    image: '/sports2.jpeg',
    imageCaption: 'A Unique Blend of Care + Belonging',
    children: [
      {
        label: 'Wellbeing Approach',
        href: '/granada-international/wellbeing/approach',
      },
      {
        label: 'Counselling Support',
        href: '/granada-international/wellbeing/counselling',
      },
      { label: 'Core Values', href: '/granada-international/wellbeing/values' },
      {
        label: 'Character Education',
        href: '/granada-international/wellbeing/character',
      },
      {
        label: 'Global Citizenship',
        href: '/granada-international/wellbeing/global',
      },
      {
        label: 'Boarding Pastoral Care',
        href: '/granada-international/wellbeing/boarding-care',
      },
    ],
  },
  {
    label: 'Latest News',
    href: '/granada-international/news',
    image: '/building2.jpeg',
    imageCaption: 'A Unique Blend of Stories + Achievements',
    children: [
      { label: 'Latest News', href: '/granada-international/news/latest-news' },
      { label: 'Events', href: '/granada-international/news/events' },
      { label: 'Newsletters', href: '/granada-international/news/newsletters' },
      { label: 'Social Media', href: '/granada-international/news/social' },
    ],
  },
  {
    label: 'Parents',
    href: '/granada-international#contact',
    image: '/staffroom.jpeg',
    imageCaption: 'A Unique Blend of Partnership + Trust',
    children: [
      { label: 'Parent Portal', href: '/granada-international#contact' },
      { label: 'School Calendar', href: '/granada-international#contact' },
      { label: 'Term Dates', href: '/granada-international#contact' },
      { label: 'Reports & Policies', href: '/granada-international#contact' },
    ],
  },
  {
    label: 'Support Us',
    href: '/granada-international#contact',
    image: '/art-room.jpeg',
    imageCaption: 'A Unique Blend of Giving + Impact',
    children: [
      {
        label: 'Bursaries & Scholarships',
        href: '/granada-international/admissions',
      },
      { label: 'Donations', href: '/granada-international#contact' },
      {
        label: 'Community Partnerships',
        href: '/granada-international#contact',
      },
    ],
  },
];

/* ── useInView ─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, vis };
}

/* ── SECTION DATA ──────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  { label: "Principal's Welcome", id: 'welcome' },
  { label: 'Vision & Mission', id: 'vision' },
  { label: 'Core Values', id: 'values' },
  { label: 'Our Story', id: 'history' },
  { label: 'Boarding', id: 'boarding' },
  { label: 'Staff & Leadership', id: 'staff' },
];
const BASE_PATH = '/granada-international/about';

/* ── PAGE HERO ─────────────────────────────────────────────────────────────── */
function PageHero() {
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel =
    PAGE_SECTIONS.find((s) => s.id === activeSection)?.label || 'About Us';
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/building.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'kenBurns 14s ease-in-out infinite alternate',
        }}
      />
      {/* Decorative line grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          height: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1rem,2vw,2rem)',
          paddingTop: 'clamp(140px,16vw,165px)',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 'clamp(6rem,4vw,8rem)',
        }}
        className="hero-inner"
      >
        <div style={{ flex: 1 }} />

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: '0 2px 14px rgba(0,0,0,0.8)',
            marginBottom: '0.8rem',
            alignSelf: 'flex-end',
            maxWidth: 'clamp(260px,45vw,520px)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.4s',
          }}
        >
          <span style={{ color: '#e2c215' }}>A Unique</span>
          <br />
          <span style={{ color: '#e2c215' }}>Blend</span>
          <br />
          <span style={{ color: '#e2c215' }}>of </span>Discovery
          <br />
          <span style={{ color: '#e2c215' }}>+ </span>Purpose
        </h1>
      </div>
      <style>{`@keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.08)}}`}</style>
    </section>
  );
}

/* ── IN-PAGE SECTION NAV ───────────────────────────────────────────────────── */
function SectionNav() {
  const params = useParams();
  const activeSection = params.section as string;
  const P = '#213558';
  const S = '#e2c215';
  return (
    <aside
      style={{
        width: 'clamp(120px,12vw,180px)',
        flexShrink: 0,
        position: 'sticky',
        top: 110,
        alignSelf: 'flex-start',
        display: 'none',
      }}
      className="section-sidebar"
    >
      <p
        style={{
          fontFamily: "'Euclid Circular A',sans-serif",
          fontSize: 'clamp(0.6rem,0.9vw,0.72rem)',
          letterSpacing: '0.06em',
          color: P,
          fontWeight: 600,
          marginBottom: 'clamp(0.8rem,1.2vw,1.1rem)',
        }}
      >
        In this section
      </p>
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          borderLeft: '1px solid #e8e6e3',
        }}
      >
        {PAGE_SECTIONS.map((s, i) => (
          <Link
            key={i}
            href={`${BASE_PATH}/${s.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem,0.8vw,0.75rem)',
              padding:
                'clamp(0.5rem,0.8vw,0.65rem) 0 clamp(0.5rem,0.8vw,0.65rem) 1rem',
              color: activeSection === s.id ? P : '#5a5a5a',
              background: 'none',
              textDecoration: 'none',
              borderLeft:
                activeSection === s.id
                  ? `2px solid ${P}`
                  : '2px solid transparent',
              fontSize: 'clamp(0.65rem,0.9vw,0.78rem)',
              fontWeight: activeSection === s.id ? 700 : 400,
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              marginLeft: '-1px',
            }}
          >
            {s.label}
          </Link>
        ))}
      </nav>
      <div
        style={{
          marginTop: 'clamp(1.5rem,2vw,2.25rem)',
          border: '1px solid #e8e6e3',
          padding: 'clamp(1rem,1.5vw,1.4rem)',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(0.55rem,0.75vw,0.6rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: S,
            fontWeight: 700,
            marginBottom: 'clamp(0.7rem,1vw,0.9rem)',
          }}
        >
          Where Next?
        </p>
        {[
          { label: 'How to Apply', href: '/granada-international#admissions' },
          {
            label: 'Visit Granada',
            href: '/granada-international/contact?type=visit',
          },
          { label: 'Enquire Now', href: '/granada-international/contact' },
        ].map((l, i) => (
          <a
            key={i}
            href={l.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#5a5a5a',
              textDecoration: 'none',
              fontSize: 'clamp(0.65rem,0.9vw,0.78rem)',
              padding: 'clamp(0.35rem,0.6vw,0.45rem) 0',
              borderBottom: '1px solid #f0eee9',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = P)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5a5a5a')}
          >
            <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
              <path
                d="M1 1l3 3.5L1 8"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {l.label}
          </a>
        ))}
      </div>
      <style>{`.section-sidebar{display:block!important}`}</style>
    </aside>
  );
}

/* ── PRINCIPAL'S WELCOME ────────────────────────────────────────────────────── */
function Welcome() {
  const { ref, vis } = useInView(0.08);
  return (
    <section
      className="section-light"
      id="welcome"
      ref={ref}
      style={{
        paddingTop: 'clamp(3rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,6vw,5rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 2rem' }}>
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1rem,1.8vw,1.5rem)',
            color: 'var(--primary)',
            lineHeight: 1.65,
            marginBottom: 'clamp(1.5rem,2.5vw,2.25rem)',
            borderLeft: '3px solid var(--secondary)',
            paddingLeft: 'clamp(0.9rem,1.5vw,1.4rem)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(16px)',
            transition: 'all 0.8s ease',
          }}
        >
          At Granada International, we believe every learner has the potential
          to achieve remarkable things on a global stage — and we are here to
          nurture that potential every step of the way.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(2rem,4vw,3.5rem)',
            alignItems: 'start',
          }}
          className="int-welcome-grid"
        >
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(24px)',
              transition: 'all 0.9s ease 0.1s',
            }}
          >
            <p className="body-text" style={{ marginBottom: '1.2rem' }}>
              Granada International is a vibrant learning community located
              along Kenya's beautiful coast in Vipingo. The school is dedicated
              to nurturing confident, capable, and compassionate learners who
              are prepared to thrive in a rapidly changing world.
            </p>
            <p className="body-text" style={{ marginBottom: '1.2rem' }}>
              Delivering the internationally recognised Pearson Edexcel
              curriculum, Granada International provides learners with a
              comprehensive British academic pathway — from Early Years through
              to A-Levels — opening doors to universities worldwide.
            </p>
            <p className="body-text" style={{ marginBottom: '1.2rem' }}>
              Guided by the values of resilience, curiosity, kindness, honesty,
              and respect, the school focuses on developing the whole child —
              academically, socially, and morally.
            </p>
            <p className="body-text" style={{ marginBottom: '2rem' }}>
              Granada International also provides boarding facilities for Senior
              School girls, offering a safe and supportive environment for
              focused learning and personal growth.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="/granada-international/contact" className="btn-solid">
                Enquire Now
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('vision');
                  if (el) {
                    const y =
                      el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="btn-outline"
              >
                Our Vision
              </button>
            </div>
          </div>
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(24px)',
              transition: 'all 0.9s ease 0.2s',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                minHeight: 'clamp(280px,40vw,400px)',
              }}
              className="img-hover"
            >
              <img
                src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=387"
                alt="Principal"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
            <div
              style={{
                borderLeft: '3px solid var(--primary)',
                paddingLeft: 'clamp(0.8rem,1.5vw,1.2rem)',
                paddingTop: 'clamp(0.9rem,1.5vw,1.4rem)',
              }}
            >
              <p
                style={{
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                  fontSize: 'clamp(0.75rem,0.95vw,0.87rem)',
                  marginBottom: '0.9rem',
                }}
              >
                "I can think of no greater privilege than guiding this
                remarkable international school community. Granada International
                exists to see every child discover who they are, what they are
                capable of, and how they can make a difference in the world."
              </p>
              <p
                style={{
                  color: 'var(--primary)',
                  fontSize: 'clamp(0.6rem,0.75vw,0.68rem)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                The Principal
                <br />
                <span
                  style={{
                    color: 'var(--muted)',
                    fontWeight: 400,
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    fontSize: 'clamp(0.75rem,1.02vw,0.82rem)',
                  }}
                >
                  Granada International
                </span>
              </p>
            </div>
          </div>
        </div>
        <style>{`@media(min-width:768px){.section-sidebar{display:block!important}.int-welcome-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── VISION & MISSION ──────────────────────────────────────────────────────── */
function VisionMission() {
  const { ref, vis } = useInView(0.08);
  return (
    <section
      className="section-blue"
      id="vision"
      ref={ref}
      style={{
        paddingTop: 'clamp(3rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,6vw,5rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <div
          style={{
            marginBottom: 'clamp(1.5rem,2.5vw,2.75rem)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">Purpose & Direction</p>
          <h2 className="section-heading">
            Vision &amp; <em>Mission</em>
          </h2>
          <div className="divider" />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(1.2rem,2vw,1.75rem)',
            marginBottom: 'clamp(1.5rem,2.5vw,2.75rem)',
          }}
          className="int-vision-grid"
        >
          {[
            {
              tag: 'Vision',
              title: 'Leading Educational Excellence',
              tagColor: 'rgba(255,255,255,0.5)',
              borderColor: 'rgba(255,255,255,0.15)',
              body: 'To be a leading centre of educational excellence that nurtures innovative thinkers, responsible leaders, and globally minded citizens — equipped to shape communities and contribute meaningfully to a rapidly evolving world.',
            },
            {
              tag: 'Mission',
              title: 'Holistic & High-Quality Education',
              tagColor: 'var(--secondary)',
              borderColor: 'rgba(170,194,12,0.3)',
              body: 'To provide a holistic and high-quality education that inspires learners to achieve their full potential through academic excellence, strong character development, and a commitment to lifelong learning in a nurturing environment.',
            },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                padding: 'clamp(1.5rem,2.5vw,2.25rem)',
                border: `1px solid ${c.borderColor}`,
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.06)',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(32px)',
                transition: `all 0.9s ease ${i * 0.15}s`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: c.tagColor,
                }}
              />
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(0.52rem,0.75vw,0.6rem)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: c.tagColor,
                  fontWeight: 700,
                  marginBottom: '0.9rem',
                  border: `1px solid ${c.tagColor}`,
                  padding: '0.25rem 0.7rem',
                }}
              >
                {c.tag}
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.35rem,2.2vw,1.6rem)',
                  fontWeight: 500,
                  color: '#fff',
                  lineHeight: 1.2,
                  marginBottom: '0.9rem',
                }}
              >
                {c.title}
              </h3>
              <p className="body-text">{c.body}</p>
            </div>
          ))}
        </div>
        {/* Strategic pillars */}
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(24px)',
            transition: 'all 0.9s ease 0.3s',
          }}
        >
          <p
            className="body-text"
            style={{ marginBottom: '1.75rem', maxWidth: 620 }}
          >
            Our strategic pillars bring this vision to life — translating the
            Granada International ethos into everyday learning, personal growth,
            and inspiring global experiences.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '1px',
              background: 'rgba(255,255,255,0.12)',
            }}
            className="int-pillars-grid"
          >
            {[
              {
                title: 'Character & Wellbeing',
                desc: 'Cultivating resilient, ethical, and socially aware international learners across all aspects of school life.',
                icon: '◆',
              },
              {
                title: 'Academic Excellence',
                desc: 'Delivering personalised, Edexcel-standard learning that equips pupils for universities across the globe.',
                icon: '◇',
              },
              {
                title: 'Global Citizenship',
                desc: 'Fostering a culture of service, international leadership, and responsibility both locally and globally.',
                icon: '◈',
              },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: '1.75rem 1.5rem',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(0.88rem,1.2vw,0.98rem)',
                    color: 'var(--secondary)',
                    display: 'block',
                    marginBottom: '0.65rem',
                  }}
                >
                  {p.icon}
                </span>
                <h4
                  style={{
                    fontSize: 'clamp(0.68rem,0.95vw,0.78rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#fff',
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 'clamp(0.75rem,1.02vw,0.82rem)',
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(min-width:640px){.int-vision-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:768px){.int-pillars-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){.int-pillars-grid{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── CORE VALUES ────────────────────────────────────────────────────────────── */
function CoreValues() {
  const { ref, vis } = useInView(0.08);
  const values = [
    {
      title: 'Resilience',
      icon: '/resilience.svg',
      color: 'var(--primary)',
      tagline: 'Grow Through Challenge',
      desc: 'We encourage learners to persevere, overcome obstacles, and emerge stronger from every experience. Resilience is the foundation that allows students to face uncertainty with confidence and adapt with grace.',
      extras: [
        'Growth mindset in every classroom',
        'Challenges as opportunities',
        'Perseverance celebrated daily',
      ],
    },
    {
      title: 'Curiosity',
      icon: '/curioisty.svg',
      color: 'var(--secondary)',
      tagline: 'Love of Learning',
      desc: 'We foster a deep love for learning, creativity, and the fearless exploration of new ideas. At Granada International, questions are always welcome — curiosity drives discovery, innovation, and lifelong learning.',
      extras: [
        'Inquiry-based learning',
        'Creative problem-solving',
        'Cross-curricular exploration',
      ],
    },
    {
      title: 'Kindness',
      icon: '/kindness.svg',
      color: 'var(--accent-warm)',
      tagline: 'Empathy in Action',
      desc: 'We promote empathy, compassion, and genuine respect for every person within and beyond the school community. Kindness shapes our classroom culture and the character of every graduate.',
      extras: [
        'Peer support programmes',
        'Community outreach',
        'Inclusive school culture',
      ],
    },
    {
      title: 'Honesty',
      icon: '/honesty.svg',
      color: 'var(--accent-green)',
      tagline: 'Integrity Always',
      desc: 'We uphold integrity, accountability, and ethical behaviour in every aspect of school life. We believe trust is earned through honesty — and honest people build honest communities.',
      extras: [
        'Academic integrity policy',
        'Open communication',
        'Ethical leadership training',
      ],
    },
    {
      title: 'Respect',
      icon: '/respect.svg',
      color: 'var(--accent-blue)',
      tagline: 'Valuing Every Voice',
      desc: 'We celebrate diversity, nurture positive relationships, and create a supportive environment where every individual is seen and valued. Respect connects our international community across backgrounds and aspirations.',
      extras: [
        'Cultural celebrations',
        'Student voice programmes',
        'Anti-bullying commitment',
      ],
    },
  ];
  return (
    <section
      className="section-cream"
      id="values"
      ref={ref}
      style={{
        paddingTop: 'clamp(3rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,6vw,5rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <div
          style={{
            marginBottom: 'clamp(1.5rem,2.5vw,2.75rem)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">What Guides Us</p>
          <h2 className="section-heading">
            Our Core <em>Values</em>
          </h2>
          <div className="divider" />
          <p className="body-text" style={{ maxWidth: 560 }}>
            Five key values shape every interaction, every lesson, and every
            ambition we hold for our international learners.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: '1px',
            background: '#dddbd8',
            marginBottom: 'clamp(1.5rem,2.5vw,2.5rem)',
          }}
        >
          {values.map((v, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                padding:
                  'clamp(1rem,1.5vw,1.75rem) clamp(0.8rem,1.2vw,1.35rem)',
                borderTop: `3px solid ${v.color}`,
                position: 'relative',
                overflow: 'hidden',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(32px)',
                transition: `all 0.9s ease ${i * 0.1}s`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#f9f8f6')
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: -24,
                  right: -14,
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  background: v.color,
                  opacity: 0.07,
                }}
              />
              <Image
                src={v.icon}
                alt={v.title}
                width={100}
                height={100}
                style={{ display: 'block', marginBottom: 'clamp(0.5rem,0.8vw,0.85rem)', width: 'clamp(2.9rem,3.9vw,3.9rem)', height: 'auto' }}
              />
              <h3
                style={{
                  fontSize: 'clamp(0.65rem,0.8vw,0.82rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--body-text)',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: 'clamp(0.55rem,0.75vw,0.62rem)',
                  color: v.color,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: 'clamp(0.5rem,0.8vw,0.85rem)',
                }}
              >
                {v.tagline}
              </p>
              <p
                className="body-text"
                style={{
                  fontSize: 'clamp(0.65rem,0.85vw,0.79rem)',
                  marginBottom: 'clamp(0.6rem,0.9vw,0.9rem)',
                }}
              >
                {v.desc}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                {v.extras.map((e, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.45rem',
                      color: 'var(--muted)',
                      fontSize: 'clamp(0.6rem,0.75vw,0.7rem)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{ color: v.color, flexShrink: 0, marginTop: 1 }}
                    >
                      —
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){#values>div>div:nth-of-type(2){grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){#values>div>div:nth-of-type(2){grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── OUR STORY ──────────────────────────────────────────────────────────────── */
function OurStory() {
  const { ref, vis } = useInView(0.08);
  return (
    <section
      className="section-light"
      id="history"
      ref={ref}
      style={{
        paddingTop: 'clamp(3rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,6vw,5rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <div>
          <div
            className="section-float-img"
            style={{
              float: 'left',
              margin: '0 1.5rem 1.2rem 0',
              width: 'clamp(260px,38vw,420px)',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(-24px)',
              transition: 'all 0.9s ease',
            }}
          >
            <div
              className="img-hover"
              style={{ overflow: 'hidden', height: 'clamp(320px,50vw,400px)' }}
            >
              <img
                src="/class.jpeg"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(24px)',
              transition: 'all 0.9s ease 0.15s',
            }}
          >
            <p className="label-tag">Our Story</p>
            <h2 className="section-heading">
              Rooted in <em>Vipingo</em>,<br />
              Reaching the World
            </h2>
            <div className="divider" />
            <p className="body-text" style={{ marginBottom: '1.1rem' }}>
              Granada International was founded on a powerful conviction: that
              every child deserves access to a world-class, internationally
              recognised education. Situated in the serene coastal environment
              of Vipingo, Kilifi County, the school was established to serve the
              growing families of Kenya and the wider global community.
            </p>
            <p className="body-text" style={{ marginBottom: '1.1rem' }}>
              From its earliest days, Granada International has been committed
              to academic rigour, character formation, and community
              involvement. The school's Pearson Edexcel pathway was designed to
              open doors for learners both locally and globally — ensuring every
              graduate is equipped for the world's best universities.
            </p>
            <p className="body-text" style={{ marginBottom: '2rem' }}>
              Today, Granada International stands as a testament to what a
              school can become when vision, dedication, and community come
              together on Kenya's beautiful coast — a story whose next chapter
              is being written by our learners every single day.
            </p>
            <a
              href="/granada-international#campus"
              className="btn-solid"
              style={{ clear: 'both', display: 'inline-block' }}
            >
              Explore Our Campus
            </a>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    </section>
  );
}

/* ── BOARDING ────────────────────────────────────────────────────────────────── */
function Boarding() {
  const { ref, vis } = useInView(0.08);
  return (
    <section
      className="section-blue"
      id="boarding"
      ref={ref}
      style={{
        paddingTop: 'clamp(3rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,6vw,5rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(2rem,4vw,4rem)',
            alignItems: 'center',
            marginBottom: 'clamp(2rem,3vw,3rem)',
          }}
          className="int-boarding-grid"
        >
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(-24px)',
              transition: 'all 0.9s ease',
            }}
          >
            <p className="label-tag">Senior School Girls</p>
            <h2 className="section-heading">
              A Home Away <em>From Home</em>
            </h2>
            <div className="divider" />
            <p className="body-text" style={{ marginBottom: '1.1rem' }}>
              Granada International provides boarding facilities for Senior
              School girls — a safe, structured, and nurturing environment
              designed for focused learning and personal growth.
            </p>
            <p className="body-text" style={{ marginBottom: '1.1rem' }}>
              Our boarding community is built on trust, discipline, and genuine
              care. Boarders enjoy a well-balanced daily schedule that blends
              academic preparation, recreation, and supervised evening study.
            </p>
            <p className="body-text" style={{ marginBottom: '2rem' }}>
              From weekend activities to cultural events, boarding life at
              Granada International shapes independence, resilience, and
              lifelong friendships — preparing girls for the challenges and
              opportunities that lie ahead.
            </p>
            <a
              href="/granada-international/contact?type=admissions"
              className="btn-solid"
            >
              Enquire About Boarding
            </a>
          </div>
          <div
            style={{
              overflow: 'hidden',
              minHeight: 'clamp(300px,50vw,420px)',
              height: '100%',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(24px)',
              transition: 'all 0.9s ease 0.15s',
            }}
            className="img-hover"
          >
            <img
              src="/dorm.jpeg"
              alt="Boarding"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.12)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(24px)',
            transition: 'all 0.9s ease 0.25s',
          }}
        >
          {[
            {
              title: 'Safe & Secure',
              icon: '🏠',
              desc: "Staffed around the clock by caring adults committed to every boarder's safety and comfort.",
            },
            {
              title: 'Structured Routine',
              icon: '📋',
              desc: 'A balanced daily schedule blending academics, meals, recreation, and supervised evening study.',
            },
            {
              title: 'Personal Growth',
              icon: '🌟',
              desc: 'Boarding life builds independence, resilience, and lifelong friendships.',
            },
            {
              title: 'Academic Support',
              icon: '📚',
              desc: 'Evening prep sessions supervised by experienced staff to keep learners motivated and on track.',
            },
            {
              title: 'Vibrant Community',
              icon: '🤝',
              desc: 'Weekend activities and cultural events where girls from diverse backgrounds come together.',
            },
            {
              title: 'Healthy Nutrition',
              icon: '🥗',
              desc: 'Nutritious, well-balanced meals prepared to support the energy needs of active learners.',
            },
          ].map((b, i) => (
            <div
              key={i}
              style={{
                padding: 'clamp(1rem,1.5vw,1.6rem) clamp(0.9rem,1.2vw,1.4rem)',
                background: 'rgba(255,255,255,0.04)',
                transition: 'background 0.25s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')
              }
            >
              <span
                style={{
                  fontSize: 'clamp(1.1rem,1.8vw,1.4rem)',
                  display: 'block',
                  marginBottom: 'clamp(0.4rem,0.6vw,0.6rem)',
                }}
              >
                {b.icon}
              </span>
              <h4
                style={{
                  fontSize: 'clamp(0.65rem,0.75vw,0.75rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#fff',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                }}
              >
                {b.title}
              </h4>
              <p
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 'clamp(0.65rem,0.85vw,0.8rem)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
        <style>{`@media(min-width:640px){.int-boarding-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:640px){#boarding>div>div:last-child{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:400px){#boarding>div>div:last-child{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── STAFF ────────────────────────────────────────────────────────────────── */
function StaffSnapshot() {
  const { ref, vis } = useInView(0.08);
  const staff = [
    {
      name: 'The Principal',
      role: 'Head of School',
      img: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=387',
    },
    {
      name: 'Director of Academics',
      role: 'Academic Leadership',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    {
      name: 'Head of International',
      role: 'Edexcel Programme Director',
      img: 'https://images.unsplash.com/photo-1573496527892-904f897eb744?q=80&w=869',
    },
    {
      name: 'University Counsellor',
      role: 'Global Pathways & Destinations',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
  ];
  return (
    <section
      className="section-light"
      id="staff"
      ref={ref}
      style={{
        paddingTop: 'clamp(3rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,6vw,5rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <div
          style={{
            marginBottom: 'clamp(1.5rem,2.5vw,2.5rem)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(16px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">The People Behind Granada International</p>
          <h2 className="section-heading">
            Staff &amp; <em>Leadership</em>
          </h2>
          <div className="divider" />
          <p className="body-text" style={{ maxWidth: 560 }}>
            Our dedicated team of international educators brings together
            expertise, passion, and a shared commitment to every learner's
            global journey.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 'clamp(0.9rem,1.5vw,1.4rem)',
          }}
        >
          {staff.map((s, i) => (
            <div
              key={i}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(32px)',
                transition: `all 0.9s ease ${i * 0.1}s`,
              }}
            >
              <div
                className="img-hover"
                style={{
                  overflow: 'hidden',
                  minHeight: 'clamp(220px,35vw,280px)',
                  height: '100%',
                  marginBottom: 'clamp(0.6rem,1vw,0.9rem)',
                }}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
              </div>
              <h4
                style={{
                  fontSize: 'clamp(0.72rem,1vw,0.84rem)',
                  color: 'var(--body-text)',
                  fontWeight: 700,
                  marginBottom: '0.2rem',
                }}
              >
                {s.name}
              </h4>
              <p
                style={{
                  fontSize: 'clamp(0.6rem,0.8vw,0.68rem)',
                  color: 'var(--primary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                {s.role}
              </p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){#staff>div:nth-of-type(2){grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){#staff>div:nth-of-type(2){grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/building2.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(33,53,88,0.9)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          padding: 'clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <p
          style={{
            color: 'var(--accent-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontSize: 'clamp(0.55rem,0.85vw,0.62rem)',
            fontWeight: 700,
            marginBottom: 'clamp(0.9rem,1.5vw,1.4rem)',
          }}
        >
          Ready to Begin?
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem,3.8vw,3rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.3,
            marginBottom: 'clamp(1.5rem,2.25vw,2.25rem)',
          }}
        >
          Are you ready to feel the{' '}
          <span style={{ color: 'var(--accent-light)' }}>difference?</span>
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.9rem',
            flexWrap: 'wrap',
          }}
        >
          {['Enquire', 'Visit Granada', 'Apply Now'].map((l) => (
            <a
              key={l}
              href="/granada-international#admissions"
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.75rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.55)',
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontSize: 'clamp(0.62rem,0.88vw,0.7rem)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ROOT ────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  welcome: () => <Welcome />,
  vision: () => <VisionMission />,
  values: () => <CoreValues />,
  history: () => <OurStory />,
  boarding: () => <Boarding />,
  staff: () => <StaffSnapshot />,
};

export default function AboutPage() {
  const params = useParams();
  const section = (params.section as string) || 'welcome';
  const renderSection = SECTION_MAP[section] || SECTION_MAP['welcome'];
  return (
    <>
      <SchoolNavbar
        scrolledLogo="/g-international.svg"
        clearLogo="/g-international-dark.svg"
        logoAlt="Granada International"
        logoHref="/granada-international"
        navItems={NAV_ITEMS}
        quickLinks={[
          { label: 'Parents', href: '/granada-international#contact' },
          { label: 'Enquire', href: '/granada-international/contact' },
          { label: 'Contact us', href: '/granada-international/contact' },
        ]}
        enquireHref="/granada-international/contact"
        applyHref="/granada-international/contact"
        headerApplyHref="/granada-international#admissions"
        sideImage="/building.jpeg"
        sideImageAlt="Granada International"
      />
      <PageHero />
      <div style={{ background: 'var(--body-bg)' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 clamp(1rem,2vw,2rem)',
            display: 'flex',
            gap: 'clamp(2rem,3vw,3.5rem)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
          className="section-layout"
        >
          <SectionNav />
          <main style={{ flex: 1, minWidth: 0 }}>
            <div
              key={section}
              style={{ animation: 'sectionFadeIn 0.45s ease' }}
            >
              {renderSection()}
            </div>
          </main>
        </div>
      </div>
      <PageCTA />
      <SchoolFooter
        logoSrc="/g-international-dark.svg"
        logoAlt="Granada International"
        logoHref="/granada-international"
        tagline="Forward Thinking. Inspiring Excellence. Shaping the Future."
        schoolName="Granada International"
        curriculumLinks={[
          'Pearson Edexcel',
          'Key Stages 1\u20135',
          'IGCSE',
          'A-Levels',
          'Results',
          'University Pathways',
        ]}
        footerColsClass="int-footer-cols"
      />
      <style>{`@keyframes sectionFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  );
}
