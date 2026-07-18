/**
 * Dynamic Design & Construction — site initialisation
 * This file is loaded with `defer`, so the DOM is already parsed when it runs.
 */

const initYear = () => {
  const yearElement = document.getElementById('year');
  if (!yearElement) {
    return;
  }

  yearElement.textContent = String(new Date().getFullYear());
};

const initSite = () => {
  initYear();
};

// `defer` guarantees the DOM is ready — no need for DOMContentLoaded.
initSite();
