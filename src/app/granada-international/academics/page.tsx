"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {label:"About Us",href:"/granada-international/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-international/about#welcome"},{label:"Vision & Aims",href:"/granada-international/about#vision"},{label:"Our Values",href:"/granada-international/about#values"},{label:"Our Story",href:"/granada-international/about#history"},{label:"Staff & Leadership",href:"/granada-international/about#staff"},{label:"Contact Us",href:"/granada-international#contact"}]},
  {label:"Admissions",href:"/granada-international/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"How to Apply",href:"/granada-international/admissions#process"},{label:"KG–Year 9",href:"/granada-international/admissions#process"},{label:"Senior School",href:"/granada-international/admissions#senior-process"},{label:"Admissions Team",href:"/granada-international/admissions#team"}]},
  {label:"Academic",href:"/granada-international/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-international/academics#overview"},{label:"Edexcel Curriculum",href:"/granada-international/academics#edexcel"},{label:"School Sections",href:"/granada-international/academics#sections"},{label:"IGCSE",href:"/granada-international/academics#edexcel"},{label:"A-Levels",href:"/granada-international/academics#edexcel"},{label:"University Pathways",href:"/granada-international/academics#university"},{label:"Results & Destinations",href:"/granada-international/academics#university"}]},
  {label:"Campus Life",href:"/granada-international/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Modern Facilities",href:"/granada-international/campus-life#facilities"},{label:"Sports & Athletics",href:"/granada-international/campus-life#sports"},{label:"Arts & Drama",href:"/granada-international/campus-life#arts"},{label:"Music Programme",href:"/granada-international/campus-life#music"},{label:"Co-Curricular Activities",href:"/granada-international/campus-life#cocurricular"},{label:"Leadership Development",href:"/granada-international/campus-life#leadership"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-international/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-international/wellbeing#approach"},{label:"Counselling Support",href:"/granada-international/wellbeing#counselling"},{label:"Character Education",href:"/granada-international/wellbeing#character"},{label:"Global Citizenship",href:"/granada-international/wellbeing#global"}]},
  {label:"Latest News",href:"/granada-international/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"School News",href:"/granada-international/news"},{label:"Events Calendar",href:"/granada-international/news#events"},{label:"Our Socials",href:"/granada-international/news#social"},{label:"Newsletters",href:"/granada-international/news#newsletters"}]},
  {label:"Parents",href:"/granada-international#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-international#contact"},{label:"School Calendar",href:"/granada-international#contact"},{label:"Term Dates",href:"/granada-international#contact"},{label:"Reports & Policies",href:"/granada-international#contact"}]},
  {label:"Support Us",href:"/granada-international#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Bursaries & Scholarships",href:"/granada-international#admissions"},{label:"Donations",href:"/granada-international#contact"},{label:"Community Partnerships",href:"/granada-international#contact"}]},
];

/* ── SIDE NAV ──────────────────────────────────────────────────────────────── */
function SideNav({open,onClose}:{open:boolean;onClose:()=>void}){
  const [active,setActive]=useState(0);
  const [search,setSearch]=useState("");
  const [sf,setSf]=useState(false);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow="";};},[open]);
  useEffect(()=>{if(open)setActive(0);},[open]);
  const cur=NAV_ITEMS[active];
  const sr=search.trim()?NAV_ITEMS.flatMap(n=>[{label:n.label,href:n.href},...(n.children||[])].filter(c=>c.label.toLowerCase().includes(search.toLowerCase()))):[];
  const P="#346988"; const S="#aac20c";
  return(<>
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:199,background:"rgba(52,105,136,0.45)",opacity:open?1:0,pointerEvents:open?"auto":"none",transition:"opacity 0.4s",backdropFilter:open?"blur(3px)":"none"}}/>
    <div style={{position:"fixed",top:0,right:0,bottom:0,zIndex:200,width:"100%",maxWidth:"min(100vw,900px)",display:"flex",flexDirection:"column",background:"#346988",transform:open?"translateX(0)":"translateX(100%)",transition:"transform 0.5s cubic-bezier(0.77,0,0.175,1)",boxShadow:"-8px 0 60px rgba(0,0,0,0.3)",fontSize:"clamp(0.7rem,1.5vw,1rem)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(0.8rem,2vw,1.1rem) clamp(1.5rem,3vw,2.5rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",flexShrink:0,gap:"clamp(0.8rem,2vw,1.5rem)",background:"rgba(0,0,0,0.2)",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:"clamp(0.5rem,1.5vw,1.5rem)",alignItems:"center",flexWrap:"wrap",flex:1,minWidth:0}}>
          {[{label:"Parents",href:"/granada-international#contact"},{label:"Enquire",href:"/granada-international#admissions"},{label:"Contact us",href:"/granada-international#contact"}].map(l=>(
            <a key={l.label} href={l.href} onClick={onClose} style={{color:"#fff",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.7rem)",letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>(e.currentTarget.style.color=S)} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{l.label}</a>
          ))}
        </div>
        <div style={{flex:1,maxWidth:280,position:"relative"}}>
          <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setSf(true)} onBlur={()=>setTimeout(()=>setSf(false),150)}
            style={{width:"100%",background:"rgba(255,255,255,0.1)",border:`1px solid ${sf?"#fff":"rgba(255,255,255,0.3)"}`,color:"#fff",padding:"0.45rem 2rem 0.45rem 0.8rem",fontSize:"0.78rem",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit"}}/>
          <span style={{position:"absolute",right:"0.7rem",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.6)",fontSize:"0.85rem",pointerEvents:"none"}}>⌕</span>
          {search.trim()&&sr.length>0&&(
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#fff",border:`1px solid ${P}30`,zIndex:10,maxHeight:240,overflowY:"auto",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}>
              {sr.map((r,i)=>(
                <a key={i} href={r.href} onClick={()=>{setSearch("");onClose();}} style={{display:"block",padding:"0.6rem 1rem",color:"#1c1b1c",textDecoration:"none",fontSize:"0.8rem",borderBottom:"1px solid #f0eee9",transition:"background 0.15s"}}
                  onMouseEnter={e=>(e.currentTarget.style.background=`${P}10`)} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>{r.label}</a>
              ))}
            </div>
          )}
        </div>
        <button onClick={onClose} style={{background:"none",border:`1px solid rgba(255,255,255,0.4)`,color:"#fff",width:"clamp(32px,6vw,36px)",height:"clamp(32px,6vw,36px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="#fff";}} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="1" y1="1" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="1" x2="1" y2="12" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        <div style={{width:"clamp(180px,25vw,260px)",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.1)",overflowY:"auto",padding:"clamp(1rem,2vw,1.5rem) 0",background:"rgba(0,0,0,0.2)",minHeight:0}}>
          {NAV_ITEMS.map((item,i)=>(
            <button key={item.label} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:active===i?"rgba(255,255,255,0.15)":"transparent",border:"none",borderLeft:active===i?`3px solid ${S}`:"3px solid transparent",padding:"clamp(0.65rem,1.5vw,0.85rem) clamp(1.1rem,2vw,1.5rem) clamp(0.65rem,1.5vw,0.85rem) clamp(1rem,2vw,1.35rem)",cursor:"pointer",textAlign:"left",transition:"all 0.2s",gap:"0.5rem"}}>
              <span style={{fontSize:"clamp(0.65rem,1.2vw,0.8rem)",fontWeight:active===i?700:400,letterSpacing:"0.06em",textTransform:"uppercase",color:active===i?S:"#fff",transition:"color 0.2s",fontFamily:"inherit",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.label}</span>
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none" style={{flexShrink:0,opacity:active===i?1:0.3}}><path d="M1 1l3 3.5L1 8" stroke={active===i?S:"#fff"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",borderRight:"1px solid rgba(255,255,255,0.1)",overflow:"hidden",background:"#346988"}}>
            <div style={{padding:"clamp(1rem,2vw,1.5rem) clamp(1rem,2vw,1.5rem) 0",flexShrink:0,borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
              <p style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",letterSpacing:"0.22em",textTransform:"uppercase",color:"#fff",fontWeight:700}}>{cur.label}</p>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"clamp(0.85rem,1.5vw,1.25rem) clamp(1rem,2vw,1.5rem)"}}>
              <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
                {cur.children?.map((child,i)=>(
                  <a key={i} href={child.href} onClick={onClose} style={{display:"flex",alignItems:"center",gap:"clamp(0.4rem,0.8vw,0.6rem)",padding:"clamp(0.4rem,0.8vw,0.55rem) 0",color:"#fff",textDecoration:"none",fontSize:"clamp(0.7rem,1.2vw,0.8rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",transition:"color 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.color=S;const d=e.currentTarget.querySelector(".dot") as HTMLElement;if(d)d.style.background=S;}}
                    onMouseLeave={e=>{e.currentTarget.style.color="#fff";const d=e.currentTarget.querySelector(".dot") as HTMLElement;if(d)d.style.background="transparent";}}>
                    <span className="dot" style={{width:5,height:5,border:`1px solid ${S}`,flexShrink:0,transition:"background 0.2s",background:"transparent"}}/>{child.label}
                  </a>
                ))}
              </div>
              <div style={{display:"flex",gap:"clamp(0.4rem,0.8vw,0.6rem)",marginTop:"clamp(1rem,1.5vw,1.5rem)",flexWrap:"wrap"}}>
                <a href="/granada-international#admissions" onClick={onClose} style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)",background:S,color:P,textDecoration:"none",border:"none",cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>(e.currentTarget.style.opacity="0.9")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>Enquire</a>
                <a href="/granada-international#admissions" onClick={onClose} style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)",background:"transparent",color:"#fff",border:`1px solid ${S}`,textDecoration:"none",cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#fff";}}>Apply Now</a>
              </div>
            </div>
          </div>
          <div style={{width:"clamp(150px,20vw,320px)",flexShrink:0,position:"relative",overflow:"hidden",background:"#346988"}}>
            {NAV_ITEMS.map((item,i)=>(
              <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${item.image})`,backgroundSize:"cover",backgroundPosition:"center",opacity:active===i?1:0,transition:"opacity 0.5s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(52,105,136,0.8) 0%,rgba(52,105,136,0.2) 60%)"}}/>
            <div style={{position:"absolute",bottom:"clamp(0.8rem,1.5vw,1.25rem)",left:"clamp(0.8rem,1.5vw,1.25rem)",right:"clamp(0.8rem,1.5vw,1.25rem)",zIndex:2}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",color:"rgba(255,255,255,0.9)",fontSize:"clamp(0.7rem,1.2vw,0.85rem)",fontStyle:"italic"}}>{cur.imageCaption}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",padding:"clamp(0.6rem,1.5vw,0.85rem) clamp(1.5rem,3vw,2.5rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,gap:"clamp(0.5rem,1vw,1rem)",flexWrap:"wrap",background:"rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",gap:"clamp(0.5rem,1vw,0.75rem)",alignItems:"center"}}>
          {[{k:"FB",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
            <a key={k} href="#" style={{width:"clamp(24px,4vw,28px)",height:"clamp(24px,4vw,28px)",border:`1px solid rgba(255,255,255,0.4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"clamp(0.45rem,0.8vw,0.55rem)",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#fff";}}>{i}</a>
          ))}
        </div>
        <p style={{color:"#fff",fontSize:"clamp(0.6rem,1vw,0.7rem)",letterSpacing:"0.06em"}}>Vipingo, Kilifi County, Kenya</p>
      </div>
    </div>
  </>);
}

/* ── NAVBAR ────────────────────────────────────────────────────────────────── */
function Navbar(){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return(<>
    <SideNav open={open} onClose={()=>setOpen(false)}/>
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"all 0.4s",background:scrolled?"rgba(255,255,255,0.97)":"transparent",backdropFilter:scrolled?"blur(10px)":"none",boxShadow:scrolled?"0 1px 0 #e8e6e3":"none",padding:scrolled?"0.7rem 0":"clamp(0.8rem,2vw,1.2rem) 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="/granada-international" style={{textDecoration:"none"}}>
          <Image src={scrolled ? "/School2.svg" : "/School2-dark.svg"} alt="Granada International" width={190} height={90} style={{height:"auto",width:"clamp(120px,18vw,250px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)"}}>
          <div style={{display:"flex",gap:"1.25rem",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-international#contact"},{l:"Enquire",h:"/granada-international#admissions"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-international#admissions" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
          </div>
          <button onClick={()=>setOpen(true)} aria-label="Open menu"
            style={{background:"none",border:`1px solid ${scrolled?"rgba(52,105,136,0.35)":"rgba(255,255,255,0.5)"}`,cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:"0.5rem 0.6rem",transition:"border-color 0.3s"}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.borderColor=scrolled?"rgba(52,105,136,0.35)":"rgba(255,255,255,0.5)")}>
            <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block",transition:"background 0.4s"}}/>
            <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block",transition:"background 0.4s"}}/>
            <span style={{width:13,height:1.5,background:"var(--secondary)",display:"block"}}/>
          </button>
        </div>
      </div>
      <style>{`@media(max-width:640px){.nav-quick{display:none!important}}`}</style>
    </header>
  </>);
}

/* ── useInView ─────────────────────────────────────────────────────────────── */
function useInView(threshold=0.12){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── PAGE HERO ──────────────────────────────────────────────────────────────── */
function PageHero(){
  const [loaded,setLoaded]=useState(false);
  const [slide,setSlide]=useState(0);
  const slides=[
    "/class.jpeg",
    "/building.jpeg",
    "/dorm.jpeg",
  ];
  useEffect(()=>{setLoaded(true);const t=setInterval(()=>setSlide(s=>(s+1)%slides.length),5500);return()=>clearInterval(t);},[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      {slides.map((s,i)=>(
        <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${s})`,backgroundSize:"cover",backgroundPosition:"center",opacity:i===slide?1:0,transition:"opacity 1.4s ease",animation:i===slide?"acKenBurns 12s ease-in-out infinite alternate":"none"}}/>
      ))}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(52,105,136,0.82) 40%,rgba(52,105,136,0.28) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(39,83,106,0.65) 0%,transparent 50%)"}}/>
      {/* Animated accent line */}
      <div style={{position:"absolute",top:0,right:0,bottom:0,width:4,background:"linear-gradient(to bottom,transparent,var(--secondary),transparent)",opacity:loaded?0.7:0,transition:"opacity 1.2s ease 0.8s"}}/>
      {/* World map motif */}
      <div style={{position:"absolute",top:"50%",right:"8%",transform:"translateY(-50%)",fontSize:"clamp(6rem,15vw,14rem)",opacity:0.04,color:"#fff",userSelect:"none",pointerEvents:"none"}}>🌍</div>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:"clamp(2.5rem,4vw,4rem)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(10px)",transition:"all 0.6s ease 0.2s"}}>
          <a href="/" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>Granada</a>
          <span style={{color:"var(--secondary)",fontSize:"0.65rem"}}>›</span>
          <a href="/granada-international" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>Granada International</a>
          <span style={{color:"var(--secondary)",fontSize:"0.65rem"}}>›</span>
          <span style={{color:"#fff",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>Academics</span>
        </div>
        <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.58rem,0.9vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.5rem,1vw,0.65rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(12px)",transition:"all 0.6s ease 0.3s"}}>Pearson Edexcel · British Curriculum</p>
        <h1 className="font-display" style={{fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:600,lineHeight:1.03,color:"#fff",marginBottom:"0.9rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
          Academic Excellence<br/><span style={{fontStyle:"italic",color:"var(--accent-light)"}}>at Granada International</span>
        </h1>
        <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.88rem,1.2vw,1rem)",fontWeight:300,maxWidth:580,lineHeight:1.8,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.55s"}}>
          A globally benchmarked education through the British Edexcel curriculum — developing analytical thinkers, confident communicators, and globally minded graduates.
        </p>
        <div style={{display:"flex",gap:"clamp(0.5rem,1vw,0.75rem)",marginTop:"clamp(1.2rem,2vw,1.75rem)",flexWrap:"wrap",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:"all 0.8s ease 0.65s"}}>
          <a href="#overview" className="btn-green" style={{fontSize:"clamp(0.6rem,1vw,0.68rem)",padding:"clamp(0.5rem,1vw,0.7rem) clamp(1.2rem,2vw,1.8rem)"}}>Explore Curriculum</a>
          <a href="/granada-international#admissions" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"clamp(0.5rem,1vw,0.7rem) clamp(1.2rem,2vw,1.8rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.12)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Enquire Now</a>
        </div>
      </div>
      <div style={{position:"absolute",bottom:"1.4rem",left:"50%",transform:"translateX(-50%)",display:"flex",gap:6,zIndex:5}}>
        {slides.map((_,i)=>(<button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?"clamp(18px,2.5vw,26px)":"6px",height:"2px",background:i===slide?"var(--secondary)":"rgba(255,255,255,0.5)",border:"none",cursor:"pointer",transition:"all 0.4s",padding:0}}/>))}
      </div>
      <style>{`@keyframes acKenBurns{0%{transform:scale(1)}100%{transform:scale(1.07)}}`}</style>
    </section>
  );
}

/* ── SECTION NAV ────────────────────────────────────────────────────────────── */
function SectionNav(){
  const sections=[
    {label:"Overview",           id:"overview"},
    {label:"Edexcel Curriculum", id:"edexcel"},
    {label:"School Sections",    id:"sections"},
    {label:"University Pathways",id:"university"},
    {label:"Apply",              id:"apply"},
  ];
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const fn=()=>{
      for(let i=sections.length-1;i>=0;i--){
        const el=document.getElementById(sections[i].id);
        if(el&&window.scrollY>=el.offsetTop-220){setActive(i);break;}
      }
    };
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  },[]);
  const P="#346988"; const S="#aac20c";
  const scrollTo=(id:string)=>{const el=document.getElementById(id);if(el){const y=el.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:y,behavior:"smooth"});}};
  return(
    <aside style={{width:"clamp(120px,12vw,180px)",flexShrink:0,position:"sticky",top:110,alignSelf:"flex-start",display:"none",background:"var(--body-bg)",padding:"1.5rem 0"}} className="section-sidebar">
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"0.72rem",fontStyle:"italic",letterSpacing:"0.06em",color:P,fontWeight:600,marginBottom:"1.1rem"}}>In this section</p>
      <nav style={{display:"flex",flexDirection:"column",gap:0,borderLeft:"1px solid #e8e6e3"}}>
        {sections.map((s,i)=>(
          <button key={i} onClick={()=>scrollTo(s.id)}
            style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.65rem 0 0.65rem 1rem",color:active===i?P:"#5a5a5a",background:"none",border:"none",borderLeft:active===i?`2px solid ${P}`:"2px solid transparent",cursor:"pointer",textAlign:"left",fontSize:"0.78rem",fontWeight:active===i?700:400,transition:"all 0.2s",fontFamily:"inherit",marginLeft:"-1px"}}>
            {s.label}
          </button>
        ))}
      </nav>
      <div style={{marginTop:"2.25rem",border:"1px solid #e8e6e3",padding:"1.4rem",background:"#fff"}}>
        <p style={{fontSize:"0.6rem",letterSpacing:"0.18em",textTransform:"uppercase",color:S,fontWeight:700,marginBottom:"0.9rem"}}>Where Next?</p>
        {[{label:"How to Apply",href:"/granada-international#admissions"},{label:"Visit Granada",href:"/granada-international#admissions"},{label:"Enquire Now",href:"/granada-international#admissions"}].map((l,i)=>(
          <a key={i} href={l.href} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#5a5a5a",textDecoration:"none",fontSize:"0.78rem",padding:"0.45rem 0",borderBottom:"1px solid #f0eee9",transition:"color 0.2s"}}
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
        <p className="font-display" style={{fontSize:"clamp(1rem,1.8vw,1.5rem)",fontStyle:"italic",color:"var(--primary)",lineHeight:1.7,marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",borderLeft:"3px solid var(--secondary)",paddingLeft:"clamp(0.9rem,1.5vw,1.4rem)",maxWidth:820,opacity:vis?1:0,transform:vis?"none":"translateY(16px)",transition:"all 0.8s ease"}}>
          At Granada International, academic excellence is achieved through the internationally recognised British Edexcel curriculum — developing analytical thinking, academic depth, and global awareness in every learner.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,4rem)",alignItems:"start"}} className="overview-grid">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease 0.1s"}}>
            <p className="label-tag">Our Approach</p>
            <h2 className="section-heading">A World-Class <em>Education</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Granada International delivers the British Pearson Edexcel curriculum — one of the most respected and globally benchmarked academic frameworks in the world. This internationally recognised pathway prepares learners for higher education opportunities around the world.</p>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>The Edexcel programme develops analytical thinking, academic depth, and global awareness — equipping learners with the intellectual rigour, communication skills, and critical perspectives needed to succeed at the world's leading universities.</p>
            <p className="body-text" style={{marginBottom:"2rem"}}>From the earliest years through to A-Level, every stage of learning at Granada International is designed to challenge, inspire, and prepare learners for a truly global future.</p>
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
              <a href="#edexcel" onClick={e=>{e.preventDefault();const el=document.getElementById("edexcel");if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});}}} className="btn-solid">Edexcel Curriculum</a>
              <a href="#sections" onClick={e=>{e.preventDefault();const el=document.getElementById("sections");if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});}}} className="btn-outline">School Sections</a>
            </div>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.2s"}}>
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
            <div style={{overflow:"hidden",height:"clamp(200px,28vw,280px)"}} className="img-hover">
              <img src="/class.jpeg" alt="International students" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.overview-grid{grid-template-columns:1fr 1fr!important}.section-sidebar{display:block!important}}`}</style>
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
            <span style={{display:"inline-block",padding:"0.45rem 1.2rem",border:"1px solid var(--secondary)",color:"var(--secondary)",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>Edexcel Pathway</span>
            <span style={{display:"inline-block",padding:"0.35rem 1rem",border:"1px solid rgba(255,255,255,0.3)",color:"rgba(255,255,255,0.7)",fontSize:"0.58rem",letterSpacing:"0.16em",textTransform:"uppercase",fontWeight:600}}>IGCSE + A-Level</span>
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
          <div style={{position:"relative",overflow:"hidden",height:"clamp(280px,35vw,420px)"}} className="img-hover">
            {sections.map((s,i)=>(
              <img key={i} src={s.img} alt={s.label} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:active===i?1:0,transition:"opacity 0.7s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.75) 0%,transparent 60%)"}}/>
            <div style={{position:"absolute",top:"clamp(0.8rem,1.5vw,1.2rem)",left:"clamp(0.8rem,1.5vw,1.2rem)"}}>
              <span style={{display:"inline-block",padding:"0.3rem 0.9rem",background:cur.color,color:"#fff",fontSize:"0.58rem",letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:700}}>{cur.age}</span>
            </div>
            <div style={{position:"absolute",bottom:"clamp(1rem,1.5vw,1.5rem)",left:"clamp(1rem,1.5vw,1.5rem)",right:"clamp(1rem,1.5vw,1.5rem)"}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",color:"rgba(255,255,255,0.88)",fontSize:"clamp(0.9rem,1.3vw,1.1rem)",fontStyle:"italic",lineHeight:1.5}}>"{cur.quote}"</p>
            </div>
          </div>
          <div>
            <span style={{display:"inline-block",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#fff",background:"var(--primary)",padding:"0.3rem 0.9rem",fontWeight:700,marginBottom:"clamp(0.8rem,1.2vw,1.2rem)"}}>{cur.curriculum}</span>
            <h3 className="font-display" style={{fontSize:"clamp(1.5rem,2.5vw,2.2rem)",fontWeight:600,color:"var(--primary)",lineHeight:1.15,marginBottom:"0.5rem"}}>{cur.label}</h3>
            <p style={{fontSize:"clamp(0.62rem,0.85vw,0.72rem)",textTransform:"uppercase",letterSpacing:"0.18em",color:cur.color,fontWeight:700,marginBottom:"clamp(0.8rem,1.2vw,1.2rem)"}}>{cur.tagline}</p>
            <p className="body-text" style={{marginBottom:"clamp(1.2rem,1.75vw,1.75rem)"}}>{cur.intro}</p>
            <p style={{fontSize:"0.6rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--muted)",fontWeight:700,marginBottom:"0.75rem"}}>What's Covered</p>
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
              <a href="/granada-international#admissions" className="btn-outline">Make an Enquiry</a>
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
      <div style={{position:"absolute",inset:0,background:"rgba(52,105,136,0.86)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",fontWeight:700,marginBottom:"1.75rem"}}>Granada International</p>
        <blockquote className="font-display" style={{fontSize:"clamp(1.2rem,3.5vw,2.4rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.5,marginBottom:"2rem"}}>
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
      <div style={{position:"absolute",inset:0,background:"rgba(52,105,136,0.92)"}}/>
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
            <a href="/granada-international#admissions" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.5rem,2.5vw,2.5rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textDecoration:"none",fontSize:"clamp(0.65rem,1vw,0.72rem)",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.12)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Book a Visit</a>
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

/* ── FOOTER ─────────────────────────────────────────────────────────────────── */
function Footer(){
  const P="#346988"; const S="#aac20c";
  return(
    <footer style={{background:"var(--primary-dark)",padding:"clamp(2.5rem,4vw,4rem) clamp(1rem,2vw,2rem) clamp(1.5rem,2vw,1.75rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"clamp(1.5rem,2.5vw,2.5rem)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="footer-grid">
          <div>
            <a href="/granada-international" style={{textDecoration:"none"}}>
              <Image src="/School2-dark.svg" alt="Granada International" width={190} height={90} style={{width:"clamp(140px,16vw,250px)",height:"auto",marginBottom:"0.75rem"}}/>
            </a>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.7rem,0.85vw,0.78rem)",lineHeight:1.75,marginBottom:"1.25rem"}}>A world-class British Edexcel education along Kenya's beautiful Vipingo coast.</p>
            <div style={{display:"flex",gap:"0.5rem"}}>
              {[{k:"FB",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
                <a key={k} href="#" style={{width:28,height:28,border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.6)",fontSize:"0.5rem",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.6)";}}>{i}</a>
              ))}
            </div>
          </div>
          {[
            {title:"Academics",links:[{l:"Edexcel Curriculum",h:"/granada-international/academics#edexcel"},{l:"IGCSE",h:"/granada-international/academics#edexcel"},{l:"A-Levels",h:"/granada-international/academics#edexcel"},{l:"University Pathways",h:"/granada-international/academics#university"}]},
            {title:"Admissions",links:[{l:"How to Apply",h:"/granada-international#admissions"},{l:"Fees & Scholarships",h:"/granada-international#admissions"},{l:"Book a Visit",h:"/granada-international#admissions"},{l:"Download Prospectus",h:"/granada-international#admissions"}]},
          ].map((col,i)=>(
            <div key={i}>
              <p style={{fontSize:"0.58rem",letterSpacing:"0.22em",textTransform:"uppercase",color:S,fontWeight:700,marginBottom:"1.1rem"}}>{col.title}</p>
              <div style={{display:"flex",flexDirection:"column",gap:"0.45rem"}}>
                {col.links.map((lnk,j)=>(
                  <a key={j} href={lnk.h} style={{color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:"clamp(0.7rem,0.85vw,0.78rem)",transition:"color 0.2s",lineHeight:1.6}}
                    onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>{lnk.l}</a>
                ))}
              </div>
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
        <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"clamp(1rem,1.5vw,1.5rem)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.75rem"}}>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:"clamp(0.6rem,0.75vw,0.68rem)"}}>© 2025 Granada Group of Schools. All rights reserved.</p>
          <div style={{display:"flex",gap:"1.25rem",flexWrap:"wrap"}}>
            {["Privacy Policy","Terms of Use","Safeguarding"].map((l,i)=>(
              <a key={i} href="#" style={{color:"rgba(255,255,255,0.35)",textDecoration:"none",fontSize:"clamp(0.6rem,0.75vw,0.68rem)",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.35)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────────────── */
export default function GranadaInternationalAcademics(){
  return(
    <>
      <Navbar/>
      <main style={{background:"var(--body-bg)"}}>
        <PageHero/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",gap:"clamp(2rem,3vw,3.5rem)",alignItems:"flex-start"}}>
          <SectionNav/>
          <div style={{flex:1,minWidth:0}}>
            <Overview/>
          </div>
        </div>
        <EdexcelCurriculum/>
        <SchoolSections/>
        <QuoteBanner/>
        <UniversityPathways/>
        <AdmissionsCTA/>
      </main>
      <Footer/>
      <style>{`
        .font-display{font-family:'Cormorant Garamond',Georgia,serif;}
        .section-heading{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:600;line-height:1.1;color:#fff;margin-bottom:0;margin-top:0;}
        .section-heading em{font-style:italic;color:var(--accent-light);}
        .section-light .section-heading,.section-cream .section-heading{color:var(--body-text)!important;}
        .section-light .section-heading em,.section-cream .section-heading em{color:var(--primary)!important;}
        .label-tag{font-size:clamp(0.55rem,0.8vw,0.62rem);letter-spacing:0.28em;text-transform:uppercase;color:var(--secondary);font-weight:700;margin-bottom:0.6rem;}
        .divider{width:clamp(32px,4vw,44px);height:2px;background:var(--secondary);margin:clamp(0.75rem,1vw,1rem) 0 clamp(0.75rem,1.5vw,1.4rem);}
        .body-text{color:rgba(255,255,255,0.78);font-size:clamp(0.82rem,1.05vw,0.92rem);line-height:1.85;font-weight:300;}
        .section-light .body-text,.section-cream .body-text{color:var(--muted)!important;font-weight:400!important;}
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
        @media(max-width:640px){.section-tabs button{min-width:80px!important;}}
      `}</style>
    </>
  );
}
