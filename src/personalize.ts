import { PROFILE, PROJECTS, FAQS, SERVICES } from './portfolio-data';
import './personalize.css';

const grid = document.querySelector<HTMLElement>('[data-lexs-projects]');
if (grid) {
  grid.replaceChildren(...PROJECTS.map((project, index) => {
    const article = document.createElement('article');
    article.className = 'lexs-project';
    article.style.setProperty('--card-angle', index % 2 ? '1deg' : '-1deg');
    const link = document.createElement('a');
    link.href = project.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Visit ${project.name} website`);
    const chrome = document.createElement('div'); chrome.className = 'lexs-window-bar';
    for (let i=0;i<3;i++) chrome.append(document.createElement('i'));
    const address=document.createElement('span');address.textContent=new URL(project.url).hostname;chrome.append(address);
    const image=document.createElement('img');image.src=project.image;image.alt=`${project.name} website homepage`;image.loading='lazy';image.width=1270;image.height=714;
    const info=document.createElement('div');info.className='lexs-project-info';
    const category=document.createElement('small');category.textContent=`0${index+1} / ${project.category}`;
    const title=document.createElement('h3');title.textContent=project.name;
    const description=document.createElement('p');description.textContent=project.description;
    const tags=document.createElement('div');tags.className='lexs-project-tags';
    project.tags.forEach(tag=>{const pill=document.createElement('span');pill.textContent=tag;tags.append(pill);});
    const action=document.createElement('strong');action.className='lexs-project-action';action.textContent='Visit live website ↗';
    info.append(category,title,description,tags,action);link.append(chrome,image,info);article.append(link);return article;
  }));
}

const dialog = document.querySelector<HTMLDialogElement>('#lexs-dialog')!;
const dialogTitle = dialog.querySelector<HTMLElement>('h2')!;
const dialogText = dialog.querySelector<HTMLElement>('[data-dialog-text]')!;
const contactLinks=dialog.querySelector<HTMLElement>('[data-contact-links]')!;
const detailContent=document.createElement('div');
detailContent.className='webloom-dialog-details';
dialogText.after(detailContent);
const eyebrow=document.createElement('span');eyebrow.className='webloom-dialog-eyebrow';
dialogTitle.before(eyebrow);
let activeControl:HTMLElement|null=null;
let closeTimer:ReturnType<typeof setTimeout>|null=null;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function showDialog(title:string, text:string, options:{control?:HTMLElement;kind?:string;color?:string;details?:string[];next?:string;projectIds?:string[]}={}) {
  if(closeTimer){clearTimeout(closeTimer);closeTimer=null;}
  activeControl?.setAttribute('aria-expanded','false');
  activeControl=options.control||null;activeControl?.setAttribute('aria-expanded','true');
  dialog.classList.remove('is-closing');
  dialog.style.setProperty('--dialog-accent',options.color||'#e0fd72');
  eyebrow.textContent=options.kind||'Webloom / Let’s talk';
  dialogTitle.textContent=title;dialogText.textContent=text;contactLinks.hidden=false;
  detailContent.replaceChildren();
  if(options.details?.length){
    const list=document.createElement('ul');
    options.details.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item);});
    detailContent.append(list);
  }
  if(options.projectIds?.length){
    const label=document.createElement('span');label.className='webloom-related-label';label.textContent='See it in the work';
    const links=document.createElement('div');links.className='webloom-related-projects';
    options.projectIds.forEach(id=>{const project=PROJECTS.find(p=>p.id===id);if(!project)return;const link=document.createElement('a');link.href=project.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=project.name+' ↗';links.append(link);});
    detailContent.append(label,links);
  }
  if(options.next){const next=document.createElement('p');next.className='webloom-dialog-next';next.textContent=options.next;detailContent.append(next);}
  if(!dialog.open)dialog.showModal();
}
function activate(control:HTMLElement,action:()=>void){
  control.setAttribute('aria-controls','lexs-dialog');
  control.setAttribute('aria-expanded','false');
  control.addEventListener('click',event=>{event.preventDefault();action();});
  // Native buttons already generate a click on Enter/Space.
  if(!control.matches('button,a[href]'))control.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();action();}});
}
function closeDialog(){
  if(!dialog.open||dialog.classList.contains('is-closing'))return;
  dialog.classList.add('is-closing');
  closeTimer=setTimeout(()=>{dialog.close();dialog.classList.remove('is-closing');closeTimer=null;},reducedMotion.matches?0:180);
}
document.querySelectorAll<HTMLElement>('[data-lexs-contact]').forEach(control=>{
  activate(control,()=>showDialog('Let’s build something yours.', 'I’m LexS, the designer and developer behind Webloom. Tell me what you’re building and we’ll work out the right direction.',{control,details:['Your business or project and what the website needs to do.','Any references, existing assets, and the features you have in mind.','Your preferred timing, so we can agree on a practical scope.'],next:'Email me or copy my Discord username below. I’ll confirm the next steps with you directly.'}));
});
document.querySelectorAll<HTMLElement>('[data-lexs-faq]').forEach(control=>{
  const faq=FAQS[Number(control.dataset.lexsFaq)];if(!faq)return;
  activate(control,()=>showDialog(faq.question,faq.answer,{control,kind:'Webloom / A little more detail',color:['#fedcdd','#c7f8d9','#f3ea9a','#bbdafe','#e0fd72'][Number(control.dataset.lexsFaq)],details:faq.details,next:faq.next}));
});
document.querySelectorAll<HTMLElement>('[data-lexs-service]').forEach(control=>{
  const service=SERVICES[Number(control.dataset.lexsService)];if(!service)return;
  activate(control,()=>showDialog(service.title,service.intro,{control,kind:'Webloom / How I can help',color:'#e2dcfd',details:service.details,next:service.next,projectIds:service.projectIds}));
});
dialog.querySelector('button[data-close]')!.addEventListener('click',closeDialog);
dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog();}});
dialog.querySelector<HTMLAnchorElement>('[data-email]')!.href=`mailto:${PROFILE.email}?subject=Website%20project%20for%20LexS`;
dialog.querySelector<HTMLAnchorElement>('[data-email]')!.textContent=PROFILE.email;
dialog.querySelector<HTMLAnchorElement>('[data-github]')!.href=PROFILE.github;
const copyButton=dialog.querySelector<HTMLButtonElement>('[data-copy-discord]')!;
copyButton.addEventListener('click',async()=>{
  try {await navigator.clipboard.writeText(PROFILE.discord);copyButton.textContent='Copied .yvko';}
  catch {copyButton.textContent='Discord: .yvko';}
});
dialog.addEventListener('close',()=>{copyButton.textContent='Copy Discord .yvko';activeControl?.setAttribute('aria-expanded','false');activeControl=null;});

const dock=document.querySelector<HTMLElement>('[aria-label="Apple Dock Navigation"]');
if(dock){
  const destinations=['aboutsection','project-section','services-section','footer'];
  dock.querySelectorAll<HTMLElement>('[data-dock-link]').forEach((item,index)=>{
    item.dataset.dockLabel=item.querySelector('a')?.getAttribute('aria-label')||'';
    const go=()=>document.getElementById(destinations[index])?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    item.addEventListener('click',go);item.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();go();}});
  });
}

// One entrance per section; float effects pause when the hero leaves view.
if (!reducedMotion.matches) {
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('lexs-in-view');observer.unobserve(entry.target);}}),{threshold:0.08});
  document.querySelectorAll('.lexs-project,.lexs-process-grid article,[data-lexs-service]').forEach((card,index)=>{
    (card as HTMLElement).style.setProperty('--reveal-delay',`${(index%3)*65}ms`);
    card.addEventListener('animationend',event=>{if((event as AnimationEvent).animationName==='lexs-reveal')card.classList.remove('lexs-in-view');});
    observer.observe(card);
  });
  const hero=document.querySelector('.lexs-hero-content');
  if(hero)new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('motion-active',entry.isIntersecting)),{threshold:0}).observe(hero);
}
