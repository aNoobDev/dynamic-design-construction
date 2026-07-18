const initYear = () => {
  const yearElement = document.getElementById('year');
  if (!yearElement) {
    return;
  }

  const currentYear = new Date().getFullYear();
  yearElement.textContent = String(currentYear);
};

const initSite = () => {
  initYear();
};

document.addEventListener('DOMContentLoaded', initSite);
