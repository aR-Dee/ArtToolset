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

### Palette Roller
Rolls a random color palette (3&ndash;8 swatches) with harmony modes &mdash; random, monochrome, analogous, complementary, split-complementary, triadic. Click a swatch to copy its hex code.

### Composition Randomizer
Rolls a camera angle, shot type, and framing rule, then highlights a suggested focal point on a 3&times;3 grid.

### Gesture Timer
Load your own reference photos (processed locally, nothing uploaded) and cycle through them on a countdown for timed gesture-drawing practice. Configurable time per pose, with pause/skip/reshuffle controls.

### Palette Extractor
Drop in an image and pull out its dominant colors as a ready-to-use palette, extracted client-side via canvas color bucketing.

### Pose & Anatomy Roller
Same generator pattern as the character tool &mdash; rolls a pose type, viewing angle, and anatomy focus to target in your next study.

### Art Challenge Dice
Rolls a familiar genre clich&eacute;, then a twist directive daring you to subvert it.

---

## Stack
Vanilla JS + Bootstrap 4 + a sprinkle of custom CSS. No build step, runs fully in the browser.

## Contributing
More than happy to work on this with someone — open an issue or a PR!
