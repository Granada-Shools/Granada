"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {label:"About Us",href:"/granada-school/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-school/about#welcome"},{label:"Vision & Aims",href:"/granada-school/about#vision"},{label:"Our Values",href:"/granada-school/about#values"},{label:"Our Story",href:"/granada-school/about#history"},{label:"Boarding",href:"/granada-school/about#boarding"},{label:"Staff & Leadership",href:"/granada-school/about#staff"},{label:"Contact Us",href:"/granada-school#contact"}]},
  {label:"Admissions",href:"/granada-school/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"How to Apply",href:"/granada-school/admissions#process"},{label:"Boarding Life",href:"/granada-school/admissions#boarding"},{label:"Admissions Team",href:"/granada-school/admissions#team"},{label:"Visit Granada",href:"/granada-school/admissions#team"}]},
  {label:"Academic",href:"/granada-school/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-school/academics#overview"},{label:"CBC Curriculum",href:"/granada-school/academics#cbc"},{label:"Junior School",href:"/granada-school/academics#sections"},{label:"Senior School",href:"/granada-school/academics#sections"}]},
  {label:"Campus Life",href:"/granada-school/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Modern Facilities",href:"/granada-school/campus-life#facilities"},{label:"Sports & Athletics",href:"/granada-school/campus-life#cocurricular"},{label:"Arts & Drama",href:"/granada-school/campus-life#cocurricular"},{label:"Co-Curricular Activities",href:"/granada-school/campus-life#cocurricular"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-school/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-school/wellbeing#approach"},{label:"Counselling Support",href:"/granada-school/wellbeing#counselling"},{label:"Character Education",href:"/granada-school/wellbeing#character"},{label:"Global Citizenship",href:"/granada-school/wellbeing#global"}]},
  {label:"Latest News",href:"/granada-school/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"School News",href:"/granada-school/news"},{label:"Events Calendar",href:"/granada-school/news#events"},{label:"Newsletters",href:"/granada-school/news#newsletters"}]},
  {label:"Parents",href:"/granada-school#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-school#contact"},{label:"School Calendar",href:"/granada-school#contact"},{label:"Term Dates",href:"/granada-school#contact"}]},
  {label:"Support Us",href:"/granada-school#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Bursaries & Scholarships",href:"/granada-school/admissions"},{label:"Donations",href:"/granada-school#contact"},{label:"Community Partnerships",href:"/granada-school#contact"}]},
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
          {[{label:"Parents",href:"/granada-school#contact"},{label:"Enquire",href:"/granada-school#admissions"},{label:"Contact us",href:"/granada-school#contact"}].map(l=>(
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
                <a href="/granada-school#admissions" onClick={onClose} style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)",background:S,color:P,textDecoration:"none",border:"none",cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>(e.currentTarget.style.opacity="0.9")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>Enquire</a>
                <a href="/granada-school#admissions" onClick={onClose} style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)",background:"transparent",color:"#fff",border:`1px solid ${S}`,textDecoration:"none",cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#fff";}}>Apply Now</a>
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
        <a href="/granada-school" style={{textDecoration:"none"}}>
          <Image src={scrolled ? "/School3.svg" : "/School3-dark.svg"} alt="Granada School" width={190} height={90} style={{height:"auto",width:"clamp(120px,18vw,250px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)"}}>
          <div style={{display:"flex",gap:"1.25rem",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-school#contact"},{l:"Enquire",h:"/granada-school#admissions"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-school#admissions" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
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
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",height:"65vh",minHeight:500,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/class.jpeg)",backgroundSize:"cover",backgroundPosition:"center top",animation:"kenBurns 16s ease-in-out infinite alternate"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(52,105,136,0.82) 40%,rgba(52,105,136,0.28) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(39,83,106,0.65) 0%,transparent 50%)"}}/>
      {/* Animated accent lines */}
      <div style={{position:"absolute",top:0,left:0,bottom:0,width:4,background:"linear-gradient(to bottom,transparent,var(--secondary),transparent)",opacity:loaded?0.7:0,transition:"opacity 1.2s ease 0.8s"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:"clamp(2.5rem,4vw,4rem)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(10px)",transition:"all 0.6s ease 0.2s"}}>
          <a href="/" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>Granada</a>
          <span style={{color:"var(--secondary)",fontSize:"0.65rem"}}>›</span>
          <a href="/granada-school" style={{color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>Granada School</a>
          <span style={{color:"var(--secondary)",fontSize:"0.65rem"}}>›</span>
          <span style={{color:"#fff",fontSize:"clamp(0.6rem,1vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>Academics</span>
        </div>
        <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.58rem,0.9vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.5rem,1vw,0.65rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(12px)",transition:"all 0.6s ease 0.3s"}}>Competency Based Curriculum</p>
        <h1 className="font-display" style={{fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:600,lineHeight:1.03,color:"#fff",marginBottom:"0.9rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
          Academic Excellence<br/><span style={{fontStyle:"italic",color:"var(--accent-light)"}}>at Granada School</span>
        </h1>
        <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.88rem,1.2vw,1rem)",fontWeight:300,maxWidth:540,lineHeight:1.8,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.55s"}}>
          A balanced, learner-centred education — developing practical skills, creative thinking, and a love of learning from Nursery through Senior School.
        </p>
        <div style={{display:"flex",gap:"clamp(0.5rem,1vw,0.75rem)",marginTop:"clamp(1.2rem,2vw,1.75rem)",flexWrap:"wrap",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:"all 0.8s ease 0.65s"}}>
          <a href="#overview" className="btn-green" style={{fontSize:"clamp(0.6rem,1vw,0.68rem)",padding:"clamp(0.5rem,1vw,0.7rem) clamp(1.2rem,2vw,1.8rem)"}}>Explore Curriculum</a>
          <a href="/granada-school#admissions" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"clamp(0.5rem,1vw,0.7rem) clamp(1.2rem,2vw,1.8rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textDecoration:"none",fontSize:"clamp(0.6rem,1vw,0.68rem)",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.12)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Enquire Now</a>
        </div>
      </div>
      <style>{`@keyframes kenBurns{from{transform:scale(1) translateX(0);} to{transform:scale(1.07) translateX(-1%);}}`}</style>
    </section>
  );
}

/* ── SECTION NAV ────────────────────────────────────────────────────────────── */
function SectionNav(){
  const sections=[
    {label:"Overview",        id:"overview"},
    {label:"CBC Curriculum",  id:"cbc"},
    {label:"School Sections", id:"sections"},
    {label:"Girls Boarding",  id:"boarding"},
    {label:"Apply",           id:"apply"},
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
        {[{label:"How to Apply",href:"/granada-school#admissions"},{label:"Visit Granada",href:"/granada-school#admissions"},{label:"Enquire Now",href:"/granada-school#admissions"}].map((l,i)=>(
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
    {num:"2",label:"Academic Pathways",sub:"CBC & Edexcel"},
    {num:"4",label:"School Sections",sub:"Nursery to Senior"},
    {num:"5",label:"Core Values",sub:"Guiding Every Lesson"},
    {num:"∞",label:"Possibilities",sub:"For Every Learner"},
  ];
  return(
    <section className="section-cream" id="overview" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <p className="font-display" style={{fontSize:"clamp(1rem,1.8vw,1.5rem)",fontStyle:"italic",color:"var(--primary)",lineHeight:1.7,marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",borderLeft:"3px solid var(--secondary)",paddingLeft:"clamp(0.9rem,1.5vw,1.4rem)",maxWidth:820,opacity:vis?1:0,transform:vis?"none":"translateY(16px)",transition:"all 0.8s ease"}}>
          At Granada School, academic excellence is achieved through a balanced and engaging learning experience designed to develop critical thinking, creativity, and problem-solving skills.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,4rem)",alignItems:"start"}} className="overview-grid">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease 0.1s"}}>
            <p className="label-tag">Our Approach</p>
            <h2 className="section-heading">Learning That <em>Matters</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Granada School offers the Competency Based Curriculum (CBC) — Kenya's national framework — alongside the internationally recognised British Edexcel curriculum. This dual-pathway model ensures every learner finds the right route to reach their full potential.</p>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>The CBC at Granada focuses on developing practical competencies, creativity, collaboration, and communication skills that prepare learners for real-life challenges. Learners are supported in discovering their strengths and talents through an interactive, learner-centred approach.</p>
            <p className="body-text" style={{marginBottom:"2rem"}}>Through these pathways, Granada ensures that learners receive an education that is both locally relevant and internationally competitive — equipping them with the confidence and capability to thrive wherever their journey leads.</p>
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
              <a href="#cbc" onClick={e=>{e.preventDefault();const el=document.getElementById("cbc");if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});}}} className="btn-solid">CBC Curriculum</a>
              <a href="#sections" onClick={e=>{e.preventDefault();const el=document.getElementById("sections");if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});}}} className="btn-outline">School Sections</a>
            </div>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.2s"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"#dddbd8",marginBottom:"clamp(1.2rem,2vw,1.5rem)"}}>
              {stats.map((s,i)=>(
                <div key={i} style={{background:i===1?"var(--primary)":"#fff",padding:"clamp(1.2rem,2vw,1.75rem) clamp(1rem,1.5vw,1.4rem)",textAlign:"center",transition:"transform 0.3s",cursor:"default"}}
                  onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-3px)")} onMouseLeave={e=>(e.currentTarget.style.transform="none")}>
                  <div className="font-display" style={{fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:600,color:i===1?"var(--accent-light)":"var(--primary)",lineHeight:1,marginBottom:"0.3rem"}}>{s.num}</div>
                  <div style={{fontSize:"clamp(0.6rem,0.8vw,0.72rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:i===1?"#fff":"var(--body-text)",marginBottom:"0.2rem"}}>{s.label}</div>
                  <div style={{fontSize:"clamp(0.55rem,0.7vw,0.62rem)",color:i===1?"rgba(255,255,255,0.7)":"var(--muted)",letterSpacing:"0.06em"}}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{overflow:"hidden",height:"clamp(200px,28vw,280px)"}} className="img-hover">
              <img src="/class.jpeg" alt="Students learning" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.overview-grid{grid-template-columns:1fr 1fr!important}.section-sidebar{display:block!important}}`}</style>
    </section>
  );
}

/* ── CBC CURRICULUM ─────────────────────────────────────────────────────────── */
function CBCCurriculum(){
  const {ref,vis}=useInView(0.08);
  const pillars=[
    {icon:"💡",title:"Critical Thinking",desc:"Learners are taught to analyse, question, and reason through real-world problems rather than simply memorise facts.",color:"var(--primary)"},
    {icon:"🎨",title:"Creativity & Innovation",desc:"CBC nurtures creative expression across all subjects, encouraging learners to find inventive solutions and think beyond boundaries.",color:"var(--secondary)"},
    {icon:"🤝",title:"Collaboration",desc:"Group tasks and project-based learning build strong teamwork, communication, and interpersonal skills from the earliest years.",color:"var(--accent-warm)"},
    {icon:"🌍",title:"Communication",desc:"Strong emphasis on oral, written, and digital communication prepares learners to confidently express ideas in any setting.",color:"var(--accent-green)"},
    {icon:"🧩",title:"Problem Solving",desc:"Real-life learning scenarios challenge learners to apply knowledge practically, developing resilience and adaptability.",color:"var(--accent-blue)"},
    {icon:"🌱",title:"Self-Discovery",desc:"Learners are supported in identifying and developing their unique strengths through a personalised, learner-centred approach.",color:"var(--accent-pink)"},
  ];
  return(
    <section className="section-blue" id="cbc" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(2rem,3vw,3rem)",flexWrap:"wrap",gap:"1.5rem"}}>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
            <p className="label-tag">Kenya's National Framework</p>
            <h2 className="section-heading">Competency Based <em>Curriculum</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{maxWidth:560}}>The CBC focuses on developing practical competencies, creativity, collaboration, and communication skills that prepare learners for real-life challenges — and a meaningful future.</p>
          </div>
          <div style={{opacity:vis?1:0,transition:"opacity 0.8s ease 0.3s",flexShrink:0}}>
            <span style={{display:"inline-block",padding:"0.45rem 1.2rem",border:"1px solid var(--secondary)",color:"var(--secondary)",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>CBE Focus</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(255,255,255,0.1)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="cbc-grid">
          {pillars.map((p,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.06)",padding:"clamp(1.4rem,2vw,2rem) clamp(1.2rem,1.8vw,1.6rem)",borderTop:`2px solid ${p.color}`,opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`all 0.9s ease ${i*0.08}s`,cursor:"default"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.06)";}}>
              <span style={{fontSize:"clamp(1.4rem,2vw,1.8rem)",display:"block",marginBottom:"clamp(0.7rem,1vw,1rem)"}}>{p.icon}</span>
              <h3 style={{fontSize:"clamp(0.7rem,0.9vw,0.82rem)",textTransform:"uppercase",letterSpacing:"0.12em",color:"#fff",fontWeight:700,marginBottom:"0.6rem"}}>{p.title}</h3>
              <p style={{color:"rgba(255,255,255,0.72)",fontSize:"clamp(0.72rem,0.85vw,0.8rem)",lineHeight:1.75,fontWeight:300}}>{p.desc}</p>
            </div>
          ))}
        </div>
        {/* Dual pathway note */}
        <div style={{border:"1px solid rgba(255,255,255,0.15)",padding:"clamp(1.5rem,2.5vw,2.25rem)",background:"rgba(255,255,255,0.05)",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:"all 0.9s ease 0.5s"}}>
          <div style={{display:"flex",gap:"clamp(1.5rem,3vw,3rem)",alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:260}}>
              <p style={{fontSize:"clamp(0.58rem,0.8vw,0.62rem)",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"0.75rem"}}>Dual Pathway Note</p>
              <p style={{color:"rgba(255,255,255,0.85)",fontSize:"clamp(0.78rem,0.95vw,0.88rem)",lineHeight:1.8}}>
                Through these dual academic pathways, Granada ensures learners receive an education that is both locally relevant and internationally competitive. Parents can choose the nationally focused CBC route or the internationally recognised Edexcel route — depending on their child's academic and career aspirations.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.75rem",minWidth:200}}>
              {[{label:"Locally Relevant",desc:"Aligned with Kenya KICD standards"},{label:"Globally Competitive",desc:"Benchmarked to international norms"},{label:"Holistic Development",desc:"Academic, social & moral growth"}].map((item,i)=>(
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
      <style>{`@media(max-width:768px){.cbc-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){.cbc-grid{grid-template-columns:1fr!important}}`}</style>
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
      label:"Pre-Primary",
      range:"Nursery – KG 2",
      age:"Ages 3–6",
      color:"#ebae1b",
      img:"/class.jpeg",
      curriculum:"CBC & Introduction to British Early Years",
      tagline:"Play-Based Discovery",
      intro:"Our Early Years programme lays the foundation for a lifetime of learning through nurturing, play-based experiences that spark curiosity and confidence in every child.",
      highlights:[
        "Structured play and early literacy",
        "Numeracy through hands-on activities",
        "Social skills and emotional development",
        "Creative arts, music and movement",
        "Outdoor exploration and discovery",
      ],
      quote:"Every great learner begins with the freedom to play, explore, and wonder.",
    },
    {
      id:"primary",
      label:"Primary School",
      range:"Grades 1–6",
      age:"Ages 6–13",
      color:"var(--primary)",
      img:"/class.jpeg",
      curriculum:"CBC & British Edexcel Primary (Years 1–6)",
      tagline:"Building Strong Foundations",
      intro:"Primary School at Granada develops strong academic foundations alongside practical skills. CBC focuses on competency development while Edexcel introduces internationally structured learning.",
      highlights:[
        "English, Mathematics, Science & Social Studies",
        "Creative Arts and Physical Education",
        "Project-Based Learning (CBC)",
        "Structured international standards (Edexcel)",
        "Digital literacy and ICT integration",
      ],
      quote:"Curiosity ignited in Primary School becomes the fuel for a lifetime of achievement.",
    },
    {
      id:"junior",
      label:"Junior School",
      range:"Grades 7–9",
      age:"Ages 13–16",
      color:"var(--accent-green)",
      img:"/building.jpeg",
      curriculum:"CBC & Edexcel Lower Secondary (Years 7–9)",
      tagline:"Developing Independent Thinkers",
      intro:"Junior School is where learners deepen understanding, develop independence, and sharpen their critical thinking. Both CBC and Edexcel pathways challenge learners to think analytically and creatively.",
      highlights:[
        "English, Maths, Sciences and Humanities",
        "ICT and Technology Integration",
        "Edexcel internationally benchmarked syllabi",
        "Critical thinking and research skills",
        "Leadership and co-curricular development",
      ],
      quote:"Independence of thought is the hallmark of a truly educated mind.",
    },
    {
      id:"senior",
      label:"Senior School",
      range:"Grades 10–12",
      age:"Ages 16–19",
      color:"var(--accent-warm)",
      img:"/class.jpeg",
      curriculum:"CBC Senior Secondary & Edexcel IGCSE + A-Level",
      tagline:"Preparing Future Leaders",
      intro:"Senior School brings both pathways to their fullest expression — CBC prepares learners for national examinations with a focus on holistic competencies, while Edexcel prepares learners for IGCSE and A-Level qualifications for university entry worldwide.",
      highlights:[
        "CBC: National examinations, competency portfolio",
        "IGCSE: Core and elective subjects (Years 10–11)",
        "A-Level: University preparation (Years 12–13)",
        "University applications support",
        "Junior &amp; Senior Girls' Boarding",
      ],
      quote:"Senior School is not the end of a journey — it is the gateway to everything that follows.",
    },
  ];
  const cur=sections[active];
  return(
    <section className="section-cream" id="sections" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{marginBottom:"clamp(1.5rem,2.5vw,2.75rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">CBC + Edexcel Pathways</p>
          <h2 className="section-heading">A Continuous Learning <em>Journey</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:600}}>Granada provides a seamless learning journey from Nursery to Senior School, offering both CBC and Edexcel pathways. Families can select the pathway that best suits their child's learning goals.</p>
        </div>
        {/* Stage tabs */}
        <div style={{display:"flex",gap:1,background:"#dddbd8",marginBottom:"clamp(1.5rem,2vw,2rem)",overflowX:"auto"}} className="section-tabs">
          {sections.map((s,i)=>(
            <button key={i} onClick={()=>setActive(i)}
              style={{flex:1,minWidth:120,padding:"clamp(0.75rem,1.2vw,1rem) clamp(0.8rem,1.2vw,1.2rem)",background:active===i?"var(--primary)":"#fff",border:"none",borderBottom:active===i?`3px solid ${s.color}`:"3px solid transparent",cursor:"pointer",textAlign:"center",transition:"all 0.25s",fontFamily:"inherit"}}>
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
              <a href="/granada-school#admissions" className="btn-solid">Apply for {cur.label}</a>
              <a href="/granada-school#admissions" className="btn-outline">Make an Enquiry</a>
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
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(52,105,136,0.86)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.8vw,0.62rem)",fontWeight:700,marginBottom:"1.75rem"}}>Granada School</p>
        <blockquote className="font-display" style={{fontSize:"clamp(1.2rem,3.5vw,2.4rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.5,marginBottom:"2rem"}}>
          "We are committed to inspiring excellence and preparing learners for a successful future — today, tomorrow, and beyond."
        </blockquote>
        <div style={{width:"clamp(32px,4vw,44px)",height:2,background:"var(--secondary)",margin:"0 auto 1.75rem"}}/>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:500}}>
          Granada School — CBC Curriculum — Vipingo, Kenya
        </p>
      </div>
    </section>
  );
}

/* ── GIRLS BOARDING ─────────────────────────────────────────────────────────── */
function GirlsBoarding(){
  const {ref,vis}=useInView(0.08);
  const benefits=[
    {icon:"🏠",title:"Home Away from Home",desc:"Comfortable, secure accommodation designed to provide warmth, safety, and a true sense of belonging for every boarder."},
    {icon:"📚",title:"Supervised Study Sessions",desc:"Structured evening study periods with teacher oversight ensure boarders stay focused, supported, and on track academically."},
    {icon:"💛",title:"Pastoral Care & Wellbeing",desc:"Dedicated housemistresses and counsellors provide emotional support and guidance, ensuring every girl thrives."},
    {icon:"⚖️",title:"Balanced Daily Routines",desc:"A structured timetable balancing study, rest, recreation, and co-curricular activities for healthy and holistic development."},
    {icon:"🌺",title:"Lifelong Friendships",desc:"Living alongside peers from diverse backgrounds fosters deep friendships, cultural appreciation, and a strong community spirit."},
    {icon:"🌟",title:"Confidence & Discipline",desc:"The boarding experience helps learners grow into confident, disciplined, and responsible young women ready for the world."},
  ];
  return(
    <section className="section-cream" id="boarding" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,5rem)",alignItems:"center"}} className="boarding-grid">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-24px)",transition:"all 0.9s ease"}}>
            <p className="label-tag">Junior &amp; Senior School Girls</p>
            <h2 className="section-heading">Girls Boarding <em>Programme</em></h2>
            <div className="divider"/>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Granada CBE Junior &amp; Senior Girls' Boarding Secondary School offers secure boarding for both Junior and Senior School girls, providing a safe, structured, and supportive environment that promotes academic focus and personal development.</p>
            <p className="body-text" style={{marginBottom:"1.1rem"}}>Our boarding programme is designed to create a home away from home where learners develop independence, responsibility, and strong friendships. Boarders benefit from dedicated pastoral care, supervised study sessions, and a balanced routine that supports both academic and personal growth.</p>
            <p className="body-text" style={{marginBottom:"2rem"}}>The boarding experience helps learners grow into confident, disciplined, and responsible young women — fully prepared for the opportunities that lie ahead.</p>
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
              <a href="/granada-school#admissions" className="btn-solid">Boarding Enquiry</a>
              <a href="/granada-school#admissions" className="btn-outline">Learn More</a>
            </div>
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(24px)",transition:"all 0.9s ease 0.15s"}}>
            {/* Feature image with overlay stat */}
            <div style={{position:"relative",marginBottom:"clamp(1rem,1.5vw,1.5rem)"}}>
              <div className="img-hover" style={{overflow:"hidden",height:"clamp(260px,35vw,380px)"}}>
                <img src="/dorm.jpeg" alt="Girls boarding" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
              <div style={{position:"absolute",bottom:-24,left:"clamp(1rem,2vw,1.5rem)",background:"var(--primary)",padding:"clamp(1rem,1.5vw,1.4rem) clamp(1.4rem,2vw,1.8rem)",display:"flex",gap:"clamp(1.5rem,2.5vw,2.5rem)",boxShadow:"0 8px 32px rgba(52,105,136,0.25)"}}>
                {[{num:"24/7",label:"Pastoral Support"},{num:"100%",label:"Safe & Secure"}].map((s,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div className="font-display" style={{fontSize:"clamp(1.4rem,2vw,1.8rem)",fontWeight:700,color:"var(--secondary)",lineHeight:1}}>{s.num}</div>
                    <div style={{fontSize:"clamp(0.55rem,0.7vw,0.6rem)",textTransform:"uppercase",letterSpacing:"0.12em",color:"rgba(255,255,255,0.8)",fontWeight:600,marginTop:3}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Benefits grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"#dddbd8",marginTop:"clamp(3rem,4vw,4.5rem)"}} className="boarding-benefits">
          {benefits.map((b,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.4rem,2vw,2rem) clamp(1.2rem,1.8vw,1.6rem)",opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:`all 0.9s ease ${0.4+i*0.07}s`,cursor:"default"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background="var(--body-bg)";(e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)";}} onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="#fff";(e.currentTarget as HTMLDivElement).style.transform="none";}}>
              <span style={{fontSize:"clamp(1.4rem,2vw,1.8rem)",display:"block",marginBottom:"clamp(0.6rem,1vw,0.9rem)"}}>{b.icon}</span>
              <h3 style={{fontSize:"clamp(0.68rem,0.85vw,0.78rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--primary)",marginBottom:"0.5rem"}}>{b.title}</h3>
              <p style={{color:"var(--muted)",fontSize:"clamp(0.72rem,0.85vw,0.8rem)",lineHeight:1.7}}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:768px){.boarding-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:768px){.boarding-benefits{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){.boarding-benefits{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── ADMISSIONS CTA ─────────────────────────────────────────────────────────── */
function AdmissionsCTA(){
  const {ref,vis}=useInView(0.2);
  return(
    <section className="section-blue" id="apply" ref={ref} style={{paddingTop:"clamp(3rem,6vw,5rem)",paddingBottom:"clamp(3rem,6vw,5rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",textAlign:"center"}}>
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">Begin Your Journey</p>
          <h2 className="section-heading" style={{fontSize:"clamp(2rem,4vw,3.2rem)"}}>Ready to Join <em>Granada School?</em></h2>
          <div className="divider" style={{margin:"1.5rem auto"}}/>
          <p className="body-text" style={{maxWidth:560,margin:"0 auto clamp(2rem,3vw,2.75rem)",fontSize:"clamp(0.85rem,1.1vw,0.95rem)"}}>
            Whether you are choosing the CBC pathway, the Edexcel pathway, or exploring boarding for your daughter — our admissions team is here to guide you through every step.
          </p>
          <div style={{display:"flex",gap:"clamp(0.6rem,1.2vw,1rem)",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/granada-school#admissions" className="btn-green" style={{fontSize:"clamp(0.65rem,1vw,0.72rem)",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.5rem,2.5vw,2.5rem)"}}>Apply Now</a>
            <a href="/granada-school#admissions" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.5rem,2.5vw,2.5rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textDecoration:"none",fontSize:"clamp(0.65rem,1vw,0.72rem)",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.12)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Book a Visit</a>
            <a href="/granada-school#admissions" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.5rem,2.5vw,2.5rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.35)",color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:"clamp(0.65rem,1vw,0.72rem)",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.6)")} onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.35)")}>Download Prospectus</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────────────────────── */
function Footer(){
  return(
    <footer id="contact" className="section-blue" style={{padding:"clamp(3rem,4vw,4.5rem) clamp(1rem,2vw,2rem) clamp(1.2rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,3vw,3.5rem)",marginBottom:"clamp(2rem,3vw,3rem)"}} className="footer-grid">
          <div>
            <a href="/granada-school" style={{textDecoration:"none"}}>
              <Image src="/School3-dark.svg" alt="Granada School" width={190} height={90} style={{width:"clamp(140px,16vw,250px)",height:"auto",marginBottom:"0.75rem"}}/>
            </a>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:"0.8rem",lineHeight:1.8,maxWidth:250,marginTop:"1.1rem"}}>Forward Thinking. Inspiring Excellence. Shaping the Future.</p>
            <div style={{display:"flex",gap:"0.6rem",marginTop:"1.25rem"}}>
              {[{k:"FB",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{k:"IG",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},{k:"LI",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},{k:"TW",i:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}].map(({k,i})=>(
                <a key={k} href="#" style={{width:30,height:30,border:"1px solid rgba(255,255,255,0.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.75)",fontSize:"0.55rem",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.75)"}}>{i}</a>
              ))}
            </div>
          </div>
          {[
            {title:"School",links:["About Us","Academic Life","Admissions","Curriculum","Campus Life","Our Team"]},
            {title:"Curriculum",links:["CBE Kenya","Pearson Edexcel","Early Years","Primary School","Junior School","Senior School"]},
          ].map((col,i)=>(
            <div key={i}>
              <h4 style={{fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",fontWeight:700,marginBottom:"1.3rem"}}>{col.title}</h4>
              {col.links.map(l=>(
                <a key={l} href="#" style={{display:"block",color:"rgba(255,255,255,0.6)",fontSize:"0.79rem",textDecoration:"none",marginBottom:"0.65rem",transition:"color 0.2s"}}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>{l}</a>
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
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"0.7rem"}}>© {new Date().getFullYear()} Granada School. All rights reserved.</p>
          <div style={{display:"flex",gap:"1.5rem"}}>
            {["Privacy Policy","Terms of Use","Safeguarding"].map(l=>(
              <a key={l} href="#" style={{color:"rgba(255,255,255,0.4)",fontSize:"0.66rem",textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.4)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.footer-grid{grid-template-columns:1fr 1fr 1fr 1fr!important}.boarding-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </footer>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────────────── */
export default function GranadaSchoolAcademics(){
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
        <CBCCurriculum/>
        <SchoolSections/>
        <QuoteBanner/>
        <GirlsBoarding/>
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
        @media(max-width:640px){.section-tabs button{min-width:90px!important;}}
      `}</style>
    </>
  );
}
