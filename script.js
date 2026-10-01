const staff = [
  {name:'Banakar Veeranna',role:'Lecturer',photo:'staff-01.png'},
  {name:'K. M. Vishwanatha',role:'Lecturer',photo:'staff-02.png'},
  {name:'Linga Naik',role:'Lecturer',photo:'staff-03.png'},
  {name:'M. Umesh Reddy',role:'Lecturer',photo:'staff-04.png'},
  {name:'Nagachampa H. M.',role:'Lecturer',photo:'staff-05.png'},
  {name:'Satisha M. S.',role:'Lecturer',photo:'staff-06.png'},
  {name:'Parashuramappa N.',role:'Lecturer',photo:'staff-07.png'},
  {name:'Savitri Karigar',role:'Lecturer',photo:'staff-08.png'},
  {name:'Sindhu Kobbajji',role:'Lecturer',photo:'staff-09.png'},
  {name:'Veeraiah Hirematada',role:'Lecturer',photo:'staff-10.png'},
  {name:'P. Sanna Patreppa',role:'Office Staff',photo:'staff-12.png'},
  {name:'Chiranjeevi Neelagar',role:'Office Staff',photo:'staff-14.png'},
  {name:'Mallikarjuna K. M.',role:'Office Staff',photo:'staff-16.png'},
  {name:'Mathihalli Deviramma',role:'Office Staff',photo:'staff-17.png'},
  {name:'Shivakumara P.',role:'Office Staff',photo:'staff-18.png'}
];

const facultyGrid = document.querySelector('#faculty-grid');
staff.forEach((person) => {
  const card = document.createElement('article');
  card.className = 'faculty-card';
  card.innerHTML = `<div class="faculty-photo"><img loading="lazy" src="${person.photo}" alt="${person.name}"></div><div class="faculty-info"><h3>${person.name}</h3><p>${person.role}</p></div>`;
  facultyGrid.appendChild(card);
});

document.querySelectorAll('.stream-tab').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.stream-tab').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected','false'); });
  document.querySelectorAll('.stream-panel').forEach((panel) => { panel.hidden = true; panel.classList.remove('active'); });
  button.classList.add('active'); button.setAttribute('aria-selected','true');
  const panel = document.querySelector(`[data-panel="${button.dataset.stream}"]`); panel.hidden = false; panel.classList.add('active');
}));

document.querySelectorAll('.read-more').forEach((button) => button.addEventListener('click', () => {
  const copy = button.previousElementSibling; const collapsed = copy.classList.toggle('collapsed'); button.textContent = collapsed ? 'Read full message' : 'Show less';
}));

// Paste the deployed Google Apps Script Web App URL here to record applications in Google Sheets.
const GOOGLE_SHEETS_WEB_APP_URL = '';
document.querySelector('#application-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget; const status = document.querySelector('#form-status'); const button = form.querySelector('button[type="submit"]');
  if (!GOOGLE_SHEETS_WEB_APP_URL) { status.textContent = 'Online submission is being connected. Please contact the college office to apply today.'; status.className = 'form-status full notice'; return; }
  button.disabled = true; button.textContent = 'Submitting…'; status.textContent = '';
  try {
    const payload = Object.fromEntries(new FormData(form)); payload.submittedAt = new Date().toISOString();
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(payload)});
    form.reset(); status.textContent = 'Thank you. Your application enquiry has been received.'; status.className = 'form-status full success';
  } catch { status.textContent = 'We could not submit your enquiry. Please contact the college office.'; status.className = 'form-status full error'; }
  finally { button.disabled = false; button.textContent = 'Submit application enquiry'; }
});

const menuButton = document.querySelector('.menu-button'); const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }));
document.querySelector('#year').textContent = new Date().getFullYear();
