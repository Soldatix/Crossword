(() => {
  'use strict';

  const app = window.CrosswordApp;
  if (!app) {
    console.error('Crossword library could not start because CrosswordApp API is unavailable.');
    return;
  }

  const uiLanguage = document.getElementById('uiLanguage');
  const crosswordLanguage = document.getElementById('crosswordLanguage');
  const playLanguage = document.getElementById('playLanguage');
  const playCategory = document.getElementById('playCategory');
  const loadButton = document.getElementById('loadPuzzleButton');
  const playerMessage = document.getElementById('playerMessage');
  const playerCategoryBadge = document.getElementById('playerCategoryBadge');

  if (!playLanguage || !playCategory || !loadButton) return;

  const CATEGORIES = ['general', 'geography', 'animals', 'sport', 'history', 'nature', 'film', 'music', 'cars', 'science'];

  const labels = {
    hr: {
      general: 'Opće znanje', geography: 'Geografija', animals: 'Životinje', sport: 'Sport', history: 'Povijest', nature: 'Priroda', film: 'Film i TV', music: 'Glazba', cars: 'Automobili', science: 'Znanost',
      loading: 'Učitavanje…', failed: 'Križaljku nije moguće učitati. Pokušajte ponovno.'
    },
    en: {
      general: 'General knowledge', geography: 'Geography', animals: 'Animals', sport: 'Sport', history: 'History', nature: 'Nature', film: 'Film & TV', music: 'Music', cars: 'Cars', science: 'Science',
      loading: 'Loading…', failed: 'The crossword could not be loaded. Please try again.'
    },
    de: {
      general: 'Allgemeinwissen', geography: 'Geografie', animals: 'Tiere', sport: 'Sport', history: 'Geschichte', nature: 'Natur', film: 'Film & TV', music: 'Musik', cars: 'Autos', science: 'Wissenschaft',
      loading: 'Laden…', failed: 'Das Kreuzworträtsel konnte nicht geladen werden. Bitte versuchen Sie es erneut.'
    },
    it: {
      general: 'Cultura generale', geography: 'Geografia', animals: 'Animali', sport: 'Sport', history: 'Storia', nature: 'Natura', film: 'Film e TV', music: 'Musica', cars: 'Automobili', science: 'Scienza',
      loading: 'Caricamento…', failed: 'Impossibile caricare il cruciverba. Riprova.'
    },
    es: {
      general: 'Cultura general', geography: 'Geografía', animals: 'Animales', sport: 'Deporte', history: 'Historia', nature: 'Naturaleza', film: 'Cine y TV', music: 'Música', cars: 'Automóviles', science: 'Ciencia',
      loading: 'Cargando…', failed: 'No se pudo cargar el crucigrama. Inténtalo de nuevo.'
    }
  };

  const cache = new Map();
  let activeLibraryCategory = null;

  function currentUiLanguage() {
    const lang = uiLanguage?.value || document.documentElement.lang || 'en';
    return labels[lang] ? lang : 'en';
  }

  function categoryLabel(category) {
    return labels[currentUiLanguage()]?.[category] || category;
  }

  function updateActiveCategoryBadge() {
    if (playerCategoryBadge && activeLibraryCategory) {
      playerCategoryBadge.textContent = categoryLabel(activeLibraryCategory);
    }
  }

  function populateCategories() {
    const lang = currentUiLanguage();
    const previous = CATEGORIES.includes(playCategory.value) ? playCategory.value : 'general';
    playCategory.textContent = '';
    CATEGORIES.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = labels[lang][category];
      playCategory.appendChild(option);
    });
    playCategory.value = previous;
    updateActiveCategoryBadge();
  }

  function syncPuzzleLanguagesToInterface() {
    const lang = currentUiLanguage();
    if (crosswordLanguage) {
      crosswordLanguage.value = lang;
      crosswordLanguage.dispatchEvent(new Event('change', { bubbles: true }));
    }
    playLanguage.value = lang;
    playLanguage.dispatchEvent(new Event('change', { bubbles: true }));
  }

  async function loadLanguageLibrary(lang) {
    if (cache.has(lang)) return cache.get(lang);
    const promise = fetch(`puzzles/${lang}/library.json`, { cache: 'no-cache' }).then(async response => {
      if (!response.ok) throw new Error(`Library ${lang}: HTTP ${response.status}`);
      const data = await response.json();
      if (!data || data.language !== lang || !data.categories) throw new Error(`Library ${lang}: invalid data`);
      return data;
    });
    cache.set(lang, promise);
    try {
      return await promise;
    } catch (error) {
      cache.delete(lang);
      throw error;
    }
  }

  function puzzleIndexKey(lang, category) {
    return `ag-crossword-library-index-${lang}-${category}`;
  }

  function pickNextPuzzle(lang, category, puzzles) {
    const key = puzzleIndexKey(lang, category);
    const saved = Number.parseInt(localStorage.getItem(key) || '0', 10);
    const index = Number.isFinite(saved) && saved >= 0 ? saved % puzzles.length : 0;
    localStorage.setItem(key, String((index + 1) % puzzles.length));
    return puzzles[index];
  }

  function showLoadError(error) {
    console.error('Crossword library load failed.', error);
    if (playerMessage) {
      playerMessage.textContent = labels[currentUiLanguage()].failed;
      playerMessage.className = 'message error';
    } else {
      window.alert(labels[currentUiLanguage()].failed);
    }
  }

  async function loadSelectedPuzzle(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const lang = playLanguage.value;
    const category = playCategory.value;
    const originalText = loadButton.textContent;
    loadButton.disabled = true;
    loadButton.textContent = labels[currentUiLanguage()].loading;

    try {
      const library = await loadLanguageLibrary(lang);
      const puzzles = library.categories?.[category];
      if (!Array.isArray(puzzles) || !puzzles.length) throw new Error(`No puzzles for ${lang}/${category}`);

      const item = pickNextPuzzle(lang, category, puzzles);
      const entries = item.entries.map(([answer, clue]) => ({ answer, clue }));
      const seed = Number.isInteger(item.seed) ? item.seed : app.hashString(`${item.id}|AppsGamesCrossword`);
      const result = app.buildCrossword(entries, seed);
      if (!result?.puzzle) throw new Error(`Could not build ${item.id}`);

      const puzzle = result.puzzle;
      puzzle.title = item.title;
      puzzle.language = lang;
      puzzle.category = category;
      puzzle.libraryId = item.id;
      puzzle.difficulty = item.difficulty || 'normal';
      puzzle.sourceEntries = entries;
      activeLibraryCategory = category;
      app.startPlayer(puzzle);
      updateActiveCategoryBadge();
    } catch (error) {
      showLoadError(error);
    } finally {
      loadButton.disabled = false;
      loadButton.textContent = originalText;
    }
  }

  loadButton.addEventListener('click', loadSelectedPuzzle, true);
  playLanguage.addEventListener('change', populateCategories);
  uiLanguage?.addEventListener('change', () => {
    setTimeout(() => {
      syncPuzzleLanguagesToInterface();
      populateCategories();
    }, 0);
  });

  populateCategories();
})();
