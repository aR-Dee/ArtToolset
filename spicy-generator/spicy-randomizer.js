// Loads all category data from data/*.json via fetch() and powers the
// GENERATE button. This requires the page to be served over http/https (a
// local dev server, or GitHub Pages) — opening the HTML file directly with
// file:// blocks fetch() of local JSON files in modern browsers. Run a local
// server (e.g. `python -m http.server` from the ArtToolset folder, or the
// VS Code "Live Server" extension) to test this on your machine.
var DATA = {};
var dataReady = false;

var DATA_FILES = {
  mood: "data/mood.json",
  tone: "data/tone.json",
  character: "data/character.json",
  action: "data/action.json",
  fetish: "data/fetish.json",
  setting: "data/setting.json",
  phrases: "data/phrases.json"
};

function loadData() {
  var keys = Object.keys(DATA_FILES);
  return Promise.all(
    keys.map(function (key) {
      return fetch(DATA_FILES[key])
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (json) {
          if (key === "phrases") {
            DATA.fetishBridge = json.fetishBridge;
            DATA.settingPrep = json.settingPrep;
            DATA.toneNoun = json.toneNoun;
            DATA.toneIntro = json.toneIntro;
          } else {
            DATA[key] = json;
          }
        })
        .catch(function (err) {
          console.error("Failed to load " + DATA_FILES[key] + ":", err);
        });
    })
  );
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function span(cls, text) {
  return '<span class="' + cls + '">' + text + '</span>';
}

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('roll-btn');
  if (!btn) return;

  btn.disabled = true;
  btn.style.opacity = '0.5';
  btn.style.cursor = 'wait';

  loadData().then(function () {
    dataReady = true;
    btn.disabled = false;
    btn.style.opacity = '';
    btn.style.cursor = '';
  });

  btn.addEventListener('click', function () {
    if (!dataReady) return;

    const mood      = pick(DATA.mood);
    const tone      = pick(DATA.tone);
    const character = pick(DATA.character);
    const action    = pick(DATA.action);
    const fetish    = pick(DATA.fetish);
    const setting   = pick(DATA.setting);
    const verb      = pick(action.verbs);
    const bridge    = pick(DATA.fetishBridge);
    const prep      = pick(DATA.settingPrep);
    const toneNoun  = pick(DATA.toneNoun);
    const toneIntro = pick(DATA.toneIntro);

    // Articles computed from the word that follows them
    const article     = /^[aeiou]/i.test(mood.name) ? 'An' : 'A';
    const toneArticle = /^[aeiou]/i.test(tone.name) ? 'an' : 'a';

    // Build the character + mood opening
    let opening;
    if (character.name === "Own Pick") {
      opening = span("r-character", "Your own character");
    } else {
      opening = `${article} ${span("r-mood", mood.name.toLowerCase())} ${span("r-character", character.name)}`;
    }

    const sentence =
      `${opening} — ${verb} ` +
      span("r-action", action.noun) +
      ` — ${bridge} ` +
      span("r-fetish", fetish.phrase) +
      `, ${prep} ` +
      span("r-setting", setting.inSentence) +
      `, ${toneIntro} ${toneArticle} ` +
      span("r-tone", tone.name.toLowerCase()) +
      ` ${toneNoun}.`;

    const box = document.getElementById('result-box');
    box.innerHTML = sentence;
    box.classList.add('visible');

    document.getElementById('val-mood').textContent      = mood.name;
    document.getElementById('sub-mood').textContent      = mood.sub;
    document.getElementById('val-tone').textContent      = tone.name;
    document.getElementById('sub-tone').textContent      = tone.sub;
    document.getElementById('val-character').textContent = character.name;
    document.getElementById('sub-character').textContent = character.sub;
    document.getElementById('val-action').textContent    = action.name;
    document.getElementById('sub-action').textContent    = action.sub;
    document.getElementById('val-fetish').textContent    = fetish.name;
    document.getElementById('sub-fetish').textContent    = fetish.sub || '';
    document.getElementById('val-setting').textContent   = setting.name;
    document.getElementById('sub-setting').textContent   = setting.sub;

    document.getElementById('dice-cards').classList.add('visible');
  });
});
