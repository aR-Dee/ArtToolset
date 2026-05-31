# Art Toolset

A small collection of illustration prompt generators. Free to use and remix — meant to spark ideas for drawing, painting, or whatever creative direction you want to take.

**Live site:** https://ar-dee.github.io/ArtToolset/

---

## Tools

### Random Character & Story Generator
A simple, lightweight prompt generator. Pick your categories, hit shuffle, and get a one-sentence prompt: a character doing something, somewhere.

**Categories you can mix and match:**
- **Character** — Generic archetypes, Games, Anime / Manga
- **Action** — Generic, Medieval, Sci-Fi
- **Place** — Generic, Medieval, Sci-Fi

Content lives in three JSON files so it's easy to extend:
- `character.json`
- `action.json`
- `place.json`

Logic is in `randomizer.js`.

---

### SPICY Random Character & Story Generator
A more elaborate generator that rolls six categories at once and assembles them into a single coloured sentence. Aimed at more mature / NSFW illustration prompts.

**Categories:**
- **Mood** — emotional flavour of the character
- **Tone** — sexual intensity / style
- **Character** — archetype or fantasy role
- **Action** — the core physical or intimate act
- **Fetish / Kink** — the theme or context
- **Setting** — where it all happens

Everything is self-contained in `spicy-generator.html`.

---

## Stack
Vanilla JS + Bootstrap 4 + a sprinkle of custom CSS. No build step, runs fully in the browser.

## Contributing
More than happy to work on this with someone — open an issue or a PR!
