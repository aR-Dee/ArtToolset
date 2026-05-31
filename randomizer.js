var placement = ["in", "at", "over", "under", "in front of", "at the back of", "at a side of", "next to"];
var gInfo;

function loadJSONfiles() {
    let g_info = { character: {}, place: {}, action: {} };
    let keys = Object.keys(g_info);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        $.getJSON(key + ".json", function (data) {
            g_info[key] = data;
        }).fail(function () {
            console.log("An error has occurred when loading: " + key);
        });
    }
    return g_info;
}

function generateStory(filtered) {
    let character = [], action = [], place = [];

    for (let i in filtered) {
        if (filtered[i].search("character") != -1) { character = character.concat(getStoryPart(filtered[i])); }
        if (filtered[i].search("place") != -1)     { place     = place.concat(getStoryPart(filtered[i])); }
        if (filtered[i].search("action") != -1)    { action    = action.concat(getStoryPart(filtered[i])); }
    }

    var rndChar      = rndElementPickup(character);
    var rndPlace     = rndElementPickup(place);
    var rndAct       = rndElementPickup(action).toLowerCase();
    var rndPlaceGlue = rndElementPickup(placement).toLowerCase();

    return rndChar + " " + rndAct + " " + rndPlaceGlue + " " + rndPlace;
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
    for (let i in checks) {
        if (checks[i].checked == true) {
            filtered_sections.push(checks[i].value);
        }
    }
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

$(document).ready(function () {
    gInfo = loadJSONfiles();

    $('.randomizer-btn').on('click', function (event) {
        event.preventDefault();
        if (!checkBoxStates()) {
            $("#checkbox-error").show();
        } else {
            $("#checkbox-error").hide();
            var story = generateStory(storyFilter());
            $(".generated-story").text(story);
            $("#result-box").addClass("visible");
        }
    });
});
