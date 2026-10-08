const staffGroups = [
  {title:'Teaching Faculty', people:[
    ['Dr. Sharath A. M.','Principal · Economics','D.Com., B.Ed., M.A., Ph.D.','principal-sharath.jpg'],
    ['Banakar Veeranna','Kannada Lecturer','M.A.','staff-01.png'],
    ['Parashuramappa N.','Kannada Lecturer','M.A.','staff-07.png'],
    ['Veerabhadrappa N.','Kannada Lecturer','M.A.','staff-veerabhadrappa.jpg'],
    ['Savitri Karigar','English Lecturer','M.A.','staff-08.png'],
    ['Veeraiah Hirematada','Sanskrit Lecturer','M.A.','staff-10.png'],
    ['Linga Naik','History Lecturer','M.A.','staff-03.png'],
    ['M. Umesh Reddy','Economics Lecturer','M.A.','staff-04.png'],
    ['K. M. Vishwanatha','Political Science Lecturer','M.A.','staff-02.png'],
    ['Basavarajappa M.','Education Lecturer','M.Ed.','staff-11.png'],
    ['Satisha M. S.','Education Lecturer','M.Ed.','staff-06.png'],
    ['Nagachampa H. M.','Business Studies & Accountancy Lecturer','','staff-05.png'],
    ['Sindhu Kobbajji','Computer Science Lecturer','M.Sc. Computer Science','staff-09.png'],
    ['Ganesh','Chemistry Lecturer','M.Sc.','staff-ganesh.jpg'],
    ['Shikari Sankranthi','Biology Lecturer','M.Sc.','staff-shikari-sankranthi.jpg'],
    ['Mangala','Physics Lecturer','','staff-mangala.jpg'],
    ['H. Vinayak','Mathematics Lecturer','M.Sc., B.Ed.','staff-h-vinayak.jpg']
  ]},
  {title:'Non-Teaching Staff', people:[
    ['P. Sanna Patreppa','Office Staff','9th Standard','staff-12.png'],
    ['Chiranjeevi Neelagar','Assistant Librarian','M.Lib.','staff-14.png'],
    ['P. Shivakumara','Office Staff','B.A.','staff-18.png'],
    ['Mallikarjuna K. M.','Attender','9th Standard','staff-16.png'],
    ['M. Deviramma','Attender','PUC','staff-17.png']
  ]},
  {title:'Laboratory Assistants', people:[
    ['Channaveerappa M.','Laboratory Assistant','PUC, B.A.','staff-15.png'],
    ['Mahamad Rafi N.','Laboratory Assistant','Diploma','staff-19.png'],
    ['S. Kotresh','Laboratory Assistant','SSLC','staff-13.png'],
    ['Suresh U.','Laboratory Assistant','SSLC','staff-20.png']
  ]}
];

const facultyGroups = document.querySelector('#faculty-groups');
staffGroups.forEach((group) => {
  const section = document.createElement('section');
  section.className = 'faculty-group';
  section.innerHTML = `<div class="faculty-group-heading"><h3>${group.title}</h3><span>${group.people.length} members</span></div><div class="faculty-grid"></div>`;
  const grid = section.querySelector('.faculty-grid');
  group.people.forEach(([name, role, qualification, photo]) => {
    const card = document.createElement('article');
    card.className = 'faculty-card';
    card.innerHTML = `<div class="faculty-photo"><img loading="lazy" src="${photo}" alt="${name}"></div><div class="faculty-info"><h3>${name}</h3><p class="faculty-role">${role}</p>${qualification ? `<p class="faculty-qualification">${qualification}</p>` : ''}</div>`;
    grid.appendChild(card);
  });
  facultyGroups.appendChild(section);
});

document.querySelectorAll('.achievement-slider').forEach((slider) => {
  const track = slider.querySelector('.achievement-track');
  slider.querySelectorAll('[data-slide]').forEach((button) => button.addEventListener('click', () => {
    const amount = track.clientWidth;
    track.scrollBy({left: button.dataset.slide === 'next' ? amount : -amount, behavior:'smooth'});
  }));
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
