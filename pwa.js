const translations = {
  en: {
    title: 'Install Crossword',
    prompt: 'Install this web app for quick access from your device.',
    guide: 'Use your browser menu and choose Install app or Add to Home Screen.',
    install: 'Install',
    dismiss: 'Not now',
    installed: 'Crossword was installed.'
  },
  hr: {
    title: 'Instaliraj Crossword',
    prompt: 'Instalirajte ovu web-aplikaciju za brzi pristup s uređaja.',
    guide: 'U izborniku preglednika odaberite Instaliraj aplikaciju ili Dodaj na početni zaslon.',
    install: 'Instaliraj',
    dismiss: 'Ne sada',
    installed: 'Crossword je instaliran.'
  },
  de: {
    title: 'Crossword installieren',
    prompt: 'Installiere diese Web-App für schnellen Zugriff auf deinem Gerät.',
    guide: 'Öffne das Browsermenü und wähle App installieren oder Zum Startbildschirm hinzufügen.',
    install: 'Installieren',
    dismiss: 'Nicht jetzt',
    installed: 'Crossword wurde installiert.'
  },
  it: {
    title: 'Installa Crossword',
    prompt: 'Installa questa web app per accedervi rapidamente dal dispositivo.',
    guide: 'Apri il menu del browser e scegli Installa app o Aggiungi alla schermata Home.',
    install: 'Installa',
    dismiss: 'Non ora',
    installed: 'Crossword è stato installato.'
  },
  es: {
    title: 'Instalar Crossword',
    prompt: 'Instala esta aplicación web para acceder rápidamente desde tu dispositivo.',
    guide: 'Abre el menú del navegador y elige Instalar aplicación o Añadir a la pantalla de inicio.',
    install: 'Instalar',
    dismiss: 'Ahora no',
    installed: 'Crossword se ha instalado.'
  }
};

const panel = document.getElementById('installPanel');
const title = document.getElementById('installTitle');
const message = document.getElementById('installMessage');
const installButton = document.getElementById('installAppButton');
const dismissButton = document.getElementById('dismissInstallButton');
const languageSelect = document.getElementById('uiLanguage');

let deferredInstallPrompt = null;
let installCompleted = localStorage.getItem('crosswordPwaInstalled') === '1';
let installDismissed = sessionStorage.getItem('crosswordInstallDismissed') === '1';
const installRequested = new URLSearchParams(window.location.search).get('install') === 'web';

function currentLanguage() {
  const saved = localStorage.getItem('ag-crossword-ui-language');
  if (saved && translations[saved]) return saved;
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (translations[browser]) return browser;
  const selected = languageSelect?.value;
  return selected && translations[selected] ? selected : 'en';
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function stripInstallRequest() {
  const url = new URL(window.location.href);
  if (url.searchParams.get('install') !== 'web') return;
  url.searchParams.delete('install');
  const search = url.searchParams.toString();
  history.replaceState({}, '', url.pathname + (search ? '?' + search : '') + url.hash);
}

function renderInstallPanel() {
  if (!panel) return;
  if (!installRequested || isStandalone() || installCompleted || installDismissed) {
    panel.hidden = true;
    return;
  }

  const t = translations[currentLanguage()];
  title.textContent = t.title;
  message.textContent = deferredInstallPrompt ? t.prompt : t.guide;
  installButton.textContent = t.install;
  dismissButton.textContent = t.dismiss;
  installButton.hidden = !deferredInstallPrompt;
  panel.hidden = false;
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installCompleted = false;
  localStorage.removeItem('crosswordPwaInstalled');
  renderInstallPanel();
});

window.addEventListener('appinstalled', () => {
  installCompleted = true;
  localStorage.setItem('crosswordPwaInstalled', '1');
  deferredInstallPrompt = null;
  stripInstallRequest();
  if (panel) panel.hidden = true;
});

window.matchMedia('(display-mode: standalone)').addEventListener?.('change', renderInstallPanel);
languageSelect?.addEventListener('change', renderInstallPanel);

installButton?.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  if (choice.outcome === 'accepted') {
    installCompleted = true;
    localStorage.setItem('crosswordPwaInstalled', '1');
    stripInstallRequest();
    panel.hidden = true;
  } else {
    renderInstallPanel();
  }
});

dismissButton?.addEventListener('click', () => {
  installDismissed = true;
  sessionStorage.setItem('crosswordInstallDismissed', '1');
  panel.hidden = true;
});

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('Crossword service worker registration failed.', error);
    });
  });
}

renderInstallPanel();
