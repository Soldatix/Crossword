(() => {
  'use strict';

  const SELECT_IDS = ['uiLanguage', 'crosswordLanguage', 'playLanguage'];

  const LANGUAGE_NAMES = {
    hr: 'Hrvatski',
    en: 'English',
    de: 'Deutsch',
    it: 'Italiano',
    es: 'Español'
  };

  const FLAGS = {
    hr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="6.667" fill="#ff0000"/><rect y="6.667" width="30" height="6.666" fill="#fff"/><rect y="13.333" width="30" height="6.667" fill="#171796"/><path d="M12 5.4h6v6.4c0 2.25-1.25 3.65-3 4.45-1.75-.8-3-2.2-3-4.45z" fill="#fff" stroke="#d1182b" stroke-width=".55"/><path d="M12.35 6h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm2.2 0h.9v1.1h-.9zm-3.3 1.1h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm-3.3 2.2h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm2.2 0h.9v1.1h-.9zm-3.3 1.1h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1z" fill="#d1182b"/></svg>`,
    en: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4"/></svg>`,
    de: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="6.667" fill="#000"/><rect y="6.667" width="30" height="6.666" fill="#dd0000"/><rect y="13.333" width="30" height="6.667" fill="#ffce00"/></svg>`,
    it: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/></svg>`,
    es: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="5" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/><rect y="15" width="30" height="5" fill="#aa151b"/><rect x="8" y="7" width="2.1" height="4.5" rx=".25" fill="#aa151b"/><circle cx="9.05" cy="6.7" r="1" fill="#aa151b"/></svg>`
  };

  function flagDataUri(language) {
    const svg = FLAGS[language] || FLAGS.en;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  function normalizeOptions(select) {
    Array.from(select.options).forEach(option => {
      if (LANGUAGE_NAMES[option.value]) option.textContent = LANGUAGE_NAMES[option.value];
    });
  }

  function applyFlag(select) {
    const language = LANGUAGE_NAMES[select.value] ? select.value : 'en';
    select.style.backgroundImage = flagDataUri(language);
    select.style.backgroundRepeat = 'no-repeat';
    select.style.backgroundPosition = '12px center';
    select.style.backgroundSize = '24px 16px';
    select.style.paddingLeft = '46px';
  }

  function enhanceSelect(select) {
    if (!select || select.dataset.svgFlags === '1') return;
    select.dataset.svgFlags = '1';
    normalizeOptions(select);
    applyFlag(select);
    select.addEventListener('change', () => applyFlag(select));
  }

  function enhanceLanguageSelects() {
    SELECT_IDS.forEach(id => enhanceSelect(document.getElementById(id)));
  }

  enhanceLanguageSelects();
})();
