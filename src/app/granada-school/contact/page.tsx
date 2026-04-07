"use client";
import Image from "next/image";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";





/* ── NAV DATA ──────────────────────────────────────────────────────────────── */
import SchoolNavbar from '@/components/SchoolNavbar';
import SchoolFooter from '@/components/SchoolFooter';

const NAV_ITEMS = [
  {label:"About Us",href:"/granada-school/about",image:"/building.jpeg",imageCaption:"A Unique Blend of Discovery + Purpose",
    children:[{label:"Principal's Welcome",href:"/granada-school/about/welcome"},{label:"Vision & Mission",href:"/granada-school/about/vision"},{label:"Core Values",href:"/granada-school/about/values"},{label:"Our Story",href:"/granada-school/about/history"},{label:"Boarding",href:"/granada-school/about/boarding"},{label:"Staff & Leadership",href:"/granada-school/about/staff"}]},
  {label:"Admissions",href:"/granada-school/admissions",image:"/dorm.jpeg",imageCaption:"A Unique Blend of Ambition + Opportunity",
    children:[{label:"Introduction",href:"/granada-school/admissions/intro"},{label:"Why Choose Granada",href:"/granada-school/admissions/why-choose"},{label:"Boarding Life",href:"/granada-school/admissions/boarding"},{label:"Admissions Process",href:"/granada-school/admissions/process"},{label:"Apply",href:"/granada-school/admissions/apply"},{label:"Admissions Team",href:"/granada-school/admissions/team"}]},
  {label:"Academic",href:"/granada-school/academics",image:"/class.jpeg",imageCaption:"A Unique Blend of Knowledge + Excellence",
    children:[{label:"Overview",href:"/granada-school/academics/overview"},{label:"CBC Curriculum",href:"/granada-school/academics/cbc"},{label:"School Sections",href:"/granada-school/academics/sections"},{label:"Girls' Boarding",href:"/granada-school/academics/boarding"},{label:"Apply",href:"/granada-school/academics/apply"}]},
  {label:"Campus Life",href:"/granada-school/campus-life",image:"/sports.jpeg",imageCaption:"A Unique Blend of Growth + Community",
    children:[{label:"Facilities",href:"/granada-school/campus-life/facilities"},{label:"Co-Curricular Activities",href:"/granada-school/campus-life/cocurricular"}]},
  {label:"Pastoral & Wellbeing",href:"/granada-school/wellbeing",image:"/sports2.jpeg",imageCaption:"A Unique Blend of Care + Belonging",
    children:[{label:"Wellbeing Approach",href:"/granada-school/wellbeing/approach"},{label:"Counselling",href:"/granada-school/wellbeing/counselling"},{label:"Character Education",href:"/granada-school/wellbeing/character"},{label:"Global Citizenship",href:"/granada-school/wellbeing/global"}]},
  {label:"Latest News",href:"/granada-school/news",image:"/building2.jpeg",imageCaption:"A Unique Blend of Stories + Achievements",
    children:[{label:"Featured Story",href:"/granada-school/news/featured"},{label:"All News",href:"/granada-school/news/all-news"},{label:"Events",href:"/granada-school/news/events"},{label:"Newsletters",href:"/granada-school/news/newsletters"}]},
  {label:"Parents",href:"/granada-school#contact",image:"/staffroom.jpeg",imageCaption:"A Unique Blend of Partnership + Trust",
    children:[{label:"Parent Portal",href:"/granada-school#contact"},{label:"School Calendar",href:"/granada-school#contact"},{label:"Term Dates",href:"/granada-school#contact"}]},
  {label:"Support Us",href:"/granada-school#contact",image:"/art-room.jpeg",imageCaption:"A Unique Blend of Giving + Impact",
    children:[{label:"Bursaries & Scholarships",href:"/granada-school/admissions"},{label:"Donations",href:"/granada-school#contact"},{label:"Community Partnerships",href:"/granada-school#contact"}]},
];

/* ── SIDE NAV ──────────────────────────────────────────────────────────────── */
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
      <div style={{position:"relative",zIndex:5,maxWidth:1280,margin:"0 auto",padding:"0 clamp(1rem,2vw,2rem)",paddingTop:"clamp(140px,16vw,165px)",paddingBottom:"clamp(2.5rem,5vw,4rem)",width:"100%"}}>

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
              src="https://maps.google.com/maps?q=Vipingo,+Kilifi+County,+Kenya&t=&z=14&ie=UTF8&iwloc=&output=embed"
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

/* ── PAGE EXPORT ───────────────────────────────────────────────────────────── */
export default function ContactPage(){
  return(
    <>
      <SchoolNavbar scrolledLogo="/g-school.svg" clearLogo="/g-school-dark.svg" logoAlt="Granada School" logoHref="/granada-school" navItems={NAV_ITEMS} quickLinks={[{label:"Parents",href:"/granada-school#contact"},{label:"Enquire",href:"/granada-school/contact"},{label:"Contact us",href:"/granada-school/contact"}]} enquireHref="/granada-school/contact" applyHref="/granada-school/contact?type=admissions" sideImage="/building.jpeg" sideImageAlt="Granada School"/>
      <main style={{background:"var(--body-bg)"}}>
        <Hero/>
        <ContactInfo/>
        <Suspense fallback={null}><EnquiryForm/></Suspense>
      </main>
      <SchoolFooter logoSrc="/g-school-dark.svg" logoAlt="Granada School" logoHref="/granada-school" tagline="CBE Junior & Senior Girls' Boarding Secondary School." schoolName="Granada School" curriculumLinks={["CBC Kenya","Early Years","Primary School","Junior School","Senior School"]} footerColsClass="footer-cols"/>
    </>
  );
}
