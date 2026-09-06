(() => {
  'use strict';

  const labels = {
    hr: 'Igraj ponovno',
    en: 'Play again',
    de: 'Noch einmal spielen',
    it: 'Gioca di nuovo',
    es: 'Jugar de nuevo'
  };

  function initReplay() {
    const playerCard = document.getElementById('playerCard');
    const playerGrid = document.getElementById('playerGrid');
    const playerMessage = document.getElementById('playerMessage');
    const uiLanguage = document.getElementById('uiLanguage');

    if (!playerCard || !playerGrid || !playerMessage) return;

    const actions = document.createElement('div');
    actions.id = 'replayActions';
    actions.className = 'export-actions hidden';

    const button = document.createElement('button');
    button.id = 'playAgainButton';
    button.className = 'button primary';
    button.type = 'button';
    actions.appendChild(button);
    playerMessage.insertAdjacentElement('afterend', actions);

    function currentLanguage() {
      const lang = uiLanguage?.value || document.documentElement.lang || 'en';
      return labels[lang] ? lang : 'en';
    }

    function updateLabel() {
      button.textContent = `↻ ${labels[currentLanguage()]}`;
    }

    function puzzleIsFinished() {
      const cells = [...playerGrid.querySelectorAll('.cw-cell.open')];
      return cells.length > 0 && cells.every(cell => {
        const input = cell.querySelector('input');
        return input && input.value && cell.classList.contains('correct');
      });
    }

    function updateVisibility() {
      actions.classList.toggle('hidden', !puzzleIsFinished());
    }

    button.addEventListener('click', () => {
      actions.classList.add('hidden');

      const inputs = [...playerGrid.querySelectorAll('.cw-cell.open input')];
      inputs.forEach(input => {
        input.value = '';
        const cell = input.closest('.cw-cell');
        cell?.classList.remove('correct', 'wrong', 'word-active', 'cell-active');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      playerGrid.querySelectorAll('.cw-cell').forEach(cell => {
        cell.classList.remove('correct', 'wrong', 'word-active', 'cell-active');
      });

      playerMessage.textContent = '';
      playerMessage.className = 'message';

      const firstInput = playerGrid.querySelector('.cw-cell.open input');
      if (firstInput) {
        firstInput.focus();
        firstInput.closest('.cw-cell')?.classList.add('cell-active');
      }
    });

    uiLanguage?.addEventListener('change', updateLabel);
    updateLabel();

    const observer = new MutationObserver(updateVisibility);
    observer.observe(playerGrid, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });

    playerGrid.addEventListener('input', () => requestAnimationFrame(updateVisibility));
    updateVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReplay, { once: true });
  } else {
    initReplay();
  }
})();
