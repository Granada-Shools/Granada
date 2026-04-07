"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";





/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
import SchoolNavbar from '@/components/SchoolNavbar';
import SchoolFooter from '@/components/SchoolFooter';

const NAV_ITEMS = [
  {label:"About Us",href:"/granada-school/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-school/about/welcome"},{label:"Vision & Mission",href:"/granada-school/about/vision"},{label:"Core Values",href:"/granada-school/about/values"},{label:"Our Story",href:"/granada-school/about/history"},{label:"Boarding",href:"/granada-school/about/boarding"},{label:"Staff & Leadership",href:"/granada-school/about/staff"}]},
  {label:"Admissions",href:"/granada-school/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"Introduction",href:"/granada-school/admissions/intro"},{label:"Why Choose Granada",href:"/granada-school/admissions/why-choose"},{label:"Boarding Life",href:"/granada-school/admissions/boarding"},{label:"Admissions Process",href:"/granada-school/admissions/process"},{label:"Apply",href:"/granada-school/admissions/apply"},{label:"Admissions Team",href:"/granada-school/admissions/team"}]},
  {label:"Academic",href:"/granada-school/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-school/academics/overview"},{label:"CBC Curriculum",href:"/granada-school/academics/cbc"},{label:"School Sections",href:"/granada-school/academics/sections"},{label:"Girls' Boarding",href:"/granada-school/academics/boarding"},{label:"Apply",href:"/granada-school/academics/apply"}]},
  {label:"Campus Life",href:"/granada-school/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Facilities",href:"/granada-school/campus-life/facilities"},{label:"Co-Curricular Activities",href:"/granada-school/campus-life/cocurricular"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-school/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-school/wellbeing/approach"},{label:"Counselling",href:"/granada-school/wellbeing/counselling"},{label:"Character Education",href:"/granada-school/wellbeing/character"},{label:"Global Citizenship",href:"/granada-school/wellbeing/global"}]},
  {label:"Latest News",href:"/granada-school/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"Featured Story",href:"/granada-school/news/featured"},{label:"All News",href:"/granada-school/news/all-news"},{label:"Events",href:"/granada-school/news/events"},{label:"Newsletters",href:"/granada-school/news/newsletters"}]},
  {label:"Parents",href:"/granada-school#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-school#contact"},{label:"School Calendar",href:"/granada-school#contact"},{label:"Term Dates",href:"/granada-school#contact"}]},
  {label:"Support Us",href:"/granada-school#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Bursaries & Scholarships",href:"/granada-school/admissions"},{label:"Donations",href:"/granada-school#contact"},{label:"Community Partnerships",href:"/granada-school#contact"}]},
];

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
        {[{label:"About Granada",href:"/granada-school/about"},{label:"Academics",href:"/granada-school/academics"},{label:"Campus Life",href:"/granada-school/campus-life"}].map((l,i)=>(
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

/* ── useInView ─────────────────────────────────────────────────────────────── */
function useInView(threshold=0.12){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── PAGE HERO ─────────────────────────────────────────────────────────────── */
/* ── SECTION DATA ──────────────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  {label:"Introduction",            id:"intro"},
  {label:"Why Choose Granada",      id:"why-choose"},
  {label:"Boarding Life",           id:"boarding"},
  {label:"Admissions Process",      id:"process"},
  {label:"Apply",                   id:"apply"},
  {label:"Admissions Team",         id:"team"},
];
const BASE_PATH = "/granada-school/admissions";

function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Introduction";

  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"kenBurnsAdm 14s ease-in-out infinite alternate"}}/>
      {/* Animated geometric decoration */}
      <div style={{position:"absolute",top:"18%",right:"6%",width:"clamp(100px,16vw,200px)",height:"clamp(100px,16vw,200px)",border:"1px solid rgba(170,194,12,0.3)",animation:"spinAdm 28s linear infinite",opacity:0.7}}/>
      <div style={{position:"absolute",top:"21%",right:"9%",width:"clamp(60px,10vw,130px)",height:"clamp(60px,10vw,130px)",border:"1px solid rgba(170,194,12,0.18)",animation:"spinAdm 18s linear infinite reverse",opacity:0.5}}/>
      <div style={{position:"absolute",bottom:"15%",left:"4%",width:"clamp(60px,8vw,100px)",height:"clamp(60px,8vw,100px)",border:"1px solid rgba(255,255,255,0.12)",animation:"spinAdm 22s linear infinite",opacity:0.4}}/>

      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>


        <div style={{display:"flex",justifyContent:"flex-end"}} className="hero-content">
          <div style={{maxWidth:"clamp(260px,45vw,520px)"}}>
            <h1 className="font-display" style={{fontSize:"clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
              Where Every<br/><span style={{color:"var(--accent-light)"}}>Learner Thrives</span>
            </h1>

          </div>
        </div>
      </div>



      <style>{`
        @keyframes kenBurnsAdm{0%{transform:scale(1)}100%{transform:scale(1.07)}}
        @keyframes spinAdm{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ─────────────────────────────────────────────────────────── */
function TaglineStrip(){
  const tags=["Academic Excellence · CBE Framework","Safe Boarding Environment","Holistic Character Formation","Every Learner Thrives"];
  return(
    <div style={{background:"var(--primary)",padding:"clamp(0.75rem,1.4vw,1.1rem) clamp(1rem,2vw,2rem)",overflow:"hidden"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"center",gap:"clamp(1.2rem,2.5vw,3rem)",flexWrap:"wrap",alignItems:"center"}}>
        {tags.map((t,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:"clamp(0.5rem,0.9vw,0.9rem)"}}>
            <span className="font-display" style={{fontSize:"clamp(0.78rem,1.3vw,0.95rem)",fontWeight:400,color:"#fff",letterSpacing:"0.02em",whiteSpace:"nowrap"}}>{t}</span>
            {i<tags.length-1&&<span style={{width:4,height:4,borderRadius:"50%",background:"var(--secondary)",flexShrink:0}}/>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── INTRO SECTION ─────────────────────────────────────────────────────────── */
function Intro(){
  const {ref,vis}=useInView(0.08);
  return(
    <section id="intro" className="section-cream" ref={ref} style={{padding:"clamp(2rem,4vw,3.5rem) 0",scrollMarginTop:"100px"}}>
      <div>
        <div className="section-header-block" style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease",marginBottom:"clamp(1.5rem,3vw,2.5rem)"}}>
          <p className="label-tag">About Our Admissions</p>
          <h2 className="section-heading">Nurturing <em>Confident, Disciplined</em><br/>& High-Achieving Learners</h2>
          <div className="divider"/>
        </div>
        <div>
        <div className="section-float-img" style={{float:"right",margin:"0 0 1.2rem 1.5rem",width:"clamp(280px,38vw,420px)",opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all 0.9s ease 0.15s",display:"flex",flexDirection:"column",gap:"clamp(0.8rem,1.5vw,1.2rem)"}}>
          <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(240px,32vw,360px)",height:"100%",position:"relative"}}>
            <img src="/dorm.jpeg" alt="Students at Granada" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.45),transparent 65%)"}}/>
            <div style={{position:"absolute",bottom:"1.2rem",left:"1.4rem",right:"1.4rem",zIndex:2}}>
              <p className="font-display" style={{color:"#fff",fontSize:"clamp(0.95rem,1.6vw,1.25rem)",fontWeight:400,textShadow:"0 1px 4px rgba(0,0,0,0.4)"}}>Every learner deserves a space to shine.</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(0.5rem,1vw,0.8rem)"}}>
            {[
              {num:"CBE",label:"Curriculum Framework",color:"var(--primary)"},
              {num:"100%",label:"Girls' Boarding School",color:"#936c51"},
              {num:"360°",label:"Holistic Development",color:"#4a6428"},
            ].map((s,i)=>(
              <div key={i} style={{border:`1px solid ${s.color}22`,padding:"clamp(0.8rem,1.4vw,1.2rem)",textAlign:"center",transition:"all 0.35s",cursor:"default",background:"#fff"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.background=`${s.color}08`;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 6px 24px ${s.color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${s.color}22`;e.currentTarget.style.background="#fff";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <p className="font-display" style={{fontSize:"clamp(1.3rem,2.2vw,1.85rem)",fontWeight:700,color:s.color,lineHeight:1}}>{s.num}</p>
                <p style={{fontSize:"clamp(0.52rem,0.72vw,0.62rem)",textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--muted)",marginTop:"0.3rem",fontWeight:600}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease"}}>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            At Granada CBE Junior &amp; Senior Girls' Boarding Secondary School, we are dedicated to nurturing confident, disciplined, and high-achieving young women under the Competency-Based Education (CBE) framework.
          </p>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            Our boarding environment provides a safe, structured, and supportive space where learners grow academically, socially, emotionally, and spiritually — a community grounded in sisterhood, shared values, and mutual accountability.
          </p>
          <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2.2rem)"}}>
            We welcome applications from students who are ready to embrace excellence, leadership, and personal growth. Joining Granada means joining a family passionately committed to seeing every learner rise to her highest potential.
          </p>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",clear:"both"}}>
            <a href="#apply" className="btn-solid">How to Apply</a>
            <a href="/granada-school/contact?type=admissions" className="btn-outline">Contact Admissions</a>
          </div>
        </div>
      </div>
      </div>

    </section>
  );
}

/* ── WHY CHOOSE ────────────────────────────────────────────────────────────── */
function WhyChoose(){
  const {ref,vis}=useInView(0.06);
  const reasons=[
    {num:"01",title:"Competency-Based Excellence",body:"We implement the CBE curriculum with a strong focus on mastery of skills, critical thinking, creativity, and real-world application — preparing learners for a dynamic future.",img:"/class.jpeg",color:"#213558"},
    {num:"02",title:"A Safe Girls' Environment",body:"Our school provides a secure and nurturing space where girls can focus, build confidence, and thrive without distractions. Free from the pressures of a mixed environment, every learner is seen, supported, and empowered to shine.",img:"/dorm2.jpeg",color:"#c0180b"},
    {num:"03",title:"Strong Academic Performance",body:"We are committed to high academic standards, personalised attention, and consistent mentorship to help every learner achieve her full potential — no learner is left behind.",img:"/building.jpeg",color:"#ebae1b"},
    {num:"04",title:"Leadership & Character Formation",body:"We intentionally nurture leadership skills, integrity, discipline, and responsibility in every student — forming confident, morally grounded young women who are ready to lead.",img:"/building.jpeg",color:"#4a6428"},
    {num:"05",title:"Modern Facilities & Structured Boarding Life",body:"Our boarding facilities are designed to promote comfort, order, and a strong culture of academic focus. Structured prep sessions, nutritious meals, and trained matrons ensure every learner thrives.",img:"/dorm.jpeg",color:"#84b7c8"},
    {num:"06",title:"Holistic Development",body:"Beyond academics, we offer co-curricular activities, mentorship programs, talent development, counselling services, and life-skills training.",img:"/sports.jpeg",color:"#483454"},
  ];
  return(
    <section className="section-cream" id="why-choose" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div className="section-header-block" style={{textAlign:"center",marginBottom:"clamp(2rem,4vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Why Granada</p>
          <h2 className="section-heading">Six Reasons to <em>Choose Granada</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text">Everything we do is intentionally designed to nurture every learner's full potential — academically, socially, and spiritually.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,1.8vw,1.5rem)"}} className="why-grid">
          {reasons.map((r,i)=>(
            <div key={i} style={{position:"relative",overflow:"hidden",background:"#fff",border:"1px solid rgba(0,0,0,0.06)",opacity:vis?1:0,transform:vis?"none":`translateY(${28+i*6}px)`,transition:`all 0.8s ease ${i*0.1}s`,cursor:"default"}}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.boxShadow=`0 12px 50px ${r.color}20`;el.style.borderColor=`${r.color}40`;el.style.transform="translateY(-5px)";}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.boxShadow="none";el.style.borderColor="rgba(0,0,0,0.06)";el.style.transform="none";}}>
              <div className="img-hover" style={{height:"clamp(150px,18vw,195px)",overflow:"hidden",position:"relative"}}>
                <img src={r.img} alt={r.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,${r.color}78 0%,transparent 55%)`}}/>
              </div>
              <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:r.color}}/>
              <div style={{position:"absolute",top:"clamp(130px,16.2vw,175px)",left:"clamp(1rem,1.8vw,1.4rem)",width:"clamp(30px,3.5vw,38px)",height:"clamp(30px,3.5vw,38px)",background:r.color,display:"flex",alignItems:"center",justifyContent:"center",transform:"translateY(-50%)",boxShadow:`0 3px 12px ${r.color}50`}}>
                <span style={{color:"#fff",fontSize:"clamp(0.52rem,0.75vw,0.62rem)",fontWeight:700,letterSpacing:"0.06em"}}>{r.num}</span>
              </div>
              <div style={{padding:"clamp(1rem,1.8vw,1.6rem)",paddingTop:"clamp(0.6rem,0.9vw,0.75rem)"}}>
                <h3 style={{fontSize:"clamp(0.84rem,1.2vw,0.98rem)",fontWeight:700,color:"var(--body-text)",marginBottom:"0.55rem",marginTop:"clamp(0.7rem,0.9vw,0.9rem)"}}>{r.title}</h3>
                <p className="body-text" style={{fontSize:"clamp(0.76rem,0.95vw,0.84rem)",marginBottom:0}}>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:580px){.why-grid{grid-template-columns:1fr 1fr!important}}@media(min-width:1024px){.why-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </section>
  );
}

/* ── BOARDING LIFE ─────────────────────────────────────────────────────────── */
function BoardingLife(){
  const {ref,vis}=useInView(0.06);
  const features=[
    "Secure and supervised dormitories",
    "Trained boarding matrons and pastoral care support",
    "Structured study time (prep sessions)",
    "Nutritious and balanced meals",
    "Guidance and counselling services",
    "A strong sense of community and belonging",
  ];
  return(
    <section className="section-blue" id="boarding" ref={ref} style={{padding:"clamp(2rem,4vw,3.5rem) 0",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div className="section-header-block" style={{opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Boarding Programme</p>
          <h2 className="section-heading">More Than <em>Accommodation</em> —<br/>A Structured Life</h2>
          <div className="divider"/>
        </div>

        <div style={{opacity:vis?1:0,transition:"all 0.9s ease"}}>
          <div className="section-float-img" style={{float:"right",margin:"0 0 1.2rem 1.5rem",width:"clamp(260px,38vw,420px)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.9s ease 0.2s"}}>
            <div className="img-hover" style={{overflow:"hidden",height:"clamp(260px,34vw,360px)"}}>
              <img src="/dorm.jpeg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.45),transparent 65%)"}}/>
            </div>
          </div>

          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            Boarding at Granada is more than accommodation — it is a structured lifestyle that promotes discipline, independence, and sisterhood. Our programme is designed to give students the support and environment they need to focus, grow, and thrive.
          </p>
          <p className="body-text" style={{marginBottom:"1.5rem"}}>
            We create a home-away-from-home environment where students feel safe, supported, and motivated to excel. Every aspect of boarding life is intentionally structured to reinforce our academic and values mission.
          </p>
          <div style={{marginBottom:"clamp(1.2rem,2vw,1.8rem)"}}>
            {features.map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"0.9rem",padding:"clamp(0.5rem,0.7vw,0.65rem) 0",borderBottom:"1px solid rgba(255,255,255,0.1)",opacity:vis?1:0,transform:vis?"none":"translateX(-18px)",transition:`all 0.7s ease ${0.2+i*0.08}s`}}>
                <div style={{width:"clamp(20px,2.8vw,24px)",height:"clamp(20px,2.8vw,24px)",background:"rgba(170,194,12,0.18)",border:"1px solid var(--secondary)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1px"}}>
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#aac20c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{color:"rgba(255,255,255,0.88)",fontSize:"clamp(0.78rem,1vw,0.88rem)",lineHeight:1.65,fontWeight:300}}>{f}</p>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",clear:"both"}}>
            <a href="/granada-school/contact?type=admissions" className="btn-solid">Apply for Boarding</a>
            <a href="/granada-school/contact?type=admissions" className="btn-outline">Enquire Now</a>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ── ADMISSIONS PROCESS ────────────────────────────────────────────────────── */
function AdmissionsProcess(){
  const {ref,vis}=useInView(0.05);
  const [tab,setTab]=useState<"new"|"transfer">("new");
  const newSteps=[
    {n:"01",title:"Inquiry & Campus Visit",body:"Parents/guardians contact the school for detailed information and may schedule a campus visit to understand our academic and boarding programmes first-hand.",icon:"🏫"},
    {n:"02",title:"Application Submission",body:"Submit the completed admission form with: copy of birth certificate, parent/guardian ID copy, recent passport-size photos, and latest academic reports (Grade 6 or Grade 9 results where applicable).",icon:"📋"},
    {n:"03",title:"Entrance Assessment / Interview",body:"Applicants may sit for an academic assessment or attend an interview to determine placement and subject pathway selection within the CBE framework.",icon:"✏️"},
    {n:"04",title:"Admission Approval",body:"Successful applicants receive an official admission letter, fee structure, and reporting instructions from our admissions office.",icon:"✅"},
    {n:"05",title:"Fee Payment & Enrollment",body:"Admission is confirmed upon payment of the required fees. The student is then issued boarding requirements, reporting details, and uniform guidelines.",icon:"🎒"},
  ];
  const transferSteps=[
    {n:"01",title:"Initial Consultation",body:"Parent/guardian contacts the Admissions Office to confirm availability of space in the desired grade level and discuss the transition process.",icon:"💬"},
    {n:"02",title:"Application & Documents",body:"Submit: completed admission form, birth certificate copy, transfer letter from previous school, latest academic reports, parent/guardian ID, and passport-size photos.",icon:"📋"},
    {n:"03",title:"Academic Review & Assessment",body:"The school reviews academic records and may conduct an assessment to ensure smooth integration into the CBE curriculum framework.",icon:"📊"},
    {n:"04",title:"Admission Decision",body:"If successful, an official admission letter and fee structure are issued to the family within the agreed timeline.",icon:"✅"},
    {n:"05",title:"Fee Payment & Reporting",body:"Upon payment, admission is confirmed and the student receives reporting dates, uniform guidelines, and boarding requirements.",icon:"🎒"},
  ];
  const steps=tab==="new"?newSteps:transferSteps;
  const P="#213558"; const S="#aac20c";
  return(
    <section className="section-cream" id="process" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div className="section-header-block" style={{textAlign:"center",marginBottom:"clamp(2rem,3.5vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Admission Process</p>
          <h2 className="section-heading">Your Journey <em>Starts Here</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text">A clear, straightforward process guiding your learner from first enquiry all the way to their first day at Granada.</p>
          <div style={{display:"inline-flex",border:`1px solid ${P}28`,overflow:"hidden",boxShadow:`0 2px 16px ${P}12`}}>
            {(["new","transfer"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                style={{padding:"clamp(0.55rem,0.9vw,0.7rem) clamp(1.3rem,2.2vw,2.2rem)",background:tab===t?P:"transparent",color:tab===t?"#fff":P,border:"none",cursor:"pointer",fontSize:"clamp(0.6rem,0.88vw,0.7rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.35s",fontFamily:"inherit"}}>
                {t==="new"?"New Students":"Transfer Students"}
              </button>
            ))}
          </div>
        </div>

        <div style={{position:"relative",maxWidth:820,margin:"0 auto"}}>
          <div style={{position:"absolute",left:"clamp(14px,3vw,19px)",top:"clamp(16px,2.5vw,20px)",bottom:"clamp(16px,2.5vw,20px)",width:2,background:`linear-gradient(to bottom,${P},${S},${P})`,opacity:0.2}}/>
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {steps.map((s,i)=>(
              <div key={`${tab}-${i}`} style={{display:"flex",gap:"clamp(1rem,2.5vw,2rem)",alignItems:"flex-start",padding:"clamp(1rem,1.8vw,1.5rem) 0 clamp(1rem,1.8vw,1.5rem) clamp(0.5rem,1vw,0.75rem)",opacity:vis?1:0,transform:vis?"none":"translateX(-26px)",transition:`all 0.8s ease ${i*0.12}s`,borderBottom:i<steps.length-1?"1px solid #f0eee9":"none"}}>
                <div style={{width:"clamp(32px,4.2vw,44px)",height:"clamp(32px,4.2vw,44px)",borderRadius:"50%",background:i%2===0?P:S,color:i%2===0?"#fff":P,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"clamp(0.55rem,0.78vw,0.65rem)",fontWeight:700,letterSpacing:"0.06em",boxShadow:`0 3px 15px ${i%2===0?P:S}42`,zIndex:1,transition:"transform 0.3s"}}
                  onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.12)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
                  {s.n}
                </div>
                <div style={{flex:1,paddingTop:"clamp(0.3rem,0.7vw,0.5rem)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.4rem"}}>
                    <span style={{fontSize:"clamp(0.9rem,1.2vw,1.1rem)"}}>{s.icon}</span>
                    <h3 style={{fontSize:"clamp(0.84rem,1.15vw,0.98rem)",fontWeight:700,color:"var(--body-text)"}}>{s.title}</h3>
                  </div>
                  <p className="body-text" style={{fontSize:"clamp(0.76rem,0.95vw,0.85rem)",marginBottom:0}}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center",marginTop:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transition:"opacity 1s ease 0.9s"}}>
          <a href="#team" className="btn-solid" style={{marginRight:"0.75rem"}}>Talk to Our Team</a>
          <a href="/granada-school" className="btn-outline">School Home</a>
        </div>
      </div>
    </section>
  );
}

/* ── APPLY ─────────────────────────────────────────────────────────────────── */
function Apply(){
  const {ref,vis}=useInView(0.06);
  const [form,setForm]=useState({child:"",dob:"",grade:"",parent:"",email:"",phone:"",current:"",message:""});
  const [submitted,setSubmitted]=useState(false);
  const docs=[
    {icon:"📄",label:"Birth Certificate",desc:"Certified copy of the learner's birth certificate"},
    {icon:"📸",label:"Passport Photographs",desc:"Two recent passport-size photographs of the learner"},
    {icon:"📋",label:"Previous School Reports",desc:"Most recent end-of-term or end-of-year academic reports"},
    {icon:"🆔",label:"Parent / Guardian ID",desc:"Copy of parent or guardian national ID or passport"},
    {icon:"📝",label:"Transfer Letter",desc:"Official transfer or release letter from the previous school"},
    {icon:"💉",label:"Immunisation Records",desc:"Up-to-date immunisation card or certificate"},
  ];
  const steps=[
    {num:"01",title:"Register Interest",desc:"Complete the application form below or contact our Admissions Team to express your interest in joining Granada.",color:"var(--primary)"},
    {num:"02",title:"Submit Documents",desc:"Provide all required supporting documents including academic records, birth certificate, and parent identification.",color:"#936c51"},
    {num:"03",title:"Assessment & Interview",desc:"The learner will be invited for an assessment and a brief interview to understand her strengths, interests, and readiness.",color:"var(--secondary)"},
    {num:"04",title:"Offer & Enrolment",desc:"Successful applicants will receive a formal offer letter. Once accepted, the enrolment process is completed with the Admissions Office.",color:"#4a6428"},
  ];
  return(
    <section id="apply" ref={ref} style={{scrollMarginTop:"100px"}}>
      {/* Intro */}
      <div className="section-cream" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div className="section-header-block" style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease",marginBottom:"clamp(1.2rem,2vw,1.8rem)"}}>
            <p className="label-tag">Apply to Granada</p>
            <h2 className="section-heading">Begin Your <em>Application</em></h2>
            <div className="divider"/>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease 0.1s"}}>
            <p className="body-text" style={{marginBottom:"1.2rem"}}>Applications to Granada CBE Junior &amp; Senior Girls' Boarding Secondary School are welcomed throughout the year, subject to assessment and availability of places.</p>
            <p className="body-text" style={{marginBottom:"1.2rem"}}>Choosing the right school is an important decision, and we strongly encourage families to <a href="/granada-school/admissions/team" style={{color:"var(--primary)",fontWeight:600}}>arrange a visit</a> to experience our campus, meet our community, and understand our CBE approach before applying.</p>
            <p className="body-text">Applications for the current or upcoming academic year may be submitted at any time. Mid-year enrolment may be possible depending on availability.</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="section-blue" style={{padding:"clamp(2.5rem,5vw,4.5rem) clamp(1rem,2vw,2rem)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div className="section-header-block" style={{marginBottom:"clamp(1.5rem,2.5vw,2.5rem)"}}>
            <p style={{color:"var(--secondary)",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:700}}>How It Works</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,2vw,1.5rem)"}} className="apply-steps-grid">
            {steps.map((s,i)=>(
              <div key={i} style={{display:"flex",gap:"clamp(1rem,1.8vw,1.5rem)",alignItems:"flex-start",opacity:vis?1:0,transform:vis?"none":`translateY(${20+i*8}px)`,transition:`all 0.8s ease ${0.1+i*0.12}s`}}>
                <div style={{width:"clamp(38px,5vw,48px)",height:"clamp(38px,5vw,48px)",background:s.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:"#fff",fontSize:"clamp(0.62rem,0.85vw,0.72rem)",fontWeight:700,letterSpacing:"0.06em"}}>{s.num}</span>
                </div>
                <div>
                  <h3 style={{fontSize:"clamp(0.9rem,1.3vw,1.05rem)",fontWeight:700,color:"#fff",marginBottom:"0.35rem"}}>{s.title}</h3>
                  <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.78rem,0.95vw,0.86rem)",lineHeight:1.7}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="section-cream" style={{padding:"clamp(3rem,6vw,5rem) clamp(1rem,2vw,2rem)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{marginBottom:"clamp(1.5rem,3vw,2.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(18px)",transition:"all 0.8s ease 0.1s"}}>
            <p className="label-tag">Required Documents</p>
            <h2 className="section-heading">Supporting <em>Documentation</em></h2>
            <div className="divider"/>
            <p className="body-text">Please ensure all required documents are submitted before an assessment can be arranged. Families applying from overseas may email completed applications and documentation to <a href="mailto:admissions@granadaschools.group" style={{color:"var(--primary)",fontWeight:600}}>admissions@granadaschools.group</a>.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(0.6rem,1vw,0.8rem)"}} className="docs-grid">
            {docs.map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"clamp(0.8rem,1.5vw,1.2rem)",padding:"clamp(0.9rem,1.5vw,1.2rem)",background:"#fff",border:"1px solid rgba(0,0,0,0.06)",opacity:vis?1:0,transform:vis?"none":"translateX(-16px)",transition:`all 0.7s ease ${0.15+i*0.08}s`,cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--primary)";e.currentTarget.style.boxShadow="0 4px 20px rgba(33,53,88,0.08)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,0.06)";e.currentTarget.style.boxShadow="none";}}>
                <span style={{fontSize:"clamp(1.2rem,1.8vw,1.5rem)",flexShrink:0}}>{d.icon}</span>
                <div>
                  <p style={{fontSize:"clamp(0.82rem,1vw,0.9rem)",fontWeight:700,color:"var(--body-text)",marginBottom:"0.15rem"}}>{d.label}</p>
                  <p style={{fontSize:"clamp(0.72rem,0.88vw,0.8rem)",color:"var(--muted)",lineHeight:1.5}}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="section-blue" style={{padding:"clamp(3rem,6vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <div style={{marginBottom:"clamp(1.5rem,3vw,2.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(18px)",transition:"all 0.8s ease"}}>
            <p style={{color:"var(--secondary)",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:700,marginBottom:"clamp(0.5rem,1vw,0.75rem)"}}>Apply Now</p>
            <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:600,color:"#fff",lineHeight:1.15,marginBottom:"clamp(0.5rem,1vw,0.75rem)"}}>Application <em style={{color:"var(--accent-light)"}}>Form</em></h2>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.8rem,1vw,0.88rem)",lineHeight:1.7}}>Please complete the form below. Our Admissions Team will be in touch within 48 hours.</p>
          </div>
          {submitted?(
            <div style={{textAlign:"center",padding:"clamp(2rem,4vw,3.5rem)",background:"rgba(170,194,12,0.12)",border:"1px solid rgba(170,194,12,0.3)"}}>
              <p style={{fontSize:"clamp(1.6rem,2.5vw,2rem)",marginBottom:"0.5rem"}}>✓</p>
              <h3 style={{color:"#fff",fontSize:"clamp(1.1rem,1.6vw,1.3rem)",fontWeight:700,marginBottom:"0.5rem"}}>Application Submitted</h3>
              <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.8rem,1vw,0.88rem)"}}>Thank you! Our Admissions Team will contact you shortly.</p>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:"clamp(0.8rem,1.5vw,1.1rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.9s ease 0.15s"}}>
              {[
                {key:"child",label:"Child's Full Name",type:"text",placeholder:"Enter learner's full name"},
                {key:"dob",label:"Date of Birth",type:"date",placeholder:""},
                {key:"grade",label:"Year / Grade Applying For",type:"text",placeholder:"e.g. Grade 7, Form 1"},
                {key:"parent",label:"Parent / Guardian Name",type:"text",placeholder:"Enter parent or guardian name"},
                {key:"email",label:"Email Address",type:"email",placeholder:"your.email@example.com"},
                {key:"phone",label:"Phone Number",type:"tel",placeholder:"+254 7XX XXX XXX"},
                {key:"current",label:"Current School (if applicable)",type:"text",placeholder:"Name of current school"},
              ].map(f=>(
                <div key={f.key}>
                  <label style={{display:"block",color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.62rem,0.82vw,0.7rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:"0.4rem"}}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    style={{width:"100%",padding:"clamp(0.6rem,1vw,0.8rem) clamp(0.8rem,1.2vw,1rem)",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",fontSize:"clamp(0.8rem,1vw,0.88rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit"}}
                    onFocus={e=>(e.currentTarget.style.borderColor="var(--secondary)")} onBlur={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.2)")}/>
                </div>
              ))}
              <div>
                <label style={{display:"block",color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.62rem,0.82vw,0.7rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:"0.4rem"}}>Additional Message</label>
                <textarea rows={4} placeholder="Any additional information or questions…" value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  style={{width:"100%",padding:"clamp(0.6rem,1vw,0.8rem) clamp(0.8rem,1.2vw,1rem)",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",fontSize:"clamp(0.8rem,1vw,0.88rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit",resize:"vertical"}}
                  onFocus={e=>(e.currentTarget.style.borderColor="var(--secondary)")} onBlur={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.2)")}/>
              </div>
              <button onClick={()=>setSubmitted(true)}
                style={{alignSelf:"flex-start",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.8rem,3vw,2.8rem)",background:"var(--secondary)",color:"var(--dark)",fontSize:"clamp(0.62rem,0.85vw,0.7rem)",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",border:"none",cursor:"pointer",transition:"all 0.3s",fontFamily:"inherit"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#96ac0a";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--secondary)";e.currentTarget.style.transform="none";}}>
                Submit Application
              </button>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.65rem,0.82vw,0.72rem)",lineHeight:1.6}}>For enquiries, contact <a href="mailto:admissions@granadaschools.group" style={{color:"var(--secondary)",textDecoration:"none"}}>admissions@granadaschools.group</a> or call <a href="tel:+254714848289" style={{color:"var(--secondary)",textDecoration:"none"}}>+254 714 848 289</a>.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`@media(min-width:640px){.apply-steps-grid{grid-template-columns:1fr 1fr!important}.docs-grid{grid-template-columns:1fr 1fr!important}}@media(min-width:1024px){.docs-grid{grid-template-columns:1fr 1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── ADMISSIONS TEAM ───────────────────────────────────────────────────────── */
function AdmissionsTeam(){
  const {ref,vis}=useInView(0.06);
  const [hov,setHov]=useState<number|null>(null);
  const team=[
    {name:"Christopher Sabwa",role:"Admissions Officer",tel:"+254 714 848 289",email:"admissions@granadaschools.group",img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80"},
    {name:"Asya Adan",role:"Admissions Officer",tel:"+254 717 682 138",email:"admissions@granadaschools.group",img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80"},
  ];
  return(
    <section className="section-cream" id="team" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div className="section-header-block" style={{textAlign:"center",marginBottom:"clamp(2rem,4vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Meet the Team</p>
          <h2 className="section-heading">Our <em>Admissions Team</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text">Our Admissions Team is available to assist you throughout the entire process — from your very first question to your child's first day.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.5rem,3vw,2.5rem)",maxWidth:760,margin:"0 auto clamp(2rem,3.5vw,3.5rem)"}} className="team-grid">
          {team.map((m,i)=>{const a=hov===i;return(
            <div key={i} style={{position:"relative",overflow:"hidden",height:"clamp(340px,48vw,440px)",cursor:"default",opacity:vis?1:0,transform:vis?"none":`translateY(${30+i*10}px)`,transition:`all 0.9s ease ${i*0.16}s`}}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
              <img src={m.img} alt={m.name} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",transition:"transform 0.7s ease",transform:a?"scale(1.06)":"scale(1)"}}/>
              <div style={{position:"absolute",inset:0,background:a?"linear-gradient(to top,rgba(33,53,88,0.95) 0%,rgba(33,53,88,0.5) 55%,rgba(33,53,88,0.1) 100%)":"linear-gradient(to top,rgba(33,53,88,0.85) 0%,rgba(33,53,88,0.05) 45%)",transition:"background 0.5s ease"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"clamp(1.2rem,2vw,1.75rem)"}}>
                <p style={{fontSize:"clamp(0.52rem,0.78vw,0.6rem)",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",marginBottom:"0.3rem"}}>Admissions</p>
                <h3 className="font-display" style={{fontSize:"clamp(1.1rem,1.8vw,1.4rem)",fontWeight:600,color:"#fff",marginBottom:"0.15rem"}}>{m.name}</h3>
                <p style={{fontSize:"clamp(0.72rem,0.9vw,0.8rem)",color:"rgba(255,255,255,0.75)",marginBottom:a?"clamp(0.8rem,1.4vw,1.2rem)":"0",transition:"margin 0.4s ease"}}>{m.role}</p>
                <div style={{opacity:a?1:0,maxHeight:a?200:0,overflow:"hidden",transition:"opacity 0.4s ease 0.1s,max-height 0.5s ease"}}>
                  <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
                    <a href={`tel:${m.tel.replace(/\s/g,"")}`} style={{display:"flex",alignItems:"center",gap:"0.65rem",color:"#fff",textDecoration:"none",fontSize:"clamp(0.73rem,0.88vw,0.82rem)",transition:"color 0.2s"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--secondary)")} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>
                      <span style={{width:"clamp(24px,2.8vw,28px)",height:"clamp(24px,2.8vw,28px)",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.1z"/></svg>
                      </span>
                      {m.tel}
                    </a>
                    <a href={`mailto:${m.email}`} style={{display:"flex",alignItems:"center",gap:"0.65rem",color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:"clamp(0.7rem,0.82vw,0.8rem)",transition:"color 0.2s",wordBreak:"break-all"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--secondary)")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.8)")}>
                      <span style={{width:"clamp(24px,2.8vw,28px)",height:"clamp(24px,2.8vw,28px)",background:"rgba(170,194,12,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </span>
                      {m.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );})}
        </div>

        <div style={{maxWidth:760,margin:"0 auto",padding:"clamp(1.5rem,2.5vw,2.5rem)",background:"var(--primary)",position:"relative",overflow:"hidden",opacity:vis?1:0,transition:"opacity 1s ease 0.5s"}}>
          <div style={{position:"absolute",top:-50,right:-50,width:200,height:200,borderRadius:"50%",background:"rgba(170,194,12,0.08)"}}/>
          <div style={{position:"absolute",bottom:-30,left:-30,width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"0.75rem"}}>
            <p style={{color:"var(--secondary)",fontSize:"clamp(0.58rem,0.82vw,0.64rem)",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:700}}>Visit Us</p>
            <p className="font-display" style={{color:"#fff",fontSize:"clamp(1.1rem,1.8vw,1.55rem)"}}>We'd love to show you around Granada</p>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)"}}>📍 Vipingo, Kilifi County, Kenya</p>
            <a href="/granada-school/contact?type=visit" style={{marginTop:"0.25rem",display:"inline-block",padding:"clamp(0.55rem,0.9vw,0.7rem) clamp(1.5rem,2.2vw,2.2rem)",background:"var(--secondary)",color:"var(--dark)",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.6rem,0.8vw,0.68rem)",fontWeight:700,textDecoration:"none",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#96ac0a";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--secondary)";e.currentTarget.style.transform="none";}}>
              Book a Visit
            </a>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.team-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/dorm.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.9)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:800,margin:"0 auto",textAlign:"center",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.9rem,1.5vw,1.4rem)"}}>Ready to Begin?</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
          Are you ready to feel the <span style={{color:"var(--accent-light)"}}>difference?</span>
        </h2>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          {[{l:"Enquire",h:"/granada-school/contact"},{l:"Visit Granada",h:"/granada-school/contact?type=visit"},{l:"Apply Now",h:"/granada-school/contact?type=admissions"}].map(({l,h})=>(
            <a key={l} href={h} style={{display:"inline-block",padding:"0.7rem 1.75rem",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s",fontFamily:"inherit"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>{l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PAGE EXPORT ───────────────────────────────────────────────────────────── */
/* ── PAGE ───────────────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  "intro": () => <Intro/>,
  "why-choose": () => <WhyChoose/>,
  "boarding": () => <BoardingLife/>,
  "process": () => <AdmissionsProcess/>,
  "apply": () => <Apply/>,
  "team": () => <AdmissionsTeam/>,
};

export default function AdmissionsPage(){
  const params = useParams();
  const section = (params.section as string) || "intro";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["intro"];
  return(
    <>
      <SchoolNavbar scrolledLogo="/g-school.svg" clearLogo="/g-school-dark.svg" logoAlt="Granada School" logoHref="/granada-school" navItems={NAV_ITEMS} quickLinks={[{label:"Parents",href:"/granada-school#contact"},{label:"Enquire",href:"/granada-school/contact"},{label:"Contact us",href:"/granada-school/contact"}]} enquireHref="/granada-school/contact" applyHref="/granada-school/contact?type=admissions" sideImage="/building.jpeg" sideImageAlt="Granada School"/>
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
      <SchoolFooter logoSrc="/g-school-dark.svg" logoAlt="Granada School" logoHref="/granada-school" tagline="CBE Junior & Senior Girls' Boarding Secondary School." schoolName="Granada School" curriculumLinks={["CBC Kenya","Early Years","Primary School","Junior School","Senior School"]} footerColsClass="footer-cols"/>
    </>
  );
}
