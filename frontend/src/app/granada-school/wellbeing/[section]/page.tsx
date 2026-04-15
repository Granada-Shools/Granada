'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import SchoolNavbar from '@/components/shared/SchoolNavbar';
import SchoolFooter from '@/components/shared/SchoolFooter';

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

function useInView(threshold = 0.1) {
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
  { label: 'Wellbeing Approach', id: 'approach' },
  { label: 'Counselling', id: 'counselling' },
  { label: 'Character Education', id: 'character' },
  { label: 'Global Citizenship', id: 'global' },
];
const BASE_PATH = '/granada-school/wellbeing';

function PageHero() {
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel =
    PAGE_SECTIONS.find((s) => s.id === activeSection)?.label ||
    'Wellbeing Approach';

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
          backgroundImage: 'url(/sports2.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'kbWellbeing 14s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: 'clamp(100px,15vw,190px)',
          height: 'clamp(100px,15vw,190px)',
          borderRadius: '50%',
          border: '1px solid rgba(170,194,12,0.25)',
          animation: 'spinW 30s linear infinite',
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '3%',
          width: 'clamp(70px,10vw,130px)',
          height: 'clamp(70px,10vw,130px)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'spinW 20s linear infinite reverse',
          opacity: 0.4,
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
        <div
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          className="hero-content"
        >
          <div style={{ maxWidth: 'clamp(260px,45vw,520px)' }}>
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
                marginBottom: '0.5rem',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(20px)',
                transition: 'all 0.8s ease 0.4s',
              }}
            >
              <span style={{ color: '#e2c215' }}>A Unique</span>
              <br />
              <span style={{ color: '#e2c215' }}>Blend</span>
              <br />
              <span style={{ color: '#e2c215' }}>of </span>Care
              <br />
              <span style={{ color: '#e2c215' }}>+ </span>Belonging
            </h1>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes kbWellbeing{0%{transform:scale(1)}100%{transform:scale(1.07)}}
        @keyframes spinW{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </section>
  );
}

function WellbeingApproach() {
  const { ref, vis } = useInView(0.07);
  const pillars = [
    {
      title: 'Emotional Intelligence',
      desc: 'We cultivate self-awareness, empathy, and emotional regulation — equipping learners to understand and manage their emotions with maturity and grace.',
      icon: '💛',
      color: '#ebae1b',
    },
    {
      title: 'Mental Health Support',
      desc: "Dedicated counsellors and a proactive approach to mental wellbeing ensure every student has someone to talk to, support systems in place, and coping strategies to navigate life's challenges.",
      icon: '🌿',
      color: '#4a6428',
    },
    {
      title: 'Physical Wellness',
      desc: 'A structured schedule of physical activity, nutritious meals, and rest ensures each student maintains energy, health, and the strength to perform at their best.',
      icon: '🏃',
      color: '#213558',
    },
    {
      title: 'Spiritual Growth',
      desc: 'Respectful of diverse faiths, we create space for reflection, gratitude, and the development of a strong inner life and moral compass.',
      icon: '✨',
      color: '#483454',
    },
    {
      title: 'Social Skills',
      desc: 'Cooperative learning, boarding life, and shared experiences build authentic friendships, communication skills, and lifelong bonds of sisterhood.',
      icon: '🤝',
      color: '#84b7c8',
    },
    {
      title: 'Academic Resilience',
      desc: 'We teach learners how to handle setbacks, manage pressure, and develop a growth mindset — turning challenges into stepping stones for success.',
      icon: '📈',
      color: '#c0180b',
    },
  ];
  return (
    <section
      id="approach"
      ref={ref}
      className="section-cream"
      style={{
        padding: 'clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div style={{ width: '100%' }}>
        <div
          className="section-header-block"
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem,4vw,3.5rem)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">Our Philosophy</p>
          <h2 className="section-heading">
            Wellbeing <em>At Granada</em>
          </h2>
          <div className="divider" style={{ margin: '1.25rem auto' }} />
          <p className="body-text">
            Wellbeing isn't a department at Granada — it's woven into everything
            we do, every day, for every girl.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(0.9rem,1.5vw,1.3rem)',
          }}
          className="pillars-grid"
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                padding: 'clamp(1.2rem,2vw,1.8rem)',
                position: 'relative',
                overflow: 'hidden',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : `translateY(${22 + i * 5}px)`,
                transition: `all 0.8s ease ${i * 0.09}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = `0 10px 40px ${p.color}18`;
                el.style.borderColor = `${p.color}38`;
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = 'none';
                el.style.borderColor = 'rgba(0,0,0,0.06)';
                el.style.transform = 'none';
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: p.color,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -30,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: p.color,
                  opacity: 0.04,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: 'clamp(40px,5vw,52px)',
                    height: 'clamp(40px,5vw,52px)',
                    background: `${p.color}14`,
                    border: `1px solid ${p.color}28`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(1.1rem,1.6vw,1.4rem)',
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 'clamp(0.85rem,1.15vw,0.98rem)',
                      fontWeight: 700,
                      color: 'var(--body-text)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="body-text"
                    style={{
                      fontSize: 'clamp(0.76rem,0.92vw,0.84rem)',
                      marginBottom: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:600px){.pillars-grid{grid-template-columns:1fr 1fr!important}}@media(min-width:1024px){.pillars-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </section>
  );
}

function CounsellingSection() {
  const { ref, vis } = useInView(0.07);
  return (
    <section
      id="counselling"
      ref={ref}
      className="section-blue"
      style={{
        padding: 'clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div style={{ width: '100%' }}>
        <div
          className="section-header-block"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">Guidance & Support</p>
          <h2 className="section-heading">
            Counselling <em>Support</em>
          </h2>
          <div className="divider" />
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <div
          className="section-float-img"
          style={{
            float: 'right',
            margin: '0 0 1.2rem 1.5rem',
            width: 'clamp(280px,38vw,420px)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(28px)',
            transition: 'all 0.9s ease 0.2s',
            overflow: 'hidden',
            height: 'clamp(340px,44vw,460px)',
            position: 'relative',
          }}
        >
          <img
            src="/staffroom.jpeg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top,rgba(33,53,88,0.4),transparent 65%)',
            }}
          />
        </div>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateX(-28px)',
            transition: 'all 0.9s ease',
          }}
        >
          <p className="body-text" style={{ marginBottom: '1.2rem' }}>
            Granada has a dedicated professional counselling programme designed
            to support every learner's emotional and psychological wellbeing.
            Our counsellors are trained to provide compassionate, confidential
            support.
          </p>
          <p className="body-text" style={{ marginBottom: '1.2rem' }}>
            Whether a student is navigating academic pressure, social
            challenges, homesickness, or personal growth questions, our
            dedicated counselling team is here — creating a safe, non-judgmental
            space for every conversation.
          </p>
          <p className="body-text" style={{ marginBottom: '2rem' }}>
            We also offer group sessions, life-skills workshops, and peer
            support programmes that build emotional vocabulary, resilience
            strategies, and healthy coping skills for every stage of adolescent
            development.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              clear: 'both',
            }}
          >
            {[
              {
                label: 'Individual Counselling',
                desc: 'One-on-one sessions with a trained counsellor',
              },
              {
                label: 'Group Sessions',
                desc: 'Peer discussion and shared learning',
              },
              {
                label: 'Life Skills Workshops',
                desc: 'Practical emotional intelligence training',
              },
              {
                label: 'Peer Support',
                desc: 'Older students mentoring younger girls',
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.06)',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'none' : 'translateY(12px)',
                  transition: `all 0.7s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <p
                  style={{
                    color: 'var(--secondary)',
                    fontSize: 'clamp(0.55rem,0.78vw,0.62rem)',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                  }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 'clamp(0.72rem,1vw,0.8rem)',
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CharacterSection() {
  const { ref, vis } = useInView(0.07);
  const values = [
    {
      label: 'Resilience',
      color: '#c0180b',
      desc: 'Facing setbacks with courage and bouncing back stronger than before.',
    },
    {
      label: 'Curiosity',
      color: '#ebae1b',
      desc: 'Asking questions, seeking knowledge, and embracing a love of learning.',
    },
    {
      label: 'Kindness',
      color: '#4a6428',
      desc: 'Treating every person with warmth, empathy, and genuine care.',
    },
    {
      label: 'Honesty',
      color: '#84b7c8',
      desc: 'Speaking truth, acting with integrity in all circumstances.',
    },
    {
      label: 'Respect',
      color: '#483454',
      desc: 'Honouring self, others, and the environment around us.',
    },
  ];
  return (
    <section
      id="character"
      ref={ref}
      className="section-cream"
      style={{
        padding: 'clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)',
        scrollMarginTop: '100px',
      }}
    >
      <div style={{ width: '100%' }}>
        <div
          className="section-header-block"
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem,4vw,3.5rem)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">Character Formation</p>
          <h2 className="section-heading">
            Built On <em>Five Core Values</em>
          </h2>
          <div className="divider" style={{ margin: '1.25rem auto' }} />
          <p className="body-text">
            Our values aren't a list on a wall — they are lived daily,
            celebrated continuously, and woven into the fabric of every
            experience at Granada.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(0.8rem,1.2vw,1.2rem)',
          }}
          className="values-grid"
        >
          {values.map((v, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: `clamp(60px,8vw,80px) 1fr`,
                gap: '0',
                alignItems: 'stretch',
                overflow: 'hidden',
                opacity: vis ? 1 : 0,
                transform: vis
                  ? 'none'
                  : `translateX(${i % 2 === 0 ? -24 : 24}px)`,
                transition: `all 0.8s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  background: v.color,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding:
                    'clamp(1rem,1.5vw,1.4rem) clamp(0.5rem,0.8vw,0.75rem)',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                <p
                  style={{
                    color: '#fff',
                    fontSize: 'clamp(0.52rem,0.7vw,0.6rem)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {v.label}
                </p>
              </div>
              <div
                style={{
                  background: '#fff',
                  padding: 'clamp(1rem,1.8vw,1.5rem)',
                  border: `1px solid ${v.color}18`,
                  borderLeft: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${v.color}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(0.9rem,1.3vw,1.05rem)',
                    fontWeight: 700,
                    color: v.color,
                    marginBottom: '0.4rem',
                  }}
                >
                  {v.label}
                </h3>
                <p
                  className="body-text"
                  style={{
                    fontSize: 'clamp(0.78rem,0.95vw,0.86rem)',
                    marginBottom: 0,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:640px){.values-grid{grid-template-columns:1fr 1fr!important}}@media(min-width:1100px){.values-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </section>
  );
}

function GlobalSection() {
  const { ref, vis } = useInView(0.08);
  return (
    <section
      id="global"
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(3.5rem,7vw,7rem) clamp(1rem,2vw,2rem)',
        overflow: 'hidden',
        scrollMarginTop: '100px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/sports.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg,rgba(74,100,40,0.92) 0%,rgba(13,12,13,0.88) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 'clamp(150px,20vw,280px)',
          height: 'clamp(150px,20vw,280px)',
          borderRadius: '50%',
          border: '1px solid rgba(170,194,12,0.15)',
          animation: 'spinW 35s linear infinite',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          margin: '0 auto',
        }}
      >
        <div
          className="section-float-img"
          style={{
            float: 'right',
            margin: '0 0 1.2rem 1.5rem',
            width: 'clamp(280px,38vw,420px)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(28px)',
            transition: 'all 0.9s ease 0.2s',
          }}
        >
          <div
            className="img-hover"
            style={{
              overflow: 'hidden',
              minHeight: 'clamp(300px,38vw,460px)',
              height: '100%',
              position: 'relative',
            }}
          >
            <img
              src="/class.jpeg"
              alt="Global Citizenship"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top,rgba(74,100,40,0.5),transparent 60%)',
              }}
            />
          </div>
        </div>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateX(-28px)',
            transition: 'all 0.9s ease',
          }}
        >
          <p
            style={{
              color: 'var(--secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              fontSize: 'clamp(0.56rem,0.8vw,0.65rem)',
              fontWeight: 700,
              marginBottom: '1.1rem',
            }}
          >
            Global Citizenship
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem,3.8vw,3.2rem)',
              fontWeight: 500,
              color: '#fff',
              marginBottom: '1.1rem',
              lineHeight: 1.1,
            }}
          >
            Raising <em style={{ color: 'var(--secondary)' }}>Responsible</em>
            <br />
            Global Citizens
          </h2>
          <div
            style={{
              width: 50,
              height: 2,
              background: 'var(--secondary)',
              marginBottom: '1.5rem',
            }}
          />
          <p
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 'clamp(0.82rem,1.1vw,0.9rem)',
              lineHeight: 1.88,
              marginBottom: '1rem',
            }}
          >
            At Granada, we believe education must transcend the classroom and
            prepare learners to engage meaningfully with the world. Our global
            citizenship education instils awareness, responsibility, and
            compassion.
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 'clamp(0.82rem,1.1vw,0.9rem)',
              lineHeight: 1.88,
              marginBottom: '2rem',
            }}
          >
            Through community service projects, environmental stewardship,
            cultural appreciation programmes, and discussions of global
            challenges, we shape learners who understand their role as
            responsible citizens — locally and globally.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              clear: 'both',
            }}
          >
            {[
              'Community Service',
              'Environmental Stewardship',
              'Cultural Appreciation',
              'Debate & Public Speaking',
              'Social Justice Awareness',
              'SDG Projects',
            ].map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '0.35rem 0.9rem',
                  border: '1px solid rgba(170,194,12,0.4)',
                  color: 'var(--secondary)',
                  fontSize: 'clamp(0.62rem,0.88vw,0.7rem)',
                  letterSpacing: '0.08em',
                  transition: 'all 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(170,194,12,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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

const SECTION_MAP: Record<string, () => React.ReactNode> = {
  approach: () => <WellbeingApproach />,
  counselling: () => <CounsellingSection />,
  character: () => <CharacterSection />,
  global: () => <GlobalSection />,
};

export default function WellbeingPage() {
  const params = useParams();
  const section = (params.section as string) || 'approach';
  const renderSection = SECTION_MAP[section] || SECTION_MAP['approach'];
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
