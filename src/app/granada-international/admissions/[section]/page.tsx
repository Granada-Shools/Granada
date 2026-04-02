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
                <a href="/granada-international/admissions#process" onClick={onClose} className="btn-outline" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)",borderColor:"#fff",color:"#fff"}}>Apply Now</a>
              </div>
            </div>
          </div>
          <div style={{width:"clamp(150px,20vw,320px)",flexShrink:0,position:"relative",overflow:"hidden",background:"#213558",display:"none"}} className="nav-img-panel">
            {NAV_ITEMS.map((item,i)=>(
              <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${item.image})`,backgroundSize:"cover",backgroundPosition:"center",opacity:active===i?1:0,transition:"opacity 0.5s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.8) 0%,rgba(33,53,88,0.2) 60%)"}}/>
            <div style={{position:"absolute",bottom:"clamp(0.8rem,1.5vw,1.25rem)",left:"clamp(0.8rem,1.5vw,1.25rem)",right:"clamp(0.8rem,1.5vw,1.25rem)",zIndex:2}}>
              <p style={{fontFamily:"'Euclid Circular A',sans-serif",color:"rgba(255,255,255,0.9)",fontSize:"clamp(0.7rem,1.2vw,0.85rem)"}}>{cur.imageCaption}</p>
            </div>
          </div>
          <style>{`@media(min-width:768px){.nav-img-panel{display:block!important}}`}</style>
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
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"all 0.4s ease",background:scrolled?"rgba(255,255,255,0.97)":"transparent",backdropFilter:scrolled?"blur(10px)":"none",boxShadow:scrolled?"0 1px 0 #e8e6e3":"none",padding:scrolled?"0.7rem 0":"clamp(0.8rem,2vw,1.2rem) 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem"}}>
        <a href="/granada-international" style={{textDecoration:"none",display:"flex",alignItems:"center"}}>
          <Image src={scrolled ? "/g-international.svg" : "/g-international-dark.svg"} alt="Granada International" width={110} height={44} style={{height:"auto",width:"clamp(50px,8vw,110px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)",flexWrap:"wrap",justifyContent:"flex-end",flex:1}}>
          <div style={{display:"none",gap:"clamp(0.75rem,1.5vw,1.25rem)",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-international#contact"},{l:"Enquire",h:"/granada-international/contact"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-international/admissions#process" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
          </div>
          <button onClick={()=>setOpen(true)} aria-label="Open menu"
            style={{background:"none",border:`1px solid ${scrolled?"rgba(33,53,88,0.35)":"rgba(255,255,255,0.5)"}`,cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:"0.5rem 0.6rem",transition:"border-color 0.3s",flexShrink:0}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.borderColor=scrolled?"rgba(33,53,88,0.35)":"rgba(255,255,255,0.5)")}>
            <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block",transition:"background 0.4s"}}/>
            <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block",transition:"background 0.4s"}}/>
            <span style={{width:13,height:1.5,background:"var(--secondary)",display:"block"}}/>
          </button>
          <style>{`@media(min-width:768px){.nav-quick{display:flex!important}}`}</style>
        </div>
      </div>
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
  {label:"About Admissions",id:"intro"},
  {label:"Admissions Team",  id:"team"},
  {label:"KG\u2013Year 9 Process",id:"process"},
  {label:"Senior School",    id:"senior-process"},
  {label:"Apply",             id:"apply"},
];
const BASE_PATH = "/granada-international/admissions";

/* ── PAGE HERO ──────────────────────────────────────────────────────────────── */
function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Admissions";
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/class.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"heroKenBurns 14s ease-in-out infinite alternate"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(33,53,88,0.9) 0%,rgba(33,53,88,0.55) 50%,rgba(13,12,13,0.45) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.6) 0%,transparent 45%)"}}/>
      {/* Animated geometric decorations */}
      <div style={{position:"absolute",top:"18%",right:"6%",width:"clamp(100px,16vw,200px)",height:"clamp(100px,16vw,200px)",border:"1px solid rgba(170,194,12,0.3)",animation:"heroSpin 28s linear infinite",opacity:0.7}}/>
      <div style={{position:"absolute",top:"21%",right:"9%",width:"clamp(60px,10vw,130px)",height:"clamp(60px,10vw,130px)",border:"1px solid rgba(170,194,12,0.18)",animation:"heroSpin 18s linear infinite reverse",opacity:0.5}}/>
      <div style={{position:"absolute",bottom:"15%",left:"4%",width:"clamp(60px,8vw,100px)",height:"clamp(60px,8vw,100px)",border:"1px solid rgba(255,255,255,0.12)",animation:"heroSpin 22s linear infinite",opacity:0.4}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        <div style={{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(14px)",transition:"all 0.7s ease 0.2s",flexWrap:"wrap"}}>
          {[{label:"Granada",href:"/"},{label:"International",href:"/granada-international"},{label:"Admissions",href:"/granada-international/admissions"}].map((bc,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
              <a href={bc.href} style={{color:"rgba(255,255,255,0.55)",textDecoration:"none",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.55)")}>{bc.label}</a>
              <span style={{color:"var(--secondary)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>›</span>
            </span>
          ))}
          <span style={{color:"#fff",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>{sectionLabel}</span>
        </div>
        <div style={{display:"flex",alignItems:"flex-end",gap:"clamp(2rem,4vw,3.5rem)"}} className="hero-content">
          <div style={{flex:1,minWidth:280}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"rgba(170,194,12,0.2)",border:"1px solid rgba(170,194,12,0.45)",padding:"0.3rem 0.8rem",marginBottom:"clamp(0.6rem,1vw,0.8rem)",alignSelf:"flex-start",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(10px)",transition:"all 0.6s ease 0.3s"}}>
              <span style={{width:5,height:5,background:"var(--secondary)",borderRadius:"50%",flexShrink:0}}/>
              <span style={{color:"var(--secondary)",fontSize:"clamp(0.5rem,0.75vw,0.58rem)",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>KG–Year 9 (Boys & Girls) · Senior School (Girls Boarding)</span>
            </div>
            <h1 className="font-display" style={{fontSize:"clamp(2.5rem,6.5vw,5.2rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
              Begin Your Journey<br/><span style={{color:"var(--accent-light)"}}>at Granada International</span>
            </h1>
            <div style={{width:"clamp(35px,4.5vw,50px)",height:2,background:"var(--secondary)",marginBottom:"clamp(0.9rem,1.4vw,1.2rem)",opacity:loaded?1:0,transition:"width 0.9s ease 0.6s, opacity 0.7s ease 0.5s"}}/>
            <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.84rem,1.25vw,1rem)",fontWeight:300,maxWidth:520,lineHeight:1.82,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(18px)",transition:"all 0.8s ease 0.55s"}}>
              Pearson Edexcel International Curriculum — From Early Years to A-Levels. We welcome families who seek not only academic distinction, but the development of principled, globally minded leaders.
            </p>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"clamp(0.6rem,1vw,0.9rem)",flexShrink:0,opacity:loaded?1:0,transition:"opacity 0.9s ease 0.7s"}}>
            <a href="#process" onClick={e=>{e.preventDefault();document.getElementById("process")?.scrollIntoView({behavior:"smooth",block:"start"});}} className="btn-green" style={{fontSize:"clamp(0.62rem,1vw,0.7rem)",padding:"clamp(0.55rem,1vw,0.8rem) clamp(1.3rem,2.2vw,2.4rem)",textAlign:"center"}}>How to Apply</a>
            <a href="/granada-international/contact?type=admissions" style={{display:"inline-block",padding:"clamp(0.55rem,1vw,0.8rem) clamp(1.3rem,2.2vw,2.4rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.6)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,1vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s",textAlign:"center"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
              Contact Admissions
            </a>
          </div>
        </div>
      </div>

      <style>{`@keyframes heroKenBurns{0%{transform:scale(1)}100%{transform:scale(1.07)}}@keyframes heroSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ────────────────────────────────────────────────────────── */
function TaglineStrip(){
  const tags=["Pearson Edexcel Curriculum","KG–Year 9: Co-Educational","Senior School: Girls Boarding","Personal Admissions Guidance"];
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

/* ── SECTION NAV ──────────────────────────────────────────────────────────── */
function SectionNav(){
  const params = useParams();
  const activeSection = params.section as string;
  const P="#213558"; const S="#aac20c";
  return(
    <aside style={{width:"clamp(120px,12vw,180px)",flexShrink:0,position:"sticky",top:110,alignSelf:"flex-start",display:"none"}} className="section-sidebar">
      <p style={{fontFamily:"'Euclid Circular A',sans-serif",fontSize:"clamp(0.66rem,0.92vw,0.74rem)",letterSpacing:"0.06em",color:P,fontWeight:600,marginBottom:"1.1rem"}}>In this section</p>
      <nav style={{display:"flex",flexDirection:"column",gap:0,borderLeft:"1px solid #e8e6e3"}}>
        {PAGE_SECTIONS.map((s,i)=>(
          <Link key={i} href={`${BASE_PATH}/${s.id}`}
            style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.65rem 0 0.65rem 1rem",color:activeSection===s.id?P:"#5a5a5a",background:"none",textDecoration:"none",borderLeft:activeSection===s.id?`2px solid ${P}`:"2px solid transparent",fontSize:"clamp(0.68rem,0.95vw,0.78rem)",fontWeight:activeSection===s.id?700:400,transition:"all 0.2s",fontFamily:"inherit",marginLeft:"-1px"}}>
            {s.label}
          </Link>
        ))}
      </nav>
      <div style={{marginTop:"clamp(1.5rem,2vw,2.25rem)",border:"1px solid #e8e6e3",padding:"clamp(1rem,1.5vw,1.4rem)"}}>
        <p style={{fontSize:"clamp(0.55rem,0.75vw,0.6rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:S,fontWeight:700,marginBottom:"clamp(0.7rem,1vw,0.9rem)"}}>Where Next?</p>
        {[{label:"About Granada",href:"/granada-international/about"},{label:"Academics",href:"/granada-international/academics"},{label:"Campus Life",href:"/granada-international/campus-life"}].map((l,i)=>(
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

/* ── INTRO ────────────────────────────────────────────────────────────────── */
function Intro(){
  const {ref,vis}=useInView(0.08);
  return(
    <section id="intro" className="section-cream" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease",marginBottom:"clamp(1.5rem,3vw,2.5rem)"}}>
          <p className="label-tag">Welcome to Admissions</p>
          <h2 className="section-heading">Beginning Your<br/><em>International Journey</em></h2>
          <div className="divider"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,3rem)",alignItems:"start"}} className="adm-intro-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease"}}>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            At Granada International School, we offer the globally respected Pearson Edexcel curriculum — designed to cultivate intellectual curiosity, academic excellence, and confident global citizenship.
          </p>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            Our co-educational Junior School welcomes boys and girls from Kindergarten through Year 9 in a dynamic, inspiring environment. At Senior School level, our girls transition seamlessly into Granada Girls&apos; Boarding Senior School — where they pursue internationally recognised qualifications in a focused, empowering academic environment.
          </p>
          <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2.2rem)"}}>
            Our dedicated Admissions Team provides personalised guidance throughout every step of the application journey — from initial enquiry to enrollment confirmation.
          </p>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
            <a href="#process" onClick={e=>{e.preventDefault();document.getElementById("process")?.scrollIntoView({behavior:"smooth",block:"start"});}} className="btn-solid">How to Apply</a>
            <a href="/granada-international/contact?type=admissions" className="btn-outline">Contact Admissions</a>
          </div>
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all 0.9s ease 0.15s",display:"flex",flexDirection:"column",gap:"clamp(0.8rem,1.5vw,1.2rem)"}}>
          <div className="img-hover" style={{overflow:"hidden",minHeight:"clamp(240px,32vw,360px)",height:"100%",position:"relative"}}>
            <img src="/sports2.jpeg" alt="Students at Granada International" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.45),transparent 65%)"}}/>
            <div style={{position:"absolute",bottom:"1.2rem",left:"1.4rem",right:"1.4rem",zIndex:2}}>
              <p className="font-display" style={{color:"#fff",fontSize:"clamp(0.95rem,1.6vw,1.25rem)",fontWeight:400,textShadow:"0 1px 4px rgba(0,0,0,0.4)"}}>Education is not only about achievement — it is about shaping leaders.</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(0.5rem,1vw,0.8rem)"}}>
            {[
              {num:"Edexcel",label:"British Curriculum",color:"var(--primary)"},
              {num:"IGCSE",  label:"Intl. Qualification",color:"#936c51"},
              {num:"A-Level",label:"University Pathway",color:"#4a6428"},
            ].map((s,i)=>(
              <div key={i} style={{border:`1px solid ${s.color}22`,padding:"clamp(0.8rem,1.4vw,1.2rem)",textAlign:"center",transition:"all 0.35s",cursor:"default",background:"#fff"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.background=`${s.color}08`;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 6px 24px ${s.color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${s.color}22`;e.currentTarget.style.background="#fff";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <p className="font-display" style={{fontSize:"clamp(1rem,1.8vw,1.5rem)",fontWeight:700,color:s.color,lineHeight:1}}>{s.num}</p>
                <p style={{fontSize:"clamp(0.52rem,0.72vw,0.62rem)",textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--muted)",marginTop:"0.3rem",fontWeight:600,lineHeight:1.3}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <style>{`@media(min-width:768px){.adm-intro-grid{grid-template-columns:1fr 1fr!important}.adm-sidebar{display:block!important}}`}</style>
    </section>
  );
}

/* ── ADMISSIONS TEAM ──────────────────────────────────────────────────────── */
function AdmissionsTeam(){
  const {ref,vis}=useInView(0.08);
  const [hov,setHov]=useState<number|null>(null);
  const team=[
    {name:"Christopher Sabwa",role:"Admissions Director",phone:"+254 714 848 289",email:"admissions@granadaschools.group",img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",note:"Christopher leads the admissions journey at Granada International, offering personalised consultations and guiding families from first enquiry through to enrollment."},
    {name:"Asya Adan",role:"Admissions Officer",phone:"+254 717 682 138",email:"admissions@granadaschools.group",img:"https://images.unsplash.com/photo-1573496527892-904f897eb744?q=80&w=869",note:"Asya supports prospective families with warm, attentive guidance — handling applications, scheduling visits, and ensuring every family feels welcomed into the Granada community."},
  ];
  return(
    <section id="team" className="section-blue" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Meet the Team</p>
          <h2 className="section-heading">Our <em>Admissions Team</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>Our dedicated team offers personalised guidance throughout the application journey. We welcome prospective families to schedule a private consultation and campus tour.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.5rem,3vw,2.5rem)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="team-grid">
          {team.map((m,i)=>{const a=hov===i;return(
            <div key={i} style={{position:"relative",overflow:"hidden",height:"clamp(380px,52vw,480px)",cursor:"default",opacity:vis?1:0,transform:vis?"none":`translateY(${28+i*8}px)`,transition:`all 0.9s ease ${i*0.15}s`}}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
              <img src={m.img} alt={m.name} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",transition:"transform 0.7s ease",transform:a?"scale(1.06)":"scale(1)"}}/>
              <div style={{position:"absolute",inset:0,background:a?"linear-gradient(to top,rgba(33,53,88,0.95) 0%,rgba(33,53,88,0.6) 60%,rgba(33,53,88,0.15) 100%)":"linear-gradient(to top,rgba(33,53,88,0.88) 0%,rgba(33,53,88,0.08) 45%)",transition:"background 0.5s ease"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"clamp(1.4rem,2.5vw,2rem)"}}>
                <div style={{borderLeft:"3px solid var(--secondary)",paddingLeft:"clamp(0.8rem,1.5vw,1.2rem)",marginBottom:a?"clamp(0.8rem,1.2vw,1.2rem)":"0",transition:"margin 0.4s ease"}}>
                  <h3 style={{fontSize:"clamp(1.1rem,1.8vw,1.4rem)",fontWeight:700,color:"#fff",marginBottom:"0.2rem"}}>{m.name}</h3>
                  <p style={{fontSize:"clamp(0.58rem,0.8vw,0.66rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700}}>{m.role}</p>
                </div>
                <div style={{opacity:a?1:0,maxHeight:a?320:0,overflow:"hidden",transition:"opacity 0.4s ease 0.1s,max-height 0.5s ease"}}>
                  <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.78rem,0.95vw,0.86rem)",lineHeight:1.7,marginBottom:"clamp(1rem,1.5vw,1.4rem)",marginTop:"0.5rem"}}>{m.note}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
                    <a href={`tel:${m.phone.replace(/\s/g,"")}`} style={{display:"flex",alignItems:"center",gap:"0.75rem",color:"#fff",textDecoration:"none",fontSize:"clamp(0.8rem,1vw,0.88rem)",transition:"color 0.2s"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--secondary)")} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>
                      <span style={{width:"clamp(28px,3.5vw,32px)",height:"clamp(28px,3.5vw,32px)",border:"1px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(0.65rem,0.9vw,0.72rem)",flexShrink:0}}>📞</span>
                      {m.phone}
                    </a>
                    <a href={`mailto:${m.email}`} style={{display:"flex",alignItems:"center",gap:"0.75rem",color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:"clamp(0.75rem,0.9vw,0.82rem)",transition:"color 0.2s",wordBreak:"break-all",overflow:"hidden"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--secondary)")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.8)")}>
                      <span style={{width:"clamp(28px,3.5vw,32px)",height:"clamp(28px,3.5vw,32px)",border:"1px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(0.65rem,0.9vw,0.72rem)",flexShrink:0}}>✉️</span>
                      {m.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );})}
        </div>
        {/* Visit CTA */}
        <div style={{border:"1px solid rgba(255,255,255,0.2)",padding:"clamp(1.5rem,2.5vw,2.5rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"clamp(1rem,2vw,1.5rem)",background:"rgba(255,255,255,0.05)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.35s"}}>
          <div>
            <p style={{fontSize:"clamp(0.58rem,0.8vw,0.66rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"0.5rem"}}>Book a Consultation</p>
            <p style={{color:"#fff",fontSize:"clamp(0.9rem,1.3vw,1.05rem)",fontWeight:400,lineHeight:1.5}}>We invite prospective families to schedule a private consultation and campus tour at Granada International.</p>
          </div>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",flexShrink:0}}>
            <a href="/granada-international/contact?type=visit" className="btn-green">Book a Visit</a>
            <a href="tel:+254714848289" className="btn-outline">Call Us Today</a>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.team-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── ADMISSION PROCESS (KG–Y9) ────────────────────────────────────────────── */
function AdmissionProcess(){
  const {ref,vis}=useInView(0.06);
  const [activeStep,setActiveStep]=useState(0);
  const steps=[
    {
      num:"01",label:"Initial Consultation",icon:"💬",
      title:"Meet Our Admissions Team",
      desc:"Families engage with the Admissions Office and schedule a personalised campus visit. Our team provides a comprehensive overview of the Pearson Edexcel curriculum, academic structure, and school community.",
      docs:[],
      action:"This first step is entirely personalised — we listen to your family's aspirations and help you understand how Granada International can shape your child's future.",
    },
    {
      num:"02",label:"Application Submission",icon:"📋",
      title:"Submit Your Application",
      desc:"Complete the official application form and submit it together with all required supporting documentation.",
      docs:["Birth certificate","Passport photographs","Previous academic reports","Parent/guardian identification","Immunization card copy (mandatory for Early Years: Nursery & Reception)"],
      action:"Our admissions team reviews every application with care and attention — ensuring each child is considered as an individual.",
    },
    {
      num:"03",label:"Assessment & Interaction",icon:"🔍",
      title:"Academic Assessment",
      desc:"Applicants attend an age-appropriate academic assessment and/or student interaction session — designed to understand each child's strengths, learning style, and potential.",
      docs:[],
      action:"Our friendly assessors create a welcoming, low-pressure environment where every child can show their best.",
    },
    {
      num:"04",label:"Formal Offer",icon:"🎓",
      title:"Offer of Admission",
      desc:"Successful applicants receive a formal written offer of admission. The offer includes details of the academic year, class placement, and fee structure.",
      docs:[],
      action:"Receiving your offer is a milestone moment — the beginning of a world-class educational journey at Granada International.",
    },
    {
      num:"05",label:"Enrollment Confirmation",icon:"✅",
      title:"Confirm Your Place",
      desc:"Admission is confirmed upon settlement of the applicable fees and issuance of official reporting guidelines. Your child's place at Granada International is then fully secured.",
      docs:[],
      action:"Welcome to the Granada International family! We look forward to accompanying your child every step of the way.",
    },
  ];
  const cur=steps[activeStep];
  return(
    <section id="process" className="section-cream" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">KG – Year 9 | Boys & Girls</p>
          <h2 className="section-heading">Admission <em>Process</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>A clear, supportive 5-step journey guiding your family from first contact to enrollment confirmation at Granada International School.</p>
        </div>
        {/* Step tabs */}
        <div style={{display:"flex",gap:1,background:"#dddbd8",marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",overflowX:"auto"}} className="process-tabs">
          {steps.map((s,i)=>(
            <button key={i} onClick={()=>setActiveStep(i)}
              style={{flex:1,minWidth:"clamp(80px,12vw,120px)",padding:"clamp(0.75rem,1.2vw,1rem) clamp(0.6rem,1vw,0.9rem)",background:activeStep===i?"var(--primary)":"#fff",border:"none",borderBottom:activeStep===i?"3px solid var(--secondary)":"3px solid transparent",cursor:"pointer",textAlign:"center",transition:"all 0.25s",fontFamily:"inherit"}}>
              <div style={{fontSize:"clamp(0.7rem,1.1vw,0.85rem)",fontWeight:700,color:activeStep===i?"var(--secondary)":"var(--muted)",marginBottom:"0.2rem",transition:"color 0.25s"}}>{s.num}</div>
              <div style={{fontSize:"clamp(0.55rem,0.75vw,0.65rem)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:activeStep===i?"#fff":"var(--muted)",transition:"color 0.25s",lineHeight:1.3}}>{s.label}</div>
            </button>
          ))}
        </div>
        {/* Step detail */}
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.5rem,3vw,3rem)",alignItems:"start"}} className="process-detail-grid">
          <div style={{background:"var(--primary)",padding:"clamp(2rem,3vw,3rem)",position:"relative",overflow:"hidden",minHeight:"clamp(280px,35vw,380px)",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div style={{position:"absolute",top:"-20px",right:"-20px",width:140,height:140,border:"1px solid rgba(255,255,255,0.08)",borderRadius:"50%"}}/>
            <div style={{position:"absolute",bottom:"30px",left:"-30px",width:100,height:100,border:"1px solid rgba(170,194,12,0.15)",borderRadius:"50%"}}/>
            <div style={{position:"relative",zIndex:2}}>
              <div style={{fontSize:"clamp(2.5rem,4vw,3.5rem)",marginBottom:"1rem"}}>{cur.icon}</div>
              <p style={{fontSize:"clamp(3rem,5vw,4rem)",fontWeight:900,color:"rgba(255,255,255,0.08)",position:"absolute",top:"1rem",right:"1.5rem",fontFamily:"'Euclid Circular A',sans-serif"}}>{cur.num}</p>
              <span style={{display:"inline-block",padding:"0.3rem 0.9rem",background:"var(--secondary)",color:"var(--primary)",fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:700,marginBottom:"1rem"}}>{cur.label}</span>
              <h3 className="font-display" style={{fontSize:"clamp(1.4rem,2.5vw,2rem)",fontWeight:600,color:"#fff",lineHeight:1.2,marginBottom:"0.5rem"}}>{cur.title}</h3>
            </div>
            <p className="font-display" style={{fontSize:"clamp(0.85rem,1.2vw,1rem)",color:"rgba(255,255,255,0.7)",lineHeight:1.8,position:"relative",zIndex:2}}>&ldquo;{cur.action}&rdquo;</p>
          </div>
          <div>
            <p className="body-text" style={{marginBottom:"clamp(1.2rem,2vw,1.75rem)",color:"var(--body-text)"}}>{cur.desc}</p>
            {cur.docs.length>0&&(
              <>
                <p style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--muted)",fontWeight:700,marginBottom:"0.75rem"}}>Required Documents</p>
                <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:"0.5rem",marginBottom:"clamp(1.5rem,2vw,2rem)"}}>
                  {cur.docs.map((d,j)=>(
                    <li key={j} style={{display:"flex",alignItems:"flex-start",gap:"0.7rem",color:"var(--body-text)",fontSize:"clamp(0.78rem,0.95vw,0.85rem)",lineHeight:1.6,padding:"0.5rem",background:"#fff",border:"1px solid #e8e6e3",transition:"all 0.2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--primary)";e.currentTarget.style.background="var(--body-bg)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8e6e3";e.currentTarget.style.background="#fff";}}>
                      <span style={{width:6,height:6,background:"var(--secondary)",flexShrink:0,marginTop:7}}/>
                      {d}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
              {activeStep<steps.length-1?(
                <button onClick={()=>setActiveStep(activeStep+1)} className="btn-solid">Next Step →</button>
              ):(
                <a href="mailto:admissions@granadaschools.group" className="btn-solid">Begin Your Application</a>
              )}
              <a href="/granada-international/contact?type=admissions" className="btn-outline">Contact Admissions</a>
            </div>
          </div>
        </div>
        {/* All steps overview */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,background:"#dddbd8",marginTop:"clamp(2rem,3vw,3.5rem)"}} className="steps-overview">
          {steps.map((s,i)=>(
            <button key={i} onClick={()=>setActiveStep(i)}
              style={{background:activeStep===i?"var(--primary)":"#fff",padding:"clamp(0.9rem,1.5vw,1.4rem) clamp(0.6rem,1vw,1rem)",border:"none",cursor:"pointer",textAlign:"left",transition:"all 0.25s",fontFamily:"inherit",borderTop:activeStep===i?"3px solid var(--secondary)":"3px solid transparent"}}>
              <div style={{fontSize:"clamp(0.65rem,0.9vw,0.78rem)",fontWeight:700,color:activeStep===i?"var(--secondary)":"var(--muted)",marginBottom:"0.25rem"}}>{s.num}</div>
              <div style={{fontSize:"clamp(0.62rem,0.8vw,0.72rem)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:activeStep===i?"#fff":"var(--body-text)",lineHeight:1.3}}>{s.label}</div>
            </button>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:768px){.process-detail-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:640px){.steps-overview{grid-template-columns:repeat(3,1fr)!important}.process-tabs button{min-width:70px!important}}`}</style>
    </section>
  );
}

/* ── SENIOR SCHOOL TRANSITION ─────────────────────────────────────────────── */
function SeniorSchoolProcess(){
  const {ref,vis}=useInView(0.08);
  const steps=[
    {num:"01",icon:"📊",title:"Academic Performance Review",desc:"At the end of Year 9, an internal evaluation assesses academic achievement and subject readiness — ensuring every girl is fully prepared for the transition to Senior School.",color:"var(--primary)"},
    {num:"02",icon:"🗺️",title:"Career & Subject Pathway Guidance",desc:"Each student receives a personalised consultation with our academic counsellors to select International GCSE subjects aligned to her interests, strengths, and future career aspirations.",color:"var(--secondary)"},
    {num:"03",icon:"🎓",title:"Senior School Placement Offer",desc:"Successful students receive a formal offer of admission into Granada Girls' Boarding Senior School — the dedicated, empowering academic environment where A-Level futures are built.",color:"var(--accent-warm)"},
    {num:"04",icon:"🏠",title:"Boarding Orientation Programme",desc:"Parents and students attend a structured orientation session introducing boarding life at Granada International — covering daily routine, wellness, facilities, and community expectations.",color:"var(--accent-green)"},
    {num:"05",icon:"✅",title:"Reporting & Enrollment into Year 10",desc:"The journey continues — students officially report to Senior School and begin their International GCSE pathway, supported by experienced faculty and a close-knit boarding community.",color:"var(--accent-blue)"},
  ];
  return(
    <section id="senior-process" className="section-blue" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Girls Only · Senior School Boarding</p>
          <h2 className="section-heading">Transition to <em>Senior School</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:600}}>Following Year 9, our girls transition seamlessly into Granada Girls' Boarding Senior School — where they pursue International GCSE and A-Level qualifications in a focused, empowering environment.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,background:"rgba(255,255,255,0.1)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="senior-steps-grid">
          {steps.map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.06)",padding:"clamp(1.2rem,2vw,1.8rem) clamp(1rem,1.5vw,1.4rem)",borderTop:`3px solid ${s.color}`,opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.1}s`,cursor:"default"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.06)";}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"clamp(0.6rem,1vw,1rem)"}}>
                <span style={{fontSize:"clamp(1.2rem,2vw,1.5rem)"}}>{s.icon}</span>
                <span style={{fontSize:"clamp(1.2rem,2vw,1.6rem)",fontFamily:"'Euclid Circular A',sans-serif",fontWeight:700,color:"rgba(255,255,255,0.15)"}}>{s.num}</span>
              </div>
              <h3 style={{fontSize:"clamp(0.65rem,0.85vw,0.8rem)",textTransform:"uppercase",letterSpacing:"0.1em",color:"#fff",fontWeight:700,marginBottom:"0.5rem",lineHeight:1.3}}>{s.title}</h3>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.68rem,0.85vw,0.78rem)",lineHeight:1.75,fontWeight:300}}>{s.desc}</p>
            </div>
          ))}
        </div>
        {/* Senior school qualifier info */}
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.5rem,2.5vw,2rem)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.5s"}} className="senior-info-grid">
          {[
            {title:"IGCSE (Years 10–11)",icon:"📘",desc:"International GCSE examinations, set and marked by Pearson, provide globally recognised secondary qualifications accepted by top universities worldwide."},
            {title:"A-Levels (Years 12–13)",icon:"📙",desc:"International A-Level qualifications open doors to undergraduate programmes at universities across the UK, USA, Canada, Australia, Africa, and beyond."},
            {title:"Boarding Life",icon:"🌟",desc:"A safe, structured, and nurturing boarding environment designed to support academic focus, personal development, and lifelong sisterhood."},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",gap:"clamp(0.9rem,1.5vw,1.4rem)",padding:"clamp(1.2rem,2vw,1.8rem)",border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",alignItems:"flex-start",transition:"all 0.3s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.1)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)";}}>
              <span style={{fontSize:"clamp(1.2rem,2vw,1.5rem)",flexShrink:0}}>{item.icon}</span>
              <div>
                <h4 style={{fontSize:"clamp(0.72rem,0.9vw,0.82rem)",textTransform:"uppercase",letterSpacing:"0.12em",color:"var(--secondary)",fontWeight:700,marginBottom:"0.4rem"}}>{item.title}</h4>
                <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.75rem,0.9vw,0.83rem)",lineHeight:1.75,fontWeight:300}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.senior-steps-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){.senior-steps-grid{grid-template-columns:1fr!important}}@media(min-width:640px){.senior-info-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </section>
  );
}

/* ── APPLY ─────────────────────────────────────────────────────────────────── */
function Apply(){
  const {ref,vis}=useInView(0.06);
  const [form,setForm]=useState({child:"",dob:"",grade:"",parent:"",email:"",phone:"",current:"",country:"",message:""});
  const [submitted,setSubmitted]=useState(false);
  const docs=[
    {icon:"📄",label:"Birth Certificate",desc:"Certified copy of the learner's birth certificate"},
    {icon:"📸",label:"Passport Photographs",desc:"Two recent passport-size photographs of the learner"},
    {icon:"📋",label:"Academic Transcripts",desc:"Most recent end-of-year academic transcripts or reports"},
    {icon:"🆔",label:"Parent / Guardian ID",desc:"Copy of parent or guardian passport or national ID"},
    {icon:"💉",label:"Immunisation Records",desc:"Up-to-date immunisation card (mandatory for Early Years)"},
    {icon:"📝",label:"Previous School Reference",desc:"Reference letter or transfer documentation from current school"},
  ];
  const steps=[
    {num:"01",title:"Initial Enquiry",desc:"Contact our Admissions Team or complete the application form below to begin the process.",color:"var(--primary)"},
    {num:"02",title:"Submit Application & Documents",desc:"Provide the completed application form along with all required supporting documents.",color:"#936c51"},
    {num:"03",title:"Assessment & Interview",desc:"The learner will be invited for an age-appropriate assessment and a family interview with a senior member of staff.",color:"var(--secondary)"},
    {num:"04",title:"Offer & Enrolment",desc:"Successful applicants receive a formal offer. Families confirm acceptance and complete the enrolment process.",color:"#4a6428"},
  ];
  return(
    <section id="apply" ref={ref} style={{scrollMarginTop:"100px"}}>
      {/* Intro */}
      <div className="section-cream" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{maxWidth:720,opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease"}}>
            <p className="label-tag">Apply to Granada International</p>
            <h2 className="section-heading">Begin Your <em>Application</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.2rem"}}>Applications to Granada International School are welcomed throughout the year, subject to assessment and availability of places.</p>
            <p className="body-text" style={{marginBottom:"1.2rem"}}>Choosing the right school is an important decision, and we strongly encourage families to <a href="/granada-international/admissions/team" style={{color:"var(--primary)",fontWeight:600}}>arrange a visit</a> to experience our campus, meet our community, and understand our Pearson Edexcel curriculum before applying.</p>
            <p className="body-text">Families applying from overseas may email completed applications and required documentation to <a href="mailto:admissions@granadaschools.group" style={{color:"var(--primary)",fontWeight:600}}>admissions@granadaschools.group</a> prior to scheduling an assessment or interview.</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="section-blue" style={{padding:"clamp(2.5rem,5vw,4.5rem) clamp(1rem,2vw,2rem)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <p style={{color:"var(--secondary)",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:700,marginBottom:"clamp(1.5rem,2.5vw,2.5rem)"}}>How It Works</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,2vw,1.5rem)"}} className="apply-steps-grid-gi">
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
            <p className="body-text" style={{maxWidth:580}}>Please ensure the application form and all required supporting documents are submitted before an assessment can be arranged.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(0.6rem,1vw,0.8rem)"}} className="docs-grid-gi">
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
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.8rem,1vw,0.88rem)",lineHeight:1.7}}>Please complete the form below. If you require assistance at any stage, our Admissions Team will be happy to help.</p>
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
                {key:"grade",label:"Year Group Applying For",type:"text",placeholder:"e.g. Year 3, Year 7, Year 10"},
                {key:"parent",label:"Parent / Guardian Name",type:"text",placeholder:"Enter parent or guardian name"},
                {key:"email",label:"Email Address",type:"email",placeholder:"your.email@example.com"},
                {key:"phone",label:"Phone Number",type:"tel",placeholder:"+254 7XX XXX XXX"},
                {key:"current",label:"Current School (if applicable)",type:"text",placeholder:"Name of current school"},
                {key:"country",label:"Country of Residence",type:"text",placeholder:"e.g. Kenya, UK, UAE"},
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
      <style>{`@media(min-width:640px){.apply-steps-grid-gi{grid-template-columns:1fr 1fr!important}.docs-grid-gi{grid-template-columns:1fr 1fr!important}}@media(min-width:1024px){.docs-grid-gi{grid-template-columns:1fr 1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.92)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:800,margin:"0 auto",textAlign:"center",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.9rem,1.5vw,1.4rem)"}}>Ready to Begin?</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
          Discover the <span style={{color:"var(--accent-light)"}}>Granada difference.</span>
        </h2>
        <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.8,maxWidth:540,margin:"0 auto clamp(1.5rem,2.5vw,2.5rem)"}}>
          Where potential is recognised, excellence is expected, and futures are shaped with purpose.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          {[{l:"Enquire Now",h:"/granada-international/contact"},{l:"Book a Campus Visit",h:"/granada-international/contact?type=visit"},{l:"Apply to Granada",h:"#process"}].map((item,i)=>(
            <a key={i} href={item.h} style={{display:"inline-block",padding:"0.7rem 1.75rem",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s",fontFamily:"inherit"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>{item.l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ───────────────────────────────────────────────────────────────── */
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
            {title:"Admissions",links:["How to Apply","KG–Year 9 Process","Senior School Transition","Admissions Team","Book a Visit","Download Prospectus"]},
            {title:"Academics",links:["Edexcel Curriculum","IGCSE","A-Levels","University Pathways","School Sections","Results & Destinations"]},
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
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>© {new Date().getFullYear()} Granada International School. All rights reserved.</p>
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
  "intro": () => <Intro/>,
  "team": () => <AdmissionsTeam/>,
  "process": () => <AdmissionProcess/>,
  "senior-process": () => <SeniorSchoolProcess/>,
  "apply": () => <Apply/>,
};

export default function AdmissionsPage(){
  const params = useParams();
  const section = (params.section as string) || "intro";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["intro"];
  return(<>
    <Navbar/>
    <PageHero/>
    <TaglineStrip/>
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
