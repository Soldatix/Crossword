# Apps&Games Crossword

Create, solve, print and share custom crosswords directly in the browser.

## Features

- Crossword creator from custom words and clues
- Play mode with a separate JSON crossword library
- 10 ready-made categories: General knowledge, Geography, Animals, Sport, History, Nature, Film & TV, Music, Cars and Science
- Interface languages: Croatian, English, German, Italian and Spanish
- Separate crossword language selection
- Light / Dark / Auto theme
- Hint, solution checking, answer reveal and Play Again
- Print / Save as PDF
- Share puzzles with a link
- Local progress saving
- Responsive desktop and mobile layout
- Multilingual instructions
- Apps&Games Info & Support panel

## Crossword library

Ready-made puzzles are stored separately from the application code:

- `puzzles/hr/library.json`
- `puzzles/en/library.json`
- `puzzles/de/library.json`
- `puzzles/it/library.json`
- `puzzles/es/library.json`
- `puzzles/manifest.json`

Each language library contains category arrays. New puzzles can be appended to those arrays without changing the main crossword application. The loader remembers the next puzzle position for every language/category, so categories can grow to many puzzles while keeping the app code unchanged.

The app runs entirely in the browser and does not require a backend for creating or solving crosswords.
