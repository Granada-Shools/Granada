'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import SchoolNavbar from '@/components/shared/SchoolNavbar';
import SchoolFooter from '@/components/shared/SchoolFooter';
import { AnimatePresence, motion } from 'framer-motion';

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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25 },
  },
};

/* ── useInView ─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
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

/* ── HERO ──────────────────────────────────────────────────────────────────── */
function Hero() {
  const navItems = Array.isArray(NAV_ITEMS) ? NAV_ITEMS : [];

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [displayIdx, setDisplayIdx] = useState<number | null>(null);

  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [mobileCol, setMobileCol] = useState<1 | 2>(1);

  const prevIdxRef = useRef<number | null>(null);

  // 👉 hover preselect (80ms delay)
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const slides = [
    { bg: '/building.jpeg', label: 'Inspiring Excellence' },
    { bg: '/class.jpeg', label: 'CBE Curriculum' },
    { bg: '/sports.jpeg', label: 'Vipingo, Kenya' },
    { bg: '/dorm.jpeg', label: 'Values-Based Education' },
  ];

  useEffect(() => {
    setLoaded(true);
    const t = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      6500
    );
    return () => clearInterval(t);
  }, []);

  const handleNavClick = (idx: number) => {
    prevIdxRef.current = selectedIdx;

    if (selectedIdx === idx) {
      setSelectedIdx(null);
      setDisplayIdx(null);
      setMobileCol(1);
      return;
    }

    setSelectedIdx(idx);

    // 🚀 FIX: prevents col2 flicker/pulse bug
    setDisplayIdx((prev) => {
      setTimeout(() => {
        setDisplayIdx(idx);
      }, 80);
      return prev;
    });

    setMobileCol(2);
  };

  // 👉 direction-aware animation
  const getDirection = (idx: number | null) => {
    if (prevIdxRef.current === null || idx === null) return 1;
    return idx > prevIdxRef.current ? 1 : -1;
  };

  const childVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
  };

  return (
    <section
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      {/* --- BACKGROUND SLIDES (UNCHANGED) --- */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${s.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 2s cubic-bezier(0.45, 0, 0.55, 1)',
            animation: 'kenBurns 14s ease-in-out infinite alternate',
            willChange: 'opacity, transform',
          }}
        />
      ))}

      {/* --- OVERLAY (UNCHANGED) --- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(13,12,13,0.85) 0%, rgba(13,12,13,0.6) 45%, rgba(13,12,13,0.38) 70%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* --- LOGO (UNCHANGED) --- */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(1.2rem,3vh,2rem) 0',
          zIndex: 10,
        }}
      >
        <Image
          src="/g-school-dark.svg"
          alt="Granada CBE"
          width={120}
          height={54}
          style={{
            height: 'auto',
            width: 'clamp(180px,7vw,190px)',
            flexShrink: 0,
          }}
          priority
        />
      </div>

      {/* ================= NAV ================= */}
      <div
        style={{
          position: 'relative',
          zIndex: 15,
          height: '70vh',
          padding: '0 clamp(1.5rem,4vw,4rem)',
          display: 'flex',
          alignItems: 'center',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(30px)',
          transition: 'all 1s ease 0.2s',
          marginTop: 'clamp(7.5rem,10vh,8rem)',
          overflowX: 'hidden',
        }}
      >
        <div
          className="hero-nav-desktop"
          style={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
          {/* ================= COL 1 ================= */}
          <div
            className="nav-col-scroll"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              minWidth: 400,
              overflowY: 'auto',
              maxHeight: '60vh',
              paddingTop: '2rem',
              paddingBottom: '2rem',
              alignSelf: 'stretch',
              overflowX: 'hidden',
            }}
          >
            {navItems.map((item, idx) => {
              const active = selectedIdx === idx;
              const hovered = hoverIdx === idx;

              return (
                <motion.button
                  key={item.label}
                  onHoverStart={() => {
                    hoverTimer.current = setTimeout(() => setHoverIdx(idx), 80);
                  }}
                  onHoverEnd={() => {
                    if (hoverTimer.current) clearTimeout(hoverTimer.current);
                    setHoverIdx(null);
                  }}
                  onClick={() => handleNavClick(idx)}
                  animate={{
                    x: active ? 18 : hovered ? 4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'none',
                    border: 'none',
                    color: selectedIdx === idx ? '#e2c215' : '#fff',
                    fontSize: 'clamp(0.85rem,1.1vw,1.1rem)',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    padding: '0.6em 0',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{ position: 'relative', display: 'inline-block' }}
                  >
                    {item.label}
                    <motion.span
                      layoutId="underline"
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: -3,
                        height: 2,
                        width: '100%',
                        background: '#e2c215',
                        borderRadius: 0,
                      }}
                      initial={false}
                      animate={{ scaleX: active ? 1 : 0 }}
                    />
                  </span>


<div
  style={{
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: active ? "#e2c215" : "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative",
  }}
>
  {/* horizontal line (always visible) */}
  <div
    style={{
      width: 12,
      height: 2,
      background: "#0b1b3b",
      borderRadius: 2,
    }}
  />

  {/* vertical line = ONLY when NOT active (plus sign) */}
  {!active && (
    <div
      style={{
        position: "absolute",
        width: 2,
        height: 12,
        background: "#0b1b3b",
        borderRadius: 2,
      }}
    />
  )}
</div>
                </motion.button>
              );
            })}
          </div>

          {/* ================= COL 2 ================= */}
          <div
            className="nav-col-scroll"
            style={{
              overflowY: 'auto',
              maxHeight: '60vh',
              overflowX: 'hidden',
              width:
                selectedIdx !== null &&
                (navItems[selectedIdx]?.children?.length ?? 0) > 0
                  ? 'clamp(400px,20vw,580px)'
                  : '0',
              opacity: selectedIdx !== null ? 1 : 0,
              marginLeft:
                selectedIdx !== null ? 'clamp(1.5rem,3vw,2.5rem)' : '0',
              transition:
                'width 1.78s cubic-bezier(0.77,0,0.175,1), opacity 0.3s, margin-left 0.78s',
              flexShrink: 0,
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <AnimatePresence mode="wait">
              {selectedIdx !== null && displayIdx !== null && (
                <motion.div
                  key={displayIdx}
                  custom={getDirection(displayIdx)}
                  variants={childVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {/* BACK BUTTON (UNCHANGED STYLE) */}
                  <button
                    onClick={() => {
                      prevIdxRef.current = selectedIdx;
                      setSelectedIdx(null);
                      setDisplayIdx(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'none',
                      border: 'none',
                      color: '#e2c215',
                      cursor: 'pointer',
                      padding: 'clamp(0.9rem,1.5vw,1.4rem)',
                      paddingBottom: '0.5rem',
                      fontFamily: 'inherit',
                      fontSize: 'clamp(0.7rem,0.85vw,0.85rem)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.7';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {/* Left arrowhead */}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M7 1L3 5L7 9"
                        stroke="#e2c215"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Back
                  </button>

                  {navItems[displayIdx]?.children?.map((child, i) => (
                    <motion.a
                      key={child.label}
                      href={child.href}
                      variants={itemVariants}
                      style={{
                        padding: '0.6rem 1rem',
                        color: '#fff',
                        textDecoration: 'none',
                      }}
                    >
                      {child.label}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* ================= MOBILE ================= */}
        <div
          className="hero-nav-mobile"
          style={{ width: '100%', display: 'none' }}
        >
          {/* COL 1 */}
          <AnimatePresence mode="wait">
            {mobileCol === 1 && (
              <motion.div
                key="col1"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="nav-col-scroll"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  maxHeight: '60vh',
                  overflowY: 'auto',
                }}
              >
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    onHoverStart={() => {
                      hoverTimer.current = setTimeout(
                        () => setHoverIdx(idx),
                        80
                      );
                    }}
                    onHoverEnd={() => {
                      if (hoverTimer.current) clearTimeout(hoverTimer.current);
                      setHoverIdx(null);
                    }}
                    onClick={() => handleNavClick(idx)}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: 'none',
                      border: 'none',
                      color: selectedIdx === idx ? '#e2c215' : '#fff',
                      fontSize: 'clamp(0.85rem,1.1vw,1.1rem)',
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: '0.6em 0',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{ position: 'relative', display: 'inline-block' }}
                    >
                      {item.label}
                      <motion.span
                        layoutId="underline"
                        style={{
                          position: 'absolute',
                          left: 0,
                          bottom: -3,
                          height: 2,
                          width: '100%',
                          background: '#e2c215',
                          borderRadius: 0,
                        }}
                        initial={false}
                        animate={{ scaleX: active ? 1 : 0 }}
                      />
                    </span>

                    {/* ARROW (UNCHANGED LOOK) */}
                    <svg
                      width="44"
                      height="9"
                      viewBox="0 0 44 9"
                      fill="none"
                      style={{
                        flexShrink: 0,
                        opacity: 1,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      {/* Shaft */}
                      <line
                        x1="0"
                        y1="4.5"
                        x2="38"
                        y2="4.5"
                        stroke={selectedIdx === idx ? '#e2c215' : '#fff'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      {/* Arrowhead */}
                      <path
                        d="M34 1l4 3.5L34 8"
                        stroke={selectedIdx === idx ? '#e2c215' : '#fff'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* COL 2 */}
          <AnimatePresence mode="wait">
            {mobileCol === 2 && (
              <motion.div
                key="col2"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="nav-col-scroll"
                style={{ overflowY: 'auto', maxHeight: '60vh' }}
              >
                <button
                  onClick={() => setMobileCol(1)}
                  style={{ color: '#e2c215' }}
                >
                  ← Back
                </button>

                {navItems[selectedIdx!]?.children?.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    style={{
                      display: 'block',
                      padding: '0.6rem 0',
                      color: '#fff',
                    }}
                  >
                    {child.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── TAGLINE STRIP ─────────────────────────────────────────────────────────── */
function TaglineStrip() {
  return (
    <div
      className="section-blue"
      style={{ padding: 'clamp(0.8rem,1.2vw,1.2rem) clamp(1rem,2vw,2rem)' }}
    >
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(1.5rem,3vw,2.5rem)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {[
          'Academic Excellence · CBE',
          "Safe Girls' Boarding Environment",
          'Holistic Character Formation',
          'Every Learner Rises',
        ].map((t, i) => (
          <span
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.6rem,1.2vw,1rem)',
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(0.8rem,1.5vw,1rem)',
                fontWeight: 400,
                color: '#fff',
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </span>
            {i < 3 && (
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--secondary)',
                  flexShrink: 0,
                }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── WELCOME ───────────────────────────────────────────────────────────────── */
function Welcome() {
  const { ref, vis } = useInView(0.1);
  return (
    <section
      className="section-cream"
      id="about"
      ref={ref}
      style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)' }}
    >
      <div
        style={{
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(2rem,4vw,6rem)',
          alignItems: 'center',
        }}
        className="welcome-grid"
      >
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateX(-30px)',
            transition: 'all 0.9s ease',
          }}
        >
          <p className="label-tag">Our Story</p>
          <h2 className="section-heading">
            A Unique Blend of <em>Discipline + Purpose</em>
          </h2>
          <div className="divider" />
          <p
            className="body-text"
            style={{ marginBottom: 'clamp(0.8rem,1.2vw,1.25rem)' }}
          >
            Located along Kenya's beautiful coast in Vipingo, Granada CBE Junior
            &amp; Senior Girls' Boarding Secondary School is dedicated to
            nurturing confident, disciplined, and high-achieving young women
            under the Competency-Based Education (CBE) framework.
          </p>
          <p
            className="body-text"
            style={{ marginBottom: 'clamp(0.8rem,1.2vw,1.25rem)' }}
          >
            Our boarding environment provides a safe, structured, and supportive
            space where learners grow academically, socially, emotionally, and
            spiritually — in a community built on sisterhood and shared values.
          </p>
          <p
            className="body-text"
            style={{ marginBottom: 'clamp(1.5rem,2.5vw,2rem)' }}
          >
            We believe every girl carries within her immense potential. Through
            quality education, structured boarding life, and a values-driven
            environment, we unlock that potential — raising learners who are
            academically strong, morally grounded, and ready to lead.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'clamp(0.5rem,1vw,0.75rem)',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/granada-school/about"
              className="btn-solid"
              style={{
                fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                padding: 'clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)',
              }}
            >
              About Granada
            </a>
            <a
              href="/granada-school/about#vision"
              className="btn-outline"
              style={{
                fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                padding: 'clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)',
              }}
            >
              Our Vision
            </a>
          </div>
        </div>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(30px)',
            transition: 'all 0.9s ease 0.15s',
            height: 'clamp(350px,52vw,440px)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            className="img-hover"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          >
            <img
              src="/building.jpeg"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top,rgba(33,53,88,0.3),transparent 60%)',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-16px',
              left: '-16px',
              width: 90,
              height: 90,
              background: 'var(--secondary)',
              opacity: 0.18,
              zIndex: -1,
              display: 'none',
            }}
            className="welcome-accent"
          />
        </div>
      </div>
      <style>{`@media(min-width:768px){.welcome-grid{grid-template-columns:1fr 1fr!important}.welcome-accent{display:block!important}}`}</style>
    </section>
  );
}

/* ── CURRICULUM ────────────────────────────────────────────────────────────── */
function Curriculum() {
  const { ref, vis } = useInView(0.1);
  const curricula = [
    {
      title: 'CBE',
      subtitle: 'Competency Based Education',
      desc: "Kenya's national framework building strong local foundations, nurturing 21st-century skills through competency-driven, holistic learning.",
      color: 'var(--primary)',
      border: 'rgba(33,53,88,0.2)',
      features: [
        'Holistic Development',
        'Local Relevance',
        'Values-Based Learning',
        'STEM Integration',
      ],
    },
    {
      title: 'Boarding',
      subtitle: 'Structured Boarding Programme',
      desc: 'A secure home-away-from-home with trained matrons, supervised prep sessions, nutritious meals, counselling support, and a strong sisterhood community.',
      color: 'var(--accent-warm)',
      border: 'rgba(147,108,81,0.2)',
      features: [
        'Safe Supervised Dormitories',
        'Structured Prep Sessions',
        'Pastoral Care & Counselling',
        'Balanced Meals & Routines',
      ],
    },
  ];
  return (
    <section
      className="section-cream"
      id="curriculum"
      ref={ref}
      style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)' }}
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem,3.5vw,3.5rem)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(24px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="label-tag">Academic Pathways</p>
          <h2 className="section-heading">
            CBE Curriculum. <em>World-Class Standards.</em>
          </h2>
          <p
            className="body-text"
            style={{
              maxWidth: 1240,
              margin: 'clamp(0.8rem,1.5vw,1.25rem) auto 0',
            }}
          >
            Granada implements Kenya's Competency-Based Education framework with
            a focus on mastery, critical thinking, and real-world application —
            preparing every learner for a dynamic future.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(1.2rem,2vw,1.75rem)',
          }}
          className="curriculum-grid"
        >
          {curricula.map((c, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${c.border}`,
                padding: 'clamp(1.5rem,2.5vw,2.5rem)',
                position: 'relative',
                overflow: 'hidden',
                background: '#fff',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(36px)',
                transition: `all 0.9s ease ${i * 0.15}s`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: c.color,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -50,
                  right: -20,
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: c.color,
                  opacity: 0.05,
                }}
              />
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem,3vw,2.8rem)',
                  fontWeight: 700,
                  color: c.color,
                  lineHeight: 1,
                  marginBottom: 'clamp(0.2rem,0.5vw,0.35rem)',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: 'clamp(0.6rem,0.8vw,0.68rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  color: 'var(--muted)',
                  marginBottom: 'clamp(0.8rem,1.5vw,1.25rem)',
                }}
              >
                {c.subtitle}
              </p>
              <p
                className="body-text"
                style={{
                  marginBottom: 'clamp(1.2rem,1.75vw,1.75rem)',
                  fontSize: 'clamp(0.85rem,1vw,1rem)',
                }}
              >
                {c.desc}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(0.3rem,0.6vw,0.5rem)',
                }}
              >
                {c.features.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.5rem,0.8vw,0.7rem)',
                      color: 'var(--body-text)',
                      fontSize: 'clamp(0.75rem,0.9vw,0.82rem)',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        background: c.color,
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:768px){.curriculum-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── PILLARS (blue bg) ─────────────────────────────────────────────────────── */
function Pillars() {
  const { ref, vis } = useInView(0.1);
  const items = [
    {
      title: 'Modern Learning Environments',
      desc: 'Purpose-built classrooms, labs, and creative spaces designed to inspire curiosity and collaborative learning.',
      img: '/class.jpeg',
      tag: 'Facilities',
    },
    {
      title: 'Dedicated Educators',
      desc: "Passionate, qualified teachers committed to every learner's journey — inside and outside the classroom.",
      img: '/staffroom.jpeg',
      tag: 'Teaching',
    },
    {
      title: 'Supportive Community',
      desc: 'A warm, inclusive culture where every student feels seen, valued, and empowered to thrive.',
      img: '/dorm.jpeg',
      tag: 'Wellbeing',
    },
  ];
  return (
    <section
      className="section-blue"
      id="campus"
      ref={ref}
      style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)' }}
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(2rem,3vw,3rem)',
            flexWrap: 'wrap',
            gap: 'clamp(1rem,1.5vw,2rem)',
          }}
        >
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(-24px)',
              transition: 'all 0.8s ease',
            }}
          >
            <p className="label-tag">What Sets Us Apart</p>
            <h2 className="section-heading">
              Excellence in <em>Every Detail</em>
            </h2>
          </div>
          <a
            href="/granada-school/about"
            className="btn-outline"
            style={{
              opacity: vis ? 1 : 0,
              transition: 'opacity 0.8s ease 0.3s',
              borderColor: 'rgba(255,255,255,0.5)',
              color: '#fff',
              fontSize: 'clamp(0.65rem,1vw,0.75rem)',
              padding: 'clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Learn More
          </a>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(1rem,1.5vw,1.25rem)',
            minHeight: 0,
          }}
          className="pillars-grid"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="img-hover"
              style={{
                position: 'relative',
                minHeight: 'clamp(280px,50vw,460px)',
                height: '100%',
                overflow: 'hidden',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(40px)',
                transition: `all 0.9s ease ${i * 0.12}s`,
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top,rgba(13,12,13,0.88) 0%,rgba(13,12,13,0.15) 65%,transparent 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(0.8rem,1.5vw,1.1rem)',
                  left: 'clamp(0.8rem,1.5vw,1.1rem)',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(0.5rem,0.8vw,0.58rem)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    background: 'rgba(13,12,13,0.65)',
                    padding:
                      'clamp(0.2rem,0.4vw,0.28rem) clamp(0.5rem,1vw,0.7rem)',
                    fontWeight: 700,
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(1.2rem,2vw,1.75rem) clamp(1rem,1.5vw,1.5rem)',
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.1rem,1.8vw,1.4rem)',
                    fontWeight: 500,
                    color: '#fff',
                    lineHeight: 1.2,
                    marginBottom: 'clamp(0.4rem,0.8vw,0.65rem)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 'clamp(0.75rem,0.95vw,0.8rem)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:768px){.pillars-grid{grid-template-columns:repeat(3,1fr)!important}.pillars-grid>div{height:clamp(280px,35vw,420px)!important}}`}</style>
    </section>
  );
}

/* ── QUOTE BANNER ──────────────────────────────────────────────────────────── */
function QuoteBanner() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/building.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(33,53,88,0.88)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 820,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: 'var(--accent-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontSize: 'clamp(0.55rem,0.8vw,0.62rem)',
            fontWeight: 700,
            marginBottom: 'clamp(1.2rem,1.75vw,1.75rem)',
          }}
        >
          Our Mission
        </p>
        <blockquote
          className="font-display"
          style={{
            fontSize: 'clamp(1.2rem,3.5vw,2.6rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.45,
            marginBottom: 'clamp(1.5rem,2.25vw,2.25rem)',
          }}
        >
          "We are committed to inspiring excellence and preparing learners for a
          successful future — today, tomorrow, and beyond."
        </blockquote>
        <div
          style={{
            width: 'clamp(32px,4vw,44px)',
            height: 2,
            background: 'var(--secondary)',
            margin: '0 auto clamp(1.2rem,1.75vw,1.75rem)',
          }}
        />
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(0.65rem,0.9vw,0.78rem)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Granada CBE Junior &amp; Senior Girls' Boarding Secondary School —
          Vipingo, Kenya
        </p>
      </div>
    </section>
  );
}

// /* ── COMMUNITY (white bg) ──────────────────────────────────────────────────── */
// function Community(){
//   const {ref,vis}=useInView(0.1);
//   return(
//     <section className="section-cream" id="community" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
//       <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,6rem)",alignItems:"center"}} className="community-grid">
//         <div style={{position:"relative",height:"clamp(300px,40vw,540px)",opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease",order:1}} className="community-image">
//           <div className="img-hover" style={{position:"absolute",top:0,left:0,width:"70%",height:"58%",overflow:"hidden"}}>
//             <img src="/building.jpeg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
//           </div>
//           <div className="img-hover" style={{position:"absolute",bottom:0,right:0,width:"66%",height:"54%",overflow:"hidden"}}>
//             <img src="/building2.jpeg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
//           </div>
//           <div style={{position:"absolute",top:"43%",left:"47%",transform:"translate(-50%,-50%)",background:"var(--primary)",padding:"clamp(1rem,1.5vw,1.4rem) clamp(1.4rem,1.8vw,1.8rem)",textAlign:"center",zIndex:5,minWidth:150}}>
//             <div className="font-display" style={{fontSize:"clamp(1.8rem,2.5vw,2.4rem)",fontWeight:600,color:"#fff",lineHeight:1}}>2</div>
//             <div style={{fontSize:"clamp(0.5rem,0.7vw,0.6rem)",letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--secondary)",marginTop:5,fontWeight:700}}>Curricula Offered</div>
//           </div>
//         </div>
//         <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(30px)",transition:"all 0.9s ease 0.2s"}}>
//           <p className="label-tag">Girls' Boarding Community</p>
//           <h2 className="section-heading">A Transformative <em>Girls' Education</em></h2>
//           <div className="divider"/>
//           <p className="body-text" style={{marginBottom:"clamp(0.8rem,1.2vw,1.25rem)"}}>With modern learning environments, dedicated educators, and a safe structured boarding programme, Granada gives every girl the foundation she needs to thrive academically and personally.</p>
//           <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>We raise confident, morally grounded, and academically strong young women who are prepared to make their mark in a rapidly changing world.</p>
//           <div style={{display:"flex",flexDirection:"column",gap:"clamp(0.6rem,1vw,0.85rem)",marginBottom:"clamp(1.5rem,2vw,2.25rem)"}}>
//             {["Values-Based CBE Education","Safe Girls' Boarding Environment","Leadership & Character Formation","Holistic Wellbeing"].map((pt,i)=>(
//               <div key={i} style={{display:"flex",alignItems:"center",gap:"clamp(0.6rem,1.2vw,0.9rem)"}}>
//                 <div style={{width:`clamp(20px,2.5vw,26px)`,height:`clamp(20px,2.5vw,26px)`,border:"1px solid var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
//                   <span style={{color:"var(--primary)",fontSize:"clamp(0.5rem,0.7vw,0.65rem)"}}>✓</span>
//                 </div>
//                 <span style={{color:"var(--body-text)",fontSize:"clamp(0.78rem,0.95vw,0.84rem)",fontWeight:500}}>{pt}</span>
//               </div>
//             ))}
//           </div>
//           <a href="/granada-school/about" className="btn-solid" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>Begin Your Journey</a>
//         </div>
//       </div>
//       <style>{`@media(min-width:768px){.community-grid{grid-template-columns:1fr 1fr!important}.community-image{order:0!important}}`}</style>
//     </section>
//   );
// }

/* ── ADMISSIONS CTA (blue) ─────────────────────────────────────────────────── */
function AdmissionsCTA() {
  const { ref, vis } = useInView(0.2);
  return (
    <section
      className="section-blue"
      id="admissions"
      ref={ref}
      style={{ padding: 'clamp(3.5rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)' }}
    >
      <div
        style={{
          maxWidth: 860,
          margin: '0 auto',
          textAlign: 'center',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(24px)',
          transition: 'all 0.9s ease',
        }}
      >
        <p className="label-tag">Are you ready?</p>
        <h2 className="section-heading">
          Begin Your <em>Granada Story</em>
        </h2>
        <p
          className="body-text"
          style={{
            maxWidth: 520,
            margin:
              'clamp(0.8rem,1.5vw,1.25rem) auto clamp(1.5rem,2.5vw,2.5rem)',
            fontSize: 'clamp(0.9rem,1vw,1.05rem)',
          }}
        >
          Join a community of passionate learners, dedicated educators, and
          caring families at Granada CBE Junior &amp; Senior Girls' Boarding
          Secondary School — on Kenya's breathtaking Vipingo coast.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(0.6rem,1.2vw,1rem)',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/granada-school/contact"
            className="btn-solid"
            style={{
              fontSize: 'clamp(0.65rem,1vw,0.75rem)',
              padding: 'clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)',
            }}
          >
            Enquire Now
          </a>
          <a
            href="/granada-school/contact?type=visit"
            className="btn-outline"
            style={{
              borderColor: 'rgba(255,255,255,0.55)',
              color: '#fff',
              fontSize: 'clamp(0.65rem,1vw,0.75rem)',
              padding: 'clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Book a Visit
          </a>
          <a
            href="/granada-school/admissions#process"
            className="btn-outline"
            style={{
              borderColor: 'rgba(255,255,255,0.55)',
              color: '#fff',
              fontSize: 'clamp(0.65rem,1vw,0.75rem)',
              padding: 'clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Apply
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* <SchoolNavbar
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
        applyHref="/granada-school/contact?type=admissions"
        sideImage="/building.jpeg"
        sideImageAlt="Granada School"
      /> */}
      <Hero />
      {/* <TaglineStrip />
      <Welcome />
      <Curriculum />
      <Pillars />
      <QuoteBanner /> */}
      {/* <Community/> */}
      {/* <AdmissionsCTA />
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
      /> */}
    </>
  );
}
