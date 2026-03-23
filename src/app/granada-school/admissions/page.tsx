"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {label:"About Us",href:"/granada-school/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-school/about#welcome"},{label:"Vision & Aims",href:"/granada-school/about#vision"},{label:"Our Values",href:"/granada-school/about#values"},{label:"Our Story",href:"/granada-school/about#history"},{label:"Boarding",href:"/granada-school/admissions#boarding"},{label:"Staff & Leadership",href:"/granada-school/about#staff"},{label:"Contact Us",href:"/granada-school#contact"}]},
  {label:"Admissions",href:"/granada-school/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"How to Apply",href:"/granada-school/admissions#process"},{label:"New Students",href:"/granada-school/admissions#new-students"},{label:"Transfer Students",href:"/granada-school/admissions#transfer"},{label:"Boarding Life",href:"/granada-school/admissions#boarding"},{label:"Admissions Team",href:"/granada-school/admissions#team"},{label:"Principal's Welcome",href:"/granada-school/admissions#principal"},{label:"Visit Granada",href:"/granada-school/admissions#team"}]},
  {label:"Academic",href:"/granada-school/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-school/academics#overview"},{label:"CBC Curriculum",href:"/granada-school/academics#cbc"},{label:"School Sections",href:"/granada-school/academics#sections"},{label:"Pre-Primary",href:"/granada-school/academics#sections"},{label:"Primary School",href:"/granada-school/academics#sections"},{label:"Junior School",href:"/granada-school/academics#sections"},{label:"Senior School",href:"/granada-school/academics#sections"},{label:"Girls Boarding",href:"/granada-school/admissions#boarding"}]},
  {label:"Campus Life",href:"/granada-school/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Modern Facilities",href:"/granada-school/campus-life#facilities"},{label:"Sports & Athletics",href:"/granada-school/campus-life#cocurricular"},{label:"Arts & Drama",href:"/granada-school/campus-life#cocurricular"},{label:"Music Programme",href:"/granada-school/campus-life#cocurricular"},{label:"Co-Curricular Activities",href:"/granada-school/campus-life#cocurricular"},{label:"Adventure & Leadership",href:"/granada-school/campus-life#cocurricular"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-school/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-school/wellbeing#approach"},{label:"Counselling Support",href:"/granada-school/wellbeing#counselling"},{label:"Character Education",href:"/granada-school/wellbeing#character"},{label:"Global Citizenship",href:"/granada-school/wellbeing#global"}]},
  {label:"Latest News",href:"/granada-school/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"School News",href:"/granada-school/news"},{label:"Events Calendar",href:"/granada-school/news#events"},{label:"Our Socials",href:"/granada-school/news#socials"},{label:"Newsletters",href:"/granada-school/news#newsletters"}]},
  {label:"Parents",href:"/granada-school#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-school#contact"},{label:"School Calendar",href:"/granada-school#contact"},{label:"Term Dates",href:"/granada-school#contact"},{label:"Reports & Policies",href:"/granada-school#contact"}]},
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
                <a href="/granada-school/admissions" onClick={onClose} className="btn-solid" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Enquire</a>
                <a href="/granada-school/admissions#process" onClick={onClose} className="btn-outline" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
              </div>
            </div>
          </div>
          <div style={{width:"clamp(150px,20vw,320px)",flexShrink:0,position:"relative",overflow:"hidden",background:"#346988",display:"none"}} className="nav-img-panel">
            {NAV_ITEMS.map((item,i)=>(
              <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${item.image})`,backgroundSize:"cover",backgroundPosition:"center",opacity:active===i?1:0,transition:"opacity 0.5s ease"}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(52,105,136,0.8) 0%,rgba(52,105,136,0.2) 60%)"}}/>
            <div style={{position:"absolute",bottom:"clamp(0.8rem,1.5vw,1.25rem)",left:"clamp(0.8rem,1.5vw,1.25rem)",right:"clamp(0.8rem,1.5vw,1.25rem)",zIndex:2}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",color:"rgba(255,255,255,0.9)",fontSize:"clamp(0.7rem,1.2vw,0.85rem)",fontStyle:"italic"}}>{cur.imageCaption}</p>
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
        <a href="/granada-school" style={{textDecoration:"none",display:"flex",alignItems:"center"}}>
          <Image src={scrolled ? "/School3.svg" : "/School3-dark.svg"} alt="Granada School" width={190} height={90} style={{height:"auto",width:"clamp(120px,18vw,250px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)",flexWrap:"wrap",justifyContent:"flex-end",flex:1}}>
          <div style={{display:"none",gap:"clamp(0.75rem,1.5vw,1.25rem)",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-school#contact"},{l:"Enquire",h:"/granada-school/admissions"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-school/admissions#process" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
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
function useInView(threshold=0.12){
  const ref=useRef<HTMLDivElement>(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return {ref,vis};
}

/* ── PAGE HERO ─────────────────────────────────────────────────────────────── */
function PageHero(){
  const [loaded,setLoaded]=useState(false);
  const [active,setActive]=useState(0);
  const slides=[
    "/building.jpeg",
    "/dorm.jpeg",
    "/dorm2.jpeg",
  ];
  useEffect(()=>{setLoaded(true);const t=setInterval(()=>setActive(a=>(a+1)%slides.length),6000);return()=>clearInterval(t);},[]);
  return(
    <section style={{position:"relative",height:"80vh",minHeight:700,overflow:"hidden"}}>
      {slides.map((s,i)=>(
        <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${s})`,backgroundSize:"cover",backgroundPosition:"center",opacity:i===active?1:0,transition:"opacity 1.4s ease",animation:i===active?"kenBurnsAdm 14s ease-in-out infinite alternate":"none"}}/>
      ))}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(52,105,136,0.9) 0%,rgba(52,105,136,0.55) 50%,rgba(13,12,13,0.45) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.6) 0%,transparent 45%)"}}/>

      {/* Animated geometric decoration */}
      <div style={{position:"absolute",top:"18%",right:"6%",width:"clamp(100px,16vw,200px)",height:"clamp(100px,16vw,200px)",border:"1px solid rgba(170,194,12,0.3)",animation:"spinAdm 28s linear infinite",opacity:0.7}}/>
      <div style={{position:"absolute",top:"21%",right:"9%",width:"clamp(60px,10vw,130px)",height:"clamp(60px,10vw,130px)",border:"1px solid rgba(170,194,12,0.18)",animation:"spinAdm 18s linear infinite reverse",opacity:0.5}}/>
      <div style={{position:"absolute",bottom:"15%",left:"4%",width:"clamp(60px,8vw,100px)",height:"clamp(60px,8vw,100px)",border:"1px solid rgba(255,255,255,0.12)",animation:"spinAdm 22s linear infinite",opacity:0.4}}/>

      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:"clamp(2.5rem,4.5vw,4.5rem)"}}>
        {/* Breadcrumb */}
        <div style={{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(14px)",transition:"all 0.7s ease 0.2s",flexWrap:"wrap"}}>
          {[{label:"Granada",href:"/"},{label:"Granada School",href:"/granada-school"}].map((bc,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
              <a href={bc.href} style={{color:"rgba(255,255,255,0.55)",textDecoration:"none",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.55)")}>{bc.label}</a>
              <span style={{color:"var(--secondary)",fontSize:"0.7rem"}}>›</span>
            </span>
          ))}
          <span style={{color:"#fff",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>Admissions</span>
        </div>

        <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.28em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.4rem,0.8vw,0.6rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(14px)",transition:"all 0.7s ease 0.3s"}}>Junior &amp; Senior Girls' Boarding Secondary School · CBE</p>

        <h1 className="font-display" style={{fontSize:"clamp(2.5rem,6.5vw,5.2rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
          Where Every<br/><span style={{fontStyle:"italic",color:"var(--accent-light)"}}>Learner Thrives</span>
        </h1>

        <div style={{width:"clamp(35px,4.5vw,50px)",height:2,background:"var(--secondary)",marginBottom:"clamp(0.9rem,1.4vw,1.2rem)",opacity:loaded?1:0,transition:"width 0.9s ease 0.6s, opacity 0.7s ease 0.5s"}}/>

        <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.84rem,1.25vw,1rem)",fontWeight:300,maxWidth:520,lineHeight:1.82,marginBottom:"clamp(1.5rem,2.2vw,2.2rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(18px)",transition:"all 0.8s ease 0.55s"}}>
          Competency-Based Education in a safe, structured, and supportive boarding environment — nurturing confidence, discipline, and excellence.
        </p>

        <div style={{display:"flex",gap:"clamp(0.6rem,1vw,0.9rem)",flexWrap:"wrap",opacity:loaded?1:0,transition:"opacity 0.9s ease 0.7s"}}>
          <a href="#process" className="btn-green" style={{fontSize:"clamp(0.62rem,1vw,0.7rem)",padding:"clamp(0.55rem,1vw,0.8rem) clamp(1.3rem,2.2vw,2.4rem)"}}>Apply Now</a>
          <a href="#team" style={{display:"inline-block",padding:"clamp(0.55rem,1vw,0.8rem) clamp(1.3rem,2.2vw,2.4rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.6)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,1vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.15)";e.currentTarget.style.borderColor="rgba(255,255,255,0.85)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,0.6)";}}>
            Contact Admissions
          </a>
        </div>
      </div>

      <div style={{position:"absolute",bottom:"clamp(0.8rem,1.2vw,1.4rem)",left:"50%",transform:"translateX(-50%)",display:"flex",gap:6,zIndex:5}}>
        {slides.map((_,i)=>(
          <button key={i} onClick={()=>setActive(i)} style={{width:i===active?"clamp(18px,2.5vw,26px)":"6px",height:"2px",background:i===active?"var(--secondary)":"rgba(255,255,255,0.5)",border:"none",cursor:"pointer",transition:"all 0.4s",padding:0}}/>
        ))}
      </div>

      <style>{`
        @keyframes kenBurnsAdm{0%{transform:scale(1)}100%{transform:scale(1.07)}}
        @keyframes spinAdm{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ─────────────────────────────────────────────────────────── */
function TaglineStrip(){
  const tags=["Academic Excellence · CBE Framework","Safe Boarding Environment","Holistic Character Formation","Every Learner Thrives"];
  return(
    <div style={{background:"var(--primary)",padding:"clamp(0.75rem,1.4vw,1.1rem) clamp(1rem,2vw,2rem)",overflow:"hidden"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"center",gap:"clamp(1.2rem,2.5vw,3rem)",flexWrap:"wrap",alignItems:"center"}}>
        {tags.map((t,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:"clamp(0.5rem,0.9vw,0.9rem)"}}>
            <span className="font-display" style={{fontSize:"clamp(0.78rem,1.3vw,0.95rem)",fontStyle:"italic",fontWeight:400,color:"#fff",letterSpacing:"0.02em",whiteSpace:"nowrap"}}>{t}</span>
            {i<tags.length-1&&<span style={{width:4,height:4,borderRadius:"50%",background:"var(--secondary)",flexShrink:0}}/>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── INTRO SECTION ─────────────────────────────────────────────────────────── */
function Intro(){
  const {ref,vis}=useInView(0.08);
  return(
    <section id="intro" className="section-cream" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2rem,4vw,5rem)",alignItems:"center"}} className="intro-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">About Our Admissions</p>
          <h2 className="section-heading">Nurturing <em>Confident, Disciplined</em><br/>& High-Achieving Learners</h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            At Granada CBE Junior &amp; Senior Girls' Boarding Secondary School, we are dedicated to nurturing confident, disciplined, and high-achieving young women under the Competency-Based Education (CBE) framework.
          </p>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            Our boarding environment provides a safe, structured, and supportive space where learners grow academically, socially, emotionally, and spiritually — a community grounded in sisterhood, shared values, and mutual accountability.
          </p>
          <p className="body-text" style={{marginBottom:"clamp(1.5rem,2.5vw,2.2rem)"}}>
            We welcome applications from students who are ready to embrace excellence, leadership, and personal growth. Joining Granada means joining a family passionately committed to seeing every learner rise to her highest potential.
          </p>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
            <a href="#process" className="btn-solid">How to Apply</a>
            <a href="#team" className="btn-outline">Contact Admissions</a>
          </div>
        </div>

        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all 0.9s ease 0.15s",display:"flex",flexDirection:"column",gap:"clamp(0.8rem,1.5vw,1.2rem)"}}>
          <div className="img-hover" style={{overflow:"hidden",height:"clamp(240px,32vw,360px)",position:"relative"}}>
            <img src="/dorm.jpeg" alt="Students at Granada" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(52,105,136,0.45),transparent 65%)"}}/>
            <div style={{position:"absolute",bottom:"1.2rem",left:"1.4rem",right:"1.4rem",zIndex:2}}>
              <p className="font-display" style={{color:"#fff",fontSize:"clamp(0.95rem,1.6vw,1.25rem)",fontStyle:"italic",fontWeight:400,textShadow:"0 1px 4px rgba(0,0,0,0.4)"}}>Every learner deserves a space to shine.</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(0.5rem,1vw,0.8rem)"}}>
            {[
              {num:"CBE",label:"Curriculum Framework",color:"var(--primary)"},
              {num:"100%",label:"Girls' Boarding School",color:"#936c51"},
              {num:"360°",label:"Holistic Development",color:"#4a6428"},
            ].map((s,i)=>(
              <div key={i} style={{border:`1px solid ${s.color}22`,padding:"clamp(0.8rem,1.4vw,1.2rem)",textAlign:"center",transition:"all 0.35s",cursor:"default",background:"#fff"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.background=`${s.color}08`;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 6px 24px ${s.color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${s.color}22`;e.currentTarget.style.background="#fff";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <p className="font-display" style={{fontSize:"clamp(1.3rem,2.2vw,1.85rem)",fontWeight:700,color:s.color,lineHeight:1}}>{s.num}</p>
                <p style={{fontSize:"clamp(0.52rem,0.72vw,0.62rem)",textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--muted)",marginTop:"0.3rem",fontWeight:600}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.intro-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── WHY CHOOSE ────────────────────────────────────────────────────────────── */
function WhyChoose(){
  const {ref,vis}=useInView(0.06);
  const reasons=[
    {num:"01",title:"Competency-Based Excellence",body:"We implement the CBE curriculum with a strong focus on mastery of skills, critical thinking, creativity, and real-world application — preparing learners for a dynamic future.",img:"/class.jpeg",color:"#346988"},
    {num:"02",title:"A Safe Girls' Environment",body:"Our school provides a secure and nurturing space where girls can focus, build confidence, and thrive without distractions. Free from the pressures of a mixed environment, every learner is seen, supported, and empowered to shine.",img:"/dorm2.jpeg",color:"#c0180b"},
    {num:"03",title:"Strong Academic Performance",body:"We are committed to high academic standards, personalised attention, and consistent mentorship to help every learner achieve her full potential — no learner is left behind.",img:"/building.jpeg",color:"#ebae1b"},
    {num:"04",title:"Leadership & Character Formation",body:"We intentionally nurture leadership skills, integrity, discipline, and responsibility in every student — forming confident, morally grounded young women who are ready to lead.",img:"/building.jpeg",color:"#4a6428"},
    {num:"05",title:"Modern Facilities & Structured Boarding Life",body:"Our boarding facilities are designed to promote comfort, order, and a strong culture of academic focus. Structured prep sessions, nutritious meals, and trained matrons ensure every learner thrives.",img:"/dorm.jpeg",color:"#84b7c8"},
    {num:"06",title:"Holistic Development",body:"Beyond academics, we offer co-curricular activities, mentorship programs, talent development, counselling services, and life-skills training.",img:"/sports.jpeg",color:"#483454"},
  ];
  return(
    <section className="section-cream" id="why-choose" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(2rem,4vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Why Granada</p>
          <h2 className="section-heading">Six Reasons to <em>Choose Granada</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text" style={{maxWidth:520,margin:"0 auto"}}>Everything we do is intentionally designed to nurture every learner's full potential — academically, socially, and spiritually.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1rem,1.8vw,1.5rem)"}} className="why-grid">
          {reasons.map((r,i)=>(
            <div key={i} style={{position:"relative",overflow:"hidden",background:"#fff",border:"1px solid rgba(0,0,0,0.06)",opacity:vis?1:0,transform:vis?"none":`translateY(${28+i*6}px)`,transition:`all 0.8s ease ${i*0.1}s`,cursor:"default"}}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.boxShadow=`0 12px 50px ${r.color}20`;el.style.borderColor=`${r.color}40`;el.style.transform="translateY(-5px)";}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.boxShadow="none";el.style.borderColor="rgba(0,0,0,0.06)";el.style.transform="none";}}>
              <div className="img-hover" style={{height:"clamp(150px,18vw,195px)",overflow:"hidden",position:"relative"}}>
                <img src={r.img} alt={r.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,${r.color}78 0%,transparent 55%)`}}/>
              </div>
              <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:r.color}}/>
              <div style={{position:"absolute",top:"clamp(108px,13.5vw,152px)",left:"clamp(1rem,1.8vw,1.4rem)",width:"clamp(30px,3.5vw,38px)",height:"clamp(30px,3.5vw,38px)",background:r.color,display:"flex",alignItems:"center",justifyContent:"center",transform:"translateY(-50%)",boxShadow:`0 3px 12px ${r.color}50`}}>
                <span style={{color:"#fff",fontSize:"clamp(0.52rem,0.75vw,0.62rem)",fontWeight:700,letterSpacing:"0.06em"}}>{r.num}</span>
              </div>
              <div style={{padding:"clamp(1rem,1.8vw,1.6rem)",paddingTop:"clamp(0.6rem,0.9vw,0.75rem)"}}>
                <h3 style={{fontSize:"clamp(0.84rem,1.2vw,0.98rem)",fontWeight:700,color:"var(--body-text)",marginBottom:"0.55rem",marginTop:"clamp(0.7rem,0.9vw,0.9rem)"}}>{r.title}</h3>
                <p className="body-text" style={{fontSize:"clamp(0.76rem,0.95vw,0.84rem)",marginBottom:0}}>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:580px){.why-grid{grid-template-columns:1fr 1fr!important}}@media(min-width:1024px){.why-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
    </section>
  );
}

/* ── BOARDING LIFE ─────────────────────────────────────────────────────────── */
function BoardingLife(){
  const {ref,vis}=useInView(0.06);
  const features=[
    "Secure and supervised dormitories",
    "Trained boarding matrons and pastoral care support",
    "Structured study time (prep sessions)",
    "Nutritious and balanced meals",
    "Guidance and counselling services",
    "A strong sense of community and belonging",
  ];
  return(
    <section className="section-blue" id="boarding" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2.5rem,5vw,5.5rem)",alignItems:"center"}} className="boarding-grid">
        <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all 0.9s ease"}}>
          <p className="label-tag">Boarding Programme</p>
          <h2 className="section-heading">More Than <em>Accommodation</em> —<br/>A Structured Life</h2>
          <div className="divider"/>
          <p className="body-text" style={{marginBottom:"1.2rem"}}>
            Boarding at Granada is more than accommodation — it is a structured lifestyle that promotes discipline, independence, and sisterhood. Our programme is designed to give students the support and environment they need to focus, grow, and thrive.
          </p>
          <p className="body-text" style={{marginBottom:"2rem"}}>
            We create a home-away-from-home environment where students feel safe, supported, and motivated to excel. Every aspect of boarding life is intentionally structured to reinforce our academic and values mission.
          </p>
          <div style={{marginBottom:"clamp(1.5rem,2.5vw,2.2rem)"}}>
            {features.map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"0.9rem",padding:"clamp(0.6rem,0.9vw,0.8rem) 0",borderBottom:"1px solid rgba(255,255,255,0.1)",opacity:vis?1:0,transform:vis?"none":"translateX(-18px)",transition:`all 0.7s ease ${0.2+i*0.08}s`}}>
                <div style={{width:"clamp(20px,2.8vw,24px)",height:"clamp(20px,2.8vw,24px)",background:"rgba(170,194,12,0.18)",border:"1px solid var(--secondary)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1px"}}>
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#aac20c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{color:"rgba(255,255,255,0.88)",fontSize:"clamp(0.78rem,1vw,0.88rem)",lineHeight:1.65,fontWeight:300}}>{f}</p>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
            <a href="#process" className="btn-solid">Apply for Boarding</a>
            <a href="#team" className="btn-outline">Enquire Now</a>
          </div>
        </div>

        <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"all 0.9s ease 0.22s",display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"clamp(200px,26vw,280px) clamp(130px,16vw,170px)",gap:"clamp(0.5rem,0.9vw,10px)"}}>
          {[
            {src:"/dorm.jpeg",col:"1/2",row:"1/2"},
            {src:"/dorm2.jpeg",col:"2/3",row:"1/3"},
            {src:"/class.jpeg",col:"1/2",row:"2/3"},
          ].map((img,i)=>(
            <div key={i} className="img-hover" style={{gridColumn:img.col,gridRow:img.row,overflow:"hidden",position:"relative"}}>
              <img src={img.src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(52,105,136,0.45),transparent 65%)"}}/>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:900px){.boarding-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── ADMISSIONS PROCESS ────────────────────────────────────────────────────── */
function AdmissionsProcess(){
  const {ref,vis}=useInView(0.05);
  const [tab,setTab]=useState<"new"|"transfer">("new");
  const newSteps=[
    {n:"01",title:"Inquiry & Campus Visit",body:"Parents/guardians contact the school for detailed information and may schedule a campus visit to understand our academic and boarding programmes first-hand.",icon:"🏫"},
    {n:"02",title:"Application Submission",body:"Submit the completed admission form with: copy of birth certificate, parent/guardian ID copy, recent passport-size photos, and latest academic reports (Grade 6 or Grade 9 results where applicable).",icon:"📋"},
    {n:"03",title:"Entrance Assessment / Interview",body:"Applicants may sit for an academic assessment or attend an interview to determine placement and subject pathway selection within the CBE framework.",icon:"✏️"},
    {n:"04",title:"Admission Approval",body:"Successful applicants receive an official admission letter, fee structure, and reporting instructions from our admissions office.",icon:"✅"},
    {n:"05",title:"Fee Payment & Enrollment",body:"Admission is confirmed upon payment of the required fees. The student is then issued boarding requirements, reporting details, and uniform guidelines.",icon:"🎒"},
  ];
  const transferSteps=[
    {n:"01",title:"Initial Consultation",body:"Parent/guardian contacts the Admissions Office to confirm availability of space in the desired grade level and discuss the transition process.",icon:"💬"},
    {n:"02",title:"Application & Documents",body:"Submit: completed admission form, birth certificate copy, transfer letter from previous school, latest academic reports, parent/guardian ID, and passport-size photos.",icon:"📋"},
    {n:"03",title:"Academic Review & Assessment",body:"The school reviews academic records and may conduct an assessment to ensure smooth integration into the CBE curriculum framework.",icon:"📊"},
    {n:"04",title:"Admission Decision",body:"If successful, an official admission letter and fee structure are issued to the family within the agreed timeline.",icon:"✅"},
    {n:"05",title:"Fee Payment & Reporting",body:"Upon payment, admission is confirmed and the student receives reporting dates, uniform guidelines, and boarding requirements.",icon:"🎒"},
  ];
  const steps=tab==="new"?newSteps:transferSteps;
  const P="#346988"; const S="#aac20c";
  return(
    <section className="section-cream" id="process" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(2rem,3.5vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Admission Process</p>
          <h2 className="section-heading">Your Journey <em>Starts Here</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text" style={{maxWidth:480,margin:"0 auto 2rem"}}>A clear, straightforward process guiding your learner from first enquiry all the way to their first day at Granada.</p>
          <div style={{display:"inline-flex",border:`1px solid ${P}28`,overflow:"hidden",boxShadow:`0 2px 16px ${P}12`}}>
            {(["new","transfer"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                style={{padding:"clamp(0.55rem,0.9vw,0.7rem) clamp(1.3rem,2.2vw,2.2rem)",background:tab===t?P:"transparent",color:tab===t?"#fff":P,border:"none",cursor:"pointer",fontSize:"clamp(0.6rem,0.88vw,0.7rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.35s",fontFamily:"inherit"}}>
                {t==="new"?"New Students":"Transfer Students"}
              </button>
            ))}
          </div>
        </div>

        <div style={{position:"relative",maxWidth:820,margin:"0 auto"}}>
          <div style={{position:"absolute",left:"clamp(14px,3vw,19px)",top:"clamp(16px,2.5vw,20px)",bottom:"clamp(16px,2.5vw,20px)",width:2,background:`linear-gradient(to bottom,${P},${S},${P})`,opacity:0.2}}/>
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {steps.map((s,i)=>(
              <div key={`${tab}-${i}`} style={{display:"flex",gap:"clamp(1rem,2.5vw,2rem)",alignItems:"flex-start",padding:"clamp(1rem,1.8vw,1.5rem) 0 clamp(1rem,1.8vw,1.5rem) clamp(0.5rem,1vw,0.75rem)",opacity:vis?1:0,transform:vis?"none":"translateX(-26px)",transition:`all 0.8s ease ${i*0.12}s`,borderBottom:i<steps.length-1?"1px solid #f0eee9":"none"}}>
                <div style={{width:"clamp(32px,4.2vw,44px)",height:"clamp(32px,4.2vw,44px)",borderRadius:"50%",background:i%2===0?P:S,color:i%2===0?"#fff":P,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"clamp(0.55rem,0.78vw,0.65rem)",fontWeight:700,letterSpacing:"0.06em",boxShadow:`0 3px 15px ${i%2===0?P:S}42`,zIndex:1,transition:"transform 0.3s"}}
                  onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.12)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
                  {s.n}
                </div>
                <div style={{flex:1,paddingTop:"clamp(0.3rem,0.7vw,0.5rem)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.4rem"}}>
                    <span style={{fontSize:"clamp(0.9rem,1.2vw,1.1rem)"}}>{s.icon}</span>
                    <h3 style={{fontSize:"clamp(0.84rem,1.15vw,0.98rem)",fontWeight:700,color:"var(--body-text)"}}>{s.title}</h3>
                  </div>
                  <p className="body-text" style={{fontSize:"clamp(0.76rem,0.95vw,0.85rem)",marginBottom:0}}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center",marginTop:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transition:"opacity 1s ease 0.9s"}}>
          <a href="#team" className="btn-solid" style={{marginRight:"0.75rem"}}>Talk to Our Team</a>
          <a href="/granada-school" className="btn-outline">School Home</a>
        </div>
      </div>
    </section>
  );
}

/* ── ADMISSIONS TEAM ───────────────────────────────────────────────────────── */
function AdmissionsTeam(){
  const {ref,vis}=useInView(0.06);
  const team=[
    {name:"Christopher Sabwa",role:"Admissions Officer",tel:"+254 714 848 289",email:"admissions@granadaschools.group",img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80"},
    {name:"Asya Adan",role:"Admissions Officer",tel:"+254 717 682 138",email:"admissions@granadaschools.group",img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80"},
  ];
  return(
    <section className="section-cream" id="team" ref={ref} style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"clamp(2rem,4vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Meet the Team</p>
          <h2 className="section-heading">Our <em>Admissions Team</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text" style={{maxWidth:500,margin:"0 auto"}}>Our Admissions Team is available to assist you throughout the entire process — from your very first question to your child's first day.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.5rem,3vw,2.5rem)",maxWidth:760,margin:"0 auto clamp(2rem,3.5vw,3.5rem)"}} className="team-grid">
          {team.map((m,i)=>(
            <div key={i} style={{background:"#fff",border:"1px solid rgba(0,0,0,0.06)",overflow:"hidden",opacity:vis?1:0,transform:vis?"none":`translateY(${30+i*10}px)`,transition:`all 0.9s ease ${i*0.16}s`,cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 50px rgba(52,105,136,0.14)";e.currentTarget.style.transform="translateY(-5px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
              <div style={{display:"grid",gridTemplateColumns:"clamp(120px,18vw,165px) 1fr",alignItems:"stretch"}}>
                <div style={{overflow:"hidden",position:"relative",minHeight:"clamp(160px,20vw,210px)"}}>
                  <img src={m.img} alt={m.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,transparent 70%,rgba(52,105,136,0.12) 100%)"}}/>
                </div>
                <div style={{padding:"clamp(1.2rem,2vw,1.75rem)"}}>
                  <p style={{fontSize:"clamp(0.52rem,0.78vw,0.6rem)",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--secondary)",marginBottom:"0.3rem"}}>Admissions</p>
                  <h3 className="font-display" style={{fontSize:"clamp(1rem,1.6vw,1.3rem)",fontWeight:600,color:"var(--primary)",marginBottom:"0.15rem"}}>{m.name}</h3>
                  <p style={{fontSize:"clamp(0.68rem,0.85vw,0.76rem)",color:"var(--muted)",marginBottom:"clamp(0.8rem,1.4vw,1.2rem)",fontStyle:"italic"}}>{m.role}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
                    <a href={`tel:${m.tel.replace(/\s/g,"")}`} style={{display:"flex",alignItems:"center",gap:"0.65rem",color:"var(--body-text)",textDecoration:"none",fontSize:"clamp(0.73rem,0.88vw,0.82rem)",transition:"color 0.2s"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color="var(--body-text)")}>
                      <span style={{width:"clamp(24px,2.8vw,28px)",height:"clamp(24px,2.8vw,28px)",background:"var(--primary)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.1z"/></svg>
                      </span>
                      {m.tel}
                    </a>
                    <a href={`mailto:${m.email}`} style={{display:"flex",alignItems:"center",gap:"0.65rem",color:"var(--body-text)",textDecoration:"none",fontSize:"clamp(0.7rem,0.82vw,0.8rem)",transition:"color 0.2s",wordBreak:"break-all"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color="var(--body-text)")}>
                      <span style={{width:"clamp(24px,2.8vw,28px)",height:"clamp(24px,2.8vw,28px)",background:"var(--secondary)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0d0c0d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </span>
                      {m.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{maxWidth:760,margin:"0 auto",padding:"clamp(1.5rem,2.5vw,2.5rem)",background:"var(--primary)",position:"relative",overflow:"hidden",opacity:vis?1:0,transition:"opacity 1s ease 0.5s"}}>
          <div style={{position:"absolute",top:-50,right:-50,width:200,height:200,borderRadius:"50%",background:"rgba(170,194,12,0.08)"}}/>
          <div style={{position:"absolute",bottom:-30,left:-30,width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"0.75rem"}}>
            <p style={{color:"var(--secondary)",fontSize:"clamp(0.58rem,0.82vw,0.64rem)",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:700}}>Visit Us</p>
            <p className="font-display" style={{color:"#fff",fontSize:"clamp(1.1rem,1.8vw,1.55rem)",fontStyle:"italic"}}>We'd love to show you around Granada</p>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.75rem,0.9vw,0.82rem)"}}>📍 Vipingo, Kilifi County, Kenya</p>
            <a href="mailto:admissions@granadaschools.group" style={{marginTop:"0.25rem",display:"inline-block",padding:"clamp(0.55rem,0.9vw,0.7rem) clamp(1.5rem,2.2vw,2.2rem)",background:"var(--secondary)",color:"var(--dark)",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.6rem,0.8vw,0.68rem)",fontWeight:700,textDecoration:"none",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#96ac0a";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--secondary)";e.currentTarget.style.transform="none";}}>
              Book a Visit
            </a>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:640px){.team-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── PRINCIPAL'S WELCOME ───────────────────────────────────────────────────── */
function PrincipalWelcome(){
  const {ref,vis}=useInView(0.06);
  const values=[
    {label:"Resilience",color:"#c0180b"},
    {label:"Curiosity",color:"#ebae1b"},
    {label:"Kindness",color:"#4a6428"},
    {label:"Honesty",color:"#84b7c8"},
    {label:"Respect",color:"#483454"},
  ];
  return(
    <section id="principal" ref={ref} style={{position:"relative",padding:"clamp(3.5rem,7vw,7rem) clamp(1rem,2vw,2rem)",overflow:"hidden",scrollMarginTop:"100px"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/class.jpeg)",backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(0.15)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(52,105,136,0.93) 0%,rgba(13,12,13,0.88) 100%)"}}/>
      <div style={{position:"absolute",top:"8%",left:"-6%",width:"clamp(180px,28vw,380px)",height:"clamp(180px,28vw,380px)",borderRadius:"50%",border:"1px solid rgba(170,194,12,0.12)"}}/>
      <div style={{position:"absolute",bottom:"5%",right:"-8%",width:"clamp(150px,24vw,320px)",height:"clamp(150px,24vw,320px)",borderRadius:"50%",border:"1px solid rgba(170,194,12,0.1)"}}/>
      <div style={{position:"absolute",top:"50%",right:"15%",width:"clamp(60px,8vw,100px)",height:"clamp(60px,8vw,100px)",border:"1px solid rgba(255,255,255,0.06)",animation:"spinAdm 30s linear infinite"}}/>

      <div style={{position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(2.5rem,5vw,5rem)",alignItems:"center"}} className="principal-grid">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-32px)",transition:"all 0.9s ease"}}>
            <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.28em",fontSize:"clamp(0.55rem,0.82vw,0.62rem)",fontWeight:700,marginBottom:"clamp(1rem,1.5vw,1.3rem)"}}>From Our Principal</p>
            <div style={{borderLeft:"3px solid var(--secondary)",paddingLeft:"clamp(1rem,2vw,1.75rem)",marginBottom:"clamp(1.5rem,2.5vw,2.2rem)"}}>
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" style={{marginBottom:"0.75rem",opacity:0.4}}><path d="M0 22V13.2C0 9.5 .9 6.6 2.7 4.4 4.5 1.9 7.2 .5 10.8 0L12 2.6C10.4 3 9.1 3.8 8.1 5.1 7.1 6.4 6.5 7.9 6.3 9.7H10V22H0ZM16 22V13.2C16 9.5 16.9 6.6 18.7 4.4 20.5 1.9 23.2 .5 26.8 0L28 2.6C26.4 3 25.1 3.8 24.1 5.1 23.1 6.4 22.5 7.9 22.3 9.7H26V22H16Z" fill="var(--secondary)"/></svg>
              <p className="font-display" style={{fontSize:"clamp(1.2rem,2.1vw,1.85rem)",fontStyle:"italic",color:"rgba(255,255,255,0.95)",lineHeight:1.58}}>
                "Welcome to Granada CBE Junior & Senior Girls' Boarding Secondary School — a place where excellence is cultivated, character is built, and futures are shaped."
              </p>
            </div>
            <p style={{color:"rgba(255,255,255,0.78)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.88,marginBottom:"0.95rem"}}>
              At Granada, we believe every girl carries within her immense potential. Our mission is to unlock that potential through quality education, structured mentorship, disciplined boarding life, and a values-driven environment.
            </p>
            <p style={{color:"rgba(255,255,255,0.78)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.88,marginBottom:"0.95rem"}}>
              We are passionate about raising confident young women who are academically strong, morally grounded, emotionally intelligent, and prepared to lead in a rapidly changing world. Through the Competency-Based Education framework, we focus not only on what learners know, but on what they can do with what they know.
            </p>
            <p style={{color:"rgba(255,255,255,0.78)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.88,marginBottom:"clamp(1.5rem,2.5vw,2.5rem)"}}>
              In partnership with parents and guardians, we create a safe and inspiring space where every learner is encouraged to dream boldly, work diligently, and grow into a responsible and impactful leader. We invite you to join the Granada family — 
              <span style={{color:"var(--secondary)",fontStyle:"italic",fontWeight:400}}>where every learner rises.</span>
            </p>
            <div style={{display:"flex",alignItems:"center",gap:"1.2rem"}}>
              <div style={{width:"clamp(35px,4.5vw,50px)",height:2,background:"var(--secondary)"}}/>
              <div>
                <p style={{color:"#fff",fontSize:"clamp(0.7rem,0.9vw,0.8rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>The Principal</p>
                <p style={{color:"rgba(255,255,255,0.55)",fontSize:"clamp(0.65rem,0.82vw,0.73rem)"}}>Granada CBE Junior &amp; Senior Girls' Boarding Secondary School</p>
              </div>
            </div>
          </div>

          <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"all 0.9s ease 0.22s"}}>
            <div style={{overflow:"hidden",height:"clamp(280px,36vw,430px)",marginBottom:"clamp(1rem,1.4vw,1.4rem)",position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=600" alt="Principal" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 55%,rgba(13,12,13,0.65) 100%)"}}/>
              <div style={{position:"absolute",bottom:"1.2rem",left:"1.2rem",right:"1.2rem",zIndex:2}}>
                <p style={{color:"rgba(255,255,255,0.55)",fontSize:"clamp(0.62rem,0.82vw,0.72rem)",letterSpacing:"0.04em"}}>Granada CBE Junior &amp; Senior Girls' Boarding Secondary School</p>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"clamp(0.3rem,0.45vw,5px)"}}>
              {values.map((v,i)=>(
                <div key={i} style={{background:v.color,padding:"clamp(0.5rem,0.75vw,0.75rem) clamp(0.2rem,0.4vw,0.4rem)",textAlign:"center",opacity:vis?1:0,transform:vis?"none":"translateY(14px)",transition:`all 0.7s ease ${0.5+i*0.09}s`,cursor:"default"}}
                  onMouseEnter={e=>{e.currentTarget.style.filter="brightness(1.15)";e.currentTarget.style.transform="translateY(-3px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.filter="brightness(1)";e.currentTarget.style.transform="none";}}>
                  <p style={{color:"#fff",fontSize:"clamp(0.5rem,0.65vw,0.6rem)",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>{v.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){.principal-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/dorm.jpeg)",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(52,105,136,0.9)"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:800,margin:"0 auto",textAlign:"center",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.9rem,1.5vw,1.4rem)"}}>Ready to Begin?</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"clamp(1.5rem,2.25vw,2.25rem)"}}>
          Are you ready to feel the <span style={{color:"var(--accent-light)"}}>difference?</span>
        </h2>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          {["Enquire","Visit Granada","Apply Now"].map(l=>(
            <a key={l} href="/granada-school/admissions" style={{display:"inline-block",padding:"0.7rem 1.75rem",background:"transparent",border:"1px solid rgba(255,255,255,0.55)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"0.68rem",fontWeight:600,textDecoration:"none",transition:"all 0.3s",fontFamily:"inherit"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>{l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ────────────────────────────────────────────────────────────────── */
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
      <style>{`@media(min-width:640px){.footer-grid{grid-template-columns:1fr 1fr 1fr 1fr!important}}`}</style>
    </footer>
  );
}

/* ── IN-PAGE SECTION NAV ───────────────────────────────────────────────────── */
function SectionNav(){
  const sections=[
    {label:"Overview",id:"intro"},
    {label:"Why Choose Granada",id:"why-choose"},
    {label:"Boarding Life",id:"boarding"},
    {label:"Admissions Process",id:"process"},
    {label:"Our Team",id:"team"},
    {label:"Principal's Welcome",id:"principal"},
  ];
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const fn=()=>{
      for(let i=sections.length-1;i>=0;i--){
        const el=document.getElementById(sections[i].id);
        if(el&&window.scrollY>=el.offsetTop-220){setActive(i);break;}
      }
    };
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  const P="#346988"; const S="#aac20c";
  const scrollTo=(id:string)=>{
    const el=document.getElementById(id);
    if(el){const y=el.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:y,behavior:"smooth"});}
  };
  return(
    <aside style={{width:"clamp(120px,12vw,180px)",flexShrink:0,position:"sticky",top:110,alignSelf:"flex-start",display:"none"}} className="section-sidebar">
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(0.6rem,0.9vw,0.72rem)",fontStyle:"italic",letterSpacing:"0.06em",color:P,fontWeight:600,marginBottom:"clamp(0.8rem,1.2vw,1.1rem)"}}>In this section</p>
      <nav style={{display:"flex",flexDirection:"column",gap:0,borderLeft:"1px solid #e8e6e3"}}>
        {sections.map((s,i)=>(
          <button key={i} onClick={()=>scrollTo(s.id)}
            style={{display:"flex",alignItems:"center",gap:"clamp(0.5rem,0.8vw,0.75rem)",padding:"clamp(0.5rem,0.8vw,0.65rem) 0 clamp(0.5rem,0.8vw,0.65rem) 1rem",color:active===i?P:"#5a5a5a",background:"none",border:"none",borderLeft:active===i?`2px solid ${P}`:"2px solid transparent",cursor:"pointer",textAlign:"left",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",fontWeight:active===i?700:400,transition:"all 0.2s",fontFamily:"inherit",marginLeft:"-1px"}}>
            {s.label}
          </button>
        ))}
      </nav>
      <div style={{marginTop:"clamp(1.5rem,2vw,2.25rem)",border:"1px solid #e8e6e3",padding:"clamp(1rem,1.5vw,1.4rem)"}}>
        <p style={{fontSize:"clamp(0.55rem,0.75vw,0.6rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:S,fontWeight:700,marginBottom:"clamp(0.7rem,1vw,0.9rem)"}}>Where Next?</p>
        {[{label:"Academic Life",href:"/granada-school/academics"},{label:"Campus Life",href:"/granada-school/campus-life"},{label:"Wellbeing",href:"/granada-school/wellbeing"}].map((l,i)=>(
          <a key={i} href={l.href} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#5a5a5a",textDecoration:"none",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",padding:"clamp(0.35rem,0.6vw,0.45rem) 0",borderBottom:"1px solid #f0eee9",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=P)} onMouseLeave={e=>(e.currentTarget.style.color="#5a5a5a")}>
            <svg width="5" height="9" viewBox="0 0 5 9" fill="none"><path d="M1 1l3 3.5L1 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {l.label}
          </a>
        ))}
      </div>
      <style>{`@media(min-width:768px){.section-sidebar{display:block!important}}`}</style>
    </aside>
  );
}

/* ── PAGE EXPORT ───────────────────────────────────────────────────────────── */
export default function AdmissionsPage(){
  return(<>
    <Navbar/>
    <PageHero/>
    <div style={{background:"var(--body-bg)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(2rem,4vw,4.5rem) clamp(1rem,2vw,2rem) 0",display:"flex",gap:"clamp(2rem,3vw,3.5rem)",alignItems:"flex-start",flexWrap:"wrap"}}>
        <SectionNav/>
        <main style={{flex:1,minWidth:0}}>
          <TaglineStrip/>
          <Intro/>
          <WhyChoose/>
          <BoardingLife/>
          <AdmissionsProcess/>
          <AdmissionsTeam/>
          <PrincipalWelcome/>
        </main>
      </div>
    </div>
    <PageCTA/>
    <Footer/>
  </>);
}
