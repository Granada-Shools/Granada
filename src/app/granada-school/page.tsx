"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label:"About Us", href:"/granada-school/about",
    image:"/building.jpeg",
    imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[
      {label:"Principal's Welcome", href:"/granada-school/about#welcome"},
      {label:"Vision & Aims",       href:"/granada-school/about#vision"},
      {label:"Our Values",          href:"/granada-school/about#values"},
      {label:"Our Story",           href:"/granada-school/about#history"},
      {label:"Staff & Leadership",  href:"/granada-school/about#staff"},
      {label:"Location & Facilities",href:"/granada-school#campus"},
      {label:"Contact Us",          href:"/granada-school#contact"},
    ],
  },
  {
    label:"Admissions", href:"/granada-school/admissions",
    image:"/dorm.jpeg",
    imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[
      {label:"How to Apply",           href:"/granada-school/admissions#process"},
      {label:"Boarding Life",          href:"/granada-school/admissions#boarding"},
      {label:"Admissions Team",        href:"/granada-school/admissions#team"},
      {label:"Visit Granada",          href:"/granada-school/admissions#team"},
    ],
  },
  {
    label:"Academic", href:"/granada-school/academics",
    image:"/class.jpeg",
    imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[
      {label:"Overview",             href:"/granada-school/academics#overview"},
      {label:"CBC Curriculum",       href:"/granada-school/academics#cbc"},
      {label:"Junior School",        href:"/granada-school/academics#sections"},
      {label:"Senior School",        href:"/granada-school/academics#sections"},
    ],
  },
  {
    label:"Campus Life", href:"/granada-school/campus-life",
    image:"/sports.jpeg",
    imageCaption:"A Unique Blend of Growth + Community",
    children:[
      {label:"Modern Facilities",       href:"/granada-school/campus-life#facilities"},
      {label:"Sports & Athletics",      href:"/granada-school/campus-life#cocurricular"},
      {label:"Arts & Drama",            href:"/granada-school/campus-life#cocurricular"},
      {label:"Co-Curricular Activities",href:"/granada-school/campus-life#cocurricular"},
    ],
  },
  {
    label:"Pastoral & Wellbeing", href:"/granada-school/wellbeing",
    image:"/sports2.jpeg",
    imageCaption:"A Unique Blend of Care + Belonging",
    children:[
      {label:"Wellbeing Approach",  href:"/granada-school/wellbeing#approach"},
      {label:"Counselling Support", href:"/granada-school/wellbeing#counselling"},
      {label:"Character Education", href:"/granada-school/wellbeing#character"},
      {label:"Global Citizenship",  href:"/granada-school/wellbeing#global"},
    ],
  },
  {
    label:"Latest News", href:"/granada-school/news",
    image:"/building2.jpeg",
    imageCaption:"A Unique Blend of Stories + Achievements",
    children:[
      {label:"School News",     href:"/granada-school/news"},
      {label:"Events Calendar", href:"/granada-school/news#events"},
      {label:"Newsletters",     href:"/granada-school/news#newsletters"},
    ],
  },
  {
    label:"Parents", href:"/granada-school#contact",
    image:"/staffroom.jpeg",
    imageCaption:"A Unique Blend of Partnership + Trust",
    children:[
      {label:"Parent Portal",    href:"/granada-school#contact"},
      {label:"School Calendar",  href:"/granada-school#contact"},
      {label:"Term Dates",       href:"/granada-school#contact"},
      {label:"Reports & Policies",href:"/granada-school#contact"},
    ],
  },
  {
    label:"Support Us", href:"/granada-school#contact",
    image:"/art-room.jpeg",
    imageCaption:"A Unique Blend of Giving + Impact",
    children:[
      {label:"Bursaries & Scholarships",href:"/granada-school/admissions"},
      {label:"Donations",              href:"/granada-school#contact"},
      {label:"Community Partnerships", href:"/granada-school#contact"},
    ],
  },
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
      {/* Top bar */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(0.8rem,2vw,1.1rem) clamp(1.5rem,3vw,2.5rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",flexShrink:0,gap:"clamp(0.8rem,2vw,1.5rem)",background:"rgba(0,0,0,0.2)",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:"clamp(0.5rem,1.5vw,1.5rem)",alignItems:"center",flexWrap:"wrap",flex:1,minWidth:0}}>
          {[{label:"Parents",href:"/granada-school#contact"},{label:"Enquire",href:"/granada-school/admissions"},{label:"Contact us",href:"/granada-school#contact"}].map(l=>(
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
      {/* Body */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {/* Left list */}
        <div style={{width:"clamp(180px,25vw,260px)",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.1)",overflowY:"auto",padding:"clamp(1rem,2vw,1.5rem) 0",background:"rgba(0,0,0,0.2)",minHeight:0}}>
          {NAV_ITEMS.map((item,i)=>(
            <button key={item.label} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:active===i?"rgba(255,255,255,0.15)":"transparent",border:"none",borderLeft:active===i?`3px solid ${S}`:"3px solid transparent",padding:"clamp(0.65rem,1.5vw,0.85rem) clamp(1.1rem,2vw,1.5rem) clamp(0.65rem,1.5vw,0.85rem) clamp(1rem,2vw,1.35rem)",cursor:"pointer",textAlign:"left",transition:"all 0.2s",gap:"0.5rem"}}>
              <span style={{fontSize:"clamp(0.65rem,1.2vw,0.8rem)",fontWeight:active===i?700:400,letterSpacing:"0.06em",textTransform:"uppercase",color:active===i?S:"#fff",transition:"color 0.2s",fontFamily:"inherit",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.label}</span>
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none" style={{flexShrink:0,opacity:active===i?1:0.3}}><path d="M1 1l3 3.5L1 8" stroke={active===i?S:"#fff"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
        {/* Middle & Right panel - 3 column layout */}
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          {/* Middle column - Children links */}
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
                <a href="/granada-school/admissions" onClick={onClose} className="btn-solid" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Enquire</a>
                <a href="/granada-school/admissions#process" onClick={onClose} className="btn-outline" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
              </div>
            </div>
          </div>
          <div style={{width:"clamp(150px,20vw,320px)",flexShrink:0,position:"relative",overflow:"hidden",background:"#346988",display:"none"}}>
            {NAV_ITEMS.map((item,i)=>(
              <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${item.image})`,backgroundSize:"cover",backgroundPosition:"center",opacity:active===i?1:0,transition:"opacity 0.5s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(52,105,136,0.8) 0%,rgba(52,105,136,0.2) 60%)"}}/>
            <div style={{position:"absolute",bottom:"clamp(0.8rem,1.5vw,1.25rem)",left:"clamp(0.8rem,1.5vw,1.25rem)",right:"clamp(0.8rem,1.5vw,1.25rem)",zIndex:2}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",color:"rgba(255,255,255,0.9)",fontSize:"clamp(0.7rem,1.2vw,0.85rem)",fontStyle:"italic"}}>{cur.imageCaption}</p>
            </div>
          </div>
          <style>{`@media(min-width:768px){div[style*="background:#346988"]{display:block!important}}`}</style>
        </div>
      </div>
      {/* Footer */}
      <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",padding:"clamp(0.6rem,1.5vw,0.85rem) clamp(1.5rem,3vw,2.5rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,gap:"clamp(0.5rem,1vw,1rem)",flexWrap:"wrap",background:"rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",gap:"clamp(0.5rem,1vw,0.75rem)",alignItems:"center"}}>
          {[{k:"FB",i:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
            <a key={k} href="#" style={{width:"clamp(24px,4vw,28px)",height:"clamp(24px,4vw,28px)",border:`1px solid rgba(255,255,255,0.4)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"all 0.2s"}}
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
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"clamp(0.8rem,1.5vw,1rem)"}}>
        <a href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",minWidth:0}}>
          <Image src={scrolled ? "/School3.svg" : "/School3-dark.svg"} alt="Granada School" width={190} height={90} style={{height:"auto",width:"clamp(120px,18vw,250px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)",flexWrap:"wrap",justifyContent:"flex-end",flex:1}}>
          <div style={{display:"none",gap:"clamp(0.75rem,1.5vw,1.25rem)",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-school#contact"},{l:"Enquire",h:"/granada-school/admissions"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-school/admissions" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
          </div>
          <button onClick={()=>setOpen(true)} aria-label="Open menu"
            style={{background:"none",border:`1px solid ${scrolled?"rgba(52,105,136,0.35)":"rgba(255,255,255,0.5)"}`,cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:"0.5rem 0.6rem",transition:"border-color 0.3s",flexShrink:0}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.borderColor=scrolled?"rgba(52,105,136,0.35)":"rgba(255,255,255,0.5)")}>
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
function useInView(threshold=0.15){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── HERO ──────────────────────────────────────────────────────────────────── */
function Hero(){
  const slides=[
    {bg:"/building.jpeg",label:"Inspiring Excellence"},
    {bg:"/class.jpeg",label:"CBC & Edexcel"},
    {bg:"/sports.jpeg",label:"Vipingo, Kenya"},
    {bg:"/dorm.jpeg",label:"Values-Based Education"},
  ];
  const [active,setActive]=useState(0);
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{setLoaded(true);const t=setInterval(()=>setActive(a=>(a+1)%slides.length),5500);return()=>clearInterval(t);},[]);
  return(
    <section style={{position:"relative",height:"100vh",minHeight:600,overflow:"hidden"}}>
      {slides.map((s,i)=>(
        <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${s.bg})`,backgroundSize:"cover",backgroundPosition:"center",opacity:i===active?1:0,transition:"opacity 1.2s ease",animation:i===active?"kenBurns 10s ease-in-out infinite alternate":"none"}}/>
      ))}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(13,12,13,0.72) 35%,rgba(13,12,13,0.25) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.5) 0%,transparent 50%)"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",flexDirection:"column",justifyContent:"center",paddingTop:"clamp(60px,10vw,80px)"}}>
        <div style={{maxWidth:"clamp(280px,90vw,660px)",opacity:loaded?1:0,transition:"opacity 1s ease 0.2s"}}>
          <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.28em",fontSize:"clamp(0.5rem,1vw,0.65rem)",fontWeight:700,marginBottom:"clamp(0.8rem,1.5vw,1.1rem)"}}>CBE · Junior &amp; Senior · Girls' Boarding</p>
          <h1 className="font-display" style={{fontSize:"clamp(2rem,7vw,5.5rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.4rem"}}>Granada</h1>
          <h1 className="font-display" style={{fontSize:"clamp(2rem,7vw,5.5rem)",fontWeight:300,fontStyle:"italic",lineHeight:1.02,color:"var(--secondary)",marginBottom:"clamp(1.2rem,2vw,1.8rem)"}}>CBE School</h1>
          <div style={{width:"clamp(35px,5vw,50px)",height:2,background:"var(--secondary)",marginBottom:"clamp(1rem,1.5vw,1.5rem)"}}/>
          <p style={{fontSize:"clamp(0.85rem,1.5vw,1rem)",fontWeight:300,lineHeight:1.8,color:"rgba(255,255,255,0.85)",maxWidth:480,marginBottom:"clamp(1.8rem,2.5vw,2.5rem)"}}>
            Nurturing confident, disciplined, and high-achieving young women along Kenya's beautiful Vipingo coast — in a safe, structured girls' boarding environment.
          </p>
          <div style={{display:"flex",gap:"clamp(0.6rem,1.5vw,0.9rem)",flexWrap:"wrap"}}>
            <a href="/granada-school/about" className="btn-green" style={{fontSize:"clamp(0.6rem,1vw,0.68rem)",padding:"clamp(0.5rem,1vw,0.75rem) clamp(1.2rem,2vw,2rem)"}}>Discover More</a>
            <a href="/granada-school#admissions" style={{display:"inline-block",padding:"clamp(0.5rem,1vw,0.75rem) clamp(1.2rem,2vw,2rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.6)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.6rem,1vw,0.68rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
              Enquire Today
            </a>
          </div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:"clamp(1.5rem,2.5vw,2.5rem)",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"clamp(0.3rem,0.5vw,0.5rem)",zIndex:5}}>
        {slides.map((_,i)=>(
          <button key={i} onClick={()=>setActive(i)} style={{width:i===active?"clamp(20px,3vw,28px)":"clamp(5px,1vw,7px)",height:2,background:i===active?"var(--secondary)":"rgba(255,255,255,0.5)",border:"none",cursor:"pointer",transition:"all 0.4s",padding:0}}/>
        ))}
      </div>
    </section>
  );
}

/* ── TAGLINE STRIP ─────────────────────────────────────────────────────────── */
function TaglineStrip(){
  return(
    <div className="section-blue" style={{padding:"clamp(0.8rem,1.2vw,1.2rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"center",gap:"clamp(1.5rem,3vw,2.5rem)",flexWrap:"wrap",alignItems:"center"}}>
        {["Academic Excellence · CBE","Safe Girls' Boarding Environment","Holistic Character Formation","Every Learner Rises"].map((t,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:"clamp(0.6rem,1.2vw,1rem)"}}>
            <span className="font-display" style={{fontSize:"clamp(0.8rem,1.5vw,1rem)",fontStyle:"italic",fontWeight:400,color:"#fff",letterSpacing:"0.03em",whiteSpace:"nowrap"}}>{t}</span>
            {i<3&&<span style={{width:4,height:4,borderRadius:"50%",background:"var(--secondary)",flexShrink:0}}/>}
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
    <section className="section-cream" id="about" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,6rem)",alignItems:"center"}} className="welcome-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">Our Story</p>
          <h2 className="section-heading">A Unique Blend of <em>Discipline + Purpose</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"clamp(0.8rem,1.2vw,1.25rem)"}}>
            Located along Kenya's beautiful coast in Vipingo, Granada CBE Junior &amp; Senior Girls' Boarding Secondary School is dedicated to nurturing confident, disciplined, and high-achieving young women under the Competency-Based Education (CBE) framework.
          </p>
          <p className="body-text" style={{marginBottom:"clamp(0.8rem,1.2vw,1.25rem)"}}>
            Our boarding environment provides a safe, structured, and supportive space where learners grow academically, socially, emotionally, and spiritually — in a community built on sisterhood and shared values.
          </p>
          <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2rem)"}}>
            We believe every girl carries within her immense potential. Through quality education, structured boarding life, and a values-driven environment, we unlock that potential — raising learners who are academically strong, morally grounded, and ready to lead.
          </p>
          <div style={{display:"flex",gap:"clamp(0.5rem,1vw,0.75rem)",flexWrap:"wrap"}}>
            <a href="/granada-school/about" className="btn-solid" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>About Granada</a>
            <a href="/granada-school/about#vision" className="btn-outline" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>Our Vision</a>
          </div>
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"all 0.9s ease 0.15s",display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"clamp(200px,30vw,250px) clamp(140px,20vw,180px)",gap:"clamp(0.6rem,1vw,10px)",position:"relative"}}>
          {[
            {src:"/building.jpeg",col:"1/2",row:"1/2"},
            {src:"/class.jpeg",col:"2/3",row:"1/3"},
            {src:"/sports.jpeg",col:"1/2",row:"2/3"},
          ].map((img,i)=>(
            <div key={i} className="img-hover" style={{gridColumn:img.col,gridRow:img.row,overflow:"hidden",position:"relative"}}>
              <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(52,105,136,0.3),transparent 60%)"}}/>
            </div>
          ))}
          <div style={{position:"absolute",bottom:"-16px",left:"-16px",width:90,height:90,background:"var(--secondary)",opacity:0.18,zIndex:-1,display:"none"}} className="welcome-accent"/>
        </div>
      </div>
      <style>{`@media(min-width:768px){.welcome-grid{grid-template-columns:1fr 1fr!important}.welcome-accent{display:block!important}}`}</style>
    </section>
  );
}

/* ── CURRICULUM ────────────────────────────────────────────────────────────── */
function Curriculum(){
  const {ref,vis}=useInView(0.1);
  const curricula=[
    {title:"CBC",subtitle:"Competency Based Curriculum",desc:"Kenya's national framework building strong local foundations, nurturing 21st-century skills through competency-driven, holistic learning.",color:"var(--primary)",border:"rgba(52,105,136,0.2)",features:["Holistic Development","Local Relevance","Values-Based Learning","STEM Integration"]},
    {title:"Boarding",subtitle:"Structured Boarding Programme",desc:"A secure home-away-from-home with trained matrons, supervised prep sessions, nutritious meals, counselling support, and a strong sisterhood community.",color:"var(--accent-warm)",border:"rgba(147,108,81,0.2)",features:["Safe Supervised Dormitories","Structured Prep Sessions","Pastoral Care & Counselling","Balanced Meals & Routines"]},
  ];
  return(
    <section className="section-cream" id="curriculum" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(2rem,3.5vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Academic Pathways</p>
          <h2 className="section-heading">CBE Curriculum. <em>World-Class Standards.</em></h2>
          <p className="body-text" style={{maxWidth:540,margin:"clamp(0.8rem,1.5vw,1.25rem) auto 0"}}>Granada implements Kenya's Competency-Based Education framework with a focus on mastery, critical thinking, and real-world application — preparing every learner for a dynamic future.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.2rem,2vw,1.75rem)"}} className="curriculum-grid">
          {curricula.map((c,i)=>(
            <div key={i} style={{border:`1px solid ${c.border}`,padding:"clamp(1.5rem,2.5vw,2.5rem)",position:"relative",overflow:"hidden",background:"#fff",opacity:vis?1:0,transform:vis?"none":"translateY(36px)",transition:`all 0.9s ease ${i*0.15}s`}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:c.color}}/>
              <div style={{position:"absolute",bottom:-50,right:-20,width:140,height:140,borderRadius:"50%",background:c.color,opacity:0.05}}/>
              <h3 className="font-display" style={{fontSize:"clamp(2rem,3vw,2.8rem)",fontWeight:700,color:c.color,lineHeight:1,marginBottom:"clamp(0.2rem,0.5vw,0.35rem)"}}>{c.title}</h3>
              <p style={{fontSize:"clamp(0.6rem,0.8vw,0.68rem)",textTransform:"uppercase",letterSpacing:"0.2em",fontWeight:700,color:"var(--muted)",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)"}}>{c.subtitle}</p>
              <p className="body-text" style={{marginBottom:"clamp(1.2rem,1.75vw,1.75rem)",fontSize:"clamp(0.85rem,1vw,1rem)"}}>{c.desc}</p>
              <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:"clamp(0.3rem,0.6vw,0.5rem)"}}>
                {c.features.map((f,j)=>(
                  <li key={j} style={{display:"flex",alignItems:"center",gap:"clamp(0.5rem,0.8vw,0.7rem)",color:"var(--body-text)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)"}}>
                    <span style={{width:6,height:6,background:c.color,flexShrink:0}}/>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:768px){.curriculum-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── PILLARS (blue bg) ─────────────────────────────────────────────────────── */
function Pillars(){
  const {ref,vis}=useInView(0.1);
  const items=[
    {title:"Modern Learning Environments",desc:"Purpose-built classrooms, labs, and creative spaces designed to inspire curiosity and collaborative learning.",img:"/class.jpeg",tag:"Facilities"},
    {title:"Dedicated Educators",desc:"Passionate, qualified teachers committed to every learner's journey — inside and outside the classroom.",img:"/staffroom.jpeg",tag:"Teaching"},
    {title:"Supportive Community",desc:"A warm, inclusive culture where every student feels seen, valued, and empowered to thrive.",img:"/dorm.jpeg",tag:"Wellbeing"},
  ];
  return(
    <section className="section-blue" id="campus" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(2rem,3vw,3rem)",flexWrap:"wrap",gap:"clamp(1rem,1.5vw,2rem)"}}>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.8s ease"}}>
            <p className="label-tag">What Sets Us Apart</p>
            <h2 className="section-heading">Excellence in <em>Every Detail</em></h2>
          </div>
          <a href="/granada-school/about" className="btn-outline" style={{opacity:vis?1:0,transition:"opacity 0.8s ease 0.3s",borderColor:"rgba(255,255,255,0.5)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
            Learn More
          </a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,1.5vw,1.25rem)",minHeight:0}} className="pillars-grid">
          {items.map((item,i)=>(
            <div key={i} className="img-hover" style={{position:"relative",height:"clamp(280px,50vw,460px)",overflow:"hidden",opacity:vis?1:0,transform:vis?"none":"translateY(40px)",transition:`all 0.9s ease ${i*0.12}s`}}>
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
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(52,105,136,0.88)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",fontWeight:700,marginBottom:"clamp(1.2rem,1.75vw,1.75rem)"}}>Our Mission</p>
        <blockquote className="font-display" style={{fontSize:"clamp(1.2rem,3.5vw,2.6rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.45,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
          "We are committed to inspiring excellence and preparing learners for a successful future — today, tomorrow, and beyond."
        </blockquote>
        <div style={{width:"clamp(32px,4vw,44px)",height:2,background:"var(--secondary)",margin:"0 auto clamp(1.2rem,1.75vw,1.75rem)"}}/>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:500}}>
          Granada CBE Junior &amp; Senior Girls' Boarding Secondary School — Vipingo, Kenya
        </p>
      </div>
    </section>
  );
}

/* ── COMMUNITY (white bg) ──────────────────────────────────────────────────── */
function Community(){
  const {ref,vis}=useInView(0.1);
  return(
    <section className="section-cream" id="community" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,6rem)",alignItems:"center"}} className="community-grid">
        <div style={{position:"relative",height:"clamp(300px,40vw,540px)",opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease",order:1}} className="community-image">
          <div className="img-hover" style={{position:"absolute",top:0,left:0,width:"70%",height:"58%",overflow:"hidden"}}>
            <img src="/building.jpeg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <div className="img-hover" style={{position:"absolute",bottom:0,right:0,width:"66%",height:"54%",overflow:"hidden"}}>
            <img src="/building2.jpeg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <div style={{position:"absolute",top:"43%",left:"47%",transform:"translate(-50%,-50%)",background:"var(--primary)",padding:"clamp(1rem,1.5vw,1.4rem) clamp(1.4rem,1.8vw,1.8rem)",textAlign:"center",zIndex:5,minWidth:150}}>
            <div className="font-display" style={{fontSize:"clamp(1.8rem,2.5vw,2.4rem)",fontWeight:600,color:"#fff",lineHeight:1}}>2</div>
            <div style={{fontSize:"clamp(0.5rem,0.7vw,0.6rem)",letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--secondary)",marginTop:5,fontWeight:700}}>Curricula Offered</div>
          </div>
        </div>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(30px)",transition:"all 0.9s ease 0.2s"}}>
          <p className="label-tag">Girls' Boarding Community</p>
          <h2 className="section-heading">A Transformative <em>Girls' Education</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"clamp(0.8rem,1.2vw,1.25rem)"}}>With modern learning environments, dedicated educators, and a safe structured boarding programme, Granada gives every girl the foundation she needs to thrive academically and personally.</p>
          <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>We raise confident, morally grounded, and academically strong young women who are prepared to make their mark in a rapidly changing world.</p>
          <div style={{display:"flex",flexDirection:"column",gap:"clamp(0.6rem,1vw,0.85rem)",marginBottom:"clamp(1.5rem,2vw,2.25rem)"}}>
            {["Values-Based CBE Education","Safe Girls' Boarding Environment","Leadership & Character Formation","Holistic Wellbeing"].map((pt,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"clamp(0.6rem,1.2vw,0.9rem)"}}>
                <div style={{width:`clamp(20px,2.5vw,26px)`,height:`clamp(20px,2.5vw,26px)`,border:"1px solid var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:"var(--primary)",fontSize:"clamp(0.5rem,0.7vw,0.65rem)"}}>✓</span>
                </div>
                <span style={{color:"var(--body-text)",fontSize:"clamp(0.78rem,0.95vw,0.84rem)",fontWeight:500}}>{pt}</span>
              </div>
            ))}
          </div>
          <a href="/granada-school/about" className="btn-solid" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>Begin Your Journey</a>
        </div>
      </div>
      <style>{`@media(min-width:768px){.community-grid{grid-template-columns:1fr 1fr!important}.community-image{order:0!important}}`}</style>
    </section>
  );
}

/* ── ADMISSIONS CTA (blue) ─────────────────────────────────────────────────── */
function AdmissionsCTA(){
  const {ref,vis}=useInView(0.2);
  return(
    <section className="section-blue" id="admissions" ref={ref} style={{padding:"clamp(3.5rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:860,margin:"0 auto",textAlign:"center",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease"}}>
        <p className="label-tag">Are you ready?</p>
        <h2 className="section-heading">Begin Your <em>Granada Story</em></h2>
        <p className="body-text" style={{maxWidth:520,margin:"clamp(0.8rem,1.5vw,1.25rem) auto clamp(1.5rem,2.5vw,2.5rem)",fontSize:"clamp(0.9rem,1vw,1.05rem)"}}>Join a community of passionate learners, dedicated educators, and caring families at Granada CBE Junior &amp; Senior Girls' Boarding Secondary School — on Kenya's breathtaking Vipingo coast.</p>
        <div style={{display:"flex",justifyContent:"center",gap:"clamp(0.6rem,1.2vw,1rem)",flexWrap:"wrap"}}>
          <a href="/granada-school#contact" className="btn-solid" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>Enquire Now</a>
          <a href="/granada-school/admissions#team" className="btn-outline" style={{borderColor:"rgba(255,255,255,0.55)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>Book a Visit</a>
          <a href="/granada-school/admissions#process" className="btn-outline" style={{borderColor:"rgba(255,255,255,0.55)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>Apply</a>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ────────────────────────────────────────────────────────────────── */
function Footer(){
  return(
    <footer id="contact" style={{background:"var(--primary-dark)",color:"#fff",padding:"clamp(3rem,4vw,5rem) clamp(1rem,2vw,2rem) clamp(1.2rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,3vw,4rem)",marginBottom:"clamp(2rem,3vw,3.5rem)"}} className="footer-cols">
          <div>
            <a href="/granada-school" style={{textDecoration:"none"}}>
              <Image src="/School3-dark.svg" alt="Granada School" width={190} height={90} style={{width:"clamp(140px,16vw,250px)",height:"auto",marginBottom:"0.75rem"}}/>
            </a>
            <p style={{color:"rgba(255,255,255,0.65)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)",lineHeight:1.8,maxWidth:260,marginTop:"clamp(0.8rem,1.2vw,1.25rem)"}}>CBE Junior &amp; Senior Girls' Boarding Secondary School.</p>
            <div style={{display:"flex",gap:"clamp(0.4rem,0.8vw,0.65rem)",marginTop:"clamp(0.9rem,1.2vw,1.4rem)"}}>
              {[{k:"FB",i:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
                <a key={k} href="#" style={{width:"clamp(28px,3.5vw,32px)",height:"clamp(28px,3.5vw,32px)",border:"1px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.8)",textDecoration:"none",transition:"all 0.2s",flexShrink:0}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.8)"}}>{i}</a>
              ))}
            </div>
          </div>
          {[
            {title:"School",links:["About Us","Academic Life","Admissions","Curriculum","Campus Life","Our Team"]},
            {title:"Curriculum",links:["CBC Kenya","British Edexcel","Early Years","Primary School","Junior School","Senior School"]},
            {title:"Contact Us",links:null,contact:true},
          ].map((col,i)=>(
            <div key={i}>
              <h4 style={{fontSize:"clamp(0.55rem,0.75vw,0.62rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"clamp(0.9rem,1.2vw,1.4rem)"}}>{col.title}</h4>
              {col.links?(
                <>
                  {col.links.map(l=>(
                    <a key={l} href="#" style={{display:"block",color:"rgba(255,255,255,0.65)",fontSize:"clamp(0.7rem,0.9vw,0.8rem)",textDecoration:"none",marginBottom:"clamp(0.5rem,0.8vw,0.7rem)",transition:"color 0.2s"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.65)")}>{l}</a>
                  ))}
                </>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:"clamp(0.6rem,1vw,0.9rem)"}}>
                  <div>
                    <p style={{color:"rgba(255,255,255,0.5)",fontSize:"clamp(0.6rem,0.7vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Christopher Sabwa – Director</p>
                    <a href="tel:+254714848289" style={{color:"#fff",fontSize:"clamp(0.7rem,0.9vw,0.8rem)",textDecoration:"none"}}>+254 714 848 289</a>
                  </div>
                  <div>
                    <p style={{color:"rgba(255,255,255,0.5)",fontSize:"clamp(0.6rem,0.7vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Asya Adan – Officer</p>
                    <a href="tel:+254717682138" style={{color:"#fff",fontSize:"clamp(0.7rem,0.9vw,0.8rem)",textDecoration:"none"}}>+254 717 682 138</a>
                  </div>
                  <div>
                    <p style={{color:"rgba(255,255,255,0.5)",fontSize:"clamp(0.6rem,0.7vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Email</p>
                    <a href="mailto:admissions@granadaschools.group" style={{color:"var(--secondary)",fontSize:"clamp(0.65rem,0.85vw,0.75rem)",textDecoration:"none",wordBreak:"break-all"}}>admissions@granadaschools.group</a>
                  </div>
                  <div>
                    <p style={{color:"rgba(255,255,255,0.5)",fontSize:"clamp(0.6rem,0.7vw,0.68rem)",marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Address</p>
                    <p style={{color:"#fff",fontSize:"clamp(0.7rem,0.9vw,0.8rem)",lineHeight:1.6}}>Vipingo, Kilifi County<br/>Kenya Coast</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.12)",paddingTop:"clamp(1.2rem,1.5vw,1.75rem)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"clamp(0.8rem,1.5vw,1rem)"}}>
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.65rem,0.8vw,0.72rem)"}}>© {new Date().getFullYear()} Granada School. All rights reserved.</p>
          <div style={{display:"flex",gap:"clamp(1rem,1.5vw,1.75rem)",flexWrap:"wrap"}}>
            {["Privacy Policy","Terms of Use","Safeguarding"].map(l=>(
              <a key={l} href="#" style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.6rem,0.8vw,0.68rem)",textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`footer>div>div:first-child{grid-template-columns:1fr}@media(min-width:640px){footer>div>div:first-child{grid-template-columns:1fr 1fr 1fr 1fr!important}}.vision-grid{grid-template-columns:1fr}@media(min-width:640px){.vision-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </footer>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────────────── */
export default function Home(){
  return(<>
    <Navbar/>
    <Hero/>
    <TaglineStrip/>
    <Welcome/>
    <Curriculum/>
    <Pillars/>
    <QuoteBanner/>
    <Community/>
    <AdmissionsCTA/>
    <Footer/>
  </>);
}
