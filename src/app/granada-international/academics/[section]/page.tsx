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

/* ── useInView ─────────────────────────────────────────────────────────────── */
function useInView(threshold=0.12){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── SECTION DATA ──────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  {label:"Overview",           id:"overview"},
  {label:"Edexcel Curriculum", id:"edexcel"},
  {label:"School Sections",    id:"sections"},
  {label:"University Pathways",id:"university"},
  {label:"Apply",              id:"apply"},
];
const BASE_PATH = "/granada-international/academics";

/* ── PAGE HERO ──────────────────────────────────────────────────────────────── */
function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Overview";
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/class.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"acKenBurns 12s ease-in-out infinite alternate"}}/>
      {/* Animated accent line */}
      <div style={{position:"absolute",top:0,right:0,bottom:0,width:4,background:"linear-gradient(to bottom,transparent,var(--secondary),transparent)",opacity:loaded?0.7:0,transition:"opacity 1.2s ease 0.8s"}}/>
      {/* World map motif */}
      <div style={{position:"absolute",top:"50%",right:"8%",transform:"translateY(-50%)",fontSize:"clamp(6rem,15vw,14rem)",opacity:0.04,color:"#fff",userSelect:"none",pointerEvents:"none"}}>🌍</div>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        <div style={{display:"flex",justifyContent:"flex-end"}} className="hero-content">
          <div style={{maxWidth:"clamp(260px,45vw,520px)"}}>
            <h1 className="font-display" style={{fontSize:"clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)",fontWeight:600,lineHeight:1.03,color:"#fff",marginBottom:"0.9rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
              Academic Excellence<br/><span style={{color:"var(--accent-light)"}}>at Granada International</span>
            </h1>
          </div>
        </div>
      </div>

      <style>{`@keyframes acKenBurns{0%{transform:scale(1)}100%{transform:scale(1.07)}}`}</style>
    </section>
  );
}

/* ── SECTION NAV ────────────────────────────────────────────────────────────── */
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

/* ── OVERVIEW ───────────────────────────────────────────────────────────────── */
function Overview(){
  const {ref,vis}=useInView(0.08);
  const stats=[
    {num:"Edexcel",label:"British Curriculum",sub:"Globally Recognised"},
    {num:"IGCSE",  label:"International GCSE",sub:"Years 10 & 11"},
    {num:"A-Level",label:"Advanced Level",sub:"University Preparation"},
    {num:"180+",   label:"Universities",sub:"Global Access"},
  ];
  return(
    <section className="section-cream" id="overview" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <p className="font-display" style={{fontSize:"clamp(1rem,1.8vw,1.5rem)",color:"var(--primary)",lineHeight:1.7,marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",borderLeft:"3px solid var(--secondary)",paddingLeft:"clamp(0.9rem,1.5vw,1.4rem)",maxWidth:820,opacity:vis?1:0,transform:vis?"none":"translateY(16px)",transition:"all 0.8s ease"}}>
          At Granada International, academic excellence is achieved through the internationally recognised British Edexcel curriculum — developing analytical thinking, academic depth, and global awareness in every learner.
        </p>
        <div>
          <div className="section-float-img" style={{float:"right",margin:"0 0 1.2rem 1.5rem",width:"clamp(280px,38vw,420px)",opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.2s"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"#dddbd8",marginBottom:"clamp(1.2rem,2vw,1.5rem)"}}>
              {stats.map((s,i)=>(
                <div key={i} style={{background:i===2?"var(--primary)":"#fff",padding:"clamp(1.2rem,2vw,1.75rem) clamp(1rem,1.5vw,1.4rem)",textAlign:"center",transition:"transform 0.3s",cursor:"default"}}
                  onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-3px)")} onMouseLeave={e=>(e.currentTarget.style.transform="none")}>
                  <div className="font-display" style={{fontSize:"clamp(1.4rem,2.2vw,1.9rem)",fontWeight:700,color:i===2?"var(--accent-light)":"var(--primary)",lineHeight:1,marginBottom:"0.3rem",letterSpacing:"-0.02em"}}>{s.num}</div>
                  <div style={{fontSize:"clamp(0.6rem,0.8vw,0.72rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:i===2?"#fff":"var(--body-text)",marginBottom:"0.2rem"}}>{s.label}</div>
                  <div style={{fontSize:"clamp(0.55rem,0.7vw,0.62rem)",color:i===2?"rgba(255,255,255,0.7)":"var(--muted)",letterSpacing:"0.06em"}}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{overflow:"hidden",minHeight:"clamp(200px,28vw,280px)",height:"100%"}} className="img-hover">
              <img src="/class.jpeg" alt="International students" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease 0.1s"}}>
            <p className="label-tag">Our Approach</p>
            <h2 className="section-heading">A World-Class <em>Education</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Granada International delivers the British Pearson Edexcel curriculum — one of the most respected and globally benchmarked academic frameworks in the world. This internationally recognised pathway prepares learners for higher education opportunities around the world.</p>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>The Edexcel programme develops analytical thinking, academic depth, and global awareness — equipping learners with the intellectual rigour, communication skills, and critical perspectives needed to succeed at the world's leading universities.</p>
            <p className="body-text" style={{marginBottom:"2rem"}}>From the earliest years through to A-Level, every stage of learning at Granada International is designed to challenge, inspire, and prepare learners for a truly global future.</p>
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",clear:"both"}}>
              <a href="#edexcel" onClick={e=>{e.preventDefault();const el=document.getElementById("edexcel");if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});}}} className="btn-solid">Edexcel Curriculum</a>
              <a href="#sections" onClick={e=>{e.preventDefault();const el=document.getElementById("sections");if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});}}} className="btn-outline">School Sections</a>
            </div>
          </div>
          <div style={{clear:"both"}}/>
        </div>
      </div>
    </section>
  );
}

/* ── EDEXCEL CURRICULUM ─────────────────────────────────────────────────────── */
function EdexcelCurriculum(){
  const {ref,vis}=useInView(0.08);
  const pillars=[
    {icon:"🔬",title:"Analytical Thinking",desc:"Learners develop the ability to break down complex problems, evaluate evidence, and construct well-reasoned arguments — a skill that transcends every discipline.",color:"var(--primary)"},
    {icon:"📐",title:"Academic Depth",desc:"Edexcel syllabi provide thorough, rigorous coverage of each subject, building genuine expertise and intellectual confidence at every level.",color:"var(--secondary)"},
    {icon:"🌐",title:"Global Awareness",desc:"Learners develop an international perspective — understanding global systems, diverse cultures, and their place in a rapidly evolving world.",color:"var(--accent-warm)"},
    {icon:"✍️",title:"Written Mastery",desc:"Strong essay-writing, extended response, and academic writing skills prepare students for university-level demands with confidence.",color:"var(--accent-green)"},
    {icon:"🧪",title:"Scientific Enquiry",desc:"Laboratory-based learning and structured investigation develop scientific methodology, curiosity, and evidence-based reasoning.",color:"var(--accent-blue)"},
    {icon:"🎓",title:"University Preparation",desc:"Every stage of the Edexcel pathway is designed to equip learners with the qualifications, skills, and mindset to succeed at top universities globally.",color:"var(--accent-pink)"},
  ];
  return(
    <section className="section-blue" id="edexcel" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(2rem,3vw,3rem)",flexWrap:"wrap",gap:"1.5rem"}}>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
            <p className="label-tag">Pearson Edexcel · Internationally Recognised</p>
            <h2 className="section-heading">British Edexcel <em>Curriculum</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{maxWidth:560}}>The internationally recognised British Edexcel curriculum provides learners with globally benchmarked academic standards and prepares them for higher education opportunities around the world.</p>
          </div>
          <div style={{opacity:vis?1:0,transition:"opacity 0.8s ease 0.3s",flexShrink:0,display:"flex",flexDirection:"column",gap:"0.5rem",alignItems:"flex-end"}}>
            <span style={{display:"inline-block",padding:"0.45rem 1.2rem",border:"1px solid var(--secondary)",color:"var(--secondary)",fontSize:"clamp(0.56rem,0.8vw,0.65rem)",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>Edexcel Pathway</span>
            <span style={{display:"inline-block",padding:"0.35rem 1rem",border:"1px solid rgba(255,255,255,0.3)",color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",letterSpacing:"0.16em",textTransform:"uppercase",fontWeight:600}}>IGCSE + A-Level</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(255,255,255,0.1)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="edexcel-grid">
          {pillars.map((p,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.06)",padding:"clamp(1.4rem,2vw,2rem) clamp(1.2rem,1.8vw,1.6rem)",borderTop:`2px solid ${p.color}`,opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.08}s`,cursor:"default"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.06)";}}>
              <span style={{fontSize:"clamp(1.4rem,2vw,1.8rem)",display:"block",marginBottom:"clamp(0.7rem,1vw,1rem)"}}>{p.icon}</span>
              <h3 style={{fontSize:"clamp(0.7rem,0.9vw,0.82rem)",textTransform:"uppercase",letterSpacing:"0.12em",color:"#fff",fontWeight:700,marginBottom:"0.6rem"}}>{p.title}</h3>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.72rem,0.85vw,0.8rem)",lineHeight:1.75,fontWeight:300}}>{p.desc}</p>
            </div>
          ))}
        </div>
        {/* Edexcel global note */}
        <div style={{border:"1px solid rgba(255,255,255,0.15)",padding:"clamp(1.5rem,2.5vw,2.25rem)",background:"rgba(255,255,255,0.05)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.5s"}}>
          <div style={{display:"flex",gap:"clamp(1.5rem,3vw,3rem)",alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:260}}>
              <p style={{fontSize:"clamp(0.58rem,0.8vw,0.62rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"0.75rem"}}>Why Pearson Edexcel?</p>
              <p style={{color:"rgba(255,255,255,0.85)",fontSize:"clamp(0.78rem,0.95vw,0.88rem)",lineHeight:1.8}}>
                Pearson Edexcel is one of the world's leading awarding bodies, trusted by schools in over 80 countries. Edexcel qualifications are accepted by universities globally — including those in the UK, USA, Canada, Australia, and beyond. At Granada International, we deliver this curriculum with excellence, preparing learners to compete and succeed on the world stage.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.75rem",minWidth:200}}>
              {[{label:"80+ Countries",desc:"Edexcel is recognised worldwide"},{label:"IGCSE & A-Level",desc:"Rigorous global qualifications"},{label:"University Gateway",desc:"Access to top institutions globally"}].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:"0.85rem"}}>
                  <div style={{width:6,height:6,background:"var(--secondary)",flexShrink:0}}/>
                  <div>
                    <div style={{fontSize:"clamp(0.65rem,0.8vw,0.72rem)",fontWeight:700,color:"#fff",textTransform:"uppercase",letterSpacing:"0.1em"}}>{item.label}</div>
                    <div style={{fontSize:"clamp(0.6rem,0.75vw,0.68rem)",color:"rgba(255,255,255,0.65)"}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.edexcel-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){.edexcel-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── SCHOOL SECTIONS ────────────────────────────────────────────────────────── */
function SchoolSections(){
  const {ref,vis}=useInView(0.06);
  const [active,setActive]=useState(0);
  const sections=[
    {
      id:"pre-primary",
      label:"Early Years",
      range:"Nursery – KG 2",
      age:"Ages 3–6",
      color:"#ebae1b",
      img:"/building.jpeg",
      curriculum:"CBC & Introduction to British Early Years Principles",
      tagline:"Nurturing Curious Minds",
      intro:"Our Early Years Foundation Stage inspired programme provides a warm, stimulating environment where young learners develop early literacy, numeracy, creativity, and social skills through structured and play-based learning.",
      highlights:[
        "Play-based, child-centred learning approach",
        "Early literacy and phonics development",
        "Numeracy through exploration and discovery",
        "Creative arts, music, and physical development",
        "Social-emotional learning and self-expression",
      ],
      quote:"Wonder is the beginning of wisdom — and in Early Years, every day is full of wonder.",
    },
    {
      id:"primary",
      label:"Primary School",
      range:"Year 1–6",
      age:"Ages 6–13",
      color:"var(--primary)",
      img:"/class.jpeg",
      curriculum:"British Edexcel Primary (Years 1–6)",
      tagline:"Structured International Learning",
      intro:"Primary School follows the structured Edexcel Primary framework — building strong academic foundations in English, Mathematics, Sciences, and Humanities through internationally benchmarked standards.",
      highlights:[
        "English Language and Literature",
        "Mathematics with international benchmarking",
        "Science — investigative and observational",
        "Humanities, ICT and Creative Arts",
        "Structured progression toward secondary education",
      ],
      quote:"A strong foundation in Primary School is the bedrock of every great academic journey.",
    },
    {
      id:"junior",
      label:"Key Stage 3",
      range:"Year 7–9",
      age:"Ages 13–16",
      color:"var(--accent-green)",
      img:"/dorm.jpeg",
      curriculum:"Edexcel Lower Secondary (Years 7–9)",
      tagline:"Building Independent Thinkers",
      intro:"Key Stage 3 at Granada International deepens academic understanding and builds the independence, critical thinking, and research skills essential for IGCSE success. Learners follow internationally benchmarked syllabi across core and elective subjects.",
      highlights:[
        "English Language & Literature",
        "Mathematics (Edexcel Lower Secondary)",
        "Biology, Chemistry, and Physics",
        "History, Geography, and Global Perspectives",
        "ICT, Digital Media, and Languages",
      ],
      quote:"Every great thinker begins with the courage to ask questions and the discipline to find answers.",
    },
    {
      id:"igcse",
      label:"IGCSE",
      range:"Year 10–11",
      age:"Ages 16–17",
      color:"var(--accent-warm)",
      img:"/staffroom.jpeg",
      curriculum:"Pearson Edexcel IGCSE",
      tagline:"Internationally Recognised Qualifications",
      intro:"The International GCSE (IGCSE) is one of the most widely accepted secondary qualifications in the world. Learners at Granada International sit Edexcel IGCSE examinations in a range of core and elective subjects, producing results recognised by universities worldwide.",
      highlights:[
        "Core subjects: English, Mathematics, Sciences",
        "Electives: Humanities, Languages, Business, Arts",
        "Final examinations set and marked by Pearson",
        "Internationally recognised by all major universities",
        "Strong preparation for A-Level study",
      ],
      quote:"IGCSE is not just a qualification — it is the proof of your readiness for the world.",
    },
    {
      id:"alevel",
      label:"A-Levels",
      range:"Year 12–13",
      age:"Ages 17–19",
      color:"var(--accent-blue)",
      img:"/sports2.jpeg",
      curriculum:"Pearson Edexcel A-Level Programme",
      tagline:"The Gateway to the World's Best Universities",
      intro:"A-Levels at Granada International represent the pinnacle of secondary education — preparing learners for admission to universities in the UK, USA, Canada, Australia, Kenya, and beyond. Students specialise in three to four subjects, developing expert-level knowledge and academic confidence.",
      highlights:[
        "Subject specialisation across 3–4 A-Level choices",
        "Sciences: Biology, Chemistry, Physics, Mathematics",
        "Humanities: History, Economics, Business, Psychology",
        "Languages, Literature, and Fine Arts",
        "UCAS, Common App and global university applications support",
      ],
      quote:"A-Level is where potential becomes purpose — and dreams become destinations.",
    },
  ];
  const cur=sections[active];
  return(
    <section className="section-cream" id="sections" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{marginBottom:"clamp(1.5rem,2.5vw,2.75rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Edexcel Pathways</p>
          <h2 className="section-heading">A Continuous International <em>Journey</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:600}}>From Early Years through to A-Level, Granada International provides a seamless, internationally structured learning journey — every stage purposefully building toward university readiness.</p>
        </div>
        {/* Stage tabs */}
        <div style={{display:"flex",gap:1,background:"#dddbd8",marginBottom:"clamp(1.5rem,2vw,2rem)",overflowX:"auto"}} className="section-tabs">
          {sections.map((s,i)=>(
            <button key={i} onClick={()=>setActive(i)}
              style={{flex:1,minWidth:100,padding:"clamp(0.75rem,1.2vw,1rem) clamp(0.7rem,1.1vw,1rem)",background:active===i?"var(--primary)":"#fff",border:"none",borderBottom:active===i?`3px solid ${s.color}`:"3px solid transparent",cursor:"pointer",textAlign:"center",transition:"all 0.25s",fontFamily:"inherit"}}>
              <div style={{fontSize:"clamp(0.6rem,0.8vw,0.72rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:active===i?"#fff":"var(--muted)",marginBottom:"0.25rem",transition:"color 0.25s"}}>{s.label}</div>
              <div style={{fontSize:"clamp(0.55rem,0.7vw,0.6rem)",color:active===i?"rgba(255,255,255,0.75)":"var(--muted)",letterSpacing:"0.06em",transition:"color 0.25s"}}>{s.range}</div>
            </button>
          ))}
        </div>
        {/* Section detail */}
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.5rem,3vw,3rem)",alignItems:"start"}} className="section-detail-grid">
          <div style={{position:"relative",overflow:"hidden",minHeight:"clamp(280px,35vw,420px)",height:"100%"}} className="img-hover">
            {sections.map((s,i)=>(
              <img key={i} src={s.img} alt={s.label} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:active===i?1:0,transition:"opacity 0.7s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.75) 0%,transparent 60%)"}}/>
            <div style={{position:"absolute",top:"clamp(0.8rem,1.5vw,1.2rem)",left:"clamp(0.8rem,1.5vw,1.2rem)"}}>
              <span style={{display:"inline-block",padding:"0.3rem 0.9rem",background:cur.color,color:"#fff",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:700}}>{cur.age}</span>
            </div>
            <div style={{position:"absolute",bottom:"clamp(1rem,1.5vw,1.5rem)",left:"clamp(1rem,1.5vw,1.5rem)",right:"clamp(1rem,1.5vw,1.5rem)"}}>
              <p style={{fontFamily:"'Euclid Circular A',sans-serif",color:"rgba(255,255,255,0.88)",fontSize:"clamp(0.9rem,1.3vw,1.1rem)",lineHeight:1.5}}>"{cur.quote}"</p>
            </div>
          </div>
          <div>
            <span style={{display:"inline-block",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"#fff",background:"var(--primary)",padding:"0.3rem 0.9rem",fontWeight:700,marginBottom:"clamp(0.8rem,1.2vw,1.2rem)"}}>{cur.curriculum}</span>
            <h3 className="font-display" style={{fontSize:"clamp(1.5rem,2.5vw,2.2rem)",fontWeight:600,color:"var(--primary)",lineHeight:1.15,marginBottom:"0.5rem"}}>{cur.label}</h3>
            <p style={{fontSize:"clamp(0.62rem,0.85vw,0.72rem)",textTransform:"uppercase",letterSpacing:"0.18em",color:cur.color,fontWeight:700,marginBottom:"clamp(0.8rem,1.2vw,1.2rem)"}}>{cur.tagline}</p>
            <p className="body-text" style={{marginBottom:"clamp(1.2rem,1.75vw,1.75rem)"}}>{cur.intro}</p>
            <p style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--muted)",fontWeight:700,marginBottom:"0.75rem"}}>What's Covered</p>
            <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:"0.4rem",marginBottom:"clamp(1.5rem,2vw,2rem)"}}>
              {cur.highlights.map((h,i)=>(
                <li key={i} style={{display:"flex",alignItems:"flex-start",gap:"0.7rem",color:"var(--body-text)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)",lineHeight:1.6}}>
                  <span style={{width:6,height:6,background:cur.color,flexShrink:0,marginTop:6}}/>
                  {h}
                </li>
              ))}
            </ul>
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
              <a href="/granada-international#admissions" className="btn-solid">Apply for {cur.label}</a>
              <a href="/granada-international/contact" className="btn-outline">Make an Enquiry</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.section-detail-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── QUOTE BANNER ───────────────────────────────────────────────────────────── */
function QuoteBanner(){
  return(
    <section style={{position:"relative",overflow:"hidden",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/class.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.86)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",fontWeight:700,marginBottom:"1.75rem"}}>Granada International</p>
        <blockquote className="font-display" style={{fontSize:"clamp(1.2rem,3.5vw,2.4rem)",fontWeight:400,color:"#fff",lineHeight:1.5,marginBottom:"2rem"}}>
          "This pathway develops analytical thinking, academic depth, and global awareness — preparing learners for higher education opportunities around the world."
        </blockquote>
        <div style={{width:"clamp(32px,4vw,44px)",height:2,background:"var(--secondary)",margin:"0 auto 1.75rem"}}/>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:500}}>
          Granada International — Pearson Edexcel — Vipingo, Kenya
        </p>
      </div>
    </section>
  );
}

/* ── UNIVERSITY PATHWAYS ────────────────────────────────────────────────────── */
function UniversityPathways(){
  const {ref,vis}=useInView(0.08);
  const destinations=[
    {region:"United Kingdom",unis:["University of Oxford","University of Cambridge","Imperial College London","University of Edinburgh","King's College London"],flag:"🇬🇧",color:"var(--primary)"},
    {region:"United States",unis:["Harvard University","MIT","Yale University","Stanford University","Johns Hopkins University"],flag:"🇺🇸",color:"var(--accent-warm)"},
    {region:"Australia & Canada",unis:["University of Melbourne","University of Sydney","University of Toronto","McGill University","University of British Columbia"],flag:"🌏",color:"var(--accent-green)"},
    {region:"Africa & Kenya",unis:["University of Nairobi","Strathmore University","USIU-Africa","Aga Khan University","African Leadership University"],flag:"🌍",color:"var(--secondary)"},
  ];
  const support=[
    {icon:"📋",title:"University Counselling",desc:"Dedicated academic counsellors guide Senior School students through the university application process from Year 11 onwards."},
    {icon:"📝",title:"Personal Statement Support",desc:"Tailored support for UCAS personal statements, Common App essays, and other application requirements for global universities."},
    {icon:"🎓",title:"Subject Guidance",desc:"Expert advice on A-Level subject combinations aligned to specific university degree requirements and career pathways."},
    {icon:"🌐",title:"Global Applications",desc:"Support for applications to institutions in the UK, USA, Canada, Australia, Kenya, and other destinations worldwide."},
    {icon:"💡",title:"Scholarship Research",desc:"Assistance identifying scholarship and financial aid opportunities at universities around the world."},
    {icon:"📊",title:"Results & Destinations",desc:"Our strong Edexcel results open doors — students from Granada International go on to study at universities across four continents."},
  ];
  return(
    <section className="section-cream" id="university" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">After Granada International</p>
          <h2 className="section-heading">University <em>Pathways</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:600}}>A Granada International A-Level qualification opens doors to top universities on every continent. Our learners go on to study at some of the world's most prestigious institutions.</p>
        </div>
        {/* Destinations */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"#dddbd8",marginBottom:"clamp(2.5rem,4vw,4rem)"}} className="destinations-grid">
          {destinations.map((d,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.5rem,2vw,2rem) clamp(1.2rem,1.6vw,1.6rem)",borderTop:`3px solid ${d.color}`,opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:`all 0.9s ease ${i*0.1}s`,cursor:"default"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background="var(--body-bg)";(e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)";}} onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="#fff";(e.currentTarget as HTMLDivElement).style.transform="none";}}>
              <div style={{fontSize:"clamp(1.6rem,2.5vw,2rem)",marginBottom:"0.6rem"}}>{d.flag}</div>
              <h3 style={{fontSize:"clamp(0.65rem,0.85vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:d.color,marginBottom:"0.9rem"}}>{d.region}</h3>
              <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:"0.35rem"}}>
                {d.unis.map((u,j)=>(
                  <li key={j} style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",color:"var(--muted)",fontSize:"clamp(0.68rem,0.8vw,0.75rem)",lineHeight:1.5}}>
                    <span style={{color:d.color,flexShrink:0,fontWeight:700}}>—</span>{u}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Support grid */}
        <div style={{marginBottom:"clamp(2rem,3vw,3rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease 0.2s"}}>
          <p className="label-tag">How We Support You</p>
          <h3 className="section-heading" style={{fontSize:"clamp(1.5rem,2.5vw,2.2rem)"}}>University <em>Application Support</em></h3>
          <div className="divider"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"#dddbd8"}} className="support-grid">
          {support.map((s,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.4rem,2vw,1.85rem) clamp(1.2rem,1.8vw,1.6rem)",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${0.3+i*0.07}s`,cursor:"default"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background="var(--body-bg)";(e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)";}} onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="#fff";(e.currentTarget as HTMLDivElement).style.transform="none";}}>
              <span style={{fontSize:"clamp(1.4rem,2vw,1.6rem)",display:"block",marginBottom:"0.85rem"}}>{s.icon}</span>
              <h3 style={{fontSize:"clamp(0.68rem,0.85vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--primary)",marginBottom:"0.5rem"}}>{s.title}</h3>
              <p style={{color:"var(--muted)",fontSize:"clamp(0.72rem,0.85vw,0.8rem)",lineHeight:1.7}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.destinations-grid{grid-template-columns:1fr 1fr!important}.support-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:500px){.destinations-grid{grid-template-columns:1fr!important}.support-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── ADMISSIONS CTA ─────────────────────────────────────────────────────────── */
function AdmissionsCTA(){
  const {ref,vis}=useInView(0.2);
  return(
    <section style={{position:"relative",overflow:"hidden",padding:"clamp(3.5rem,6vw,6rem) clamp(1rem,2vw,2rem)"}} id="apply" ref={ref}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.92)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">Begin Your Journey</p>
          <h2 className="section-heading" style={{fontSize:"clamp(2rem,4vw,3.2rem)"}}>Ready for a <em>Global Education?</em></h2>
          <div className="divider" style={{margin:"1.5rem auto"}}/>
          <p className="body-text" style={{maxWidth:560,margin:"0 auto clamp(2rem,3vw,2.75rem)",fontSize:"clamp(0.85rem,1.1vw,0.95rem)"}}>
            Join Granada International and embark on a British Edexcel education that will open doors to universities and opportunities across the world. Our admissions team is ready to guide you.
          </p>
          <div style={{display:"flex",gap:"clamp(0.6rem,1.2vw,1rem)",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/granada-international#admissions" className="btn-green" style={{fontSize:"clamp(0.65rem,1vw,0.72rem)",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.5rem,2.5vw,2.5rem)"}}>Apply Now</a>
            <a href="/granada-international/contact?type=visit" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.5rem,2.5vw,2.5rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textDecoration:"none",fontSize:"clamp(0.65rem,1vw,0.72rem)",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.12)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Book a Visit</a>
            <a href="/granada-international#admissions" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.5rem,2.5vw,2.5rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.35)",color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:"clamp(0.65rem,1vw,0.72rem)",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.6)")} onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.35)")}>Download Prospectus</a>
          </div>
          {/* Comparison note */}
          <p style={{color:"rgba(255,255,255,0.55)",fontSize:"clamp(0.62rem,0.78vw,0.7rem)",marginTop:"clamp(1.5rem,2vw,2rem)",letterSpacing:"0.06em"}}>
            Also offering CBC curriculum? Visit <a href="/granada-school/academics" style={{color:"var(--secondary)",textDecoration:"none"}} onMouseEnter={e=>(e.currentTarget.style.textDecoration="underline")} onMouseLeave={e=>(e.currentTarget.style.textDecoration="none")}>Granada School Academics</a> to learn more about our Competency Based Curriculum pathway.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  "overview": () => <Overview/>,
  "edexcel": () => <EdexcelCurriculum/>,
  "sections": () => <SchoolSections/>,
  "university": () => <><QuoteBanner/><UniversityPathways/></>,
  "apply": () => <AdmissionsCTA/>,
};

export default function GranadaInternationalAcademics(){
  const params = useParams();
  const section = (params.section as string) || "overview";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["overview"];
  return(
    <>
      <SchoolNavbar scrolledLogo="/g-international.svg" clearLogo="/g-international-dark.svg" logoAlt="Granada International" logoHref="/granada-international" navItems={NAV_ITEMS} quickLinks={[{label:"Parents",href:"/granada-international#contact"},{label:"Enquire",href:"/granada-international/contact"},{label:"Contact us",href:"/granada-international/contact"}]} enquireHref="/granada-international/contact" applyHref="/granada-international/contact" headerApplyHref="/granada-international#admissions" sideImage="/building.jpeg" sideImageAlt="Granada International"/>
      <main style={{background:"var(--body-bg)"}}>
        <PageHero/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",gap:"clamp(2rem,3vw,3.5rem)",alignItems:"flex-start"}} className="section-layout">
          <SectionNav/>
          <div style={{flex:1,minWidth:0}}>
            <div key={section} style={{animation:"sectionFadeIn 0.45s ease"}}>
              {renderSection()}
            </div>
          </div>
        </div>
      </main>
      <SchoolFooter logoSrc="/g-international-dark.svg" logoAlt="Granada International" logoHref="/granada-international" tagline="Forward Thinking. Inspiring Excellence. Shaping the Future." schoolName="Granada International" curriculumLinks={["Pearson Edexcel","Key Stages 1\u20135","IGCSE","A-Levels","Results","University Pathways"]} footerColsClass="int-footer-cols"/>
      <style>{`
        .font-display{font-family:'Euclid Circular A',sans-serif;}
        .section-heading{font-family:'Euclid Circular A',sans-serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:600;line-height:1.1;color:#fff;margin-bottom:0;margin-top:0;}
        .section-heading em{color:var(--accent-light);}
        .section-light .section-heading,.section-cream .section-heading{color:var(--body-text)!important;}
        .section-light .section-heading em,.section-cream .section-heading em{color:var(--primary)!important;}
        .label-tag{font-size:clamp(0.55rem,0.8vw,0.62rem);letter-spacing:0.28em;text-transform:uppercase;color:var(--secondary);font-weight:700;margin-bottom:0.6rem;}
        .divider{width:clamp(32px,4vw,44px);height:2px;background:var(--secondary);margin:clamp(0.75rem,1vw,1rem) 0 clamp(0.75rem,1.5vw,1.4rem);}
        .body-text{color:rgba(255,255,255,0.78);font-size:clamp(0.82rem,1.05vw,0.92rem);line-height:1.85;font-weight:350;}
        .section-light .body-text,.section-cream .body-text{color:var(--body-text)!important;font-weight:350!important;}
        .section-light{background:#fff;}
        .section-blue{background:var(--primary);color:#fff;}
        .section-cream{background:var(--body-bg);}
        .btn-solid{display:inline-block;padding:clamp(0.5rem,0.8vw,0.65rem) clamp(1.2rem,2vw,1.75rem);background:var(--primary);color:#fff;text-decoration:none;font-size:clamp(0.6rem,0.9vw,0.72rem);font-weight:600;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s;border:1px solid var(--primary);cursor:pointer;font-family:inherit;}
        .btn-solid:hover{background:var(--primary-dark);border-color:var(--primary-dark);color:#fff;}
        .section-blue .btn-solid{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.4);}
        .section-blue .btn-solid:hover{background:rgba(255,255,255,0.25);}
        .btn-outline{display:inline-block;padding:clamp(0.5rem,0.8vw,0.65rem) clamp(1.2rem,2vw,1.75rem);background:transparent;color:var(--primary);text-decoration:none;font-size:clamp(0.6rem,0.9vw,0.72rem);font-weight:600;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s;border:1px solid var(--primary);cursor:pointer;font-family:inherit;}
        .btn-outline:hover{background:var(--primary);color:#fff;}
        .section-blue .btn-outline{color:#fff;border-color:rgba(255,255,255,0.5);}
        .section-blue .btn-outline:hover{background:rgba(255,255,255,0.15);color:#fff;}
        .btn-green{display:inline-block;padding:clamp(0.5rem,0.8vw,0.65rem) clamp(1.2rem,2vw,1.75rem);background:var(--secondary);color:var(--primary);text-decoration:none;font-size:clamp(0.6rem,0.9vw,0.72rem);font-weight:700;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s;border:1px solid var(--secondary);}
        .btn-green:hover{background:var(--primary);border-color:var(--primary);color:#fff;}
        .img-hover img{transition:transform 0.6s ease;}
        .img-hover:hover img{transform:scale(1.06);}
        @keyframes kenBurns{from{transform:scale(1) translateX(0);}to{transform:scale(1.07) translateX(-1%);}}
        @keyframes sectionFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:640px){.section-tabs button{min-width:90px!important;}}
      `}</style>
    </>
  );
}
