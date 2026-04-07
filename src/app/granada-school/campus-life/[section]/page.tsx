"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
        {[{label:"How to Apply",href:"/granada-school/admissions"},{label:"Visit Granada",href:"/granada-school/contact?type=visit"},{label:"Enquire Now",href:"/granada-school/contact"}].map((l,i)=>(
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

function useInView(threshold=0.12){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── SECTION DATA ──────────────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  {label:"Facilities",              id:"facilities"},
  {label:"Co-Curricular Activities", id:"cocurricular"},
];
const BASE_PATH = "/granada-school/campus-life";

function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Facilities";

  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"kbCampus 14s ease-in-out infinite alternate"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        <div style={{display:"flex",justifyContent:"flex-end"}} className="hero-content">
          <div style={{maxWidth:"clamp(260px,45vw,520px)"}}>
            <h1 className="font-display" style={{fontSize:"clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all 0.8s ease 0.4s"}}>
              Where Learning<br/><span style={{color:"var(--accent-light)"}}>Comes Alive</span>
            </h1>
          </div>
        </div>
      </div>

      <style>{`@keyframes kbCampus{0%{transform:scale(1)}100%{transform:scale(1.07)}}`}</style>
    </section>
  );
}

function FacilitiesSection(){
  const {ref,vis}=useInView(0.06);
  const facilities=[
    {title:"Modern Classrooms",desc:"Purpose-built, well-lit learning spaces equipped with modern teaching tools, designed to inspire curiosity and collaborative learning.",img:"/class.jpeg",icon:"🏛️"},
    {title:"Science Laboratories",desc:"Fully equipped science labs enabling hands-on experiments, discovery-based learning, and deep engagement with STEM subjects.",img:"/class.jpeg",icon:"🔬"},
    {title:"Library & Resource Centre",desc:"A rich library stocked with reference books, fiction, digital resources, and quiet study areas to support every learner.",img:"/building2.jpeg",icon:"📚"},
    {title:"Computer Lab",desc:"A fully connected computer lab providing digital literacy, coding, research, and ICT skills for the 21st century.",img:"/building.jpeg",icon:"💻"},
    {title:"Sports Fields & Courts",desc:"Expansive sports facilities including playing fields, courts, and athletic tracks supporting physical wellness and team spirit.",img:"/sports.jpeg",icon:"⚽"},
    {title:"Boarding Dormitories",desc:"Secure, comfortable, and well-maintained dormitories supervised by trained matrons — a true home away from home.",img:"/dorm.jpeg",icon:"🏠"},
  ];
  return(
    <section id="facilities" ref={ref} className="section-cream" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div className="section-header-block" style={{textAlign:"center",marginBottom:"clamp(2rem,4vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Our Campus</p>
          <h2 className="section-heading">Modern <em>Facilities</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text">Purpose-built spaces designed to inspire, challenge, and support every aspect of a student's growth.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,1.8vw,1.5rem)",gridAutoRows:"minmax(clamp(340px,36vw,440px),auto)"}} className="facilities-grid">
          {facilities.map((f,i)=>(
            <div key={i} style={{background:"#fff",border:"1px solid rgba(0,0,0,0.06)",overflow:"hidden",display:"flex",flexDirection:"column",opacity:vis?1:0,transform:vis?"none":`translateY(${24+i*5}px)`,transition:`all 0.8s ease ${i*0.09}s`,cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 50px rgba(33,53,88,0.12)";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
              <div className="img-hover" style={{flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>
                <img src={f.img} alt={f.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.55),transparent 60%)"}}/>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"var(--primary)"}}/>
              </div>
              <div style={{flex:1,padding:"clamp(1rem,1.6vw,1.4rem)",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.5rem"}}>
                  <span style={{fontSize:"clamp(1rem,1.4vw,1.2rem)"}}>{f.icon}</span>
                  <h3 style={{fontSize:"clamp(0.84rem,1.15vw,0.96rem)",fontWeight:700,color:"var(--body-text)"}}>{f.title}</h3>
                </div>
                <p className="body-text" style={{fontSize:"clamp(0.76rem,0.92vw,0.84rem)",marginBottom:0}}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:580px){.facilities-grid{grid-template-columns:1fr 1fr!important}}@media(min-width:1024px){.facilities-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </section>
  );
}

function ActivitiesSection(){
  const {ref,vis}=useInView(0.06);
  const categories=[
    {id:"sports",label:"Sports & Athletics",color:"#c0180b",img:"/sports2.jpeg",desc:"From football to netball, athletics to basketball — our sports programme builds fitness, resilience, teamwork, and a competitive spirit.",activities:["Football","Netball","Basketball","Athletics","Volleyball","Swimming","Cross Country"]},
    {id:"arts",label:"Arts & Drama",color:"#483454",img:"/art-room.jpeg",desc:"Creative expression through drama, visual arts, and performance — building confidence, imagination, and cultural appreciation.",activities:["Drama & Theatre","Visual Arts","Painting & Drawing","Creative Writing","Poetry","Film Studies"]},
    {id:"music",label:"Music Programme",color:"#4a6428",img:"/music.jpeg",desc:"A rich music programme developing talent, discipline, and love of music through individual and ensemble performance.",activities:["Choir & Vocals","Keyboard","Guitar","Percussion","School Band","Music Theory","Competitions"]},
    {id:"leadership",label:"Adventure & Leadership",color:"#ebae1b",img:"/sports.jpeg",desc:"Character-building adventures and structured leadership programmes that develop courageous, responsible, and empathetic young leaders.",activities:["Leadership Camps","Community Service","Outdoor Education","Debate Club","Student Council","Prefect Programme","Mentorship"]},
  ];
  const [active,setActive]=useState(0);
  return(
    <section id="cocurricular" ref={ref} className="section-cream" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div className="section-header-block" style={{textAlign:"center",marginBottom:"clamp(2rem,4vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Beyond the Classroom</p>
          <h2 className="section-heading">Co-Curricular <em>Activities</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text">A rich tapestry of activities that nurture talent, build character, and make every day at Granada extraordinary.</p>
        </div>

        <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",justifyContent:"center",marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transition:"opacity 0.8s ease 0.2s"}}>
          {categories.map((c,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{padding:"0.55rem 1.4rem",background:active===i?c.color:"transparent",color:active===i?"#fff":c.color,border:`1px solid ${c.color}`,cursor:"pointer",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.3s",fontFamily:"inherit"}}>
              {c.label}
            </button>
          ))}
        </div>

        {categories.map((c,i)=>(
          <div key={i} style={{display:active===i?"block":"none",animation:"fadeInActivity 0.5s ease"}}>
            <div className="img-hover section-float-img" style={{float:"left",margin:"0 1.5rem 1.2rem 0",width:"clamp(280px,38vw,420px)",overflow:"hidden",minHeight:"clamp(240px,32vw,400px)",position:"relative"}}>
              <img src={c.img} alt={c.label} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,${c.color}65 0%,transparent 55%)`}}/>
              <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:c.color}}/>
            </div>
            <div>
              <p style={{color:c.color,fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:700,marginBottom:"0.6rem"}}>Activities</p>
              <h3 className="font-display" style={{fontSize:"clamp(1.6rem,2.8vw,2.4rem)",fontWeight:600,color:"var(--primary)",marginBottom:"clamp(0.8rem,1.2vw,1rem)"}}>{c.label}</h3>
              <div style={{width:40,height:2,background:c.color,marginBottom:"clamp(0.9rem,1.4vw,1.25rem)"}}/>
              <p className="body-text" style={{marginBottom:"clamp(1.2rem,2vw,1.75rem)"}}>{c.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",clear:"both"}}>
                {c.activities.map((act,j)=>(
                  <span key={j} style={{padding:"0.3rem 0.9rem",border:`1px solid ${c.color}35`,fontSize:"clamp(0.65rem,0.9vw,0.72rem)",color:"var(--body-text)",transition:"all 0.25s",cursor:"default"}}
                    onMouseEnter={e=>{e.currentTarget.style.background=c.color;e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor=c.color;}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--body-text)";e.currentTarget.style.borderColor=`${c.color}35`;}}>
                    {act}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeInActivity{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      `}</style>
    </section>
  );
}

function PageCTA(){
  return(
    <section style={{position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/sports2.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
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

export default function CampusLifePage(){
  const params = useParams();
  const section = (params.section as string) || "facilities";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["facilities"];
  return(
    <>
      <SchoolNavbar scrolledLogo="/g-school.svg" clearLogo="/g-school-dark.svg" logoAlt="Granada School" logoHref="/granada-school" navItems={NAV_ITEMS} quickLinks={[{label:"Parents",href:"/granada-school#contact"},{label:"Enquire",href:"/granada-school/contact"},{label:"Contact us",href:"/granada-school/contact"}]} enquireHref="/granada-school/contact" applyHref="/granada-school/contact?type=admissions" sideImage="/building.jpeg" sideImageAlt="Granada School"/>
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
      <PageCTA/>
      <SchoolFooter logoSrc="/g-school-dark.svg" logoAlt="Granada School" logoHref="/granada-school" tagline="CBE Junior & Senior Girls' Boarding Secondary School." schoolName="Granada School" curriculumLinks={["CBC Kenya","Early Years","Primary School","Junior School","Senior School"]} footerColsClass="footer-cols"/>
    </>
  );
}
