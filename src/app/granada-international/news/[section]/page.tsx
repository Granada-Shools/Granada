"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import SchoolNavbar from '@/components/SchoolNavbar';
import SchoolFooter from '@/components/SchoolFooter';

const NAV_ITEMS = [
  {label:"About Us",href:"/granada-international/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-international/about/welcome"},{label:"Vision & Mission",href:"/granada-international/about/vision"},{label:"Core Values",href:"/granada-international/about/values"},{label:"Our Story",href:"/granada-international/about/history"},{label:"Boarding",href:"/granada-international/about/boarding"},{label:"Staff & Leadership",href:"/granada-international/about/staff"}]},
  {label:"Admissions",href:"/granada-international/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"About Admissions",href:"/granada-international/admissions/intro"},{label:"Admissions Team",href:"/granada-international/admissions/team"},{label:"KG–Year 9 Process",href:"/granada-international/admissions/process"},{label:"Senior School",href:"/granada-international/admissions/senior-process"},{label:"Apply",href:"/granada-international/admissions/apply"}]},
  {label:"Academic",href:"/granada-international/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-international/academics/overview"},{label:"Edexcel Curriculum",href:"/granada-international/academics/edexcel"},{label:"School Sections",href:"/granada-international/academics/sections"},{label:"University Pathways",href:"/granada-international/academics/university"},{label:"Apply",href:"/granada-international/academics/apply"}]},
  {label:"Campus Life",href:"/granada-international/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Activities & Overview",href:"/granada-international/campus-life/activities"},{label:"Facilities",href:"/granada-international/campus-life/facilities"},{label:"Sports & Athletics",href:"/granada-international/campus-life/sports"},{label:"Arts & Drama",href:"/granada-international/campus-life/arts"},{label:"Music",href:"/granada-international/campus-life/music"},{label:"Co-Curricular",href:"/granada-international/campus-life/cocurricular"},{label:"Leadership",href:"/granada-international/campus-life/leadership"},{label:"Boarding Life",href:"/granada-international/campus-life/boarding"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-international/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-international/wellbeing/approach"},{label:"Counselling Support",href:"/granada-international/wellbeing/counselling"},{label:"Core Values",href:"/granada-international/wellbeing/values"},{label:"Character Education",href:"/granada-international/wellbeing/character"},{label:"Global Citizenship",href:"/granada-international/wellbeing/global"},{label:"Boarding Pastoral Care",href:"/granada-international/wellbeing/boarding-care"}]},
  {label:"Latest News",href:"/granada-international/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"Latest News",href:"/granada-international/news/latest-news"},{label:"Events",href:"/granada-international/news/events"},{label:"Newsletters",href:"/granada-international/news/newsletters"},{label:"Social Media",href:"/granada-international/news/social"}]},
  {label:"Parents",href:"/granada-international#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-international#contact"},{label:"School Calendar",href:"/granada-international#contact"},{label:"Term Dates",href:"/granada-international#contact"},{label:"Reports & Policies",href:"/granada-international#contact"}]},
  {label:"Support Us",href:"/granada-international#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Bursaries & Scholarships",href:"/granada-international/admissions"},{label:"Donations",href:"/granada-international#contact"},{label:"Community Partnerships",href:"/granada-international#contact"}]},
];

function useInView(threshold=0.12){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── PAGE HERO ──────────────────────────────────────────────────────────────── */
/* ── SECTION DATA ──────────────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  {label:"Latest News",             id:"latest-news"},
  {label:"Events",                  id:"events"},
  {label:"Newsletters",             id:"newsletters"},
  {label:"Social Media",            id:"social"},
];
const BASE_PATH = "/granada-international/news";

function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Latest News";

  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"newsKenBurns 18s ease-in-out infinite alternate"}}/>

      <div style={{position:"absolute",top:"14%",right:"4%",width:"clamp(100px,15vw,180px)",height:"clamp(100px,15vw,180px)",border:"1px solid rgba(170,194,12,0.25)",animation:"newsSpin 32s linear infinite"}}/>
      <div style={{position:"absolute",top:"18%",right:"7%",width:"clamp(55px,8vw,110px)",height:"clamp(55px,8vw,110px)",border:"1px solid rgba(255,255,255,0.12)",animation:"newsSpin 22s linear infinite reverse"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        <div style={{display:"flex",justifyContent:"flex-end"}} className="hero-content">
          <div style={{maxWidth:"clamp(260px,45vw,520px)"}}>
            <h1 className="font-display" style={{fontSize:"clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
              School <span style={{color:"var(--accent-light)"}}>News & Events</span>
            </h1>
          </div>
        </div>
      </div>
      <style>{`@keyframes newsKenBurns{0%{transform:scale(1)}100%{transform:scale(1.07)}}@keyframes newsSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ──────────────────────────────────────────────────────────── */
function TaglineStrip(){
  const tags=["School News","Events Calendar","Newsletters","Social Media","Achievements"];
  return(
    <div style={{background:"var(--primary)",padding:"clamp(0.75rem,1.4vw,1.1rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"center",gap:"clamp(1.2rem,2.5vw,3rem)",flexWrap:"wrap",alignItems:"center"}}>
        {tags.map((t,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:"0.9rem"}}>
            <span className="font-display" style={{fontSize:"clamp(0.78rem,1.3vw,0.95rem)",fontWeight:400,color:"#fff",whiteSpace:"nowrap"}}>{t}</span>
            {i<tags.length-1&&<span style={{width:4,height:4,borderRadius:"50%",background:"var(--secondary)",flexShrink:0}}/>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── SECTION NAV ──────────────────────────────────────────────────────────── */
function SectionNav(){
  const params = useParams();
  const activeSection = params.section as string;
  const P="#213558"; const S="#aac20c";
  return(
    <aside style={{width:"clamp(120px,12vw,180px)",flexShrink:0,position:"sticky",top:110,alignSelf:"flex-start",display:"none",background:"var(--body-bg)",padding:"1.5rem 0"}} className="section-sidebar">
      <p style={{fontFamily:"'Euclid Circular A',sans-serif",fontSize:"clamp(0.66rem,0.92vw,0.74rem)",letterSpacing:"0.06em",color:P,fontWeight:600,marginBottom:"1.1rem"}}>In this section</p>
      <nav style={{display:"flex",flexDirection:"column",gap:0,borderLeft:"1px solid #e8e6e3"}}>
        {PAGE_SECTIONS.map((s,i)=>(
          <Link key={i} href={`${BASE_PATH}/${s.id}`}
            style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.65rem 0 0.65rem 1rem",color:activeSection===s.id?P:"#5a5a5a",background:"none",textDecoration:"none",borderLeft:activeSection===s.id?`2px solid ${P}`:"2px solid transparent",fontSize:"clamp(0.72rem,1vw,0.8rem)",fontWeight:activeSection===s.id?700:400,transition:"all 0.2s",fontFamily:"inherit",marginLeft:"-1px"}}>
            {s.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-where-next" style={{marginTop:"2.25rem",border:"1px solid #e8e6e3",padding:"1.4rem",background:"#fff"}}>
        <p style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:S,fontWeight:700,marginBottom:"0.9rem"}}>Where Next?</p>
        {[{label:"How to Apply",href:"/granada-international#admissions"},{label:"Visit Granada",href:"/granada-international/contact?type=visit"},{label:"Enquire Now",href:"/granada-international/contact"}].map((l,i)=>(
          <a key={i} href={l.href} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#5a5a5a",textDecoration:"none",fontSize:"clamp(0.72rem,1vw,0.8rem)",padding:"0.45rem 0",borderBottom:"1px solid #f0eee9",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=P)} onMouseLeave={e=>(e.currentTarget.style.color="#5a5a5a")}>
            <svg width="5" height="9" viewBox="0 0 5 9" fill="none"><path d="M1 1l3 3.5L1 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {l.label}
          </a>
        ))}
      </div>
      <style>{`.section-sidebar{display:block!important}`}</style>
    </aside>
  );
}

/* ── LATEST NEWS ────────────────────────────────────────────────────────────── */
const articles = [
  {category:"Academic",date:"December 2024",title:"Granada International Students Excel in Pearson Edexcel IGCSE Examinations",img:"/class.jpeg",excerpt:"An outstanding cohort of Year 10 and 11 students achieved record results in this year's Pearson Edexcel IGCSE examinations, with over 85% securing A*–B grades across core subjects."},
  {category:"Community",date:"November 2024",title:"Granada International Hosts Kilifi County Inter-School Debate Championship",img:"/building.jpeg",excerpt:"Our school proudly hosted the annual Kilifi County inter-school debate competition, welcoming twelve schools from across the region for three days of passionate, high-quality debate."},
  {category:"Sports",date:"November 2024",title:"Girls' Football Team Wins Coast Region U16 Championship",img:"/sports.jpeg",excerpt:"Congratulations to our junior girls' football team who brought home the Coast Region trophy after a closely contested final against Mombasa International School."},
  {category:"Arts & Culture",date:"October 2024",title:"Annual Cultural Evening Celebrates Diversity on the Granada International Stage",img:"/music.jpeg",excerpt:"Students from over 18 nationalities showcased traditional dance, music, poetry, and cuisine in a spectacular evening celebrating the rich multicultural tapestry of our school community."},
  {category:"Service Learning",date:"October 2024",title:"Year 8 Students Complete Coastal Mangrove Restoration Project",img:"/building2.jpeg",excerpt:"Our Year 8 Environmental Stewardship Club partnered with the Kenya Forest Service to plant over 1,200 mangrove seedlings along the Vipingo coastline, as part of our school's commitment to environmental sustainability."},
  {category:"Leadership",date:"September 2024",title:"New Student Council Launches 'One Granada' Community Initiative",img:"/sports2.jpeg",excerpt:"Our newly elected Student Council has launched an ambitious initiative to strengthen school-community bonds through cross-year group mentoring, charity drives, and collaborative projects."},
];

function LatestNews(){
  const {ref,vis}=useInView(0.08);
  const [filter,setFilter]=useState("All");
  const categories=["All","Academic","Community","Sports","Arts & Culture","Service Learning","Leadership"];
  const shown=filter==="All"?articles:articles.filter(a=>a.category===filter);
  return(
    <section id="latest-news" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">From the Campus</p>
          <h2 className="section-heading">Latest <em>News</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>Stories, achievements, and moments from life at Granada International — celebrating our students, staff, and community.</p>
        </div>
        {/* Filter Tabs */}
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transition:"opacity 0.8s ease 0.2s"}}>
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setFilter(cat)} style={{padding:"0.4rem clamp(0.7rem,1.2vw,1.1rem)",fontSize:"clamp(0.56rem,0.78vw,0.68rem)",fontWeight:filter===cat?700:400,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s",border:`1px solid ${filter===cat?"var(--primary)":"#dddbd8"}`,background:filter===cat?"var(--primary)":"#fff",color:filter===cat?"#fff":"var(--muted)",fontFamily:"inherit"}}>{cat}</button>
          ))}
        </div>
        {/* News Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(1.2rem,2vw,2rem)"}} className="news-grid">
          {shown.map((a,i)=>(
            <article key={i} style={{background:"#fff",overflow:"hidden",cursor:"pointer",transition:"all 0.35s",boxShadow:"none",opacity:vis?1:0,transitionDelay:`${i*0.07}s`}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-6px)";(e.currentTarget as HTMLElement).style.boxShadow="0 16px 50px rgba(33,53,88,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
              <div style={{overflow:"hidden",height:"clamp(180px,18vw,230px)",position:"relative",flexShrink:0}}>
                <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s ease"}} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.05)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}/>
                <div style={{position:"absolute",top:12,left:12,background:"var(--primary)",padding:"0.2rem 0.6rem"}}>
                  <span style={{color:"#fff",fontSize:"clamp(0.5rem,0.7vw,0.58rem)",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>{a.category}</span>
                </div>
              </div>
              <div style={{padding:"clamp(1.2rem,1.8vw,1.6rem)"}}>
                <p style={{fontSize:"clamp(0.56rem,0.8vw,0.65rem)",color:"var(--secondary)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700,marginBottom:"0.5rem"}}>{a.date}</p>
                <h3 style={{fontSize:"clamp(0.78rem,1.05vw,0.9rem)",fontWeight:700,color:"var(--primary)",lineHeight:1.45,marginBottom:"0.7rem"}}>{a.title}</h3>
                <p style={{fontSize:"clamp(0.65rem,0.8vw,0.72rem)",color:"var(--muted)",lineHeight:1.75,marginBottom:"1rem",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{a.excerpt}</p>
                <span style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",fontSize:"clamp(0.56rem,0.8vw,0.65rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--primary)"}}>
                  Read More <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transition:"opacity 0.9s ease 0.6s"}}>
          <a href="#" className="btn-outline">View All News Articles</a>
        </div>
      </div>
      <style>{`@media(max-width:900px){.news-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){.news-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── EVENTS CALENDAR ──────────────────────────────────────────────────────── */
function EventsCalendar(){
  const {ref,vis}=useInView(0.08);
  const events=[
    {month:"JAN",day:"15",title:"Year 10 & 11 Mock Examinations Begin",type:"Academic",location:"Main Examination Hall"},
    {month:"FEB",day:"03",title:"Kilifi County Schools Golf Tournament",type:"Sports",location:"Vipingo Ridge Golf Course"},
    {month:"FEB",day:"14",title:"Valentine's Arts Exhibition & Sale",type:"Arts",location:"School Art Gallery"},
    {month:"FEB",day:"22",title:"Parent–Teacher Consultations (Term 1)",type:"Parents",location:"Online & On-campus"},
    {month:"MAR",day:"07",title:"International Women's Day Programme",type:"Community",location:"School Theatre"},
    {month:"MAR",day:"14",title:"Granada International Open Day",type:"Admissions",location:"Full Campus"},
    {month:"APR",day:"02",title:"Easter Holiday Begins",type:"Holiday",location:""},
    {month:"APR",day:"28",title:"Term 2 Begins",type:"Academic",location:"All Campuses"},
    {month:"MAY",day:"15",title:"East Africa Schools Science Fair",type:"Academic",location:"Nairobi Convention Centre"},
    {month:"JUN",day:"07",title:"Annual Sports Day — Coast Region",type:"Sports",location:"School Athletics Track"},
    {month:"JUN",day:"21",title:"Pearson Edexcel IGCSE Examinations Begin",type:"Academic",location:"Main Examination Hall"},
    {month:"JUL",day:"12",title:"End of Year Awards & Leavers' Celebrations",type:"Community",location:"School Grounds"},
  ];
  const typeColors:{[k:string]:string}={Academic:"var(--primary)",Sports:"#4a6428",Arts:"#936c51",Parents:"#483454",Community:"#ebae1b",Admissions:"var(--secondary-dark)",Holiday:"#5a5a5a"};
  return(
    <section id="events" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Academic Year 2024–2025</p>
          <h2 className="section-heading">Events <em>Calendar</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>A complete view of the key dates, events, and milestones in the Granada International academic year.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:"rgba(255,255,255,0.08)"}} className="events-grid">
          {events.map((ev,i)=>(
            <div key={i} style={{display:"flex",gap:"clamp(1rem,1.5vw,1.5rem)",padding:"clamp(1rem,1.5vw,1.4rem) clamp(1.2rem,1.8vw,1.6rem)",background:"rgba(255,255,255,0.04)",alignItems:"flex-start",transition:"background 0.25s",cursor:"default",opacity:vis?1:0,transitionDelay:`${i*0.04}s`}} onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.1)"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"}>
              <div style={{flexShrink:0,textAlign:"center",minWidth:"clamp(40px,5vw,55px)"}}>
                <p style={{fontSize:"clamp(0.5rem,0.65vw,0.58rem)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--secondary)",lineHeight:1}}>{ev.month}</p>
                <p className="font-display" style={{fontSize:"clamp(1.4rem,2.5vw,2.2rem)",fontWeight:600,color:"#fff",lineHeight:1}}>{ev.day}</p>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.3rem",flexWrap:"wrap"}}>
                  <span style={{fontSize:"clamp(0.48rem,0.7vw,0.56rem)",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:typeColors[ev.type]||"#fff",background:`${typeColors[ev.type]||"#fff"}20`,padding:"0.15rem 0.5rem"}}>{ev.type}</span>
                </div>
                <h4 style={{fontSize:"clamp(0.7rem,0.95vw,0.82rem)",fontWeight:700,color:"#fff",lineHeight:1.4,marginBottom:"0.25rem"}}>{ev.title}</h4>
                {ev.location&&<p style={{fontSize:"clamp(0.58rem,0.7vw,0.65rem)",color:"rgba(255,255,255,0.5)",letterSpacing:"0.06em"}}>{ev.location}</p>}
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"clamp(1.5rem,2.5vw,2.5rem)",textAlign:"center",opacity:vis?1:0,transition:"opacity 0.9s ease 0.5s"}}>
          <a href="mailto:admissions@granadaschools.group" className="btn-green">Request Full Events Calendar</a>
        </div>
      </div>
      <style>{`@media(max-width:700px){.events-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── NEWSLETTERS ────────────────────────────────────────────────────────────── */
function Newsletters(){
  const {ref,vis}=useInView(0.08);
  const issues=[
    {term:"Term 3 2024",title:"Granada International Newsletter — End of Year Edition",highlight:"Year 11 Leavers, Award Winners, Sports Champions & A-Level Results",date:"July 2024",pages:12},
    {term:"Term 2 2024",title:"The Vipingo Bulletin — Term 2 2024",highlight:"STEM Fair, Cultural Night, Boarding Life Feature, Parent Connect",date:"April 2024",pages:10},
    {term:"Term 1 2024",title:"Granada International Newsletter — Opening Edition 2024",highlight:"New Staff Profiles, Curriculum Updates, House System Launch",date:"January 2024",pages:8},
    {term:"Term 3 2023",title:"The Vipingo Bulletin — Year End 2023",highlight:"A-Level University Offers, Sports Day Review, Community Projects",date:"July 2023",pages:11},
    {term:"Term 2 2023",title:"Granada International Newsletter — Term 2 2023",highlight:"IGCSE Mock Results, Drama Production, MUN Champions",date:"April 2023",pages:9},
    {term:"Term 1 2023",title:"The Vipingo Bulletin — 2023 Edition",highlight:"School Expansion Announcement, New Facilities, Scholarship Awards",date:"January 2023",pages:8},
  ];
  return(
    <section id="newsletters" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Stay Informed</p>
          <h2 className="section-heading">School <em>Newsletters</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:560}}>Our termly newsletters keep the extended Granada International family connected — featuring student stories, faculty profiles, community projects, and important academic updates.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(1rem,1.5vw,1.5rem)"}} className="nl-grid">
          {issues.map((nl,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.4rem,2vw,2rem) clamp(1.2rem,1.8vw,1.6rem)",borderBottom:"3px solid var(--primary)",transition:"all 0.3s",cursor:"pointer",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transitionDelay:`${i*0.07}s`}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLElement).style.boxShadow="0 12px 40px rgba(33,53,88,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",borderBottom:"1px solid var(--divider-light)",paddingBottom:"0.7rem"}}>
                <span style={{fontSize:"clamp(0.52rem,0.75vw,0.6rem)",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--primary)",background:"var(--primary)18",padding:"0.2rem 0.6rem"}}>{nl.term}</span>
                <div style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><path d="M1 0.5h6.5L10 3v9H1V0.5z" stroke="var(--secondary)" strokeWidth="0.9"/><line x1="3" y1="5" x2="8" y2="5" stroke="var(--muted)" strokeWidth="0.8"/><line x1="3" y1="7" x2="8" y2="7" stroke="var(--muted)" strokeWidth="0.8"/><line x1="3" y1="9" x2="6" y2="9" stroke="var(--muted)" strokeWidth="0.8"/></svg>
                  <span style={{fontSize:"clamp(0.5rem,0.72vw,0.58rem)",color:"var(--muted)"}}>{nl.pages} pages</span>
                </div>
              </div>
              <h3 style={{fontSize:"clamp(0.72rem,0.95vw,0.82rem)",fontWeight:700,color:"var(--primary)",lineHeight:1.4,marginBottom:"0.5rem"}}>{nl.title}</h3>
              <p style={{fontSize:"clamp(0.6rem,0.72vw,0.67rem)",color:"var(--secondary)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",lineHeight:1.5,marginBottom:"0.85rem"}}>{nl.highlight}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",color:"var(--muted)"}}>{nl.date}</span>
                <a href="mailto:admissions@granadaschools.group" style={{fontSize:"clamp(0.52rem,0.75vw,0.6rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--primary)",textDecoration:"none",display:"flex",alignItems:"center",gap:"0.3rem"}}>
                  Request PDF →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"clamp(2rem,3vw,3rem)",padding:"clamp(1.5rem,2.5vw,2.5rem)",textAlign:"center",background:"var(--primary)",opacity:vis?1:0,transition:"opacity 0.9s ease 0.5s"}}>
          <p className="font-display" style={{fontSize:"clamp(1rem,1.6vw,1.25rem)",color:"#fff",marginBottom:"0.8rem"}}>Subscribe to the Granada International Newsletter</p>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.75rem,1.02vw,0.82rem)",marginBottom:"1.2rem"}}>Receive each edition directly by email — stay fully connected with campus news, events, and achievements.</p>
          <a href="mailto:admissions@granadaschools.group?subject=Newsletter%20Subscription" className="btn-green">Subscribe Now</a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.nl-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.nl-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── SOCIAL MEDIA ─────────────────────────────────────────────────────────── */
function SocialMedia(){
  const {ref,vis}=useInView(0.08);
  const posts=[
    {img:"/building.jpeg",caption:"Year 11 students celebrating their IGCSE results — extraordinary dedication and achievement. Proud of every single one of you! 🎉 #GranadaInternational #IGCSEResults"},
    {img:"/sports.jpeg",caption:"Our girls' football team made us proud at the Coast Region championship. The future of football is bright at Granada! ⚽ #GranadaSports #CoastChampions"},
    {img:"/music.jpeg",caption:"Cultural Night 2024 — a magical evening celebrating every nation in our international community 🌍 #CulturalNight #OneGranada"},
    {img:"/building2.jpeg",caption:"Year 8 planted 1,200 mangrove seedlings along the Vipingo coastline today 🌱 Real students. Real impact. #EnvironmentalStewardship"},
    {img:"/class.jpeg",caption:"Our debate team took 1st place at the Kilifi County Championships! The arguments were fierce — the talent was fiercer 🏆 #MUN #Debate"},
    {img:"/dorm.jpeg",caption:"Boarding life at Granada International — evening prep, house meals, and friendships that last forever 🏠 #BoardingLife"},
  ];
  return(
    <section id="social" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">@GranadaInternational</p>
          <h2 className="section-heading">Follow Our <em>Journey</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>Join us on social media for daily glimpses into the energetic, inspiring life of the Granada International community — from classroom breakthroughs to sporting triumphs and everything in between.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3,background:"rgba(255,255,255,0.12)"}} className="social-grid">
          {posts.map((p,i)=>(
            <div key={i} style={{overflow:"hidden",position:"relative",aspectRatio:"1/1",cursor:"pointer",opacity:vis?1:0,transform:vis?"none":"scale(0.96)",transitionDelay:`${i*0.07}s`,transition:"all 0.6s ease"}} onMouseEnter={ev=>{const overlay=ev.currentTarget.querySelector(".social-overlay") as HTMLElement|null;if(overlay)overlay.style.opacity="1";}} onMouseLeave={ev=>{const overlay=ev.currentTarget.querySelector(".social-overlay") as HTMLElement|null;if(overlay)overlay.style.opacity="0";}}>
              <img src={p.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s"}}/>
              <div className="social-overlay" style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.88)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"1rem",opacity:0,transition:"opacity 0.4s"}}>
                <p style={{color:"#fff",fontSize:"clamp(0.6rem,0.75vw,0.68rem)",lineHeight:1.65,fontWeight:300}}>{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"1rem",marginTop:"clamp(1.5rem,2.5vw,2.5rem)",flexWrap:"wrap",opacity:vis?1:0,transition:"opacity 0.9s ease 0.5s"}}>
          {[{platform:"Instagram",handle:"@granada.international",color:"#e1306c"},{platform:"Facebook",handle:"Granada International School",color:"#1877f2"},{platform:"Twitter/X",handle:"@GranadaIntl",color:"#1da1f2"}].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"0.6rem",padding:"0.65rem 1.2rem",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.18)"}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:s.color}}/>
              <div>
                <p style={{color:"var(--secondary)",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.platform}</p>
                <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>{s.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:600px){.social-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{background:"#4a6428",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)",textAlign:"center"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"1.2rem"}}>Stay Connected</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"1.5rem"}}>
          Never miss a <span style={{color:"var(--accent-light)"}}>Granada moment.</span>
        </h2>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.8,marginBottom:"2rem"}}>
          Subscribe to our newsletter, follow us on social media, and stay connected with the stories, achievements, and events that make Granada International exceptional.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          <a href="mailto:admissions@granadaschools.group?subject=Newsletter%20Subscription" className="btn-solid" style={{fontSize:"clamp(0.62rem,0.88vw,0.7rem)",padding:"0.75rem 2rem"}}>Subscribe to Newsletter</a>
          <a href="/granada-international/admissions" style={{display:"inline-block",padding:"0.75rem 2rem",background:"transparent",border:"1px solid rgba(255,255,255,0.5)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Apply to Granada International</a>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  "latest-news": () => <LatestNews/>,
  "events": () => <EventsCalendar/>,
  "newsletters": () => <Newsletters/>,
  "social": () => <SocialMedia/>,
};

export default function NewsPage(){
  const params = useParams();
  const section = (params.section as string) || "latest-news";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["latest-news"];
  return(
    <>
      <SchoolNavbar scrolledLogo="/g-international.svg" clearLogo="/g-international-dark.svg" logoAlt="Granada International" logoHref="/granada-international" navItems={NAV_ITEMS} quickLinks={[{label:"Parents",href:"/granada-international#contact"},{label:"Enquire",href:"/granada-international/contact"},{label:"Contact us",href:"/granada-international/contact"}]} enquireHref="/granada-international/contact" applyHref="/granada-international/contact" headerApplyHref="/granada-international#admissions" sideImage="/building.jpeg" sideImageAlt="Granada International"/>
      <main style={{background:"var(--body-bg)"}}>
        <PageHero/>
        <TaglineStrip/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",gap:"clamp(2rem,3vw,3.5rem)",alignItems:"flex-start"}} className="section-layout">
          <SectionNav/>
          <div style={{flex:1,minWidth:0}}>
            <div key={section} style={{animation:"sectionFadeIn 0.45s ease"}}>
              {renderSection()}
            </div>
          </div>
        </div>
      </main>
      <PageCTA/>
      <SchoolFooter logoSrc="/g-international-dark.svg" logoAlt="Granada International" logoHref="/granada-international" tagline="Forward Thinking. Inspiring Excellence. Shaping the Future." schoolName="Granada International" curriculumLinks={["Pearson Edexcel","Key Stages 1\u20135","IGCSE","A-Levels","Results","University Pathways"]} footerColsClass="int-footer-cols"/>
    </>
  );
}
