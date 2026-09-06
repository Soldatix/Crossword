(() => {
  'use strict';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Could not load ${src}`));
      document.head.appendChild(script);
    });
  }

  async function boot() {
    try {
      const response = await fetch('app-core.js', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Could not fetch app-core.js (${response.status})`);

      let source = await response.text();
      const marker = '\n})();';
      const markerIndex = source.lastIndexOf(marker);
      if (markerIndex < 0) throw new Error('Could not prepare Crossword public API');

      const publicApi = `\n  window.CrosswordApp = Object.freeze({\n    buildCrossword,\n    startPlayer,\n    hashString,\n    languageName\n  });\n`;

      source = source.slice(0, markerIndex) + publicApi + source.slice(markerIndex);
      const blobUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
      try {
        await loadScript(blobUrl);
      } finally {
        URL.revokeObjectURL(blobUrl);
      }

      await loadScript('library.js');
      await loadScript('replay.js');
    } catch (error) {
      console.error('Crossword enhanced loader failed, using core fallback.', error);
      await loadScript('app-core.js');
      await loadScript('replay.js');
    }

    try {
      await loadScript('flags.js?v=2');
    } catch (error) {
      console.warn('Crossword SVG language menu could not be loaded.', error);
    }
  }

  boot();
})();
