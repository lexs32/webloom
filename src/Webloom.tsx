import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Menu, Plus, X } from 'lucide-react';
import { PROFILE, PROJECTS, FAQS, SERVICES } from './portfolio-data';
import './webloom.css';

const projects = PROJECTS.filter(project => project.id !== 'vogue');
const sampleReviews = [
  { role: 'Store owner · Sample', service: 'Storefront Design', quote: 'We wanted a storefront with its own personality. The design brought everything together, from the homepage to the smallest product detail.' },
  { role: 'Brand founder · Sample', service: 'Website Redesign', quote: 'The new layout gives our products room to breathe. It feels considered on every screen, with a much clearer path through the store.' },
  { role: 'Project lead · Sample', service: 'Design & Development', quote: 'One person to work with, a clear direction, and thoughtful details throughout. The finished website feels like a complete experience.' },
  { role: 'Store owner · Sample', service: 'Custom Integrations', quote: 'The important parts work together naturally. Browsing, product information, and checkout all feel connected to the same brand.' },
];

function DiscordIcon() {
  return <img src="/assets/webloom/discord.svg" width="21" height="21" alt="" />;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export default function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || '/');
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const [service, setService] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState(false);
  const reduce = useReducedMotion();
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const home = route === '/';
  const selectedProject = projects.find(project => route === `/work/${project.id}`);

  useEffect(() => {
    const update = () => {
      setRoute(location.hash.slice(1) || '/');
      setMenu(false);
      setService(null);
      setDraft(false);
    };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  useEffect(() => {
    const section = route === '/services' ? 'services-section' : route === '/faq' ? 'faq-section' : null;
    if (section) requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' }));
    else window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${selectedProject ? selectedProject.name : route === '/contact' ? 'Contact' : home ? 'Cheat Website Design & Development' : 'About & Services'} — Webloom`;
  }, [route, home, reduce, selectedProject]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    if (service === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setService(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [service]);

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(PROFILE.discord);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch { location.hash = '/contact'; }
  }

  function contact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Webloom project inquiry — ${String(data.get('name'))}`);
    const body = encodeURIComponent(`Name: ${String(data.get('name'))}\nEmail: ${String(data.get('email'))}\n\n${String(data.get('message'))}`);
    location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setDraft(true);
  }

  function Header() {
    return <header className={`site-header ${home ? 'home-header' : ''}`}>
      <nav aria-label="Main navigation" className="desktop-nav">
        {[['Home', '/'], ['About', '/about'], ['Services', '/services'], ['FAQ', '/faq']].map(([label, href]) => <a key={href} href={`#${href}`} className={route === href ? 'active' : ''} aria-current={route === href ? 'page' : undefined}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="social-discord" aria-label={copied ? 'Discord username copied' : 'Copy Discord username .yvko'} onClick={copyDiscord}>{copied ? <Check size={20} /> : <DiscordIcon />}</button>
        <a className="button button-small header-contact" href="#/contact">Get in Touch <ArrowUpRight size={14} /></a>
        <button className="menu-toggle" aria-expanded={menu} aria-controls="mobile-navigation" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{menu && <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduce ? 0 : 0.3 }}>{[['Home','/'],['About','/about'],['Services','/services'],['FAQ','/faq']].map(([label, href]) => <a key={href} href={`#${href}`} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={26}/></a>)}</motion.nav>}</AnimatePresence>
    </header>;
  }

  function Footer() {
    return <footer><a className="footer-brand" href="#/">Webloom<span>®</span></a><p>Independent design. Built by LexS.</p><div><button onClick={copyDiscord}>{copied ? 'Copied!' : 'Discord .yvko'}<ArrowUpRight size={14}/></button><a href={`mailto:${PROFILE.email}`}>Email<ArrowUpRight size={14}/></a><span>© {new Date().getFullYear()}</span></div></footer>;
  }

  function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
    return <Reveal className={`project-wrap project-${index}`}><a href={`#/work/${project.id}`} className="project-card" aria-label={`View ${project.name} project`}>
      <div className="project-image"><img src={project.image} alt={`${project.name} website design by Webloom`} loading={index ? 'lazy' : 'eager'} width="1280" height="720" /></div>
      <div className="project-caption"><div><span className="eyebrow">{project.category}</span><h2>{project.name}</h2><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><span className="project-arrow"><ArrowUpRight size={24}/></span></div>
      <span className="project-number">0{index+1} / SELECTED WORK</span>
    </a></Reveal>;
  }

  return <><a className="skip-link" href="#main" onClick={event=>{event.preventDefault();document.getElementById("main")?.focus();document.getElementById("main")?.scrollIntoView();}}>Skip to content</a>{Header()}
    <main id="main" tabIndex={-1}>
      <AnimatePresence mode="wait">
      <motion.div key={home ? 'home' : selectedProject ? selectedProject.id : route === '/contact' ? 'contact' : 'about'} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.22 }} onAnimationComplete={() => { const id = route === '/services' ? 'services-section' : route === '/faq' ? 'faq-section' : null; if(id) document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' }); else window.scrollTo({top:0,behavior:'instant'}); }}>
      {home ? <>
        <div className="home-layout">
          <section className="hero" aria-labelledby="hero-heading">
            <div className="cloud-scene" aria-hidden="true"><img src="/assets/webloom/white-clouds.webp" alt=""/></div>
            <div className="hero-content">
              <motion.div className="availability" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduce?0:0.15}}><i/>Available for select projects</motion.div>
              <motion.div className="identity" initial={reduce?false:{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}}><a href="#/" className="wordmark">Webloom<span>®</span></a><div><span>LexS</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div></motion.div>
              <motion.div initial={reduce?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.8,ease:[0.22,1,0.36,1]}}>
                <h1 id="hero-heading"><span>Your next</span><br/>cheat website.</h1>
                <p className="hero-description">Distinctive websites for cheat brands.<br className="desktop-break"/> I design and build storefronts that feel as good as they look — from the first click to checkout.</p>
                <div className="hero-buttons"><a className="button" href="#/contact">Get in Touch<ArrowUpRight size={16}/></a><a className="button button-ghost" href="#/about">See More Info<ArrowRight size={16}/></a></div>
              </motion.div>
              <motion.div className="hero-bottom" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduce?0:0.65}}><div className="tags"><a href="#/services">Web design</a><a href="#/services">Storefronts</a><a href="#/services">Development</a></div><a className="text-link" href="#/services">Explore services<ArrowUpRight size={14}/></a></motion.div>
              <a className="scroll-cue" href="#/work/riftcheats">Explore the work <ArrowDown size={15}/></a>
            </div>
          </section>
          <section className="work-column" aria-label="Selected website projects">{projects.map((project,index)=><ProjectCard key={project.id} project={project} index={index}/>)}<Reveal><div className="your-project"><span className="eyebrow">THE NEXT ONE COULD BE YOURS</span><h2>Your project here.</h2><p>A new store, a better experience, a brand worth remembering.</p><a className="button" href="#/contact">Let’s Build It<ArrowUpRight size={17}/></a></div></Reveal></section>
        </div>{Footer()}
      </> : selectedProject ? <div className="inner-page project-page">
        <a className="back-link" href="#/"><ArrowLeft size={16}/> Back to selected work</a>
        <Reveal className="project-intro"><div><div className="tags">{selectedProject.tags.map(tag=><span key={tag}>{tag}</span>)}</div><h1>{selectedProject.name}</h1><p>{selectedProject.description}</p><a className="button" href={selectedProject.url} target="_blank" rel="noreferrer">View Live Project<ArrowUpRight size={17}/></a></div><dl><div><dt>Industry</dt><dd>Gaming</dd></div><div><dt>Studio</dt><dd>Webloom</dd></div><div><dt>Focus</dt><dd>{selectedProject.category}</dd></div></dl></Reveal>
        <Reveal className="detail-image"><img src={selectedProject.image} alt={`${selectedProject.name} homepage`} width="1280" height="720"/></Reveal>
        <Reveal className="project-story"><span className="eyebrow">THE EXPERIENCE</span><div><h2>Built around the product.</h2><p>{selectedProject.description}</p><p>Clear hierarchy, a focused browsing experience, and a consistent visual identity across desktop and mobile.</p></div></Reveal>
        <div className="project-next"><a href={`#/work/${projects[(projects.indexOf(selectedProject)+projects.length-1)%projects.length].id}`}><ArrowLeft size={18}/>Previous project</a><a href={`#/work/${projects[(projects.indexOf(selectedProject)+1)%projects.length].id}`}>Next project<ArrowRight size={18}/></a></div>
        <ContactCallout/>{Footer()}
      </div> : route === '/contact' ? <div className="inner-page contact-page">
        <Reveal className="section-heading"><span className="section-pill">LET’S TALK</span><h1>Something in mind?</h1><p>A new store or a fresh start. Tell me what you’re thinking.</p></Reveal>
        <div className="contact-grid"><Reveal className="contact-info"><div className="contact-cloud" aria-hidden="true"/><div><span className="eyebrow">YOUR NEXT CREATIVE PARTNER</span><h2>Let’s make it<br/>worth the click.</h2><p>Work directly with LexS.<br/>Design, development, and the details in between.</p><span className="contact-label">Email</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}<ArrowUpRight size={18}/></a><span className="contact-label">Discord</span><button onClick={copyDiscord}>{PROFILE.discord}{copied?<Check size={18}/>:<Copy size={18}/>}</button><span className="copy-status" role="status">{copied?'Discord username copied':''}</span></div></Reveal>
          <Reveal><form onSubmit={contact}><label htmlFor="name">Your name</label><input id="name" name="name" placeholder="Your name" autoComplete="name" required maxLength={100}/><label htmlFor="email">Email address</label><input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required/><label htmlFor="message">What are we building?</label><textarea id="message" name="message" placeholder="Your brand, the idea, a few references…" required maxLength={5000}/><button type="submit" className="button">Take the First Step<ArrowUpRight size={19}/></button><p className="form-note" role="status">{draft?'Your email draft is ready in your mail app. You can also email me directly.':'Opens a draft in your email app. Prefer Discord? Find me at .yvko.'}</p></form></Reveal>
        </div>{Footer()}
      </div> : <div className="inner-page about-page">
        <section className="about-hero"><Reveal><span className="section-pill">ABOUT WEBLOOM</span><h1>Good design.<br/><span>Better experiences.</span></h1><p>I’m LexS, the designer and developer behind Webloom. I work with cheat brands to turn their ideas into distinctive, easy-to-use websites.</p><p>From a first impression to a connected storefront, I handle the visuals, the build, and the small details that make it all feel right.</p><a className="button" href="#/contact">Let’s Talk<ArrowUpRight size={17}/></a></Reveal><div className="floating-work" aria-hidden="true">{projects.slice(0,3).map((project,i)=><img key={project.id} src={project.image} alt="" className={`floating-shot shot-${i}`} loading="lazy"/>)}</div></section>
        <section id="services-section" className="services-section"><Reveal className="section-heading"><span className="section-pill">SERVICES</span><h2>From the idea<br/><span>to the last detail.</span></h2><p>Design, development, and the systems your store runs on.<br/>Every project is scoped around what you need.</p></Reveal><div className="service-grid">{SERVICES.map((item,index)=><Reveal key={item.title}><button className="service-card" onClick={()=>setService(index)}><span className="section-pill">0{index+1} / WEBLOOM</span><h3>{item.title}</h3><span className="service-quote">Let’s discuss your project<ArrowUpRight size={18}/></span><p>{item.intro}</p><span className="service-details">Explore service<Plus size={17}/></span></button></Reveal>)}<Reveal><a href="#/contact" className="service-card service-cta"><span className="section-pill">SOMETHING ELSE?</span><h3>Let’s figure<br/>it out.</h3><p>Send your idea, your existing website, or a reference you love.</p><span className="service-details">Get in Touch<ArrowUpRight size={20}/></span></a></Reveal></div></section>
        <section className="reviews-section" aria-labelledby="reviews-heading"><Reveal className="section-heading"><span className="section-pill">REVIEWS</span><h2 id="reviews-heading">A few kind words.</h2><p className="sample-disclosure">Layout preview · These are example testimonials,<br/>not Webloom client reviews. Real feedback will replace these before publishing.</p></Reveal><div className="review-window"><div className="review-track">{[...sampleReviews,...sampleReviews].map((review,index)=><article className="review-card" key={index} aria-hidden={index>=sampleReviews.length?true:undefined}><div><span className="review-avatar">{review.role.slice(0,1)}</span><div><span>{review.role}</span><small>Sample review · {review.service}</small></div></div><p>“{review.quote}”</p><span className="sample-tag">SAMPLE — NOT A WEBLOOM REVIEW</span></article>)}</div></div></section>
        <section id="faq-section" className="faq-section"><Reveal className="section-heading"><span className="section-pill">A FEW ANSWERS</span><h2>Before we start.</h2><p>The useful things to know.</p></Reveal><div className="faq-list">{FAQS.map((item,index)=><div className={`faq-item ${faq===index?'open':''}`} key={item.question}><h3><button aria-expanded={faq===index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={()=>setFaq(faq===index?null:index)}>{item.question}<Plus size={22}/></button></h3><div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={faq!==index}><div><p>{item.answer}</p><ul>{item.details.map(detail=><li key={detail}>{detail}</li>)}</ul></div></div></div>)}</div></section>
        <ContactCallout/>{Footer()}
      </div>}
      </motion.div></AnimatePresence>
    </main>
    <AnimatePresence>{service!==null&&<ServiceDialog item={SERVICES[service]} onClose={()=>setService(null)}/>}</AnimatePresence>
    <span className="global-copy-status" role="status">{copied?'Discord .yvko copied':''}</span>
  </>;
}

function ContactCallout() {
  return <Reveal className="contact-callout"><span className="eyebrow">YOUR BRAND. YOUR NEXT CHAPTER.</span><h2>Let’s build something<br/>worth remembering.</h2><a className="button" href="#/contact">Get in Touch<ArrowUpRight size={19}/></a></Reveal>;
}

function ServiceDialog({ item, onClose }: { item: typeof SERVICES[number]; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(()=> { dialog.current?.showModal(); return ()=>dialog.current?.close(); },[]);
  return <motion.dialog ref={dialog} className="service-dialog" aria-labelledby="service-dialog-title" initial={{opacity:0,y:20,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12}} onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===event.currentTarget)onClose();}}><button className="dialog-close" aria-label="Close service details" onClick={onClose}><X size={22}/></button><span className="section-pill">WHAT’S INCLUDED</span><h2 id="service-dialog-title">{item.title}</h2><p>{item.intro}</p><ul>{item.details.map(detail=><li key={detail}>{detail}</li>)}</ul><p>{item.next}</p><a className="button" href="#/contact" onClick={onClose}>Discuss your project<ArrowUpRight size={17}/></a></motion.dialog>;
}
