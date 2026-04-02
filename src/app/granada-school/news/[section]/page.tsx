"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  {label:"About Us",href:"/granada-school/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-school/about#welcome"},{label:"Vision & Mission",href:"/granada-school/about#vision"},{label:"Core Values",href:"/granada-school/about#values"},{label:"Our Story",href:"/granada-school/about#history"},{label:"Boarding",href:"/granada-school/about#boarding"},{label:"Staff & Leadership",href:"/granada-school/about#staff"}]},
  {label:"Admissions",href:"/granada-school/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"Introduction",href:"/granada-school/admissions#intro"},{label:"Why Choose Granada",href:"/granada-school/admissions#why-choose"},{label:"Boarding Life",href:"/granada-school/admissions#boarding"},{label:"Admissions Process",href:"/granada-school/admissions#process"},{label:"Apply",href:"/granada-school/admissions#apply"},{label:"Admissions Team",href:"/granada-school/admissions#team"}]},
  {label:"Academic",href:"/granada-school/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-school/academics#overview"},{label:"CBC Curriculum",href:"/granada-school/academics#cbc"},{label:"School Sections",href:"/granada-school/academics#sections"},{label:"Girls' Boarding",href:"/granada-school/academics#boarding"},{label:"Apply",href:"/granada-school/academics#apply"}]},
  {label:"Campus Life",href:"/granada-school/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Facilities",href:"/granada-school/campus-life#facilities"},{label:"Co-Curricular Activities",href:"/granada-school/campus-life#cocurricular"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-school/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-school/wellbeing#approach"},{label:"Counselling",href:"/granada-school/wellbeing#counselling"},{label:"Character Education",href:"/granada-school/wellbeing#character"},{label:"Global Citizenship",href:"/granada-school/wellbeing#global"}]},
  {label:"Latest News",href:"/granada-school/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"Featured Story",href:"/granada-school/news#featured"},{label:"All News",href:"/granada-school/news#all-news"},{label:"Events",href:"/granada-school/news#events"},{label:"Newsletters",href:"/granada-school/news#newsletters"}]},
  {label:"Parents",href:"/granada-school#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-school#contact"},{label:"School Calendar",href:"/granada-school#contact"},{label:"Term Dates",href:"/granada-school#contact"}]},
  {label:"Support Us",href:"/granada-school#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Bursaries & Scholarships",href:"/granada-school/admissions"},{label:"Donations",href:"/granada-school#contact"},{label:"Community Partnerships",href:"/granada-school#contact"}]},
];

function SideNav({open,onClose}:{open:boolean;onClose:()=>void}){
  const [active,setActive]=useState(0);
  const [search,setSearch]=useState("");
  const [sf,setSf]=useState(false);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow="";};},[open]);
  useEffect(()=>{if(open)setActive(0);},[open]);
  const cur=NAV_ITEMS[active];
  const sr=search.trim()?NAV_ITEMS.flatMap(n=>[{label:n.label,href:n.href},...(n.children||[])].filter(c=>c.label.toLowerCase().includes(search.toLowerCase()))):[];
  const P="#213558";const S="#aac20c";
  return(<>
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:199,background:"rgba(33,53,88,0.45)",opacity:open?1:0,pointerEvents:open?"auto":"none",transition:"opacity 0.4s",backdropFilter:open?"blur(3px)":"none"}}/>
    <div style={{position:"fixed",top:0,right:0,bottom:0,zIndex:200,width:"100%",maxWidth:"min(100vw,900px)",display:"flex",flexDirection:"column",background:"#213558",transform:open?"translateX(0)":"translateX(100%)",transition:"transform 0.5s cubic-bezier(0.77,0,0.175,1)",boxShadow:"-8px 0 60px rgba(0,0,0,0.3)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.1rem 2.5rem",borderBottom:"1px solid rgba(255,255,255,0.1)",flexShrink:0,gap:"1.5rem",background:"rgba(0,0,0,0.2)",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:"1.5rem",alignItems:"center",flex:1,flexWrap:"wrap"}}>
          {[{label:"Parents",href:"/granada-school#contact"},{label:"Enquire",href:"/granada-school/contact"},{label:"Contact us",href:"/granada-school/contact"}].map(l=>(
            <a key={l.label} href={l.href} onClick={onClose} style={{color:"#fff",textDecoration:"none",fontSize:"clamp(0.65rem,0.9vw,0.72rem)",letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s"}}
              onMouseEnter={e=>(e.currentTarget.style.color=S)} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{l.label}</a>
          ))}
        </div>
        <div style={{flex:1,maxWidth:280,position:"relative"}}>
          <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setSf(true)} onBlur={()=>setTimeout(()=>setSf(false),150)}
            style={{width:"100%",background:"rgba(255,255,255,0.1)",border:`1px solid ${sf?"#fff":"rgba(255,255,255,0.3)"}`,color:"#fff",padding:"0.45rem 2rem 0.45rem 0.8rem",fontSize:"clamp(0.72rem,1vw,0.8rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit"}}/>
          <span style={{position:"absolute",right:"0.7rem",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.6)",pointerEvents:"none"}}>⌕</span>
          {search.trim()&&sr.length>0&&(
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#fff",zIndex:10,maxHeight:240,overflowY:"auto",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}>
              {sr.map((r,i)=>(
                <a key={i} href={r.href} onClick={()=>{setSearch("");onClose();}} style={{display:"block",padding:"0.6rem 1rem",color:"#1c1b1c",textDecoration:"none",fontSize:"clamp(0.75rem,1.02vw,0.82rem)",borderBottom:"1px solid #f0eee9",transition:"background 0.15s"}}
                  onMouseEnter={e=>(e.currentTarget.style.background=`${P}10`)} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>{r.label}</a>
              ))}
            </div>
          )}
        </div>
        <button onClick={onClose} style={{background:"none",border:`1px solid rgba(255,255,255,0.4)`,color:"#fff",width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="#fff";}}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="1" y1="1" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="1" x2="1" y2="12" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        <div style={{width:"clamp(180px,25vw,260px)",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.1)",overflowY:"auto",padding:"1.5rem 0",background:"rgba(0,0,0,0.2)"}}>
          {NAV_ITEMS.map((item,i)=>(
            <button key={item.label} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:active===i?"rgba(255,255,255,0.15)":"transparent",border:"none",borderLeft:active===i?`3px solid ${S}`:"3px solid transparent",padding:"0.85rem 1.5rem 0.85rem 1.35rem",cursor:"pointer",textAlign:"left",transition:"all 0.2s",gap:"0.5rem"}}>
              <span style={{fontSize:"clamp(0.75rem,1.02vw,0.82rem)",fontWeight:active===i?700:400,letterSpacing:"0.06em",textTransform:"uppercase",color:active===i?S:"#fff",fontFamily:"inherit",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.label}</span>
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none" style={{flexShrink:0,opacity:active===i?1:0.3}}><path d="M1 1l3 3.5L1 8" stroke={active===i?S:"#fff"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",borderRight:"1px solid rgba(255,255,255,0.1)",background:"#213558"}}>
            <div style={{padding:"1.5rem 1.5rem 0",flexShrink:0,borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
              <p style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",letterSpacing:"0.22em",textTransform:"uppercase",color:"#fff",fontWeight:700}}>{cur.label}</p>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"1.25rem 1.5rem"}}>
              {cur.children?.map((child,i)=>(
                <a key={i} href={child.href} onClick={onClose} style={{display:"flex",alignItems:"center",gap:"0.6rem",padding:"0.5rem 0",color:"#fff",textDecoration:"none",fontSize:"clamp(0.75rem,1.02vw,0.82rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",transition:"color 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color=S;const d=e.currentTarget.querySelector(".dot") as HTMLElement;if(d)d.style.background=S;}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#fff";const d=e.currentTarget.querySelector(".dot") as HTMLElement;if(d)d.style.background="transparent";}}>
                  <span className="dot" style={{width:5,height:5,border:`1px solid ${S}`,flexShrink:0,transition:"background 0.2s",background:"transparent"}}/>{child.label}
                </a>
              ))}
              <div style={{display:"flex",gap:"0.6rem",marginTop:"1.5rem",flexWrap:"wrap"}}>
                <a href="/granada-school/contact" onClick={onClose} className="btn-solid" style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",padding:"0.45rem 1.2rem"}}>Enquire</a>
                <a href="/granada-school/admissions#process" onClick={onClose} className="btn-outline" style={{fontSize:"clamp(0.55rem,0.78vw,0.62rem)",padding:"0.45rem 1.2rem"}}>Apply Now</a>
              </div>
            </div>
          </div>
          <div style={{width:"clamp(150px,20vw,320px)",flexShrink:0,position:"relative",overflow:"hidden",display:"none"}} className="nav-img-panel">
            {NAV_ITEMS.map((item,i)=>(
              <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${item.image})`,backgroundSize:"cover",backgroundPosition:"center",opacity:active===i?1:0,transition:"opacity 0.5s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(33,53,88,0.8) 0%,rgba(33,53,88,0.2) 60%)"}}/>
            <div style={{position:"absolute",bottom:"1.25rem",left:"1.25rem",right:"1.25rem",zIndex:2}}>
              <p style={{fontFamily:"'Euclid Circular A',sans-serif",color:"rgba(255,255,255,0.9)",fontSize:"clamp(0.78rem,1.1vw,0.88rem)"}}>{cur.imageCaption}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.nav-img-panel{display:block!important}}`}</style>
      <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",padding:"0.85rem 2.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,flexWrap:"wrap",gap:"0.75rem",background:"rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",gap:"0.75rem"}}>
          {[{k:"FB",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
            <a key={k} href="#" style={{width:"clamp(26px,3.2vw,30px)",height:"clamp(26px,3.2vw,30px)",border:`1px solid rgba(255,255,255,0.4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"clamp(0.5rem,0.7vw,0.58rem)",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#fff";}}>{i}</a>
          ))}
        </div>
        <p style={{color:"rgba(255,255,255,0.8)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>Vipingo, Kilifi County, Kenya</p>
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
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"all 0.4s",background:scrolled?"rgba(255,255,255,0.97)":"transparent",backdropFilter:scrolled?"blur(10px)":"none",boxShadow:scrolled?"0 1px 0 #e8e6e3":"none",padding:scrolled?"0.7rem 0":"clamp(0.8rem,2vw,1.2rem) 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem"}}>
        <a href="/granada-school" style={{textDecoration:"none"}}><Image src={scrolled ? "/g-school.svg" : "/g-school-dark.svg"} alt="Granada School" width={110} height={44} style={{height:"auto",width:"clamp(50px,8vw,110px)"}} priority/></a>
        <div style={{display:"flex",alignItems:"center",gap:"1.5rem",flex:1,justifyContent:"flex-end"}}>
          <div style={{display:"none",gap:"1.25rem",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-school#contact"},{l:"Enquire",h:"/granada-school/contact"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-school/admissions#process" className="btn-green" style={{fontSize:"clamp(0.56rem,0.8vw,0.65rem)",padding:"0.5rem 1.2rem"}}>Apply Now</a>
          </div>
          <button onClick={()=>setOpen(true)} style={{background:"none",border:`1px solid ${scrolled?"rgba(33,53,88,0.35)":"rgba(255,255,255,0.5)"}`,cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:"0.5rem 0.6rem",transition:"border-color 0.3s"}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.borderColor=scrolled?"rgba(33,53,88,0.35)":"rgba(255,255,255,0.5)")}>
            <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block"}}/>
            <span style={{width:21,height:1.5,background:scrolled?"var(--primary)":"#fff",display:"block"}}/>
            <span style={{width:13,height:1.5,background:"var(--secondary)",display:"block"}}/>
          </button>
          <style>{`@media(min-width:768px){.nav-quick{display:flex!important}}`}</style>
        </div>
      </div>
    </header>
  </>);
}

function useInView(threshold=0.1){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── SECTION DATA ──────────────────────────────────────────────────────────────────── */
const PAGE_SECTIONS = [
  {label:"Featured Story",          id:"featured"},
  {label:"All News",                id:"all-news"},
  {label:"Events",                  id:"events"},
  {label:"Newsletters",             id:"newsletters"},
];
const BASE_PATH = "/granada-school/news";

function PageHero(){
  const params = useParams();
  const activeSection = params.section as string;
  const sectionLabel = PAGE_SECTIONS.find(s=>s.id===activeSection)?.label || "Featured Story";

  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building2.jpeg)",backgroundSize:"cover",backgroundPosition:"center",animation:"kbNews 14s ease-in-out infinite alternate"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(13,12,13,0.82) 0%,rgba(33,53,88,0.65) 55%,rgba(13,12,13,0.45) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.6) 0%,transparent 50%)"}}/>
      <div style={{position:"absolute",top:"15%",right:"6%",width:"clamp(120px,18vw,220px)",height:"clamp(120px,18vw,220px)",transform:"rotate(25deg)",border:"1px solid rgba(170,194,12,0.2)",animation:"spinN 28s linear infinite",opacity:0.6}}/>
      <div style={{position:"absolute",bottom:"18%",left:"4%",width:"clamp(60px,9vw,110px)",height:"clamp(60px,9vw,110px)",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",animation:"spinN 16s linear infinite reverse"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",paddingBottom:"clamp(6rem,4vw,8rem)"}} className="hero-inner">
        <div style={{flex:1}}/>
        <div style={{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"1.1rem",opacity:loaded?1:0,transition:"all 0.7s ease 0.2s",flexWrap:"wrap"}}>
          {[{label:"Granada",href:"/"},{label:"CBE",href:"/granada-school"},{label:"News",href:"/granada-school/news"}].map((bc,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
              <a href={bc.href} style={{color:"rgba(255,255,255,0.55)",textDecoration:"none",fontSize:"clamp(0.58rem,0.85vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.55)")}>{bc.label}</a>
              <span style={{color:"var(--secondary)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>›</span>
            </span>
          ))}
          <span style={{color:"#fff",fontSize:"clamp(0.58rem,0.85vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>{sectionLabel}</span>
        </div>
        <div style={{display:"flex",alignItems:"flex-end",gap:"clamp(2rem,4vw,3.5rem)"}} className="hero-content">
          <div style={{flex:1,minWidth:280}}>
            <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.28em",fontSize:"clamp(0.55rem,0.78vw,0.62rem)",fontWeight:700,marginBottom:"0.55rem",opacity:loaded?1:0,transition:"all 0.7s ease 0.3s"}}>Stories, Events & Updates</p>
            <h1 className="font-display" style={{fontSize:"clamp(2.4rem,5.5vw,4.8rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all 0.8s ease 0.4s"}}>
              Granada School<br/><span style={{color:"var(--accent-light)"}}>Our Stories</span>
            </h1>
            <div style={{width:50,height:2,background:"var(--secondary)",marginBottom:"1.1rem",opacity:loaded?1:0,transition:"all 0.8s ease 0.5s"}}/>
            <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.84rem,1.2vw,1rem)",fontWeight:300,maxWidth:480,lineHeight:1.82,opacity:loaded?1:0,transition:"all 0.8s ease 0.55s"}}>
              Stay updated with the latest news, events, achievements, and stories from the Granada family.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"0.9rem",flexShrink:0,opacity:loaded?1:0,transition:"opacity 0.9s ease 0.7s"}}>
            <a href="#featured" className="btn-green" style={{fontSize:"clamp(0.62rem,0.88vw,0.7rem)",padding:"0.75rem 2rem",textAlign:"center"}}>Latest News</a>
            <a href="#events" style={{display:"inline-block",padding:"0.75rem 2rem",background:"transparent",border:"1px solid rgba(255,255,255,0.6)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s",textAlign:"center"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
              Events Calendar
            </a>
          </div>
        </div>
      </div>

      <style>{`@keyframes kbNews{0%{transform:scale(1)}100%{transform:scale(1.06)}}@keyframes spinN{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}

const ARTICLES=[
  {
    category:"Academic",
    date:"March 2025",
    title:"Granada Girls Excel in CBE National Assessment",
    excerpt:"Our students demonstrated outstanding performance in this year's national Competency-Based Education assessments, with over 85% achieving marks in the top tier. We celebrate the dedication of our learners and the guidance of our teachers.",
    img:"/class.jpeg",
    color:"#213558",
    featured:true,
  },
  {
    category:"Sports",
    date:"February 2025",
    title:"Granada Eagles Win Regional Athletics Championship",
    excerpt:"The Granada School athletics team brought home the regional trophy after a stellar performance across track and field events, showcasing the school's growing strength in sports.",
    img:"/sports.jpeg",
    color:"#c0180b",
    featured:false,
  },
  {
    category:"Community",
    date:"January 2025",
    title:"Boarding Students Launch 'Girls Code' Initiative",
    excerpt:"Our senior boarding students launched an inspiring initiative to teach coding and digital literacy to girls in surrounding primary schools — embodying our values of kindness and global citizenship.",
    img:"/sports2.jpeg",
    color:"#4a6428",
    featured:false,
  },
  {
    category:"Arts",
    date:"December 2024",
    title:"Annual Granada Arts Festival Celebrates Student Talent",
    excerpt:"Hundreds gathered for the much-anticipated Granada Arts Festival — a showcase of music, drama, visual arts, and spoken word that left the audience in awe of our students' exceptional creativity.",
    img:"/dorm.jpeg",
    color:"#483454",
    featured:false,
  },
  {
    category:"Leadership",
    date:"November 2024",
    title:"New Student Council Inaugurated with Vision for Change",
    excerpt:"Granada's new Student Council was officially inaugurated in a moving ceremony. Council President Faith Wanjiku outlined ambitious plans for student welfare, sustainability, and community engagement.",
    img:"/staffroom.jpeg",
    color:"#ebae1b",
    featured:false,
  },
  {
    category:"Pastoral",
    date:"October 2024",
    title:"Wellbeing Week: 'Every Girl Matters' Campaign",
    excerpt:"Granada's first annual Wellbeing Week brought together counsellors, teachers, and students in a celebration of mental health awareness, emotional intelligence, and the strength of sisterhood.",
    img:"/building.jpeg",
    color:"#84b7c8",
    featured:false,
  },
];

function FeaturedStory(){
  const {ref,vis}=useInView(0.07);
  const featured=ARTICLES.find(a=>a.featured)!;
  return(
    <section id="featured" ref={ref} className="section-cream" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"clamp(1.5rem,3vw,2.5rem)",flexWrap:"wrap",gap:"1rem",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <div>
            <p className="label-tag">Featured Story</p>
            <h2 className="section-heading" style={{marginBottom:0}}>In the <em>Spotlight</em></h2>
          </div>
          <a href="#all-news" style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"var(--primary)",textDecoration:"none",fontSize:"clamp(0.66rem,0.92vw,0.74rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700,transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="var(--secondary)")} onMouseLeave={e=>(e.currentTarget.style.color="var(--primary)")}>
            All Stories <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div style={{overflow:"hidden",opacity:vis?1:0,transition:"all 0.9s ease 0.1s"}}>
          <div className="img-hover section-float-img" style={{float:"left",margin:"0 1.5rem 1.2rem 0",width:"clamp(280px,38vw,420px)",overflow:"hidden",minHeight:"clamp(260px,38vw,460px)",position:"relative"}}>
            <img src={featured.img} alt={featured.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,rgba(13,12,13,0.75) 0%,transparent 55%)`}}/>
            <div style={{position:"absolute",top:"1.5rem",left:"1.5rem"}}>
              <span style={{background:featured.color,color:"#fff",fontSize:"clamp(0.55rem,0.78vw,0.62rem)",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"0.3rem 0.9rem"}}>{featured.category}</span>
            </div>
          </div>
          <div style={{padding:"clamp(1.5rem,3vw,3rem)"}}>
            <p style={{color:"var(--muted)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}}>{featured.date}</p>
            <h3 className="font-display" style={{fontSize:"clamp(1.3rem,2.2vw,2rem)",fontWeight:500,color:"var(--primary)",marginBottom:"0.9rem",lineHeight:1.2}}>{featured.title}</h3>
            <p className="body-text" style={{marginBottom:"1.5rem"}}>{featured.excerpt}</p>
            <a href="#" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",color:"var(--primary)",textDecoration:"none",fontSize:"clamp(0.66rem,0.92vw,0.74rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700,borderBottom:"1px solid transparent",paddingBottom:"2px",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.color="var(--secondary)";e.currentTarget.style.borderBottomColor="var(--secondary)";}} onMouseLeave={e=>{e.currentTarget.style.color="var(--primary)";e.currentTarget.style.borderBottomColor="transparent";}}>
              Read full story <svg width="14" height="9" viewBox="0 0 14 9" fill="none"><path d="M1 4.5h12M8 1l4.5 3.5L8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

function NewsGrid(){
  const {ref,vis}=useInView(0.06);
  const rest=ARTICLES.filter(a=>!a.featured);
  return(
    <section id="all-news" ref={ref} className="section-cream" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"clamp(1.5rem,3vw,2.5rem)",flexWrap:"wrap",gap:"1rem",opacity:vis?1:0,transition:"all 0.8s ease"}}>
          <div>
            <p className="label-tag">School News</p>
            <h2 className="section-heading" style={{marginBottom:0}}>Latest <em>Stories</em></h2>
          </div>
          <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
            {["All","Academic","Sports","Arts","Community","Leadership","Pastoral"].map((cat,i)=>(
              <button key={i} style={{padding:"0.3rem 0.9rem",border:"1px solid rgba(33,53,88,0.3)",background:i===0?"var(--primary)":"transparent",color:i===0?"#fff":"var(--primary)",fontSize:"clamp(0.56rem,0.8vw,0.65rem)",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:600,fontFamily:"inherit",transition:"all 0.25s"}}
                onMouseEnter={e=>{if(i!==0){e.currentTarget.style.background="var(--primary)";e.currentTarget.style.color="#fff";}}} onMouseLeave={e=>{if(i!==0){e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--primary)";}}}>{cat}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,1.5vw,1.5rem)"}} className="news-grid">
          {rest.map((a,i)=>(
            <article key={i} style={{background:"#fff",overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)",opacity:vis?1:0,transform:vis?"none":`translateY(${18+i*5}px)`,transition:`all 0.8s ease ${i*0.1}s`}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 38px ${a.color}15`;e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
              <div className="img-hover" style={{minHeight:"clamp(180px,20vw,220px)",height:"100%",overflow:"hidden",position:"relative"}}>
                <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,${a.color}55,transparent 65%)`}}/>
                <span style={{position:"absolute",top:"0.9rem",left:"0.9rem",background:a.color,color:"#fff",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"0.28rem 0.75rem"}}>{a.category}</span>
              </div>
              <div style={{padding:"clamp(1rem,1.5vw,1.5rem)"}}>
                <p style={{color:"var(--muted)",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.4rem"}}>{a.date}</p>
                <h3 style={{fontSize:"clamp(0.88rem,1.2vw,1.02rem)",fontWeight:700,color:"var(--body-text)",marginBottom:"0.5rem",lineHeight:1.35}}>{a.title}</h3>
                <p className="body-text" style={{fontSize:"clamp(0.76rem,0.9vw,0.83rem)",marginBottom:"0.9rem",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{a.excerpt}</p>
                <a href="#" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",color:a.color,textDecoration:"none",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700,transition:"opacity 0.2s"}}
                  onMouseEnter={e=>(e.currentTarget.style.opacity="0.7")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>
                  Read More <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 4h10M7 1l3.5 3L7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:600px){.news-grid{grid-template-columns:1fr 1fr!important}}@media(min-width:1024px){.news-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </section>
  );
}

const EVENTS=[
  {month:"APR",day:"12",title:"Term 2 Begin",desc:"All boarding students report for the start of Term 2."},
  {month:"APR",day:"25",title:"Inter-House Sports Day",desc:"Annual sports competition between the four school houses."},
  {month:"MAY",day:"10",title:"Parent Open Day",desc:"Parents are invited to visit the school and meet teachers."},
  {month:"MAY",day:"22",title:"Drama Festival",desc:"Granada Drama Club performs their annual play."},
  {month:"JUN",day:"5",title:"World Environment Day",desc:"Students lead school-wide environmental conservation activities."},
  {month:"JUL",day:"2",title:"End of Term 2 Exams",desc:"Final examinations for Term 2 begin for all classes."},
];

function EventsCalendar(){
  const {ref,vis}=useInView(0.07);
  return(
    <section id="events" ref={ref} className="section-blue" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(2rem,3.5vw,3rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Coming Up</p>
          <h2 className="section-heading">Events <em>Calendar</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(0.8rem,1.2vw,1rem)"}} className="events-grid">
          {EVENTS.map((ev,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.75rem)",padding:"clamp(1rem,1.5vw,1.25rem)",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",transition:"all 0.3s",opacity:vis?1:0,transform:vis?"none":`translateX(${i%2===0?-18:18}px)`,transitionDelay:`${i*0.07}s`}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.13)";e.currentTarget.style.borderColor="rgba(170,194,12,0.35)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}>
              <div style={{background:"var(--secondary)",padding:"clamp(0.6rem,1vw,0.9rem) clamp(0.7rem,1.2vw,1rem)",textAlign:"center",flexShrink:0,minWidth:"clamp(50px,6vw,68px)"}}>
                <p style={{color:"var(--primary)",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>{ev.month}</p>
                <p className="font-display" style={{color:"var(--primary)",fontSize:"clamp(1.4rem,2.2vw,1.9rem)",fontWeight:700,lineHeight:1}}>{ev.day}</p>
              </div>
              <div style={{flex:1}}>
                <p style={{color:"#fff",fontSize:"clamp(0.85rem,1.1vw,0.98rem)",fontWeight:700,marginBottom:"0.25rem"}}>{ev.title}</p>
                <p style={{color:"rgba(255,255,255,0.68)",fontSize:"clamp(0.72rem,0.88vw,0.8rem)",lineHeight:1.55}}>{ev.desc}</p>
              </div>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" style={{flexShrink:0,opacity:0.5}}><path d="M1 1l6 5-6 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:768px){.events-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

function Newsletters(){
  const {ref,vis}=useInView(0.08);
  const issues=[
    {title:"Granada Gazette – Term 1, 2025",date:"March 2025",desc:"Highlights: CBE Assessments, New Boarding Wing Opening, Sports Day Results, Principal's Address."},
    {title:"Granada Gazette – Term 3, 2024",date:"December 2024",desc:"Highlights: Arts Festival Recap, Student Council Elections, Community Service Showcase, Year-End Celebrations."},
    {title:"Granada Gazette – Term 2, 2024",date:"August 2024",desc:"Highlights: Science Fair, Drama Production, Sports Championships, Teacher Spotlights."},
  ];
  return(
    <section id="newsletters" ref={ref} className="section-cream" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,4rem)",alignItems:"center"}} className="nl-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">Stay In Touch</p>
          <h2 className="section-heading">The Granada <em>Gazette</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"1.5rem"}}>
            Our school newsletter — the Granada Gazette — keeps parents, students, and the community informed and connected. Published every term, it captures our stories, achievements, and upcoming events.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
            {issues.map((nl,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",padding:"1rem",border:"1px solid rgba(33,53,88,0.15)",background:"#fff",transition:"all 0.3s",cursor:"pointer",opacity:vis?1:0,transform:vis?"none":"translateX(-16px)",transitionDelay:`${0.2+i*0.1}s`}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--primary)";e.currentTarget.style.background="rgba(33,53,88,0.03)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(33,53,88,0.15)";e.currentTarget.style.background="#fff";}}>
                <div style={{width:44,height:44,background:"var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><path d="M10 1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-6z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 1v6h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="5" y1="12" x2="13" y2="12" stroke="white" strokeWidth="1.4" strokeLinecap="round"/><line x1="5" y1="15" x2="10" y2="15" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:"clamp(0.78rem,1vw,0.88rem)",fontWeight:700,color:"var(--body-text)",marginBottom:"0.15rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{nl.title}</p>
                  <p style={{fontSize:"clamp(0.65rem,0.9vw,0.72rem)",color:"var(--muted)"}}>{nl.date}</p>
                </div>
                <a href="#" style={{color:"var(--primary)",textDecoration:"none",fontSize:"clamp(0.58rem,0.85vw,0.68rem)",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",flexShrink:0}}>Download</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all 0.9s ease 0.2s"}}>
          <div style={{background:"var(--primary)",padding:"clamp(2rem,3.5vw,3.5rem)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-50,right:-50,width:200,height:200,borderRadius:"50%",background:"rgba(170,194,12,0.08)"}}/>
            <div style={{position:"absolute",bottom:-60,left:-40,width:160,height:160,borderRadius:"50%",background:"rgba(0,0,0,0.08)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <p style={{color:"var(--secondary)",fontSize:"clamp(0.52rem,0.75vw,0.6rem)",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"0.6rem"}}>Stay Connected</p>
              <h3 className="font-display" style={{color:"#fff",fontSize:"clamp(1.3rem,2vw,1.7rem)",marginBottom:"0.75rem"}}>Never miss a Granada story</h3>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.78rem,0.92vw,0.85rem)",lineHeight:1.7,marginBottom:"1.75rem"}}>Subscribe to the Granada Gazette and receive school news, event updates, and community stories directly to your inbox every term.</p>
              <div style={{display:"flex",flexDirection:"column",gap:"0.65rem"}}>
                <input type="email" placeholder="Your email address" style={{width:"100%",padding:"0.75rem 1rem",background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",fontSize:"clamp(0.76rem,1.05vw,0.85rem)",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                <button style={{width:"100%",padding:"0.8rem",background:"var(--secondary)",color:"var(--dark)",border:"none",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"background 0.25s"}}
                  onMouseEnter={e=>(e.currentTarget.style.background="#96ac0a")} onMouseLeave={e=>(e.currentTarget.style.background="var(--secondary)")}>
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.nl-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

function Footer(){
  return(
    <footer id="contact" className="section-blue" style={{padding:"clamp(3rem,4vw,4.5rem) clamp(1rem,2vw,2rem) clamp(1.2rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,3vw,3.5rem)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="footer-grid">
          <div>
            <a href="/granada-school" style={{textDecoration:"none"}}>
              <Image src="/g-school-dark.svg" alt="Granada School" width={190} height={90} style={{width:"clamp(140px,16vw,250px)",height:"auto",marginBottom:"0.75rem"}}/>
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
            {title:"Curriculum",links:["CBE Kenya","Early Years","Primary School","Junior School","Senior School"]},
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
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>© {new Date().getFullYear()} Granada School. All rights reserved.</p>
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

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(33,53,88,0.9)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:800,margin:"0 auto",textAlign:"center",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.9rem,1.5vw,1.4rem)"}}>Ready to Begin?</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
          Are you ready to feel the <span style={{color:"var(--accent-light)"}}>difference?</span>
        </h2>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          {["Enquire","Visit Granada","Apply Now"].map(l=>(
            <a key={l} href="/granada-school/admissions" style={{display:"inline-block",padding:"0.7rem 1.75rem",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,0.88vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s",fontFamily:"inherit"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>{l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── IN-PAGE SECTION NAV ───────────────────────────────────────────────────── */
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
        {[{label:"How to Apply",href:"/granada-school#admissions"},{label:"Visit Granada",href:"/granada-school/contact?type=visit"},{label:"Enquire Now",href:"/granada-school/contact"}].map((l,i)=>(
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

/* ── PAGE EXPORT ───────────────────────────────────────────────────────────── */
/* ── PAGE ───────────────────────────────────────────────────────────────────────── */
const SECTION_MAP: Record<string, () => React.ReactNode> = {
  "featured": () => <FeaturedStory/>,
  "all-news": () => <NewsGrid/>,
  "events": () => <EventsCalendar/>,
  "newsletters": () => <Newsletters/>,
};

export default function NewsPage(){
  const params = useParams();
  const section = (params.section as string) || "featured";
  const renderSection = SECTION_MAP[section] || SECTION_MAP["featured"];
  return(
    <>
      <Navbar/>
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
      <Footer/>
    </>
  );
}
