/**
 * @file main.js
 * @description Core interaction logic for Dynamic Design & Construction website.
 *              Handles mobile navigation, project tab filtering, scroll-reveal
 *              animations, and active nav highlighting.
 *
 * @author  Aftab Alam
 * @version 1.7
 * @license MIT
 *
 * Architecture Notes:
 * - Zero external dependencies — all features use native browser APIs.
 * - Loaded with the `defer` attribute, so the DOM is fully parsed when this runs.
 * - Each feature is isolated into its own `init*()` function for maintainability.
 * - All DOM queries use `getElementById` / `querySelectorAll` with early-return
 *   guards so features degrade gracefully if elements are missing.
 */

// ─────────────────────────────────────────────────────────────
// 1. FOOTER YEAR
// ─────────────────────────────────────────────────────────────

/**
 * Injects the current year into the footer copyright element.
 * Targets the element with `id="year"`.
 *
 * @returns {void}
 */
const initYear = () => {
  const yearElement = document.getElementById('year');
  if (!yearElement) {
    return;
  }
  yearElement.textContent = String(new Date().getFullYear());
};

// ─────────────────────────────────────────────────────────────
// 2. MOBILE MENU
// ─────────────────────────────────────────────────────────────

/**
 * Initialises the mobile hamburger menu with the following behaviour:
 *
 * - Toggle button (#menu-toggle) opens/closes the slide-out nav panel.
 * - A dark overlay (#mobile-overlay) dims the background and closes the
 *   menu when tapped.
 * - Body scroll is locked (`overflow: hidden`) while the menu is open.
 * - Clicking a nav link closes the menu, then performs a manual
 *   `window.scrollTo()` after a 400 ms delay. This is necessary because
 *   the default anchor behaviour (`href="#section"`) fails on mobile when
 *   `overflow: hidden` is applied to the body.
 *
 * Z-index stacking order (defined in main.css @media ≤ 900px):
 *   99  → .mobile-overlay  (darkens background)
 *   100 → .nav              (ensures menu escapes hero stacking context)
 *   101 → .nav-links        (slide-out panel, above overlay)
 *   102 → .menu-toggle      (hamburger/X, always clickable)
 *
 * @returns {void}
 */
const initMobileMenu = () => {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-overlay');
  if (!toggle || !navLinks) {
    return;
  }

  /** Shows the slide-out menu panel and locks body scroll. */
  const openMenu = () => {
    toggle.classList.add('active');
    navLinks.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  /** Hides the slide-out menu panel and restores body scroll. */
  const closeMenu = () => {
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Hamburger button toggles the menu
  toggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Tapping the dark overlay closes the menu
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  /**
   * Nav link click handler.
   *
   * On mobile (menu open): prevents default anchor navigation, closes the
   * menu first, then manually scrolls to the target section after 400 ms.
   * The delay ensures the CSS transition completes and `overflow: hidden`
   * is fully removed before the scroll fires.
   *
   * On desktop (menu closed): falls through with no `preventDefault`,
   * letting the browser handle the anchor scroll natively via CSS
   * `scroll-behavior: smooth`.
   */
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

// ─────────────────────────────────────────────────────────────
// 3. PROJECT TABS
// ─────────────────────────────────────────────────────────────

/**
 * Initialises the project portfolio tab-switching UI.
 *
 * Each `.tab-btn` has a `data-tab` attribute (e.g. "residential").
 * Clicking a tab hides all `.project-category` panels and shows the
 * one whose `id` matches `tab-{data-tab}`.
 *
 * @returns {void}
 */
const initProjectTabs = () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const categories = document.querySelectorAll('.project-category');

  if (tabs.length === 0) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Deactivate all tabs, then activate the clicked one
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Hide all categories, then show the matching one
      categories.forEach((cat) => {
        cat.classList.remove('active');
        if (cat.id === `tab-${target}`) {
          cat.classList.add('active');
        }
      });
    });
  });
};

// ─────────────────────────────────────────────────────────────
// 4. SCROLL REVEAL
// ─────────────────────────────────────────────────────────────

/**
 * Adds a fade-in + slide-up entrance animation to elements with
 * the `.reveal` class as they scroll into view.
 *
 * Uses IntersectionObserver (threshold: 10%, bottom offset: -50px).
 * Once an element is revealed, it is unobserved to prevent re-triggering.
 *
 * CSS classes:
 *   .reveal          → opacity: 0; transform: translateY(30px)
 *   .reveal.visible  → opacity: 1; transform: translateY(0)
 *
 * @returns {void}
 */
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

// ─────────────────────────────────────────────────────────────
// 5. ACTIVE NAV HIGHLIGHTING
// ─────────────────────────────────────────────────────────────

/**
 * Highlights the nav link corresponding to the section currently
 * in the viewport. Uses IntersectionObserver with a 30% threshold
 * and a top offset of -80px (to account for any fixed header height).
 *
 * When a section enters the viewport, its matching `.nav-links a`
 * receives `color: white`; all others are reset.
 *
 * @returns {void}
 */
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

// ─────────────────────────────────────────────────────────────
// 6. BOOTSTRAP
// ─────────────────────────────────────────────────────────────

/**
 * Master initialisation — called once when the script loads.
 * The `defer` attribute on the <script> tag guarantees the DOM
 * is fully parsed before this runs, so DOMContentLoaded is unnecessary.
 *
 * @returns {void}
 */
const initSite = () => {
  initYear();
  initMobileMenu();
  initProjectTabs();
  initScrollReveal();
  initActiveNav();
};

initSite();
