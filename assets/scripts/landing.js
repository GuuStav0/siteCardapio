/**
 * landing.js
 * Comportamento da landing page do D'Gusta Café.
 * Responsável pelo scroll reveal das seções.
 */

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));
