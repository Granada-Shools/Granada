"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  {label:"About Us",href:"/granada-international/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-international/about#welcome"},{label:"Vision & Aims",href:"/granada-international/about#vision"},{label:"Our Values",href:"/granada-international/about#values"},{label:"Our Story",href:"/granada-international/about#history"},{label:"Staff & Leadership",href:"/granada-international/about#staff"}]},
  {label:"Admissions",href:"/granada-international/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"How to Apply",href:"/granada-international/admissions#process"},{label:"KG–Year 9",href:"/granada-international/admissions#process"},{label:"Senior School",href:"/granada-international/admissions#senior-process"},{label:"Admissions Team",href:"/granada-international/admissions#team"}]},
  {label:"Academic",href:"/granada-international/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-international/academics#overview"},{label:"Edexcel Curriculum",href:"/granada-international/academics#edexcel"},{label:"School Sections",href:"/granada-international/academics#sections"},{label:"University Pathways",href:"/granada-international/academics#university"}]},
  {label:"Campus Life",href:"/granada-international/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Modern Facilities",href:"/granada-international/campus-life#facilities"},{label:"Sports & Athletics",href:"/granada-international/campus-life#sports"},{label:"Arts & Drama",href:"/granada-international/campus-life#arts"},{label:"Co-Curricular",href:"/granada-international/campus-life#cocurricular"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-international/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-international/wellbeing#approach"},{label:"Counselling Support",href:"/granada-international/wellbeing#counselling"},{label:"Character Education",href:"/granada-international/wellbeing#character"},{label:"Global Citizenship",href:"/granada-international/wellbeing#global"}]},
  {label:"Latest News",href:"/granada-international/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"School News",href:"/granada-international/news"},{label:"Events Calendar",href:"/granada-international/news#events"},{label:"Newsletters",href:"/granada-international/news#newsletters"},{label:"Social Media",href:"/granada-international/news#social"}]},
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
  const [slide,setSlide]=useState(0);
  const slides=[
    {src:"/building.jpeg",alt:"Campus achievements"},
    {src:"/building2.jpeg",alt:"Student activities"},
    {src:"/class.jpeg",alt:"School events"},
  ];
  useEffect(()=>setLoaded(true),[]);
  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%slides.length),5500);return()=>clearInterval(t);},[slides.length]);
  return(
    <section style={{position:"relative",height:"70vh",minHeight:540,overflow:"hidden"}}>
      {slides.map((s,i)=>(
        <div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${s.src})`,backgroundSize:"cover",backgroundPosition:"center",opacity:slide===i?1:0,transition:"opacity 1.1s ease",animation:slide===i?"newsKenBurns 18s ease-in-out infinite alternate":"none"}}/>
      ))}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(145deg,rgba(52,105,136,0.88) 0%,rgba(13,12,13,0.6) 60%,rgba(170,194,12,0.15) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,12,13,0.65) 0%,transparent 50%)"}}/>
      {/* Slide counter dots */}
      <div style={{position:"absolute",bottom:"1.5rem",left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",gap:"0.5rem"}}>
        {slides.map((_,i)=>(
          <button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?22:8,height:8,background:i===slide?"var(--secondary)":"rgba(255,255,255,0.4)",border:"none",cursor:"pointer",padding:0,transition:"all 0.4s"}}/>
        ))}
      </div>
      <div style={{position:"absolute",top:"14%",right:"4%",width:"clamp(100px,15vw,180px)",height:"clamp(100px,15vw,180px)",border:"1px solid rgba(170,194,12,0.25)",animation:"newsSpin 32s linear infinite"}}/>
      <div style={{position:"absolute",top:"18%",right:"7%",width:"clamp(55px,8vw,110px)",height:"clamp(55px,8vw,110px)",border:"1px solid rgba(255,255,255,0.12)",animation:"newsSpin 22s linear infinite reverse"}}/>
      <div style={{position:"relative",zIndex:5,height:"100%",maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingBottom:"clamp(2.5rem,4.5vw,5rem)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"clamp(0.8rem,1.5vw,1.25rem)",opacity:loaded?1:0,transition:"all 0.7s ease 0.2s",flexWrap:"wrap"}}>
          {[{label:"Granada",href:"/"},{label:"International",href:"/granada-international"}].map((bc,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:"0.45rem"}}>
              <a href={bc.href} style={{color:"rgba(255,255,255,0.55)",textDecoration:"none",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase"}}>{bc.label}</a>
              <span style={{color:"var(--secondary)"}}>›</span>
            </span>
          ))}
          <span style={{color:"#fff",fontSize:"clamp(0.58rem,0.9vw,0.66rem)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>Latest News</span>
        </div>
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"rgba(52,105,136,0.35)",border:"1px solid rgba(170,194,12,0.4)",padding:"0.3rem 0.8rem",marginBottom:"0.75rem",alignSelf:"flex-start",opacity:loaded?1:0,transition:"all 0.6s ease 0.3s"}}>
          <span style={{width:5,height:5,background:"var(--secondary)",borderRadius:"50%"}}/>
          <span style={{color:"var(--secondary)",fontSize:"clamp(0.5rem,0.75vw,0.58rem)",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:700}}>News · Events · Newsletters · Social</span>
        </div>
        <h1 className="font-display" style={{fontSize:"clamp(2.4rem,6.5vw,5rem)",fontWeight:600,lineHeight:1.02,color:"#fff",marginBottom:"0.5rem",opacity:loaded?1:0,transform:loaded?"none":"translateY(22px)",transition:"all 0.8s ease 0.4s"}}>
          School <span style={{fontStyle:"italic",color:"var(--accent-light)"}}>News & Events</span>
        </h1>
        <div style={{width:"clamp(35px,4.5vw,50px)",height:2,background:"var(--secondary)",marginBottom:"1rem",opacity:loaded?1:0,transition:"all 0.8s ease 0.5s"}}/>
        <p style={{color:"rgba(255,255,255,0.82)",fontSize:"clamp(0.84rem,1.25vw,1rem)",fontWeight:300,maxWidth:530,lineHeight:1.82,marginBottom:"clamp(1.5rem,2.2vw,2.2rem)",opacity:loaded?1:0,transform:loaded?"none":"translateY(18px)",transition:"all 0.8s ease 0.55s"}}>
          Stay connected with the vibrant life of Granada International — the latest stories, upcoming events, newsletters, and community highlights from our campus in Vipingo.
        </p>
        <div style={{display:"flex",gap:"clamp(0.6rem,1vw,0.9rem)",flexWrap:"wrap",opacity:loaded?1:0,transition:"opacity 0.9s ease 0.7s"}}>
          <a href="#latest-news" onClick={e=>{e.preventDefault();document.getElementById("latest-news")?.scrollIntoView({behavior:"smooth",block:"start"});}} className="btn-solid">Read Latest News</a>
          <a href="#events" onClick={e=>{e.preventDefault();document.getElementById("events")?.scrollIntoView({behavior:"smooth",block:"start"});}} style={{display:"inline-block",padding:"clamp(0.55rem,1vw,0.8rem) clamp(1.3rem,2.2vw,2.4rem)",background:"transparent",border:"1px solid rgba(255,255,255,0.6)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"clamp(0.62rem,1vw,0.7rem)",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Upcoming Events</a>
        </div>
      </div>
      <style>{`@keyframes newsKenBurns{0%{transform:scale(1)}100%{transform:scale(1.07)}}@keyframes newsSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}

/* ── TAGLINE STRIP ──────────────────────────────────────────────────────────── */
function TaglineStrip(){
  const tags=["School News","Events Calendar","Newsletters","Social Media","Achievements"];
  return(
    <div style={{background:"var(--primary)",padding:"clamp(0.75rem,1.4vw,1.1rem) clamp(1rem,2vw,2rem)"}}>
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
  const sections=[{label:"Latest News",id:"latest-news"},{label:"Events",id:"events"},{label:"Newsletters",id:"newsletters"},{label:"Social Media",id:"social"}];
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const fn=()=>{for(let i=sections.length-1;i>=0;i--){const el=document.getElementById(sections[i].id);if(el&&window.scrollY>=el.offsetTop-220){setActive(i);break;}}};
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const P="#346988";
  const scrollTo=(id:string)=>{const el=document.getElementById(id);if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:"smooth"});};
  return(
    <aside style={{width:"clamp(120px,12vw,180px)",flexShrink:0,position:"sticky",top:110,alignSelf:"flex-start",display:"none"}} className="news-sidebar">
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"0.72rem",fontStyle:"italic",letterSpacing:"0.06em",color:P,fontWeight:600,marginBottom:"1rem"}}>On this page</p>
      <nav style={{display:"flex",flexDirection:"column",borderLeft:"1px solid #e8e6e3"}}>
        {sections.map((s,i)=>(
          <button key={i} onClick={()=>scrollTo(s.id)} style={{padding:"0.55rem 0 0.55rem 1rem",color:active===i?P:"#5a5a5a",background:"none",border:"none",borderLeft:active===i?`2px solid ${P}`:"2px solid transparent",cursor:"pointer",textAlign:"left",fontSize:"0.72rem",fontWeight:active===i?700:400,transition:"all 0.2s",fontFamily:"inherit",marginLeft:"-1px"}}>{s.label}</button>
        ))}
      </nav>
      <div style={{marginTop:"clamp(1.5rem,2vw,2.25rem)",border:"1px solid #e8e6e3",padding:"clamp(1rem,1.5vw,1.4rem)"}}>
        <p style={{fontSize:"clamp(0.55rem,0.75vw,0.6rem)",letterSpacing:"0.18em",textTransform:"uppercase",color:P,fontWeight:700,marginBottom:"clamp(0.7rem,1vw,0.9rem)"}}>Where Next?</p>
        {[{label:"About Granada",href:"/granada-international/about"},{label:"Academics",href:"/granada-international/academics"},{label:"Campus Life",href:"/granada-international/campus-life"}].map((l,i)=>(
          <a key={i} href={l.href} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#5a5a5a",textDecoration:"none",fontSize:"clamp(0.65rem,0.9vw,0.78rem)",padding:"clamp(0.35rem,0.6vw,0.45rem) 0",borderBottom:"1px solid #f0eee9",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=P)} onMouseLeave={e=>(e.currentTarget.style.color="#5a5a5a")}>
            <svg width="5" height="9" viewBox="0 0 5 9" fill="none"><path d="M1 1l3 3.5L1 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {l.label}
          </a>
        ))}
      </div>
      <style>{`@media(min-width:1024px){.news-sidebar{display:block!important}}`}</style>
    </aside>
  );
}

/* ── LATEST NEWS ────────────────────────────────────────────────────────────── */
const articles = [
  {category:"Academic",date:"December 2024",title:"Granada International Students Excel in Pearson Edexcel IGCSE Examinations",img:"/class.jpeg",excerpt:"An outstanding cohort of Year 10 and 11 students achieved record results in this year's Pearson Edexcel IGCSE examinations, with over 85% securing A*–B grades across core subjects."},
  {category:"Community",date:"November 2024",title:"Granada International Hosts Kilifi County Inter-School Debate Championship",img:"/building.jpeg",excerpt:"Our school proudly hosted the annual Kilifi County inter-school debate competition, welcoming twelve schools from across the region for three days of passionate, high-quality debate."},
  {category:"Sports",date:"November 2024",title:"Girls' Football Team Wins Coast Region U16 Championship",img:"/sports.jpeg",excerpt:"Congratulations to our junior girls' football team who brought home the Coast Region trophy after a closely contested final against Mombasa International School."},
  {category:"Arts & Culture",date:"October 2024",title:"Annual Cultural Evening Celebrates Diversity on the Granada International Stage",img:"/music.jpeg",excerpt:"Students from over 18 nationalities showcased traditional dance, music, poetry, and cuisine in a spectacular evening celebrating the rich multicultural tapestry of our school community."},
  {category:"Service Learning",date:"October 2024",title:"Year 8 Students Complete Coastal Mangrove Restoration Project",img:"/building2.jpeg",excerpt:"Our Year 8 Environmental Stewardship Club partnered with the Kenya Forest Service to plant over 1,200 mangrove seedlings along the Vipingo coastline, as part of our school's commitment to environmental sustainability."},
  {category:"Leadership",date:"September 2024",title:"New Student Council Launches 'One Granada' Community Initiative",img:"/sports2.jpeg",excerpt:"Our newly elected Student Council has launched an ambitious initiative to strengthen school-community bonds through cross-year group mentoring, charity drives, and collaborative projects."},
];

function LatestNews(){
  const {ref,vis}=useInView(0.08);
  const [filter,setFilter]=useState("All");
  const categories=["All","Academic","Community","Sports","Arts & Culture","Service Learning","Leadership"];
  const shown=filter==="All"?articles:articles.filter(a=>a.category===filter);
  return(
    <section id="latest-news" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">From the Campus</p>
          <h2 className="section-heading">Latest <em>News</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>Stories, achievements, and moments from life at Granada International — celebrating our students, staff, and community.</p>
        </div>
        {/* Filter Tabs */}
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transition:"opacity 0.8s ease 0.2s"}}>
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setFilter(cat)} style={{padding:"0.4rem clamp(0.7rem,1.2vw,1.1rem)",fontSize:"clamp(0.56rem,0.78vw,0.68rem)",fontWeight:filter===cat?700:400,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s",border:`1px solid ${filter===cat?"var(--primary)":"#dddbd8"}`,background:filter===cat?"var(--primary)":"#fff",color:filter===cat?"#fff":"var(--muted)",fontFamily:"inherit"}}>{cat}</button>
          ))}
        </div>
        {/* News Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(1.2rem,2vw,2rem)"}} className="news-grid">
          {shown.map((a,i)=>(
            <article key={i} style={{background:"#fff",overflow:"hidden",cursor:"pointer",transition:"all 0.35s",boxShadow:"none",opacity:vis?1:0,transitionDelay:`${i*0.07}s`}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-6px)";(e.currentTarget as HTMLElement).style.boxShadow="0 16px 50px rgba(52,105,136,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
              <div style={{overflow:"hidden",height:"clamp(170px,20vw,240px)",position:"relative"}}>
                <img src={a.img} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s ease"}} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.05)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}/>
                <div style={{position:"absolute",top:12,left:12,background:"var(--primary)",padding:"0.2rem 0.6rem"}}>
                  <span style={{color:"#fff",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>{a.category}</span>
                </div>
              </div>
              <div style={{padding:"clamp(1.2rem,1.8vw,1.6rem)"}}>
                <p style={{fontSize:"0.62rem",color:"var(--secondary)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700,marginBottom:"0.5rem"}}>{a.date}</p>
                <h3 style={{fontSize:"clamp(0.78rem,1.05vw,0.9rem)",fontWeight:700,color:"var(--primary)",lineHeight:1.45,marginBottom:"0.7rem"}}>{a.title}</h3>
                <p style={{fontSize:"clamp(0.65rem,0.8vw,0.72rem)",color:"var(--muted)",lineHeight:1.75,marginBottom:"1rem"}}>{a.excerpt}</p>
                <span style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--primary)"}}>
                  Read More <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"clamp(1.5rem,2.5vw,2.5rem)",opacity:vis?1:0,transition:"opacity 0.9s ease 0.6s"}}>
          <a href="#" className="btn-outline">View All News Articles</a>
        </div>
      </div>
      <style>{`@media(max-width:900px){.news-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){.news-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── EVENTS CALENDAR ──────────────────────────────────────────────────────── */
function EventsCalendar(){
  const {ref,vis}=useInView(0.08);
  const events=[
    {month:"JAN",day:"15",title:"Year 10 & 11 Mock Examinations Begin",type:"Academic",location:"Main Examination Hall"},
    {month:"FEB",day:"03",title:"Kilifi County Schools Golf Tournament",type:"Sports",location:"Vipingo Ridge Golf Course"},
    {month:"FEB",day:"14",title:"Valentine's Arts Exhibition & Sale",type:"Arts",location:"School Art Gallery"},
    {month:"FEB",day:"22",title:"Parent–Teacher Consultations (Term 1)",type:"Parents",location:"Online & On-campus"},
    {month:"MAR",day:"07",title:"International Women's Day Programme",type:"Community",location:"School Theatre"},
    {month:"MAR",day:"14",title:"Granada International Open Day",type:"Admissions",location:"Full Campus"},
    {month:"APR",day:"02",title:"Easter Holiday Begins",type:"Holiday",location:""},
    {month:"APR",day:"28",title:"Term 2 Begins",type:"Academic",location:"All Campuses"},
    {month:"MAY",day:"15",title:"East Africa Schools Science Fair",type:"Academic",location:"Nairobi Convention Centre"},
    {month:"JUN",day:"07",title:"Annual Sports Day — Coast Region",type:"Sports",location:"School Athletics Track"},
    {month:"JUN",day:"21",title:"Pearson Edexcel IGCSE Examinations Begin",type:"Academic",location:"Main Examination Hall"},
    {month:"JUL",day:"12",title:"End of Year Awards & Leavers' Celebrations",type:"Community",location:"School Grounds"},
  ];
  const typeColors:{[k:string]:string}={Academic:"var(--primary)",Sports:"#4a6428",Arts:"#936c51",Parents:"#483454",Community:"#ebae1b",Admissions:"var(--secondary-dark)",Holiday:"#5a5a5a"};
  return(
    <section id="events" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Academic Year 2024–2025</p>
          <h2 className="section-heading">Events <em>Calendar</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>A complete view of the key dates, events, and milestones in the Granada International academic year.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:"rgba(255,255,255,0.08)"}} className="events-grid">
          {events.map((ev,i)=>(
            <div key={i} style={{display:"flex",gap:"clamp(1rem,1.5vw,1.5rem)",padding:"clamp(1rem,1.5vw,1.4rem) clamp(1.2rem,1.8vw,1.6rem)",background:"rgba(255,255,255,0.04)",alignItems:"flex-start",transition:"background 0.25s",cursor:"default",opacity:vis?1:0,transitionDelay:`${i*0.04}s`}} onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.1)"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"}>
              <div style={{flexShrink:0,textAlign:"center",minWidth:"clamp(40px,5vw,55px)"}}>
                <p style={{fontSize:"clamp(0.5rem,0.65vw,0.58rem)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--secondary)",lineHeight:1}}>{ev.month}</p>
                <p className="font-display" style={{fontSize:"clamp(1.4rem,2.5vw,2.2rem)",fontWeight:600,color:"#fff",lineHeight:1}}>{ev.day}</p>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.3rem",flexWrap:"wrap"}}>
                  <span style={{fontSize:"0.54rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:typeColors[ev.type]||"#fff",background:`${typeColors[ev.type]||"#fff"}20`,padding:"0.15rem 0.5rem"}}>{ev.type}</span>
                </div>
                <h4 style={{fontSize:"clamp(0.7rem,0.95vw,0.82rem)",fontWeight:700,color:"#fff",lineHeight:1.4,marginBottom:"0.25rem"}}>{ev.title}</h4>
                {ev.location&&<p style={{fontSize:"clamp(0.58rem,0.7vw,0.65rem)",color:"rgba(255,255,255,0.5)",letterSpacing:"0.06em"}}>{ev.location}</p>}
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"clamp(1.5rem,2.5vw,2.5rem)",textAlign:"center",opacity:vis?1:0,transition:"opacity 0.9s ease 0.5s"}}>
          <a href="mailto:admissions@granadaschools.group" className="btn-green">Request Full Events Calendar</a>
        </div>
      </div>
      <style>{`@media(max-width:700px){.events-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── NEWSLETTERS ────────────────────────────────────────────────────────────── */
function Newsletters(){
  const {ref,vis}=useInView(0.08);
  const issues=[
    {term:"Term 3 2024",title:"Granada International Newsletter — End of Year Edition",highlight:"Year 11 Leavers, Award Winners, Sports Champions & A-Level Results",date:"July 2024",pages:12},
    {term:"Term 2 2024",title:"The Vipingo Bulletin — Term 2 2024",highlight:"STEM Fair, Cultural Night, Boarding Life Feature, Parent Connect",date:"April 2024",pages:10},
    {term:"Term 1 2024",title:"Granada International Newsletter — Opening Edition 2024",highlight:"New Staff Profiles, Curriculum Updates, House System Launch",date:"January 2024",pages:8},
    {term:"Term 3 2023",title:"The Vipingo Bulletin — Year End 2023",highlight:"A-Level University Offers, Sports Day Review, Community Projects",date:"July 2023",pages:11},
    {term:"Term 2 2023",title:"Granada International Newsletter — Term 2 2023",highlight:"IGCSE Mock Results, Drama Production, MUN Champions",date:"April 2023",pages:9},
    {term:"Term 1 2023",title:"The Vipingo Bulletin — 2023 Edition",highlight:"School Expansion Announcement, New Facilities, Scholarship Awards",date:"January 2023",pages:8},
  ];
  return(
    <section id="newsletters" className="section-cream" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">Stay Informed</p>
          <h2 className="section-heading">School <em>Newsletters</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:560}}>Our termly newsletters keep the extended Granada International family connected — featuring student stories, faculty profiles, community projects, and important academic updates.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(1rem,1.5vw,1.5rem)"}} className="nl-grid">
          {issues.map((nl,i)=>(
            <div key={i} style={{background:"#fff",padding:"clamp(1.4rem,2vw,2rem) clamp(1.2rem,1.8vw,1.6rem)",borderBottom:"3px solid var(--primary)",transition:"all 0.3s",cursor:"pointer",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transitionDelay:`${i*0.07}s`}} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLElement).style.boxShadow="0 12px 40px rgba(52,105,136,0.12)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",borderBottom:"1px solid var(--divider-light)",paddingBottom:"0.7rem"}}>
                <span style={{fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--primary)",background:"var(--primary)18",padding:"0.2rem 0.6rem"}}>{nl.term}</span>
                <div style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><path d="M1 0.5h6.5L10 3v9H1V0.5z" stroke="var(--secondary)" strokeWidth="0.9"/><line x1="3" y1="5" x2="8" y2="5" stroke="var(--muted)" strokeWidth="0.8"/><line x1="3" y1="7" x2="8" y2="7" stroke="var(--muted)" strokeWidth="0.8"/><line x1="3" y1="9" x2="6" y2="9" stroke="var(--muted)" strokeWidth="0.8"/></svg>
                  <span style={{fontSize:"0.56rem",color:"var(--muted)"}}>{nl.pages} pages</span>
                </div>
              </div>
              <h3 style={{fontSize:"clamp(0.72rem,0.95vw,0.82rem)",fontWeight:700,color:"var(--primary)",lineHeight:1.4,marginBottom:"0.5rem"}}>{nl.title}</h3>
              <p style={{fontSize:"clamp(0.6rem,0.72vw,0.67rem)",color:"var(--secondary)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",lineHeight:1.5,marginBottom:"0.85rem"}}>{nl.highlight}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"0.6rem",color:"var(--muted)"}}>{nl.date}</span>
                <a href="mailto:admissions@granadaschools.group" style={{fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--primary)",textDecoration:"none",display:"flex",alignItems:"center",gap:"0.3rem"}}>
                  Request PDF →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"clamp(2rem,3vw,3rem)",padding:"clamp(1.5rem,2.5vw,2.5rem)",textAlign:"center",background:"var(--primary)",opacity:vis?1:0,transition:"opacity 0.9s ease 0.5s"}}>
          <p className="font-display" style={{fontSize:"clamp(1rem,1.6vw,1.25rem)",fontStyle:"italic",color:"#fff",marginBottom:"0.8rem"}}>Subscribe to the Granada International Newsletter</p>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",marginBottom:"1.2rem"}}>Receive each edition directly by email — stay fully connected with campus news, events, and achievements.</p>
          <a href="mailto:admissions@granadaschools.group?subject=Newsletter%20Subscription" className="btn-green">Subscribe Now</a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.nl-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.nl-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── SOCIAL MEDIA ─────────────────────────────────────────────────────────── */
function SocialMedia(){
  const {ref,vis}=useInView(0.08);
  const posts=[
    {img:"/building.jpeg",caption:"Year 11 students celebrating their IGCSE results — extraordinary dedication and achievement. Proud of every single one of you! 🎉 #GranadaInternational #IGCSEResults"},
    {img:"/sports.jpeg",caption:"Our girls' football team made us proud at the Coast Region championship. The future of football is bright at Granada! ⚽ #GranadaSports #CoastChampions"},
    {img:"/music.jpeg",caption:"Cultural Night 2024 — a magical evening celebrating every nation in our international community 🌍 #CulturalNight #OneGranada"},
    {img:"/building2.jpeg",caption:"Year 8 planted 1,200 mangrove seedlings along the Vipingo coastline today 🌱 Real students. Real impact. #EnvironmentalStewardship"},
    {img:"/class.jpeg",caption:"Our debate team took 1st place at the Kilifi County Championships! The arguments were fierce — the talent was fiercer 🏆 #MUN #Debate"},
    {img:"/dorm.jpeg",caption:"Boarding life at Granada International — evening prep, house meals, and friendships that last forever 🏠 #BoardingLife"},
  ];
  return(
    <section id="social" className="section-blue" ref={ref} style={{padding:"clamp(3rem,5.5vw,5.5rem) clamp(1rem,2vw,2rem)",scrollMarginTop:"100px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{marginBottom:"clamp(2rem,3vw,3.5rem)",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all 0.8s ease"}}>
          <p className="label-tag">@GranadaInternational</p>
          <h2 className="section-heading">Follow Our <em>Journey</em></h2>
          <div className="divider"/>
          <p className="body-text" style={{maxWidth:580}}>Join us on social media for daily glimpses into the energetic, inspiring life of the Granada International community — from classroom breakthroughs to sporting triumphs and everything in between.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3,background:"rgba(255,255,255,0.12)"}} className="social-grid">
          {posts.map((p,i)=>(
            <div key={i} style={{overflow:"hidden",position:"relative",aspectRatio:"1/1",cursor:"pointer",opacity:vis?1:0,transform:vis?"none":"scale(0.96)",transitionDelay:`${i*0.07}s`,transition:"all 0.6s ease"}} onMouseEnter={ev=>{const overlay=ev.currentTarget.querySelector(".social-overlay") as HTMLElement|null;if(overlay)overlay.style.opacity="1";}} onMouseLeave={ev=>{const overlay=ev.currentTarget.querySelector(".social-overlay") as HTMLElement|null;if(overlay)overlay.style.opacity="0";}}>
              <img src={p.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s"}}/>
              <div className="social-overlay" style={{position:"absolute",inset:0,background:"rgba(52,105,136,0.88)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"1rem",opacity:0,transition:"opacity 0.4s"}}>
                <p style={{color:"#fff",fontSize:"clamp(0.6rem,0.75vw,0.68rem)",lineHeight:1.65,fontWeight:300}}>{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"1rem",marginTop:"clamp(1.5rem,2.5vw,2.5rem)",flexWrap:"wrap",opacity:vis?1:0,transition:"opacity 0.9s ease 0.5s"}}>
          {[{platform:"Instagram",handle:"@granada.international",color:"#e1306c"},{platform:"Facebook",handle:"Granada International School",color:"#1877f2"},{platform:"Twitter/X",handle:"@GranadaIntl",color:"#1da1f2"}].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"0.6rem",padding:"0.65rem 1.2rem",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.18)"}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:s.color}}/>
              <div>
                <p style={{color:"var(--secondary)",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.platform}</p>
                <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.7rem"}}>{s.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:600px){.social-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

/* ── PAGE CTA ─────────────────────────────────────────────────────────────── */
function PageCTA(){
  return(
    <section style={{background:"#4a6428",padding:"clamp(3rem,5vw,5.5rem) clamp(1rem,2vw,2rem)",textAlign:"center"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <p style={{color:"var(--accent-light)",textTransform:"uppercase",letterSpacing:"0.3em",fontSize:"clamp(0.55rem,0.85vw,0.62rem)",fontWeight:700,marginBottom:"1.2rem"}}>Stay Connected</p>
        <h2 className="font-display" style={{fontSize:"clamp(1.8rem,3.8vw,3rem)",fontStyle:"italic",fontWeight:400,color:"#fff",lineHeight:1.3,marginBottom:"1.5rem"}}>
          Never miss a <span style={{color:"var(--accent-light)"}}>Granada moment.</span>
        </h2>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(0.82rem,1.1vw,0.9rem)",fontWeight:300,lineHeight:1.8,marginBottom:"2rem"}}>
          Subscribe to our newsletter, follow us on social media, and stay connected with the stories, achievements, and events that make Granada International exceptional.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:"0.9rem",flexWrap:"wrap"}}>
          <a href="mailto:admissions@granadaschools.group?subject=Newsletter%20Subscription" className="btn-solid" style={{fontSize:"0.68rem",padding:"0.75rem 2rem"}}>Subscribe to Newsletter</a>
          <a href="/granada-international/admissions" style={{display:"inline-block",padding:"0.75rem 2rem",background:"transparent",border:"1px solid rgba(255,255,255,0.5)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.14em",fontSize:"0.68rem",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.15)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Apply to Granada International</a>
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
            {title:"News & Events",links:["Latest News","Events Calendar","Newsletters","Social Media","Achievements"]},
            {title:"School",links:["About Us","Academics","Campus Life","Admissions","Pastoral & Wellbeing"]},
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

export default function NewsPage(){
  return(<>
    <Navbar/>
    <PageHero/>
    <TaglineStrip/>
    <div style={{background:"var(--body-bg)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"clamp(2rem,4vw,4.5rem) clamp(1rem,2vw,2rem) 0",display:"flex",gap:"clamp(2rem,3vw,3.5rem)",alignItems:"flex-start",flexWrap:"wrap"}}>
        <SectionNav/>
        <main style={{flex:1,minWidth:0}}>
          <LatestNews/>
          <EventsCalendar/>
          <Newsletters/>
        </main>
      </div>
    </div>
    <SocialMedia/>
    <PageCTA/>
    <Footer/>
  </>);
}
