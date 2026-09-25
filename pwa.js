const translations = {
  en: {
    title: 'Install Crossword',
    description: 'Install the web app for quick access from your device. No traditional installer or Apps & Games account is required.',
    waiting: 'Checking whether this browser can install the app…',
    ready: 'The app is ready to install.',
    installing: 'Installation requested. Complete the browser prompt.',
    installed: 'Crossword is installed on this device.',
    dismissed: 'Installation was cancelled. You can try again by reopening this install page.',
    unavailable: 'Automatic installation is not available in this browser. You can continue in the browser and use Install App or Add to Home Screen when available.',
    install: 'Install Web App',
    continue: 'Continue in browser'
  },
  hr: {
    title: 'Instaliraj Crossword',
    description: 'Instalirajte web-aplikaciju za brži pristup s uređaja. Nije potreban klasični instalacijski program ni Apps & Games račun.',
    waiting: 'Provjerava se podržava li ovaj preglednik instalaciju…',
    ready: 'Aplikacija je spremna za instalaciju.',
    installing: 'Instalacija je zatražena. Dovršite postupak u poruci preglednika.',
    installed: 'Crossword je instaliran na ovom uređaju.',
    dismissed: 'Instalacija je otkazana. Možete pokušati ponovno otvaranjem ove stranice za instalaciju.',
    unavailable: 'Automatska instalacija nije dostupna u ovom pregledniku. Nastavite u pregledniku i upotrijebite Instaliraj aplikaciju ili Dodaj na početni zaslon kada je dostupno.',
    install: 'Instaliraj Web App',
    continue: 'Nastavi u pregledniku'
  },
  de: {
    title: 'Crossword installieren',
    description: 'Installiere die Web-App für schnellen Zugriff auf deinem Gerät. Ein klassisches Installationsprogramm oder Apps-&-Games-Konto ist nicht erforderlich.',
    waiting: 'Es wird geprüft, ob dieser Browser die Installation unterstützt…',
    ready: 'Die App ist zur Installation bereit.',
    installing: 'Installation angefordert. Schließe die Browser-Abfrage ab.',
    installed: 'Crossword ist auf diesem Gerät installiert.',
    dismissed: 'Die Installation wurde abgebrochen. Öffne diese Installationsseite erneut, um es noch einmal zu versuchen.',
    unavailable: 'Die automatische Installation ist in diesem Browser nicht verfügbar. Du kannst im Browser fortfahren und, sofern verfügbar, App installieren oder Zum Startbildschirm hinzufügen verwenden.',
    install: 'Web-App installieren',
    continue: 'Im Browser fortfahren'
  },
  it: {
    title: 'Installa Crossword',
    description: 'Installa la Web App per un accesso rapido dal dispositivo. Non servono un programma di installazione tradizionale né un account Apps & Games.',
    waiting: 'Verifica della possibilità di installare l’app in questo browser…',
    ready: 'L’app è pronta per l’installazione.',
    installing: 'Installazione richiesta. Completa la richiesta del browser.',
    installed: 'Crossword è installato su questo dispositivo.',
    dismissed: 'L’installazione è stata annullata. Riapri questa pagina di installazione per riprovare.',
    unavailable: 'L’installazione automatica non è disponibile in questo browser. Puoi continuare nel browser e usare Installa app o Aggiungi alla schermata Home quando disponibile.',
    install: 'Installa Web App',
    continue: 'Continua nel browser'
  },
  es: {
    title: 'Instalar Crossword',
    description: 'Instala la aplicación web para acceder rápidamente desde tu dispositivo. No necesitas un instalador tradicional ni una cuenta de Apps & Games.',
    waiting: 'Comprobando si este navegador permite instalar la aplicación…',
    ready: 'La aplicación está lista para instalarse.',
    installing: 'Instalación solicitada. Completa el aviso del navegador.',
    installed: 'Crossword está instalado en este dispositivo.',
    dismissed: 'La instalación se canceló. Vuelve a abrir esta página de instalación para intentarlo de nuevo.',
    unavailable: 'La instalación automática no está disponible en este navegador. Puedes continuar en el navegador y usar Instalar aplicación o Añadir a pantalla de inicio cuando esté disponible.',
    install: 'Instalar Web App',
    continue: 'Continuar en el navegador'
  }
};

const panel = document.getElementById('installPanel');
const title = document.getElementById('installTitle');
const description = document.getElementById('installDescription');
const message = document.getElementById('installMessage');
const installButton = document.getElementById('installAppButton');
const continueButton = document.getElementById('dismissInstallButton');
const languageSelect = document.getElementById('uiLanguage');

let deferredInstallPrompt = null;
let installActive = new URLSearchParams(window.location.search).get('install') === 'web';
const displayMode = window.matchMedia('(display-mode: standalone)');
const isStandalone = () => displayMode.matches || window.navigator.standalone === true;
let installState = isStandalone() ? 'installed' : 'waiting';
let installTimer = null;

function currentLanguage() {
  const selected = languageSelect?.value;
  if (selected && translations[selected]) return selected;

  const documentLanguage = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
  if (translations[documentLanguage]) return documentLanguage;

  const saved = localStorage.getItem('ag-crossword-ui-language');
  if (saved && translations[saved]) return saved;

  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return translations[browser] ? browser : 'en';
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
  if (!installActive) {
    panel.hidden = true;
    return;
  }

  if (isStandalone()) installState = 'installed';
  const t = translations[currentLanguage()];
  title.textContent = t.title;
  description.textContent = t.description;
  message.textContent = t[installState] || t.unavailable;
  installButton.textContent = t.install;
  continueButton.textContent = t.continue;
  installButton.hidden = false;
  installButton.disabled = installState !== 'ready';
  panel.hidden = false;
}

function setInstallState(next) {
  installState = next;
  renderInstallPanel();
}

window.addEventListener('beforeinstallprompt', (event) => {
  if (!installActive) return;
  event.preventDefault();
  if (isStandalone()) {
    setInstallState('installed');
    return;
  }

  deferredInstallPrompt = event;
  clearTimeout(installTimer);
  setInstallState(typeof event.prompt === 'function' ? 'ready' : 'unavailable');
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  clearTimeout(installTimer);
  localStorage.setItem('crosswordPwaInstalled', '1');
  setInstallState('installed');
});

displayMode.addEventListener?.('change', () => {
  if (isStandalone()) setInstallState('installed');
});
languageSelect?.addEventListener('change', renderInstallPanel);

const languageObserver = new MutationObserver(mutations => {
  if (mutations.some(mutation => mutation.attributeName === 'lang')) {
    renderInstallPanel();
  }
});
languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

installButton?.addEventListener('click', async () => {
  if (!installActive || installState === 'installing') return;
  if (isStandalone()) {
    setInstallState('installed');
    return;
  }
  if (!deferredInstallPrompt || typeof deferredInstallPrompt.prompt !== 'function') {
    setInstallState('unavailable');
    return;
  }

  const prompt = deferredInstallPrompt;
  setInstallState('installing');
  try {
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (isStandalone()) setInstallState('installed');
    else setInstallState(choice?.outcome === 'accepted' ? 'installing' : 'dismissed');
  } catch {
    setInstallState(isStandalone() ? 'installed' : 'unavailable');
  } finally {
    deferredInstallPrompt = null;
  }
});

continueButton?.addEventListener('click', () => {
  installActive = false;
  deferredInstallPrompt = null;
  clearTimeout(installTimer);
  stripInstallRequest();
  panel.hidden = true;
});

if (installActive && !isStandalone()) {
  installTimer = setTimeout(() => {
    if (installState === 'waiting') setInstallState('unavailable');
  }, 3000);
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('Crossword service worker registration failed.', error);
    });
  });
}

renderInstallPanel();
