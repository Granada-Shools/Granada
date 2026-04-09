'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const values = [
  {
    label: 'Resilience',
    color: '#e2c215',
    textColor: '#000000',
    rgb: '226,194,21',
    image: '/child-red.png',
    tagline: 'Grow Through Challenge',
    desc: 'We encourage learners to persevere, overcome obstacles, and emerge stronger from every experience. Resilience is the foundation that allows students to face uncertainty with confidence and adapt with grace.',
  },
  {
    label: 'Curiosity',
    color: '#dbe5f5',
    textColor: '#000000',
    rgb: '219,229,245',
    image: '/child-yellow.png',
    tagline: 'Love of Learning',
    desc: 'We foster a deep love for learning, creativity, and the fearless exploration of new ideas. At Granada, questions are always welcome — curiosity drives discovery, innovation, and lifelong learning.',
  },
  {
    label: 'Kindness',
    color: '#A6D6C9',
    textColor: '#000000',
    rgb: '166,214,201',
    image: '/child-green.png',
    tagline: 'Empathy in Action',
    desc: 'We promote empathy, compassion, and genuine respect for every person within and beyond the school community. Kindness shapes our classroom culture and the character of every graduate.',
  },
  {
    label: 'Honesty',
    color: '#e79b0b',
    textColor: '#ffffff',
    rgb: '231,155,11',
    image: '/child-blue.png',
    tagline: 'Integrity Always',
    desc: 'We uphold integrity, accountability, and ethical behaviour in every aspect of school life. We believe trust is earned through honesty — and honest people build honest communities.',
  },
  {
    label: 'Respect',
    color: '#213558',
    textColor: '#ffffff',
    rgb: '33,53,88',
    image: '/child-purple.png',
    tagline: 'Valuing Every Voice',
    desc: 'We celebrate diversity, nurture positive relationships, and create a supportive environment where every individual is seen and valued. Respect connects our community across backgrounds and aspirations.',
  },
];

const valuePosts: Record<
  string,
  { title: string; date: string; videoId: string }[]
> = {
  Resilience: [
    {
      title: 'Sports Day 2025 — Students Push Their Limits',
      date: '15 Mar 2025',
      videoId: '',
    },
    {
      title: 'Year 9 Expedition: Conquering the Boardroom Challenge',
      date: '2 Feb 2025',
      videoId: '',
    },
    {
      title: 'Overcoming Goals — Student Stories of Perseverance',
      date: '10 Jan 2025',
      videoId: '',
    },
    {
      title: 'Cross-Country Run 2024 Highlights',
      date: '5 Nov 2024',
      videoId: '',
    },
    {
      title: 'Resilience Week — Building a Growth Mindset',
      date: '20 Sep 2024',
      videoId: '',
    },
  ],
  Curiosity: [
    {
      title: 'Science Fair 2025 — Inventions from Granada',
      date: '18 Mar 2025',
      videoId: '',
    },
    {
      title: 'STEM Showcase: Robotics Club Demo Day',
      date: '6 Feb 2025',
      videoId: '',
    },
    {
      title: 'Granada Book Club — Debate and Discovery',
      date: '14 Jan 2025',
      videoId: '',
    },
    {
      title: 'Curiosity Week: Asking the Big Questions',
      date: '8 Nov 2024',
      videoId: '',
    },
    {
      title: 'Field Trip: Exploring the Coral Reef',
      date: '25 Sep 2024',
      videoId: '',
    },
  ],
  Kindness: [
    {
      title: 'Community Outreach Day — Giving Back to Vipingo',
      date: '20 Mar 2025',
      videoId: '',
    },
    {
      title: 'Peer Mentoring Programme Launch',
      date: '10 Feb 2025',
      videoId: '',
    },
    {
      title: 'Kindness Week 2025 Highlights',
      date: '20 Jan 2025',
      videoId: '',
    },
    {
      title: "Students Support Local Children's Home",
      date: '12 Nov 2024',
      videoId: '',
    },
    {
      title: 'The Granada Way — Our Culture of Empathy',
      date: '1 Oct 2024',
      videoId: '',
    },
  ],
  Honesty: [
    {
      title: 'Student Council Forum — Open Conversations',
      date: '22 Mar 2025',
      videoId: '',
    },
    {
      title: 'Integrity in Action: A Student Panel Discussion',
      date: '12 Feb 2025',
      videoId: '',
    },
    {
      title: 'Academic Honesty Assembly 2025',
      date: '22 Jan 2025',
      videoId: '',
    },
    {
      title: 'Ethics in Leadership — Prefect Training Day',
      date: '15 Nov 2024',
      videoId: '',
    },
    {
      title: 'Honest Conversations: Mental Health Awareness',
      date: '3 Oct 2024',
      videoId: '',
    },
  ],
  Respect: [
    {
      title: 'Cultural Day 2025 — Celebrating Diversity',
      date: '25 Mar 2025',
      videoId: '',
    },
    {
      title: 'Anti-Bullying Week: United in Respect',
      date: '14 Feb 2025',
      videoId: '',
    },
    {
      title: 'Student Voice Programme — Term 1 Outcomes',
      date: '24 Jan 2025',
      videoId: '',
    },
    {
      title: 'Granada Environmental Day — Respecting Our World',
      date: '18 Nov 2024',
      videoId: '',
    },
    {
      title: 'Chapel Reflections — The Power of Respect',
      date: '7 Oct 2024',
      videoId: '',
    },
  ],
};

const valueNews: Record<
  string,
  { headline: string; date: string; href: string; image: string }
> = {
  Resilience: {
    headline:
      'Granada Students Triumph at the Regional Athletics Championships',
    date: '20 Mar 2025',
    href: '/granada-school/news',
    image: '/child-red.png',
  },
  Curiosity: {
    headline:
      'Science Fair 2025: Young Inventors Showcase Groundbreaking Projects',
    date: '18 Mar 2025',
    href: '/granada-school/news',
    image: '/child-yellow.png',
  },
  Kindness: {
    headline:
      'Granada Community Outreach Day Makes a Lasting Impact in Vipingo',
    date: '14 Mar 2025',
    href: '/granada-school/news',
    image: '/child-green.png',
  },
  Honesty: {
    headline: 'Prefect Body Launches New Student Integrity Pledge for 2025',
    date: '10 Mar 2025',
    href: '/granada-international/news',
    image: '/child-blue.png',
  },
  Respect: {
    headline:
      'Cultural Day 2025: A Celebration of Diversity and Unity at Granada',
    date: '5 Mar 2025',
    href: '/granada-international/news',
    image: '/child-purple.png',
  },
};

const socialPosts = [
  {
    platform: 'Instagram',
    image: '/child-green.png',
    caption: 'Sports Day 2025 — Students push their limits on the field!',
    date: '15 Mar 2025',
  },
  {
    platform: 'Facebook',
    image: '/child-blue.png',
    caption:
      'Science Fair 2025: Young inventors showcase groundbreaking projects.',
    date: '18 Mar 2025',
  },
  {
    platform: 'Instagram',
    image: '/child-yellow.png',
    caption: 'Community Outreach Day — giving back to Vipingo village.',
    date: '20 Mar 2025',
  },
  {
    platform: 'X / Twitter',
    image: '/child-red.png',
    caption:
      'Cultural Day 2025 — A celebration of diversity and unity at Granada.',
    date: '25 Mar 2025',
  },
];

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState<'yt' | 'news' | null>(null);
  const [socialPage, setSocialPage] = useState(0);
  const [mobileSocialIndex, setMobileSocialIndex] = useState(0);

  return (
    <div className="relative w-full h-screen overflow-hidden font-serif">
      {/* Background Images Row (horizontal on desktop, vertical on mobile) */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        {/* Mobile: "Realise your potential" card as first item */}
        <div
          className="relative flex-1 flex items-center justify-center md:hidden"
          style={{ background: '#fff' }}
        >
          <div className="text-center px-6">
            <span
              className="block font-bold"
              style={{
                fontSize: 'clamp(1.4rem, 5vw, 2rem)',
                lineHeight: 1.15,
                color: '#213558',
              }}
            >
              Realise your
            </span>
            <span
              className="block font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 7vw, 2.6rem)',
                lineHeight: 1.15,
                marginTop: '0.15em',
                color: '#213558',
              }}
            >
              potential
            </span>
          </div>
        </div>
        {values.map((value, index) => {
          const isExpanded = clickedIndex === index;
          const isCompressed = clickedIndex !== null && !isExpanded;
          const isHovered = hoveredIndex === index;
          const posts = valuePosts[value.label] ?? [];
          return (
            <div
              key={`bg-${index}`}
              className="relative overflow-hidden"
              style={{
                flexGrow: clickedIndex !== null ? (isExpanded ? 5 : 0.65) : 1,
                flexShrink: 1,
                flexBasis: 0,
                transition: 'flex-grow 0.6s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
              }}
              onMouseEnter={() => {
                if (!isCompressed) setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setClickedIndex(isExpanded ? null : index)}
            >
              {/* Background image */}
              <Image
                src={value.image}
                alt={value.label}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
                style={{
                  transform:
                    isHovered && !isExpanded ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                  objectPosition: 'center 30%',
                }}
                priority
              />

              {/* Navy overlay — top-left to bottom-right, hides on hover */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom right, #213558 0%, transparent 100%)',
                  opacity: isHovered ? 0 : 1,
                  transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              />

              {/* COMPRESSED: solid colour covers image + vertical label at bottom */}
              <div
                className="absolute inset-0 flex flex-col justify-end items-center pointer-events-none"
                style={{
                  backgroundColor: value.color,
                  opacity: isCompressed ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div style={{ padding: '0.75rem 0.5rem' }}>
                  <span
                    className="font-bold select-none block"
                    style={{
                      fontSize: 'clamp(0.6rem,1.1vw,0.9rem)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      color: value.textColor,
                    }}
                  >
                    {value.label}
                  </span>
                </div>
              </div>

              {/* HOVER TINT — slides up from bottom, only when nothing is clicked */}
              {clickedIndex === null && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `rgba(${value.rgb},0.72)`,
                    transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              )}

              {/* Close button — lives outside the expanded div so stopPropagation works cleanly */}
              {isExpanded && (
                <button
                  className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setClickedIndex(null);
                  }}
                  aria-label="Close"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {/* EXPANDED: left 2/3 image+text, right 1/3 YouTube — full height */}
              <div
                className="absolute inset-0 hidden md:flex"
                style={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.45s ease',
                  pointerEvents: isExpanded ? 'auto' : 'none',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left 2/3: own image (unzoomed, contained) + gradient + text */}
                <div
                  style={{
                    flex: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#111',
                  }}
                >
                  {/* Image fills panel horizontally, maintains natural look */}
                  <Image
                    src={value.image}
                    alt={value.label}
                    fill
                    sizes="66vw"
                    style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                    priority
                  />
                  {/* Bottom gradient for text readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 42%, transparent 70%)',
                    }}
                  />
                  {/* Value text at bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 'clamp(1.5rem,3vw,2.5rem)',
                      pointerEvents: 'none',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.62rem',
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: value.color,
                        filter: 'brightness(1.7)',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      {value.tagline}
                    </p>
                    <h2
                      style={{
                        fontSize: 'clamp(2.4rem,4vw,4rem)',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '0.8rem',
                        lineHeight: 1.0,
                      }}
                    >
                      {value.label}
                    </h2>
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2px',
                        backgroundColor: value.color,
                        filter: 'brightness(1.5)',
                        marginBottom: '1.1rem',
                      }}
                    />
                    <p
                      style={{
                        fontSize: 'clamp(0.82rem,1.15vw,0.98rem)',
                        lineHeight: 1.75,
                        color: 'rgba(255,255,255,0.9)',
                        maxWidth: '52ch',
                        marginBottom: '1.1rem',
                      }}
                    >
                      {value.desc}
                    </p>
                    <p
                      style={{
                        fontSize: 'clamp(0.72rem,0.95vw,0.84rem)',
                        lineHeight: 1.65,
                        color: 'rgba(255,255,255,0.65)',
                        maxWidth: '52ch',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      At Granada, {value.label.toLowerCase()} is not just a word
                      on a wall — it&apos;s lived and practised every day, in
                      every classroom, every interaction, and every achievement
                      our students reach.
                    </p>
                  </div>
                </div>

                {/* Right 1/3: YouTube + News — scrollable */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    backgroundColor: '#0f0f0f',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                  }}
                >
                  {posts.slice(0, 1).map((post, pi) => {
                    const news = valueNews[value.label];
                    return (
                      <React.Fragment key={pi}>
                        {/* ── YOUTUBE CARD ── */}
                        <a
                          key={`yt-${pi}`}
                          href={
                            post.videoId
                              ? `https://www.youtube.com/watch?v=${post.videoId}`
                              : 'https://www.youtube.com/@GranadaSchool'
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={() => setHoveredPanel('yt')}
                          onMouseLeave={() => setHoveredPanel(null)}
                        >
                          {/* Thumbnail — 45vh */}
                          <div
                            style={{
                              position: 'relative',
                              height: '45vh',
                              backgroundColor: '#1a1a1a',
                              overflow: 'hidden',
                            }}
                          >
                            {post.videoId ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={`https://img.youtube.com/vi/${post.videoId}/hqdefault.jpg`}
                                alt={post.title}
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transform:
                                    hoveredPanel === 'yt'
                                      ? 'scale(1.06)'
                                      : 'scale(1)',
                                  transition: 'transform 0.4s ease',
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  width: '100%',
                                  height: '100%',
                                  background: `linear-gradient(135deg, rgba(${value.rgb},0.45) 0%, #111 100%)`,
                                  transform:
                                    hoveredPanel === 'yt'
                                      ? 'scale(1.06)'
                                      : 'scale(1)',
                                  transition: 'transform 0.4s ease',
                                }}
                              />
                            )}
                            {/* Play button */}
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <div
                                style={{
                                  width: '3rem',
                                  height: '3rem',
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(255,255,255,0.18)',
                                  border: '1.5px solid rgba(255,255,255,0.5)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <svg
                                  width="12"
                                  height="14"
                                  viewBox="0 0 9 11"
                                  fill="white"
                                >
                                  <path d="M0 0L9 5.5L0 11V0Z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Speech bubble */}
                          <div
                            style={{
                              position: 'relative',
                              flexShrink: 0,
                              zIndex: 1,
                              backgroundColor: value.color,
                              padding: '1.4rem 1.1rem 1.1rem',
                            }}
                          >
                            {/* Triangle — centered, overlaps thumbnail above */}
                            <div
                              style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 0,
                                height: 0,
                                borderLeft: '20px solid transparent',
                                borderRight: '20px solid transparent',
                                borderBottom: `20px solid ${value.color}`,
                                zIndex: 2,
                              }}
                            />
                            <p
                              style={{
                                fontSize: '0.5rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: value.textColor,
                                opacity: 0.7,
                                fontWeight: 700,
                                fontFamily: 'sans-serif',
                                margin: '0 0 0.5rem',
                              }}
                            >
                              Latest on YouTube
                            </p>
                            <p
                              style={{
                                color: value.textColor,
                                fontWeight: 400,
                                fontFamily: 'sans-serif',
                                fontSize: '24px',
                                lineHeight: 1.3,
                                margin: '0 0 0.4rem',
                              }}
                            >
                              {post.title}
                            </p>
                            <p
                              style={{
                                color: value.textColor,
                                opacity: 0.65,
                                fontFamily: 'sans-serif',
                                fontSize: '24px',
                                fontWeight: 400,
                                margin: 0,
                              }}
                            >
                              {post.date}
                            </p>
                          </div>
                        </a>

                        {/* ── NEWS CARD ── */}
                        {news && (
                          <Link
                            key="news"
                            href={news.href}
                            style={{
                              display: 'block',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={() => setHoveredPanel('news')}
                            onMouseLeave={() => setHoveredPanel(null)}
                          >
                            {/* News image — 45vh */}
                            <div
                              style={{
                                position: 'relative',
                                height: '45vh',
                                backgroundColor: '#1a1a1a',
                                overflow: 'hidden',
                              }}
                            >
                              <Image
                                src={news.image}
                                alt={news.headline}
                                fill
                                sizes="33vw"
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center 20%',
                                  transform:
                                    hoveredPanel === 'news'
                                      ? 'scale(1.06)'
                                      : 'scale(1)',
                                  transition: 'transform 0.4s ease',
                                }}
                              />
                            </div>
                            {/* Speech bubble */}
                            <div
                              style={{
                                position: 'relative',
                                flexShrink: 0,
                                zIndex: 1,
                                backgroundColor: value.color,
                                padding: '1.4rem 1.1rem 1.1rem',
                              }}
                            >
                              {/* Triangle — centered, overlaps news image above */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '-20px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 0,
                                  height: 0,
                                  borderLeft: '20px solid transparent',
                                  borderRight: '20px solid transparent',
                                  borderBottom: `20px solid ${value.color}`,
                                  zIndex: 2,
                                }}
                              />
                              <p
                                style={{
                                  fontSize: '0.5rem',
                                  letterSpacing: '0.2em',
                                  textTransform: 'uppercase',
                                  color: value.textColor,
                                  opacity: 0.7,
                                  fontWeight: 700,
                                  fontFamily: 'sans-serif',
                                  margin: '0 0 0.5rem',
                                }}
                              >
                                Latest News
                              </p>
                              <p
                                style={{
                                  color: value.textColor,
                                  fontWeight: 400,
                                  fontFamily: 'sans-serif',
                                  fontSize: '24px',
                                  lineHeight: 1.3,
                                  margin: '0 0 0.4rem',
                                }}
                              >
                                {news.headline}
                              </p>
                              <p
                                style={{
                                  color: value.textColor,
                                  opacity: 0.65,
                                  fontFamily: 'sans-serif',
                                  fontSize: '24px',
                                  fontWeight: 400,
                                  margin: 0,
                                }}
                              >
                                {news.date}
                              </p>
                            </div>
                          </Link>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Bottom label bar — default state only */}
              <div
                className="absolute bottom-0 left-0 right-0 hidden md:flex items-center justify-center overflow-hidden"
                style={{
                  height: '60px',
                  backgroundColor: value.color,
                  opacity: clickedIndex === null ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                <h2
                  className="font-bold text-center"
                  style={{ fontSize: '20px', color: value.textColor }}
                >
                  {value.label}
                </h2>
              </div>

              {/* Mobile: centered label */}
              <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                <span
                  className="font-bold text-lg drop-shadow-lg px-4 py-1.5 rounded"
                  style={{
                    backgroundColor: value.color,
                    color: value.textColor,
                  }}
                >
                  {value.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Header Container - Logo and Hamburger aligned horizontally */}
      <div className="absolute top-0 left-0 right-0 z-40 flex justify-between items-start pt-3 pb-2 pl-4 md:pt-4 md:pb-3 md:pl-6 pr-4 md:pr-6">
        {/* Logo — g-school on mobile (white bg), g-school-dark on desktop (dark bg) */}
        <Image
          src="/g-school.svg"
          alt="Granada School"
          width={110}
          height={44}
          className="md:hidden"
          style={{ height: 'auto', width: 'clamp(50px,8vw,110px)' }}
          priority
        />
        <Image
          src="/g-school-dark.svg"
          alt="Granada School"
          width={110}
          height={44}
          className="hidden md:block"
          style={{ height: 'auto', width: 'clamp(50px,8vw,110px)' }}
          priority
        />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex flex-col justify-center items-center gap-1 hover:opacity-80 transition-opacity"
          aria-label="Toggle Menu"
        >
          <span className="w-5 h-0.5 bg-[#213558] md:bg-white transition-transform duration-300"></span>
          <span className="w-5 h-0.5 bg-[#213558] md:bg-white transition-transform duration-300"></span>
          <span className="w-5 h-0.5 bg-[#213558] md:bg-white transition-transform duration-300"></span>
        </button>
      </div>

      {/* Full-screen Navigation */}
      <nav
        className={`absolute inset-0 z-50 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden transform transition-transform duration-500 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* ── NAV LINKS section — top on mobile (order 0), right half on desktop (md:order-2) ── */}
        <div
          className="md:order-2 md:flex-1 md:min-h-0 md:overflow-clip"
          style={{
            backgroundColor: '#213558',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close button */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '1.5rem 1.75rem 0',
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
              aria-label="Close Menu"
            >
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable nav content */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '2rem clamp(1.25rem,5vw,3.5rem)',
            }}
          >
            <h1
              style={{
                marginBottom: '2rem',
                fontSize: 'clamp(1.75rem, 2vw, 3rem)',
                fontWeight: 700,
                lineHeight: '1.1',
                color: 'white',
              }}
            >
              Two Schools. One standard of Excellence. Discover the right Granada pathway for your child.
            </h1>

            <div
              className="flex-col md:flex-row"
              style={{
                borderBottom: '3px solid rgba(255,255,255,0.2)',
                paddingBottom: '1.75rem',
                marginBottom: '1.75rem',
                display: 'flex',
                gap: '1.25rem',
              }}
            >
              {/* CBE Pathway card */}
              <Card className="relative w-full pt-0" style={{ background: '#e2c215' }}>
                <div className="absolute inset-0 z-30 aspect-video" />
                {/* <img src="./building.jpeg" alt="CBE Pathway" className="relative z-20 aspect-video w-full object-cover brightness-100" /> */}
                <CardHeader className='pt-3' style={{ background: '#e2c215' }}>
                  <CardTitle style={{ fontSize: 'clamp(0.85rem, 1vw, 1.05rem)', fontWeight: 700, color: '#0b1b3b' }}>CBE Pathway</CardTitle>
                  <CardDescription style={{ fontSize: '0.7rem', color: '#0b1b3b', opacity: 0.75, lineHeight: 1.5 }}>
                    Comprehensive national curriculumn designed to foster academic excellence, with quality boarding facilities for girls in both junior and senior schools.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" style={{ backgroundColor: '#0b1b3b', color: '#e2c215' }}>
                    <Link href="/granada-school" onClick={() => setMenuOpen(false)}>Learn more</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* International Pathway card */}
              <Card className="relative w-full pt-0" style={{ background: '#A6D6C9' }}>
                <div className="absolute inset-0 z-30 aspect-video" />
                {/* <img src="./building.jpeg" alt="International Pathway" className="relative z-20 aspect-video w-full object-cover brightness-100" /> */}
                <CardHeader className='pt-3' style={{ background: '#A6D6C9' }}>
                  <CardTitle style={{ fontSize: 'clamp(0.85rem, 1vw, 1.05rem)', fontWeight: 700, color: '#0b1b3b' }}>International Pathway</CardTitle>
                  <CardDescription style={{ fontSize: '0.7rem', color: '#0b1b3b', opacity: 0.75, lineHeight: 1.5 }}>
                    An international curriculum (Cambridge &amp; Edexcel) offering a strong foundation and globally recognised qualifications
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" style={{ backgroundColor: '#0b1b3b', color: '#A6D6C9' }}>
                    <Link href="/granada-international" onClick={() => setMenuOpen(false)}>Learn more</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Footer — desktop only (sticky inside right column) */}
          <div
            className="hidden md:block"
            style={{ flexShrink: 0, backgroundColor: 'white', padding: '0.35rem clamp(2rem,5vw,3.5rem)' }}
          >
            <h1 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#213558', paddingBottom: '0.45rem' }}>Address</h1>
            <p style={{ fontSize: '0.65rem', color: '#213558', fontWeight: 400, margin: 0 }}>
              Granada School, Vipingo, Kilifi <br />
              Off Mombasa-Malindi Highway <br />
            </p>
            <Link
              href="/granada-school/contact"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'underline', fontWeight: 700, fontSize: '0.85rem', color: '#213558', paddingBottom: '0.45rem', gap: '0.25rem' }}
            >
              Directions <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* ── SOCIAL section — middle on mobile (order 1), left half on desktop (md:order-1) ── */}
        <div
          className="md:order-1 md:flex-1 md:min-h-0 md:overflow-hidden"
          style={{
            backgroundColor: '#e2c215',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem 1.25rem 0.75rem',
          }}
        >
          {/* Desktop carousel: 2 visible at a time */}
          <div
            className="hidden md:flex"
            style={{ flex: 1, minHeight: 0, overflow: 'hidden', flexDirection: 'column' }}
          >
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 0, position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '1rem',
                  height: '100%',
                  width: 'calc(200% + 1rem)',
                  transform: `translateX(${socialPage === 0 ? '0%' : 'calc(-50% - 0.5rem)'})`,
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                {socialPosts.map((post, i) => (
                  <div key={i} style={{ width: 'calc(25% - 0.75rem)', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
                      <Image src={post.image} alt={post.caption} fill sizes="25vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div style={{ flexShrink: 0, position: 'relative', backgroundColor: 'white', padding: '1.1rem 0.85rem 0.85rem' }}>
                      <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderBottom: '16px solid white', zIndex: 2 }} />
                      <p style={{ fontSize: '0.44rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#e2c215', fontWeight: 700, fontFamily: 'sans-serif', margin: '0 0 0.3rem' }}>{post.platform}</p>
                      <p style={{ fontSize: '0.72rem', color: '#0d0c0d', fontFamily: 'sans-serif', lineHeight: 1.4, margin: '0 0 0.2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{post.caption}</p>
                      <p style={{ fontSize: '0.58rem', color: '#888', fontFamily: 'sans-serif', margin: 0 }}>{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop arrow */}
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'flex-end', paddingTop: '0.6rem' }}>
              <button
                onClick={() => setSocialPage((p) => (p === 0 ? 1 : 0))}
                style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.18)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                aria-label={socialPage === 0 ? 'Next articles' : 'Previous articles'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  {socialPage === 0 ? <path d="M5 12h14M12 5l7 7-7 7" /> : <path d="M19 12H5M12 19l-7-7 7-7" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile carousel: 1 visible at a time */}
          <div
            className="flex md:hidden"
            style={{ flex: 1, minHeight: 0, overflow: 'hidden', flexDirection: 'column' }}
          >
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 0, position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  height: '100%',
                  width: `${socialPosts.length * 100}%`,
                  transform: `translateX(${(-mobileSocialIndex * 100) / socialPosts.length}%)`,
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                {socialPosts.map((post, i) => (
                  <div key={i} style={{ width: `${100 / socialPosts.length}%`, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
                      <Image src={post.image} alt={post.caption} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div style={{ flexShrink: 0, position: 'relative', backgroundColor: 'white', padding: '1.1rem 0.85rem 0.85rem' }}>
                      <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderBottom: '16px solid white', zIndex: 2 }} />
                      <p style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#e2c215', fontWeight: 700, fontFamily: 'sans-serif', margin: '0 0 0.3rem' }}>{post.platform}</p>
                      <p style={{ fontSize: '0.82rem', color: '#0d0c0d', fontFamily: 'sans-serif', lineHeight: 1.4, margin: '0 0 0.2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{post.caption}</p>
                      <p style={{ fontSize: '0.72rem', color: '#888', fontFamily: 'sans-serif', margin: 0 }}>{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile left / right arrows */}
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.6rem' }}>
              <button
                onClick={() => setMobileSocialIndex((i) => Math.max(0, i - 1))}
                disabled={mobileSocialIndex === 0}
                style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.18)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: mobileSocialIndex === 0 ? 'default' : 'pointer', opacity: mobileSocialIndex === 0 ? 0.35 : 1 }}
                aria-label="Previous post"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </button>
              <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.65rem', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>
                {mobileSocialIndex + 1} / {socialPosts.length}
              </span>
              <button
                onClick={() => setMobileSocialIndex((i) => Math.min(socialPosts.length - 1, i + 1))}
                disabled={mobileSocialIndex === socialPosts.length - 1}
                style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.18)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: mobileSocialIndex === socialPosts.length - 1 ? 'default' : 'pointer', opacity: mobileSocialIndex === socialPosts.length - 1 ? 0.35 : 1 }}
                aria-label="Next post"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer — mobile only (sticky at bottom of column) ── */}
        <div
          className="md:hidden"
          style={{ flexShrink: 0, backgroundColor: 'white', padding: '0.75rem clamp(1.5rem,5vw,3.5rem)' }}
        >
          <h1 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#213558', paddingBottom: '0.35rem' }}>Address</h1>
          <p style={{ fontSize: '0.75rem', color: '#213558', fontWeight: 400, margin: 0 }}>
            Granada School, Vipingo, Kilifi <br />
            Off Mombasa-Malindi Highway
          </p>
          <Link
            href="/granada-school/contact"
            onClick={() => setMenuOpen(false)}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'underline', fontWeight: 700, fontSize: '0.85rem', color: '#213558', paddingTop: '0.35rem', gap: '0.25rem' }}
          >
            Directions <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Text Overlay (desktop only) */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {/* "Realise your potential" text — fades out when a column is expanded */}
        <div
          className="absolute left-0 hidden md:flex items-end pointer-events-none"
          style={{
            bottom: '80px',
            width: '60%',
            opacity: clickedIndex !== null ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            style={{
              paddingLeft: 'clamp(4.7rem,6.2vw, 5.7rem)',
              paddingBottom: '0.25rem',
            }}
          >
            <span
              className="block text-white font-bold drop-shadow-lg"
              style={{
                fontSize: 'clamp(2rem, 6vw, 6.1rem)',
                lineHeight: 0.001,
              }}
            >
              Realise your
            </span>
            <span
              className="block text-white font-bold drop-shadow-lg"
              style={{
                fontSize: 'clamp(5.7rem, 9vw, 9rem)',
                lineHeight: 1.5,
                marginTop: '0.01em',
              }}
            >
              potential
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
