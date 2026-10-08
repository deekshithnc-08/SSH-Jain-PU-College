document.addEventListener('DOMContentLoaded',()=>{
  const body=document.body,header=document.querySelector('.masthead'),toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.future-nav');
  const updateHeader=()=>header?.classList.toggle('is-scrolled',scrollY>24); updateHeader(); addEventListener('scroll',updateHeader,{passive:true});
  toggle?.addEventListener('click',()=>{const open=body.classList.toggle('menu-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{body.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false')}));
  document.querySelectorAll('[data-stream-tab]').forEach(tab=>tab.addEventListener('click',()=>{
    const key=tab.dataset.streamTab;
    document.querySelectorAll('[data-stream-tab]').forEach(t=>t.setAttribute('aria-selected',String(t===tab)));
    document.querySelectorAll('[data-stream-panel]').forEach(p=>p.hidden=p.dataset.streamPanel!==key);
  }));
  const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12}):null;
  document.querySelectorAll('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
  const faculty=document.querySelector('[data-faculty-grid]');
  if(faculty&&window.STAFF_GROUPS){
    const prefix=body.dataset.assetPrefix||'../assets/images/';
    const all=window.STAFF_GROUPS.flatMap(section=>section.people.map(person=>Array.isArray(person)?{name:person[0],role:person[1],qualification:person[2],image:person[3],group:section.title}:{...person,group:section.title}));
    const controls=[...document.querySelectorAll('[data-faculty-filter]')];
    const destinations=['all','Teaching Faculty','Non-Teaching Staff','Laboratory Assistants'];
    const labels=['All','Teaching faculty','Office team','Laboratory team'];
    controls.forEach((button,index)=>{button.dataset.facultyFilter=destinations[index]||'all';button.textContent=labels[index]||'All'});
    const render=filter=>{faculty.innerHTML=all.filter(p=>filter==='all'||p.group===filter).map(p=>`<article class="faculty-card"><img src="${prefix}${p.image}" alt="Portrait of ${p.name}" loading="lazy"><div class="faculty-info"><h3>${p.name}</h3><p>${p.role||p.group}</p><p>${p.qualification||''}</p></div></article>`).join('')};
    render('all'); document.querySelectorAll('[data-faculty-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-faculty-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.facultyFilter)}));
  }
  document.querySelector('[data-enquiry-form]')?.addEventListener('submit',e=>{e.preventDefault();const note=document.querySelector('[data-form-note]');if(note)note.textContent='Thank you. Your enquiry is ready to be connected to the college Google Sheet.'});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
});
