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
  {label:"Wellbeing Approach",      id:"approach"},
  {label:"Counselling Support",     id:"counselling"},
  {label:"Core Values",             id:"values"},
  {label:"Character Education",     id:"character"},
  {label:"Global Citizenship",      id:"global"},
  {label:"Boarding Pastoral Care",  id:"boarding-care"},
];
const BASE_PATH = "/granada-international/wellbeing";

function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Wellbeing Approach";

  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/sports2.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"wbKenBurns 18s ease-in-out infinite alternate"}}/>
<div style={{position:"absolute",top:"14%",left:"4%",width:"clamp(100px,15vw,180px)",height:"clamp(100px,15vw,180px)",border:"1px solid rgba(170,194,12,0.25)",animation:"wbSpin 32s linear infinite"}}/>
      <div style={{position:"absolute",top:"18%",left:"7%",width:"clamp(55px,8vw,110px)",height:"clamp(55px,8vw,110px)",border:"1px solid rgba(255,255,255,0.12)",animation:"wbSpin 22s linear infinite reverse"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        <div style={{display:"flex",justifyContent:"flex-end"}} className="hero-content">
          <div style={{maxWidth:"clamp(260px,45vw,520px)"}}>
            <h1 className="font-display" style={{fontSize:"clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
              Nurturing the<br/><span style={{color:"var(--accent-light)"}}>Whole Child</span>
            </h1>
          </div>
        </div>
      </div>
      <style>{`@keyframes wbKenBurns{0%{transform:scale(1)}100%{transform:scale(1.06)}}@keyframes wbSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ──────────────────────────────────────────────────────────── */
function TaglineStrip(){
  const tags=["Pastoral Care","Counselling Support","Character Education","Global Citizenship","Boarding Wellbeing"];
  return(
    <div style={{background:"#4a6428",padding:"clamp(0.75rem,1.4vw,1.1rem) clamp(1rem,2vw,2rem)"}}>
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

/* ── WELLBEING APPROACH ───────────────────────────────────────────────────── */
function WellbeingApproach(){
  const {ref,vis}=useInView(0.08);
  const pillars=[
    {icon:"🧠",title:"Academic Wellbeing",color:"var(--primary)",desc:"Supporting each student's learning journey through differentiated teaching, academic mentoring, and a nurturing classroom culture where mistakes are seen as stepping stones."},
    {icon:"💚",title:"Emotional Wellbeing",color:"#4a6428",desc:"Professional counselling, peer support groups, and structured emotional literacy programmes ensure every student has the tools to navigate life's challenges with confidence."},
    {icon:"🤸",title:"Physical Wellbeing",color:"#936c51",desc:"A holistic physical education programme, nutritious catering, and health awareness campaigns build healthy habits that last a lifetime."},
    {icon:"🌍",title:"Social Wellbeing",color:"#0d88e4",desc:"Community service, global citizenship projects, and collaborative learning develop empathy, respect, and meaningful human connection."},
    {icon:"✨",title:"Spiritual & Moral Wellbeing",color:"#483454",desc:"Reflective practice, values-based assemblies, and ethical conversations help students develop integrity, purpose, and a principled worldview."},
    {icon:"👨‍👩‍👧",title:"Family Partnership",color:"#c0180b",desc:"We believe families are our most important partners. Regular communication, parent workshops, and open-door policies keep families fully engaged in their child's journey."},
  ];
  return(
    <section id="approach" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Holistic Education</p>
          <h2 className="section-heading">Our Wellbeing <em>Approach</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:620}}>At Granada International, we take a holistic approach to student wellbeing — recognising that true excellence is not only academic, but emotional, physical, social, and moral. Our five-pillar wellbeing framework ensures every dimension of a student's development is carefully supported.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"#dddbd8"}} className="pillars-grid">
          {pillars.map((p,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.4rem,2.2vw,2.2rem) clamp(1.2rem,1.8vw,1.8rem)",borderTop:`3px solid ${p.color}`,transition:"all 0.3s",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transitionDelay:`${i*0.07}s`}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLElement).style.boxShadow=`0 8px 28px ${p.color}18`;}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
              <div style={{fontSize:"clamp(1.4rem,2.2vw,1.8rem)",marginBottom:"0.7rem"}}>{p.icon}</div>
              <h3 style={{fontSize:"clamp(0.65rem,0.88vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:p.color,marginBottom:"0.6rem",lineHeight:1.3}}>{p.title}</h3>
              <p style={{color:"var(--muted)",fontSize:"clamp(0.68rem,0.82vw,0.75rem)",lineHeight:1.75}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.pillars-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.pillars-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── COUNSELLING SUPPORT ────────────────────────────────────────────────────── */
function CounsellingSupport(){
  const {ref,vis}=useInView(0.08);
  return(
    <section id="counselling" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) 0",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2.5rem,4vw,5rem)",alignItems:"center"}} className="counsel-layout">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
            <p className="label-tag">Mental Health & Support</p>
            <h2 className="section-heading">Counselling <em>Support</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Granada International provides a dedicated, confidential counselling service available to all students — offering a safe, non-judgmental space to discuss personal challenges, academic pressures, and emotional health.</p>
            <p className="body-text" style={{marginBottom:"1.4rem"}}>Our qualified school counsellors are trained in adolescent psychology and employ evidence-based approaches — from cognitive-behavioural strategies to mindfulness practices — to support every student&apos;s mental health journey.</p>
            <div style={{display:"flex",flexDirection:"column",gap:"0.55rem",marginBottom:"clamp(1.5rem,2.5vw,2rem)"}}>
              {[
                "Individual one-to-one counselling sessions",
                "Group support sessions and peer wellbeing circles",
                "Transition support (Junior to Senior School, Boarding orientation)",
                "Exam stress and academic pressure management",
                "Bereavement, grief, and life change support",
                "Parent and family guidance sessions",
              ].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"0.7rem",padding:"0.55rem 0",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                  <span style={{width:6,height:6,background:"var(--secondary)",flexShrink:0,marginTop:5}}/>
                  <span style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)"}}>{item}</span>
                </div>
              ))}
            </div>
            <a href="mailto:admissions@granadaschools.group" className="btn-green">Request Counselling Support</a>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.15s"}}>
            <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(280px,38vw,440px)",height:"100%",marginBottom:"1rem"}}>
              <img src="/staffroom.jpeg" alt="Counselling" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,0.1)"}}>
              {[{num:"Certified",label:"School Counsellors"},{num:"Confidential",label:"Private Sessions"},{num:"All Ages",label:"KG–Senior School"},{num:"24/7",label:"Boarding Support"}].map((s,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.06)",padding:"clamp(0.9rem,1.5vw,1.3rem)",textAlign:"center"}}>
                  <p className="font-display" style={{fontSize:"clamp(0.9rem,1.4vw,1.2rem)",fontWeight:700,color:"var(--secondary)",lineHeight:1}}>{s.num}</p>
                  <p style={{color:"rgba(255,255,255,0.65)",fontSize:"clamp(0.55rem,0.7vw,0.62rem)",textTransform:"uppercase",letterSpacing:"0.12em",marginTop:"0.3rem",fontWeight:600}}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.counsel-layout{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── CORE VALUES ────────────────────────────────────────────────────────────── */
function CoreValuesSection(){
  const {ref,vis}=useInView(0.08);
  const values=[
    {name:"Resilience",color:"#c0180b",icon:"🔥",desc:"We embrace challenges as opportunities for growth. Our students develop the strength to persevere, adapt, and rise above adversity with courage."},
    {name:"Curiosity",color:"#ebae1b",icon:"🔍",desc:"We celebrate questioning minds. Students are encouraged to explore, investigate, and develop a genuine love of learning that extends far beyond the classroom."},
    {name:"Kindness",color:"#4a6428",icon:"💚",desc:"Empathy and compassion are at the core of our community. We celebrate acts of service, generosity, and the power of treating every person with dignity."},
    {name:"Honesty",color:"#84b7c8",icon:"🌟",desc:"Integrity and truthfulness are non-negotiable at Granada International. We model transparency and expect the highest ethical standards from our entire community."},
    {name:"Respect",color:"#483454",icon:"🤝",desc:"We celebrate diversity and value every perspective. Respect for self, others, and the world around us is embedded in every interaction within our school community."},
  ];
  return(
    <section id="values" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">The Granada Way</p>
          <h2 className="section-heading">Our Core <em>Values</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>Five values form the foundation of life at Granada International — shaping the way our students learn, lead, and relate to the world.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"clamp(1rem,1.5vw,1.5rem)"}} className="values-grid">
          {values.map((v,i)=>(
            <div key={i} style={{padding:"clamp(1.2rem,2vw,2rem) clamp(1rem,1.5vw,1.4rem)",background:"#fff",border:`1px solid ${v.color}20`,borderTop:`4px solid ${v.color}`,transition:"all 0.35s",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transitionDelay:`${i*0.08}s`}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-6px)";(e.currentTarget as HTMLElement).style.boxShadow=`0 12px 40px ${v.color}20`;(e.currentTarget as HTMLElement).style.border=`1px solid ${v.color}50`;(e.currentTarget as HTMLElement).style.borderTop=`4px solid ${v.color}`;}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="none";(e.currentTarget as HTMLElement).style.border=`1px solid ${v.color}20`;(e.currentTarget as HTMLElement).style.borderTop=`4px solid ${v.color}`;}}>
              <div style={{fontSize:"clamp(1.4rem,2.2vw,1.8rem)",marginBottom:"0.6rem"}}>{v.icon}</div>
              <h3 style={{fontSize:"clamp(0.65rem,0.88vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:v.color,marginBottom:"0.6rem"}}>{v.name}</h3>
              <p style={{fontSize:"clamp(0.62rem,0.75vw,0.7rem)",color:"var(--muted)",lineHeight:1.75}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.values-grid{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:600px){.values-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:380px){.values-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── CHARACTER EDUCATION ────────────────────────────────────────────────────── */
function CharacterEducation(){
  const {ref,vis}=useInView(0.08);
  const programmes=[
    {title:"Values-Based Assemblies",icon:"🎙️",desc:"Weekly whole-school assemblies and class reflection sessions embedding our five core values into the rhythm of daily school life."},
    {title:"Peer Leadership Programme",icon:"👥",desc:"Year 9 students take on leadership and mentoring roles for younger students — building empathy, responsibility, and community ties."},
    {title:"Social Emotional Learning (SEL)",icon:"💡",desc:"A structured SEL curriculum integrated across all year groups — teaching emotional regulation, communication, and conflict resolution."},
    {title:"Ethics & Citizenship Classes",icon:"⚖️",desc:"Dedicated lessons explore philosophy, ethics, justice, and what it means to be a responsible, engaged global citizen."},
    {title:"Community Service Hours",icon:"🤝",desc:"All students complete structured community service hours, making meaningful contributions to local communities around Vipingo and Kilifi County."},
    {title:"Restorative Practice",icon:"🔄",desc:"Our school-wide restorative approach to conflict resolution prioritises understanding, empathy, and relationship repair over punitive measures."},
  ];
  return(
    <section id="character" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) 0",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Beyond Grades</p>
          <h2 className="section-heading">Character <em>Education</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:600}}>A rigorous academic programme builds knowledge — but character education builds the human being. At Granada International, we are intentional, structured, and passionate about developing people of integrity, empathy, and vision.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(255,255,255,0.08)",marginBottom:"clamp(2.5rem,4vw,4rem)"}} className="char-grid">
          {programmes.map((p,i)=>(
            <div key={i} style={{padding:"clamp(1.4rem,2vw,2rem) clamp(1.2rem,1.8vw,1.8rem)",background:"rgba(255,255,255,0.05)",transition:"all 0.3s",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transitionDelay:`${i*0.07}s`,borderBottom:"2px solid transparent"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)";(e.currentTarget as HTMLElement).style.borderBottomColor="var(--secondary)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)";(e.currentTarget as HTMLElement).style.borderBottomColor="transparent";}}>
              <div style={{fontSize:"clamp(1.4rem,2.2vw,1.8rem)",marginBottom:"0.7rem"}}>{p.icon}</div>
              <h3 style={{fontSize:"clamp(0.65rem,0.88vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--secondary)",marginBottom:"0.55rem",lineHeight:1.3}}>{p.title}</h3>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.68rem,0.82vw,0.75rem)",lineHeight:1.75,fontWeight:300}}>{p.desc}</p>
            </div>
          ))}
        </div>
        {/* Quote */}
        <div style={{border:"1px solid rgba(255,255,255,0.2)",padding:"clamp(2rem,3vw,3rem) clamp(1.5rem,2.5vw,2.5rem)",textAlign:"center",background:"rgba(255,255,255,0.04)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.5s"}}>
          <p className="font-display" style={{fontSize:"clamp(1rem,1.8vw,1.5rem)",fontWeight:400,color:"#fff",lineHeight:1.7,maxWidth:680,margin:"0 auto"}}>
            &ldquo;Character is not something a school teaches — it is something a school lives. At Granada International, our values are not on display. They are in practice, every day.&rdquo;
          </p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.char-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.char-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── GLOBAL CITIZENSHIP ─────────────────────────────────────────────────────── */
function GlobalCitizenship(){
  const {ref,vis}=useInView(0.08);
  const initiatives=[
    {title:"Model United Nations (MUN)",icon:"🌐",desc:"Participating in local, national, and international MUN conferences — developing diplomacy, research, and public speaking skills."},
    {title:"Environmental Stewardship",icon:"🌱",desc:"Sustainability projects, school garden initiatives, and awareness campaigns preparing students to be environmental advocates."},
    {title:"Intercultural Exchange",icon:"🎌",desc:"Pen pal programmes, virtual exchange sessions, and cultural celebration days connecting our students with global peers."},
    {title:"Service Learning Trips",icon:"🚌",desc:"Structured community service visits to schools, hospitals, and environmental projects within Kilifi County and beyond."},
    {title:"Social Entrepreneurship",icon:"💡",desc:"Students design, pitch, and implement real-world solutions to community challenges — building innovation, empathy, and leadership."},
    {title:"Global Issues Forum",icon:"📰",desc:"Regular workshops and discussions on global current events — from climate change to social justice — developing critical, informed perspectives."},
  ];
  return(
    <section id="global" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2.5rem,4vw,5rem)",alignItems:"start"}} className="global-layout">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
            <p className="label-tag">Citizens of the World</p>
            <h2 className="section-heading">Global <em>Citizenship</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>At Granada International, we believe every student has the responsibility to engage meaningfully with the world beyond their own community. Our Global Citizenship programme prepares students to think broadly, act ethically, and lead with purpose — wherever their futures take them.</p>
            <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2.5rem)"}}>Through formal programmes, extracurricular projects, and everyday classroom discussion, our students develop awareness, compassion, and the practical skills to be effective global contributors.</p>
            <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(200px,28vw,320px)",height:"100%"}}>
              <img src="/class.jpeg" alt="Global Citizenship" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          </div>
          <div>
            <div style={{display:"flex",flexDirection:"column",gap:1,background:"#dddbd8"}}>
              {initiatives.map((item,i)=>(
                <div key={i} style={{display:"flex",gap:"clamp(1rem,1.5vw,1.4rem)",padding:"clamp(1.2rem,1.8vw,1.6rem) clamp(1.2rem,1.8vw,1.6rem)",background:"#fff",alignItems:"flex-start",transition:"all 0.3s",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateX(20px)",transitionDelay:`${i*0.07}s`,borderLeft:"3px solid transparent"}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--body-bg)";(e.currentTarget as HTMLElement).style.borderLeftColor="var(--primary)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#fff";(e.currentTarget as HTMLElement).style.borderLeftColor="transparent";}}>
                  <span style={{fontSize:"clamp(1.1rem,1.5vw,1.3rem)",flexShrink:0}}>{item.icon}</span>
                  <div>
                    <h4 style={{fontSize:"clamp(0.62rem,0.82vw,0.72rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--primary)",marginBottom:"0.3rem"}}>{item.title}</h4>
                    <p style={{fontSize:"clamp(0.62rem,0.75vw,0.7rem)",color:"var(--muted)",lineHeight:1.7}}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.global-layout{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── BOARDING PASTORAL CARE ──────────────────────────────────────────────────── */
function BoardingPastoralCare(){
  const {ref,vis}=useInView(0.08);
  return(
    <section id="boarding-care" ref={ref} className="section-blue" style={{position:"relative",padding:"clamp(3rem,5.5vw,5.5rem) 0",overflow:"hidden",scrollMarginTop:"100px"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/sports.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(74,100,40,0.93)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2.5rem,4vw,5rem)",alignItems:"center"}} className="boarding-care-layout">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
            <p className="label-tag">Senior School · Girls Boarding</p>
            <h2 className="section-heading">Boarding <em>Pastoral Care</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Our Girls' Boarding Senior School provides far more than accommodation and meals — it offers a second home, a close-knit community, and a dedicated pastoral team committed to every boarder's happiness, safety, and wellbeing.</p>
            <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2rem)"}}>Our resident Houseparents and pastoral staff are available around the clock — ensuring girls feel supported, valued, and genuinely cared for every hour of their boarding experience.</p>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.15s"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,0.1)"}}>
              {[
                {icon:"🏠",title:"Dedicated Houseparents",desc:"Resident Houseparents available 24/7 for support, guidance, and care."},
                {icon:"🌙",title:"Evening Supervision",desc:"Structured evening programmes, supervised prep, and relaxation time."},
                {icon:"👩‍⚕️",title:"Medical Care",desc:"On-site medical suite and healthcare provisions for day-to-day health needs."},
                {icon:"📞",title:"Family Communication",desc:"Regular updates and weekly family calls to keep parents fully connected."},
                {icon:"📖",title:"Spiritual Reflection",desc:"Quiet reflection, mindfulness sessions, and optional spiritual guidance."},
                {icon:"🎉",title:"Weekend Activities",desc:"Curated weekend programmes including outings, creative workshops, and social events."},
              ].map((item,i)=>(
                <div key={i} style={{padding:"clamp(1rem,1.5vw,1.5rem)",background:"rgba(255,255,255,0.06)",transition:"background 0.3s",cursor:"default",opacity:vis?1:0,transitionDelay:`${0.3+i*0.07}s`}} onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.06)"}>
                  <div style={{fontSize:"clamp(1.1rem,1.8vw,1.4rem)",marginBottom:"0.5rem"}}>{item.icon}</div>
                  <h4 style={{fontSize:"clamp(0.6rem,0.8vw,0.7rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--secondary)",marginBottom:"0.3rem",lineHeight:1.3}}>{item.title}</h4>
                  <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.6rem,0.72vw,0.68rem)",lineHeight:1.6}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.boarding-care-layout{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{background:"var(--primary)",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)",textAlign:"center"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"1.2rem"}}>Begin the Journey</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"1.5rem"}}>
          A place where every student <span style={{color:"var(--accent-light)"}}>truly belongs.</span>
        </h2>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.8,marginBottom:"2rem"}}>
          We invite you to discover the Granada International difference — where academic excellence and genuine pastoral care are inseparable.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          <a href="/granada-international/admissions" className="btn-green" style={{fontSize:"clamp(0.62rem,0.88vw,0.7rem)",padding:"0.75rem 2rem"}}>Apply to Granada International</a>
          <a href="/granada-international/contact" style={{display:"inline-block",padding:"0.75rem 2rem",background:"transparent",border:"1px solid rgba(255,255,255,0.5)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Enquire Now</a>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  "approach": () => <WellbeingApproach/>,
  "counselling": () => <CounsellingSupport/>,
  "values": () => <CoreValuesSection/>,
  "character": () => <CharacterEducation/>,
  "global": () => <GlobalCitizenship/>,
  "boarding-care": () => <BoardingPastoralCare/>,
};

export default function WellbeingPage(){
  const params = useParams();
  const section = (params.section as string) || "approach";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["approach"];
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
