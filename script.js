// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scroll is native via CSS. Enhance: close mobile menu on nav click
mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Animated counters when visible
function animateCounter(element, durationMs) {
  const target = Number(element.getAttribute('data-count-to') || '0');
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const value = Math.floor(start + (target - start) * eased);
    element.textContent = value.toString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statElements = Array.from(document.querySelectorAll('[data-count-to]'));
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, 1200);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
statElements.forEach((el) => observer.observe(el));

// Active nav highlight based on scroll
const sections = ['home', 'services', 'about', 'contact'];
const navLinks = new Map();

document.querySelectorAll('header nav a, #mobileMenu a').forEach((a) => {
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#')) {
    navLinks.set(href.slice(1), a);
  }
});

let currentActive = 'home';
function setActive(sectionId) {
  if (currentActive === sectionId) return;
  // Clear
  document.querySelectorAll('header nav a').forEach((a) => a.classList.remove('text-yellow-300', 'font-semibold'));
  // Set
  const link = navLinks.get(sectionId);
  if (link && link.closest('nav')) {
    link.classList.add('text-yellow-300', 'font-semibold');
  }
  currentActive = sectionId;
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { threshold: 0.6 }
);
sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// Current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());