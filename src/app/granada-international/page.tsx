"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";





/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
import SchoolNavbar from '@/components/SchoolNavbar';
import SchoolFooter from '@/components/SchoolFooter';

const NAV_ITEMS = [
  {
    label:"About Us", href:"/granada-international/about",
    image:"/building.jpeg",
    imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[
      {label:"Principal's Welcome", href:"/granada-international/about/welcome"},
      {label:"Vision & Mission",    href:"/granada-international/about/vision"},
      {label:"Core Values",         href:"/granada-international/about/values"},
      {label:"Our Story",           href:"/granada-international/about/history"},
      {label:"Boarding",            href:"/granada-international/about/boarding"},
      {label:"Staff & Leadership",  href:"/granada-international/about/staff"},
    ],
  },
  {
    label:"Admissions", href:"/granada-international/admissions",
    image:"/dorm.jpeg",
    imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[
      {label:"About Admissions",    href:"/granada-international/admissions/intro"},
      {label:"Admissions Team",     href:"/granada-international/admissions/team"},
      {label:"KG–Year 9 Process",   href:"/granada-international/admissions/process"},
      {label:"Senior School",       href:"/granada-international/admissions/senior-process"},
      {label:"Apply",               href:"/granada-international/admissions/apply"},
    ],
  },
  {
    label:"Academic", href:"/granada-international/academics",
    image:"/class.jpeg",
    imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[
      {label:"Overview",            href:"/granada-international/academics/overview"},
      {label:"Edexcel Curriculum",  href:"/granada-international/academics/edexcel"},
      {label:"School Sections",     href:"/granada-international/academics/sections"},
      {label:"University Pathways", href:"/granada-international/academics/university"},
      {label:"Apply",               href:"/granada-international/academics/apply"},
    ],
  },
  {
    label:"Campus Life", href:"/granada-international/campus-life",
    image:"/sports.jpeg",
    imageCaption:"A Unique Blend of Growth + Community",
    children:[
      {label:"Activities & Overview",href:"/granada-international/campus-life/activities"},
      {label:"Facilities",           href:"/granada-international/campus-life/facilities"},
      {label:"Sports & Athletics",   href:"/granada-international/campus-life/sports"},
      {label:"Arts & Drama",         href:"/granada-international/campus-life/arts"},
      {label:"Music",                href:"/granada-international/campus-life/music"},
      {label:"Co-Curricular",        href:"/granada-international/campus-life/cocurricular"},
      {label:"Leadership",           href:"/granada-international/campus-life/leadership"},
      {label:"Boarding Life",        href:"/granada-international/campus-life/boarding"},
    ],
  },
  {
    label:"Pastoral & Wellbeing", href:"/granada-international/wellbeing",
    image:"/sports2.jpeg",
    imageCaption:"A Unique Blend of Care + Belonging",
    children:[
      {label:"Wellbeing Approach",     href:"/granada-international/wellbeing/approach"},
      {label:"Counselling Support",    href:"/granada-international/wellbeing/counselling"},
      {label:"Core Values",            href:"/granada-international/wellbeing/values"},
      {label:"Character Education",    href:"/granada-international/wellbeing/character"},
      {label:"Global Citizenship",     href:"/granada-international/wellbeing/global"},
      {label:"Boarding Pastoral Care", href:"/granada-international/wellbeing/boarding-care"},
    ],
  },
  {
    label:"Latest News", href:"/granada-international/news",
    image:"/building2.jpeg",
    imageCaption:"A Unique Blend of Stories + Achievements",
    children:[
      {label:"Latest News",  href:"/granada-international/news/latest-news"},
      {label:"Events",       href:"/granada-international/news/events"},
      {label:"Newsletters",  href:"/granada-international/news/newsletters"},
      {label:"Social Media", href:"/granada-international/news/social"},
    ],
  },
  {
    label:"Parents", href:"/granada-international#contact",
    image:"/staffroom.jpeg",
    imageCaption:"A Unique Blend of Partnership + Trust",
    children:[
      {label:"Parent Portal",      href:"/granada-international#contact"},
      {label:"School Calendar",    href:"/granada-international#contact"},
      {label:"Term Dates",         href:"/granada-international#contact"},
      {label:"Reports & Policies", href:"/granada-international#contact"},
    ],
  },
  {
    label:"Support Us", href:"/granada-international#contact",
    image:"/art-room.jpeg",
    imageCaption:"A Unique Blend of Giving + Impact",
    children:[
      {label:"Bursaries & Scholarships",href:"/granada-international/admissions"},
      {label:"Donations",               href:"/granada-international#contact"},
      {label:"Community Partnerships",  href:"/granada-international#contact"},
    ],
  },
];

/* ── useInView ─────────────────────────────────────────────────────────────── */
function useInView(threshold=0.15){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── HERO ──────────────────────────────────────────────────────────────────── */
function Hero(){
  const slides=[
    {bg:"/class.jpeg",label:"World-Class Edexcel"},
    {bg:"/staffroom.jpeg",label:"Inspiring Excellence"},
    {bg:"/dorm2.jpeg",label:"Vipingo, Kenya"},
    {bg:"/building.jpeg",label:"Global Pathways"},
  ];
  const [active,setActive]=useState(0);
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{setLoaded(true);const t=setInterval(()=>setActive(a=>(a+1)%slides.length),5500);return()=>clearInterval(t);},[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      {slides.map((s,i)=>(
        <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${s.bg})`,backgroundSize:"cover",backgroundPosition:"center",opacity:i===active?1:0,transition:"opacity 1.2s ease",animation:i===active?"kenBurns 10s ease-in-out infinite alternate":"none"}}/>
      ))}
      {/* Decorative corner accent */}
      <div style={{position:"absolute",top:0,right:0,width:"clamp(200px,30vw,400px)",height:"clamp(200px,30vw,400px)",background:"radial-gradient(circle at top right,rgba(170,194,12,0.15) 0%,transparent 70%)",pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:"clamp(6rem,4vw,8rem)"}}>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <h1 className="font-display" style={{fontSize:"clamp(1.375rem, 1.3rem + 0.375vw, 1.75rem)",fontWeight:600,lineHeight:1.05,color:"#fff",maxWidth:"clamp(260px,45vw,520px)",opacity:loaded?1:0,transition:"opacity 1s ease 0.2s"}}>
            Granada<br/><span style={{color:"var(--secondary)"}}>International</span>
          </h1>
        </div>
      </div>
      <style>{`@media(min-width:1024px){.hero-stats{display:block!important}}@keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.08)}}`}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ─────────────────────────────────────────────────────────── */
function TaglineStrip(){
  return(
    <div className="section-blue" style={{padding:"clamp(0.8rem,1.2vw,1.2rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"center",gap:"clamp(1.5rem,3vw,2.5rem)",flexWrap:"wrap",alignItems:"center"}}>
        {["Forward Thinking","Inspiring Excellence","Shaping the Future"].map((t,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:"clamp(0.6rem,1.2vw,1rem)"}}>
            <span className="font-display" style={{fontSize:"clamp(0.8rem,1.5vw,1rem)",fontWeight:400,color:"#fff",letterSpacing:"0.03em",whiteSpace:"nowrap"}}>{t}</span>
            {i<2&&<span style={{width:4,height:4,borderRadius:"50%",background:"var(--secondary)",flexShrink:0}}/>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── WELCOME ───────────────────────────────────────────────────────────────── */
function Welcome(){
  const {ref,vis}=useInView(0.1);
  return(
    <section className="section-light" id="about" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,6rem)",alignItems:"center"}} className="int-welcome-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">Welcome to Granada International</p>
          <h2 className="section-heading">A World-Class Education <em>on the Coast</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"clamp(0.8rem,1.2vw,1.25rem)"}}>
            Located along Kenya's beautiful coast in Vipingo, Granada International is a vibrant learning community dedicated to nurturing confident, capable, and compassionate learners.
          </p>
          <p className="body-text" style={{marginBottom:"clamp(0.8rem,1.2vw,1.25rem)"}}>
            Through the internationally recognised British Edexcel curriculum, we empower students to discover their potential and grow into responsible global citizens — ready to pursue opportunities at universities worldwide.
          </p>
          <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2rem)"}}>
            With modern learning environments, dedicated educators, and a supportive school community, Granada International is committed to inspiring excellence and preparing learners for a successful future.
          </p>
          <div style={{display:"flex",gap:"clamp(0.5rem,1vw,0.75rem)",flexWrap:"wrap"}}>
            <a href="/granada-international/about" className="btn-solid" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>About Us</a>
            <a href="/granada-international/about#vision" className="btn-outline" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>Our Vision</a>
          </div>
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"all 0.9s ease 0.15s",height:"clamp(350px,52vw,450px)",overflow:"hidden",position:"relative"}}>
          <div className="img-hover" style={{width:"100%",height:"100%",overflow:"hidden"}}>
            <img src="/building.jpeg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.3),transparent 60%)"}}/>
          </div>
          {/* Floating badge */}
          <div style={{position:"absolute",bottom:"-20px",right:"-20px",background:"var(--secondary)",padding:"clamp(0.8rem,1.2vw,1.1rem) clamp(1rem,1.5vw,1.4rem)",textAlign:"center",zIndex:5,display:"none"}} className="int-badge">
            <div className="font-display" style={{fontSize:"clamp(1.4rem,2vw,2rem)",fontWeight:600,color:"var(--primary-dark)",lineHeight:1}}>Edexcel</div>
            <div style={{fontSize:"clamp(0.45rem,0.6vw,0.55rem)",letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--primary-dark)",marginTop:4,fontWeight:700}}>Certified</div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.int-welcome-grid{grid-template-columns:1fr 1fr!important}.int-badge{display:block!important}}`}</style>
    </section>
  );
}

/* ── EDEXCEL HIGHLIGHT ─────────────────────────────────────────────────────── */
function EdexcelHighlight(){
  const {ref,vis}=useInView(0.1);
  const stages=[
    {title:"Early Years",       sub:"Foundation Stage",     desc:"Nurturing curiosity, creativity, and early literacy through a rich learning environment aligned with international standards.",color:"var(--primary)",icon:"🌱"},
    {title:"Primary School",    sub:"Key Stage 1 & 2",      desc:"Building essential skills in English, Mathematics, and Sciences through structured, engaging Edexcel coursework.",color:"var(--accent-warm)",icon:"📖"},
    {title:"Lower Secondary",   sub:"Key Stage 3",          desc:"Deepening knowledge across a broad curriculum, laying the groundwork for IGCSE success with rigorous academic preparation.",color:"var(--accent-green)",icon:"🔬"},
    {title:"IGCSE",             sub:"Key Stage 4",          desc:"Internationally recognised examinations across a wide range of subjects — your gateway to A-Levels and university.",color:"var(--secondary)",icon:"🎓"},
    {title:"A-Levels",          sub:"Key Stage 5",          desc:"Specialised study in your chosen subjects, opening doors to top universities across the UK, USA, and beyond.",color:"var(--accent-blue)",icon:"🌍"},
  ];
  return(
    <section className="section-cream" id="curriculum" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(2rem,3.5vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Academic Pathway</p>
          <h2 className="section-heading">From Foundation<br/><em>to A-Levels</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text" style={{maxWidth:540,margin:"0 auto"}}>A complete British Edexcel journey from Early Years through to A-Levels — preparing learners for the world's best universities.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"1px",background:"#dddbd8"}} className="stages-grid">
          {stages.map((s,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.2rem,1.8vw,2rem) clamp(1rem,1.2vw,1.4rem)",borderTop:`3px solid ${s.color}`,position:"relative",overflow:"hidden",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.1}s`,cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#f0f7fb";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(33,53,88,0.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{position:"absolute",bottom:-20,right:-10,width:60,height:60,borderRadius:"50%",background:s.color,opacity:0.08}}/>
              <span style={{fontSize:"clamp(1.2rem,2vw,1.6rem)",display:"block",marginBottom:"0.75rem"}}>{s.icon}</span>
              <h3 style={{fontSize:"clamp(0.65rem,0.85vw,0.82rem)",textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--body-text)",fontWeight:700,marginBottom:"0.2rem"}}>{s.title}</h3>
              <p style={{fontSize:"clamp(0.55rem,0.72vw,0.62rem)",color:s.color,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700,marginBottom:"0.8rem"}}>{s.sub}</p>
              <p className="body-text" style={{fontSize:"clamp(0.65rem,0.82vw,0.78rem)"}}>{s.desc}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:900px){.stages-grid{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:600px){.stages-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:400px){.stages-grid{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── PILLARS ───────────────────────────────────────────────────────────────── */
function Pillars(){
  const {ref,vis}=useInView(0.1);
  const items=[
    {title:"Modern Learning Environments",desc:"Purpose-built classrooms, science labs, and creative spaces designed to inspire international-standard curiosity and collaboration.",img:"/sports.jpeg",tag:"Facilities"},
    {title:"Dedicated Educators",desc:"Qualified British curriculum specialists committed to every learner's international academic success.",img:"/staffroom.jpeg",tag:"Teaching"},
    {title:"Supportive Community",desc:"A warm, inclusive coastal culture where every student feels valued and empowered to reach their global potential.",img:"/sports2.jpeg",tag:"Wellbeing"},
  ];
  return(
    <section className="section-blue" id="campus" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(2rem,3vw,3rem)",flexWrap:"wrap",gap:"clamp(1rem,1.5vw,2rem)"}}>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.8s ease"}}>
            <p className="label-tag">What Sets Us Apart</p>
            <h2 className="section-heading">Excellence in <em>Every Detail</em></h2>
          </div>
          <a href="/granada-international/about" className="btn-outline" style={{opacity:vis?1:0,transition:"opacity 0.8s ease 0.3s",borderColor:"rgba(255,255,255,0.5)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
            Learn More
          </a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,1.5vw,1.25rem)",minHeight:0}} className="pillars-grid">
          {items.map((item,i)=>(
            <div key={i} className="img-hover" style={{position:"relative",minHeight:"clamp(280px,50vw,460px)",height:"100%",overflow:"hidden",opacity:vis?1:0,transform:vis?"none":"translateY(40px)",transition:`all 0.9s ease ${i*0.12}s`}}>
              <img src={item.img} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.88) 0%,rgba(13,12,13,0.15) 65%,transparent 100%)"}}/>
              <div style={{position:"absolute",top:"clamp(0.8rem,1.5vw,1.1rem)",left:"clamp(0.8rem,1.5vw,1.1rem)"}}>
                <span style={{fontSize:"clamp(0.5rem,0.8vw,0.58rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",background:"rgba(13,12,13,0.65)",padding:"clamp(0.2rem,0.4vw,0.28rem) clamp(0.5rem,1vw,0.7rem)",fontWeight:700}}>{item.tag}</span>
              </div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"clamp(1.2rem,2vw,1.75rem) clamp(1rem,1.5vw,1.5rem)"}}>
                <h3 className="font-display" style={{fontSize:"clamp(1.1rem,1.8vw,1.4rem)",fontWeight:500,color:"#fff",lineHeight:1.2,marginBottom:"clamp(0.4rem,0.8vw,0.65rem)"}}>{item.title}</h3>
                <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.75rem,0.95vw,0.8rem)",lineHeight:1.7}}>{item.desc}</p>
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
function QuoteBanner(){
  return(
    <section style={{position:"relative",overflow:"hidden",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/dorm.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.88)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",fontWeight:700,marginBottom:"clamp(1.2rem,1.75vw,1.75rem)"}}>Our Mission</p>
        <blockquote className="font-display" style={{fontSize:"clamp(1.2rem,3.5vw,2.6rem)",fontWeight:400,color:"#fff",lineHeight:1.45,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
          "We are committed to inspiring excellence and preparing learners for a successful future — today, tomorrow, and beyond."
        </blockquote>
        <div style={{width:"clamp(32px,4vw,44px)",height:2,background:"var(--secondary)",margin:"0 auto clamp(1.2rem,1.75vw,1.75rem)"}}/>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:500}}>
          Granada International — Vipingo, Kenya
        </p>
      </div>
    </section>
  );
}

/* ── VALUES STRIP ──────────────────────────────────────────────────────────── */
function ValuesStrip(){
  const {ref,vis}=useInView(0.1);
  const values=[
    {label:"Resilience",color:"#c0180b"},
    {label:"Curiosity",  color:"#ebae1b"},
    {label:"Kindness",   color:"#4a6428"},
    {label:"Honesty",    color:"#84b7c8"},
    {label:"Respect",    color:"#483454"},
  ];
  return(
    <section className="section-light" id="community" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(2rem,3vw,3rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">What Guides Us</p>
          <h2 className="section-heading">Our <em>Core Values</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text" style={{maxWidth:520,margin:"0 auto"}}>Five values that shape every interaction, every lesson, and every aspiration we hold for our international learners.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"clamp(0.6rem,1vw,0.85rem)"}} className="values-strip">
          {values.map((v,i)=>(
            <div key={i} style={{position:"relative",overflow:"hidden",minHeight:"clamp(180px,28vw,260px)",height:"100%",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.1}s`}}
              onMouseEnter={e=>{const overlay=e.currentTarget.querySelector(".val-overlay") as HTMLElement;if(overlay)overlay.style.opacity="1";}}
              onMouseLeave={e=>{const overlay=e.currentTarget.querySelector(".val-overlay") as HTMLElement;if(overlay)overlay.style.opacity="0";}}>
              <div style={{position:"absolute",inset:0,background:`linear-gradient(160deg,${v.color} 0%,${v.color}cc 100%)`}}/>
              {/* Pattern */}
              <div style={{position:"absolute",inset:0,backgroundImage:`repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 12px)`,pointerEvents:"none"}}/>
              <div className="val-overlay" style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.25)",opacity:0,transition:"opacity 0.35s ease"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"clamp(0.8rem,1.2vw,1.2rem)",zIndex:2}}>
                <p style={{color:"#fff",fontSize:"clamp(0.65rem,0.9vw,0.8rem)",textTransform:"uppercase",letterSpacing:"0.14em",fontWeight:700}}>{v.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transition:"opacity 0.9s ease 0.5s"}}>
          <a href="/granada-international/about#values" className="btn-solid">Explore Our Values</a>
        </div>
        <style>{`@media(max-width:640px){.values-strip{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:400px){.values-strip{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </div>
    </section>
  );
}

/* ── ADMISSIONS CTA ────────────────────────────────────────────────────────── */
function AdmissionsCTA(){
  const {ref,vis}=useInView(0.2);
  return(
    <section className="section-blue" id="admissions" ref={ref} style={{padding:"clamp(3.5rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:860,margin:"0 auto",textAlign:"center",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease"}}>
        <p className="label-tag">Are you ready?</p>
        <h2 className="section-heading">Begin Your <em>International Journey</em></h2>
        <p className="body-text" style={{maxWidth:520,margin:"clamp(0.8rem,1.5vw,1.25rem) auto clamp(1.5rem,2.5vw,2.5rem)",fontSize:"clamp(0.9rem,1vw,1.05rem)"}}>Join a community of internationally-minded learners on Kenya's breathtaking Vipingo coast — where British excellence meets African warmth.</p>
        <div style={{display:"flex",justifyContent:"center",gap:"clamp(0.6rem,1.2vw,1rem)",flexWrap:"wrap"}}>
          <a href="/granada-international/contact" className="btn-solid" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>Enquire Now</a>
          <a href="/granada-international/contact?type=visit" className="btn-outline" style={{borderColor:"rgba(255,255,255,0.55)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>Book a Visit</a>

          <a href="/granada-international/contact" className="btn-outline" style={{borderColor:"rgba(255,255,255,0.55)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>Apply</a>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────────────── */
export default function GranadaInternationalHome(){
  return(<>
    <SchoolNavbar scrolledLogo="/g-international.svg" clearLogo="/g-international-dark.svg" logoAlt="Granada International" logoHref="/granada-international" navItems={NAV_ITEMS} quickLinks={[{label:"Parents",href:"/granada-international#contact"},{label:"Enquire",href:"/granada-international/contact"},{label:"Contact us",href:"/granada-international/contact"}]} enquireHref="/granada-international/contact" applyHref="/granada-international/contact" headerApplyHref="/granada-international#admissions" sideImage="/building.jpeg" sideImageAlt="Granada International"/>
    <Hero/>
    <TaglineStrip/>
    <Welcome/>
    <EdexcelHighlight/>
    <Pillars/>
    <QuoteBanner/>
    <ValuesStrip/>
    <AdmissionsCTA/>
    <SchoolFooter logoSrc="/g-international-dark.svg" logoAlt="Granada International" logoHref="/granada-international" tagline="Forward Thinking. Inspiring Excellence. Shaping the Future." schoolName="Granada International" curriculumLinks={["Pearson Edexcel","Key Stages 1\u20135","IGCSE","A-Levels","Results","University Pathways"]} footerColsClass="int-footer-cols"/>
  </>);
}
