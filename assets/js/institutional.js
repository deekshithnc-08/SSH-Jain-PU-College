const institutionalMenu=document.querySelector('.inst-menu');
const institutionalNav=document.querySelector('.inst-nav');
if(institutionalMenu&&institutionalNav){institutionalMenu.addEventListener('click',()=>{const open=institutionalNav.classList.toggle('open');institutionalMenu.setAttribute('aria-expanded',String(open));institutionalMenu.textContent=open?'×':'☰'});institutionalNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{institutionalNav.classList.remove('open');institutionalMenu.setAttribute('aria-expanded','false');institutionalMenu.textContent='☰'}))}
