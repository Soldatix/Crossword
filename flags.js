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
    hr: `<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.667" fill="#ff0000"/><rect y="6.667" width="30" height="6.666" fill="#fff"/><rect y="13.333" width="30" height="6.667" fill="#171796"/><path d="M12 5.4h6v6.4c0 2.25-1.25 3.65-3 4.45-1.75-.8-3-2.2-3-4.45z" fill="#fff" stroke="#d1182b" stroke-width=".55"/><path d="M12.35 6h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm2.2 0h.9v1.1h-.9zm-3.3 1.1h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm-3.3 2.2h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1zm2.2 0h.9v1.1h-.9zm-3.3 1.1h1.1v1.1h-1.1zm2.2 0h1.1v1.1h-1.1z" fill="#d1182b"/></svg>`,
    en: `<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4"/></svg>`,
    de: `<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.667" fill="#000"/><rect y="6.667" width="30" height="6.666" fill="#dd0000"/><rect y="13.333" width="30" height="6.667" fill="#ffce00"/></svg>`,
    it: `<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/></svg>`,
    es: `<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="5" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/><rect y="15" width="30" height="5" fill="#aa151b"/><rect x="8" y="7" width="2.1" height="4.5" rx=".25" fill="#aa151b"/><circle cx="9.05" cy="6.7" r="1" fill="#aa151b"/></svg>`
  };

  function installStyles() {
    if (document.getElementById('ag-language-menu-styles')) return;
    const style = document.createElement('style');
    style.id = 'ag-language-menu-styles';
    style.textContent = `
      .ag-language-native {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        padding: 0 !important;
        margin: 0 !important;
        border: 0 !important;
      }
      .ag-language-menu { position: relative; min-width: 0; }
      .ag-language-menu.form-menu { width: 100%; }
      .ag-language-button {
        width: 100%; min-height: 43px; display: flex; align-items: center; gap: 9px;
        border: 1px solid var(--border); border-radius: 11px; padding: 8px 34px 8px 11px;
        background: var(--surface-2); color: var(--text); font: inherit; cursor: pointer;
        text-align: left; position: relative; white-space: nowrap;
      }
      .ag-language-menu.top-menu .ag-language-button {
        min-height: 42px; background: var(--surface); border-radius: 12px; padding-top: 7px; padding-bottom: 7px;
      }
      .ag-language-button:hover { border-color: var(--border-strong); background: var(--surface); }
      .ag-language-button:focus-visible { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 16%, transparent); }
      .ag-language-button .ag-flag, .ag-language-option .ag-flag {
        width: 24px; height: 16px; flex: 0 0 24px; display: inline-flex; border-radius: 2px; overflow: hidden;
        box-shadow: 0 0 0 1px rgba(0,0,0,.16);
      }
      .ag-language-button .ag-flag svg, .ag-language-option .ag-flag svg { width: 100%; height: 100%; display: block; }
      .ag-language-chevron { position: absolute; right: 11px; top: 50%; transform: translateY(-50%); font-size: .72rem; color: var(--muted); }
      .ag-language-options {
        position: absolute; z-index: 10000; left: 0; top: calc(100% + 5px); min-width: 100%; width: max-content;
        background: var(--surface); border: 1px solid var(--border-strong); border-radius: 11px;
        box-shadow: 0 14px 34px rgba(12,24,56,.22); padding: 5px; display: none;
      }
      .ag-language-menu.open .ag-language-options { display: grid; }
      .ag-language-option {
        min-width: 165px; min-height: 38px; display: flex; align-items: center; gap: 9px; padding: 7px 10px;
        border: 0; border-radius: 8px; background: transparent; color: var(--text); font: inherit; text-align: left; cursor: pointer;
      }
      .ag-language-option:hover, .ag-language-option:focus-visible { outline: none; background: var(--surface-3); }
      .ag-language-option.selected { background: color-mix(in srgb, var(--primary) 13%, var(--surface)); font-weight: 700; }
      @media (max-width: 560px) {
        .ag-language-option { min-width: 145px; }
        .ag-language-button .ag-flag, .ag-language-option .ag-flag { width: 22px; height: 15px; flex-basis: 22px; }
      }
    `;
    document.head.appendChild(style);
  }

  function flagMarkup(language) {
    return `<span class="ag-flag">${FLAGS[language] || FLAGS.en}</span>`;
  }

  function closeAll(except = null) {
    document.querySelectorAll('.ag-language-menu.open').forEach(menu => {
      if (menu !== except) {
        menu.classList.remove('open');
        const button = menu.querySelector('.ag-language-button');
        if (button) button.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function enhanceSelect(select) {
    if (!select || select.dataset.svgMenu === '1') return;
    select.dataset.svgMenu = '1';
    select.classList.add('ag-language-native');
    select.tabIndex = -1;

    Array.from(select.options).forEach(option => {
      if (LANGUAGE_NAMES[option.value]) option.textContent = LANGUAGE_NAMES[option.value];
    });

    const menu = document.createElement('div');
    menu.className = `ag-language-menu ${select.id === 'uiLanguage' ? 'top-menu' : 'form-menu'}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ag-language-button';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');

    const options = document.createElement('div');
    options.className = 'ag-language-options';
    options.setAttribute('role', 'listbox');

    Object.entries(LANGUAGE_NAMES).forEach(([language, name]) => {
      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.className = 'ag-language-option';
      optionButton.dataset.language = language;
      optionButton.setAttribute('role', 'option');
      optionButton.innerHTML = `${flagMarkup(language)}<span>${name}</span>`;
      optionButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        if (select.value !== language) {
          select.value = language;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          updateDisplay();
        }
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      });
      options.appendChild(optionButton);
    });

    function updateDisplay() {
      const language = LANGUAGE_NAMES[select.value] ? select.value : 'en';
      button.innerHTML = `${flagMarkup(language)}<span>${LANGUAGE_NAMES[language]}</span><span class="ag-language-chevron" aria-hidden="true">▼</span>`;
      options.querySelectorAll('.ag-language-option').forEach(optionButton => {
        const selected = optionButton.dataset.language === language;
        optionButton.classList.toggle('selected', selected);
        optionButton.setAttribute('aria-selected', selected ? 'true' : 'false');
      });
    }

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !menu.classList.contains('open');
      closeAll(menu);
      menu.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      if (willOpen) {
        const selected = options.querySelector('.ag-language-option.selected');
        selected?.focus({ preventScroll: true });
      }
    });

    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        menu.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        const items = Array.from(options.querySelectorAll('.ag-language-option'));
        const index = Math.max(0, items.findIndex(item => item.dataset.language === select.value));
        items[index]?.focus({ preventScroll: true });
      }
    });

    options.addEventListener('keydown', event => {
      const items = Array.from(options.querySelectorAll('.ag-language-option'));
      const current = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        items[(current + 1) % items.length]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        items[(current - 1 + items.length) % items.length]?.focus();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      }
    });

    select.addEventListener('change', updateDisplay);
    select.insertAdjacentElement('afterend', menu);
    menu.append(button, options);
    updateDisplay();
  }

  installStyles();
  SELECT_IDS.forEach(id => enhanceSelect(document.getElementById(id)));

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeAll();
  });
})();
