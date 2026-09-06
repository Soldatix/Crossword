(() => {
  'use strict';

  const SUPPORTED_LANGS = ['hr', 'en', 'de', 'it', 'es'];
  const STORAGE = {
    ui: 'ag-crossword-ui-language',
    theme: 'ag-crossword-theme',
    draft: 'ag-crossword-draft-v1',
    progressPrefix: 'ag-crossword-progress-'
  };

  const translations = {
    en: {
      uiLanguage: 'Interface language', theme: 'Theme', themeAuto: 'Auto', themeLight: 'Light', themeDark: 'Dark',
      heroTitle: 'Create crosswords in minutes', heroText: 'You choose the words and clues. Apps&Games Crossword turns them into your custom crossword, ready to solve, print or share online.',
      createMode: 'Create Crossword', playMode: 'Play Crossword', yourCrossword: 'Your crossword', creatorIntro: 'Enter words and clues. The generator will connect as many words as possible.',
      crosswordTitle: 'Crossword title', titlePlaceholder: 'My crossword', crosswordLanguage: 'Crossword language', difficulty: 'Difficulty', difficultyNormal: 'Normal', difficultyEasy: 'Easy',
      answer: 'Answer', clue: 'Clue', addWord: 'Add word', loadExample: 'Load example', clearAll: 'Clear', generate: 'Generate crossword', preview: 'Preview', previewHint: 'Generate a crossword to see it here.',
      rearrange: 'Rearrange', showSolution: 'Show solution', hideSolution: 'Hide solution', emptyTitle: 'Your crossword will appear here', emptyText: 'Add at least three words and choose Generate crossword.',
      across: 'Across', down: 'Down', playThis: 'Play this crossword', printPdf: 'Print / Save PDF', share: 'Share', playCrossword: 'Play Crossword', playIntro: 'Choose a ready-made crossword or open one shared with you.',
      puzzleLanguage: 'Puzzle language', category: 'Category', loadPuzzle: 'Load puzzle', hint: 'Hint', check: 'Check', reveal: 'Reveal solution', choosePuzzle: 'Choose a crossword to start', choosePuzzleText: 'Select a language and category, then load the puzzle.',
      backToPortal: 'Back to Apps & Games', instructionsEyebrow: 'Help', instructionsTitle: 'How to use Apps&Games Crossword', infoTitle: 'Info & Support', infoLead: 'Apps&Games Crossword is a free browser app for creating, solving, printing and sharing crosswords.',
      supportProject: 'Support the project', charityText: 'A part of received donations is forwarded to charitable organizations, with the largest part intended for institutions caring for children without adequate parental care.',
      paypalSmall: 'Fast online donation', secure: 'Secure', online: 'Online', donatePaypal: 'Donate with PayPal', cardPayment: 'Card payment', donateCard: 'Donate by card', paymentNote: 'Payment is processed securely by the selected payment provider. Apps&Games does not store your payment card details.',
      cryptoTitle: 'Crypto Wallet', cryptoText: 'You can also support the project using one of the following wallet addresses.', copy: 'Copy', copied: 'Copied!',
      catGeneral: 'General knowledge', catAnimals: 'Animals', sampleTitleGeneral: 'General knowledge', sampleTitleAnimals: 'Animal world',
      minWords: 'Enter at least 3 valid words with clues.', duplicateWords: 'Duplicate answers were ignored.', generated: 'Crossword generated.', generatedPartial: '{placed} of {total} words were connected. {missing} could not be placed.',
      allConnected: 'All {total} words were connected.', noCrossword: 'A connected crossword could not be created from these words. Try words with more common letters.',
      wordPlaceholder: 'WORD', cluePlaceholder: 'Clue for this word', maxWords: 'Maximum 50 words.', sharedCopied: 'Share link copied to clipboard.', shareFallback: 'Copy this link to share your crossword:',
      loadedShared: 'Shared crossword loaded.', invalidShare: 'This shared crossword link is not valid.', progress: '{filled} of {total} letters filled', checkedGood: 'Everything entered so far is correct.', checkedWrong: '{count} letter(s) need another look.', completed: 'Excellent! Crossword completed correctly. 🎉',
      hintUsed: 'One letter has been revealed.', revealed: 'Solution revealed.', nothingToHint: 'No empty cells remain.',
      instructions: [
        ['Choose a mode', 'Use Create Crossword to make your own puzzle, or Play Crossword to solve one of the ready-made puzzles.'],
        ['Add words and clues', 'Enter an answer and its clue in each row. You can add up to 50 entries. The crossword language is independent from the interface language.'],
        ['Generate the crossword', 'Choose Generate crossword. The app tries several layouts and keeps the one that connects the most words. If a word cannot be connected, you will be told which one.'],
        ['Try another layout', 'Choose Rearrange whenever you want a different arrangement of the same words.'],
        ['Solve on screen', 'Choose Play this crossword. Click a cell or a clue and type the answer. Your progress is saved automatically in this browser.'],
        ['Use help while solving', 'Hint reveals one letter. Check marks current mistakes. Reveal solution fills the entire crossword.'],
        ['Print or save as PDF', 'Choose Print / Save PDF. The printable version always uses a high-contrast black-and-white grid, even when Dark mode is active.'],
        ['Share online', 'Choose Share to copy a link containing the puzzle data. Anyone who opens the link can solve the same crossword without needing an account.']
      ],
      instructionsTip: 'Tip: words with several letters in common produce better crosswords. Croatian č/ć/đ/š/ž, German ä/ö/ü/ß, Spanish ñ and accented letters are supported.'
    },
    hr: {
      uiLanguage: 'Jezik sučelja', theme: 'Tema', themeAuto: 'Automatski', themeLight: 'Svijetla', themeDark: 'Tamna',
      heroTitle: 'Stvorite križaljke u nekoliko minuta', heroText: 'Vi smislite riječi i pojmove, a Apps&Games Crossword pretvorit će ih u vašu prilagođenu križaljku spremnu za rješavanje, ispis ili dijeljenje online.',
      createMode: 'Stvori križaljku', playMode: 'Rješavaj križaljku', yourCrossword: 'Vaša križaljka', creatorIntro: 'Unesite riječi i pojmove. Generator će pokušati povezati što više riječi.',
      crosswordTitle: 'Naslov križaljke', titlePlaceholder: 'Moja križaljka', crosswordLanguage: 'Jezik križaljke', difficulty: 'Težina', difficultyNormal: 'Normalno', difficultyEasy: 'Lagano',
      answer: 'Rješenje', clue: 'Pojam / pitanje', addWord: 'Dodaj riječ', loadExample: 'Učitaj primjer', clearAll: 'Očisti', generate: 'Generiraj križaljku', preview: 'Pregled', previewHint: 'Generirajte križaljku kako biste je vidjeli ovdje.',
      rearrange: 'Presloži', showSolution: 'Prikaži rješenje', hideSolution: 'Sakrij rješenje', emptyTitle: 'Vaša križaljka pojavit će se ovdje', emptyText: 'Dodajte najmanje tri riječi i odaberite Generiraj križaljku.',
      across: 'Vodoravno', down: 'Okomito', playThis: 'Rješavaj ovu križaljku', printPdf: 'Ispis / Spremi PDF', share: 'Podijeli', playCrossword: 'Rješavaj križaljku', playIntro: 'Odaberite gotovu križaljku ili otvorite onu koju je netko podijelio s vama.',
      puzzleLanguage: 'Jezik križaljke', category: 'Kategorija', loadPuzzle: 'Učitaj križaljku', hint: 'Pomoć', check: 'Provjeri', reveal: 'Prikaži rješenje', choosePuzzle: 'Odaberite križaljku za početak', choosePuzzleText: 'Odaberite jezik i kategoriju, zatim učitajte križaljku.',
      backToPortal: 'Natrag na Apps & Games', instructionsEyebrow: 'Pomoć', instructionsTitle: 'Upute za Apps&Games Crossword', infoTitle: 'Info & Podrška', infoLead: 'Apps&Games Crossword je besplatna web aplikacija za stvaranje, rješavanje, ispis i dijeljenje križaljki.',
      supportProject: 'Podržite projekt', charityText: 'Dio primljenih donacija prosljeđuje se različitim humanitarnim organizacijama, a najveći dio namijenjen je ustanovama koje skrbe o djeci bez odgovarajuće roditeljske skrbi.',
      paypalSmall: 'Brza online donacija', secure: 'Sigurno', online: 'Online', donatePaypal: 'Doniraj putem PayPala', cardPayment: 'Plaćanje karticom', donateCard: 'Doniraj karticom', paymentNote: 'Plaćanje sigurno obrađuje odabrani pružatelj usluge. Apps&Games ne pohranjuje podatke vaše platne kartice.',
      cryptoTitle: 'Crypto Wallet', cryptoText: 'Projekt možete podržati i putem jedne od sljedećih adresa novčanika.', copy: 'Kopiraj', copied: 'Kopirano!',
      catGeneral: 'Opće znanje', catAnimals: 'Životinje', sampleTitleGeneral: 'Opće znanje', sampleTitleAnimals: 'Svijet životinja',
      minWords: 'Unesite najmanje 3 ispravne riječi s pojmovima.', duplicateWords: 'Dvostruka rješenja su zanemarena.', generated: 'Križaljka je generirana.', generatedPartial: 'Povezano je {placed} od {total} riječi. Nije moguće postaviti: {missing}.',
      allConnected: 'Povezano je svih {total} riječi.', noCrossword: 'Od ovih riječi nije moguće napraviti povezanu križaljku. Pokušajte s riječima koje imaju više zajedničkih slova.',
      wordPlaceholder: 'RIJEČ', cluePlaceholder: 'Pojam ili pitanje za ovu riječ', maxWords: 'Najviše 50 riječi.', sharedCopied: 'Link za dijeljenje kopiran je u međuspremnik.', shareFallback: 'Kopirajte ovaj link za dijeljenje križaljke:',
      loadedShared: 'Podijeljena križaljka je učitana.', invalidShare: 'Link podijeljene križaljke nije ispravan.', progress: 'Popunjeno {filled} od {total} slova', checkedGood: 'Sve što ste do sada unijeli je točno.', checkedWrong: 'Broj slova koja treba ponovno provjeriti: {count}.', completed: 'Odlično! Križaljka je potpuno točno riješena. 🎉',
      hintUsed: 'Otkriveno je jedno slovo.', revealed: 'Rješenje je prikazano.', nothingToHint: 'Nema više praznih polja.',
      instructions: [
        ['Odaberite način rada', 'Za izradu vlastite križaljke koristite Stvori križaljku, a za rješavanje gotovih križaljki odaberite Rješavaj križaljku.'],
        ['Unesite riječi i pojmove', 'U svaki red unesite rješenje i pripadajući pojam ili pitanje. Možete dodati do 50 riječi. Jezik križaljke ne mora biti isti kao jezik sučelja.'],
        ['Generirajte križaljku', 'Odaberite Generiraj križaljku. Aplikacija isprobava više rasporeda i zadržava onaj koji povezuje najviše riječi. Ako neku riječ nije moguće povezati, dobit ćete upozorenje.'],
        ['Isprobajte drugi raspored', 'Odaberite Presloži kad god želite drugačiji raspored istih riječi.'],
        ['Rješavajte na ekranu', 'Odaberite Rješavaj ovu križaljku. Kliknite polje ili pojam i upisujte rješenje. Napredak se automatski sprema u ovom pregledniku.'],
        ['Koristite pomoć', 'Pomoć otkriva jedno slovo. Provjeri označava trenutačne pogreške. Prikaži rješenje popunjava cijelu križaljku.'],
        ['Ispišite ili spremite PDF', 'Odaberite Ispis / Spremi PDF. Verzija za ispis uvijek koristi crno-bijelu mrežu visokog kontrasta, čak i kada je uključen Dark mode.'],
        ['Podijelite online', 'Odaberite Podijeli kako biste kopirali link koji sadrži podatke križaljke. Svatko tko otvori link može rješavati istu križaljku bez registracije.']
      ],
      instructionsTip: 'Savjet: riječi s više zajedničkih slova daju bolje križaljke. Podržani su hrvatski č/ć/đ/š/ž, njemački ä/ö/ü/ß, španjolski ñ i slova s naglascima.'
    },
    de: {
      uiLanguage: 'Sprache der Oberfläche', theme: 'Design', themeAuto: 'Automatisch', themeLight: 'Hell', themeDark: 'Dunkel',
      heroTitle: 'Kreuzworträtsel in wenigen Minuten erstellen', heroText: 'Sie bestimmen Wörter und Hinweise. Apps&Games Crossword verwandelt sie in Ihr individuelles Kreuzworträtsel zum Lösen, Drucken oder Online-Teilen.',
      createMode: 'Kreuzworträtsel erstellen', playMode: 'Kreuzworträtsel lösen', yourCrossword: 'Ihr Kreuzworträtsel', creatorIntro: 'Geben Sie Wörter und Hinweise ein. Der Generator verbindet so viele Wörter wie möglich.',
      crosswordTitle: 'Titel des Kreuzworträtsels', titlePlaceholder: 'Mein Kreuzworträtsel', crosswordLanguage: 'Sprache des Rätsels', difficulty: 'Schwierigkeit', difficultyNormal: 'Normal', difficultyEasy: 'Leicht',
      answer: 'Antwort', clue: 'Hinweis', addWord: 'Wort hinzufügen', loadExample: 'Beispiel laden', clearAll: 'Leeren', generate: 'Kreuzworträtsel erstellen', preview: 'Vorschau', previewHint: 'Erstellen Sie ein Kreuzworträtsel, um es hier zu sehen.',
      rearrange: 'Neu anordnen', showSolution: 'Lösung anzeigen', hideSolution: 'Lösung ausblenden', emptyTitle: 'Ihr Kreuzworträtsel erscheint hier', emptyText: 'Fügen Sie mindestens drei Wörter hinzu und wählen Sie Kreuzworträtsel erstellen.',
      across: 'Waagerecht', down: 'Senkrecht', playThis: 'Dieses Rätsel lösen', printPdf: 'Drucken / PDF speichern', share: 'Teilen', playCrossword: 'Kreuzworträtsel lösen', playIntro: 'Wählen Sie ein fertiges Kreuzworträtsel oder öffnen Sie ein mit Ihnen geteiltes.',
      puzzleLanguage: 'Rätselsprache', category: 'Kategorie', loadPuzzle: 'Rätsel laden', hint: 'Hinweis', check: 'Prüfen', reveal: 'Lösung anzeigen', choosePuzzle: 'Wählen Sie ein Kreuzworträtsel', choosePuzzleText: 'Wählen Sie Sprache und Kategorie und laden Sie dann das Rätsel.',
      backToPortal: 'Zurück zu Apps & Games', instructionsEyebrow: 'Hilfe', instructionsTitle: 'Anleitung für Apps&Games Crossword', infoTitle: 'Info & Unterstützung', infoLead: 'Apps&Games Crossword ist eine kostenlose Browser-App zum Erstellen, Lösen, Drucken und Teilen von Kreuzworträtseln.',
      supportProject: 'Projekt unterstützen', charityText: 'Ein Teil der eingegangenen Spenden wird an verschiedene gemeinnützige Organisationen weitergeleitet; der größte Teil ist für Einrichtungen bestimmt, die Kinder ohne angemessene elterliche Betreuung unterstützen.',
      paypalSmall: 'Schnelle Online-Spende', secure: 'Sicher', online: 'Online', donatePaypal: 'Mit PayPal spenden', cardPayment: 'Kartenzahlung', donateCard: 'Mit Karte spenden', paymentNote: 'Die Zahlung wird sicher vom gewählten Zahlungsanbieter verarbeitet. Apps&Games speichert keine Kartendaten.',
      cryptoTitle: 'Crypto Wallet', cryptoText: 'Sie können das Projekt auch über eine der folgenden Wallet-Adressen unterstützen.', copy: 'Kopieren', copied: 'Kopiert!',
      catGeneral: 'Allgemeinwissen', catAnimals: 'Tiere', sampleTitleGeneral: 'Allgemeinwissen', sampleTitleAnimals: 'Tierwelt',
      minWords: 'Geben Sie mindestens 3 gültige Wörter mit Hinweisen ein.', duplicateWords: 'Doppelte Antworten wurden ignoriert.', generated: 'Kreuzworträtsel erstellt.', generatedPartial: '{placed} von {total} Wörtern wurden verbunden. Nicht platzierbar: {missing}.',
      allConnected: 'Alle {total} Wörter wurden verbunden.', noCrossword: 'Aus diesen Wörtern konnte kein verbundenes Kreuzworträtsel erstellt werden. Verwenden Sie Wörter mit mehr gemeinsamen Buchstaben.',
      wordPlaceholder: 'WORT', cluePlaceholder: 'Hinweis zu diesem Wort', maxWords: 'Maximal 50 Wörter.', sharedCopied: 'Link zum Teilen wurde kopiert.', shareFallback: 'Kopieren Sie diesen Link, um das Kreuzworträtsel zu teilen:',
      loadedShared: 'Geteiltes Kreuzworträtsel geladen.', invalidShare: 'Dieser geteilte Kreuzworträtsel-Link ist ungültig.', progress: '{filled} von {total} Buchstaben ausgefüllt', checkedGood: 'Alle bisherigen Eingaben sind richtig.', checkedWrong: '{count} Buchstabe(n) sollten noch einmal geprüft werden.', completed: 'Sehr gut! Das Kreuzworträtsel ist vollständig richtig gelöst. 🎉',
      hintUsed: 'Ein Buchstabe wurde aufgedeckt.', revealed: 'Lösung wurde angezeigt.', nothingToHint: 'Es gibt keine leeren Felder mehr.',
      instructions: [
        ['Modus wählen', 'Mit Kreuzworträtsel erstellen bauen Sie ein eigenes Rätsel. Mit Kreuzworträtsel lösen spielen Sie eines der fertigen Rätsel.'],
        ['Wörter und Hinweise eingeben', 'Geben Sie pro Zeile eine Antwort und den passenden Hinweis ein. Bis zu 50 Einträge sind möglich. Die Rätselsprache kann unabhängig von der Sprache der Oberfläche gewählt werden.'],
        ['Kreuzworträtsel erstellen', 'Wählen Sie Kreuzworträtsel erstellen. Die App testet mehrere Anordnungen und behält die Variante, die die meisten Wörter verbindet. Nicht verbundene Wörter werden gemeldet.'],
        ['Andere Anordnung testen', 'Mit Neu anordnen erhalten Sie eine andere Anordnung derselben Wörter.'],
        ['Am Bildschirm lösen', 'Wählen Sie Dieses Rätsel lösen. Klicken Sie auf ein Feld oder einen Hinweis und tippen Sie die Antwort. Der Fortschritt wird automatisch in diesem Browser gespeichert.'],
        ['Hilfen verwenden', 'Hinweis deckt einen Buchstaben auf. Prüfen markiert aktuelle Fehler. Lösung anzeigen füllt das gesamte Rätsel.'],
        ['Drucken oder PDF speichern', 'Wählen Sie Drucken / PDF speichern. Die Druckversion verwendet immer ein kontrastreiches Schwarz-Weiß-Raster, auch im Dark Mode.'],
        ['Online teilen', 'Wählen Sie Teilen, um einen Link mit den Rätseldaten zu kopieren. Jeder kann das Rätsel über diesen Link ohne Konto lösen.']
      ],
      instructionsTip: 'Tipp: Wörter mit mehreren gemeinsamen Buchstaben ergeben bessere Kreuzworträtsel. Deutsche ä/ö/ü/ß sowie kroatische, spanische und akzentuierte Buchstaben werden unterstützt.'
    },
    it: {
      uiLanguage: 'Lingua interfaccia', theme: 'Tema', themeAuto: 'Automatico', themeLight: 'Chiaro', themeDark: 'Scuro',
      heroTitle: 'Crea cruciverba in pochi minuti', heroText: 'Tu scegli le parole e le definizioni. Apps&Games Crossword le trasforma nel tuo cruciverba personalizzato, pronto da risolvere, stampare o condividere online.',
      createMode: 'Crea cruciverba', playMode: 'Risolvi cruciverba', yourCrossword: 'Il tuo cruciverba', creatorIntro: 'Inserisci parole e definizioni. Il generatore collegherà il maggior numero possibile di parole.',
      crosswordTitle: 'Titolo del cruciverba', titlePlaceholder: 'Il mio cruciverba', crosswordLanguage: 'Lingua del cruciverba', difficulty: 'Difficoltà', difficultyNormal: 'Normale', difficultyEasy: 'Facile',
      answer: 'Risposta', clue: 'Definizione', addWord: 'Aggiungi parola', loadExample: 'Carica esempio', clearAll: 'Cancella', generate: 'Genera cruciverba', preview: 'Anteprima', previewHint: 'Genera un cruciverba per visualizzarlo qui.',
      rearrange: 'Riorganizza', showSolution: 'Mostra soluzione', hideSolution: 'Nascondi soluzione', emptyTitle: 'Il tuo cruciverba apparirà qui', emptyText: 'Aggiungi almeno tre parole e scegli Genera cruciverba.',
      across: 'Orizzontali', down: 'Verticali', playThis: 'Risolvi questo cruciverba', printPdf: 'Stampa / Salva PDF', share: 'Condividi', playCrossword: 'Risolvi cruciverba', playIntro: 'Scegli un cruciverba pronto oppure aprine uno condiviso con te.',
      puzzleLanguage: 'Lingua del cruciverba', category: 'Categoria', loadPuzzle: 'Carica cruciverba', hint: 'Suggerimento', check: 'Controlla', reveal: 'Mostra soluzione', choosePuzzle: 'Scegli un cruciverba per iniziare', choosePuzzleText: 'Seleziona lingua e categoria, poi carica il cruciverba.',
      backToPortal: 'Torna ad Apps & Games', instructionsEyebrow: 'Aiuto', instructionsTitle: 'Come usare Apps&Games Crossword', infoTitle: 'Info & Supporto', infoLead: 'Apps&Games Crossword è un’app gratuita nel browser per creare, risolvere, stampare e condividere cruciverba.',
      supportProject: 'Sostieni il progetto', charityText: 'Una parte delle donazioni ricevute viene destinata a diverse organizzazioni benefiche; la parte principale è destinata a istituzioni che assistono bambini privi di adeguate cure genitoriali.',
      paypalSmall: 'Donazione online veloce', secure: 'Sicuro', online: 'Online', donatePaypal: 'Dona con PayPal', cardPayment: 'Pagamento con carta', donateCard: 'Dona con carta', paymentNote: 'Il pagamento viene elaborato in modo sicuro dal fornitore scelto. Apps&Games non memorizza i dati della carta.',
      cryptoTitle: 'Crypto Wallet', cryptoText: 'Puoi sostenere il progetto anche tramite uno dei seguenti indirizzi wallet.', copy: 'Copia', copied: 'Copiato!',
      catGeneral: 'Cultura generale', catAnimals: 'Animali', sampleTitleGeneral: 'Cultura generale', sampleTitleAnimals: 'Mondo animale',
      minWords: 'Inserisci almeno 3 parole valide con definizioni.', duplicateWords: 'Le risposte duplicate sono state ignorate.', generated: 'Cruciverba generato.', generatedPartial: 'Sono state collegate {placed} parole su {total}. Non inseribili: {missing}.',
      allConnected: 'Tutte le {total} parole sono state collegate.', noCrossword: 'Non è stato possibile creare un cruciverba collegato con queste parole. Prova parole con più lettere in comune.',
      wordPlaceholder: 'PAROLA', cluePlaceholder: 'Definizione per questa parola', maxWords: 'Massimo 50 parole.', sharedCopied: 'Link di condivisione copiato negli appunti.', shareFallback: 'Copia questo link per condividere il cruciverba:',
      loadedShared: 'Cruciverba condiviso caricato.', invalidShare: 'Questo link di condivisione non è valido.', progress: '{filled} di {total} lettere inserite', checkedGood: 'Tutto ciò che hai inserito finora è corretto.', checkedWrong: '{count} lettera/e da ricontrollare.', completed: 'Ottimo! Cruciverba completato correttamente. 🎉',
      hintUsed: 'È stata rivelata una lettera.', revealed: 'Soluzione mostrata.', nothingToHint: 'Non ci sono più caselle vuote.',
      instructions: [
        ['Scegli la modalità', 'Usa Crea cruciverba per crearne uno tuo oppure Risolvi cruciverba per giocare con uno di quelli pronti.'],
        ['Inserisci parole e definizioni', 'Inserisci in ogni riga una risposta e la relativa definizione. Puoi aggiungere fino a 50 voci. La lingua del cruciverba è indipendente dalla lingua dell’interfaccia.'],
        ['Genera il cruciverba', 'Scegli Genera cruciverba. L’app prova diversi schemi e mantiene quello che collega più parole. Le parole che non possono essere collegate vengono segnalate.'],
        ['Prova un altro schema', 'Scegli Riorganizza per ottenere una disposizione diversa delle stesse parole.'],
        ['Risolvi sullo schermo', 'Scegli Risolvi questo cruciverba. Tocca una casella o una definizione e digita la risposta. I progressi vengono salvati automaticamente nel browser.'],
        ['Usa gli aiuti', 'Suggerimento rivela una lettera. Controlla evidenzia gli errori attuali. Mostra soluzione completa tutto il cruciverba.'],
        ['Stampa o salva in PDF', 'Scegli Stampa / Salva PDF. La versione stampabile usa sempre una griglia bianco e nero ad alto contrasto, anche con la modalità scura.'],
        ['Condividi online', 'Scegli Condividi per copiare un link con i dati del cruciverba. Chiunque apra il link può risolverlo senza registrarsi.']
      ],
      instructionsTip: 'Suggerimento: parole con più lettere in comune producono cruciverba migliori. Sono supportate lettere accentate, ñ, ä/ö/ü/ß e č/ć/đ/š/ž.'
    },
    es: {
      uiLanguage: 'Idioma de la interfaz', theme: 'Tema', themeAuto: 'Automático', themeLight: 'Claro', themeDark: 'Oscuro',
      heroTitle: 'Crea crucigramas en pocos minutos', heroText: 'Tú eliges las palabras y las pistas. Apps&Games Crossword las convierte en tu crucigrama personalizado, listo para resolver, imprimir o compartir online.',
      createMode: 'Crear crucigrama', playMode: 'Resolver crucigrama', yourCrossword: 'Tu crucigrama', creatorIntro: 'Introduce palabras y pistas. El generador conectará tantas palabras como sea posible.',
      crosswordTitle: 'Título del crucigrama', titlePlaceholder: 'Mi crucigrama', crosswordLanguage: 'Idioma del crucigrama', difficulty: 'Dificultad', difficultyNormal: 'Normal', difficultyEasy: 'Fácil',
      answer: 'Respuesta', clue: 'Pista', addWord: 'Añadir palabra', loadExample: 'Cargar ejemplo', clearAll: 'Borrar', generate: 'Generar crucigrama', preview: 'Vista previa', previewHint: 'Genera un crucigrama para verlo aquí.',
      rearrange: 'Reorganizar', showSolution: 'Mostrar solución', hideSolution: 'Ocultar solución', emptyTitle: 'Tu crucigrama aparecerá aquí', emptyText: 'Añade al menos tres palabras y elige Generar crucigrama.',
      across: 'Horizontales', down: 'Verticales', playThis: 'Resolver este crucigrama', printPdf: 'Imprimir / Guardar PDF', share: 'Compartir', playCrossword: 'Resolver crucigrama', playIntro: 'Elige un crucigrama preparado o abre uno que hayan compartido contigo.',
      puzzleLanguage: 'Idioma del crucigrama', category: 'Categoría', loadPuzzle: 'Cargar crucigrama', hint: 'Pista', check: 'Comprobar', reveal: 'Mostrar solución', choosePuzzle: 'Elige un crucigrama para empezar', choosePuzzleText: 'Selecciona idioma y categoría, y después carga el crucigrama.',
      backToPortal: 'Volver a Apps & Games', instructionsEyebrow: 'Ayuda', instructionsTitle: 'Cómo usar Apps&Games Crossword', infoTitle: 'Info & Soporte', infoLead: 'Apps&Games Crossword es una aplicación gratuita del navegador para crear, resolver, imprimir y compartir crucigramas.',
      supportProject: 'Apoya el proyecto', charityText: 'Una parte de las donaciones recibidas se destina a distintas organizaciones benéficas; la mayor parte está destinada a instituciones que atienden a niños sin una atención parental adecuada.',
      paypalSmall: 'Donación online rápida', secure: 'Seguro', online: 'Online', donatePaypal: 'Donar con PayPal', cardPayment: 'Pago con tarjeta', donateCard: 'Donar con tarjeta', paymentNote: 'El pago se procesa de forma segura a través del proveedor elegido. Apps&Games no almacena los datos de tu tarjeta.',
      cryptoTitle: 'Crypto Wallet', cryptoText: 'También puedes apoyar el proyecto mediante una de las siguientes direcciones de wallet.', copy: 'Copiar', copied: '¡Copiado!',
      catGeneral: 'Cultura general', catAnimals: 'Animales', sampleTitleGeneral: 'Cultura general', sampleTitleAnimals: 'Mundo animal',
      minWords: 'Introduce al menos 3 palabras válidas con pistas.', duplicateWords: 'Se ignoraron las respuestas duplicadas.', generated: 'Crucigrama generado.', generatedPartial: 'Se conectaron {placed} de {total} palabras. No se pudieron colocar: {missing}.',
      allConnected: 'Se conectaron las {total} palabras.', noCrossword: 'No se pudo crear un crucigrama conectado con estas palabras. Prueba palabras con más letras en común.',
      wordPlaceholder: 'PALABRA', cluePlaceholder: 'Pista para esta palabra', maxWords: 'Máximo 50 palabras.', sharedCopied: 'Enlace para compartir copiado al portapapeles.', shareFallback: 'Copia este enlace para compartir el crucigrama:',
      loadedShared: 'Crucigrama compartido cargado.', invalidShare: 'Este enlace de crucigrama compartido no es válido.', progress: '{filled} de {total} letras completadas', checkedGood: 'Todo lo escrito hasta ahora es correcto.', checkedWrong: 'Hay {count} letra(s) que debes revisar.', completed: '¡Excelente! Crucigrama completado correctamente. 🎉',
      hintUsed: 'Se ha revelado una letra.', revealed: 'Solución revelada.', nothingToHint: 'No quedan casillas vacías.',
      instructions: [
        ['Elige un modo', 'Usa Crear crucigrama para crear uno propio o Resolver crucigrama para jugar con uno de los preparados.'],
        ['Añade palabras y pistas', 'Introduce una respuesta y su pista en cada fila. Puedes añadir hasta 50 entradas. El idioma del crucigrama es independiente del idioma de la interfaz.'],
        ['Genera el crucigrama', 'Elige Generar crucigrama. La aplicación prueba varios diseños y conserva el que conecta más palabras. Se te avisará de las palabras que no se puedan conectar.'],
        ['Prueba otro diseño', 'Elige Reorganizar cuando quieras una distribución distinta de las mismas palabras.'],
        ['Resuelve en pantalla', 'Elige Resolver este crucigrama. Pulsa una casilla o una pista y escribe la respuesta. El progreso se guarda automáticamente en este navegador.'],
        ['Usa las ayudas', 'Pista revela una letra. Comprobar marca los errores actuales. Mostrar solución completa todo el crucigrama.'],
        ['Imprime o guarda PDF', 'Elige Imprimir / Guardar PDF. La versión imprimible siempre usa una cuadrícula en blanco y negro de alto contraste, incluso con el modo oscuro.'],
        ['Comparte online', 'Elige Compartir para copiar un enlace que contiene los datos del crucigrama. Cualquiera que lo abra puede resolverlo sin registrarse.']
      ],
      instructionsTip: 'Consejo: las palabras con varias letras en común producen mejores crucigramas. Se admiten ñ, letras acentuadas, ä/ö/ü/ß y č/ć/đ/š/ž.'
    }
  };

  const puzzlePacks = {
    hr: {
      general: {
        titleKey: 'sampleTitleGeneral',
        entries: [
          ['ZAGREB', 'Glavni grad Hrvatske'], ['JADRAN', 'More uz hrvatsku obalu'], ['ISTRA', 'Najveći hrvatski poluotok'], ['DINARA', 'Najviši vrh Hrvatske nalazi se na ovoj planini'],
          ['DUNAV', 'Velika europska rijeka koja prolazi kraj Vukovara'], ['EURO', 'Službena valuta Hrvatske'], ['KRK', 'Veliki hrvatski otok povezan mostom'], ['SAVA', 'Rijeka koja prolazi kroz Zagreb'],
          ['SLJEME', 'Popularno izletište iznad Zagreba'], ['PULA', 'Istarski grad poznat po Areni'], ['ZADAR', 'Dalmatinski grad poznat po Morskim orguljama'], ['KUPA', 'Rijeka koja protječe kroz Karlovac']
        ]
      },
      animals: {
        titleKey: 'sampleTitleAnimals',
        entries: [
          ['SLON', 'Najveća kopnena životinja'], ['TIGAR', 'Velika prugasta mačka'], ['MAČKA', 'Kućni ljubimac koji prede'], ['LAV', 'Životinja koju često zovu kraljem životinja'],
          ['ZEBRA', 'Afrička životinja crno-bijelih pruga'], ['KONJ', 'Životinja koja se često koristi za jahanje'], ['SOVA', 'Noćna ptica velikih očiju'], ['ORAO', 'Velika ptica grabljivica'],
          ['DELFIN', 'Inteligentni morski sisavac'], ['VUK', 'Divlji srodnik psa'], ['MEDVJED', 'Veliki svejed s gustim krznom'], ['PAS', 'Čovjekov vjerni kućni ljubimac']
        ]
      }
    },
    en: {
      general: {
        titleKey: 'sampleTitleGeneral',
        entries: [
          ['LONDON', 'Capital of the United Kingdom'], ['PACIFIC', 'Largest ocean on Earth'], ['AMAZON', 'Major river in South America'], ['EUROPE', 'Continent containing France and Germany'],
          ['JUPITER', 'Largest planet in the Solar System'], ['OXYGEN', 'Gas humans need to breathe'], ['PIANO', 'Keyboard musical instrument'], ['SAHARA', 'Large desert in North Africa'],
          ['CANADA', 'Country north of the United States'], ['NILE', 'Famous river in Egypt'], ['ROME', 'Capital of Italy'], ['ALPS', 'Mountain range through Switzerland']
        ]
      },
      animals: {
        titleKey: 'sampleTitleAnimals',
        entries: [
          ['ELEPHANT', 'Largest land animal'], ['TIGER', 'Large striped cat'], ['CAT', 'A pet that purrs'], ['LION', 'Big cat often called king of the jungle'],
          ['ZEBRA', 'African animal with black and white stripes'], ['HORSE', 'Animal commonly used for riding'], ['OWL', 'Nocturnal bird with large eyes'], ['EAGLE', 'Large bird of prey'],
          ['DOLPHIN', 'Intelligent marine mammal'], ['WOLF', 'Wild relative of the dog'], ['BEAR', 'Large furry omnivore'], ['DOG', 'A loyal domestic companion']
        ]
      }
    },
    de: {
      general: {
        titleKey: 'sampleTitleGeneral',
        entries: [
          ['BERLIN', 'Hauptstadt Deutschlands'], ['RHEIN', 'Großer Fluss durch Deutschland und die Schweiz'], ['ALPEN', 'Gebirge in der Schweiz und in Österreich'], ['EUROPA', 'Kontinent mit Deutschland und Italien'],
          ['JUPITER', 'Größter Planet des Sonnensystems'], ['SAUERSTOFF', 'Gas, das Menschen zum Atmen brauchen'], ['KLAVIER', 'Musikinstrument mit Tasten'], ['SAHARA', 'Große Wüste in Nordafrika'],
          ['DONAU', 'Europäischer Fluss, der durch mehrere Länder fließt'], ['ROM', 'Hauptstadt Italiens'], ['WIEN', 'Hauptstadt Österreichs'], ['BODENSEE', 'Großer See an Deutschland, Österreich und der Schweiz']
        ]
      },
      animals: {
        titleKey: 'sampleTitleAnimals',
        entries: [
          ['ELEFANT', 'Größtes Landtier'], ['TIGER', 'Große gestreifte Katze'], ['KATZE', 'Haustier, das schnurrt'], ['LÖWE', 'Große Raubkatze mit Mähne'],
          ['ZEBRA', 'Afrikanisches Tier mit schwarzen und weißen Streifen'], ['PFERD', 'Tier zum Reiten'], ['EULE', 'Nachtaktiver Vogel mit großen Augen'], ['ADLER', 'Großer Greifvogel'],
          ['DELFIN', 'Intelligentes Meeressäugetier'], ['WOLF', 'Wilder Verwandter des Hundes'], ['BÄR', 'Großer Allesfresser mit dichtem Fell'], ['HUND', 'Treuer Begleiter des Menschen']
        ]
      }
    },
    it: {
      general: {
        titleKey: 'sampleTitleGeneral',
        entries: [
          ['ROMA', 'Capitale d’Italia'], ['ADRIATICO', 'Mare lungo la costa orientale italiana'], ['ALPI', 'Catena montuosa nel nord Italia'], ['EUROPA', 'Continente che comprende Italia e Germania'],
          ['GIOVE', 'Pianeta più grande del Sistema Solare'], ['OSSIGENO', 'Gas necessario alla respirazione'], ['PIANOFORTE', 'Strumento musicale a tastiera'], ['SAHARA', 'Grande deserto del Nord Africa'],
          ['PO', 'Fiume più lungo d’Italia'], ['MILANO', 'Grande città lombarda famosa per moda e design'], ['SICILIA', 'La più grande isola italiana'], ['VENEZIA', 'Città italiana famosa per i canali']
        ]
      },
      animals: {
        titleKey: 'sampleTitleAnimals',
        entries: [
          ['ELEFANTE', 'Il più grande animale terrestre'], ['TIGRE', 'Grande felino a strisce'], ['GATTO', 'Animale domestico che fa le fusa'], ['LEONE', 'Grande felino con la criniera'],
          ['ZEBRA', 'Animale africano a strisce bianche e nere'], ['CAVALLO', 'Animale spesso usato per cavalcare'], ['GUFO', 'Uccello notturno con grandi occhi'], ['AQUILA', 'Grande uccello rapace'],
          ['DELFINO', 'Intelligente mammifero marino'], ['LUPO', 'Parente selvatico del cane'], ['ORSO', 'Grande onnivoro peloso'], ['CANE', 'Fedele animale domestico']
        ]
      }
    },
    es: {
      general: {
        titleKey: 'sampleTitleGeneral',
        entries: [
          ['MADRID', 'Capital de España'], ['ATLÁNTICO', 'Océano al oeste de Europa'], ['PIRINEOS', 'Cordillera entre España y Francia'], ['EUROPA', 'Continente donde se encuentra España'],
          ['JÚPITER', 'Planeta más grande del Sistema Solar'], ['OXÍGENO', 'Gas necesario para respirar'], ['PIANO', 'Instrumento musical de teclado'], ['SAHARA', 'Gran desierto del norte de África'],
          ['EBRO', 'Uno de los grandes ríos de España'], ['SEVILLA', 'Capital de Andalucía'], ['TEIDE', 'Pico más alto de España'], ['VALENCIA', 'Ciudad española famosa por la paella']
        ]
      },
      animals: {
        titleKey: 'sampleTitleAnimals',
        entries: [
          ['ELEFANTE', 'El animal terrestre más grande'], ['TIGRE', 'Gran felino con rayas'], ['GATO', 'Mascota que ronronea'], ['LEÓN', 'Gran felino con melena'],
          ['CEBRA', 'Animal africano con rayas blancas y negras'], ['CABALLO', 'Animal utilizado para montar'], ['BÚHO', 'Ave nocturna de grandes ojos'], ['ÁGUILA', 'Gran ave rapaz'],
          ['DELFÍN', 'Mamífero marino inteligente'], ['LOBO', 'Pariente salvaje del perro'], ['OSO', 'Gran omnívoro de pelo espeso'], ['PERRO', 'Compañero doméstico fiel']
        ]
      }
    }
  };

  const CRYPTO_ADDRESSES = {
    BTC: 'bc1qwlrxrh64peukga0fp59m9yg7gpf0yj8q7fxnsc',
    ETH: '0xA99A52085c6725854daa46bb302041569c8bA4E3',
    XRP: 'rP43SsrkhPkxTsFohMAm32sAQg7vqwmDpr',
    SOL: '8xkdVTEaDGuWu4aE3HpEx8r9Aux98JZbdsMiDQvJWBWR',
    DOGE: 'DGAT32ku8WmFaTDxCgVuRuVpUFmfdmD5Jb',
    XLM: 'GCYH4OD4I2GNRKFFOYROE3N3S2HCT5RXIML3TZV5DP3TLTLXPXQXIJZ3',
    LTC: 'LWtaFniqdYpv2xJtqo9WqDwCsQ2cW6PYWi',
    RVN: 'RAtXzKZyB3awfq2u2cK8YppC9kJamU5tPQ'
  };

  const $ = (id) => document.getElementById(id);
  const uiLanguage = $('uiLanguage');
  const themeMode = $('themeMode');
  const crosswordLanguage = $('crosswordLanguage');
  const playLanguage = $('playLanguage');
  const playCategory = $('playCategory');
  const wordRows = $('wordRows');
  const creatorMessage = $('creatorMessage');
  const playerMessage = $('playerMessage');

  let uiLang = getInitialLanguage();
  let currentPuzzle = null;
  let playerPuzzle = null;
  let creatorSeed = Date.now() >>> 0;
  let previewSolutionVisible = false;
  let activePlacementIndex = 0;
  let activeDirection = 'across';

  function getInitialLanguage() {
    const saved = localStorage.getItem(STORAGE.ui);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
    const browser = (navigator.language || 'en').toLowerCase().slice(0, 2);
    return SUPPORTED_LANGS.includes(browser) ? browser : 'en';
  }

  function t(key, vars = {}) {
    let value = translations[uiLang]?.[key] ?? translations.en[key] ?? key;
    if (typeof value !== 'string') return value;
    return value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? `{${name}}`);
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
    uiLang = lang;
    localStorage.setItem(STORAGE.ui, lang);
    document.documentElement.lang = lang;
    uiLanguage.value = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-option]').forEach(el => {
      el.textContent = t(el.dataset.i18nOption);
    });

    $('instructionsButton').title = t('instructionsTitle');
    $('instructionsButton').setAttribute('aria-label', t('instructionsTitle'));
    $('infoButton').title = t('infoTitle');
    $('infoButton').setAttribute('aria-label', t('infoTitle'));

    refreshWordRowPlaceholders();
    renderInstructions();
    renderWallets();
    populateCategories();
    if (currentPuzzle) renderPreview(currentPuzzle);
    if (playerPuzzle) {
      renderPlayerClues();
      updatePlayerProgress();
    }
  }

  function setTheme(theme) {
    const valid = ['auto', 'light', 'dark'];
    const value = valid.includes(theme) ? theme : 'auto';
    document.documentElement.dataset.theme = value;
    localStorage.setItem(STORAGE.theme, value);
    themeMode.value = value;
  }

  function normalizeAnswer(value) {
    return (value || '')
      .normalize('NFC')
      .toLocaleUpperCase()
      .replace(/[^\p{L}\p{N}]/gu, '');
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let x = Math.imul(a ^ (a >>> 15), 1 | a);
      x = x + Math.imul(x ^ (x >>> 7), 61 | x) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function key(x, y) { return `${x},${y}`; }

  function prepareEntries(entries) {
    const seen = new Set();
    const valid = [];
    let hadDuplicates = false;
    entries.forEach((item, index) => {
      const answer = normalizeAnswer(item.answer ?? item[0]);
      const clue = String(item.clue ?? item[1] ?? '').trim();
      if (answer.length < 2 || !clue) return;
      if (seen.has(answer)) { hadDuplicates = true; return; }
      seen.add(answer);
      valid.push({ answer, clue, originalAnswer: item.answer ?? item[0], id: index });
    });
    return { entries: valid, hadDuplicates };
  }

  function buildCrossword(rawEntries, seed = 1) {
    const prepared = prepareEntries(rawEntries);
    const entries = prepared.entries;
    if (entries.length < 3) return { puzzle: null, prepared };

    let best = null;
    const attempts = Math.min(90, Math.max(35, entries.length * 3));

    for (let attempt = 0; attempt < attempts; attempt++) {
      const rng = mulberry32((seed + Math.imul(attempt + 1, 7919)) >>> 0);
      const longest = [...entries].sort((a, b) => b.answer.length - a.answer.length)[0];
      const rest = entries.filter(e => e !== longest).map(e => ({ e, n: rng() }));
      rest.sort((a, b) => {
        const lengthBias = (b.e.answer.length - a.e.answer.length) * 0.22;
        return lengthBias + (a.n - b.n);
      });
      const order = [longest, ...rest.map(x => x.e)];

      const cells = new Map();
      const usage = new Map();
      const placements = [];
      let intersections = 0;

      placeWord(longest, 0, 0, 'across', cells, usage, placements);

      for (const entry of order.slice(1)) {
        const candidates = [];
        const directions = attempt % 2 === 0 ? ['down', 'across'] : ['across', 'down'];

        for (const dir of directions) {
          for (const [cellKey, existingChar] of cells.entries()) {
            const [cx, cy] = cellKey.split(',').map(Number);
            for (let i = 0; i < entry.answer.length; i++) {
              if (entry.answer[i] !== existingChar) continue;
              const x = dir === 'across' ? cx - i : cx;
              const y = dir === 'down' ? cy - i : cy;
              const check = canPlace(entry.answer, x, y, dir, cells, usage);
              if (check.valid && check.crossings > 0) {
                const bounds = boundsWithCandidate(placements, entry, x, y, dir);
                const area = (bounds.maxX - bounds.minX + 1) * (bounds.maxY - bounds.minY + 1);
                const balance = Math.abs((bounds.maxX + bounds.minX) / 2) + Math.abs((bounds.maxY + bounds.minY) / 2);
                const score = check.crossings * 120 - area * 0.045 - balance * 0.25 + rng() * 1.5;
                candidates.push({ x, y, dir, score, crossings: check.crossings });
              }
            }
          }
        }

        if (candidates.length) {
          candidates.sort((a, b) => b.score - a.score);
          const chosen = candidates[0];
          placeWord(entry, chosen.x, chosen.y, chosen.dir, cells, usage, placements);
          intersections += chosen.crossings;
        }
      }

      const bounds = getBounds(placements);
      const area = (bounds.maxX - bounds.minX + 1) * (bounds.maxY - bounds.minY + 1);
      const score = placements.length * 100000 + intersections * 150 - area;
      if (!best || score > best.score) {
        best = { placements, cells, bounds, score, intersections };
      }
      if (best.placements.length === entries.length && attempt > 18) break;
    }

    if (!best || best.placements.length < 2) return { puzzle: null, prepared };
    const puzzle = finalizePuzzle(best, entries, seed);
    return { puzzle, prepared };
  }

  function canPlace(answer, x, y, dir, cells, usage) {
    const dx = dir === 'across' ? 1 : 0;
    const dy = dir === 'down' ? 1 : 0;
    const before = key(x - dx, y - dy);
    const after = key(x + dx * answer.length, y + dy * answer.length);
    if (cells.has(before) || cells.has(after)) return { valid: false, crossings: 0 };

    let crossings = 0;
    for (let i = 0; i < answer.length; i++) {
      const px = x + dx * i;
      const py = y + dy * i;
      const k = key(px, py);
      const existing = cells.get(k);
      const used = usage.get(k);

      if (existing) {
        if (existing !== answer[i]) return { valid: false, crossings: 0 };
        if (used?.has(dir)) return { valid: false, crossings: 0 };
        crossings++;
      } else if (dir === 'across') {
        if (cells.has(key(px, py - 1)) || cells.has(key(px, py + 1))) return { valid: false, crossings: 0 };
      } else {
        if (cells.has(key(px - 1, py)) || cells.has(key(px + 1, py))) return { valid: false, crossings: 0 };
      }
    }
    return { valid: true, crossings };
  }

  function placeWord(entry, x, y, dir, cells, usage, placements) {
    const dx = dir === 'across' ? 1 : 0;
    const dy = dir === 'down' ? 1 : 0;
    for (let i = 0; i < entry.answer.length; i++) {
      const k = key(x + dx * i, y + dy * i);
      cells.set(k, entry.answer[i]);
      if (!usage.has(k)) usage.set(k, new Set());
      usage.get(k).add(dir);
    }
    placements.push({ entry, x, y, dir });
  }

  function boundsWithCandidate(placements, entry, x, y, dir) {
    const temp = placements.concat([{ entry, x, y, dir }]);
    return getBounds(temp);
  }

  function getBounds(placements) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    placements.forEach(p => {
      const endX = p.x + (p.dir === 'across' ? p.entry.answer.length - 1 : 0);
      const endY = p.y + (p.dir === 'down' ? p.entry.answer.length - 1 : 0);
      minX = Math.min(minX, p.x, endX);
      maxX = Math.max(maxX, p.x, endX);
      minY = Math.min(minY, p.y, endY);
      maxY = Math.max(maxY, p.y, endY);
    });
    return { minX, minY, maxX, maxY };
  }

  function finalizePuzzle(best, allEntries, seed) {
    const starts = [...new Set(best.placements.map(p => key(p.x, p.y)))].map(k => {
      const [x, y] = k.split(',').map(Number);
      return { k, x, y };
    }).sort((a, b) => a.y - b.y || a.x - b.x);
    const numberMap = new Map(starts.map((s, i) => [s.k, i + 1]));

    const placements = best.placements.map((p, index) => ({
      answer: p.entry.answer,
      clue: p.entry.clue,
      originalAnswer: p.entry.originalAnswer,
      x: p.x,
      y: p.y,
      dir: p.dir,
      number: numberMap.get(key(p.x, p.y)),
      index
    })).sort((a, b) => a.number - b.number || (a.dir === 'across' ? -1 : 1));

    const solution = {};
    placements.forEach(p => {
      const dx = p.dir === 'across' ? 1 : 0;
      const dy = p.dir === 'down' ? 1 : 0;
      for (let i = 0; i < p.answer.length; i++) solution[key(p.x + dx * i, p.y + dy * i)] = p.answer[i];
    });

    const placedAnswers = new Set(placements.map(p => p.answer));
    const missing = allEntries.filter(e => !placedAnswers.has(e.answer)).map(e => e.originalAnswer || e.answer);

    return {
      placements,
      solution,
      bounds: best.bounds,
      seed,
      totalEntries: allEntries.length,
      missing
    };
  }

  function getEditorEntries() {
    return [...wordRows.querySelectorAll('.word-row')].map(row => ({
      answer: row.querySelector('.answer-input').value,
      clue: row.querySelector('.clue-input').value
    }));
  }

  function addWordRow(answer = '', clue = '') {
    if (wordRows.children.length >= 50) {
      setMessage(creatorMessage, t('maxWords'), 'warning');
      return;
    }
    const fragment = $('wordRowTemplate').content.cloneNode(true);
    const row = fragment.querySelector('.word-row');
    const answerInput = row.querySelector('.answer-input');
    const clueInput = row.querySelector('.clue-input');
    answerInput.value = answer;
    clueInput.value = clue;
    answerInput.placeholder = t('wordPlaceholder');
    clueInput.placeholder = t('cluePlaceholder');
    row.querySelector('.remove-row').addEventListener('click', () => {
      row.remove();
      saveDraft();
    });
    answerInput.addEventListener('input', saveDraftDebounced);
    clueInput.addEventListener('input', saveDraftDebounced);
    wordRows.appendChild(fragment);
  }

  function refreshWordRowPlaceholders() {
    wordRows.querySelectorAll('.answer-input').forEach(el => el.placeholder = t('wordPlaceholder'));
    wordRows.querySelectorAll('.clue-input').forEach(el => el.placeholder = t('cluePlaceholder'));
  }

  function clearEditor(rows = 8) {
    wordRows.textContent = '';
    for (let i = 0; i < rows; i++) addWordRow();
    $('crosswordTitle').value = '';
    currentPuzzle = null;
    hidePreview();
    saveDraft();
  }

  function loadExampleToEditor(lang = crosswordLanguage.value) {
    const pack = puzzlePacks[lang]?.general || puzzlePacks.en.general;
    wordRows.textContent = '';
    pack.entries.forEach(([answer, clue]) => addWordRow(answer, clue));
    $('crosswordTitle').value = translations[lang]?.[pack.titleKey] || t(pack.titleKey);
    saveDraft();
    generateFromEditor(false);
  }

  function generateFromEditor(incrementSeed = false) {
    if (incrementSeed) creatorSeed = (creatorSeed + 104729) >>> 0;
    const raw = getEditorEntries();
    const validRaw = raw.filter(e => normalizeAnswer(e.answer).length >= 2 && e.clue.trim());
    if (validRaw.length < 3) {
      setMessage(creatorMessage, t('minWords'), 'error');
      return;
    }

    const result = buildCrossword(validRaw, creatorSeed);
    if (!result.puzzle) {
      setMessage(creatorMessage, t('noCrossword'), 'error');
      return;
    }

    currentPuzzle = result.puzzle;
    currentPuzzle.title = $('crosswordTitle').value.trim() || t('titlePlaceholder');
    currentPuzzle.language = crosswordLanguage.value;
    currentPuzzle.difficulty = $('difficulty').value;
    currentPuzzle.sourceEntries = validRaw;
    previewSolutionVisible = false;
    renderPreview(currentPuzzle);

    let message = '';
    let type = 'success';
    if (currentPuzzle.missing.length) {
      message = t('generatedPartial', { placed: currentPuzzle.placements.length, total: currentPuzzle.totalEntries, missing: currentPuzzle.missing.join(', ') });
      type = 'warning';
    } else {
      message = t('allConnected', { total: currentPuzzle.totalEntries });
    }
    if (result.prepared.hadDuplicates) message += ` ${t('duplicateWords')}`;
    setMessage(creatorMessage, message, type);
    saveDraft();
  }

  function renderPreview(puzzle) {
    $('emptyPreview').classList.add('hidden');
    $('crosswordArea').classList.remove('hidden');
    $('reshuffleButton').classList.remove('hidden');
    $('solutionToggleButton').classList.remove('hidden');
    $('previewTitle').textContent = puzzle.title || t('preview');
    $('previewMeta').textContent = puzzle.missing.length
      ? t('generatedPartial', { placed: puzzle.placements.length, total: puzzle.totalEntries, missing: puzzle.missing.join(', ') })
      : t('allConnected', { total: puzzle.totalEntries });
    $('solutionToggleButton').textContent = previewSolutionVisible ? t('hideSolution') : t('showSolution');

    renderGrid($('crosswordGrid'), puzzle, { solutionVisible: previewSolutionVisible, interactive: false });
    renderClueLists(puzzle, $('acrossClues'), $('downClues'));
  }

  function renderGrid(container, puzzle, options = {}) {
    const { minX, minY, maxX, maxY } = puzzle.bounds;
    const cols = maxX - minX + 1;
    container.textContent = '';
    container.style.gridTemplateColumns = `repeat(${cols}, var(--cell-size))`;
    container.classList.toggle('hide-solution', !options.solutionVisible);

    const startNumbers = new Map();
    puzzle.placements.forEach(p => startNumbers.set(key(p.x, p.y), p.number));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const cell = document.createElement('div');
        cell.className = 'cw-cell';
        const k = key(x, y);
        if (puzzle.solution[k]) {
          cell.classList.add('open');
          cell.dataset.x = x;
          cell.dataset.y = y;
          if (startNumbers.has(k)) {
            const number = document.createElement('span');
            number.className = 'number';
            number.textContent = startNumbers.get(k);
            cell.appendChild(number);
          }
          if (options.interactive) {
            const input = document.createElement('input');
            input.maxLength = 2;
            input.inputMode = 'text';
            input.autocomplete = 'off';
            input.autocapitalize = 'characters';
            input.spellcheck = false;
            input.setAttribute('aria-label', `Cell ${x}, ${y}`);
            cell.appendChild(input);
          } else {
            const letter = document.createElement('span');
            letter.className = 'solution-letter';
            letter.textContent = puzzle.solution[k];
            cell.appendChild(letter);
          }
        } else {
          cell.classList.add('block');
        }
        container.appendChild(cell);
      }
    }
  }

  function renderClueLists(puzzle, acrossEl, downEl, clickable = false) {
    const across = puzzle.placements.filter(p => p.dir === 'across').sort((a, b) => a.number - b.number);
    const down = puzzle.placements.filter(p => p.dir === 'down').sort((a, b) => a.number - b.number);
    fillClueList(acrossEl, across, puzzle, clickable);
    fillClueList(downEl, down, puzzle, clickable);
  }

  function fillClueList(element, placements, puzzle, clickable) {
    element.textContent = '';
    placements.forEach(p => {
      const li = document.createElement('li');
      const realIndex = puzzle.placements.indexOf(p);
      li.dataset.placement = realIndex;
      li.innerHTML = `<strong>${p.number}.</strong>${escapeHtml(p.clue)}`;
      if (clickable) li.addEventListener('click', () => activatePlacement(realIndex, true));
      element.appendChild(li);
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }

  function hidePreview() {
    $('emptyPreview').classList.remove('hidden');
    $('crosswordArea').classList.add('hidden');
    $('reshuffleButton').classList.add('hidden');
    $('solutionToggleButton').classList.add('hidden');
    $('previewTitle').textContent = t('preview');
    $('previewMeta').textContent = t('previewHint');
  }

  function switchMode(mode) {
    document.querySelectorAll('.mode-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
    $('createPanel').classList.toggle('active', mode === 'create');
    $('playPanel').classList.toggle('active', mode === 'play');
  }

  function populateCategories() {
    const current = playCategory.value || 'general';
    playCategory.textContent = '';
    [['general', t('catGeneral')], ['animals', t('catAnimals')]].forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      playCategory.appendChild(option);
    });
    playCategory.value = ['general', 'animals'].includes(current) ? current : 'general';
  }

  function loadBuiltInPuzzle() {
    const lang = playLanguage.value;
    const category = playCategory.value;
    const pack = puzzlePacks[lang]?.[category] || puzzlePacks.en.general;
    const entries = pack.entries.map(([answer, clue]) => ({ answer, clue }));
    const seed = hashString(`${lang}|${category}|AppsGamesCrossword`);
    const result = buildCrossword(entries, seed);
    if (!result.puzzle) return;
    result.puzzle.title = translations[lang]?.[pack.titleKey] || t(pack.titleKey);
    result.puzzle.language = lang;
    result.puzzle.category = category;
    result.puzzle.sourceEntries = entries;
    startPlayer(result.puzzle);
  }

  function startPlayer(puzzle) {
    playerPuzzle = JSON.parse(JSON.stringify(puzzle));
    switchMode('play');
    $('playEmpty').classList.add('hidden');
    $('playerCard').classList.remove('hidden');
    $('playerTitle').textContent = playerPuzzle.title || t('playCrossword');
    const catKey = playerPuzzle.category === 'animals' ? 'catAnimals' : playerPuzzle.category === 'general' ? 'catGeneral' : null;
    $('playerCategoryBadge').textContent = catKey ? t(catKey) : languageName(playerPuzzle.language);

    renderGrid($('playerGrid'), playerPuzzle, { interactive: true, solutionVisible: false });
    renderPlayerClues();
    wirePlayerInputs();
    restoreProgress();
    activePlacementIndex = 0;
    activeDirection = playerPuzzle.placements[0]?.dir || 'across';
    activatePlacement(activePlacementIndex, false);
    updatePlayerProgress();
    setMessage(playerMessage, '', '');
    setTimeout(() => $('playerCard').scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  function renderPlayerClues() {
    if (!playerPuzzle) return;
    renderClueLists(playerPuzzle, $('playerAcross'), $('playerDown'), true);
    activatePlacement(activePlacementIndex, false, false);
  }

  function wirePlayerInputs() {
    const grid = $('playerGrid');
    grid.querySelectorAll('.cw-cell.open').forEach(cell => {
      const input = cell.querySelector('input');
      input.addEventListener('focus', () => activateCell(Number(cell.dataset.x), Number(cell.dataset.y)));
      input.addEventListener('click', () => activateCell(Number(cell.dataset.x), Number(cell.dataset.y), true));
      input.addEventListener('input', e => handlePlayerInput(e, cell));
      input.addEventListener('keydown', e => handlePlayerKeydown(e, cell));
    });
  }

  function placementsAtCell(x, y) {
    if (!playerPuzzle) return [];
    return playerPuzzle.placements.map((p, index) => ({ p, index })).filter(({ p }) => {
      if (p.dir === 'across') return y === p.y && x >= p.x && x < p.x + p.answer.length;
      return x === p.x && y >= p.y && y < p.y + p.answer.length;
    });
  }

  function activateCell(x, y, toggleDirection = false) {
    const matches = placementsAtCell(x, y);
    if (!matches.length) return;
    let chosen = matches.find(m => m.index === activePlacementIndex);
    if (toggleDirection && matches.length > 1 && chosen) {
      const other = matches.find(m => m.index !== activePlacementIndex);
      if (other) chosen = other;
    }
    if (!chosen) chosen = matches.find(m => m.p.dir === activeDirection) || matches[0];
    activatePlacement(chosen.index, false, false);
  }

  function activatePlacement(index, focus = false, highlight = true) {
    if (!playerPuzzle || !playerPuzzle.placements[index]) return;
    activePlacementIndex = index;
    activeDirection = playerPuzzle.placements[index].dir;
    const p = playerPuzzle.placements[index];
    const grid = $('playerGrid');
    grid.querySelectorAll('.cw-cell').forEach(cell => cell.classList.remove('word-active', 'cell-active'));
    document.querySelectorAll('#playerAcross li, #playerDown li').forEach(li => li.classList.toggle('active', Number(li.dataset.placement) === index));

    const cells = placementCells(p);
    cells.forEach(({ x, y }) => findPlayerCell(x, y)?.classList.add('word-active'));

    if (focus) {
      const firstOpen = cells.map(({ x, y }) => findPlayerCell(x, y)).find(cell => !cell?.querySelector('input')?.value) || findPlayerCell(cells[0].x, cells[0].y);
      firstOpen?.querySelector('input')?.focus();
      firstOpen?.classList.add('cell-active');
    } else if (highlight) {
      const focused = document.activeElement?.closest?.('.cw-cell');
      focused?.classList.add('cell-active');
    }
  }

  function placementCells(p) {
    return [...p.answer].map((_, i) => ({
      x: p.x + (p.dir === 'across' ? i : 0),
      y: p.y + (p.dir === 'down' ? i : 0)
    }));
  }

  function findPlayerCell(x, y) {
    return $('playerGrid').querySelector(`.cw-cell.open[data-x="${x}"][data-y="${y}"]`);
  }

  function handlePlayerInput(event, cell) {
    const input = event.target;
    const normalized = normalizeAnswer(input.value);
    input.value = normalized ? [...normalized].slice(-1)[0] : '';
    cell.classList.remove('wrong', 'correct');
    saveProgress();
    updatePlayerProgress();
    if (input.value) moveWithinActiveWord(cell, 1);
    checkCompletion();
  }

  function handlePlayerKeydown(event, cell) {
    const input = event.target;
    const x = Number(cell.dataset.x), y = Number(cell.dataset.y);
    if (event.key === 'Backspace' && !input.value) {
      event.preventDefault();
      moveWithinActiveWord(cell, -1, true);
      return;
    }
    const arrows = { ArrowLeft: [-1, 0, 'across'], ArrowRight: [1, 0, 'across'], ArrowUp: [0, -1, 'down'], ArrowDown: [0, 1, 'down'] };
    if (arrows[event.key]) {
      event.preventDefault();
      const [dx, dy, dir] = arrows[event.key];
      const target = findPlayerCell(x + dx, y + dy);
      if (target) {
        activeDirection = dir;
        const matches = placementsAtCell(x + dx, y + dy);
        const match = matches.find(m => m.p.dir === dir) || matches[0];
        if (match) activePlacementIndex = match.index;
        target.querySelector('input').focus();
        activatePlacement(activePlacementIndex, false, true);
        target.classList.add('cell-active');
      }
    }
    if (event.key === ' ' || event.key === 'Enter') {
      const matches = placementsAtCell(x, y);
      if (matches.length > 1) {
        event.preventDefault();
        const other = matches.find(m => m.index !== activePlacementIndex);
        if (other) activatePlacement(other.index, false, true);
      }
    }
  }

  function moveWithinActiveWord(cell, delta, clearPrevious = false) {
    const p = playerPuzzle?.placements[activePlacementIndex];
    if (!p) return;
    const cells = placementCells(p);
    const x = Number(cell.dataset.x), y = Number(cell.dataset.y);
    const index = cells.findIndex(c => c.x === x && c.y === y);
    const next = cells[index + delta];
    if (!next) return;
    const target = findPlayerCell(next.x, next.y);
    if (target) {
      const targetInput = target.querySelector('input');
      targetInput.focus();
      if (clearPrevious && delta < 0) targetInput.select();
      activatePlacement(activePlacementIndex, false, true);
      target.classList.add('cell-active');
    }
  }

  function getPlayerValues() {
    const values = {};
    $('playerGrid').querySelectorAll('.cw-cell.open').forEach(cell => {
      values[key(cell.dataset.x, cell.dataset.y)] = cell.querySelector('input').value;
    });
    return values;
  }

  function updatePlayerProgress() {
    if (!playerPuzzle) return;
    const inputs = [...$('playerGrid').querySelectorAll('.cw-cell.open input')];
    const filled = inputs.filter(input => input.value).length;
    $('playerProgressText').textContent = t('progress', { filled, total: inputs.length });
  }

  function checkPlayer() {
    if (!playerPuzzle) return;
    let wrong = 0;
    let filled = 0;
    $('playerGrid').querySelectorAll('.cw-cell.open').forEach(cell => {
      const input = cell.querySelector('input');
      const k = key(cell.dataset.x, cell.dataset.y);
      cell.classList.remove('wrong', 'correct');
      if (!input.value) return;
      filled++;
      if (normalizeAnswer(input.value) === playerPuzzle.solution[k]) cell.classList.add('correct');
      else { cell.classList.add('wrong'); wrong++; }
    });
    if (wrong) setMessage(playerMessage, t('checkedWrong', { count: wrong }), 'error');
    else if (filled) setMessage(playerMessage, t('checkedGood'), 'success');
    checkCompletion();
  }

  function useHint() {
    if (!playerPuzzle) return;
    const active = playerPuzzle.placements[activePlacementIndex];
    const search = active ? placementCells(active) : [];
    let target = search.map(c => findPlayerCell(c.x, c.y)).find(cell => !cell?.querySelector('input').value);
    if (!target) target = [...$('playerGrid').querySelectorAll('.cw-cell.open')].find(cell => !cell.querySelector('input').value);
    if (!target) {
      setMessage(playerMessage, t('nothingToHint'), 'warning');
      return;
    }
    const k = key(target.dataset.x, target.dataset.y);
    target.querySelector('input').value = playerPuzzle.solution[k];
    target.classList.add('correct');
    saveProgress();
    updatePlayerProgress();
    setMessage(playerMessage, t('hintUsed'), 'success');
    checkCompletion();
  }

  function revealSolution() {
    if (!playerPuzzle) return;
    $('playerGrid').querySelectorAll('.cw-cell.open').forEach(cell => {
      const k = key(cell.dataset.x, cell.dataset.y);
      cell.querySelector('input').value = playerPuzzle.solution[k];
      cell.classList.remove('wrong');
      cell.classList.add('correct');
    });
    saveProgress();
    updatePlayerProgress();
    setMessage(playerMessage, t('revealed'), 'success');
  }

  function checkCompletion() {
    if (!playerPuzzle) return false;
    const values = getPlayerValues();
    const keys = Object.keys(playerPuzzle.solution);
    const complete = keys.every(k => values[k] && normalizeAnswer(values[k]) === playerPuzzle.solution[k]);
    if (complete) {
      $('playerGrid').querySelectorAll('.cw-cell.open').forEach(cell => cell.classList.add('correct'));
      setMessage(playerMessage, t('completed'), 'success');
    }
    return complete;
  }

  function puzzleProgressKey() {
    if (!playerPuzzle) return '';
    const id = hashString(`${playerPuzzle.title}|${playerPuzzle.seed}|${playerPuzzle.placements.map(p => p.answer).join('|')}`);
    return STORAGE.progressPrefix + id;
  }

  function saveProgress() {
    if (!playerPuzzle) return;
    try { localStorage.setItem(puzzleProgressKey(), JSON.stringify(getPlayerValues())); } catch (_) {}
  }

  function restoreProgress() {
    if (!playerPuzzle) return;
    try {
      const saved = JSON.parse(localStorage.getItem(puzzleProgressKey()) || '{}');
      $('playerGrid').querySelectorAll('.cw-cell.open').forEach(cell => {
        const input = cell.querySelector('input');
        const value = saved[key(cell.dataset.x, cell.dataset.y)];
        if (value) input.value = value;
      });
    } catch (_) {}
  }

  function serializeShare(puzzle) {
    const payload = {
      v: 1,
      title: puzzle.title,
      lang: puzzle.language,
      seed: puzzle.seed,
      difficulty: puzzle.difficulty || 'normal',
      entries: (puzzle.sourceEntries || puzzle.placements.map(p => ({ answer: p.answer, clue: p.clue }))).map(e => [e.answer, e.clue])
    };
    const bytes = new TextEncoder().encode(JSON.stringify(payload));
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  function deserializeShare(encoded) {
    const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  async function shareCurrentPuzzle() {
    if (!currentPuzzle) return;
    const url = `${location.origin}${location.pathname}#p=${serializeShare(currentPuzzle)}`;
    try {
      await navigator.clipboard.writeText(url);
      setMessage(creatorMessage, t('sharedCopied'), 'success');
    } catch (_) {
      window.prompt(t('shareFallback'), url);
    }
  }

  function loadSharedFromHash() {
    if (!location.hash.startsWith('#p=')) return false;
    try {
      const payload = deserializeShare(location.hash.slice(3));
      if (!payload || payload.v !== 1 || !Array.isArray(payload.entries) || payload.entries.length < 3) throw new Error('Invalid payload');
      const entries = payload.entries.map(([answer, clue]) => ({ answer, clue }));
      const result = buildCrossword(entries, Number(payload.seed) >>> 0);
      if (!result.puzzle) throw new Error('Cannot build');
      result.puzzle.title = String(payload.title || t('playCrossword')).slice(0, 80);
      result.puzzle.language = SUPPORTED_LANGS.includes(payload.lang) ? payload.lang : 'en';
      result.puzzle.difficulty = payload.difficulty || 'normal';
      result.puzzle.sourceEntries = entries;
      result.puzzle.category = 'shared';
      playLanguage.value = result.puzzle.language;
      startPlayer(result.puzzle);
      setMessage(playerMessage, t('loadedShared'), 'success');
      return true;
    } catch (error) {
      switchMode('play');
      setMessage(playerMessage, t('invalidShare'), 'error');
      return false;
    }
  }

  function languageName(lang) {
    const names = { hr: 'Hrvatski', en: 'English', de: 'Deutsch', it: 'Italiano', es: 'Español' };
    return names[lang] || lang;
  }

  function renderInstructions() {
    const steps = translations[uiLang]?.instructions || translations.en.instructions;
    $('instructionsContent').innerHTML = steps.map((step, index) => `
      <div class="instruction-step">
        <span class="step-number">${index + 1}</span>
        <div><strong>${escapeHtml(step[0])}</strong><p>${escapeHtml(step[1])}</p></div>
      </div>`).join('') + `<div class="instructions-tip">💡 ${escapeHtml(t('instructionsTip'))}</div>`;
  }

  function renderWallets() {
    const container = $('cryptoWallets');
    container.textContent = '';
    Object.entries(CRYPTO_ADDRESSES).forEach(([name, address]) => {
      const row = document.createElement('div');
      row.className = 'wallet-row';
      const label = document.createElement('strong');
      label.textContent = name;
      const code = document.createElement('code');
      code.textContent = address;
      const button = document.createElement('button');
      button.className = 'copy-wallet';
      button.type = 'button';
      button.textContent = t('copy');
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(address);
          button.textContent = t('copied');
          setTimeout(() => button.textContent = t('copy'), 1400);
        } catch (_) {
          window.prompt(`${name}:`, address);
        }
      });
      row.append(label, code, button);
      container.appendChild(row);
    });
  }

  function openPanel(id) {
    $('modalBackdrop').classList.remove('hidden');
    $(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closePanels() {
    $('modalBackdrop').classList.add('hidden');
    $('instructionsPanel').classList.add('hidden');
    $('infoPanel').classList.add('hidden');
    document.body.style.overflow = '';
  }

  function setMessage(element, text, type = '') {
    element.textContent = text;
    element.className = `message${type ? ` ${type}` : ''}`;
  }

  let draftTimer;
  function saveDraftDebounced() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 300);
  }

  function saveDraft() {
    try {
      localStorage.setItem(STORAGE.draft, JSON.stringify({
        title: $('crosswordTitle').value,
        lang: crosswordLanguage.value,
        difficulty: $('difficulty').value,
        entries: getEditorEntries(),
        seed: creatorSeed
      }));
    } catch (_) {}
  }

  function restoreDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(STORAGE.draft) || 'null');
      if (!draft || !Array.isArray(draft.entries)) return false;
      $('crosswordTitle').value = draft.title || '';
      crosswordLanguage.value = SUPPORTED_LANGS.includes(draft.lang) ? draft.lang : uiLang;
      $('difficulty').value = draft.difficulty === 'easy' ? 'easy' : 'normal';
      creatorSeed = Number(draft.seed) >>> 0 || creatorSeed;
      wordRows.textContent = '';
      draft.entries.slice(0, 50).forEach(entry => addWordRow(entry.answer || '', entry.clue || ''));
      while (wordRows.children.length < 5) addWordRow();
      return true;
    } catch (_) {
      return false;
    }
  }

  function bindEvents() {
    uiLanguage.addEventListener('change', () => setLanguage(uiLanguage.value));
    themeMode.addEventListener('change', () => setTheme(themeMode.value));
    crosswordLanguage.addEventListener('change', saveDraft);
    $('difficulty').addEventListener('change', saveDraft);
    $('crosswordTitle').addEventListener('input', saveDraftDebounced);

    document.querySelectorAll('.mode-tab').forEach(btn => btn.addEventListener('click', () => switchMode(btn.dataset.mode)));
    $('addRowButton').addEventListener('click', () => addWordRow());
    $('exampleButton').addEventListener('click', () => loadExampleToEditor());
    $('clearButton').addEventListener('click', () => clearEditor());
    $('generateButton').addEventListener('click', () => generateFromEditor(false));
    $('reshuffleButton').addEventListener('click', () => generateFromEditor(true));
    $('solutionToggleButton').addEventListener('click', () => {
      previewSolutionVisible = !previewSolutionVisible;
      renderPreview(currentPuzzle);
    });
    $('playGeneratedButton').addEventListener('click', () => currentPuzzle && startPlayer(currentPuzzle));
    $('printButton').addEventListener('click', () => {
      if (!currentPuzzle) return;
      const previous = previewSolutionVisible;
      previewSolutionVisible = false;
      renderPreview(currentPuzzle);
      window.print();
      setTimeout(() => { previewSolutionVisible = previous; renderPreview(currentPuzzle); }, 200);
    });
    $('shareButton').addEventListener('click', shareCurrentPuzzle);

    playLanguage.addEventListener('change', populateCategories);
    $('loadPuzzleButton').addEventListener('click', loadBuiltInPuzzle);
    $('hintButton').addEventListener('click', useHint);
    $('checkButton').addEventListener('click', checkPlayer);
    $('revealButton').addEventListener('click', revealSolution);

    $('instructionsButton').addEventListener('click', () => openPanel('instructionsPanel'));
    $('infoButton').addEventListener('click', () => openPanel('infoPanel'));
    $('modalBackdrop').addEventListener('click', closePanels);
    document.querySelectorAll('[data-close-panel]').forEach(btn => btn.addEventListener('click', closePanels));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closePanels(); });
  }

  function init() {
    $('currentYear').textContent = new Date().getFullYear();
    const savedTheme = localStorage.getItem(STORAGE.theme) || 'auto';
    setTheme(savedTheme);
    uiLanguage.value = uiLang;
    crosswordLanguage.value = uiLang;
    playLanguage.value = uiLang;
    bindEvents();
    if (!restoreDraft()) clearEditor(8);
    setLanguage(uiLang);
    populateCategories();
    loadSharedFromHash();
  }

  init();
})();
