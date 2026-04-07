"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";





/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
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
  {label:"Activities & Overview",   id:"activities"},
  {label:"Facilities",              id:"facilities"},
  {label:"Sports & Athletics",      id:"sports"},
  {label:"Arts & Drama",            id:"arts"},
  {label:"Music",                   id:"music"},
  {label:"Co-Curricular",           id:"cocurricular"},
  {label:"Leadership",              id:"leadership"},
  {label:"Boarding Life",           id:"boarding"},
];
const BASE_PATH = "/granada-international/campus-life";

function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Activities & Overview";

  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/sports.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"clKenBurns 12s ease-in-out infinite alternate"}}/>
      {/* Animated elements */}
      <div style={{position:"absolute",top:"12%",right:"5%",width:"clamp(90px,14vw,180px)",height:"clamp(90px,14vw,180px)",border:"1px solid rgba(170,194,12,0.35)",animation:"clSpin 30s linear infinite"}}/>
      <div style={{position:"absolute",top:"16%",right:"8%",width:"clamp(50px,8vw,110px)",height:"clamp(50px,8vw,110px)",border:"1px solid rgba(255,255,255,0.15)",animation:"clSpin 20s linear infinite reverse"}}/>
      <div style={{position:"absolute",bottom:"18%",left:"3%",width:"clamp(50px,6vw,80px)",height:"clamp(50px,6vw,80px)",border:"1px solid rgba(255,255,255,0.1)",animation:"clSpin 25s linear infinite"}}/>
<div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        <div style={{display:"flex",justifyContent:"flex-end"}} className="hero-content">
          <div style={{maxWidth:"clamp(260px,45vw,520px)"}}>
            <h1 className="font-display" style={{fontSize:"clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
              Life Beyond<br/><span style={{color:"var(--accent-light)"}}>the Classroom</span>
            </h1>
          </div>
        </div>
      </div>

      <style>{`@keyframes clKenBurns{0%{transform:scale(1)}100%{transform:scale(1.07)}}@keyframes clSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ─────────────────────────────────────────────────────────── */
function TaglineStrip(){
  const tags=["World-Class Sports","Performing Arts","Innovation & Tech","Leadership Programmes","Boarding Life"];
  return(
    <div style={{background:"var(--primary)",padding:"clamp(0.75rem,1.4vw,1.1rem) clamp(1rem,2vw,2rem)",overflow:"hidden"}}>
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

/* ── CAMPUS OVERVIEW ───────────────────────────────────────────────────────── */
function CampusOverview(){
  const {ref,vis}=useInView(0.08);
  const highlights=[
    {icon:"⚽",label:"Sports Pitches",detail:"Full-size football, basketball & athletics track"},
    {icon:"🎭",label:"Performing Arts",detail:"Drama studio, recital hall & production stage"},
    {icon:"🎵",label:"Music Centre",detail:"Practice rooms, instruments & recording studio"},
    {icon:"💻",label:"Innovation Hub",detail:"STEM labs, coding suites & maker spaces"},
    {icon:"📚",label:"Library & Media",detail:"Curated collections, digital resources & research tools"},
    {icon:"🏠",label:"Boarding Houses",detail:"Safe, comfortable boarding accommodation"},
    {icon:"🌿",label:"Outdoor Spaces",detail:"Gardens, nature trails & coastal setting"},
    {icon:"🍽️",label:"Dining Hall",detail:"Nutritious meals, catered dietary requirements"},
  ];
  return(
    <section id="activities" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Campus Overview</p>
          <h2 className="section-heading">A Place Where<br/><em>Excellence Thrives</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:620}}>Granada International School sits on a stunning campus in Vipingo, Kilifi County — a world-class educational environment that inspires discovery, creativity, and wellbeing at every turn.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"#dddbd8",marginBottom:"clamp(2.5rem,4vw,4rem)"}} className="campus-highlights">
          {highlights.map((h,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.2rem,2vw,1.8rem) clamp(1rem,1.5vw,1.4rem)",textAlign:"center",cursor:"default",transition:"all 0.3s",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transitionDelay:`${i*0.05}s`}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--primary)";(e.currentTarget as HTMLElement).querySelectorAll("p,span").forEach(el=>{(el as HTMLElement).style.color="#fff";});}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#fff";(e.currentTarget as HTMLElement).querySelectorAll("p,span").forEach(el=>{(el as HTMLElement).style.color="";});}}>
              <div style={{fontSize:"clamp(1.5rem,2.5vw,2rem)",marginBottom:"0.6rem"}}>{h.icon}</div>
              <p style={{fontSize:"clamp(0.62rem,0.85vw,0.75rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--primary)",marginBottom:"0.3rem",lineHeight:1.3,transition:"color 0.3s"}}>{h.label}</p>
              <p style={{fontSize:"clamp(0.58rem,0.75vw,0.68rem)",color:"var(--muted)",lineHeight:1.5,transition:"color 0.3s"}}>{h.detail}</p>
            </div>
          ))}
        </div>
        {/* Feature mosaic */}
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,2vw,1.5rem)"}} className="mosaic-grid">
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,2vw,1.5rem)"}} className="mosaic-row-1">
            <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(220px,30vw,380px)",height:"100%",opacity:vis?1:0,transform:vis?"none":"translateX(-20px)",transition:"all 0.9s ease 0.1s"}}>
              <img src="/building.jpeg" alt="Campus Grounds" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.5),transparent 60%)",display:"flex",alignItems:"flex-end",padding:"1.5rem"}}>
                <p className="font-display" style={{color:"#fff",fontWeight:400,fontSize:"clamp(0.85rem,1.3vw,1.1rem)"}}>Vipingo, Kilifi County — Kenya Coast</p>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(1rem,2vw,1.5rem)"}}>
              {["/sports.jpeg","/building2.jpeg"].map((src,i)=>(
                <div key={i} className="img-hover" style={{overflow:"hidden",minHeight:"clamp(160px,20vw,260px)",height:"100%",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:`all 0.9s ease ${0.2+i*0.1}s`}}>
                  <img src={src} alt="Campus" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.campus-highlights{grid-template-columns:repeat(4,1fr)!important}}@media(max-width:639px){.campus-highlights{grid-template-columns:repeat(2,1fr)!important}}@media(min-width:768px){.mosaic-row-1{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── FACILITIES ────────────────────────────────────────────────────────────── */
function Facilities(){
  const {ref,vis}=useInView(0.08);
  const facilities=[
    {title:"State-of-the-Art Classrooms",desc:"Fully equipped smart classrooms with interactive technology to support the Pearson Edexcel curriculum across all year groups.",img:"/class.jpeg",color:"var(--primary)"},
    {title:"Science Laboratories",desc:"Purpose-built science labs equipped for biology, chemistry, and physics practical sessions — supporting IGCSE and A-Level science programmes.",img:"/staffroom.jpeg",color:"#936c51"},
    {title:"Library & Research Centre",desc:"A thoughtfully curated library offering print and digital resources, quiet study spaces, and guided research support for all year groups.",img:"/building.jpeg",color:"#4a6428"},
    {title:"Innovation & STEM Hub",desc:"Modern coding suites, robotics equipment, and maker spaces designed to ignite curiosity and prepare students for a technology-driven world.",img:"/art-room.jpeg",color:"#0d88e4"},
  ];
  return(
    <section id="facilities" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Infrastructure</p>
          <h2 className="section-heading">World-Class <em>Facilities</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>Our campus is purpose-designed to support academic excellence, creative exploration, and physical development — providing the very best learning environment for every student.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.2rem,2vw,1.8rem)"}} className="facilities-grid">
          {facilities.map((f,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.2rem,2vw,2rem)",alignItems:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",overflow:"hidden",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:`all 0.9s ease ${i*0.1}s`}} className="facility-card">
              <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(180px,22vw,260px)",height:"100%"}}>
                <img src={f.img} alt={f.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
              <div style={{padding:"clamp(1.2rem,2vw,1.8rem)",paddingTop:"0"}}>
                <div style={{width:3,height:30,background:f.color,marginBottom:"0.9rem"}}/>
                <h3 style={{fontSize:"clamp(0.85rem,1.2vw,1.1rem)",fontWeight:700,color:"#fff",marginBottom:"0.5rem",lineHeight:1.3}}>{f.title}</h3>
                <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)",lineHeight:1.8,fontWeight:300}}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:640px){.facilities-grid{grid-template-columns:repeat(2,1fr)!important}.facility-card{grid-template-columns:1fr!important}}@media(min-width:1024px){.facility-card{grid-template-columns:clamp(200px,35%,300px) 1fr!important}}`}</style>
    </section>
  );
}

/* ── SPORTS & ATHLETICS ────────────────────────────────────────────────────── */
function Sports(){
  const {ref,vis}=useInView(0.08);
  const sports=[
    {name:"Football",icon:"⚽",desc:"Competitive teams across all age groups, with regular inter-school fixtures and national tournament participation."},
    {name:"Basketball",icon:"🏀",desc:"Structured training sessions and competitive leagues develop teamwork, strategy, and athletic excellence."},
    {name:"Athletics",icon:"🏃",desc:"Full-track and field programme, including sprints, long jump, high jump, and relay events."},
    {name:"Swimming",icon:"🏊",desc:"Learn-to-swim and competitive swimming programmes within our world-class aquatic facilities."},
    {name:"Volleyball",icon:"🏐",desc:"Boys' and girls' volleyball teams competing in regional and national inter-school competitions."},
    {name:"Tennis",icon:"🎾",desc:"Hard courts and professional instruction delivering individual and group coaching for all skill levels."},
  ];
  return(
    <section id="sports" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(3rem,5vw,6rem)",alignItems:"center"}} className="sports-layout">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
            <p className="label-tag">Physical Excellence</p>
            <h2 className="section-heading">Sports &<br/><em>Athletics</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.2rem"}}>Granada International believes in the power of sport to build character, resilience, and leadership. Our comprehensive sports programme develops skilled, competitive, and confident athletes across a wide range of disciplines.</p>
            <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2.5rem)"}}>From early years physical education to competitive national leagues, every student at Granada International is supported to discover their sporting identity and strive for personal excellence.</p>
            <div style={{display:"flex",gap:"clamp(1.2rem,2vw,2rem)",flexWrap:"wrap"}}>
              {[{num:"12+",label:"Sports Offered"},{num:"KG–Y13",label:"Participation"},{num:"National",label:"Competition Level"}].map((s,i)=>(
                <div key={i} style={{textAlign:"center",opacity:vis?1:0,transition:`all 0.7s ease ${0.3+i*0.1}s`}}>
                  <p className="font-display" style={{fontSize:"clamp(1.5rem,2.8vw,2.2rem)",fontWeight:700,color:"var(--primary)",lineHeight:1}}>{s.num}</p>
                  <p style={{fontSize:"clamp(0.55rem,0.75vw,0.62rem)",textTransform:"uppercase",letterSpacing:"0.14em",color:"var(--muted)",fontWeight:600,marginTop:"0.25rem"}}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"#dddbd8",opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.15s"}} className="sports-cards-grid">
              {sports.map((s,i)=>(
                <div key={i} style={{background:"#fff",padding:"clamp(1rem,1.5vw,1.4rem)",transition:"all 0.3s",cursor:"default"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--primary)";(e.currentTarget as HTMLElement).querySelectorAll("h4,p").forEach(el=>(el as HTMLElement).style.color="#fff" );}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#fff";(e.currentTarget as HTMLElement).querySelectorAll("h4,p").forEach(el=>(el as HTMLElement).style.color="");}}>
                  <div style={{fontSize:"clamp(1.2rem,2vw,1.5rem)",marginBottom:"0.5rem"}}>{s.icon}</div>
                  <h4 style={{fontSize:"clamp(0.62rem,0.85vw,0.75rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--primary)",marginBottom:"0.3rem",transition:"color 0.3s"}}>{s.name}</h4>
                  <p style={{fontSize:"clamp(0.6rem,0.78vw,0.7rem)",color:"var(--muted)",lineHeight:1.6,transition:"color 0.3s"}}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.sports-layout{grid-template-columns:1fr 1fr!important}}@media(max-width:768px){.sports-cards-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){.sports-cards-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── ARTS & DRAMA ──────────────────────────────────────────────────────────── */
function ArtsDrama(){
  const {ref,vis}=useInView(0.08);
  return(
    <section id="arts" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2.5rem,4vw,5rem)",alignItems:"center"}} className="arts-layout">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(0.6rem,1vw,0.9rem)"}}>
              <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(200px,28vw,340px)",height:"100%"}}>
                <img src="/music.jpeg" alt="Drama" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"clamp(0.6rem,1vw,0.9rem)"}}>
                <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(90px,12vw,150px)",height:"100%"}}>
                  <img src="/art-room.jpeg" alt="Visual Arts" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
                <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(90px,12vw,150px)",height:"100%"}}>
                  <img src="/sports2.jpeg" alt="Dance" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              </div>
            </div>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.15s"}}>
            <p className="label-tag">Performing Arts</p>
            <h2 className="section-heading">Arts &<br/><em>Drama</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Our vibrant Performing Arts programme at Granada International nurtures creative confidence, emotional intelligence, and expressive ability — building skills that extend far beyond the stage.</p>
            <p className="body-text" style={{marginBottom:"1.4rem"}}>From annual school productions and dramatic monologue competitions to visual art exhibitions and spoken word events, our students have endless opportunities to discover and develop their creative identities.</p>
            <div style={{display:"flex",flexDirection:"column",gap:"0.6rem",marginBottom:"clamp(1.5rem,2.5vw,2rem)"}}>
              {["Annual School Production & Drama Festival","Visual Arts Gallery & Portfolio Programme","Dance, Movement & Physical Theatre","Creative Writing & Spoken Word Competitions","IGCSE & A-Level Arts qualification pathways"].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"0.7rem",padding:"0.6rem 0",borderBottom:"1px solid rgba(255,255,255,0.1)"}} >
                  <span style={{width:6,height:6,background:"var(--secondary)",flexShrink:0,marginTop:6}}/>
                  <span style={{color:"rgba(255,255,255,0.8)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)"}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.arts-layout{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── MUSIC ─────────────────────────────────────────────────────────────────── */
function Music(){
  const {ref,vis}=useInView(0.08);
  const instruments=["Piano","Guitar","Violin","Drums","Vocals","Trumpet","Flute","Bass Guitar"];
  return(
    <section id="music" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Sound & Rhythm</p>
          <h2 className="section-heading">Music <em>Programme</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:600}}>Music at Granada International is celebrated as one of life's most powerful languages. Our comprehensive music programme spans ensemble performance, individual instrumental tuition, and music technology — giving every student the opportunity to find their voice.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,3.5vw,4rem)",alignItems:"center"}} className="music-layout">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease 0.1s"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"#dddbd8",marginBottom:"clamp(1.5rem,2.5vw,2.5rem)"}} className="instruments-grid">
              {instruments.map((inst,i)=>(
                <div key={i} style={{background:"#fff",padding:"clamp(0.8rem,1.2vw,1.1rem)",textAlign:"center",transition:"all 0.25s",cursor:"default"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--primary)";(e.currentTarget.querySelector("p") as HTMLElement).style.color="#fff";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#fff";(e.currentTarget.querySelector("p") as HTMLElement).style.color="";}}>
                  <p style={{fontSize:"clamp(0.6rem,0.8vw,0.72rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--primary)",transition:"color 0.25s"}}>{inst}</p>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(1rem,1.5vw,1.5rem)"}}>
              {[
                {icon:"🎵",title:"School Choir",desc:"Award-winning mixed choir performing at school events, community concerts, and regional competitions."},
                {icon:"🎸",title:"Guitar Ensemble",desc:"Classical and contemporary guitar groups for beginner to advanced players."},
                {icon:"🥁",title:"Percussion & Afro-Jazz",desc:"Celebrating the rich musical heritage of Kenya and the African continent through rhythm and improvisation."},
                {icon:"🎹",title:"Piano Academy",desc:"Classical piano foundations through to advanced IGCSE and A-Level performance examinations."},
              ].map((m,i)=>(
                <div key={i} style={{padding:"clamp(1rem,1.5vw,1.4rem)",background:"#fff",border:"1px solid #e8e6e3",transition:"all 0.3s",cursor:"default"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--primary)";(e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(33,53,88,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#e8e6e3";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                  <div style={{fontSize:"clamp(1.05rem,1.6vw,1.25rem)",marginBottom:"0.5rem"}}>{m.icon}</div>
                  <h4 style={{fontSize:"clamp(0.62rem,0.8vw,0.72rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--primary)",marginBottom:"0.35rem"}}>{m.title}</h4>
                  <p style={{fontSize:"clamp(0.6rem,0.72vw,0.68rem)",color:"var(--muted)",lineHeight:1.6}}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.2s"}}>
            <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(280px,40vw,500px)",height:"100%",marginBottom:"1rem"}}>
              <img src="/music.jpeg" alt="Music at Granada" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div style={{background:"var(--primary)",padding:"clamp(1.2rem,2vw,1.8rem)"}}>
              <p className="font-display" style={{color:"#fff",fontSize:"clamp(0.9rem,1.3vw,1.1rem)",lineHeight:1.7}}>&ldquo;Music is the universal language that connects minds, cultures, and hearts. At Granada International, it is woven into the very fabric of school life.&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.music-layout{grid-template-columns:1fr 1fr!important}}@media(max-width:768px){.instruments-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.instruments-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── CO-CURRICULAR ─────────────────────────────────────────────────────────── */
function CoCurricular(){
  const {ref,vis}=useInView(0.08);
  const activities=[
    {title:"Debate & Public Speaking",icon:"🎤",desc:"Weekly forums where students develop articulate thinking, persuasive writing, and confident public speaking skills."},
    {title:"Entrepreneurship Club",icon:"💡",desc:"Students develop business ideas, pitch to panels, and learn the fundamentals of entrepreneurship and finance."},
    {title:"STEM Club",icon:"🔬",desc:"Hands-on science fair projects, robotics competitions, and engineering challenges throughout the academic year."},
    {title:"Environment & Eco Club",icon:"🌿",desc:"Leading sustainability initiatives on campus — from tree planting to waste management and reforestation projects."},
    {title:"Community Service",icon:"🤝",desc:"Structured outreach programmes that build empathy, social responsibility, and global awareness in all students."},
    {title:"Chess & Strategy Games",icon:"♟️",desc:"Fostering logical thinking, pattern recognition, and strategic planning through competitive chess programming."},
    {title:"Cultural Exchange",icon:"🌍",desc:"Celebrating Kenya's rich cultural diversity through language, food, music, and international exchange events."},
    {title:"Student Council",icon:"🏛️",desc:"Elected student representatives driving school initiatives, community projects, and student welfare advocacy."},
  ];
  return(
    <section id="cocurricular" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) 0",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Beyond the Curriculum</p>
          <h2 className="section-heading">Co-Curricular <em>Activities</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:600}}>Our rich roster of co-curricular activities ensures every student finds their passion, builds new skills, and contributes meaningfully to the Granada International community.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(255,255,255,0.08)"}} className="activities-grid">
          {activities.map((a,i)=>(
            <div key={i} style={{padding:"clamp(1.4rem,2vw,2rem) clamp(1.2rem,1.8vw,1.6rem)",background:"rgba(255,255,255,0.05)",transition:"all 0.3s",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transitionDelay:`${i*0.07}s`,borderBottom:"2px solid transparent"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)";(e.currentTarget as HTMLElement).style.borderBottomColor="var(--secondary)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)";(e.currentTarget as HTMLElement).style.borderBottomColor="transparent";}}>
              <div style={{fontSize:"clamp(1.4rem,2.2vw,1.8rem)",marginBottom:"0.75rem"}}>{a.icon}</div>
              <h3 style={{fontSize:"clamp(0.65rem,0.88vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--secondary)",marginBottom:"0.55rem",lineHeight:1.3}}>{a.title}</h3>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.68rem,0.82vw,0.75rem)",lineHeight:1.75,fontWeight:300}}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.activities-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.activities-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── LEADERSHIP ────────────────────────────────────────────────────────────── */
function Leadership(){
  const {ref,vis}=useInView(0.08);
  const programmes=[
    {stage:"Early Years – Year 4",title:"Discovery & Responsibility",color:"var(--secondary)",desc:"Young learners are introduced to basic leadership concepts through classroom roles, group projects, and community helpers programmes — building confidence and empathy from the earliest stages."},
    {stage:"Year 5 – Year 9",title:"Emerging Leaders",color:"#936c51",desc:"Students participate in structured leadership modules, public speaking forums, student-led events, and peer mentorship opportunities. The Student Council begins here."},
    {stage:"Senior School (IGCSE & A-Level)",title:"Global Leadership Programme",color:"#4a6428",desc:"Comprehensive leadership training including global citizenship projects, university preparation leadership workshops, Duke of Edinburgh Award participation, and mentorship roles within the school community."},
  ];
  return(
    <section id="leadership" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Character & Purpose</p>
          <h2 className="section-heading">Leadership <em>Development</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:620}}>At Granada International, we believe leadership is not a title — it is a mindset. Our carefully structured leadership development pathway ensures every student develops the vision, communication skills, and moral foundation to make a positive impact.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:1,background:"#dddbd8",marginBottom:"clamp(2.5rem,4vw,4rem)"}}>
          {programmes.map((p,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.2rem,2vw,2rem)",alignItems:"start",background:"#fff",padding:"clamp(1.8rem,2.5vw,2.5rem) clamp(1.4rem,2vw,2rem)",borderLeft:`4px solid ${p.color}`,opacity:vis?1:0,transform:vis?"none":"translateX(-20px)",transition:`all 0.9s ease ${i*0.12}s`}} className="leadership-card">
              <div>
                <span style={{display:"inline-block",padding:"0.25rem 0.75rem",background:`${p.color}18`,color:p.color,fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:700,marginBottom:"0.7rem"}}>{p.stage}</span>
                <h3 style={{fontSize:"clamp(0.85rem,1.2vw,1.1rem)",fontWeight:700,color:"var(--primary)",marginBottom:"0.5rem"}}>{p.title}</h3>
              </div>
              <p className="body-text">{p.desc}</p>
            </div>
          ))}
        </div>
        {/* Quote banner */}
        <div style={{background:"var(--primary)",padding:"clamp(2rem,3.5vw,4rem) clamp(1.5rem,2.5vw,3rem)",textAlign:"center",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.4s"}}>
          <p className="font-display" style={{fontSize:"clamp(1.2rem,2.2vw,1.8rem)",fontWeight:400,color:"#fff",lineHeight:1.65,maxWidth:720,margin:"0 auto",marginBottom:"1.2rem"}}>
            &ldquo;Great leaders are not born into leadership — they are shaped by great education, strong values, and the courage to serve others.&rdquo;
          </p>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.6rem,0.8vw,0.7rem)",letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:600}}>Granada International School</p>
        </div>
      </div>
      <style>{`@media(min-width:768px){.leadership-card{grid-template-columns:clamp(200px,28%,280px) 1fr!important}}`}</style>
    </section>
  );
}

/* ── BOARDING LIFE ─────────────────────────────────────────────────────────── */
function BoardingLife(){
  const {ref,vis}=useInView(0.08);
  const features=[
    {icon:"🛏️",title:"Comfortable Accommodation",desc:"Well-furnished boarding houses designed with safety, comfort, and community in mind."},
    {icon:"🍽️",title:"Nutritious Catering",desc:"Balanced, healthy meals prepared by dedicated catering staff — dietary requirements fully accommodated."},
    {icon:"📚",title:"Supervised Study Time",desc:"Structured evening prep sessions with academic support ensuring consistent academic progress."},
    {icon:"🌙",title:"Evening Activities",desc:"A curated schedule of sports, hobbies, arts, and social events after lessons."},
    {icon:"👩‍⚕️",title:"Health & Welfare",desc:"On-site medical support with 24/7 pastoral care ensuring every boarder feels safe and valued."},
    {icon:"👨‍👩‍👧",title:"Family Communication",desc:"Regular updates and dedicated parent communication channels keeping families fully connected."},
  ];
  return(
    <section id="boarding" ref={ref} className="section-blue" style={{position:"relative",padding:"clamp(3rem,5.5vw,5.5rem) 0",scrollMarginTop:"100px",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/dorm.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.93)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Senior School Girls · Boarding Life</p>
          <h2 className="section-heading">Our <em>Boarding Community</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:620}}>Our Girls' Boarding Senior School provides a safe, structured, and nurturing environment where academic focus and personal growth go hand in hand — building confidence, independence, and lifelong friendship.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(255,255,255,0.08)"}} className="boarding-grid">
          {features.map((f,i)=>(
            <div key={i} style={{padding:"clamp(1.5rem,2vw,2.2rem) clamp(1.2rem,1.8vw,1.8rem)",background:"rgba(255,255,255,0.05)",transition:"all 0.3s",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transitionDelay:`${i*0.08}s`}} onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"}>
              <div style={{fontSize:"clamp(1.4rem,2.2vw,1.8rem)",marginBottom:"0.8rem"}}>{f.icon}</div>
              <h3 style={{fontSize:"clamp(0.65rem,0.88vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--secondary)",marginBottom:"0.4rem",lineHeight:1.3}}>{f.title}</h3>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.68rem,0.82vw,0.75rem)",lineHeight:1.75,fontWeight:300}}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.9s ease 0.5s"}}>
          <a href="/granada-international/admissions#senior-process" className="btn-green" style={{fontSize:"clamp(0.62rem,0.88vw,0.7rem)",padding:"0.8rem 2.2rem"}}>Apply to Boarding Senior School</a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.boarding-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.boarding-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{background:"var(--primary)",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)",textAlign:"center"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"1.2rem"}}>Visit Our Campus</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"1.5rem"}}>
          Experience life at <span style={{color:"var(--accent-light)"}}>Granada International</span> in person.
        </h2>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.8,marginBottom:"2rem"}}>We warmly invite prospective families to schedule a private visit and experience our campus, facilities, and community firsthand.</p>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          <a href="/granada-international/contact?type=visit" className="btn-green" style={{fontSize:"clamp(0.62rem,0.88vw,0.7rem)",padding:"0.75rem 2rem"}}>Book a Campus Tour</a>
          <a href="/granada-international/admissions" style={{display:"inline-block",padding:"0.75rem 2rem",background:"transparent",border:"1px solid rgba(255,255,255,0.5)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Admissions Info</a>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  "activities": () => <CampusOverview/>,
  "facilities": () => <Facilities/>,
  "sports": () => <Sports/>,
  "arts": () => <ArtsDrama/>,
  "music": () => <Music/>,
  "cocurricular": () => <CoCurricular/>,
  "leadership": () => <Leadership/>,
  "boarding": () => <BoardingLife/>,
};

export default function CampusLifePage(){
  const params = useParams();
  const section = (params.section as string) || "activities";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["activities"];
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
