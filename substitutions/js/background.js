//Default replacements
var default_replacements = [
  //https://xkcd.com/1288/
  ['witnesses', 'these dudes I know'],
  ['witness', 'this dude I know'],
  ['allegedly', 'kinda probably'],
  ['new study', 'tumblr post'],
  ['rebuild', 'avenge'],
  ['space', 'spaaaaaace'],
  ['google glass', 'virtual boy'],
  ['smartphone', 'pok\u00E9dex'],
  ['senator', 'elf-lord'],
  ['senators', 'elf-lords'],
  ['electric', 'atomic'],
  ['car', 'cat'],
  ['cars', 'cats'],
  ['election', 'eating contest'],
  ['elections', 'eating contests'],
  ['congressional leaders', 'river spirits'],
  ['homeland security', 'homestar runner'],
  ['could not be reached for comment', 'is guilty and everyone knows it'],

  // https://xkcd.com/1625/
  ['debate', 'dance-off'],
  ['debates', 'dance-offs'],
  ['self driving', 'uncontrollably swerving'],
  ['self-driving', 'uncontrollably swerving'],
  ['selfdriving', 'uncontrollably swerving'],
  ['poll', 'psychic reading'],
  ['polls', 'psychic readings'],
  ['candidate', 'airbender'],
  ['candidates', 'airbenders'],
  ['drone', 'dog'],
  ['drones', 'dogs'],
  ['vows to', 'probably won\'t'],
  ['vow to', 'probably won\'t'],
  ['at large', 'very large'],
  ['successfully', 'suddenly'],
  ['expands', 'physically expands'],
  ['expand', 'physically expand'],
  ['first-degree', 'friggin\' awful'],
  ['second-degree', 'friggin\' awful'],
  ['third-degree', 'friggin\' awful'],
  ['first degree', 'friggin\' awful'],
  ['second degree', 'friggin\' awful'],
  ['third degree', 'friggin\' awful'],
  ['an unknown number', 'like hundreds'],
  ['unknown numbers', 'like hundreds'],
  ['front runner', 'blade runner'],
  ['front runners', 'blade runners'],
  ['global', 'spherical'],
  ['years', 'minutes'],
  ['year', 'minute'],
  ['minutes', 'years'],
  ['minute', 'year'],
  ['no indication', 'lots of signs'],
  ['no indications', 'lots of signs'],
  ['urged restraint by', 'drunkenly egged on'],
  ['horsepower', 'tons of horsemeat'],

  //https://xkcd.com/1031/
  ['keyboard', 'leopard'],
  ['keyboards', 'leopards'],

  //https://xkcd.com/1418/
  ['force', 'horse'],
  ['forces', 'horses'],

  //https://xkcd.com/1004/
  ['batman', 'a man dressed like a bat']
];
//Default Blacklist
var default_blacklisted_sites = [
  "docs.google.com",
  "gmail.com",
  "mail.google.com",
  "inbox.google.com",
  "mail.yahoo.com",
  "outlook.com",
  "xkcd.com"
];

var debug = false;

function checkBlackList(url, blacklist) {
  url = url.toLowerCase() || "";
  blacklist = blacklist || [];
  for (var i = blacklist.length - 1; i >= 0; i--) {
    if (url.indexOf(blacklist[i]) > -1) {
      setBrowserAction("blacklist");
      return false;
    }
  }
  return true;
}

function injectionScript(tabId, info, tab) {
  if (debug) {console.log("injection fire");}
  chrome.storage.sync.get(null, function (result) {
    if (result
        && result["status"] === "enabled"
        && checkBlackList(tab.url, result['blacklist'])) {
      chrome.tabs.executeScript(tabId, {
        file: "js/substitutions.js",
        runAt: "document_end"
      }, function (){
        if (debug){console.log('Script Executed');}
      });
    }
  });
}

function addMessage(request, sender, sendResponse) {
  if (debug) { console.log("message fire"); }
  chrome.storage.sync.get(null, function(result) {
    if (request === "config" && result["replacements"]) {
      sendResponse(result["replacements"]);
    }
  });
  return true;
}

function setup() {
  if (debug) { console.log("updateStore"); }
  chrome.storage.sync.get(null, function(result) {
    if (!result["status"]) {
      chrome.storage.sync.set({
        "status": "enabled"
      });
      setBrowserAction("enabled");
    } else {
      setBrowserAction(result["status"]);
    }
    if (!result["replacements"]) {
      chrome.storage.sync.set({
        "replacements": default_replacements
      });
    }
    if (!result["blacklist"]) {
      chrome.storage.sync.set({
        "blacklist": default_blacklisted_sites
      });
    }
  });
}

function toggleActive() {
  if (debug) { console.log("clickfire"); }
  chrome.storage.sync.get("status", function(result) {
    if (result["status"] === "enabled") {
      status = "disabled";
    } else {
      status = "enabled";
    }
    setBrowserAction(status);
    chrome.storage.sync.set({
      "status": status
    });
  });
}

function setBrowserAction(status) {
  if (status === "disabled") {
    icon = {
      "path": "images/disabled.png"
    };
    message = {
      "title": "click to enable xkcd substitutions"
    };
  } else if (status === "blacklist") {
    icon = {
      "path": "images/blacklist.png"
    };
    message = {
      "title": "site is blacklisted for xkcd substitutions"
    };
  } else {
    icon = {
      "path": "images/enabled.png"
    };
    message = {
      "title": "click to disable xkcd substitutions"
    };
  }
  chrome.browserAction.setIcon(icon);
  chrome.browserAction.setTitle(message);
}

chrome.browserAction.onClicked.addListener(toggleActive);
chrome.runtime.onMessage.addListener(addMessage);
chrome.tabs.onUpdated.addListener(injectionScript);
chrome.runtime.onInstalled.addListener(setup);
chrome.runtime.onStartup.addListener(setup);
