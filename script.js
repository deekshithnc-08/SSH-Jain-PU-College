const staff = [
  {name:'Banakar Veeranna',category:'teachers',role:'Teaching Faculty',photo:'staff-01.png'},
  {name:'K. M. Vishwanatha',category:'teachers',role:'Teaching Faculty',photo:'staff-02.png'},
  {name:'Linga Naik',category:'teachers',role:'Teaching Faculty',photo:'staff-03.png'},
  {name:'M. Umesh Reddy',category:'teachers',role:'Teaching Faculty',photo:'staff-04.png'},
  {name:'Nagachampa H. M.',category:'teachers',role:'Teaching Faculty',photo:'staff-05.png'},
  {name:'Satisha M. S.',category:'teachers',role:'Teaching Faculty',photo:'staff-06.png'},
  {name:'Parashuramappa N.',category:'teachers',role:'Teaching Faculty',photo:'staff-07.png'},
  {name:'Savitri Karigar',category:'teachers',role:'Teaching Faculty',photo:'staff-08.png'},
  {name:'Sindhu Kobbajji',category:'teachers',role:'Teaching Faculty',photo:'staff-09.png'},
  {name:'Veeraiah Hirematada',category:'teachers',role:'Teaching Faculty',photo:'staff-10.png'},
  {name:'Basavarajappa M.',category:'temporary',role:'Temporary Teaching Faculty',photo:'staff-11.png'},
  {name:'P. Sanna Patreppa',category:'office',role:'Office & Support',photo:'staff-12.png'},
  {name:'Kotresha Shivapura',category:'office',role:'Office & Support',photo:'staff-13.png'},
  {name:'Chiranjeevi Neelagar',category:'office',role:'Office & Support',photo:'staff-14.png'},
  {name:'Channaveerappa M.',category:'office',role:'Office & Support',photo:'staff-15.png'},
  {name:'Mallikarjuna K. M.',category:'office',role:'Office & Support',photo:'staff-16.png'},
  {name:'Mathihalli Deviramma',category:'office',role:'Office & Support',photo:'staff-17.png'},
  {name:'Shivakumara P.',category:'office',role:'Office & Support',photo:'staff-18.png'},
  {name:'Mahamad Rafi N.',category:'office',role:'Office & Support',photo:'staff-19.png'},
  {name:'Suresh U.',category:'office',role:'Office & Support',photo:'staff-20.png'}
];

const facultyGrid = document.querySelector('#faculty-grid');
staff.forEach((person) => {
  const card = document.createElement('article');
  card.className = 'faculty-card';
  card.dataset.category = person.category;
  const safePhoto = encodeURIComponent(person.photo).replaceAll('%2F','/');
  card.innerHTML = `<div class="faculty-photo"><img loading="lazy" src="${safePhoto}" alt="${person.name}"></div><div class="faculty-info"><h3>${person.name}</h3><p>${person.role}</p></div>`;
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
