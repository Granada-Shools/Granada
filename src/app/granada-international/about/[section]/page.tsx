"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {label:"About Us",href:"/granada-international/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-international/about#welcome"},{label:"Vision & Mission",href:"/granada-international/about#vision"},{label:"Core Values",href:"/granada-international/about#values"},{label:"Our Story",href:"/granada-international/about#history"},{label:"Boarding",href:"/granada-international/about#boarding"},{label:"Staff & Leadership",href:"/granada-international/about#staff"}]},
  {label:"Admissions",href:"/granada-international/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"About Admissions",href:"/granada-international/admissions#intro"},{label:"Admissions Team",href:"/granada-international/admissions#team"},{label:"KG–Year 9 Process",href:"/granada-international/admissions#process"},{label:"Senior School",href:"/granada-international/admissions#senior-process"},{label:"Apply",href:"/granada-international/admissions#apply"}]},
  {label:"Academic",href:"/granada-international/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-international/academics#overview"},{label:"Edexcel Curriculum",href:"/granada-international/academics#edexcel"},{label:"School Sections",href:"/granada-international/academics#sections"},{label:"University Pathways",href:"/granada-international/academics#university"},{label:"Apply",href:"/granada-international/academics#apply"}]},
  {label:"Campus Life",href:"/granada-international/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Activities & Overview",href:"/granada-international/campus-life#activities"},{label:"Facilities",href:"/granada-international/campus-life#facilities"},{label:"Sports & Athletics",href:"/granada-international/campus-life#sports"},{label:"Arts & Drama",href:"/granada-international/campus-life#arts"},{label:"Music",href:"/granada-international/campus-life#music"},{label:"Co-Curricular",href:"/granada-international/campus-life#cocurricular"},{label:"Leadership",href:"/granada-international/campus-life#leadership"},{label:"Boarding Life",href:"/granada-international/campus-life#boarding"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-international/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-international/wellbeing#approach"},{label:"Counselling Support",href:"/granada-international/wellbeing#counselling"},{label:"Core Values",href:"/granada-international/wellbeing#values"},{label:"Character Education",href:"/granada-international/wellbeing#character"},{label:"Global Citizenship",href:"/granada-international/wellbeing#global"},{label:"Boarding Pastoral Care",href:"/granada-international/wellbeing#boarding-care"}]},
  {label:"Latest News",href:"/granada-international/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"Latest News",href:"/granada-international/news#latest-news"},{label:"Events",href:"/granada-international/news#events"},{label:"Newsletters",href:"/granada-international/news#newsletters"},{label:"Social Media",href:"/granada-international/news#social"}]},
  {label:"Parents",href:"/granada-international#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-international#contact"},{label:"School Calendar",href:"/granada-international#contact"},{label:"Term Dates",href:"/granada-international#contact"},{label:"Reports & Policies",href:"/granada-international#contact"}]},
  {label:"Support Us",href:"/granada-international#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Bursaries & Scholarships",href:"/granada-international/admissions"},{label:"Donations",href:"/granada-international#contact"},{label:"Community Partnerships",href:"/granada-international#contact"}]},
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
  const P="#213558"; const S="#aac20c";
  return(<>
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:199,background:"rgba(33,53,88,0.45)",opacity:open?1:0,pointerEvents:open?"auto":"none",transition:"opacity 0.4s",backdropFilter:open?"blur(3px)":"none"}}/>
    <div style={{position:"fixed",top:0,right:0,bottom:0,zIndex:200,width:"100%",maxWidth:"min(100vw,900px)",display:"flex",flexDirection:"column",background:"#213558",transform:open?"translateX(0)":"translateX(100%)",transition:"transform 0.5s cubic-bezier(0.77,0,0.175,1)",boxShadow:"-8px 0 60px rgba(0,0,0,0.3)",fontSize:"clamp(0.7rem,1.5vw,1rem)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(0.8rem,2vw,1.1rem) clamp(1.5rem,3vw,2.5rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",flexShrink:0,gap:"clamp(0.8rem,2vw,1.5rem)",background:"rgba(0,0,0,0.2)",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:"clamp(0.5rem,1.5vw,1.5rem)",alignItems:"center",flexWrap:"wrap",flex:1,minWidth:0}}>
          {[{label:"Parents",href:"/granada-international#contact"},{label:"Enquire",href:"/granada-international/contact"},{label:"Contact us",href:"/granada-international/contact"}].map(l=>(
            <a key={l.label} href={l.href} onClick={onClose} style={{color:"#fff",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.7rem)",letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>(e.currentTarget.style.color=S)} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{l.label}</a>
          ))}
        </div>
        <div style={{flex:1,maxWidth:280,position:"relative"}}>
          <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setSf(true)} onBlur={()=>setTimeout(()=>setSf(false),150)}
            style={{width:"100%",background:"rgba(255,255,255,0.1)",border:`1px solid ${sf?"#fff":"rgba(255,255,255,0.3)"}`,color:"#fff",padding:"0.45rem 2rem 0.45rem 0.8rem",fontSize:"clamp(0.72rem,1vw,0.8rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit"}}/>
          <span style={{position:"absolute",right:"0.7rem",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.78rem,1.1vw,0.88rem)",pointerEvents:"none"}}>⌕</span>
          {search.trim()&&sr.length>0&&(
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#fff",border:`1px solid ${P}30`,zIndex:10,maxHeight:240,overflowY:"auto",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}>
              {sr.map((r,i)=>(
                <a key={i} href={r.href} onClick={()=>{setSearch("");onClose();}} style={{display:"block",padding:"0.6rem 1rem",color:"#1c1b1c",textDecoration:"none",fontSize:"clamp(0.75rem,1.02vw,0.82rem)",borderBottom:"1px solid #f0eee9",transition:"background 0.15s"}}
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
        {/* Col 1 */}
        <div style={{width:"clamp(180px,25vw,260px)",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.1)",overflowY:"auto",padding:"clamp(1rem,2vw,1.5rem) 0",background:"rgba(0,0,0,0.2)",minHeight:0}}>
          {NAV_ITEMS.map((item,i)=>(
            <button key={item.label} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:active===i?"rgba(255,255,255,0.15)":"transparent",border:"none",borderLeft:active===i?`3px solid ${S}`:"3px solid transparent",padding:"clamp(0.65rem,1.5vw,0.85rem) clamp(1.1rem,2vw,1.5rem) clamp(0.65rem,1.5vw,0.85rem) clamp(1rem,2vw,1.35rem)",cursor:"pointer",textAlign:"left",transition:"all 0.2s",gap:"0.5rem"}}>
              <span style={{fontSize:"clamp(0.65rem,1.2vw,0.8rem)",fontWeight:active===i?700:400,letterSpacing:"0.06em",textTransform:"uppercase",color:active===i?S:"#fff",transition:"color 0.2s",fontFamily:"inherit",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.label}</span>
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none" style={{flexShrink:0,opacity:active===i?1:0.3}}><path d="M1 1l3 3.5L1 8" stroke={active===i?S:"#fff"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
        {/* Col 2 + 3 */}
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",borderRight:"1px solid rgba(255,255,255,0.1)",overflow:"hidden",background:"#213558"}}>
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
                <a href="/granada-international/contact" onClick={onClose} className="btn-solid" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Enquire</a>
                <a href="/granada-international/contact" onClick={onClose} className="btn-outline" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
              </div>
            </div>
          </div>
          <div style={{width:"clamp(150px,20vw,320px)",flexShrink:0,position:"relative",overflow:"hidden",background:"#213558",display:"none"}}>
            {NAV_ITEMS.map((item,i)=>(
              <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${item.image})`,backgroundSize:"cover",backgroundPosition:"center",opacity:active===i?1:0,transition:"opacity 0.5s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.8) 0%,rgba(33,53,88,0.2) 60%)"}}/>
            <div style={{position:"absolute",bottom:"clamp(0.8rem,1.5vw,1.25rem)",left:"clamp(0.8rem,1.5vw,1.25rem)",right:"clamp(0.8rem,1.5vw,1.25rem)",zIndex:2}}>
              <p style={{fontFamily:"'Euclid Circular A',sans-serif",color:"rgba(255,255,255,0.9)",fontSize:"clamp(0.7rem,1.2vw,0.85rem)"}}>{cur.imageCaption}</p>
            </div>
          </div>
          <style>{`@media(min-width:768px){div[style*="background:#213558"]{display:block!important}}`}</style>
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
          <Image src={scrolled ? "/g-international.svg" : "/g-international-dark.svg"} alt="Granada International" width={110} height={44} style={{height:"auto",width:"clamp(50px,8vw,110px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)"}}>
          <div style={{display:"flex",gap:"1.25rem",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-international#contact"},{l:"Enquire",h:"/granada-international/contact"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-international#admissions" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
          </div>
          <button onClick={()=>setOpen(true)} aria-label="Open menu"
            style={{background:"none",border:`1px solid ${scrolled?"rgba(33,53,88,0.35)":"rgba(255,255,255,0.5)"}`,cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:"0.5rem 0.6rem",transition:"border-color 0.3s"}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.borderColor=scrolled?"rgba(33,53,88,0.35)":"rgba(255,255,255,0.5)")}>
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

/* ── SECTION DATA ──────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  {label:"Principal's Welcome", id:"welcome"},
  {label:"Vision & Mission",    id:"vision"},
  {label:"Core Values",         id:"values"},
  {label:"Our Story",           id:"history"},
  {label:"Boarding",            id:"boarding"},
  {label:"Staff & Leadership",  id:"staff"},
];
const BASE_PATH = "/granada-international/about";

/* ── PAGE HERO ─────────────────────────────────────────────────────────────── */
function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "About Us";
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"kenBurns 14s ease-in-out infinite alternate"}}/>
      {/* Diagonal colour wash */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(33,53,88,0.88) 35%,rgba(33,53,88,0.4) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(39,83,106,0.7) 0%,transparent 55%)"}}/>
      {/* Decorative line grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 60px)",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        {/* Breadcrumb */}
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(10px)",transition:"all 0.6s ease 0.2s"}}>
          <a href="/" style={{color:"rgba(255,255,255,0.65)",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.65)")}>Granada</a>
          <span style={{color:"var(--secondary)",fontSize:"clamp(0.6rem,1vw,0.65rem)"}}>›</span>
          <a href="/granada-international" style={{color:"rgba(255,255,255,0.65)",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.65)")}>International</a>
          <span style={{color:"var(--secondary)",fontSize:"clamp(0.6rem,1vw,0.65rem)"}}>›</span>
          <a href="/granada-international/about" style={{color:"rgba(255,255,255,0.65)",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.65)")}>About Us</a>
          <span style={{color:"var(--secondary)",fontSize:"clamp(0.6rem,1vw,0.65rem)"}}>›</span>
          <span style={{color:"#fff",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>{sectionLabel}</span>
        </div>
        {/* Edexcel badge */}
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"rgba(170,194,12,0.2)",border:"1px solid rgba(170,194,12,0.45)",padding:"0.3rem 0.8rem",marginBottom:"clamp(0.6rem,1vw,0.8rem)",alignSelf:"flex-start",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(10px)",transition:"all 0.6s ease 0.3s"}}>
          <span style={{width:5,height:5,background:"var(--secondary)",borderRadius:"50%",flexShrink:0}}/>
          <span style={{color:"var(--secondary)",fontSize:"clamp(0.5rem,0.75vw,0.58rem)",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>Pearson Edexcel · British Curriculum</span>
        </div>
        <h1 className="font-display" style={{fontSize:"clamp(2.6rem,5.5vw,4.5rem)",fontWeight:600,lineHeight:1.05,color:"#fff",marginBottom:"0.8rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.4s"}}>
          World-Class Education<br/><span style={{color:"var(--accent-light)"}}>at Granada International</span>
        </h1>
        <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.85rem,1.2vw,0.95rem)",fontWeight:300,maxWidth:500,lineHeight:1.8,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.5s"}}>
          Forward Thinking. Inspiring Excellence. Shaping the Future.
        </p>
      </div>
      <style>{`@keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.08)}}`}</style>
    </section>
  );
}

/* ── IN-PAGE SECTION NAV ───────────────────────────────────────────────────── */
function SectionNav(){
  const params = useParams();
  const activeSection = params.section as string;
  const P="#213558"; const S="#aac20c";
  return(
    <aside style={{width:"clamp(120px,12vw,180px)",flexShrink:0,position:"sticky",top:110,alignSelf:"flex-start",display:"none"}} className="section-sidebar">
      <p style={{fontFamily:"'Euclid Circular A',sans-serif",fontSize:"clamp(0.6rem,0.9vw,0.72rem)",letterSpacing:"0.06em",color:P,fontWeight:600,marginBottom:"clamp(0.8rem,1.2vw,1.1rem)"}}>In this section</p>
      <nav style={{display:"flex",flexDirection:"column",gap:0,borderLeft:"1px solid #e8e6e3"}}>
        {PAGE_SECTIONS.map((s,i)=>(
          <Link key={i} href={`${BASE_PATH}/${s.id}`}
            style={{display:"flex",alignItems:"center",gap:"clamp(0.5rem,0.8vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) 0 clamp(0.5rem,0.8vw,0.65rem) 1rem",color:activeSection===s.id?P:"#5a5a5a",background:"none",textDecoration:"none",borderLeft:activeSection===s.id?`2px solid ${P}`:"2px solid transparent",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",fontWeight:activeSection===s.id?700:400,transition:"all 0.2s",fontFamily:"inherit",marginLeft:"-1px"}}>
            {s.label}
          </Link>
        ))}
      </nav>
      <div style={{marginTop:"clamp(1.5rem,2vw,2.25rem)",border:"1px solid #e8e6e3",padding:"clamp(1rem,1.5vw,1.4rem)"}}>
        <p style={{fontSize:"clamp(0.55rem,0.75vw,0.6rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:S,fontWeight:700,marginBottom:"clamp(0.7rem,1vw,0.9rem)"}}>Where Next?</p>
        {[{label:"How to Apply",href:"/granada-international#admissions"},{label:"Visit Granada",href:"/granada-international/contact?type=visit"},{label:"Enquire Now",href:"/granada-international/contact"}].map((l,i)=>(
          <a key={i} href={l.href} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#5a5a5a",textDecoration:"none",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",padding:"clamp(0.35rem,0.6vw,0.45rem) 0",borderBottom:"1px solid #f0eee9",transition:"color 0.2s"}}
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

/* ── PRINCIPAL'S WELCOME ────────────────────────────────────────────────────── */
function Welcome(){
  const {ref,vis}=useInView(0.08);
  return(
    <section className="section-light" id="welcome" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"2rem 2rem"}}>
      <p className="font-display" style={{fontSize:"clamp(1rem,1.8vw,1.5rem)",color:"var(--primary)",lineHeight:1.65,marginBottom:"clamp(1.5rem,2.5vw,2.25rem)",borderLeft:"3px solid var(--secondary)",paddingLeft:"clamp(0.9rem,1.5vw,1.4rem)",opacity:vis?1:0,transform:vis?"none":"translateY(16px)",transition:"all 0.8s ease"}}>
        At Granada International, we believe every learner has the potential to achieve remarkable things on a global stage — and we are here to nurture that potential every step of the way.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,3.5rem)",alignItems:"start"}} className="int-welcome-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.1s"}}>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>Granada International is a vibrant learning community located along Kenya's beautiful coast in Vipingo. The school is dedicated to nurturing confident, capable, and compassionate learners who are prepared to thrive in a rapidly changing world.</p>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>Delivering the internationally recognised Pearson Edexcel curriculum, Granada International provides learners with a comprehensive British academic pathway — from Early Years through to A-Levels — opening doors to universities worldwide.</p>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>Guided by the values of resilience, curiosity, kindness, honesty, and respect, the school focuses on developing the whole child — academically, socially, and morally.</p>
          <p className="body-text" style={{marginBottom:"2rem"}}>Granada International also provides boarding facilities for Senior School girls, offering a safe and supportive environment for focused learning and personal growth.</p>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
            <a href="/granada-international/contact" className="btn-solid">Enquire Now</a>
            <button onClick={()=>{const el=document.getElementById("vision");if(el){const y=el.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:y,behavior:"smooth"});}}} className="btn-outline">Our Vision</button>
          </div>
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.2s",display:"flex",flexDirection:"column"}}>
          <div style={{position:"relative",overflow:"hidden",flex:1,minHeight:"clamp(280px,40vw,400px)"}} className="img-hover">
            <img src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=387" alt="Principal" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
          </div>
          <div style={{borderLeft:"3px solid var(--primary)",paddingLeft:"clamp(0.8rem,1.5vw,1.2rem)",paddingTop:"clamp(0.9rem,1.5vw,1.4rem)"}}>
            <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:"clamp(0.75rem,0.95vw,0.87rem)",marginBottom:"0.9rem"}}>
              "I can think of no greater privilege than guiding this remarkable international school community. Granada International exists to see every child discover who they are, what they are capable of, and how they can make a difference in the world."
            </p>
            <p style={{color:"var(--primary)",fontSize:"clamp(0.6rem,0.75vw,0.68rem)",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:700}}>
              The Principal<br/><span style={{color:"var(--muted)",fontWeight:400,textTransform:"none",letterSpacing:"normal",fontSize:"clamp(0.75rem,1.02vw,0.82rem)"}}>Granada International</span>
            </p>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.section-sidebar{display:block!important}.int-welcome-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── VISION & MISSION ──────────────────────────────────────────────────────── */
function VisionMission(){
  const {ref,vis}=useInView(0.08);
  return(
    <section className="section-blue" id="vision" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{marginBottom:"clamp(1.5rem,2.5vw,2.75rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
        <p className="label-tag">Purpose & Direction</p>
        <h2 className="section-heading">Vision &amp; <em>Mission</em></h2>
        <div className="divider"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.2rem,2vw,1.75rem)",marginBottom:"clamp(1.5rem,2.5vw,2.75rem)"}} className="int-vision-grid">
        {[
          {tag:"Vision",title:"Leading Educational Excellence",tagColor:"rgba(255,255,255,0.5)",borderColor:"rgba(255,255,255,0.15)",body:"To be a leading centre of educational excellence that nurtures innovative thinkers, responsible leaders, and globally minded citizens — equipped to shape communities and contribute meaningfully to a rapidly evolving world."},
          {tag:"Mission",title:"Holistic & High-Quality Education",tagColor:"var(--secondary)",borderColor:"rgba(170,194,12,0.3)",body:"To provide a holistic and high-quality education that inspires learners to achieve their full potential through academic excellence, strong character development, and a commitment to lifelong learning in a nurturing environment."},
        ].map((c,i)=>(
          <div key={i} style={{padding:"clamp(1.5rem,2.5vw,2.25rem)",border:`1px solid ${c.borderColor}`,position:"relative",overflow:"hidden",background:"rgba(255,255,255,0.06)",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.15}s`}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:c.tagColor}}/>
            <span style={{display:"inline-block",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:c.tagColor,fontWeight:700,marginBottom:"0.9rem",border:`1px solid ${c.tagColor}`,padding:"0.25rem 0.7rem"}}>{c.tag}</span>
            <h3 className="font-display" style={{fontSize:"clamp(1.35rem,2.2vw,1.6rem)",fontWeight:500,color:"#fff",lineHeight:1.2,marginBottom:"0.9rem"}}>{c.title}</h3>
            <p className="body-text">{c.body}</p>
          </div>
        ))}
      </div>
      {/* Strategic pillars */}
      <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.3s"}}>
        <p className="body-text" style={{marginBottom:"1.75rem",maxWidth:620}}>Our strategic pillars bring this vision to life — translating the Granada International ethos into everyday learning, personal growth, and inspiring global experiences.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",background:"rgba(255,255,255,0.12)"}}>
          {[
            {title:"Character & Wellbeing",       desc:"Cultivating resilient, ethical, and socially aware international learners across all aspects of school life.",icon:"◆"},
            {title:"Academic Excellence",          desc:"Delivering personalised, Edexcel-standard learning that equips pupils for universities across the globe.",icon:"◇"},
            {title:"Global Citizenship",           desc:"Fostering a culture of service, international leadership, and responsibility both locally and globally.",icon:"◈"},
          ].map((p,i)=>(
            <div key={i} style={{padding:"1.75rem 1.5rem",background:"rgba(255,255,255,0.04)"}}>
              <span style={{fontSize:"clamp(0.88rem,1.2vw,0.98rem)",color:"var(--secondary)",display:"block",marginBottom:"0.65rem"}}>{p.icon}</span>
              <h4 style={{fontSize:"clamp(0.68rem,0.95vw,0.78rem)",textTransform:"uppercase",letterSpacing:"0.12em",color:"#fff",fontWeight:700,marginBottom:"0.6rem"}}>{p.title}</h4>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.75rem,1.02vw,0.82rem)",lineHeight:1.75,fontWeight:300}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:640px){.int-vision-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── CORE VALUES ────────────────────────────────────────────────────────────── */
function CoreValues(){
  const {ref,vis}=useInView(0.08);
  const values=[
    {title:"Resilience",icon:"🌱",color:"var(--primary)",tagline:"Grow Through Challenge",desc:"We encourage learners to persevere, overcome obstacles, and emerge stronger from every experience. Resilience is the foundation that allows students to face uncertainty with confidence and adapt with grace.",extras:["Growth mindset in every classroom","Challenges as opportunities","Perseverance celebrated daily"]},
    {title:"Curiosity",icon:"🔭",color:"var(--secondary)",tagline:"Love of Learning",desc:"We foster a deep love for learning, creativity, and the fearless exploration of new ideas. At Granada International, questions are always welcome — curiosity drives discovery, innovation, and lifelong learning.",extras:["Inquiry-based learning","Creative problem-solving","Cross-curricular exploration"]},
    {title:"Kindness",icon:"🤝",color:"var(--accent-warm)",tagline:"Empathy in Action",desc:"We promote empathy, compassion, and genuine respect for every person within and beyond the school community. Kindness shapes our classroom culture and the character of every graduate.",extras:["Peer support programmes","Community outreach","Inclusive school culture"]},
    {title:"Honesty",icon:"⚖️",color:"var(--accent-green)",tagline:"Integrity Always",desc:"We uphold integrity, accountability, and ethical behaviour in every aspect of school life. We believe trust is earned through honesty — and honest people build honest communities.",extras:["Academic integrity policy","Open communication","Ethical leadership training"]},
    {title:"Respect",icon:"🌍",color:"var(--accent-blue)",tagline:"Valuing Every Voice",desc:"We celebrate diversity, nurture positive relationships, and create a supportive environment where every individual is seen and valued. Respect connects our international community across backgrounds and aspirations.",extras:["Cultural celebrations","Student voice programmes","Anti-bullying commitment"]},
  ];
  return(
    <section className="section-cream" id="values" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{marginBottom:"clamp(1.5rem,2.5vw,2.75rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
        <p className="label-tag">What Guides Us</p>
        <h2 className="section-heading">Our Core <em>Values</em></h2>
        <div className="divider"/>
        <p className="body-text" style={{maxWidth:560}}>Five key values shape every interaction, every lesson, and every ambition we hold for our international learners.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"1px",background:"#dddbd8",marginBottom:"clamp(1.5rem,2.5vw,2.5rem)"}}>
        {values.map((v,i)=>(
          <div key={i} style={{background:"#fff",padding:"clamp(1rem,1.5vw,1.75rem) clamp(0.8rem,1.2vw,1.35rem)",borderTop:`3px solid ${v.color}`,position:"relative",overflow:"hidden",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.1}s`}}
            onMouseEnter={e=>(e.currentTarget.style.background="#f9f8f6")} onMouseLeave={e=>(e.currentTarget.style.background="#fff")}>
            <div style={{position:"absolute",bottom:-24,right:-14,width:70,height:70,borderRadius:"50%",background:v.color,opacity:0.07}}/>
            <span style={{fontSize:"clamp(1.2rem,2vw,1.5rem)",display:"block",marginBottom:"clamp(0.5rem,0.8vw,0.85rem)"}}>{v.icon}</span>
            <h3 style={{fontSize:"clamp(0.65rem,0.8vw,0.82rem)",textTransform:"uppercase",letterSpacing:"0.14em",color:"var(--body-text)",fontWeight:700,marginBottom:"0.25rem"}}>{v.title}</h3>
            <p style={{fontSize:"clamp(0.55rem,0.75vw,0.62rem)",color:v.color,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700,marginBottom:"clamp(0.5rem,0.8vw,0.85rem)"}}>{v.tagline}</p>
            <p className="body-text" style={{fontSize:"clamp(0.65rem,0.85vw,0.79rem)",marginBottom:"clamp(0.6rem,0.9vw,0.9rem)"}}>{v.desc}</p>
            <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:"0.35rem"}}>
              {v.extras.map((e,j)=>(
                <li key={j} style={{display:"flex",alignItems:"flex-start",gap:"0.45rem",color:"var(--muted)",fontSize:"clamp(0.6rem,0.75vw,0.7rem)",lineHeight:1.5}}>
                  <span style={{color:v.color,flexShrink:0,marginTop:1}}>—</span>{e}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){#values>div>div:nth-of-type(2){grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){#values>div>div:nth-of-type(2){grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── OUR STORY ──────────────────────────────────────────────────────────────── */
function OurStory(){
  const {ref,vis}=useInView(0.08);
  return(
    <section className="section-light" id="history" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,4rem)",alignItems:"center"}} className="int-story-grid">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"clamp(180px,30vw,220px) clamp(140px,22vw,175px)",gap:8,opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
          {[
            {src:"/class.jpeg",col:"1/2",row:"1/2"},
            {src:"/building.jpeg",col:"2/3",row:"1/3"},
            {src:"/building2.jpeg",col:"1/2",row:"2/3"},
          ].map((img,i)=>(
            <div key={i} className="img-hover" style={{gridColumn:img.col,gridRow:img.row,overflow:"hidden"}}>
              <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          ))}
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.15s"}}>
          <p className="label-tag">Our Story</p>
          <h2 className="section-heading">Rooted in <em>Vipingo</em>,<br/>Reaching the World</h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"1.1rem"}}>Granada International was founded on a powerful conviction: that every child deserves access to a world-class, internationally recognised education. Situated in the serene coastal environment of Vipingo, Kilifi County, the school was established to serve the growing families of Kenya and the wider global community.</p>
          <p className="body-text" style={{marginBottom:"1.1rem"}}>From its earliest days, Granada International has been committed to academic rigour, character formation, and community involvement. The school's Pearson Edexcel pathway was designed to open doors for learners both locally and globally — ensuring every graduate is equipped for the world's best universities.</p>
          <p className="body-text" style={{marginBottom:"2rem"}}>Today, Granada International stands as a testament to what a school can become when vision, dedication, and community come together on Kenya's beautiful coast — a story whose next chapter is being written by our learners every single day.</p>
          <a href="/granada-international#campus" className="btn-solid">Explore Our Campus</a>
        </div>
      </div>
      <style>{`@media(min-width:768px){.int-story-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── BOARDING ────────────────────────────────────────────────────────────────── */
function Boarding(){
  const {ref,vis}=useInView(0.08);
  return(
    <section className="section-blue" id="boarding" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,4rem)",alignItems:"center",marginBottom:"clamp(2rem,3vw,3rem)"}} className="int-boarding-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">Senior School Girls</p>
          <h2 className="section-heading">A Home Away <em>From Home</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"1.1rem"}}>Granada International provides boarding facilities for Senior School girls — a safe, structured, and nurturing environment designed for focused learning and personal growth.</p>
          <p className="body-text" style={{marginBottom:"1.1rem"}}>Our boarding community is built on trust, discipline, and genuine care. Boarders enjoy a well-balanced daily schedule that blends academic preparation, recreation, and supervised evening study.</p>
          <p className="body-text" style={{marginBottom:"2rem"}}>From weekend activities to cultural events, boarding life at Granada International shapes independence, resilience, and lifelong friendships — preparing girls for the challenges and opportunities that lie ahead.</p>
          <a href="/granada-international/contact?type=admissions" className="btn-solid">Enquire About Boarding</a>
        </div>
        <div style={{overflow:"hidden",minHeight:"clamp(300px,50vw,420px)",height:"100%",opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.15s"}} className="img-hover">
          <img src="/dorm.jpeg" alt="Boarding" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",background:"rgba(255,255,255,0.12)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.25s"}}>
        {[
          {title:"Safe & Secure",       icon:"🏠",desc:"Staffed around the clock by caring adults committed to every boarder's safety and comfort."},
          {title:"Structured Routine",  icon:"📋",desc:"A balanced daily schedule blending academics, meals, recreation, and supervised evening study."},
          {title:"Personal Growth",     icon:"🌟",desc:"Boarding life builds independence, resilience, and lifelong friendships."},
          {title:"Academic Support",    icon:"📚",desc:"Evening prep sessions supervised by experienced staff to keep learners motivated and on track."},
          {title:"Vibrant Community",   icon:"🤝",desc:"Weekend activities and cultural events where girls from diverse backgrounds come together."},
          {title:"Healthy Nutrition",   icon:"🥗",desc:"Nutritious, well-balanced meals prepared to support the energy needs of active learners."},
        ].map((b,i)=>(
          <div key={i} style={{padding:"clamp(1rem,1.5vw,1.6rem) clamp(0.9rem,1.2vw,1.4rem)",background:"rgba(255,255,255,0.04)",transition:"background 0.25s"}}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.09)")} onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.04)")}>
            <span style={{fontSize:"clamp(1.1rem,1.8vw,1.4rem)",display:"block",marginBottom:"clamp(0.4rem,0.6vw,0.6rem)"}}>{b.icon}</span>
            <h4 style={{fontSize:"clamp(0.65rem,0.75vw,0.75rem)",textTransform:"uppercase",letterSpacing:"0.12em",color:"#fff",fontWeight:700,marginBottom:"0.5rem"}}>{b.title}</h4>
            <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.65rem,0.85vw,0.8rem)",lineHeight:1.75,fontWeight:300}}>{b.desc}</p>
          </div>
        ))}
      </div>
      <style>{`@media(min-width:640px){.int-boarding-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:500px){#boarding>div>div:last-child{grid-template-columns:1fr 1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── STAFF ────────────────────────────────────────────────────────────────── */
function StaffSnapshot(){
  const {ref,vis}=useInView(0.08);
  const staff=[
    {name:"The Principal",            role:"Head of School",               img:"https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=387"},
    {name:"Director of Academics",    role:"Academic Leadership",           img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"},
    {name:"Head of International",    role:"Edexcel Programme Director",    img:"https://images.unsplash.com/photo-1573496527892-904f897eb744?q=80&w=869"},
    {name:"University Counsellor",    role:"Global Pathways & Destinations",img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"},
  ];
  return(
    <section className="section-light" id="staff" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(1.5rem,2vw,2rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(16px)",transition:"all 0.8s ease"}}>
        <p className="label-tag">The People Behind Granada International</p>
        <h2 className="section-heading">Staff &amp; <em>Leadership</em></h2>
        <div className="divider"/>
        <p className="body-text" style={{maxWidth:560}}>Our dedicated team of international educators brings together expertise, passion, and a shared commitment to every learner's global journey.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"clamp(0.9rem,1.5vw,1.4rem)"}}>
        {staff.map((s,i)=>(
          <div key={i} style={{opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.1}s`}}>
            <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(220px,35vw,280px)",height:"100%",marginBottom:"clamp(0.6rem,1vw,0.9rem)"}}>
              <img src={s.img} alt={s.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
            </div>
            <h4 style={{fontSize:"clamp(0.72rem,1vw,0.84rem)",color:"var(--body-text)",fontWeight:700,marginBottom:"0.2rem"}}>{s.name}</h4>
            <p style={{fontSize:"clamp(0.6rem,0.8vw,0.68rem)",color:"var(--primary)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700}}>{s.role}</p>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){#staff>div:nth-of-type(2){grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){#staff>div:nth-of-type(2){grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building2.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.9)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:800,margin:"0 auto",textAlign:"center",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.9rem,1.5vw,1.4rem)"}}>Ready to Begin?</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
          Are you ready to feel the <span style={{color:"var(--accent-light)"}}>difference?</span>
        </h2>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          {["Enquire","Visit Granada","Apply Now"].map(l=>(
            <a key={l} href="/granada-international#admissions" style={{display:"inline-block",padding:"0.7rem 1.75rem",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s",fontFamily:"inherit"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>{l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────────────────────── */
function Footer(){
  return(
    <footer id="contact" style={{background:"var(--primary)",color:"#fff",padding:"clamp(3rem,4vw,4.5rem) clamp(1rem,2vw,2rem) clamp(1.2rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,3vw,3.5rem)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="footer-grid">
          <div>
            <a href="/granada-international" style={{textDecoration:"none"}}>
              <Image src="/g-international-dark.svg" alt="Granada International" width={190} height={90} style={{width:"clamp(140px,16vw,250px)",height:"auto",marginBottom:"0.75rem"}}/>
            </a>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.75rem,1.02vw,0.82rem)",lineHeight:1.8,maxWidth:250,marginTop:"1.1rem"}}>Forward Thinking. Inspiring Excellence. Shaping the Future.</p>
            <div style={{display:"flex",gap:"0.6rem",marginTop:"1.25rem"}}>
              {[{k:"FB",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
                <a key={k} href="#" style={{width:"clamp(28px,3.5vw,32px)",height:"clamp(28px,3.5vw,32px)",border:"1px solid rgba(255,255,255,0.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.5rem,0.7vw,0.58rem)",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.75)"}}>{i}</a>
              ))}
            </div>
          </div>
          {[
            {title:"School",links:["About Us","Academic Life","Admissions","Curriculum","Campus Life","Our Team"]},
            {title:"Curriculum",links:["Pearson Edexcel","Key Stages 1–5","IGCSE","A-Levels","Results","University Pathways"]},
          ].map((col,i)=>(
            <div key={i}>
              <h4 style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"1.3rem"}}>{col.title}</h4>
              {col.links.map(l=>(
                <a key={l} href="#" style={{display:"block",color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.72rem,1vw,0.82rem)",textDecoration:"none",marginBottom:"0.65rem",transition:"color 0.2s"}}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>{l}</a>
              ))}
            </div>
          ))}
          <div>
            <h4 style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"1.3rem"}}>Contact Admissions</h4>
            <div style={{display:"flex",flexDirection:"column",gap:"0.85rem"}}>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.6rem,0.85vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Christopher Sabwa – Director</p><a href="tel:+254714848289" style={{color:"#fff",fontSize:"clamp(0.72rem,1vw,0.82rem)",textDecoration:"none"}}>+254 714 848 289</a></div>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.6rem,0.85vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Asya Adan – Officer</p><a href="tel:+254717682138" style={{color:"#fff",fontSize:"clamp(0.72rem,1vw,0.82rem)",textDecoration:"none"}}>+254 717 682 138</a></div>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.6rem,0.85vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Email</p><a href="mailto:admissions@granadaschools.group" style={{color:"var(--secondary)",fontSize:"clamp(0.68rem,0.95vw,0.78rem)",textDecoration:"none",wordBreak:"break-all"}}>admissions@granadaschools.group</a></div>
              <div><p style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.6rem,0.85vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Address</p><p style={{color:"#fff",fontSize:"clamp(0.72rem,1vw,0.82rem)",lineHeight:1.6}}>Vipingo, Kilifi County<br/>Kenya Coast</p></div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"1.6rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>© {new Date().getFullYear()} Granada International. All rights reserved.</p>
          <div style={{display:"flex",gap:"1.5rem"}}>
            {["Privacy Policy","Terms of Use","Safeguarding"].map(l=>(
              <a key={l} href="#" style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(0.6rem,0.85vw,0.68rem)",textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.4)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.footer-grid{grid-template-columns:1fr 1fr 1fr 1fr!important}}`}</style>
    </footer>
  );
}

/* ── PAGE ROOT ────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  "welcome": () => <Welcome/>,
  "vision": () => <VisionMission/>,
  "values": () => <CoreValues/>,
  "history": () => <OurStory/>,
  "boarding": () => <Boarding/>,
  "staff": () => <StaffSnapshot/>,
};

export default function AboutPage(){
  const params = useParams();
  const section = (params.section as string) || "welcome";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["welcome"];
  return(<>
    <Navbar/>
    <PageHero/>
    <div style={{background:"var(--body-bg)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(2rem,4vw,4.5rem) clamp(1rem,2vw,2rem) 0",display:"flex",gap:"clamp(2rem,3vw,3.5rem)",alignItems:"flex-start",flexWrap:"wrap"}} className="section-layout">
        <SectionNav/>
        <main style={{flex:1,minWidth:0}}>
          <div key={section} style={{animation:"sectionFadeIn 0.45s ease"}}>
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
    <PageCTA/>
    <Footer/>
    <style>{`@keyframes sectionFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </>);
}
