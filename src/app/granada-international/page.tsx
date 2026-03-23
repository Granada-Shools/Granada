"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label:"About Us", href:"/granada-international/about",
    image:"/building.jpeg",
    imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[
      {label:"Principal's Welcome",   href:"/granada-international/about#welcome"},
      {label:"Vision & Aims",         href:"/granada-international/about#vision"},
      {label:"Our Values",            href:"/granada-international/about#values"},
      {label:"Our Story",             href:"/granada-international/about#history"},
      {label:"Boarding",              href:"/granada-international/about#boarding"},
      {label:"Staff & Leadership",    href:"/granada-international/about#staff"},
      {label:"Contact Us",            href:"/granada-international#contact"},
    ],
  },
  {
    label:"Admissions", href:"/granada-international/admissions",
    image:"/dorm.jpeg",
    imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[
      {label:"How to Apply",            href:"/granada-international/admissions#process"},
      {label:"KG–Year 9",               href:"/granada-international/admissions#process"},
      {label:"Senior School",           href:"/granada-international/admissions#senior-process"},
      {label:"Admissions Team",         href:"/granada-international/admissions#team"},
    ],
  },
  {
    label:"Academic", href:"/granada-international/academics",
    image:"/class.jpeg",
    imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[
      {label:"Overview",               href:"/granada-international/academics#overview"},
      {label:"Edexcel Curriculum",     href:"/granada-international/academics#edexcel"},
      {label:"School Sections",        href:"/granada-international/academics#sections"},
      {label:"IGCSE",                  href:"/granada-international/academics#edexcel"},
      {label:"A-Levels",               href:"/granada-international/academics#edexcel"},
      {label:"University Pathways",    href:"/granada-international/academics#university"},
    ],
  },
  {
    label:"Campus Life", href:"/granada-international/campus-life",
    image:"/sports.jpeg",
    imageCaption:"A Unique Blend of Growth + Community",
    children:[
      {label:"Modern Facilities",        href:"/granada-international/campus-life#facilities"},
      {label:"Sports & Athletics",       href:"/granada-international/campus-life#sports"},
      {label:"Arts & Drama",             href:"/granada-international/campus-life#arts"},
      {label:"Music Programme",          href:"/granada-international/campus-life#music"},
      {label:"Co-Curricular Activities", href:"/granada-international/campus-life#cocurricular"},
      {label:"Leadership Development",   href:"/granada-international/campus-life#leadership"},
    ],
  },
  {
    label:"Pastoral & Wellbeing", href:"/granada-international/wellbeing",
    image:"/sports2.jpeg",
    imageCaption:"A Unique Blend of Care + Belonging",
    children:[
      {label:"Wellbeing Approach",   href:"/granada-international/wellbeing#approach"},
      {label:"Counselling Support",  href:"/granada-international/wellbeing#counselling"},
      {label:"Character Education",  href:"/granada-international/wellbeing#character"},
      {label:"Global Citizenship",   href:"/granada-international/wellbeing#global"},
    ],
  },
  {
    label:"Latest News", href:"/granada-international/news",
    image:"/building2.jpeg",
    imageCaption:"A Unique Blend of Stories + Achievements",
    children:[
      {label:"School News",     href:"/granada-international/news"},
      {label:"Events Calendar", href:"/granada-international/news#events"},
      {label:"Our Socials",     href:"/granada-international/news#social"},
      {label:"Newsletters",     href:"/granada-international/news#newsletters"},
    ],
  },
  {
    label:"Parents", href:"/granada-international#contact",
    image:"/staffroom.jpeg",
    imageCaption:"A Unique Blend of Partnership + Trust",
    children:[
      {label:"Parent Portal",     href:"/granada-international#contact"},
      {label:"School Calendar",   href:"/granada-international#contact"},
      {label:"Term Dates",        href:"/granada-international#contact"},
      {label:"Reports & Policies",href:"/granada-international#contact"},
    ],
  },
  {
    label:"Support Us", href:"/granada-international#contact",
    image:"/art-room.jpeg",
    imageCaption:"A Unique Blend of Giving + Impact",
    children:[
      {label:"Bursaries & Scholarships",href:"/granada-international#admissions"},
      {label:"Donations",               href:"/granada-international#contact"},
      {label:"Community Partnerships",  href:"/granada-international#contact"},
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
      {/* Body — 3-column layout */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {/* Col 1 — primary nav items */}
        <div style={{width:"clamp(180px,25vw,260px)",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.1)",overflowY:"auto",padding:"clamp(1rem,2vw,1.5rem) 0",background:"rgba(0,0,0,0.2)",minHeight:0}}>
          {NAV_ITEMS.map((item,i)=>(
            <button key={item.label} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:active===i?"rgba(255,255,255,0.15)":"transparent",border:"none",borderLeft:active===i?`3px solid ${S}`:"3px solid transparent",padding:"clamp(0.65rem,1.5vw,0.85rem) clamp(1.1rem,2vw,1.5rem) clamp(0.65rem,1.5vw,0.85rem) clamp(1rem,2vw,1.35rem)",cursor:"pointer",textAlign:"left",transition:"all 0.2s",gap:"0.5rem"}}>
              <span style={{fontSize:"clamp(0.65rem,1.2vw,0.8rem)",fontWeight:active===i?700:400,letterSpacing:"0.06em",textTransform:"uppercase",color:active===i?S:"#fff",transition:"color 0.2s",fontFamily:"inherit",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.label}</span>
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none" style={{flexShrink:0,opacity:active===i?1:0.3}}><path d="M1 1l3 3.5L1 8" stroke={active===i?S:"#fff"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
        {/* Col 2 & 3 */}
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          {/* Col 2 — children links */}
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
                <a href="/granada-international#admissions" onClick={onClose} className="btn-solid" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Enquire</a>
                <a href="/granada-international#admissions" onClick={onClose} className="btn-outline" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
              </div>
            </div>
          </div>
          {/* Col 3 — image panel */}
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
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"clamp(0.8rem,1.5vw,1rem)"}}>
        <a href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",minWidth:0}}>
          <Image src={scrolled ? "/School2.svg" : "/School2-dark.svg"} alt="Granada International" width={190} height={90} style={{height:"auto",width:"clamp(120px,18vw,250px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)",flexWrap:"wrap",justifyContent:"flex-end",flex:1}}>
          <div style={{display:"none",gap:"clamp(0.75rem,1.5vw,1.25rem)",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-international#contact"},{l:"Enquire",h:"/granada-international#admissions"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-international#admissions" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
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
function useInView(threshold=0.1){
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
      {/* Gradient overlays */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(13,12,13,0.78) 30%,rgba(52,105,136,0.45) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.55) 0%,transparent 55%)"}}/>
      {/* Decorative corner accent */}
      <div style={{position:"absolute",top:0,right:0,width:"clamp(200px,30vw,400px)",height:"clamp(200px,30vw,400px)",background:"radial-gradient(circle at top right,rgba(170,194,12,0.15) 0%,transparent 70%)",pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",flexDirection:"column",justifyContent:"center",paddingTop:"clamp(60px,10vw,80px)"}}>
        <div style={{maxWidth:"clamp(280px,90vw,700px)",opacity:loaded?1:0,transition:"opacity 1s ease 0.2s"}}>
          {/* Badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:"0.6rem",background:"rgba(170,194,12,0.15)",border:"1px solid rgba(170,194,12,0.4)",padding:"0.4rem 1rem",marginBottom:"clamp(1rem,1.8vw,1.5rem)"}}>
            <span style={{width:6,height:6,background:"var(--secondary)",borderRadius:"50%",flexShrink:0}}/>
            <span style={{color:"var(--secondary)",fontSize:"clamp(0.55rem,0.9vw,0.65rem)",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>Pearson Edexcel · British Curriculum</span>
          </div>
          <h1 className="font-display" style={{fontSize:"clamp(2.2rem,7vw,5.8rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.3rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all 0.9s ease 0.3s"}}>Granada</h1>
          <h1 className="font-display" style={{fontSize:"clamp(2.2rem,7vw,5.8rem)",fontWeight:300,fontStyle:"italic",lineHeight:1.02,color:"var(--secondary)",marginBottom:"clamp(1.2rem,2vw,1.8rem)",opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all 0.9s ease 0.4s"}}>International</h1>
          <div style={{width:"clamp(35px,5vw,50px)",height:2,background:"var(--secondary)",marginBottom:"clamp(1rem,1.5vw,1.5rem)",opacity:loaded?1:0,transition:"opacity 1s ease 0.5s"}}/>
          <p style={{fontSize:"clamp(0.85rem,1.5vw,1.05rem)",fontWeight:300,lineHeight:1.8,color:"rgba(255,255,255,0.88)",maxWidth:500,marginBottom:"clamp(1.8rem,2.5vw,2.5rem)",opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all 0.9s ease 0.5s"}}>
            Opening doors to globally recognised qualifications along Kenya's beautiful Vipingo coast.
          </p>
          <div style={{display:"flex",gap:"clamp(0.6rem,1.5vw,0.9rem)",flexWrap:"wrap",opacity:loaded?1:0,transform:loaded?"none":"translateY(20px)",transition:"all 0.9s ease 0.6s"}}>
            <a href="/granada-international/about" className="btn-green" style={{fontSize:"clamp(0.6rem,1vw,0.68rem)",padding:"clamp(0.5rem,1vw,0.75rem) clamp(1.2rem,2vw,2rem)"}}>Discover More</a>
            <a href="/granada-international#admissions" style={{display:"inline-block",padding:"clamp(0.5rem,1vw,0.75rem) clamp(1.2rem,2vw,2rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.6)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.6rem,1vw,0.68rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
              Enquire Today
            </a>
          </div>
        </div>
        {/* Slide stats strip */}
        <div style={{position:"absolute",bottom:0,right:0,width:"clamp(220px,30vw,360px)",background:"rgba(52,105,136,0.82)",backdropFilter:"blur(8px)",padding:"clamp(1.2rem,2vw,1.8rem)",display:"none"}} className="hero-stats">
          {[{n:"100%",l:"British Edexcel"},{n:"K–13",l:"Full School Range"},{n:"♦",l:"Vipingo Coast"}].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",paddingBottom:i<2?"0.9rem":"0",borderBottom:i<2?"1px solid rgba(255,255,255,0.15)":"none",marginBottom:i<2?"0.9rem":"0"}}>
              <span className="font-display" style={{fontSize:"1.6rem",fontWeight:600,color:"var(--secondary)",lineHeight:1,minWidth:50}}>{s.n}</span>
              <span style={{color:"rgba(255,255,255,0.82)",fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500}}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Slide indicators */}
      <div style={{position:"absolute",bottom:"clamp(1.5rem,2.5vw,2.5rem)",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"clamp(0.3rem,0.5vw,0.5rem)",zIndex:5}}>
        {slides.map((_,i)=>(
          <button key={i} onClick={()=>setActive(i)} style={{width:i===active?"clamp(20px,3vw,28px)":"clamp(5px,1vw,7px)",height:2,background:i===active?"var(--secondary)":"rgba(255,255,255,0.5)",border:"none",cursor:"pointer",transition:"all 0.4s",padding:0}}/>
        ))}
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
            <span className="font-display" style={{fontSize:"clamp(0.8rem,1.5vw,1rem)",fontStyle:"italic",fontWeight:400,color:"#fff",letterSpacing:"0.03em",whiteSpace:"nowrap"}}>{t}</span>
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
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"all 0.9s ease 0.15s",display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"clamp(200px,30vw,260px) clamp(140px,20vw,180px)",gap:"clamp(0.6rem,1vw,10px)",position:"relative"}}>
          {[
            {src:"/building.jpeg",col:"1/2",row:"1/2"},
            {src:"/building2.jpeg",col:"2/3",row:"1/3"},
            {src:"/class.jpeg",col:"1/2",row:"2/3"},
          ].map((img,i)=>(
            <div key={i} className="img-hover" style={{gridColumn:img.col,gridRow:img.row,overflow:"hidden",position:"relative"}}>
              <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(52,105,136,0.3),transparent 60%)"}}/>
            </div>
          ))}
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
              onMouseEnter={e=>{e.currentTarget.style.background="#f0f7fb";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(52,105,136,0.12)";}}
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
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/dorm.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(52,105,136,0.88)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",fontWeight:700,marginBottom:"clamp(1.2rem,1.75vw,1.75rem)"}}>Our Mission</p>
        <blockquote className="font-display" style={{fontSize:"clamp(1.2rem,3.5vw,2.6rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.45,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
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
            <div key={i} style={{position:"relative",overflow:"hidden",height:"clamp(180px,28vw,260px)",cursor:"default",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.1}s`}}
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
          <a href="/granada-international#contact" className="btn-solid" style={{fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}>Enquire Now</a>
          <a href="/granada-international#contact" className="btn-outline" style={{borderColor:"rgba(255,255,255,0.55)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>Book a Visit</a>
          <a href="/granada-international#contact" className="btn-outline" style={{borderColor:"rgba(255,255,255,0.55)",color:"#fff",fontSize:"clamp(0.65rem,1vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) clamp(1.1rem,2vw,1.5rem)"}}
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
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,3vw,4rem)",marginBottom:"clamp(2rem,3vw,3.5rem)"}} className="int-footer-cols">
          <div>
            <a href="/granada-international" style={{textDecoration:"none"}}>
              <Image src="/School2-dark.svg" alt="Granada International" width={190} height={90} style={{width:"clamp(140px,16vw,250px)",height:"auto",marginBottom:"0.75rem"}}/>
            </a>
            <p style={{color:"rgba(255,255,255,0.65)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)",lineHeight:1.8,maxWidth:260,marginTop:"clamp(0.8rem,1.2vw,1.25rem)"}}>Forward Thinking. Inspiring Excellence. Shaping the Future.</p>
            <div style={{display:"flex",gap:"clamp(0.4rem,0.8vw,0.65rem)",marginTop:"clamp(0.9rem,1.2vw,1.4rem)"}}>
              {[{k:"FB",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
                <a key={k} href="#" style={{width:"clamp(28px,3.5vw,32px)",height:"clamp(28px,3.5vw,32px)",border:"1px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.8)",fontSize:"clamp(0.5rem,0.7vw,0.58rem)",fontWeight:700,textDecoration:"none",transition:"all 0.2s",flexShrink:0}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.8)"}}>{i}</a>
              ))}
            </div>
          </div>
          {[
            {title:"School",links:["About Us","Academic Life","Admissions","Curriculum","Campus Life","Our Team"]},
            {title:"Curriculum",links:["Pearson Edexcel","Key Stages 1–5","IGCSE","A-Levels","Results","University Pathways"]},
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
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.65rem,0.8vw,0.72rem)"}}>© {new Date().getFullYear()} Granada International. All rights reserved.</p>
          <div style={{display:"flex",gap:"clamp(1rem,1.5vw,1.75rem)",flexWrap:"wrap"}}>
            {["Privacy Policy","Terms of Use","Safeguarding"].map(l=>(
              <a key={l} href="#" style={{color:"rgba(255,255,255,0.45)",fontSize:"clamp(0.6rem,0.8vw,0.68rem)",textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.int-footer-cols{grid-template-columns:1fr 1fr 1fr 1fr!important}}`}</style>
    </footer>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────────────── */
export default function GranadaInternationalHome(){
  return(<>
    <Navbar/>
    <Hero/>
    <TaglineStrip/>
    <Welcome/>
    <EdexcelHighlight/>
    <Pillars/>
    <QuoteBanner/>
    <ValuesStrip/>
    <AdmissionsCTA/>
    <Footer/>
  </>);
}
