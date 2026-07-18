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
  const overlay = document.getElementById('mobile-overlay');
  if (!toggle || !navLinks) {
    return;
  }

  const openMenu = () => {
    toggle.classList.add('active');
    navLinks.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when overlay is tapped
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu when a link is clicked, then scroll manually (mobile-safe)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const isMenuOpen = navLinks.classList.contains('open');

      if (isMenuOpen) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);

        closeMenu();

        if (targetEl) {
          setTimeout(() => {
            const rect = targetEl.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const top = rect.top + scrollTop;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }, 400);
        }
      }
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
