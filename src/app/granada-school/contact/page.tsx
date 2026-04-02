"use client";
import Image from "next/image";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
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

/* ── SIDE NAV ──────────────────────────────────────────────────────────────── */
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
    <div style={{position:"fixed",top:0,right:0,bottom:0,zIndex:200,width:"100%",maxWidth:"min(100vw,900px)",display:"flex",flexDirection:"column",background:"#213558",transform:open?"translateX(0)":"translateX(100%)",transition:"transform 0.5s cubic-bezier(0.77,0,0.175,1)",boxShadow:"-8px 0 60px rgba(0,0,0,0.3)",fontSize:"clamp(0.7rem,1.5vw,1rem)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"clamp(0.8rem,2vw,1.1rem) clamp(1.5rem,3vw,2.5rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",flexShrink:0,gap:"clamp(0.8rem,2vw,1.5rem)",background:"rgba(0,0,0,0.2)",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:"clamp(0.5rem,1.5vw,1.5rem)",alignItems:"center",flexWrap:"wrap",flex:1,minWidth:0}}>
          {[{label:"Parents",href:"/granada-school#contact"},{label:"Enquire",href:"/granada-school/contact"},{label:"Contact us",href:"/granada-school/contact"}].map(l=>(
            <a key={l.label} href={l.href} onClick={onClose} style={{color:"#fff",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.7rem)",letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>(e.currentTarget.style.color=S)} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{l.label}</a>
          ))}
        </div>
        <div style={{flex:1,maxWidth:280,position:"relative"}}>
          <input type="text" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setSf(true)} onBlur={()=>setTimeout(()=>setSf(false),150)}
            style={{width:"100%",background:"rgba(255,255,255,0.1)",border:`1px solid ${sf?"#fff":"rgba(255,255,255,0.3)"}`,color:"#fff",padding:"0.45rem 2rem 0.45rem 0.8rem",fontSize:"clamp(0.72rem,1vw,0.8rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit"}}/>
          <span style={{position:"absolute",right:"0.7rem",top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.78rem,1.1vw,0.88rem)",pointerEvents:"none"}}>⌕</span>
          {sf&&sr.length>0&&(
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#fff",boxShadow:"0 8px 32px rgba(0,0,0,0.18)",zIndex:10,maxHeight:220,overflowY:"auto"}}>
              {sr.map((r,i)=>(
                <a key={i} href={r.href} onClick={()=>{setSearch("");onClose();}} style={{display:"block",padding:"0.6rem 1rem",color:"#1c1b1c",textDecoration:"none",fontSize:"clamp(0.75rem,1.02vw,0.82rem)",borderBottom:"1px solid #f0eee9",transition:"background 0.15s"}}
                  onMouseEnter={e=>(e.currentTarget.style.background="#f7f6f3")} onMouseLeave={e=>(e.currentTarget.style.background="#fff")}>{r.label}</a>
              ))}
            </div>
          )}
        </div>
        <button onClick={onClose} style={{background:"none",border:"1px solid rgba(255,255,255,0.4)",color:"#fff",width:"clamp(32px,6vw,36px)",height:"clamp(32px,6vw,36px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}
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
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{opacity:active===i?1:0.4,transition:"opacity 0.2s",flexShrink:0}}><path d="M1 1l4 4-4 4" stroke={active===i?S:"#fff"} strokeWidth="1.2"/></svg>
            </button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"clamp(1.5rem,3vw,2.5rem)",display:"flex",flexDirection:"column"}}>
          <div style={{marginBottom:"clamp(1rem,2vw,1.5rem)"}}>
            <a href={cur.href} onClick={onClose} style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",color:S,textDecoration:"none",fontSize:"clamp(0.85rem,1.4vw,1.1rem)",fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",transition:"opacity 0.2s"}}
              onMouseEnter={e=>(e.currentTarget.style.opacity="0.8")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>
              {cur.label} <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h8M5 1l4 4-4 4" stroke={S} strokeWidth="1.2" strokeLinecap="round"/></svg>
            </a>
            {cur.imageCaption&&<p style={{color:"rgba(255,255,255,0.5)",fontSize:"clamp(0.62rem,0.9vw,0.7rem)",marginTop:"0.4rem",fontStyle:"italic"}}>{cur.imageCaption}</p>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"0.15rem",marginBottom:"auto"}}>
            {(cur.children||[]).map((child,i)=>(
              <a key={i} href={child.href} onClick={onClose} style={{display:"flex",alignItems:"center",gap:"clamp(0.4rem,0.8vw,0.6rem)",padding:"clamp(0.4rem,0.8vw,0.55rem) 0",color:"#fff",textDecoration:"none",fontSize:"clamp(0.7rem,1.2vw,0.8rem)",borderBottom:"1px solid rgba(255,255,255,0.1)",transition:"color 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.color=S;const d=e.currentTarget.querySelector(".dot") as HTMLElement;if(d)d.style.background=S;}}
                onMouseLeave={e=>{e.currentTarget.style.color="#fff";const d=e.currentTarget.querySelector(".dot") as HTMLElement;if(d)d.style.background="transparent";}}>
                <span className="dot" style={{width:5,height:5,border:`1px solid ${S}`,flexShrink:0,transition:"background 0.2s",background:"transparent"}}/>{child.label}
              </a>
            ))}
          </div>
          <div style={{display:"flex",gap:"clamp(0.4rem,0.8vw,0.6rem)",marginTop:"clamp(1rem,1.5vw,1.5rem)",flexWrap:"wrap"}}>
            <a href="/granada-school/contact" onClick={onClose} className="btn-solid" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Enquire</a>
            <a href="/granada-school/admissions#apply" onClick={onClose} className="btn-outline" style={{fontSize:"clamp(0.55rem,1rem,0.6rem)",padding:"clamp(0.3rem,0.6vw,0.45rem) clamp(0.8rem,1.5vw,1.2rem)",borderColor:"#fff",color:"#fff"}}>Apply Now</a>
          </div>
        </div>
      </div>
      <div style={{padding:"clamp(1rem,2vw,1.5rem) clamp(1.5rem,3vw,2.5rem)",borderTop:"1px solid rgba(255,255,255,0.1)",display:"flex",gap:"clamp(0.6rem,1.2vw,0.8rem)",flexShrink:0}}>
        {["F","X","I","L","Y"].map((k,i)=>(
          <a key={k} href="#" style={{width:"clamp(24px,4vw,28px)",height:"clamp(24px,4vw,28px)",border:"1px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"clamp(0.45rem,0.8vw,0.55rem)",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=S;e.currentTarget.style.borderColor=S;e.currentTarget.style.color=P;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";e.currentTarget.style.color="#fff";}}>{k}</a>
        ))}
      </div>
    </div>
  </>);
}

/* ── Navbar ─────────────────────────────────────────────────────────────────── */
function Navbar(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return(<>
    <SideNav open={open} onClose={()=>setOpen(false)}/>
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"all 0.4s ease",background:scrolled?"rgba(255,255,255,0.97)":"transparent",backdropFilter:scrolled?"blur(10px)":"none",boxShadow:scrolled?"0 1px 0 #e8e6e3":"none",padding:scrolled?"0.7rem 0":"clamp(0.8rem,2vw,1.2rem) 0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem"}}>
        <a href="/granada-school" style={{textDecoration:"none",display:"flex",alignItems:"center"}}>
          <Image src={scrolled?"/g-school.svg":"/g-school-dark.svg"} alt="Granada School" width={110} height={44} style={{height:"auto",width:"clamp(50px,8vw,110px)"}} priority/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"clamp(1rem,2vw,1.5rem)",flexWrap:"wrap",justifyContent:"flex-end",flex:1}}>
          <div style={{display:"none",gap:"clamp(0.75rem,1.5vw,1.25rem)",alignItems:"center"}} className="nav-quick">
            {[{l:"Parents",h:"/granada-school#contact"},{l:"Enquire",h:"/granada-school/contact"}].map(({l,h})=>(
              <a key={l} href={h} style={{color:scrolled?"var(--muted)":"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:"clamp(0.6rem,1.2vw,0.68rem)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,transition:"color 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--primary)")} onMouseLeave={e=>(e.currentTarget.style.color=scrolled?"var(--muted)":"rgba(255,255,255,0.85)")}>{l}</a>
            ))}
            <a href="/granada-school/admissions#apply" className="btn-green" style={{fontSize:"clamp(0.6rem,1.2vw,0.62rem)",padding:"clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.5vw,1.2rem)"}}>Apply Now</a>
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

/* ── ENQUIRY TYPES & FIELDS ────────────────────────────────────────────────── */
type FieldDef = {key:string;label:string;type:"text"|"email"|"tel"|"date"|"time"|"number"|"select"|"textarea";required?:boolean;placeholder?:string;options?:{value:string;label:string}[]};

const CURRICULUM_OPTIONS = [{value:"cbe",label:"CBE (Competency-Based)"},{value:"international",label:"International (Edexcel)"}];

const ENQUIRY_TYPES:{id:string;label:string;fields:FieldDef[]}[] = [
  {id:"general",label:"General Inquiry",fields:[
    {key:"preferred_contact_method",label:"Preferred Contact Method",type:"select",options:[{value:"call",label:"Call"},{value:"email",label:"Email"},{value:"whatsapp",label:"WhatsApp"}]},
    {key:"message",label:"Message",type:"textarea",required:true,placeholder:"How can we help you?"},
  ]},
  {id:"admissions",label:"Admissions Inquiry",fields:[
    {key:"phone_number",label:"Phone Number",type:"tel",required:true,placeholder:"+254 7XX XXX XXX"},
    {key:"child_name",label:"Child's Name",type:"text",placeholder:"Enter child's name"},
    {key:"child_age",label:"Child's Age",type:"number",placeholder:"e.g. 12"},
    {key:"grade_applying_for",label:"Grade Applying For",type:"text",placeholder:"e.g. Grade 7, Form 1"},
    {key:"preferred_curriculum",label:"Preferred Curriculum",type:"select",options:CURRICULUM_OPTIONS},
    {key:"intended_start_date",label:"Intended Start Date",type:"date"},
    {key:"message",label:"Message",type:"textarea",placeholder:"Any additional information…"},
  ]},
  {id:"visit",label:"Book a Visit / Tour",fields:[
    {key:"phone_number",label:"Phone Number",type:"tel",required:true,placeholder:"+254 7XX XXX XXX"},
    {key:"preferred_visit_date",label:"Preferred Visit Date",type:"date",required:true},
    {key:"preferred_visit_time",label:"Preferred Visit Time",type:"time"},
    {key:"number_of_visitors",label:"Number of Visitors",type:"number",placeholder:"e.g. 2"},
    {key:"child_age",label:"Child's Age",type:"number",placeholder:"e.g. 12"},
    {key:"preferred_curriculum",label:"Preferred Curriculum",type:"select",options:CURRICULUM_OPTIONS},
    {key:"special_requests",label:"Special Requests",type:"textarea",placeholder:"Any accessibility needs or questions…"},
  ]},
  {id:"fees",label:"Fee Structure Request",fields:[
    {key:"grade_of_interest",label:"Grade of Interest",type:"text",placeholder:"e.g. Grade 7, Form 1"},
    {key:"preferred_curriculum",label:"Preferred Curriculum",type:"select",options:CURRICULUM_OPTIONS},
    {key:"message",label:"Message",type:"textarea",placeholder:"Any specific questions about fees…"},
  ]},
  {id:"curriculum",label:"Curriculum Inquiry",fields:[
    {key:"curriculum_of_interest",label:"Curriculum of Interest",type:"select",required:true,options:CURRICULUM_OPTIONS},
    {key:"child_age",label:"Child's Age",type:"number",placeholder:"e.g. 12"},
    {key:"grade_of_interest",label:"Grade of Interest",type:"text",placeholder:"e.g. Grade 7, Form 1"},
    {key:"message",label:"Message",type:"textarea",placeholder:"What would you like to know?"},
  ]},
  {id:"transfer",label:"Transfer / Mid-term Admission",fields:[
    {key:"phone_number",label:"Phone Number",type:"tel",required:true,placeholder:"+254 7XX XXX XXX"},
    {key:"child_name",label:"Child's Name",type:"text",placeholder:"Enter child's name"},
    {key:"child_age",label:"Child's Age",type:"number",placeholder:"e.g. 12"},
    {key:"current_school",label:"Current School",type:"text",placeholder:"Name of current school"},
    {key:"current_grade",label:"Current Grade",type:"text",placeholder:"e.g. Grade 6"},
    {key:"reason_for_transfer",label:"Reason for Transfer",type:"textarea",placeholder:"Brief reason for transfer…"},
    {key:"intended_start_date",label:"Intended Start Date",type:"date"},
    {key:"preferred_curriculum",label:"Preferred Curriculum",type:"select",options:CURRICULUM_OPTIONS},
    {key:"message",label:"Message",type:"textarea",placeholder:"Any additional information…"},
  ]},
  {id:"callback",label:"Request a Call Back",fields:[
    {key:"phone_number",label:"Phone Number",type:"tel",required:true,placeholder:"+254 7XX XXX XXX"},
    {key:"preferred_call_time",label:"Preferred Call Time",type:"text",placeholder:"e.g. Morning, 2-4pm"},
    {key:"enquiry_topic",label:"Enquiry Topic",type:"text",placeholder:"Brief topic of your enquiry"},
    {key:"message",label:"Message",type:"textarea",placeholder:"Any additional details…"},
  ]},
  {id:"feedback",label:"Feedback / Report an Issue",fields:[
    {key:"issue_type",label:"Type",type:"select",required:true,options:[{value:"feedback",label:"Feedback"},{value:"complaint",label:"Complaint"},{value:"suggestion",label:"Suggestion"}]},
    {key:"message",label:"Message",type:"textarea",required:true,placeholder:"Please describe in detail…"},
  ]},
];

/* ── HERO ──────────────────────────────────────────────────────────────────── */
function Hero(){
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>setLoaded(true),[]);
  return(
    <section style={{position:"relative",minHeight:"clamp(340px,50vh,480px)",overflow:"hidden",display:"flex",alignItems:"flex-end"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"url(/building.jpeg)",backgroundSize:"cover",backgroundPosition:"center"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(33,53,88,0.92) 0%,rgba(33,53,88,0.6) 50%,rgba(13,12,13,0.5) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.55) 0%,transparent 45%)"}}/>
      <div style={{position:"relative",zIndex:5,maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",paddingBottom:"clamp(2.5rem,5vw,4rem)",width:"100%"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"clamp(0.6rem,1vw,1rem)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(14px)",transition:"all 0.7s ease 0.2s",flexWrap:"wrap"}}>
          {[{label:"Granada",href:"/"},{label:"CBE",href:"/granada-school"}].map((bc,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
              <a href={bc.href} style={{color:"rgba(255,255,255,0.55)",textDecoration:"none",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.55)")}>{bc.label}</a>
              <span style={{color:"var(--secondary)",fontSize:"clamp(0.65rem,0.9vw,0.72rem)"}}>›</span>
            </span>
          ))}
          <span style={{color:"#fff",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>Contact</span>
        </div>
        <p style={{color:"var(--secondary)",textTransform:"uppercase",letterSpacing:"0.28em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"clamp(0.4rem,0.8vw,0.6rem)",opacity:loaded?1:0,transition:"opacity 0.7s ease 0.3s"}}>Get in Touch</p>
        <h1 className="font-display" style={{fontSize:"clamp(2.2rem,5.5vw,4.2rem)",fontWeight:600,lineHeight:1.05,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
          Contact <span style={{color:"var(--accent-light)"}}>Granada School</span>
        </h1>
        <div style={{width:"clamp(35px,4.5vw,50px)",height:2,background:"var(--secondary)",opacity:loaded?1:0,transition:"opacity 0.7s ease 0.5s"}}/>
      </div>
    </section>
  );
}

/* ── CONTACT INFO ──────────────────────────────────────────────────────────── */
function ContactInfo(){
  const {ref,vis}=useInView(0.08);
  return(
    <section ref={ref} className="section-cream" style={{padding:"clamp(3rem,6vw,5rem) clamp(1rem,2vw,2rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div className="section-header-block" style={{marginBottom:"clamp(2rem,3.5vw,3rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Reach Us</p>
          <h2 className="section-heading">How to <em>Find Us</em></h2>
          <div className="divider"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(1.5rem,3vw,2.5rem)"}} className="contact-info-grid">
          {/* Cards */}
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(0.8rem,1.5vw,1.2rem)",opacity:vis?1:0,transform:vis?"none":"translateX(-20px)",transition:"all 0.9s ease"}} className="contact-cards-grid">
            {[
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.1z"/></svg>,
                label:"Admissions Office",lines:["+254 714 848 289","+254 717 682 138"],href:"tel:+254714848289"},
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
                label:"Email",lines:["admissions@granadaschools.group"],href:"mailto:admissions@granadaschools.group"},
              {icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                label:"Location",lines:["Vipingo, Kilifi County","Kenya"],href:"https://maps.google.com/?q=Vipingo+Kilifi+County+Kenya"},
            ].map((c,i)=>(
              <a key={i} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel={c.href.startsWith("http")?"noopener noreferrer":undefined}
                style={{display:"flex",alignItems:"flex-start",gap:"clamp(0.8rem,1.5vw,1.2rem)",padding:"clamp(1rem,1.8vw,1.5rem)",background:"#fff",border:"1px solid rgba(0,0,0,0.06)",textDecoration:"none",transition:"all 0.3s",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--primary)";e.currentTarget.style.boxShadow="0 4px 20px rgba(33,53,88,0.08)";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,0.06)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
                <div style={{width:"clamp(36px,4.5vw,44px)",height:"clamp(36px,4.5vw,44px)",background:"rgba(52,105,136,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{c.icon}</div>
                <div>
                  <p style={{fontSize:"clamp(0.6rem,0.82vw,0.68rem)",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"var(--primary)",marginBottom:"0.3rem"}}>{c.label}</p>
                  {c.lines.map((l,j)=><p key={j} style={{fontSize:"clamp(0.82rem,1.05vw,0.92rem)",color:"var(--body-text)",lineHeight:1.6}}>{l}</p>)}
                </div>
              </a>
            ))}
          </div>
          {/* Map */}
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.9s ease 0.15s",minHeight:"clamp(260px,30vw,380px)",position:"relative",overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)"}}>
            <iframe
              title="Granada School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.5!2d39.78!3d-3.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNDknMTIuMCJTIDM5wrA0Nic0OC4wIkU!5e0!3m2!1sen!2ske!4v1"
              style={{border:0,width:"100%",height:"100%",position:"absolute",inset:0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"/>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.contact-info-grid{grid-template-columns:1fr 1fr!important}.contact-cards-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── ENQUIRY FORM ──────────────────────────────────────────────────────────── */
function EnquiryForm(){
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "general";
  const {ref,vis}=useInView(0.06);
  const [activeType,setActiveType]=useState(()=>{
    const found = ENQUIRY_TYPES.find(t=>t.id===initialType);
    return found ? initialType : "general";
  });
  const [form,setForm]=useState<Record<string,string>>({full_name:"",email:"",phone_number:"",message:""});
  const [submitted,setSubmitted]=useState(false);

  const currentType = ENQUIRY_TYPES.find(t=>t.id===activeType)!;

  const handleTypeChange=(id:string)=>{
    setActiveType(id);
    setForm({full_name:"",email:"",phone_number:"",message:""});
    setSubmitted(false);
  };

  const baseFields:FieldDef[] = [
    {key:"full_name",label:"Full Name",type:"text",required:true,placeholder:"Enter your full name"},
    {key:"email",label:"Email Address",type:"email",required:activeType!=="callback",placeholder:"your.email@example.com"},
    ...( activeType==="callback" || activeType==="feedback" ? [] : [{key:"phone_number",label:"Phone Number",type:"tel" as const,placeholder:"+254 7XX XXX XXX"}]),
  ];

  const allFields = [...baseFields,...currentType.fields.filter(f=>!baseFields.some(b=>b.key===f.key))];

  const handleSubmit=()=>{
    for(const f of allFields){
      if(f.required && !form[f.key]?.trim()){
        return;
      }
    }
    setSubmitted(true);
  };

  return(
    <section id="enquiry-form" ref={ref} className="section-blue" style={{padding:"clamp(3rem,6vw,6rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div className="section-header-block" style={{textAlign:"center",marginBottom:"clamp(1.5rem,3vw,2.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Enquiry Form</p>
          <h2 className="section-heading">Send Us a <em>Message</em></h2>
          <div className="divider" style={{margin:"1.25rem auto"}}/>
          <p className="body-text">Select the type of enquiry below and fill in the form. Our team will respond within 48 hours.</p>
        </div>

        {/* Type Selector */}
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem",justifyContent:"center",marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transition:"opacity 0.8s ease 0.2s"}}>
          {ENQUIRY_TYPES.map(t=>(
            <button key={t.id} onClick={()=>handleTypeChange(t.id)}
              style={{padding:"0.45rem 1rem",background:activeType===t.id?"var(--secondary)":"rgba(255,255,255,0.08)",color:activeType===t.id?"var(--dark)":"rgba(255,255,255,0.75)",border:activeType===t.id?"1px solid var(--secondary)":"1px solid rgba(255,255,255,0.2)",cursor:"pointer",fontSize:"clamp(0.58rem,0.82vw,0.66rem)",fontWeight:activeType===t.id?700:500,letterSpacing:"0.06em",textTransform:"uppercase",transition:"all 0.3s",fontFamily:"inherit"}}>
              {t.label}
            </button>
          ))}
        </div>

        {submitted?(
          <div style={{textAlign:"center",padding:"clamp(2rem,4vw,3.5rem)",background:"rgba(170,194,12,0.12)",border:"1px solid rgba(170,194,12,0.3)",opacity:vis?1:0,transition:"opacity 0.8s ease"}}>
            <p style={{fontSize:"clamp(1.6rem,2.5vw,2rem)",marginBottom:"0.5rem"}}>✓</p>
            <h3 style={{color:"#fff",fontSize:"clamp(1.1rem,1.6vw,1.3rem)",fontWeight:700,marginBottom:"0.5rem"}}>Message Sent</h3>
            <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(0.8rem,1vw,0.88rem)",marginBottom:"1.5rem"}}>Thank you for reaching out. Our team will get back to you shortly.</p>
            <button onClick={()=>{setSubmitted(false);setForm({full_name:"",email:"",phone_number:"",message:""});}}
              style={{padding:"0.55rem 1.8rem",background:"var(--secondary)",color:"var(--dark)",border:"none",cursor:"pointer",fontSize:"clamp(0.6rem,0.82vw,0.68rem)",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.3s",fontFamily:"inherit"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#96ac0a";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--secondary)";}}>
              Send Another
            </button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:"clamp(0.7rem,1.2vw,1rem)",opacity:vis?1:0,transform:vis?"none":"translateY(16px)",transition:"all 0.9s ease 0.15s"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(0.7rem,1.2vw,1rem)"}} className="form-grid">
              {allFields.map(f=>(
                <div key={f.key}>
                  <label style={{display:"block",color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.6rem,0.8vw,0.68rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:"0.35rem"}}>
                    {f.label}{f.required&&<span style={{color:"var(--secondary)",marginLeft:"0.25rem"}}>*</span>}
                  </label>
                  {f.type==="textarea"?(
                    <textarea rows={4} placeholder={f.placeholder} value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      style={{width:"100%",padding:"clamp(0.55rem,0.9vw,0.75rem) clamp(0.7rem,1vw,0.9rem)",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",fontSize:"clamp(0.8rem,1vw,0.88rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit",resize:"vertical"}}
                      onFocus={e=>(e.currentTarget.style.borderColor="var(--secondary)")} onBlur={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.2)")}/>
                  ):f.type==="select"?(
                    <select value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      style={{width:"100%",padding:"clamp(0.55rem,0.9vw,0.75rem) clamp(0.7rem,1vw,0.9rem)",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",color:form[f.key]?"#fff":"rgba(255,255,255,0.5)",fontSize:"clamp(0.8rem,1vw,0.88rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit",appearance:"auto"}}
                      onFocus={e=>(e.currentTarget.style.borderColor="var(--secondary)")} onBlur={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.2)")}>
                      <option value="" style={{background:"#213558"}}>Select…</option>
                      {f.options?.map(o=><option key={o.value} value={o.value} style={{background:"#213558"}}>{o.label}</option>)}
                    </select>
                  ):(
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      style={{width:"100%",padding:"clamp(0.55rem,0.9vw,0.75rem) clamp(0.7rem,1vw,0.9rem)",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",fontSize:"clamp(0.8rem,1vw,0.88rem)",outline:"none",transition:"border-color 0.2s",fontFamily:"inherit"}}
                      onFocus={e=>(e.currentTarget.style.borderColor="var(--secondary)")} onBlur={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.2)")}/>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleSubmit}
              style={{alignSelf:"flex-start",padding:"clamp(0.6rem,1vw,0.8rem) clamp(1.8rem,3vw,2.8rem)",background:"var(--secondary)",color:"var(--dark)",fontSize:"clamp(0.62rem,0.85vw,0.7rem)",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",border:"none",cursor:"pointer",transition:"all 0.3s",fontFamily:"inherit",marginTop:"0.5rem"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#96ac0a";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--secondary)";e.currentTarget.style.transform="none";}}>
              Submit Enquiry
            </button>
            <p style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(0.62rem,0.78vw,0.7rem)",lineHeight:1.6}}>
              For urgent matters, call <a href="tel:+254714848289" style={{color:"var(--secondary)",textDecoration:"none"}}>+254 714 848 289</a> or email <a href="mailto:admissions@granadaschools.group" style={{color:"var(--secondary)",textDecoration:"none"}}>admissions@granadaschools.group</a>.
            </p>
          </div>
        )}
      </div>
      <style>{`@media(min-width:640px){.form-grid{grid-template-columns:1fr 1fr!important}}.form-grid>div:has(textarea){grid-column:1/-1}`}</style>
    </section>
  );
}

/* ── FOOTER ────────────────────────────────────────────────────────────────── */
function Footer(){
  return(
    <footer style={{background:"var(--dark)",padding:"clamp(2.5rem,5vw,4rem) clamp(1rem,2vw,2rem) clamp(1.2rem,2vw,1.8rem)"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"clamp(2rem,4vw,3rem)",marginBottom:"clamp(2rem,3vw,3rem)"}}>
          <div style={{minWidth:200}}>
            <Image src="/g-school-dark.svg" alt="Granada School" width={100} height={40} style={{height:"auto",width:"clamp(60px,8vw,100px)",marginBottom:"1rem"}}/>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:"clamp(0.72rem,0.88vw,0.8rem)",lineHeight:1.7,maxWidth:280}}>Junior &amp; Senior Girls&#39; Boarding Secondary School — Competency-Based Education in Vipingo, Kilifi County.</p>
          </div>
          <div style={{display:"flex",gap:"clamp(2rem,4vw,4rem)",flexWrap:"wrap"}}>
            <div>
              <p style={{color:"var(--secondary)",fontSize:"clamp(0.55rem,0.78vw,0.62rem)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"0.8rem"}}>Quick Links</p>
              {[{l:"About",h:"/granada-school/about"},{l:"Admissions",h:"/granada-school/admissions"},{l:"Academics",h:"/granada-school/academics"},{l:"Campus Life",h:"/granada-school/campus-life"},{l:"Contact",h:"/granada-school/contact"}].map(({l,h})=>(
                <a key={l} href={h} style={{display:"block",color:"rgba(255,255,255,0.6)",textDecoration:"none",fontSize:"clamp(0.72rem,0.88vw,0.8rem)",padding:"0.25rem 0",transition:"color 0.2s"}}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.6)")}>{l}</a>
              ))}
            </div>
            <div>
              <p style={{color:"var(--secondary)",fontSize:"clamp(0.55rem,0.78vw,0.62rem)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"0.8rem"}}>Contact</p>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:"clamp(0.72rem,0.88vw,0.8rem)",lineHeight:1.8}}>
                +254 714 848 289<br/>+254 717 682 138<br/>admissions@granadaschools.group<br/>Vipingo, Kilifi County, Kenya
              </p>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"clamp(1rem,1.5vw,1.5rem)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.5rem"}}>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:"clamp(0.62rem,0.78vw,0.7rem)"}}>© {new Date().getFullYear()} Granada Schools. All rights reserved.</p>
          <div style={{display:"flex",gap:"0.5rem"}}>
            {["F","X","I","L","Y"].map(k=>(
              <a key={k} href="#" style={{width:24,height:24,border:"1px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.5)",fontSize:"0.5rem",fontWeight:700,textDecoration:"none",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--secondary)";e.currentTarget.style.color="var(--secondary)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>{k}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE EXPORT ───────────────────────────────────────────────────────────── */
export default function ContactPage(){
  return(
    <>
      <Navbar/>
      <main style={{background:"var(--body-bg)"}}>
        <Hero/>
        <ContactInfo/>
        <Suspense fallback={null}><EnquiryForm/></Suspense>
      </main>
      <Footer/>
    </>
  );
}
