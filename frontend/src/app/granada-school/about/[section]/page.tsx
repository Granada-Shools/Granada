'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import SchoolNavbar from '@/components/shared/SchoolNavbar';
import SchoolFooter from '@/components/shared/SchoolFooter';

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label: 'About Us',
    href: '/granada-school/about',
    image: '/building.jpeg',
    imageCaption: 'A Unique Blend of Discovery + Purpose',
    children: [
      { label: "Principal's Welcome", href: '/granada-school/about/welcome' },
      { label: 'Vision & Mission', href: '/granada-school/about/vision' },
      { label: 'Core Values', href: '/granada-school/about/values' },
      { label: 'Our Story', href: '/granada-school/about/history' },
      { label: 'Boarding', href: '/granada-school/about/boarding' },
      { label: 'Staff & Leadership', href: '/granada-school/about/staff' },
    ],
  },
  {
    label: 'Admissions',
    href: '/granada-school/admissions',
    image: '/dorm.jpeg',
    imageCaption: 'A Unique Blend of Ambition + Opportunity',
    children: [
      { label: 'Introduction', href: '/granada-school/admissions/intro' },
      {
        label: 'Why Choose Granada',
        href: '/granada-school/admissions/why-choose',
      },
      { label: 'Boarding Life', href: '/granada-school/admissions/boarding' },
      {
        label: 'Admissions Process',
        href: '/granada-school/admissions/process',
      },
      { label: 'Apply', href: '/granada-school/admissions/apply' },
      { label: 'Admissions Team', href: '/granada-school/admissions/team' },
      { label: 'Fees', href: '/granada-school/admissions/fees' },
      { label: 'Term Dates', href: '/granada-school/admissions/term-dates' },
      { label: 'Uniform', href: '/granada-school/admissions/uniform' },
      {
        label: 'School Lunches',
        href: '/granada-school/admissions/school-lunches',
      },
      {
        label: 'School Transport',
        href: '/granada-school/admissions/school-transport',
      },
    ],
  },
  {
    label: 'Academic',
    href: '/granada-school/academics',
    image: '/class.jpeg',
    imageCaption: 'A Unique Blend of Knowledge + Excellence',
    children: [
      { label: 'Overview', href: '/granada-school/academics/overview' },
      { label: 'CBC Curriculum', href: '/granada-school/academics/cbc' },
      { label: 'School Sections', href: '/granada-school/academics/sections' },
      { label: "Girls' Boarding", href: '/granada-school/academics/boarding' },
      { label: 'Career', href: '/granada-school/academics/careers' },
      { label: 'Apply', href: '/granada-school/academics/apply' },
    ],
  },
  {
    label: 'Campus Life',
    href: '/granada-school/campus-life',
    image: '/sports.jpeg',
    imageCaption: 'A Unique Blend of Growth + Community',
    children: [
      { label: 'Facilities', href: '/granada-school/campus-life/facilities' },
      {
        label: 'Co-Curricular Activities',
        href: '/granada-school/campus-life/cocurricular',
      },
    ],
  },
  {
    label: 'Pastoral & Wellbeing',
    href: '/granada-school/wellbeing',
    image: '/sports2.jpeg',
    imageCaption: 'A Unique Blend of Care + Belonging',
    children: [
      {
        label: 'Wellbeing Approach',
        href: '/granada-school/wellbeing/approach',
      },
      { label: 'Counselling', href: '/granada-school/wellbeing/counselling' },
      {
        label: 'Character Education',
        href: '/granada-school/wellbeing/character',
      },
      { label: 'Global Citizenship', href: '/granada-school/wellbeing/global' },
    ],
  },
  {
    label: 'Latest News',
    href: '/granada-school/news',
    image: '/building2.jpeg',
    imageCaption: 'A Unique Blend of Stories + Achievements',
    children: [
      { label: 'Featured Story', href: '/granada-school/news/featured' },
      { label: 'All News', href: '/granada-school/news/all-news' },
      { label: 'Events', href: '/granada-school/news/events' },
      { label: 'Newsletters', href: '/granada-school/news/newsletters' },
    ],
  },
  {
    label: 'Parents',
    href: '/granada-school/contact',
    image: '/staffroom.jpeg',
    imageCaption: 'A Unique Blend of Partnership + Trust',
    children: [
      { label: 'Parent Portal', href: '/granada-school/contact' },
      { label: 'School Calendar', href: '/granada-school/contact' },
      { label: 'Term Dates', href: '/granada-school/admissions/term-dates' },
    ],
  },
  {
    label: 'Support Us',
    href: '/granada-school/contact',
    image: '/art-room.jpeg',
    imageCaption: 'A Unique Blend of Giving + Impact',
    children: [
      { label: 'Bursaries & Scholarships', href: '/granada-school/admissions' },
      { label: 'Donations', href: '/granada-school/contact' },
      { label: 'Community Partnerships', href: '/granada-school/contact' },
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

/* ── SECTION DATA ──────────────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  { label: "Principal's Welcome", id: 'welcome' },
  { label: 'Vision & Mission', id: 'vision' },
  { label: 'Core Values', id: 'values' },
  { label: 'Our Story', id: 'history' },
  { label: 'Boarding', id: 'boarding' },
  { label: 'Staff & Leadership', id: 'staff' },
];
const BASE_PATH = '/granada-school/about';

/* ── PAGE HERO ───────────────────────────────────────────────────────────────── */
function PageHero() {
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel =
    PAGE_SECTIONS.find((s) => s.id === activeSection)?.label ||
    "Principal's Welcome";
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
          background:
            'linear-gradient(95deg, rgba(13,12,13,0.85) 0%, rgba(13,12,13,0.38) 45%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
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
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          height: '100%',
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
        background: 'var(--body-bg)',
        padding: '1.5rem 0',
      }}
      className="section-sidebar"
    >
      <p
        style={{
          fontFamily: "'Euclid Circular A',sans-serif",
          fontSize: 'clamp(0.66rem,0.92vw,0.74rem)',
          letterSpacing: '0.06em',
          color: P,
          fontWeight: 600,
          marginBottom: '1.1rem',
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
              gap: '0.75rem',
              padding: '0.65rem 0 0.65rem 1rem',
              color: activeSection === s.id ? P : '#5a5a5a',
              background: 'none',
              textDecoration: 'none',
              borderLeft:
                activeSection === s.id
                  ? `2px solid ${P}`
                  : '2px solid transparent',
              fontSize: 'clamp(0.72rem,1vw,0.8rem)',
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
        className="sidebar-where-next"
        style={{
          marginTop: '2.25rem',
          border: '1px solid #e8e6e3',
          padding: '1.4rem',
          background: '#fff',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(0.55rem,0.78vw,0.62rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: S,
            fontWeight: 700,
            marginBottom: '0.9rem',
          }}
        >
          Where Next?
        </p>
        {[
          { label: 'How to Apply', href: '/granada-school/admissions' },
          {
            label: 'Visit Granada',
            href: '/granada-school/contact?type=visit',
          },
          { label: 'Enquire Now', href: '/granada-school/contact' },
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
              fontSize: 'clamp(0.72rem,1vw,0.8rem)',
              padding: '0.45rem 0',
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
      className="section-cream"
      id="welcome"
      ref={ref}
      style={{
        paddingTop: 'clamp(3rem,6vw,5rem)',
        paddingBottom: 'clamp(3rem,6vw,5rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
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
          At Granada, we believe every learner has the potential to achieve
          remarkable things — and we are here to nurture that potential every
          step of the way.
        </p>
        <div>
          <div
            className="section-float-img"
            style={{
              float: 'right',
              margin: '0 0 1.2rem 1.5rem',
              width: 'clamp(280px,38vw,420px)',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(20px)',
              transition: 'all 0.9s ease 0.2s',
            }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
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
                remarkable school community. Granada exists to see every child
                discover who they are, what they are capable of, and how they
                can make a difference in the world."
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
                  Granada School
                </span>
              </p>
            </div>
          </div>
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(24px)',
              transition: 'all 0.9s ease 0.1s',
            }}
          >
            <p className="body-text" style={{ marginBottom: '1.2rem' }}>
              Granada School is a vibrant learning community located along
              Kenya's beautiful coast in Vipingo. The school is dedicated to
              nurturing confident, capable, and compassionate learners who are
              prepared to thrive in a rapidly changing world.
            </p>
            <p className="body-text" style={{ marginBottom: '1.2rem' }}>
              Granada offers Kenya's Competency Based Education (CBE)
              curriculum, providing learners with a strong national foundation
              and a holistic, competency-driven academic pathway.
            </p>
            <p className="body-text" style={{ marginBottom: '1.2rem' }}>
              Guided by the values of resilience, curiosity, kindness, honesty,
              and respect, the school focuses on developing the whole child —
              academically, socially, and morally.
            </p>
            <p className="body-text" style={{ marginBottom: '2rem' }}>
              Granada CBE Junior &amp; Senior Girls' Boarding Secondary School
              also provides boarding facilities for both Junior and Senior
              School girls, offering a safe and supportive environment for
              focused learning and personal growth.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                clear: 'both',
              }}
            >
              <a href="/granada-school/contact" className="btn-solid">
                Enquire Now
              </a>

              <a href="/granada-school/about/vision" className="btn-outline">
                Our Vision
              </a>
            </div>
          </div>
        </div>
        <style>{`@media(min-width:768px){.section-sidebar{display:block!important}}`}</style>
      </div>
    </section>
  );
}

/* ── VISION & MISSION (blue) ───────────────────────────────────────────────── */
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
          className="vision-grid"
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
            Granada ethos into everyday learning, personal growth, and inspiring
            experiences.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '1px',
              background: 'rgba(255,255,255,0.12)',
            }}
            className="vision-pillars"
          >
            {[
              {
                title: 'Character & Wellbeing',
                desc: 'Cultivating resilient, ethical, and socially aware learners across all aspects of school life.',
                icon: '◆',
              },
              {
                title: 'Academic Excellence',
                desc: 'Delivering personalised, high-performance learning that equips pupils for university and beyond.',
                icon: '◇',
              },
              {
                title: 'Community & Citizenship',
                desc: 'Fostering a culture of service, leadership, and responsibility both locally and globally.',
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
        <style>{`@media(min-width:640px){.vision-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:639px){.vision-pillars{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── CORE VALUES (white) ────────────────────────────────────────────────────── */
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
      desc: 'We foster a deep love for learning, creativity, and the fearless exploration of new ideas. At Granada, questions are always welcome — curiosity drives discovery, innovation, and lifelong learning.',
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
      desc: 'We celebrate diversity, nurture positive relationships, and create a supportive environment where every individual is seen and valued. Respect connects our community across backgrounds and aspirations.',
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
            ambition we hold for our learners.
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
                style={{
                  display: 'block',
                  marginBottom: 'clamp(0.5rem,0.8vw,0.85rem)',
                  width: 'clamp(2.9rem,3.9vw,3.9rem)',
                  height: 'auto',
                }}
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

/* ── OUR STORY (white) ──────────────────────────────────────────────────────── */
function OurStory() {
  const { ref, vis } = useInView(0.08);
  return (
    <section
      className="section-cream"
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
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <div
          className="section-header-block"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">Our Story</p>
          <h2 className="section-heading">
            Rooted in <em>Vipingo</em>,<br />
            Reaching the World
          </h2>
          <div className="divider" />
        </div>
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
              transform: vis ? 'none' : 'translateY(20px)',
              transition: 'all 0.9s ease 0.15s',
            }}
          >
            <p className="body-text" style={{ marginBottom: '1.1rem' }}>
              Granada School was founded on a simple but powerful conviction:
              that every child deserves access to a world-class education.
              Situated in the serene coastal environment of Vipingo, Kilifi
              County, the school was established to serve the growing families
              of Kenya and around the world.
            </p>
            <p className="body-text" style={{ marginBottom: '1.1rem' }}>
              From its earliest days, Granada has been committed to academic
              rigour, character formation, and community involvement. The
              school's CBE curriculum — aligned with Kenya's national framework
              — was designed to open doors for learners both locally and
              globally.
            </p>
            <p className="body-text" style={{ marginBottom: '2rem' }}>
              Today, Granada stands as a testament to what a school can become
              when vision, dedication, and community come together. Every day,
              our learners write the next chapter of a story that began on the
              beautiful Kenya coast — and whose impact reaches far beyond it.
            </p>
            <a href="/#campus" className="btn-solid">
              Explore Our Campus
            </a>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
        <style>{`@media(max-width:768px){#history .section-float-img{float:none!important;width:100%!important;margin:0 0 1.2rem 0!important}}`}</style>
      </div>
    </section>
  );
}

/* ── BOARDING (blue) ─────────────────────────────────────────────────────────── */
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
          margin: '0 auto',
          padding: 'clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)',
        }}
      >
        <div
          className="section-header-block"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">Junior &amp; Senior School Girls</p>
          <h2 className="section-heading">
            A Home Away <em>From Home</em>
          </h2>
          <div className="divider" />
        </div>

        <div style={{ opacity: vis ? 1 : 0, transition: 'all 0.9s ease' }}>
          <div
            className="section-float-img"
            style={{
              float: 'right',
              margin: '0 0 1.2rem 1.5rem',
              width: 'clamp(280px,38vw,420px)',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(24px)',
              transition: 'all 0.9s ease 0.15s',
            }}
          >
            <div
              className="img-hover"
              style={{
                overflow: 'hidden',
                minHeight: 'clamp(300px,50vw,420px)',
                height: '100%',
              }}
            >
              <img
                src="/dorm.jpeg"
                alt="Boarding"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <p className="body-text" style={{ marginBottom: '1.1rem' }}>
            Granada provides boarding facilities for Junior and Senior School
            girls — a safe, structured, and nurturing environment designed for
            focused learning and personal growth.
          </p>
          <p className="body-text" style={{ marginBottom: '1.1rem' }}>
            Our boarding community is built on trust, discipline, and genuine
            care. Boarders enjoy a well-balanced daily schedule that blends
            academic preparation, recreation, and supervised evening study.
          </p>
          <p className="body-text" style={{ marginBottom: '2rem' }}>
            From weekend activities to cultural events, boarding life at Granada
            shapes independence, resilience, and lifelong friendships —
            preparing girls for the challenges and opportunities that lie ahead.
          </p>
          <a
            href="/granada-school/contact?type=admissions"
            className="btn-solid"
            style={{ clear: 'both', display: 'inline-block' }}
          >
            Enquire About Boarding
          </a>
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
            clear: 'both',
            marginTop: 'clamp(2rem,3vw,3rem)',
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
        <style>{`@media(max-width:768px){#boarding>div>div:last-child{grid-template-columns:1fr 1fr!important}}@media(max-width:500px){#boarding>div>div:last-child{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── STAFF (white) ────────────────────────────────────────────────────────── */
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
      name: 'Head of CBE',
      role: 'CBE Programme Coordinator',
      img: 'https://images.unsplash.com/photo-1573496527892-904f897eb744?q=80&w=869',
    },
    {
      name: 'Head of Boarding',
      role: 'Boarding Programme Lead',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
  ];
  return (
    <section
      className="section-cream"
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
          <p className="label-tag">The People Behind Granada</p>
          <h2 className="section-heading">
            Staff &amp; <em>Leadership</em>
          </h2>
          <div className="divider" />
          <p className="body-text" style={{ maxWidth: 560 }}>
            Our dedicated team of educators brings together expertise, passion,
            and a shared commitment to every learner's journey.
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
          {[
            { l: 'Enquire', h: '/granada-school/contact' },
            { l: 'Visit Granada', h: '/granada-school/contact?type=visit' },
            { l: 'Apply Now', h: '/granada-school/admissions/apply' },
          ].map(({ l, h }) => (
            <a
              key={l}
              href={h}
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
/* ── PAGE ───────────────────────────────────────────────────────────────────────── */
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
        scrolledLogo="/g-school.svg"
        clearLogo="/g-school-dark.svg"
        logoAlt="Granada School"
        logoHref="/granada-school"
        navItems={NAV_ITEMS}
        quickLinks={[
          { label: 'Parents', href: '/granada-school/contact' },
          { label: 'Enquire', href: '/granada-school/contact' },
          { label: 'Contact us', href: '/granada-school/contact' },
        ]}
        enquireHref="/granada-school/contact"
        applyHref="/granada-school/admissions/apply"
        sideImage="/building.jpeg"
        sideImageAlt="Granada School"
      />
      <main style={{ background: 'var(--body-bg)' }}>
        <PageHero />
        <div
          style={{
            margin: '0 auto',
            padding: '0 clamp(1rem,2vw,2rem)',
            display: 'flex',
            gap: 'clamp(2rem,3vw,3.5rem)',
            alignItems: 'flex-start',
          }}
          className="section-layout"
        >
          <SectionNav />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              key={section}
              style={{ animation: 'sectionFadeIn 0.45s ease' }}
            >
              {renderSection()}
            </div>
          </div>
        </div>
      </main>
      <PageCTA />
      <SchoolFooter
        logoSrc="/g-school-dark.svg"
        logoAlt="Granada School"
        logoHref="/granada-school"
        tagline="CBE Junior & Senior Girls' Boarding Secondary School."
        schoolName="Granada School"
        curriculumLinks={[
          'CBC Kenya',
          'Early Years',
          'Primary School',
          'Junior School',
          'Senior School',
        ]}
        footerColsClass="footer-cols"
      />
    </>
  );
}
