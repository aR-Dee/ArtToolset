// Loads character.json / action.json / place.json via fetch() and powers the
// SHUFFLE button. This requires the page to be served over http/https (a
// local dev server, or GitHub Pages) — opening the HTML file directly with
// file:// blocks fetch() of local JSON files in modern browsers. Run a local
// server (e.g. `python -m http.server` from the ArtToolset folder, or the
// VS Code "Live Server" extension) to test this on your machine.
var placement = ["in", "at", "over", "under", "in front of", "at the back of", "at a side of", "next to"];
var gInfo = { character: {}, action: {}, place: {} };
var dataReady = false;

function loadJSONFiles() {
  var keys = Object.keys(gInfo);
  return Promise.all(
    keys.map(function (key) {
      return fetch(key + ".json")
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) { gInfo[key] = data; })
        .catch(function (err) {
          console.error("Failed to load " + key + ".json:", err);
        });
    })
  );
}

function generateStory(filtered) {
  let character = [], action = [], place = [];

  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i].indexOf("character") !== -1) { character = character.concat(getStoryPart(filtered[i])); }
    if (filtered[i].indexOf("place") !== -1)     { place     = place.concat(getStoryPart(filtered[i])); }
    if (filtered[i].indexOf("action") !== -1)    { action    = action.concat(getStoryPart(filtered[i])); }
  }

  var rndChar      = rndElementPickup(character);
  var rndPlace     = rndElementPickup(place);
  var rndAct       = rndElementPickup(action).toLowerCase();
  var rndPlaceGlue = rndElementPickup(placement).toLowerCase();

  return '<span class="s-character">' + rndChar + '</span>'
       + ' <span class="s-action">' + rndAct + '</span>'
       + ' ' + rndPlaceGlue + ' '
       + '<span class="s-place">' + rndPlace + '</span>';
}

function getStoryPart(filteredObj) {
  let a = filteredObj.split(".");
  return gInfo[a[0]][a[1]];
}

function rndElementPickup(elArray) {
  return elArray[Math.floor(Math.random() * elArray.length)];
}

function storyFilter() {
  var checks = document.querySelectorAll("input[type='checkbox']:checked");
  let filtered_sections = [];
  checks.forEach(function (c) { filtered_sections.push(c.value); });
  return filtered_sections;
}

function checkBoxStates() {
  var charChecks   = validateChecks(document.querySelectorAll("input.char_box"));
  var actionChecks = validateChecks(document.querySelectorAll("input.action_box"));
  var placeChecks  = validateChecks(document.querySelectorAll("input.place_box"));

  return charChecks && actionChecks && placeChecks;
}

function validateChecks(boxChecks) {
  for (let i = 0; i < boxChecks.length; i++) {
    if (boxChecks[i].checked) return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.randomizer-btn');
  var errorBox = document.getElementById('checkbox-error');
  var storyBox = document.querySelector('.generated-story');
  var resultBox = document.getElementById('result-box');

  if (!btn) return;

  // Disable the button until the JSON data has actually loaded, so a click
  // during a slow load (or a failed fetch) can't silently do nothing.
  btn.disabled = true;
  btn.style.opacity = '0.5';
  btn.style.cursor = 'wait';

  loadJSONFiles().then(function () {
    dataReady = true;
    btn.disabled = false;
    btn.style.opacity = '';
    btn.style.cursor = '';
  });

  btn.addEventListener('click', function (event) {
    event.preventDefault();
    if (!dataReady) return;

    if (!checkBoxStates()) {
      errorBox.style.display = 'block';
    } else {
      errorBox.style.display = 'none';
      var story = generateStory(storyFilter());
      storyBox.innerHTML = story;
      resultBox.classList.add('visible');
    }
  });
});
