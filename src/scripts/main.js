/**
 * Dynamic Design & Constructions — site initialisation
 * This file is loaded with `defer`, so the DOM is already parsed when it runs.
 */

/* ===== Year ===== */
const initYear = () => {
  const yearElement = document.getElementById('year');
  if (!yearElement) {
    return;
  }
  yearElement.textContent = String(new Date().getFullYear());
};

/* ===== Mobile Menu ===== */
const initMobileMenu = () => {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) {
    return;
  }

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
};

/* ===== Project Tabs ===== */
const initProjectTabs = () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const categories = document.querySelectorAll('.project-category');

  if (tabs.length === 0) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update active tab
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Show target category
      categories.forEach((cat) => {
        cat.classList.remove('active');
        if (cat.id === `tab-${target}`) {
          cat.classList.add('active');
        }
      });
    });
  });
};

/* ===== Scroll Reveal ===== */
const initScrollReveal = () => {
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
};

/* ===== Active Nav Highlighting ===== */
const initActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length === 0 || navLinks.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'white';
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
};

/* ===== Init ===== */
const initSite = () => {
  initYear();
  initMobileMenu();
  initProjectTabs();
  initScrollReveal();
  initActiveNav();
};

// `defer` guarantees the DOM is ready — no need for DOMContentLoaded.
initSite();
