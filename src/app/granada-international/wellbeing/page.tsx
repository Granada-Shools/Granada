"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  {label:"About Us",href:"/granada-international/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-international/about#welcome"},{label:"Vision & Aims",href:"/granada-international/about#vision"},{label:"Our Values",href:"/granada-international/about#values"},{label:"Our Story",href:"/granada-international/about#history"},{label:"Boarding",href:"/granada-international/about#boarding"},{label:"Staff & Leadership",href:"/granada-international/about#staff"}]},
  {label:"Admissions",href:"/granada-international/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"How to Apply",href:"/granada-international/admissions#process"},{label:"KG–Year 9",href:"/granada-international/admissions#process"},{label:"Senior School",href:"/granada-international/admissions#senior-process"},{label:"Admissions Team",href:"/granada-international/admissions#team"}]},
  {label:"Academic",href:"/granada-international/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-international/academics#overview"},{label:"Edexcel Curriculum",href:"/granada-international/academics#edexcel"},{label:"School Sections",href:"/granada-international/academics#sections"},{label:"University Pathways",href:"/granada-international/academics#university"}]},
  {label:"Campus Life",href:"/granada-international/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Modern Facilities",href:"/granada-international/campus-life#facilities"},{label:"Sports & Athletics",href:"/granada-international/campus-life#sports"},{label:"Arts & Drama",href:"/granada-international/campus-life#arts"},{label:"Co-Curricular",href:"/granada-international/campus-life#cocurricular"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-international/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-international/wellbeing#approach"},{label:"Counselling Support",href:"/granada-international/wellbeing#counselling"},{label:"Character Education",href:"/granada-international/wellbeing#character"},{label:"Global Citizenship",href:"/granada-international/wellbeing#global"},{label:"Boarding Pastoral Care",href:"/granada-international/wellbeing#boarding-care"}]},
  {label:"Latest News",href:"/granada-international/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"School News",href:"/granada-international/news"},{label:"Events Calendar",href:"/granada-international/news#events"},{label:"Newsletters",href:"/granada-international/news#newsletters"}]},
  {label:"Parents",href:"/granada-international#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-international#contact"},{label:"Term Dates",href:"/granada-international#contact"},{label:"Reports & Policies",href:"/granada-international#contact"}]},
  {label:"Support Us",href:"/granada-international#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Scholarships",href:"/granada-international/admissions"},{label:"Donations",href:"/granada-international#contact"}]},
];

function SideNav({open,onClose}:{open:boolean;onClose:()=>void}){
  const [active,setActive]=useState(0);
  const [search,setSearch]=useState("");
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow="";};},[open]);
  useEffect(()=>{if(open)setActive(0);},[open]);
  const cur=NAV_ITEMS[active];
  const sr=search.trim()?NAV_ITEMS.flatMap(n=>[{label:n.label,href:n.href},...(n.children||[])].filter(c=>c.label.toLowerCase().includes(search.toLowerCase()))):[];
  const S="#aac20c";
  return(<>
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:199,background:"rgba(52,105,136,0.45)",opacity:open?1:0,pointerEvents:open?"auto":"none",transition:"opacity 0.4s",backdropFilter:open?"blur(3px)":"none"}}/>
    <div style={{position:"fixed",top:0,right:0,bottom:0,zIndex:200,width:"100%",maxWidth:"min(100vw,900px)",display:"flex",flexDirection:"column",background:"#346988",transform:open?"translateX(0)":"translateX(100%)",transition:"transform 0.5s cubic-bezier(0.77,0,0.175,1)",boxShadow:"-8px 0 60px rgba(0,0,0,0.3)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(0.8rem,2vw,1.1rem) clamp(1.5rem,3vw,2.5rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",flexShrink:0,gap:"1rem",background:"rgba(0,0,0,0.2)",flexWrap:"wrap"}}>
        <div style={{flex:1,maxWidth:280,position:"relative"}}>
          <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",padding:"0.45rem 2rem 0.45rem 0.8rem",fontSize:"0.78rem",outline:"none",fontFamily:"inherit"}}/>
          {search.trim()&&sr.length>0&&(
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#fff",zIndex:10,maxHeight:220,overflowY:"auto"}}>
              {sr.map((r,i)=>(
                <a key={i} href={r.href} onClick={()=>{setSearch("");onClose();}} style={{display:"block",padding:"0.6rem 1rem",color:"#1c1b1c",textDecoration:"none",fontSize:"0.8rem",borderBottom:"1px solid #f0eee9"}}>{r.label}</a>
              ))}
            </div>
          )}
        </div>
        <button onClick={onClose} style={{background:"none",border:"1px solid rgba(255,255,255,0.4)",color:"#fff",width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="1" y1="1" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="1" x2="1" y2="12" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        <div style={{width:"clamp(180px,25vw,260px)",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.1)",overflowY:"auto",background:"rgba(0,0,0,0.2)"}}>
          {NAV_ITEMS.map((item,i)=>(
            <button key={item.label} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:active===i?"rgba(255,255,255,0.15)":"transparent",border:"none",borderLeft:active===i?`3px solid ${S}`:"3px solid transparent",padding:"clamp(0.65rem,1.5vw,0.85rem) clamp(1.1rem,2vw,1.5rem)",cursor:"pointer",textAlign:"left",transition:"all 0.2s",gap:"0.5rem"}}>
              <span style={{fontSize:"clamp(0.65rem,1.2vw,0.8rem)",fontWeight:active===i?700:400,letterSpacing:"0.06em",textTransform:"uppercase",color:active===i?S:"#fff",fontFamily:"inherit",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"clamp(0.85rem,1.5vw,1.25rem) clamp(1rem,2vw,1.5rem)"}}>
          <p style={{fontSize:"0.6rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"#fff",fontWeight:700,marginBottom:"1rem"}}>{cur.label}</p>
          {cur.children?.map((child,i)=>(
            <a key={i} href={child.href} onClick={onClose} style={{display:"flex",alignItems:"center",gap:"0.6rem",padding:"0.5rem 0",color:"#fff",textDecoration:"none",fontSize:"clamp(0.7rem,1.2vw,0.8rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",transition:"color 0.2s"}} onMouseEnter={e=>(e.currentTarget.style.color=S)} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>
              <span style={{width:5,height:5,border:`1px solid ${S}`,flexShrink:0}}/>{child.label}
            </a>
          ))}
        </div>
      </div>
      <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",padding:"0.85rem 2.5rem",background:"rgba(0,0,0,0.2)"}}>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.7rem"}}>Vipingo, Kilifi County, Kenya</p>
      </div>
    </div>
  </>);
}

function Navbar(){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return(<>
    <SideNav open={open} onClose={()=>setOpen(false)}/>
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"all 0.4s ease",background:scrolled?"rgba(255,255,255,0.97)":"transparent",backdropFilter:scrolled?"blur(10px)":"none",boxShadow:scrolled?"0 1px 0 #e8e6e3":"none",padding:scrolled?"0.7rem 0":"clamp(0.8rem,2vw,1.2rem) 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem"}}>
        <a href="/granada-international" style={{textDecoration:"none",display:"flex",alignItems:"center"}}>
          <Image src={scrolled ? "/School2.svg" : "/School2-dark.svg"} alt="Granada International" width={190} height={90} style={{height:"auto",width:"clamp(120px,18vw,250px)"}} priority/>
        </a>
        <button onClick={()=>setOpen(true)} aria-label="Open menu" style={{background:"none",border:`1px solid ${scrolled?"rgba(52,105,136,0.35)":"rgba(255,255,255,0.5)"}`,cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:"0.5rem 0.6rem"}}>
          <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block"}}/>
          <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block"}}/>
          <span style={{width:13,height:1.5,background:"var(--secondary)",display:"block"}}/>
        </button>
      </div>
    </header>
  </>);
}

function useInView(threshold=0.12){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── PAGE HERO ──────────────────────────────────────────────────────────────── */
function PageHero(){
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"70vh",minHeight:540,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/sports2.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"wbKenBurns 18s ease-in-out infinite alternate"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(150deg,rgba(74,100,40,0.88) 0%,rgba(52,105,136,0.65) 55%,rgba(13,12,13,0.5) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.6) 0%,transparent 50%)"}}/>
      {/* Floating wellbeing values */}
      <div style={{position:"absolute",top:"20%",right:"5%",zIndex:5,display:"flex",flexDirection:"column",gap:"0.7rem",alignItems:"flex-end"}}>
        {[{c:"#c0180b",l:"Resilience"},{c:"#ebae1b",l:"Curiosity"},{c:"#4a6428",l:"Kindness"},{c:"#84b7c8",l:"Honesty"},{c:"#483454",l:"Respect"}].map((v,i)=>(
          <div key={i} style={{background:`${v.c}22`,border:`1px solid ${v.c}66`,padding:"0.25rem 0.8rem",backdropFilter:"blur(6px)",opacity:loaded?1:0,transform:loaded?"none":"translateX(20px)",transition:`all 0.7s ease ${0.3+i*0.1}s`}}>
            <span style={{color:"#fff",fontSize:"clamp(0.52rem,0.7vw,0.6rem)",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase"}}>{v.l}</span>
          </div>
        ))}
      </div>
      <div style={{position:"absolute",top:"14%",left:"4%",width:"clamp(100px,15vw,180px)",height:"clamp(100px,15vw,180px)",border:"1px solid rgba(170,194,12,0.25)",animation:"wbSpin 32s linear infinite"}}/>
      <div style={{position:"absolute",top:"18%",left:"7%",width:"clamp(55px,8vw,110px)",height:"clamp(55px,8vw,110px)",border:"1px solid rgba(255,255,255,0.12)",animation:"wbSpin 22s linear infinite reverse"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:"clamp(2.5rem,4.5vw,5rem)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)",opacity:loaded?1:0,transition:"all 0.7s ease 0.2s",flexWrap:"wrap"}}>
          {[{label:"Granada",href:"/"},{label:"International",href:"/granada-international"}].map((bc,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
              <a href={bc.href} style={{color:"rgba(255,255,255,0.55)",textDecoration:"none",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase"}}>{bc.label}</a>
              <span style={{color:"var(--secondary)"}}>›</span>
            </span>
          ))}
          <span style={{color:"#fff",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>Pastoral & Wellbeing</span>
        </div>
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"rgba(74,100,40,0.3)",border:"1px solid rgba(170,194,12,0.4)",padding:"0.3rem 0.8rem",marginBottom:"0.75rem",alignSelf:"flex-start",opacity:loaded?1:0,transition:"all 0.6s ease 0.3s"}}>
          <span style={{width:5,height:5,background:"var(--secondary)",borderRadius:"50%"}}/>
          <span style={{color:"var(--secondary)",fontSize:"clamp(0.5rem,0.75vw,0.58rem)",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>Character · Resilience · Global Citizenship</span>
        </div>
        <h1 className="font-display" style={{fontSize:"clamp(2.4rem,6.5vw,5rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
          Nurturing the<br/><span style={{fontStyle:"italic",color:"var(--accent-light)"}}>Whole Child</span>
        </h1>
        <div style={{width:"clamp(35px,4.5vw,50px)",height:2,background:"var(--secondary)",marginBottom:"1rem",opacity:loaded?1:0,transition:"all 0.8s ease 0.5s"}}/>
        <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.84rem,1.25vw,1rem)",fontWeight:300,maxWidth:530,lineHeight:1.82,marginBottom:"clamp(1.5rem,2.2vw,2.2rem)",opacity:loaded?1:0,transform:loaded?"none":"translateY(18px)",transition:"all 0.8s ease 0.55s"}}>
          At Granada International, pastoral care and student wellbeing sit at the very heart of everything we do — ensuring every student feels safe, valued, and inspired to reach their full potential.
        </p>
        <div style={{display:"flex",gap:"clamp(0.6rem,1vw,0.9rem)",flexWrap:"wrap",opacity:loaded?1:0,transition:"opacity 0.9s ease 0.7s"}}>
          <a href="#approach" onClick={e=>{e.preventDefault();document.getElementById("approach")?.scrollIntoView({behavior:"smooth",block:"start"});}} className="btn-green">Our Wellbeing Approach</a>
          <a href="#counselling" onClick={e=>{e.preventDefault();document.getElementById("counselling")?.scrollIntoView({behavior:"smooth",block:"start"});}} style={{display:"inline-block",padding:"clamp(0.55rem,1vw,0.8rem) clamp(1.3rem,2.2vw,2.4rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.6)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,1vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Counselling Support</a>
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
            <span className="font-display" style={{fontSize:"clamp(0.78rem,1.3vw,0.95rem)",fontStyle:"italic",fontWeight:400,color:"#fff",whiteSpace:"nowrap"}}>{t}</span>
            {i<tags.length-1&&<span style={{width:4,height:4,borderRadius:"50%",background:"var(--secondary)",flexShrink:0}}/>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── SECTION NAV ──────────────────────────────────────────────────────────── */
function SectionNav(){
  const sections=[{label:"Wellbeing Approach",id:"approach"},{label:"Counselling",id:"counselling"},{label:"Core Values",id:"values"},{label:"Character Education",id:"character"},{label:"Global Citizenship",id:"global"},{label:"Boarding Pastoral Care",id:"boarding-care"}];
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const fn=()=>{for(let i=sections.length-1;i>=0;i--){const el=document.getElementById(sections[i].id);if(el&&window.scrollY>=el.offsetTop-220){setActive(i);break;}}};
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const P="#346988";
  const scrollTo=(id:string)=>{const el=document.getElementById(id);if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});};
  return(
    <aside style={{width:"clamp(120px,12vw,180px)",flexShrink:0,position:"sticky",top:110,alignSelf:"flex-start",display:"none"}} className="wb-sidebar">
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"0.72rem",fontStyle:"italic",letterSpacing:"0.06em",color:P,fontWeight:600,marginBottom:"1rem"}}>On this page</p>
      <nav style={{display:"flex",flexDirection:"column",borderLeft:"1px solid #e8e6e3"}}>
        {sections.map((s,i)=>(
          <button key={i} onClick={()=>scrollTo(s.id)} style={{padding:"0.55rem 0 0.55rem 1rem",color:active===i?P:"#5a5a5a",background:"none",border:"none",borderLeft:active===i?`2px solid ${P}`:"2px solid transparent",cursor:"pointer",textAlign:"left",fontSize:"0.72rem",fontWeight:active===i?700:400,transition:"all 0.2s",fontFamily:"inherit",marginLeft:"-1px"}}>{s.label}</button>
        ))}
      </nav>
      <div style={{marginTop:"clamp(1.5rem,2vw,2.25rem)",border:"1px solid #e8e6e3",padding:"clamp(1rem,1.5vw,1.4rem)"}}>
        <p style={{fontSize:"clamp(0.55rem,0.75vw,0.6rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:P,fontWeight:700,marginBottom:"clamp(0.7rem,1vw,0.9rem)"}}>Where Next?</p>
        {[{label:"About Granada",href:"/granada-international/about"},{label:"Admissions",href:"/granada-international/admissions"},{label:"Campus Life",href:"/granada-international/campus-life"}].map((l,i)=>(
          <a key={i} href={l.href} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#5a5a5a",textDecoration:"none",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",padding:"clamp(0.35rem,0.6vw,0.45rem) 0",borderBottom:"1px solid #f0eee9",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=P)} onMouseLeave={e=>(e.currentTarget.style.color="#5a5a5a")}>
            <svg width="5" height="9" viewBox="0 0 5 9" fill="none"><path d="M1 1l3 3.5L1 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {l.label}
          </a>
        ))}
      </div>
      <style>{`@media(min-width:1024px){.wb-sidebar{display:block!important}}`}</style>
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
    <section id="counselling" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
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
            <div className="img-hover" style={{overflow:"hidden",height:"clamp(280px,38vw,440px)",marginBottom:"1rem"}}>
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
      <style>{`@media(max-width:900px){.values-grid{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:600px){.values-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
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
    <section id="character" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
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
          <p className="font-display" style={{fontSize:"clamp(1rem,1.8vw,1.5rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.7,maxWidth:680,margin:"0 auto"}}>
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
            <div className="img-hover" style={{overflow:"hidden",height:"clamp(200px,28vw,320px)"}}>
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
    <section id="boarding-care" ref={ref} className="section-blue" style={{position:"relative",padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",overflow:"hidden",scrollMarginTop:"100px"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/sports.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(74,100,40,0.93)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto"}}>
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
    <section style={{background:"var(--primary-dark)",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)",textAlign:"center"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"1.2rem"}}>Begin the Journey</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"1.5rem"}}>
          A place where every student <span style={{color:"var(--accent-light)"}}>truly belongs.</span>
        </h2>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.8,marginBottom:"2rem"}}>
          We invite you to discover the Granada International difference — where academic excellence and genuine pastoral care are inseparable.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          <a href="/granada-international/admissions" className="btn-green" style={{fontSize:"0.68rem",padding:"0.75rem 2rem"}}>Apply to Granada International</a>
          <a href="mailto:admissions@granadaschools.group" style={{display:"inline-block",padding:"0.75rem 2rem",background:"transparent",border:"1px solid rgba(255,255,255,0.5)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"0.68rem",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Enquire Now</a>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────────────────────── */
function Footer(){
  return(
    <footer style={{background:"var(--primary-dark)",color:"#fff",padding:"clamp(3rem,4vw,4.5rem) clamp(1rem,2vw,2rem) clamp(1.2rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,3vw,3rem)",marginBottom:"2.5rem"}} className="footer-grid">
          <div>
            <a href="/granada-international" style={{textDecoration:"none"}}>
              <Image src="/School2-dark.svg" alt="Granada International" width={190} height={90} style={{width:"clamp(140px,16vw,250px)",height:"auto",marginBottom:"0.75rem"}}/>
            </a>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:"0.8rem",lineHeight:1.8,maxWidth:240,marginTop:"1rem"}}>Forward Thinking. Inspiring Excellence.</p>
            <div style={{display:"flex",gap:"0.6rem",marginTop:"1.25rem"}}>
              {[{k:"FB",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
                <a key={k} href="#" style={{width:30,height:30,border:"1px solid rgba(255,255,255,0.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.75)",fontSize:"0.55rem",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.75)"}}>{i}</a>
              ))}
            </div>
          </div>
          {[
            {title:"Wellbeing",links:["Wellbeing Approach","Counselling Support","Core Values","Character Education","Global Citizenship","Boarding Pastoral Care"]},
            {title:"Quick Links",links:["About Us","Academics","Campus Life","Admissions","Contact Us"]},
          ].map((col,i)=>(
            <div key={i}>
              <h4 style={{fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"1.3rem"}}>{col.title}</h4>
              {col.links.map(l=>(
                <a key={l} href="#" style={{display:"block",color:"rgba(255,255,255,0.6)",fontSize:"0.79rem",textDecoration:"none",marginBottom:"0.65rem",transition:"color 0.2s"}} onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>{l}</a>
              ))}
            </div>
          ))}
          <div>
            <h4 style={{fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"1.3rem"}}>Contact Admissions</h4>
            <div style={{display:"flex",flexDirection:"column",gap:"0.85rem"}}>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.66rem",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Christopher Sabwa – Director</p><a href="tel:+254714848289" style={{color:"#fff",fontSize:"0.79rem",textDecoration:"none"}}>+254 714 848 289</a></div>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.66rem",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Asya Adan – Officer</p><a href="tel:+254717682138" style={{color:"#fff",fontSize:"0.79rem",textDecoration:"none"}}>+254 717 682 138</a></div>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.66rem",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Email</p><a href="mailto:admissions@granadaschools.group" style={{color:"var(--secondary)",fontSize:"0.75rem",textDecoration:"none",wordBreak:"break-all"}}>admissions@granadaschools.group</a></div>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.66rem",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Address</p><p style={{color:"#fff",fontSize:"0.79rem",lineHeight:1.6}}>Vipingo, Kilifi County<br/>Kenya Coast</p></div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"1.6rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"0.7rem"}}>© {new Date().getFullYear()} Granada International School. All rights reserved.</p>
          <div style={{display:"flex",gap:"1.5rem"}}>
            {["Privacy Policy","Terms of Use","Safeguarding"].map(l=>(
              <a key={l} href="#" style={{color:"rgba(255,255,255,0.4)",fontSize:"0.66rem",textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.4)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.footer-grid{grid-template-columns:1fr 1fr 1fr 1fr!important}}`}</style>
    </footer>
  );
}

export default function WellbeingPage(){
  return(<>
    <Navbar/>
    <PageHero/>
    <TaglineStrip/>
    <div style={{background:"var(--body-bg)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(2rem,4vw,4.5rem) clamp(1rem,2vw,2rem) 0",display:"flex",gap:"clamp(2rem,3vw,3.5rem)",alignItems:"flex-start",flexWrap:"wrap"}}>
        <SectionNav/>
        <main style={{flex:1,minWidth:0}}>
          <WellbeingApproach/>
          <CounsellingSupport/>
          <CoreValuesSection/>
          <CharacterEducation/>
          <GlobalCitizenship/>
        </main>
      </div>
    </div>
    <BoardingPastoralCare/>
    <PageCTA/>
    <Footer/>
  </>);
}
