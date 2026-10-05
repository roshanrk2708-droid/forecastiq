const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');
const reveals = document.querySelectorAll('.reveal');

document.getElementById('year').textContent = new Date().getFullYear();
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Please complete the required fields.';
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent(`ForecastIQ inquiry: ${data.get('interest')}`);
  const body = encodeURIComponent(
`Name: ${data.get('firstName')} ${data.get('lastName')}
Email: ${data.get('email')}
Company: ${data.get('company') || 'Not provided'}
Area of interest: ${data.get('interest')}

Challenge:
${data.get('message')}`);
  status.textContent = 'Opening your email app…';
  window.location.href = `mailto:roshanrk2708@gmail.com?subject=${subject}&body=${body}`;
});
