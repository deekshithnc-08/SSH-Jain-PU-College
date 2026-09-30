const staff = [
  {name:'Banakar Veeranna',category:'teachers',role:'Teaching Faculty',photo:'B VEERESH.png'},
  {name:'K. M. Vishwanatha',category:'teachers',role:'Teaching Faculty',photo:'K M VISWANATH.png'},
  {name:'Linga Naik',category:'teachers',role:'Teaching Faculty',photo:'LINGANAIK.png'},
  {name:'M. Umesh Reddy',category:'teachers',role:'Teaching Faculty',photo:'M UMESHREDDY.png'},
  {name:'Nagachampa H. M.',category:'teachers',role:'Teaching Faculty',photo:'NAGACHAMPA H M.png'},
  {name:'Satisha M. S.',category:'teachers',role:'Teaching Faculty',photo:'SATISHA M S.png'},
  {name:'Parashuramappa N.',category:'teachers',role:'Teaching Faculty',photo:'PARASHUMAPPA N.png'},
  {name:'Savitri Karigar',category:'teachers',role:'Teaching Faculty',photo:'SAVITRI KARIGAR.png'},
  {name:'Sindhu Kobbajji',category:'teachers',role:'Teaching Faculty',photo:'SINDHU KOBBAJJI.png'},
  {name:'Veeraiah Hirematada',category:'teachers',role:'Teaching Faculty',photo:'VEERAIAH.png'},
  {name:'Basavarajappa M.',category:'temporary',role:'Temporary Teaching Faculty',photo:'Basarajappa M.png'},
  {name:'P. Sanna Patreppa',category:'office',role:'Office & Support',photo:'P SANNAPATREPPA.png'},
  {name:'Kotresha Shivapura',category:'office',role:'Office & Support',photo:'S KOTRESH.png'},
  {name:'Chiranjeevi Neelagar',category:'office',role:'Office & Support',photo:'CHIRANJEEVI NEELAGAR.png'},
  {name:'Channaveerappa M.',category:'office',role:'Office & Support',photo:'CHANNAVEERAPPA M.png'},
  {name:'Mallikarjuna K. M.',category:'office',role:'Office & Support',photo:'MALLIKARJUNA K M.png'},
  {name:'Mathihalli Deviramma',category:'office',role:'Office & Support',photo:'MATHIHALLI DEVIRAMMA.png'},
  {name:'Shivakumara P.',category:'office',role:'Office & Support',photo:'SHIVAKUMARA P.png'},
  {name:'Mahamad Rafi N.',category:'office',role:'Office & Support',photo:'MAHAMAD RAFI N.png'},
  {name:'Suresh U.',category:'office',role:'Office & Support',photo:'U SURESH.png'}
];

const facultyGrid = document.querySelector('#faculty-grid');
staff.forEach((person) => {
  const card = document.createElement('article');
  card.className = 'faculty-card';
  card.dataset.category = person.category;
  const safePhoto = encodeURIComponent(person.photo).replaceAll('%2F','/');
  card.innerHTML = `<div class="faculty-photo"><img loading="lazy" src="assets/staff/${safePhoto}" alt="${person.name}"></div><div class="faculty-info"><h3>${person.name}</h3><p>${person.role}</p></div>`;
  facultyGrid.appendChild(card);
});

document.querySelectorAll('.faculty-filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.faculty-filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.faculty-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll('.stream-tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.stream-tab').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.stream-panel').forEach((panel) => { panel.hidden = true; panel.classList.remove('active'); });
    button.classList.add('active');
    button.setAttribute('aria-selected','true');
    const panel = document.querySelector(`[data-panel="${button.dataset.stream}"]`);
    panel.hidden = false;
    panel.classList.add('active');
  });
});

document.querySelectorAll('.read-more').forEach((button) => {
  button.addEventListener('click', () => {
    const copy = button.previousElementSibling;
    const opening = copy.classList.toggle('collapsed');
    button.textContent = opening ? 'Read full message' : 'Show less';
  });
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }));
document.querySelector('#year').textContent = new Date().getFullYear();
