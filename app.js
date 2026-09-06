(() => {
  'use strict';

  function loadScript(src, onload) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = onload || null;
    script.onerror = () => console.error(`Could not load ${src}`);
    document.head.appendChild(script);
  }

  loadScript('app-core.js', () => loadScript('replay.js'));
})();
